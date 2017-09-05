$p(() => {
  $p('.recipe-btn').on('click', event => {
    const ingredient = $p('.ingredient').html();
    fetchRecipes(ingredient, null)
      .then(recipes => {
      console.log(recipes);
      clearRecipes();
      recipes.hits.forEach(recipe => {
        makeRecipe(recipe.recipe);
      });
    });
  });

  $p('.vegan-btn').on('click', event => {
    const ingredient = $p('.ingredient').html();
    fetchRecipes(ingredient, 'vegan')
      .then(recipes => {
      console.log(recipes);
      clearRecipes();
      recipes.hits.forEach(recipe => {
        makeRecipe(recipe.recipe);
      });
    });
  });

  $p('.veggy-btn').on('click', event => {
    const ingredient = $p('.ingredient').html();
    fetchRecipes(ingredient, 'veggy')
      .then(recipes => {
      console.log(recipes);
      clearRecipes();
      recipes.hits.forEach(recipe => {
        makeRecipe(recipe.recipe);
      });
    });
  });
});

const fetchRecipes = (ingredient, option) => {
  let baseURL = 'https://api.edamam.com/search?app_id=08ce8a34&app_key=43e119b120459c49cddad12e6027c1dc&q=';
  const randomRecipe = getRandomRecipeNumber();
  debugger
  switch (option) {
    case null:
      baseURL = baseURL + ingredient + `&from=${randomRecipe}`;
      break;
    case 'vegan':
      baseURL = baseURL + ingredient + `&from=${randomRecipe}` + '&health=vegan';
      break; 
    case 'veggy':
      baseURL = baseURL + ingredient + `&from=${randomRecipe}` + '&health=vegetarian';
      break;
  }

  return $p.ajax({
    url: baseURL,
  }).then(response => response);
}

const makeRecipe = recipe => {
  const recipesList = $p('.recipes-list');
  const recipeItemHTML = document.createElement('li');
  const recipeItem = $p(recipeItemHTML);
  recipeItem.html(`
    <a href='${recipe.url}'>
      <img src='${recipe.image}'>
      <p>${recipe.label}</p>
    </a>`);
  
  recipeItem.addClass('recipe-item');

  recipesList.append(recipeItem);
}

const clearRecipes = () => {
  const recipesList = $p('.recipes-list');
  const recipesItems = recipesList.children();

  recipesItems.remove();
};

const getRandomRecipeNumber = () => {
  return Math.floor(Math.random() * 90);
}