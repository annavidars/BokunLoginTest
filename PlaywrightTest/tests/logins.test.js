import { test, expect, chromium } from '@playwright/test';

test.use({ headless: false, viewport: { width: 1280, height: 720 } });

test('Login test ', async () => {

        const browser = await chromium.launch({
            headless: false,
         });

         const context = await browser.newContext({
            userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            viewport: { width: 1280, height: 720 },
            extraHTTPHeaders: {
                "Accept-Language": "en-US,en;q=0.9",
                "Referer": "https://www.google.com/",
                "DNT": "1",
            }
        });

        const page = await context.newPage();
        
        console.log("Navigating to URL...");
        await page.goto('https://extranet.bokuntest.com/app/signup', { waitUntil: 'domcontentloaded' });

        // Simulate human behavior
        await page.waitForTimeout(Math.floor(Math.random() * 3000) + 1000);
        await page.mouse.move(200, 300);
        await page.mouse.click(200, 300);

        await page.fill('[name="email"]', 'annavidars@gmail.com', { delay: 150 });
        await page.fill('[name="password"]', '123Password123', { delay: 150 });

        await page.evaluate(() => window.scrollBy(0, 500));
        await page.click('[data-testid="btn-start"]', { delay: 300 });

        await page.waitForURL('https://extranet.bokuntest.com/app/signup/details', { timeout: 10000 });
        await expect(page).toHaveURL('https://extranet.bokuntest.com/app/signup/details');

        
    // Fill the next form
        await page.fill('[name="firstName"]', 'Anna');
        await page.fill('[name="lastName"]', 'Vidarsdottir');
        await page.fill('[name="companyName"]', 'Bokun');
        await page.fill('[name="phoneNumber"]', '7822266');

        await page.getByLabel('$100K - $1M').check();
        await page.getByLabel('I sell my own tours and experiences.').check();
        await page.click('[data-testid="btn-save"]', { delay: 300 });

        // Assert next page
        await expect(page).toHaveURL('https://extranet.bokuntest.com/app/signup/intent');

        await page.getByTestId('INTENT_CONNECT_TO_OTAS').check();
        await expect(page.getByTestId('INTENT_CONNECT_TO_OTAS')).toBeChecked();

        await page.getByTestId('INTENT_DIRECT_ONLINE_SALES').check();
        await expect(page.getByTestId('INTENT_DIRECT_ONLINE_SALES')).toBeChecked();

        await page.click('[data-testid="btn-save"]', { delay: 300 });

        // Assert next page
        await expect(page).toHaveURL('https://extranet.bokuntest.com/app/signup/sales');

        await page.getByTestId('SALES_CHANNEL_OFFLINE').check();
        await expect(page.getByTestId('SALES_CHANNEL_OFFLINE')).toBeChecked();

        await page.click('[data-testid="btn-save"]', { delay: 300 });

        // Assert final page navigation
        await expect(page).toHaveURL('https://extranet.bokuntest.com/app/signup/sales');
        console.log("Test completed successfully.");

        await browser.close();
  
});
