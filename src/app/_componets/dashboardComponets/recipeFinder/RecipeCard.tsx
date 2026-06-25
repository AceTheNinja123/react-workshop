/**
 * RecipeCard Component
 *
 * This component displays a single recipe card with its image, title, category,
 * a list of key ingredients, and a button to view the full recipe.
 *
 * Features:
 * - Displays recipe image, title, and category.
 * - Lists up to 5 main ingredients.
 * - Provides a link to the full recipe source.
 * - Uses Material-UI for styling and layout.
 * - Includes hover effects for an interactive user experience.
 *
 * Dependencies:
 * - React: For building the user interface.
 * - next/image: For optimized image rendering.
 * - @mui/material: For UI components like Box, Typography, List, ListItem, and Button.
 *
 * Usage:
 * This component is typically used within a `RecipeFinder` component to display
 * search results.
 *
 * Example:
 * ```jsx
 * <RecipeCard recipe={myRecipeData} />
 * ```
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Recipe} props.recipe - The recipe object to display.
 * @returns {JSX.Element} The RecipeCard component.
 */

import React from "react";
import Image from "next/image";
import { Box, Typography, List, ListItem, Button } from "@mui/material";

export interface Recipe {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strSource: string | null;
    strYoutube: string | null;

    // Ingredients (TheMealDB uses numbered fields)
    strIngredient1?: string;
    strIngredient2?: string;
    strIngredient3?: string;
    strIngredient4?: string;
    strIngredient5?: string;
    strIngredient6?: string;
    strIngredient7?: string;
    strIngredient8?: string;
    strIngredient9?: string;
    strIngredient10?: string;
}
interface Props {
    recipe: Recipe;
}

const RecipeCard = ({ recipe }: Props) => {
    function getIngredients(recipe: Recipe): string[] {
        return Object.keys(recipe).filter(key => key.startsWith("strIngredient")).map(key => recipe[key as keyof Recipe]).filter(Boolean) as string[];
    }
    const ingredients = getIngredients(recipe);
    return (
        <Box
            sx={{
                backgroundColor: "white",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                borderRadius: "8px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                height: "100%", // important
                transition: "transform 0.2s ease-in-out",
                "&:hover": { transform: "scale(1.05)" },
            }}
        >
            <Box position="relative">
                <Image
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    width={400}
                    height={300}
                    style={{ objectFit: 'cover', width: '100%', height: '12rem' }}
                />
                {recipe.strCategory && (
                    <Box sx={{ position: "absolute", top: 2, left: 2, backgroundColor: "primary.dark", color: "white", px: 2, py: 1, borderRadius: 1 }}>
                        {recipe.strCategory}
                    </Box>
                )}
            </Box>

            <Box sx={{ p: 2, color: "primary.main", display: "flex", flexDirection: "column", flexGrow: 1 }}>

                {/* CONTENT */}
                <Box>
                    <Typography variant="h6" sx={{ mb: 2, fontSize: "1rem", fontWeight: "bold" }}>{recipe.strMeal}</Typography>
                    <Typography variant="body2" sx={{ mb: 1, fontSize: "0.8rem", fontWeight: "bold" }}>Ingredients:</Typography>

                    <List sx={{ p: 0, m: 0, listStyleType: "disc", pl: 2, fontSize: "0.8rem", }}>
                        {ingredients.slice(0, 5).map((ingredient, i) => (
                            <ListItem key={i} sx={{ display: "list-item", py: 0 }}>{ingredient}</ListItem>
                        ))}
                    </List>
                </Box>

                {/* BUTTON */}
                <Button
                    href={recipe.strSource || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                        mt: "auto",
                        textTransform: "none",
                        fontSize: "1rem",
                        fontWeight: "bold",
                        backgroundColor: "primary.dark",
                        color: "white",
                        borderRadius: 1,
                        "&:hover": { backgroundColor: "primary.main" },
                    }}
                >
                    View Full Recipe
                </Button>
            </Box>

        </Box>
    );
};

export default RecipeCard;