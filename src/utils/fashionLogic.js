import { products } from '../data/products';

// Expert Rules for Outfit Generation
const expertRules = {
    women: {
        wedding: {
            description: "For a wedding, Stylencia recommends embracing rich, regal colors. We've selected an elegant ethnic ensemble paired with statement jewelry. The gold accents add a festive touch, perfect for the celebration.",
            requiredTags: ['upper', 'shoes', 'accessory']
        },
        office: {
            description: "For the workplace, we suggest a clean, professional silhouette. This combination balances comfort with authority, featuring neutral tones and structured fabrics that command respect while keeping you at ease.",
            requiredTags: ['upper', 'lower', 'accessory']
        },
        date: {
            description: "For a date night, Stylencia curated a look that is chic and confident. The outfit highlights a sophisticated aesthetic with a touch of glamour, ensuring you make a memorable impression.",
            requiredTags: ['upper', 'shoes', 'accessory']
        },
        casual: {
            description: "For a casual day out, comfort is key without compromising style. We've picked a breezy, relaxed outfit paired with versatile footwear, perfect for brunch or a day of shopping.",
            requiredTags: ['upper', 'shoes'] // Minimal requirement
        }
    },
    men: {
        wedding: {
            description: "For a wedding, tradition meets modern class. Stylencia recommends a Sherwani or Kurta set in deep, royal hues. Paired with classic Mojaris, this look is timeless and culturally rich.",
            requiredTags: ['upper', 'shoes']
        },
        office: {
            description: "For the office, sharp tailoring is essential. We've selected a crisp shirt and well-fitted trousers. This look conveys professionalism and attention to detail, ideal for meetings and daily work.",
            requiredTags: ['upper', 'lower', 'accessory']
        },
        date: {
            description: "For a date, we recommend a smart-casual approach. A well-fitted top with clean boots or shoes strikes the perfect balance between relaxed and refined. It shows effort without trying too hard.",
            requiredTags: ['upper', 'shoes', 'accessory']
        },
        casual: {
            description: "For the weekend, keep it cool and effortless. A graphic tee or casual shirt with denim is a staple combo. Paired with fresh sneakers, this look is ready for anything.",
            requiredTags: ['upper', 'lower', 'shoes']
        }
    }
};

export const generateOutfit = (gender, occasion) => {
    const rules = expertRules[gender][occasion];

    // 1. Filter products for this specific gender and occasion
    const relevantProducts = products.filter(p =>
        p.tags.includes(gender) && p.tags.includes(occasion)
    );

    // 2. Select best items based on required tags (simulating "styling")
    const selectedItems = [];
    const usedTypes = new Set();

    // Prioritize high-rated items first
    const sortedProducts = [...relevantProducts].sort((a, b) => b.rating - a.rating);

    // Try to fill the "required" slots first
    rules.requiredTags.forEach(tag => {
        const match = sortedProducts.find(p => p.tags.includes(tag) && !usedTypes.has(tag));
        if (match) {
            selectedItems.push(match);
            usedTypes.add(tag);
        }
    });

    // If we still have very few items, fill with *any* other valid item for this category
    if (selectedItems.length < 2) {
        const extras = sortedProducts.filter(p => !selectedItems.includes(p)).slice(0, 2);
        selectedItems.push(...extras);
    }

    return {
        description: rules.description,
        items: selectedItems
    };
};
