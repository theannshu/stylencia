import { products } from '../data/products';

// Vibe Definitions (Style Archetypes)
export const vibes = {
    women: {
        wedding: [
            { id: 'royal', label: 'Royal & Traditional', description: "A majestic look featuring deep colors and heavy embroidery, perfect for a grand celebration." },
            { id: 'modern', label: 'Modern Chic', description: "A contemporary take on wedding wear, blending traditional silhouettes with modern cuts and pastel hues." },
            { id: 'classic', label: 'Timeless Classic', description: "An elegant and evergreen ensemble that never goes out of style, focusing on grace and poise." }
        ],
        office: [
            { id: 'power', label: 'Power Dressing', description: "Command the room with sharp tailoring and bold silhouettes. This look is all about confidence and authority." },
            { id: 'chic', label: 'Effortlessly Chic', description: "A stylish yet professional look that balances comfort with high fashion. Perfect for a creative workspace." },
            { id: 'classic', label: 'Corporate Classic', description: "The gold standard of office wear. Clean lines, neutral tones, and understated elegance." }
        ],
        date: [
            { id: 'glam', label: 'Night Out Glam', description: "Turn heads with this high-impact look. Sparkles, bold cuts, and statement accessories for a memorable night." },
            { id: 'romantic', label: 'Soft & Romantic', description: "A dreamy aesthetic featuring soft fabrics, lace, and gentle colors. Perfect for a candlelit dinner." },
            { id: 'edgy', label: 'Edgy & Bold', description: "For the woman who loves to break rules. Leather accents and dark tones create a mysterious and alluring vibe." }
        ],
        casual: [
            { id: 'boho', label: 'Bohemian Free Spirit', description: "Relaxed fits, floral prints, and artistic accessories. A comfortable look that expresses creativity." },
            { id: 'streetwear', label: 'Urban Streetwear', description: "Cool, comfortable, and on-trend. Sneakers and oversized fits make this perfect for the city." },
            { id: 'classic', label: 'Casual Classic', description: "Simple, effective, and always good looking. Basic staples paired perfectly for an effortless day out." }
        ]
    },
    men: {
        wedding: [
            { id: 'royal', label: 'Royal Maharaja', description: "Embrace the grandeur of Indian weddings with a regal Sherwani and traditional accessories." },
            { id: 'modern', label: 'Modern Groom', description: "A sleek and contemporary ethnic look. Minimalist cuts with premium fabrics for the modern man." },
            { id: 'classic', label: 'Traditional Classic', description: "The quintessential wedding look. A timeless Kurta set that honors tradition with elegance." }
        ],
        office: [
            { id: 'classic', label: 'Corporate Sharp', description: "The definitive business look. Crisp shirts and well-fitted trousers for the serious professional." },
            { id: 'modern', label: 'Modern Business', description: "A fresh take on office wear. Mixing patterns and textures for a look that is professional yet interesting." },
            { id: 'classic', label: 'Smart Casual', description: "Perfect for Fridays or creative offices. Polished but relaxed, bridging the gap between work and play." }
        ],
        date: [
            { id: 'minimalist', label: 'Sleek Minimalist', description: "Less is more. Clean lines, solid colors, and a focus on fit. A sophisticated look that speaks volumes." },
            { id: 'edgy', label: 'Rockstar Edge', description: "Leather jackets, boots, and attitude. A bold look for a confident date night." },
            { id: 'casual-chic', label: 'Relaxed Charm', description: "Approachable and stylish. Linen shirts and smart trousers for a vibe that is effortless and charming." }
        ],
        casual: [
            { id: 'streetwear', label: 'Hypebeast Streetwear', description: "Trendy, bold, and comfortable. Graphic tees and sneakers for a youthful and energetic vibe." },
            { id: 'relaxed', label: 'Laid-back Weekend', description: "Maximum comfort without looking sloppy. Hoodies and cargos for a chilled out Sunday." },
            { id: 'classic', label: 'Smart Casual', description: "A polo and jeans combo that works everywhere. The reliable choice for a casual day out." }
        ]
    }
};

export const generateOutfit = (gender, occasion) => {
    // 1. Randomly select a "Vibe" for this generation
    const possibleVibes = vibes[gender][occasion];
    const selectedVibe = possibleVibes[Math.floor(Math.random() * possibleVibes.length)];

    // 2. Filter products for this specific gender, occasion AND vibe
    let relevantProducts = products.filter(p =>
        p.tags.includes(gender) &&
        p.tags.includes(occasion) &&
        p.tags.includes(selectedVibe.id)
    );

    // Fallback: If not enough items for this specific vibe, mix in generic items for the occasion
    if (relevantProducts.length < 3) {
        const genericProducts = products.filter(p =>
            p.tags.includes(gender) &&
            p.tags.includes(occasion) &&
            !p.tags.includes(selectedVibe.id)
        );
        relevantProducts = [...relevantProducts, ...genericProducts];
    }

    // 3. Select best items (Upper, Lower/Shoes, Accessory)
    const selectedItems = [];
    const usedTypes = new Set();

    // Helper to find and add item
    const addByType = (type) => {
        // Shuffle relevant products to ensure variety even within the same vibe
        const shuffled = [...relevantProducts].sort(() => 0.5 - Math.random());
        const match = shuffled.find(p => p.tags.includes(type) && !usedTypes.has(type));
        if (match) {
            selectedItems.push(match);
            usedTypes.add(type);
        }
    };

    addByType('upper');
    addByType('lower'); // Some outfits might not have lower (e.g. dresses), logic handles this by just skipping
    addByType('shoes');
    addByType('accessory');

    // Ensure we have at least 3 items
    if (selectedItems.length < 3) {
        const extras = relevantProducts.filter(p => !selectedItems.includes(p)).slice(0, 3 - selectedItems.length);
        selectedItems.push(...extras);
    }

    return {
        description: `**Vibe: ${selectedVibe.label}**\n\n${selectedVibe.description}`,
        items: selectedItems
    };
};

export const getWardrobeSuggestions = (wardrobe, occasion, gender) => {
    // 1. From your Closet (Complete outfits from wardrobe)
    const closetItems = wardrobe.filter(item => item.occasion === occasion);
    const closetOutfit = {
        upper: closetItems.find(i => i.type === 'upper'),
        lower: closetItems.find(i => i.type === 'lower'),
        shoes: closetItems.find(i => i.type === 'shoes'),
        accessory: closetItems.find(i => i.type === 'accessory')
    };

    const hasFullOutfit = closetOutfit.upper && (closetOutfit.lower || closetOutfit.shoes);

    // 2. Mix & Match (Wardrobe + Store)
    // Find a wardrobe item to build around
    const baseItem = closetItems.length > 0 ? closetItems[Math.floor(Math.random() * closetItems.length)] : null;
    let mixMatchItems = [];

    if (baseItem) {
        mixMatchItems.push(baseItem);

        // Find complementary items from store
        const neededTypes = ['upper', 'lower', 'shoes', 'accessory'].filter(t => t !== baseItem.type);

        neededTypes.forEach(type => {
            // Simple logic: find store item of needed type for same occasion/gender
            // In a real app, we'd match colors/styles
            const match = products.find(p =>
                p.tags.includes(gender) &&
                p.tags.includes(occasion) &&
                p.tags.includes(type)
            );
            if (match) mixMatchItems.push(match);
        });
    }

    return {
        closet: hasFullOutfit ? Object.values(closetOutfit).filter(Boolean) : [],
        mixMatch: mixMatchItems,
        newLook: generateOutfit(gender, occasion)
    };
};
