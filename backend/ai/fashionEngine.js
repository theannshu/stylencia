const { GoogleGenAI } = require('@google/genai');
const { scrapeProductsForQueries } = require('../scraper/index');

let ai;
if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
}

async function getFashionRecommendation(gender, occasion, profile = {}, wardrobe = [], budget = 5000) {
    let outfitSpec;

    if (process.env.GEMINI_API_KEY) {

        // Construct the personalized prompt traits
        const traits = [];
        if (profile.height) traits.push(`Height: ${profile.height} cm`);
        if (profile.bodyType) traits.push(`Body Geometry: ${profile.bodyType}`);
        if (profile.skinTone) traits.push(`Skin Tone: ${profile.skinTone}`);
        if (profile.hairColor) traits.push(`Hair: ${profile.hairColor}`);
        if (profile.eyeColor) traits.push(`Eyes: ${profile.eyeColor}`);
        if (profile.faceStructure) traits.push(`Face Shape: ${profile.faceStructure}`);
        if (profile.age) traits.push(`Age: ${profile.age}`);

        const personalizedIntro = traits.length > 0
            ? `The user's physical attributes are: 
               [ ${traits.join(" | ")} ]
               
               APPLICATION OF ADVANCED FASHION THEORY IS MANDATORY:
               1. COLOR THEORY: Apply Seasonal Color Analysis based on their skin tone, hair, and eyes. Select hues that make their complexion glow.
               2. BODY GEOMETRY: Apply advanced styling principles (like Kibbe body types or architectural dressing) to flatter their specific Body Geometry and Height. Use hemlines, necklines, and silhouettes that create perfect bodily proportions.
               3. FACE SHAPE: Choose necklines and accessories (e.g., earrings, sunglasses, collars) that balance their specific Face Shape.
               4. VIBE & AESTHETIC: Synthesize current high-fashion runway trends, viral Pinterest aesthetics (e.g., Old Money, clean girl, techwear, streetwear), and prominent fashion blog recommendations that match their Age and Occasion.`
            : "Generate a universally flattering, globally trending outfit.";

        const wardrobeContext = wardrobe.length > 0
            ? `\nThe user's current digital wardrobe contains:\n${JSON.stringify(wardrobe.map(w => ({ id: w.id, element: w.type, color: w.color, brand: w.brand, category: w.category })), null, 2)}`
            : `\nThe user's wardrobe is empty. All items must be scraped from stores.`;

        const prompt = `
        You are an elite, world-class celebrity fashion stylist and image consultant. You have encyclopedic knowledge of Vogue archives, Pinterest aesthetics, global fashion weeks, and modern designer lookbooks.
        
        TASK: Curate a breathtaking, complete, and cohesive outfit for a ${gender} attending a ${occasion}.
        
        ${personalizedIntro}
        ${wardrobeContext}
        The user has a total outfit budget of ₹${budget}. 
        
        Define exactly 4 cohesive clothing items (e.g., top/layer, bottom/dress, shoes, primary accessory) that create ONE flawless look.
        
        CRITICAL RULES:
        - WARDROBE INTEGRATION: You MUST prioritize re-using appropriate items from the user's digital wardrobe if they mathematically and aesthetically fit the occasion, color palette, and body theory rules.
        - STRATEGIC SHOPPING: For missing pieces, you must "shop" by generating highly specific, commercially viable search queries (e.g., "Men's relaxed fit beige linen trousers", "Women's emerald green cowl neck satin midi dress") that fit within the remaining budget.
        - ACCURACY: Ensure the selected items actually exist in real-world retail (avoid fantasy items).
        
        Provide the exact response in JSON format (do not use markdown blocks, just raw JSON).
        Format:
        {
          "description": "Write a 3-sentence masterpiece of fashion journalism explaining why this outfit is objectively stunning. Detail exactly how the colors compliment their specific skin-tone/hair, how the silhouettes balance their specific body type/height, and reference a specific fashion aesthetic or trend (e.g. 'Drawing inspiration from Milanese street style...').",
          "items": [
            { 
               "type": "top", 
               "source": "wardrobe", 
               "wardrobeId": "12345" 
            },
            { 
               "type": "shoes", 
               "source": "shop", 
               "searchQuery": "Men brown leather oxford formal shoes", 
               "maxPrice": 2000 
            }
          ]
        }
        `;

        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });

            const rawText = response.text || "";
            const jsonText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
            outfitSpec = JSON.parse(jsonText);
            console.log("AI Recommended Outline:", JSON.stringify(outfitSpec.items));
        } catch (e) {
            console.error("AI engine error processing prompt:", e);
        }
    }

    if (!outfitSpec) {
        console.warn("Using fallback outfit spec because AI failed or API key is missing.");
        outfitSpec = {
            description: `A sophisticated and stylish look tailored for a ${gender} attending a ${occasion}.`,
            items: [
                { source: "shop", type: "top", searchQuery: `${gender} stylish jacket ${occasion}`, maxPrice: budget / 4 },
                { source: "shop", type: "inner", searchQuery: `${gender} basic t-shirt or shirt`, maxPrice: budget / 4 },
                { source: "shop", type: "bottom", searchQuery: `${gender} fashionable trousers jeans`, maxPrice: budget / 4 },
                { source: "shop", type: "shoes", searchQuery: `${gender} trendy footwear`, maxPrice: budget / 4 }
            ]
        };
    }

    try {
        const finalOutfit = [];
        const queriesToScrape = [];

        // Distinguish between wardrobe selects and shop selects
        for (const pick of outfitSpec.items) {
            if (pick.source === 'wardrobe' && pick.wardrobeId) {
                // Find it in the uploaded wardrobe
                const foundItem = wardrobe.find(w => w.id === pick.wardrobeId);
                if (foundItem) {
                    finalOutfit.push({
                        ...foundItem,
                        fromWardrobe: true, // Flag it for UI
                        link: null // No buy link for owned items
                    });
                } else {
                    // AI hallucinated a wardrobe ID, fallback to scraping
                    queriesToScrape.push({ type: pick.type, name: `${gender} ${pick.type} ${occasion}` });
                }
            } else if (pick.source === 'shop' && pick.searchQuery) {
                queriesToScrape.push({ type: pick.type, name: pick.searchQuery, maxPrice: pick.maxPrice });
            }
        }

        // Scrape missing items
        let scrapedItems = [];
        if (queriesToScrape.length > 0) {
            scrapedItems = await scrapeProductsForQueries(queriesToScrape);
        }

        // Merge wardrobe items and newly scraped items
        for (const parsedScrape of scrapedItems) {
            finalOutfit.push({
                id: Date.now() + Math.random(),
                name: parsedScrape.name || parsedScrape.title || "Fashion Item",
                brand: parsedScrape.brand || "Stylencia",
                price: parsedScrape.price ? `₹${parsedScrape.price}` : `₹${Math.floor(Math.random() * 2000) + 500}`,
                rating: (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1),
                reviews: Math.floor(Math.random() * 500) + 50,
                image: parsedScrape.image || `https://via.placeholder.com/400x500.png?text=Item`,
                link: parsedScrape.link || "#",
                type: parsedScrape.type || "clothing",
                fromWardrobe: false
            });
        }

        return {
            description: outfitSpec.description,
            items: finalOutfit
        };
    } catch (e) {
        console.error("Resolution error:", e);
        throw e;
    }
}

module.exports = { getFashionRecommendation };
