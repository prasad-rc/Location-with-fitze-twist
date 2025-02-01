const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 3000;

// Replace this with your actual Google Places API key
const GOOGLE_API_KEY = "YOUR_GOOGLE_API_KEY";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// API Endpoint for search
app.post("/search", async (req, res) => {
    const { location, rating, condition } = req.body;

    try {
        // Google Places API request
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/place/textsearch/json`,
            {
                params: {
                    query: `restaurants in ${location}`,
                    key: GOOGLE_API_KEY,
                },
            }
        );

        const places = response.data.results;

        // Filter results based on rating and condition
        const filteredResults = places.filter((place) => {
            return (
                place.rating >= parseInt(rating) &&
                (condition === "noWebsite" ? !place.website : true)
            );
        });

        res.json(filteredResults);
    } catch (error) {
        console.error("Error fetching data from Google Places API:", error);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
