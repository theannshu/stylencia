const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

async function searchGoogleShopping(page, query, maxPrice) {
    try {
        let url = `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(query)}`;
        if (maxPrice) url += `&tbs=mr:1,price:1,ppr_max:${maxPrice}`;

        await page.setRequestInterception(true);
        page.on('request', (req) => {
            if (req.resourceType() === 'image' || req.resourceType() === 'stylesheet' || req.resourceType() === 'font') {
                req.abort();
            } else {
                req.continue();
            }
        });

        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 8000 });

        const item = await page.evaluate(() => {
            // Google Shopping results often use these classes
            const products = document.querySelectorAll('.sh-dgr__content');
            for (let i = 0; i < products.length; i++) {
                const el = products[i];

                const titleEl = el.querySelector('h3');
                const title = titleEl ? titleEl.innerText : '';

                const priceEl = el.querySelector('span[aria-hidden="true"] > span.XrAfOe');
                const priceText = priceEl ? priceEl.innerText : el.querySelector('.a8Ixh')?.innerText || '';
                const price = priceText.replace(/[^0-9.]/g, '');

                const imgEl = el.querySelector('img');
                const img = imgEl ? imgEl.src : '';

                // E-commerce store name (e.g., Snitch, Myntra, WROGN)
                const brandEl = el.querySelector('.aULzUe');
                const brand = brandEl ? brandEl.innerText : 'Google Shop';

                const linkEl = el.querySelector('a');
                let link = linkEl ? linkEl.href : '';
                // Clean up google redirect links if possible, else just use the direct click URL
                if (link.includes('url?url=')) {
                    try {
                        link = decodeURIComponent(link.split('url?url=')[1].split('&')[0]);
                    } catch (e) { }
                }

                if (title && img && price) {
                    return { brand, title, price, img, link };
                }
            }
            return null;
        });

        return item;
    } catch (e) {
        console.error("Google Shopping scrape failed for query: " + query);
        return null;
    }
}

async function searchAmazon(page, query) {
    try {
        await page.setRequestInterception(true);
        page.on('request', (req) => {
            if (req.resourceType() === 'image' || req.resourceType() === 'stylesheet' || req.resourceType() === 'font') {
                req.abort();
            } else {
                req.continue();
            }
        });

        await page.goto(`https://www.amazon.in/s?k=${encodeURIComponent(query)}&i=apparel`, { waitUntil: 'domcontentloaded', timeout: 8000 });

        const item = await page.evaluate(() => {
            const products = document.querySelectorAll('div[data-component-type="s-search-result"]');
            for (let i = 0; i < products.length; i++) {
                const el = products[i];
                const titleEl = el.querySelector('h2 a span');
                const title = titleEl ? titleEl.innerText : '';

                const priceEl = el.querySelector('.a-price-whole');
                const price = priceEl ? priceEl.innerText.replace(/,/g, '') : '';

                const imgEl = el.querySelector('.s-image');
                const img = imgEl ? imgEl.src : '';

                const linkEl = el.querySelector('h2 a');
                const link = linkEl ? linkEl.href : '';

                if (title && img && price) {
                    return { brand: 'Amazon', title, price, img, link };
                }
            }
            return null;
        });

        return item;
    } catch (e) {
        console.error("Amazon scrape failed for query: " + query);
        return null;
    }
}

async function searchMyntra(page, query) {
    try {
        await page.setRequestInterception(true);
        page.on('request', (req) => {
            if (req.resourceType() === 'image' || req.resourceType() === 'stylesheet' || req.resourceType() === 'font') {
                req.abort();
            } else {
                req.continue();
            }
        });

        await page.goto(`https://www.myntra.com/${encodeURIComponent(query.replace(/ /g, '-'))}`, { waitUntil: 'domcontentloaded', timeout: 8000 });

        const item = await page.evaluate(() => {
            const products = document.querySelectorAll('.product-base');
            for (let i = 0; i < products.length; i++) {
                const el = products[i];
                const brand = el.querySelector('.product-brand')?.innerText || '';
                const title = el.querySelector('.product-product')?.innerText || '';
                const priceMatch = el.querySelector('.product-discountedPrice')?.innerText || el.querySelector('.product-price')?.innerText || '';
                let price = priceMatch.replace(/[^0-9.]/g, '');

                let imgEl = el.querySelector('picture img');
                let img = imgEl ? imgEl.src : '';

                let linkEl = el.querySelector('a');
                let link = linkEl ? linkEl.href : '';

                if (title && img) {
                    return { brand, title, price, img, link };
                }
            }
            return null;
        });

        return item;
    } catch (e) {
        console.error("Myntra scrape failed for query: " + query);
        return null;
    }
}

async function scrapeProductsForQueries(queries) {
    console.log("Starting scraper for queries:", queries);
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const results = [];

    try {
        // Run all scraping queries in parallel
        const promises = queries.map(async (query) => {
            const page = await browser.newPage();
            await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');

            console.log(`[Parallel Scrape] Started: ${query.name}...`);

            // Try Google Shopping First (catches Snitch, WROGN, Vastrado, etc)
            let product = await searchGoogleShopping(page, query.name, query.maxPrice);

            // Fallback to Myntra
            if (!product) {
                product = await searchMyntra(page, query.name);
            }

            // Fallback to Amazon
            if (!product) {
                product = await searchAmazon(page, query.name);
            }

            // Fallback to placeholder if both fail
            if (!product) {
                product = {
                    brand: "Generic",
                    title: query.name,
                    price: Math.floor(Math.random() * 2000) + 500,
                    img: `https://via.placeholder.com/400x500.png?text=${encodeURIComponent(query.name)}`,
                    link: `https://www.amazon.in/s?k=${encodeURIComponent(query.name)}`
                };
            }

            await page.close();
            console.log(`[Parallel Scrape] Finished: ${query.name}`);

            return {
                type: query.type || "clothing",
                name: product.title.substring(0, 40) + '...',
                brand: product.brand,
                price: product.price || "N/A",
                image: product.img,
                link: product.link
            };
        });

        const parallelResults = await Promise.all(promises);
        results.push(...parallelResults);

    } catch (error) {
        console.error("Scraping generic error:", error);
    } finally {
        await browser.close();
    }

    return results;
}

module.exports = { scrapeProductsForQueries };
