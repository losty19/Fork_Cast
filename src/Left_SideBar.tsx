import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';
import './Left_SideBar.css';
import { useState, useRef, useEffect } from "react";
import { RuxIcon, RuxDialog, RuxToast } from "@astrouxds/react";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import { generateClient } from 'aws-amplify/api';
import { Schema } from '../amplify/data/resource';
import { getCurrentUser } from "aws-amplify/auth";
import { SpoonacularRecipe } from "./types/SpoonacularRecipe";

const client = generateClient<Schema>();

interface Ingredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
  original: string;
}

const unitOptions = [
  { value: 'cup', label: 'Cup' },
  { value: 'tablespoon', label: 'Tablespoon' },
  { value: 'teaspoon', label: 'Teaspoon' },
  { value: 'pint', label: 'Pint' },
  { value: 'quart', label: 'Quart' },
  { value: 'liter', label: 'Liter' },
  { value: 'gram', label: 'Gram' },
  { value: 'kilogram', label: 'Kilogram' },
  { value: 'ounce', label: 'Ounce' },
  { value: 'pound', label: 'Pound' },
  { value: 'slice', label: 'Slice' },
  { value: 'piece', label: 'Piece' },
];

// Helper: build a de-duped ingredient array from the recipe
const getInitialIngredients = (recipe: SpoonacularRecipe): Ingredient[] => {
  const names = recipe.simplifiedInstructions
    ? recipe.simplifiedInstructions.flatMap(step => step.ingredients || [])
    : [];
  const uniqueNames = Array.from(new Set(names));
  return uniqueNames.map((name, idx) => ({
    id: Date.now() + idx,
    name,
    amount: 1,       // Default quantity
    unit: '',
    original: name,
  }));
};

const LSideBar = ({ recipe }: { recipe: SpoonacularRecipe }) => {
  const [EditOpen, setEditOpen] = useState(false);
  const navigate = useNavigate();
  const [icon, setIcon] = useState("star-border");
  // Initialize editedRecipe with deduped ingredients
  const [editedRecipe, setEditedRecipe] = useState({
    ...recipe,
    ingredients: getInitialIngredients(recipe),               // ← deduped here
    instructions: recipe.simplifiedInstructions
      ? recipe.simplifiedInstructions
          .map(step => `Step ${step.number}: ${step.step}`)
          .join('\n')
      : '',
  });
  const [descriptionHeight, setDescriptionHeight] = useState<number | undefined>(undefined);
  const [titleHeight, setTitleHeight] = useState<number | undefined>(undefined);
  const [instructionsHeight, setInstructionHeight] = useState<number | undefined>(undefined);
  const [newIngredientName, setNewIngredientName] = useState('');
  const [newIngredientAmount, setNewIngredientAmount] = useState<number | undefined>(undefined);
  const [newIngredientUnit, setNewIngredientUnit] = useState('');
  const [editingStates, setEditingStates] = useState<{ [key: number]: boolean }>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [favoritedIds, setFavoritedIds] = useState<string[]>([]);
  

  const handleEditToggle = (id: number) => {
    setEditingStates(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getTextAreaHeight = (text: string) => {
    const hidden = document.createElement("textarea");
    hidden.style.position = "absolute";
    hidden.style.height = "auto";
    hidden.style.width = "50vw";
    hidden.style.fontFamily = "monospace";
    hidden.style.fontSize = "16.67px";
    hidden.style.padding = "7px";
    hidden.value = text;
    document.body.appendChild(hidden);
    const height = hidden.scrollHeight;
    document.body.removeChild(hidden);
    return height;
  };

  const handleAddToGroceryList = () => {
    const stored = localStorage.getItem('groceryItems');
    let existingItems = stored ? JSON.parse(stored) : [];
    let maxId = existingItems.reduce((max: number, item: any) => Math.max(max, item.id), 0);
    const ingredients = recipe.simplifiedInstructions?.flatMap(step => step.ingredients || []) || [];

    const uniqueIngredients = Array.from(new Set(ingredients)); // Remove duplicates

    uniqueIngredients.forEach(ingredient => {
      if (existingItems.some((item: { name: string }) => item.name === ingredient)) {
        return; // Skip if already exists
      }

      maxId++;
      existingItems.push({
        id: maxId,
        name: ingredient,
        quantity: 1, // Default quantity, as API doesn't provide amount
        measurement: '',
        checked: false
      });
    });
    localStorage.setItem('groceryItems', JSON.stringify(existingItems));
    navigate("/grocery-list");
  };

  const buttonPressed = () => {
    setEditOpen(!EditOpen);
  };

  // SUBMIT EDITS
  const handleSubmit = async () => {
    try {
      const userId = (await getCurrentUser()).userId;
      const recipeId = recipe.recipeId ?? recipe.id.toString();

      // Transform ingredients back to simplifiedInstructions
      const simplifiedInstructions = editedRecipe.ingredients.map((ing, idx) => ({
        number: idx + 1,
        step: editedRecipe.instructions.split('\n')[idx] || `Use ${ing.name}`,
        ingredients: [ing.name],
      }));

      // Check if recipe is already saved
      const { data: savedRecipes } = await client.models.SavedRecipe.list({
        filter: { userId: { eq: userId }, recipeId: { eq: recipeId } },
      });

      if (savedRecipes.length > 0) {
        // Update existing recipe
        const { errors } = await client.models.SavedRecipe.update({
          id: savedRecipes[0].id,
          title: editedRecipe.title,
          summary: editedRecipe.summary,
          simplifiedInstructions,
          instructions: editedRecipe.instructions,
        });
        if (errors) {
          console.error('Error updating recipe:', errors);
          setToastMessage('Failed to update recipe.');
          return;
        }
        setToastMessage('Recipe updated successfully!');
      } else {
        // Create new recipe
        const { errors } = await client.models.SavedRecipe.create({
          recipeId,
          userId,
          title: editedRecipe.title,
          image: recipe.image,
          readyInMinutes: recipe.readyInMinutes,
          servings: recipe.servings,
          summary: editedRecipe.summary,
          vegetarian: recipe.vegetarian,
          vegan: recipe.vegan,
          glutenFree: recipe.glutenFree,
          dairyFree: recipe.dairyFree,
          veryHealthy: recipe.veryHealthy,
          cheap: recipe.cheap,
          veryPopular: recipe.veryPopular,
          sustainable: recipe.sustainable,
          lowFodmap: recipe.lowFodmap,
          weightWatcherSmartPoints: recipe.weightWatcherSmartPoints,
          gaps: recipe.gaps,
          preparationMinutes: recipe.preparationMinutes,
          cookingMinutes: recipe.cookingMinutes,
          aggregateLikes: recipe.aggregateLikes,
          healthScore: recipe.healthScore,
          creditsText: recipe.creditsText,
          license: recipe.license,
          sourceName: recipe.sourceName,
          pricePerServing: recipe.pricePerServing,
          cuisines: recipe.cuisines,
          dishTypes: recipe.dishTypes,
          diets: recipe.diets,
          occasions: recipe.occasions,
          simplifiedInstructions,
          instructions: editedRecipe.instructions,
        });
        if (errors) {
          console.error('Error saving recipe:', errors);
          setToastMessage('Failed to save recipe.');
          return;
        }
        setToastMessage('Recipe saved successfully!');
      }
      setEditOpen(false);
    } catch (error) {
      console.error('Error handling submit:', error);
      setToastMessage('Error saving recipe.');
    } finally {
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  const handleDialogClose = () => {
    setEditedRecipe({
      ...recipe,
      ingredients: recipe.simplifiedInstructions
        ? recipe.simplifiedInstructions.flatMap(step =>
            (step.ingredients ?? []).map((name, idx) => ({
              id: Date.now() + idx,
              name,
              amount: 1,
              unit: '',
              original: name,
            }))
          )
        : [],
      instructions: recipe.simplifiedInstructions
        ? recipe.simplifiedInstructions.map(step => `Step ${step.number}: ${step.step}`).join('\n')
        : '',
    });
    setEditOpen(false);
  };

  // Helper function to transform instructions
  const transformInstructions = (
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
      }> | null;
    }> | null
  ) => {
    if (!analyzedInstructions) return null;
    return analyzedInstructions
      .flatMap(instruction =>
        instruction.steps?.map(step => ({
          number: step.number ?? 0,
          step: step.step ?? '',
          ingredients: step.ingredients?.filter(ing => ing?.name).map(ing => ing!.name!) ?? [],
        })) ?? []
      )
      .filter(step => step.step); // Remove steps with empty step text
  };

  // Handle favorite button click
  const handleFavorite = async () => {
    try {
    const userId = (await getCurrentUser()).userId;
    const recipeId = recipe.recipeId ?? recipe.id.toString();
    console.log("(LSB) recipeId: ", recipeId);

    if (favoritedIds.includes(recipeId)) {
      // Remove from favorites
      const { data: savedRecipes } = await client.models.SavedRecipe.list({
        filter: { userId: { eq: userId }, recipeId: { eq: recipeId } },
      });
      if (savedRecipes.length > 0) {
        await client.models.SavedRecipe.delete({ id: savedRecipes[0].id });
        setFavoritedIds(prev => prev.filter(id => id !== recipeId));
      }
    }
    else {
      const simplifiedInstructions = transformInstructions(recipe.analyzedInstructions) || recipe.simplifiedInstructions;
      // Create new recipe
      const { errors, data: newRecipe } = await client.models.SavedRecipe.create({
        recipeId,
        userId,
        title: recipe.title,
        image: recipe.image,
        readyInMinutes: recipe.readyInMinutes,
        servings: recipe.servings,
        summary: recipe.summary,
        vegetarian: recipe.vegetarian,
        vegan: recipe.vegan,
        glutenFree: recipe.glutenFree,
        dairyFree: recipe.dairyFree,
        veryHealthy: recipe.veryHealthy,
        cheap: recipe.cheap,
        veryPopular: recipe.veryPopular,
        sustainable: recipe.sustainable,
        lowFodmap: recipe.lowFodmap,
        weightWatcherSmartPoints: recipe.weightWatcherSmartPoints,
        gaps: recipe.gaps,
        preparationMinutes: recipe.preparationMinutes,
        cookingMinutes: recipe.cookingMinutes,
        aggregateLikes: recipe.aggregateLikes,
        healthScore: recipe.healthScore,
        creditsText: recipe.creditsText,
        license: recipe.license,
        sourceName: recipe.sourceName,
        pricePerServing: recipe.pricePerServing,
        cuisines: recipe.cuisines,
        dishTypes: recipe.dishTypes,
        diets: recipe.diets,
        occasions: recipe.occasions,
        simplifiedInstructions,
        instructions: recipe.instructions,
      });
      if (errors) {
        console.error('Error saving recipe:', errors);
        setToastMessage('Failed to save recipe.');
        return;
      }
      setFavoritedIds(prev => [...prev, recipeId]);
      setToastMessage('Recipe saved successfully!');
    }
  } catch (error) {
    console.error('Error handling favorite:', error);
    setToastMessage('Error updating favorites.');
  } finally {
    setTimeout(() => setToastMessage(null), 3000);
  }
  };

  useEffect(() => {
    const fetchFavoritedRecipes = async () => {
          try {
            const userId = (await getCurrentUser()).userId;
            const { data: savedRecipes } = await client.models.SavedRecipe.list({
              filter: { userId: { eq: userId } },
            });
            setFavoritedIds(savedRecipes.map(recipe => recipe.recipeId ?? ''));
          } catch (error) {
            console.error('Error fetching favorited recipes:', error);
            setToastMessage('Failed to load favorited recipes.');
            setTimeout(() => setToastMessage(null), 3000);
          }
    };
    fetchFavoritedRecipes();

    if (EditOpen) {
      const heightTitle = getTextAreaHeight(editedRecipe.title);
      setTitleHeight(heightTitle);
      const heightSummary = getTextAreaHeight(editedRecipe.summary || '');
      setDescriptionHeight(heightSummary);
      const heightInstructions = getTextAreaHeight(editedRecipe.instructions);
      setInstructionHeight(heightInstructions);
    }
  }, [EditOpen, editedRecipe.summary, editedRecipe.instructions, editedRecipe.title]);

  useEffect(() => {
    const recipeId = recipe.recipeId ?? recipe.id.toString();
    setIcon(favoritedIds.includes(recipeId) ? "star" : "star-border");
  }, [favoritedIds, recipe]);

  return (
    <>
      <div className="side_container">
        <button className="side-button" onClick={() => navigate(-1)}>
          <RuxIcon className="side-image" icon="reply" size="3.3rem" />
          <h2 style={{ marginTop: '-10%' }}>BACK</h2>
        </button>
        <button className="side-button" onClick={handleAddToGroceryList}>
          <RuxIcon className="side-image" icon="add-shopping-cart" size="3.3rem" />
          <h2 style={{ marginTop: '-5%', marginBottom: '-4%' }}>ADD TO GROCERY LIST</h2>
        </button>
        <button className="side-button" onClick={handleFavorite}>
          <RuxIcon className="side-image" size="3.5rem" icon={icon} />
          <h2 style={{ marginTop: '-5%' }}>FAVOR</h2>
        </button>
        <button className="side-button" onClick={buttonPressed}>
          <RuxIcon className="side-image" icon="edit" size="2.9rem" />
          <h2 style={{ marginTop: '0%' }}>EDIT RECIPE</h2>
        </button>
      </div>
      <RuxDialog
        className="edit-recipe-container light-theme"
        open={EditOpen}
        header="Edit Recipe"
        confirmText=""
        denyText=""
        style={{ width: "50%" }}
      >
        <div>Recipe Title</div>
        <textarea
          value={editedRecipe.title}
          onChange={(e) =>
            setEditedRecipe(prev => ({ ...prev, title: e.target.value }))
          }
          style={{
            width: "50vw",
            maxWidth: "600px",
            overflow: "hidden",
            resize: "none",
            padding: "7px",
            fontSize: "17px",
            height: titleHeight ? `${titleHeight}px` : "auto",
          }}
        />
        <div>Recipe Description</div>
        <textarea
          className="scrollable-textarea"
          value={editedRecipe.summary || ''}
          onChange={(e) =>
            setEditedRecipe(prev => ({ ...prev, summary: e.target.value }))
          }
          style={{
            width: "50vw",
            maxWidth: "600px",
            // overflow: "hidden",
            // resize: "none",
            padding: "7px",
            fontSize: "17px",
            height: descriptionHeight ? `${descriptionHeight}px` : "auto",
          }}
        />
        <div>Ingredients</div>
        <ul className="grocery-list">
          {editedRecipe.ingredients.map((ingredient, index) => (
            <li key={ingredient.id} className="grocery-item">
              {editingStates[ingredient.id] ? (
                <div className="edit-mode" style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                  <input
                    type="text"
                    value={ingredient.name}
                    onChange={(e) => {
                      const updatedIngredients = [...editedRecipe.ingredients];
                      updatedIngredients[index].name = e.target.value;
                      updatedIngredients[index].original = `${updatedIngredients[index].amount} ${updatedIngredients[index].unit} ${e.target.value}`;
                      setEditedRecipe(prev => ({
                        ...prev,
                        ingredients: updatedIngredients,
                      }));
                    }}
                    className="edit-input"
                    style={{ height: "5vh", width: "9vw", maxWidth: "150px" }}
                  />
                  <input
                    type="text"
                    value={ingredient.amount}
                    onChange={(e) => {
                      const value = e.target.value;
                      const updatedIngredients = [...editedRecipe.ingredients];
                      if (value === '') {
                        updatedIngredients[index].amount = 0;
                      } else if (!isNaN(Number(value))) {
                        updatedIngredients[index].amount = Number(value);
                      }
                      updatedIngredients[index].original = `${updatedIngredients[index].amount} ${updatedIngredients[index].unit} ${updatedIngredients[index].name}`;
                      setEditedRecipe(prev => ({
                        ...prev,
                        ingredients: updatedIngredients,
                      }));
                    }}
                    className="edit-input"
                    style={{ height: "5vh", width: "9vw", maxWidth: "150px" }}
                  />
                  <Select
                    value={unitOptions.find(o => o.value === ingredient.unit) || null}
                    onChange={(selectedOption) => {
                      const updatedIngredients = [...editedRecipe.ingredients];
                      updatedIngredients[index].unit = selectedOption ? selectedOption.value : '';
                      updatedIngredients[index].original = `${updatedIngredients[index].amount} ${updatedIngredients[index].unit} ${updatedIngredients[index].name}`;
                      setEditedRecipe(prev => ({
                        ...prev,
                        ingredients: updatedIngredients,
                      }));
                    }}
                    options={unitOptions}
                    className="input-field-select-meal"
                    placeholder="Unit"
                    styles={{
                      control: base => ({
                        ...base,
                        height: "5vh",
                        width: "9vw",
                        maxWidth: "150px",
                        borderRadius: "10px",
                      }),
                    }}
                  />
                  <button
                    onClick={() => {
                      const updatedIngredients = editedRecipe.ingredients.filter((_, i) => i !== index);
                      setEditedRecipe(prev => ({
                        ...prev,
                        ingredients: updatedIngredients,
                      }));
                    }}
                    className="delete-butn"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEditToggle(ingredient.id)}
                    className="edit-button"
                  >
                    Save
                  </button>
                </div>
              ) : (
                // Affects the individual ingredients text size
                <div className="display-mode" style={{ fontSize: "0.9rem" }}> 
                  <span className="item-name" style={{ color: "black" }}>
                    {ingredient.name}
                  </span>
                  <span className="item-amount" style={{ marginLeft: "10px" }}>
                    {ingredient.amount}
                  </span>
                  <span className="item-unit" style={{ marginLeft: "10px" }}>
                    {ingredient.unit}
                  </span>
                  <button
                    onClick={() => handleEditToggle(ingredient.id)}
                    className="edit-button"
                  >
                    Edit
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
        <div className="add-ingredient" style={{ display: "flex", flexDirection: "row", marginTop: "10px", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Ingredient Name"
            value={newIngredientName}
            onChange={(e) => setNewIngredientName(e.target.value)}
            className="edit-input"
            style={{ height: "5vh", width: "9vw", maxWidth: "150px" }}
          />
          <input
            type="text"
            placeholder="Amount"
            value={newIngredientAmount !== undefined ? newIngredientAmount.toString() : ''}
            onChange={(e) => {
              const value = e.target.value;
              if (value === '') {
                setNewIngredientAmount(undefined);
              } else if (!isNaN(Number(value))) {
                setNewIngredientAmount(Number(value));
              }
            }}
            className="edit-input"
            style={{ height: "5vh", width: "9vw", maxWidth: "150px" }}
          />
          <Select
            value={unitOptions.find(o => o.value === newIngredientUnit) || null}
            onChange={(selectedOption) => setNewIngredientUnit(selectedOption ? selectedOption.value : '')}
            options={unitOptions}
            className="input-field-select-meal"
            placeholder="Unit"
            styles={{
              control: base => ({
                ...base,
                height: "5vh",
                width: "9vw",
                maxWidth: "150px",
                borderRadius: "10px",
              }),
            }}
          />
          <button
            onClick={() => {
              if (newIngredientName.trim() && newIngredientAmount !== undefined && newIngredientUnit) {
                const newIngredient: Ingredient = {
                  id: Date.now(),
                  name: newIngredientName,
                  amount: newIngredientAmount,
                  unit: newIngredientUnit,
                  original: `${newIngredientAmount} ${newIngredientUnit} ${newIngredientName}`,
                };
                setEditedRecipe(prev => ({
                  ...prev,
                  ingredients: [...prev.ingredients, newIngredient],
                }));
                setNewIngredientName('');
                setNewIngredientAmount(undefined);
                setNewIngredientUnit('');
              }
            }}
            className="add-item-butn"
          >
            Add Item
          </button>
        </div>
        <div>Recipe Instructions</div>
        <textarea
          className="scrollable-textarea"
          value={editedRecipe.instructions}
          onChange={(e) =>
            setEditedRecipe(prev => ({ ...prev, instructions: e.target.value }))
          }
          style={{
            width: "100%",
            maxWidth: "800px",
            // overflow: "hidden",
            // resize: "none",
            padding: "7px",
            fontSize: "17px",
            height: instructionsHeight ? `${instructionsHeight}px` : "auto",
          }}
        />
        <div className="dialog-buttons">
          <button className="mrCancel" onClick={handleDialogClose}>Cancel</button>
          <button className="mrSubmit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </RuxDialog>
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          width: 'fit-content',
          maxWidth: '90%',
        }}>
          <RuxToast
            message={toastMessage}
            closeAfter={3000}
            style={{
              backgroundColor: '#e27e36',
              color: '#ffffff',
              fontFamily: 'Cambria, Cochin',
              fontSize: '1rem',
              padding: '10px 20px',
              borderRadius: '5px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
            }}
          />
        </div>
      )}
    </>
  );
};

export default LSideBar;