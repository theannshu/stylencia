import { products } from '../data/products';

// ================================================
//  PROFILE-BASED PERSONALIZATION HELPERS
// ================================================

/**
 * Returns recommended color palettes based on skin tone.
 */
export const getColorPalette = (skinTone) => {
    const palettes = {
        fair: {
            best: ['pastels', 'soft pink', 'lavender', 'sky blue', 'mint', 'nude', 'ivory'],
            avoid: ['very pale yellow', 'washed-out white'],
            hex: ['#FADADD', '#C8A2C8', '#B0D4E3', '#F0FFF0', '#F5F0E0']
        },
        medium: {
            best: ['warm coral', 'terracotta', 'peach', 'warm white', 'earthy green', 'rust', 'camel'],
            avoid: ['neons', 'very dark brown'],
            hex: ['#FF7F6E', '#C47451', '#FFDAB9', '#FFFAF0', '#6A9A6F']
        },
        olive: {
            best: ['jewel tones', 'emerald', 'royal blue', 'mustard', 'off-white', 'bronze', 'plum'],
            avoid: ['olive green (clashes)', 'khaki'],
            hex: ['#50C878', '#4169E1', '#FFDB58', '#FAF9F6', '#6B3FA0']
        },
        brown: {
            best: ['bold colors', 'orange', 'cobalt blue', 'bright white', 'gold', 'yellow', 'hot pink'],
            avoid: ['dark brown', 'navy'],
            hex: ['#FFA500', '#0047AB', '#FFFFFF', '#FFD700', '#FF69B4']
        },
        dark: {
            best: ['vibrant hues', 'white', 'bright yellow', 'electric blue', 'fuchsia', 'red', 'gold'],
            avoid: ['dark purple', 'dark navy'],
            hex: ['#FFFFFF', '#FFFF00', '#007FFF', '#FF00FF', '#FF0000']
        }
    };
    return palettes[skinTone] || palettes['medium'];
};

/**
 * Returns body-type-specific styling advice.
 */
export const getBodyTypeAdvice = (bodyType, gender) => {
    if (!bodyType) return null;
    const key = bodyType.toLowerCase().replace(' ', '');
    const advice = {
        hourglass: {
            tip: 'Your balanced proportions suit almost everything! Highlight your waist with belted outfits, wrap dresses, and fitted silhouettes.',
            avoid: 'Boxy or shapeless cuts that hide your figure.',
            bestFit: ['fitted', 'wrapdress', 'belted']
        },
        pear: {
            tip: 'Balance your silhouette by drawing attention upward. A-line skirts, wide-leg trousers, and bold tops work beautifully.',
            avoid: 'Tight-fitting bottoms or heavy embellishments on hips.',
            bestFit: ['aline', 'wideleg', 'boldtop']
        },
        apple: {
            tip: 'Create definition with empire-waist cuts, flowy fabrics, and V-necks that elongate your frame.',
            avoid: 'Clingy fabrics around the midsection or high-waisted bottoms.',
            bestFit: ['empire', 'vneck', 'flowy']
        },
        rectangle: {
            tip: 'Create curves with peplum tops, ruffles, layered looks, and high-waist bottoms to define your waist.',
            avoid: 'Straight, boxy cuts with no waist definition.',
            bestFit: ['peplum', 'ruffled', 'layered']
        },
        invertedtriangle: {
            tip: 'Balance broad shoulders by adding volume below — flared skirts, wide-leg pants, and minimal shoulder details.',
            avoid: 'Shoulder pads, boat necks, and horizontal stripes on top.',
            bestFit: ['flared', 'wide', 'scoopneck']
        },
        athletic: {
            tip: 'Embrace your toned physique! Bodycon styles, structured shoulders, and high-necks accentuate your athletic build.',
            avoid: 'Oversized fits that hide your shape.',
            bestFit: ['bodycon', 'structured', 'highwaist']
        }
    };
    return advice[key] || null;
};

/**
 * Returns face-shape-specific neckline & accessory advice.
 */
export const getFaceShapeAdvice = (faceShape) => {
    if (!faceShape) return null;
    const advice = {
        oval: {
            tip: 'Lucky you — the oval face is the most versatile! Almost any neckline and accessory style works.',
            neckline: 'V-neck, crew neck, square neck — anything goes!',
            accessories: 'Statement earrings, layered necklaces, bold scarves.'
        },
        round: {
            tip: 'Elongate your face with V-necks and longer necklaces that draw the eye downward.',
            neckline: 'V-neck, deep scoop, or sweetheart necklines.',
            accessories: 'Long pendants, drop earrings, longer scarves.'
        },
        square: {
            tip: 'Soften angular features with round necklines, scoop necks, and flowing fabrics.',
            neckline: 'Round neck, cowl neck, scoop neck, off-shoulder.',
            accessories: 'Hoop earrings, curved or circular jewelry.'
        },
        diamond: {
            tip: 'Balance a narrow chin with volume at the forehead and collar area.',
            neckline: 'Boat neck, off-shoulder, wide-collar shirts.',
            accessories: 'Stud earrings, wide headbands.'
        },
        heart: {
            tip: 'Balance a wider forehead with width at the jawline — scoop necks and boat necks are your best friends.',
            neckline: 'Boat neck, scoop neck, cowl neck.',
            accessories: 'Drop earrings, chokers, necklaces that draw the eye down.'
        },
        oblong: {
            tip: 'Add width with horizontal necklines and avoid styles that elongate further.',
            neckline: 'Boat neck, turtleneck, halter neck.',
            accessories: 'Wide-brim hats, chunky short necklaces, stud earrings.'
        }
    };
    return advice[faceShape] || null;
};

/**
 * Returns height-based styling tips.
 */
export const getHeightAdvice = (height) => {
    const h = parseInt(height);
    if (isNaN(h)) return null;
    if (h < 158) {
        return {
            category: 'Petite',
            tip: 'Choose vertical stripes, monochrome outfits, and high-waist bottoms to create the illusion of height.',
            avoid: 'Oversized clothing, wide belts, and horizontal stripes.'
        };
    } else if (h <= 170) {
        return {
            category: 'Average',
            tip: 'You have great flexibility! Most silhouettes work well — experiment freely with proportions.',
            avoid: 'Nothing specific, but balanced proportions always look best.'
        };
    } else {
        return {
            category: 'Tall',
            tip: 'Show off your height with midi lengths, maxi dresses, wide-leg trousers, and layered outfits.',
            avoid: 'Very short hemlines or extremely cropped combinations if you want a sophisticated look.'
        };
    }
};

// ================================================
//  VIBE DEFINITIONS (Style Archetypes)
// ================================================

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
        ],
        party: [
            { id: 'glam', label: 'Party Glam', description: "Shimmer, sequins, and statement silhouettes. Dress to dazzle at any celebration." },
            { id: 'boho', label: 'Festival Boho', description: "Flowy fringe, bold prints, and layered jewellery. The perfect festive-casual look." },
            { id: 'edgy', label: 'After Dark Edge', description: "Bold and daring cuts with dark aesthetics. Designed to make a statement at any after-party." }
        ],
        sport: [
            { id: 'streetwear', label: 'Athleisure Chic', description: "High-performance meets high-fashion. Stylish activewear that transitions from gym to street seamlessly." },
            { id: 'classic', label: 'Performance Focus', description: "Function-first athletic wear in classic tones — designed for movement and comfort." }
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
        ],
        party: [
            { id: 'edgy', label: 'Party Rocker', description: "Bold prints, dark tones, statement shoes. Own the night at any party." },
            { id: 'minimalist', label: 'Clean Party', description: "Sharp, minimal, and effortlessly cool. A well-fitted outfit in quality fabric never disappoints." }
        ],
        sport: [
            { id: 'streetwear', label: 'Athleisure King', description: "Performance meets style. Track pants, joggers, and stylish sneakers for the active lifestyle." },
            { id: 'classic', label: 'Athletic Classic', description: "Classic sportswear — practical, comfortable, and polished for gym or casual sport." }
        ]
    }
};

// ================================================
//  SMART OUTFIT GENERATOR
// ================================================

export const generateOutfit = (gender, occasion, userProfile = {}) => {
    const { skinTone, bodyType } = userProfile;

    // 1. Pick a vibe
    const possibleVibes = vibes[gender]?.[occasion] || vibes['women']['casual'];
    const selectedVibe = possibleVibes[Math.floor(Math.random() * possibleVibes.length)];

    // 2. Filter products by gender, occasion, vibe
    let relevantProducts = products.filter(p =>
        p.tags.includes(gender) &&
        p.tags.includes(occasion) &&
        p.tags.includes(selectedVibe.id)
    );

    // Fallback: relax vibe constraint
    if (relevantProducts.length < 3) {
        const generic = products.filter(p =>
            p.tags.includes(gender) &&
            p.tags.includes(occasion)
        );
        relevantProducts = [...new Set([...relevantProducts, ...generic])];
    }

    // 3. Boost items that suit the user's skin tone (if any color tags match)
    if (skinTone) {
        const palette = getColorPalette(skinTone);
        const suitableColors = palette.best.map(c => c.toLowerCase());
        // Sort: items with matching colors first
        relevantProducts.sort((a, b) => {
            const aMatch = suitableColors.some(c => a.color && a.color.toLowerCase().includes(c.split(' ')[0]));
            const bMatch = suitableColors.some(c => b.color && b.color.toLowerCase().includes(c.split(' ')[0]));
            return (bMatch ? 1 : 0) - (aMatch ? 1 : 0);
        });
    }

    // 4. Select items by clothing type
    const selectedItems = [];
    const usedTypes = new Set();

    const addByType = (type) => {
        const shuffled = [...relevantProducts].sort(() => 0.5 - Math.random());
        const match = shuffled.find(p => p.tags.includes(type) && !usedTypes.has(type));
        if (match) {
            selectedItems.push(match);
            usedTypes.add(type);
        }
    };

    addByType('upper');
    addByType('lower');
    addByType('shoes');
    addByType('accessory');

    // Ensure minimum 3 items
    if (selectedItems.length < 3) {
        const extras = relevantProducts
            .filter(p => !selectedItems.includes(p))
            .slice(0, 3 - selectedItems.length);
        selectedItems.push(...extras);
    }

    // 5. Build style tips based on profile
    const colorTips = skinTone ? `✨ Colors that flatter your ${skinTone} skin tone: ${getColorPalette(skinTone).best.slice(0, 4).join(', ')}.` : '';
    const bodyTip = bodyType ? getBodyTypeAdvice(bodyType, gender)?.tip || '' : '';

    return {
        description: `**${selectedVibe.label}**\n\n${selectedVibe.description}`,
        vibe: selectedVibe,
        items: selectedItems,
        styleTips: [colorTips, bodyTip].filter(Boolean)
    };
};

// ================================================
//  WARDROBE-AWARE SUGGESTION ENGINE
// ================================================

export const getWardrobeSuggestions = (wardrobe, occasion, userProfile = {}) => {
    const gender = userProfile.gender || 'women';

    // 1. From Closet: items in wardrobe matching occasion
    const closetItems = wardrobe.filter(item => item.occasion === occasion);
    const closetOutfit = {
        upper: closetItems.find(i => i.type === 'upper'),
        lower: closetItems.find(i => i.type === 'lower'),
        shoes: closetItems.find(i => i.type === 'shoes'),
        accessory: closetItems.find(i => i.type === 'accessory')
    };
    const hasFullOutfit = closetOutfit.upper && (closetOutfit.lower || closetOutfit.shoes);

    // 2. Mix & Match: wardrobe base + store items
    const baseItem = closetItems.length > 0 ? closetItems[Math.floor(Math.random() * closetItems.length)] : null;
    let mixMatchItems = [];

    if (baseItem) {
        mixMatchItems.push(baseItem);
        const neededTypes = ['upper', 'lower', 'shoes', 'accessory'].filter(t => t !== baseItem.type);
        neededTypes.forEach(type => {
            const match = products.find(p =>
                p.tags.includes(gender) &&
                p.tags.includes(occasion) &&
                p.tags.includes(type)
            );
            if (match) mixMatchItems.push(match);
        });
    }

    // 3. New Look: AI-picked full outfit from store
    const newLook = generateOutfit(gender, occasion, userProfile);

    return {
        closet: hasFullOutfit ? Object.values(closetOutfit).filter(Boolean) : [],
        mixMatch: mixMatchItems,
        newLook
    };
};
