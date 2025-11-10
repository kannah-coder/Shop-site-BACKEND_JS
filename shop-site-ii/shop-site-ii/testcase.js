import { test, expect, request } from '@playwright/test';

// Adjust URLs to match your ports
const BACKEND = 'http://localhost:3000';
const FRONTEND = 'http://localhost:5500/frontend';

test.describe('E-commerce App – Backend and Frontend Tests', () => {

  // -----------------------------
  // BACKEND API TESTS
  // -----------------------------
  test.describe('Backend API Tests', () => {

    test('GET /api/products should return valid product list', async ({ request }) => {
      const response = await request.get(`${BACKEND}/api/products`);
      expect(response.ok()).toBeTruthy();
      const products = await response.json();
      expect(Array.isArray(products)).toBeTruthy();
      expect(products.length).toBeGreaterThan(0);
      expect(products[0]).toHaveProperty('name');
      expect(products[0]).toHaveProperty('cost');
    });

    test('POST /api/cart/add should add a product to cart', async ({ request }) => {
      const res = await request.post(`${BACKEND}/api/cart/add`, {
        data: { name: 'Apple', price: 50, image: 'images/apple.jpg' },
      });
      expect(res.ok()).toBeTruthy();
      const updatedCart = await res.json();
      const item = updatedCart.find(i => i.name === 'Apple');
      expect(item).toBeTruthy();
      expect(item.quantity).toBeGreaterThanOrEqual(1);
    });

    test('POST /api/cart/decrement should update or remove item', async ({ request }) => {
      const res = await request.post(`${BACKEND}/api/cart/decrement`, {
        data: { name: 'Apple' },
      });
      expect(res.ok()).toBeTruthy();
      const updatedCart = await res.json();
      const item = updatedCart.find(i => i.name === 'Apple');
      if (item) expect(item.quantity).toBeGreaterThanOrEqual(0);
    });

    test('GET /api/cart should return cart items', async ({ request }) => {
      const res = await request.get(`${BACKEND}/api/cart`);
      expect(res.ok()).toBeTruthy();
      const cart = await res.json();
      expect(Array.isArray(cart)).toBeTruthy();
    });

  });

  // -----------------------------
  // FRONTEND UI TESTS
  // -----------------------------
  test.describe('Frontend UI Tests', () => {

    test.beforeEach(async ({ page }) => {
      await page.goto(`${FRONTEND}/index.html`);
    });

    test('should navigate to a category and display products', async ({ page }) => {
      // Click Fruits category
      await page.click('text=🍎 Fruits');
      await page.waitForSelector('.item img');

      const items = await page.$$('.item');
      expect(items.length).toBeGreaterThan(0);

      const firstItemText = await items[0].textContent();
      expect(firstItemText).toContain('Apple');
    });

    test('should add a product to the cart and display it', async ({ page }) => {
      await page.click('text=🍎 Fruits');
      await page.waitForSelector('.item button');

      // Add the first product to cart
      const addButtons = await page.$$('.item button');
      await addButtons[0].click();

      // Wait for cart to update
      await page.waitForSelector('#cart-items tr');
      const cartRows = await page.$$('#cart-items tr');
      expect(cartRows.length).toBeGreaterThan(0);

      const cartText = await cartRows[0].textContent();
      expect(cartText).toMatch(/Apple|Mango|Banana/);
    });

    test('should increment and then decrement the cart item', async ({ page }) => {
      await page.click('text=🍎 Fruits');
      await page.waitForSelector('.item button');

      // Add twice
      const addButtons = await page.$$('.item button');
      await addButtons[0].click();
      await addButtons[0].click();

      await page.waitForSelector('#cart-items tr');
      let quantityBefore = await page.$eval('#cart-items tr td:nth-child(5)', el => el.textContent);
      quantityBefore = parseInt(quantityBefore);

      // Decrement item
      await page.click('#cart-items tr');
      await page.waitForTimeout(500);

      let quantityAfter = await page.$eval('#cart-items tr td:nth-child(5)', el => el.textContent);
      quantityAfter = parseInt(quantityAfter);

      expect(quantityAfter).toBeLessThanOrEqual(quantityBefore);
    });

  });
});
