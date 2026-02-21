const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { getFashionRecommendation } = require('./ai/fashionEngine');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/generate-outfit', async (req, res) => {
    try {
        const { gender, occasion, profile, wardrobe = [], budget = 5000 } = req.body;

        if (!gender || !occasion) {
            return res.status(400).json({ error: 'Gender and occasion are required.' });
        }

        console.log(`Generating personalized outfit for ${gender} attending a ${occasion}`);
        if (profile) {
            console.log("Using Profile Traits:", Object.keys(profile).filter(k => profile[k]).join(", "));
        }
        console.log(`Wardrobe size: ${wardrobe.length}, Budget: ₹${budget}`);

        const outfit = await getFashionRecommendation(gender, occasion, profile, wardrobe, budget);
        res.json(outfit);

    } catch (error) {
        console.error("Error generating outfit:", error);
        res.status(500).json({ error: 'Failed to generate outfit' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
