import React, { useState} from 'react';
import styled from "styled-components";
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';
import './MainPage.css';
import { RuxIcon } from "@astrouxds/react";
import { useNavigate } from "react-router-dom";

interface Recipe {
  image: string;
  title: string;
  description: string;

}
interface SpoonacularRecipe {
  id: number;
  title: string;
  image: string;
  imageType: string;
  servings: number;
  readyInMinutes: number;
  sourceUrl: string;
  summary: string;
  instructions: string;
  ingredients: Array<{
    id: number;
    name: string;
    amount: number;
    unit: string;
    original: string;
  }>;
  nutrition: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
  };
}
const testing: SpoonacularRecipe[] = [
  { 
    id: 1,
    title: "Niçoise Salad",
    image: "https://www.seriouseats.com/thmb/SAarhxihKDIr2q-SKqqvVazzxw4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2015__09__20150909-nicoise-salad-vicky-wasik-9-1a849c1baf5e4ce0a48bd6cd386ded94.jpg",
    imageType: "jpg",
    servings: 4,
    readyInMinutes: 30,
    sourceUrl: "https://example.com",
    instructions: "This is a test instruction",
    ingredients: [
      { id: 1, name: "Test Ingredient", amount: 2, unit: "cups", original: "2 cups of test ingredient" }
    ],
    nutrition: { calories: "200", protein: "10g", carbs: "30g", fat: "5g" },
    summary: "Steamed nine-minute eggs the feeling of being at your favourite pizza joint by trying your hand at this recipe for chicken pizza calzone.have psalty."
  },
  { 
    id: 2,
    title: "Chicken Pizza Calzone",
    image: "https://realfood.tesco.com/media/images/179274-HERO-31ebb66c-f04c-4eab-a9da-ea0154b2d539-0-472x310.jpg",
    imageType: "jpg",
    servings: 4,
    readyInMinutes: 30,
    sourceUrl: "https://example.com",
    instructions: "This is a test instruction",
    ingredients: [
      { id: 1, name: "Test Ingredient", amount: 2, unit: "cups", original: "2 cups of test ingredient" }
    ],
    nutrition: { calories: "200", protein: "10g", carbs: "30g", fat: "5g" },
    summary: "Recreate the feeling of being at your favourite pizza joint by trying your hand at this recipe for chicken pizza calzone. The best part of this recipe is that it takes under an hour to both prep and cook. Who knew turning your home into a calzone zone could be so easy? "
  }
  ]
const initialFavorites: Recipe[] = [
  {
    image: "https://www.seriouseats.com/thmb/SAarhxihKDIr2q-SKqqvVazzxw4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2015__09__20150909-nicoise-salad-vicky-wasik-9-1a849c1baf5e4ce0a48bd6cd386ded94.jpg",
    title: "Niçoise Salad",
    description: "Steamed nine-minute eggs the feeling of being at your favourite pizza joint by trying your hand at this recipe for chicken pizza calzone.have psalty."
  },
  {
    image: "https://realfood.tesco.com/media/images/179274-HERO-31ebb66c-f04c-4eab-a9da-ea0154b2d539-0-472x310.jpg",
    title: "Chicken Pizza Calzone",
    description: "Recreate the feeling of being at your favourite pizza joint by trying your hand at this recipe for chicken pizza calzone. The best part of this recipe is that it takes under an hour to both prep and cook. Who knew turning your home into a calzone zone could be so easy? "
  },
  {
    image: "https://dinnerthendessert.com/wp-content/uploads/2017/07/Ground-Orange-Chicken-enhanced.jpg",
    title: "Ground Orange Chicken",
    description: "Ground Orange Chicken is made in one pan and only takes 20 minutes using a Panda Express copycat sauce. So much healthier than the original!"
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzUXwxKjDkf17YKakug9okRsOuGVhZD8h6RA&s",
    title: "Skillet Flatbread Pizza",
    description: "This homemade pizza recipe features a crispy crust, tangy sauce, and gooey cheese with your choice of toppings. Perfect for any occasion, it serves 2–4 and takes about 1 hour, including prep and baking."
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVZZkox8oCsYvgrvXyV1mdYUsCRGfqBMoGTA&s",
    title: "Quinoa Salad",
    description: "This vibrant quinoa salad is packed with fresh veggies, herbs, and a light, tangy dressing. Healthy and refreshing, it serves 4 and takes about 25 minutes to prepare. Perfect as a side dish or a light meal."
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa00fqLGUjL3fBsJhUkUBN__VP3Mq_1W6NpQ&s",
    title: "Mexican Tacos",
    description: "This delicious taco recipe features seasoned ground beef, fresh toppings, and a crunchy taco shell. Ready in just 20 minutes, it serves 4 and makes the perfect quick and tasty meal."
  },
  {
    image: "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1220,h_915/k%2FPhoto%2FRecipes%2F2024-05-zucchini-butter-pasta%2Fzucchini-butter-pasta-530",
    title: "Zucchini Butter Pasta",
    description: "Melted” zucchini is impossibly delicious. When you cook shredded zucchini down for just 15 or so minutes, it nearly melts and takes on a sweet, almost caramelized flavor." 
  },
  {
    image: "https://www.allrecipes.com/thmb/aF6uJ6oDIFIazy2pdQC0kdGDgp8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8421914-Marry-Me-Chicken-Soup-4x3-179-843abc8af99247dcadb3f79a91681d49.jpg",
    title: "Chicken Soup",
    description: "Maybe you have heard of Marry Me Chicken before, a delicious dish of sautèed chicken blanketed in a creamy sun-dried tomato sauce that. It can be enjoyed on its own."
  },
  {
    image: "https://www.feastingathome.com/wp-content/uploads/2024/04/Spicy-Mexican-Shrimp-20.jpg",
    title: "Spicy Mexican Shrimp",
    description: "With over 100 5-star reviews, this Chicken Soup recipe with lemon and ginger is one of the most popular soups on the blog! Brothy and flavorful, it is the perfect base for noodles, rice, beans or grains, or keep it keto and low-carb!"
  },
  {
    image: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2014/1/23/0/KC0101_Italian-Chicken-Pasta-Salad_s4x3.jpg.rend.hgtvcom.1280.1024.85.suffix/1417624061835.webp",
    title: "Italian Chicken Pasta Salad",
    description: "Forget about the gloopy mayonnaise-laced pasta salads you know (and perhaps don't love). GZ's version features bright, fresh produce like cucumber and tomatoes, plus rotisserie chicken for heft and a simple red wine vinaigrette."
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLQzQqVBk7LmMbMSaEuRy3AkVv1lyGqThm4Q&s",
    title: "Corn Dogs",
    description: "This homemade corn dog recipe delivers a crispy, golden-brown coating with a juicy hot dog inside. Perfect for a snack or meal, it serves 4 and takes about 30 minutes, including prep and frying."
  }
];

const initialRecipes: SpoonacularRecipe[] = [...testing];

const MyRecipes = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-height: 100vh;
  overflow: auto;
  padding-top:18vh;
  scrollbar-width:none;
  padding-bottom:1rem;
  padding-left: 3rem;
  padding-right: 3rem;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 11rem;
  border-radius: 15px;
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.61);
  background-color:rgb(255, 255, 255);
  padding: 10px;
  margin-top: 20px;
  margin-left:0.25rem;
  margin-right:0.25rem;

  position: relative;
  max-height:20rem;
  min-height: 18rem;
  transition: transform 0.5s ease;
  &:hover {
    transform:scale(1.1);
    z-index:2;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  min-height:100%;
  object-fit: cover;
`;

const ImageContainer = styled.div`
  min-height: 7rem;
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: -15px;
  `;

const VignetteOverlay = styled.div`
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  background: radial-gradient(circle, transparent, rgba(0, 0, 0, 0.19));
  z-index: 2;
`;

const FavorButton = styled.button`
  background: none;
  border: none;
  cursor: pointe;
  margin-top:-0.2rem;
  margin-left: -0.5rem;
  position: absolute;
    z-index: 3;
  &:focus {
    outline: none;
  }
    &:active {
    transform: scale(0.9);
  }

`;

const ButtonContainer = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: center;
  padding-top: 7px;
`;


const RecipeCard: React.FC = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Recipe[]>([]);

  const handleFavorButtonClick = (index: number) => {
    const recipe = initialFavorites[index];
    setFavorites((prevFavorites) => {
      if (prevFavorites.some((fav) => fav.title === recipe.title)) {
        return prevFavorites.filter((fav) => fav.title !== recipe.title);
      } else {
        return [...prevFavorites, recipe].sort((a, b) => a.title.localeCompare(b.title));
      }
    });
  };
const handleViewRecipeClick = (recipe: SpoonacularRecipe) => {
    navigate("/recipeDetails", { state: { recipe } });
  };
  return (
    <MyRecipes>
      <div className="My-recipes-text">
          My Recipes
        </div>
      {initialRecipes.map((recipe, index) => (
        <Card key={index}>
         
         <FavorButton onClick={() => handleFavorButtonClick(index)}>
            <RuxIcon className= "favorbutton_icon" size="2.5rem" icon={favorites.some((fav) => fav.title === recipe.title) ? "star-border" : "star"} />
          </FavorButton>

          <ImageContainer>
            <StyledImage src={recipe.image} alt="Food" />
            <VignetteOverlay />
          </ImageContainer>
          <h2 className="recipe-title">{recipe.title}</h2>
          <p className="description">{recipe.summary}</p>
          <ButtonContainer>
          <button className="view-recipe" onClick={() => handleViewRecipeClick(recipe)}>View Recipe</button>
          </ButtonContainer>
        </Card>
      ))}
    </MyRecipes>
  );
};

export default RecipeCard;