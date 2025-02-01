document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const location = params.get("location");
    const rating = params.get("rating");
    const condition = params.get("condition");
  
    const resultsContainer = document.getElementById("results");
  
    try {
      const response = await fetch("http://localhost:3000/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location, rating, condition }),
      });
  
      const results = await response.json();
  
      if (results.length === 0) {
        resultsContainer.innerHTML = "<p>No results found.</p>";
        return;
      }
  
      results.forEach((place) => {
        const card = document.createElement("div");
        card.className = "result-card";
        card.innerHTML = `
          <h2>${place.name}</h2>
          <p>Rating: ${place.rating}</p>
          <p>Address: ${place.formatted_address || "N/A"}</p>
        `;
        resultsContainer.appendChild(card);
      });
    } catch (error) {
      console.error("Error fetching results:", error);
      resultsContainer.innerHTML = "<p>Error fetching results. Please try again.</p>";
    }
  });
  