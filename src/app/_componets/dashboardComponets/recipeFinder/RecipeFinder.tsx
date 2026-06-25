/**
 * RecipeFinder Component
 *
 * This component provides a recipe search interface. Users can search for recipes by ingredient,
 * and the results are displayed as a collection of `RecipeCard` components.
 *
 * Features:
 * - Fetches recipe data from TheMealDB API using a custom hook `useRecipes`.
 * - Displays a search input field and a search button.
 * - Renders `RecipeCard` components for each search result.
 * - Shows loading and error states.
 * - Uses Material-UI for styling and layout.
 * - Integrates `ScrollbarComponents` for scrollable content.
 *
 * Dependencies:
 * - React: For building the user interface and managing state.
 * - @mui/material: For UI components like Box, Typography, and Button.
 * - ../../../hooks/useRecipes: Custom hook for fetching recipe data.
 * - ../../custom-scroll/ScrollbarComponents: Custom scrollbar component.
 * - ./RecipeCard: Component to display individual recipe details.
 *
 * Usage:
 * This component can be integrated into a larger application, typically within a dashboard or a recipe section.
 *
 * Example:
 * ```jsx
 * <RecipeFinder />
 * ```
 *This inspiration was taken from GeeksforGeeks article: https://www.geeksforgeeks.org/reactjs/recipe-finder-using-reactjs/
 * @component
 * @returns {JSX.Element} The RecipeFinder component.
 */

import React, { useState } from "react";
import RecipeCard from "./RecipeCard";
import { useRecipes } from "../../../hooks/useRecipes";
import { Box, Typography, Button } from "@mui/material";
import ScrollbarComponents from "@/app/_componets/custom-scroll/ScrollbarComponents";

const RecipeFinder = () => {
    const [searchInput, setSearchInput] = useState("");
    const [query, setQuery] = useState("chicken");
    const { recipes, loading, error } = useRecipes(query);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchInput.trim()) return;
        setQuery(searchInput);
        setSearchInput("");
    };

    return (
        <Box sx={{ backgroundColor: "primary.light", minHeight: "100%", fontFamily: "sans-serif", p: 2 }}>
            <Box sx={{ backgroundColor: "primary.dark", py: 2, textAlign: "center", color: "white", mb: 4, }}>
                <Typography variant="h1" color={"white"} sx={{ fontSize: "2.5rem", fontWeight: "800" }}>Recipe Finder</Typography>
            </Box>
            <form onSubmit={onSubmit} style={{ maxWidth: "600px", margin: "0 auto 2rem", display: "flex", gap: "1rem" }}>
                <input
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search for recipes..."
                    style={{ flex: "1", padding: "0.5rem", border: "1px solid #ccc", borderRadius: "0.5rem" }}
                />
                <Button type="submit" variant="contained" color="primary" style={{ padding: "0.5rem 1rem", borderRadius: "0.5rem" }}>Search</Button>
            </form>
            {loading && <Typography variant="body1" sx={{ textAlign: "center", mt: 2 }}>Loading...</Typography>}
            {error && <Typography variant="body1" sx={{ textAlign: "center", mt: 2, color: "red" }}>{error}</Typography>}
            <ScrollbarComponents sx={{ height: "calc(100% - 200px)", padding: 2, }}>
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr", lg: "1fr 1fr 1fr" }, gap: 4, p: 2 }}>
                    {recipes.map((meal) => (<RecipeCard key={meal.idMeal} recipe={meal} />))}
                </Box>
            </ScrollbarComponents>
        </Box>
    );
};
export default RecipeFinder;