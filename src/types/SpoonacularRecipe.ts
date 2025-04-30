export interface SpoonacularRecipe {
    id: number;
    title: string;
    image?: string | null;
    imageType?: string | null;
    readyInMinutes?: number | null;
    servings?: number | null;
    summary?: string | null;
    vegetarian?: boolean | null;
    vegan?: boolean | null;
    glutenFree?: boolean | null;
    dairyFree?: boolean | null;
    veryHealthy?: boolean | null;
    cheap?: boolean | null;
    veryPopular?: boolean | null;
    sustainable?: boolean | null;
    lowFodmap?: boolean | null;
    weightWatcherSmartPoints?: number | null;
    gaps?: string | null;
    preparationMinutes?: number | null;
    cookingMinutes?: number | null;
    aggregateLikes?: number | null;
    healthScore?: number | null;
    creditsText?: string | null;
    license?: string | null;
    sourceName?: string | null;
    pricePerServing?: number | null;
    cuisines?: string[] | null;
    dishTypes?: string[] | null;
    diets?: string[] | null;
    occasions?: string[] | null;
    simplifiedInstructions?: Array<{
        number?: number | null;
        step?: string | null;
        ingredients?: string[] | null;
    }> | null;
    analyzedInstructions?: Array<{
      name?: string | null;
      steps?: Array<{
        number?: number | null;
        step?: string | null;
        ingredients?: Array<{
          id?: number | null;
          name?: string | null;
          localizedName?: string | null;
          image?: string | null;
        }> | null;
        equipment?: Array<{
          id?: number | null;
          name?: string | null;
          localizedName?: string | null;
          image?: string | null;
        }> | null;
        length?: {
          number?: number | null;
          unit?: string | null;
        } | null;
      }> | null;
    }> | null;
    instructions?: string | null;
}
