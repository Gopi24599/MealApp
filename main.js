// Importing all required HTML elements
const favarr = [];
const search = document.getElementById('search');
const searchingbtn = document.getElementsByClassName('searchbtn')[0]; 
const results = document.getElementById('suggestions');
const reset = document.getElementById('resetter');
const favourites = document.getElementsByClassName('Favo-items')[0];
const home = document.getElementById('h');
//fetching data from API
searchingbtn.addEventListener('click', () => {
  const keyword = search.value;
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`)//fetching from api
    .then(response => response.json())//converting response to json format
    .then(data => {
      if (data) {
        if (data.meals === null) {
          alert('Hey No Foods, try another search term!');
        } else {
          display(data.meals);
        }
      }
    })
    //if any err throws
    .catch(error => {
      console.error(error);
    });
});

// favourites page
favourites.addEventListener('click', showfav);

// showing all favoured item selected by users
function showfav() {
  results.innerHTML = '';
  if (favarr.length === 0) {//if no favourites
    const Msg = document.createElement('p');//creating an msg to know user has no favourites
    Msg.innerText = 'No Items Available';
    results.appendChild(Msg);
    } else {//if favourite is there
    favarr.forEach(meal => {
      //creating a container to show all favoured items
      const container = document.createElement('div');
      container.classList.add('meal');
      //creating meal img 
      const mealimg = document.createElement('img');
      mealimg.src = meal.strMealThumb;
      mealimg.alt = meal.strMeal;
      container.appendChild(mealimg);
      //creating name
      const name = document.createElement('h1');
      name.innerText = meal.strMeal;
      container.appendChild(name);
      //creating ingredients
      const ingredients = document.createElement('ul');
      for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
          const ingredient = document.createElement('li');
          ingredient.innerText = `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`;
          ingredients.appendChild(ingredient);
          } else {
            break;
          }
        }
      container.appendChild(ingredients);

      
      //function to remove from favorite item
      const removeButton = document.createElement('button');
      removeButton.innerHTML = '<i class="fas fa-trash"></i> Remove from Favorites';
      removeButton.addEventListener('click', () => {
        removeFromFavorites(meal);
        function removeFromFavorites(meal) {
          const mealIndex = favarr.findIndex(favourites => favourites.idMeal === meal.idMeal);
          if (mealIndex !== -1) {
            favarr.splice(mealIndex, 1);
            showfav();
            alert(`${meal.strMeal} has been removed from your favorites.`);
          }
        }
      });
      container.appendChild(removeButton);

      results.appendChild(container);
    });
  }
}
  //clearing all 
  reset.addEventListener('click', () => {
    results.innerHTML = '';
  });

function display(meals) {
  results.innerHTML= '';
  meals.forEach(meal => {
    //creating div to store all element
    const container = document.createElement('div');
    container.classList.add('meal');
    //imporing img file from API
    const img = document.createElement('img');
    img.src = meal.strMealThumb;
    img.alt = meal.strMeal;
    container.appendChild(img);
    //importing ingredients from API
    const mingredients = document.createElement('ul');
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        const ingredient = document.createElement('li');
        ingredient.innerText = `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`;
        mingredients.appendChild(ingredient);
      }
    }
    container.appendChild(mingredients);
    //importing name of food from API
    const name = document.createElement('h1');
    name.innerText = meal.strMeal;
    container.appendChild(name);
    // Details of Receipe From API
    const mealDescription = document.createElement('p');
    mealDescription.classList.add('description');
    mealDescription.innerText = meal.strInstructions;
    container.appendChild(mealDescription);
    //Show or hide button
    const more = document.createElement('button');
    more.innerHTML = 'Detailed View';
    more.addEventListener('click', () => {
      mealDescription.classList.toggle('show');
    });
    container.appendChild(more);
    //Button to add into Favourites
    const favoriteButton = document.createElement('button');
    favoriteButton.innerHTML = '<i class="fas fa-heart"></i> Add to Favorites';
    favoriteButton.addEventListener('click', function() {
      includefavo(meal);
    });
    container.appendChild(favoriteButton);
   
    function includefavo(meal) {
      if (!favarr.includes(meal)) {
        favarr.push(meal);
        alert(`${meal.strMeal} Added to your Favorites`);
      } else {
        alert(`${meal.strMeal} is already added to Favorites`);
      }
    }  
  
    favourites.addEventListener('click',showfav);     

    results.appendChild(container);
  
  });
}
