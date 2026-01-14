// hooks/useRecipes.ts
import { useEffect, useState, useCallback } from "react";

/** TheMealDB recipe shape */
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

/** API response shape */
interface MealsResponse {
    meals: Recipe[] | null;
}

export function useRecipes(query: string) {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchRecipes = useCallback(async () => {
        if (!query) return;

        try {
            setLoading(true);
            setError(null);

            const res = await fetch(
                `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
            );

            if (!res.ok) throw new Error("Request failed");

            const data: MealsResponse = await res.json();

            setRecipes(data.meals ?? []);
        } catch {
            setError("Failed to load recipes");
            setRecipes([]);
        } finally {
            setLoading(false);
        }
    }, [query]);

    useEffect(() => {
        fetchRecipes();
    }, [fetchRecipes]);

    return { recipes, loading, error };
}
