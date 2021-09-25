const submit = document.getElementById("submit"),
  search = document.getElementById("search"),
  random = document.getElementById("random"),
  mealsEl = document.getElementById("meals"),
  resultHeadingEl = document.getElementById("result-heading"),
  singleMealEl = document.getElementById("single-meal");

function searchMeal(e) {
  e.preventDefault();
  singleMealEl.innerHTML = "";
  const term = search.value;

  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        resultHeadingEl.innerHTML = `<h2>Search results for '${term}':</h2>`;
        if (data.meals === null) {
          resultHeadingEl.innerHTML = `<p>There are no results for '${term}'. Try again</p>`;
          mealsEl.innerHTML = "";
        } else {
          mealsEl.innerHTML = `
                ${data.meals
                  .map(
                    (meal) => `
                    <div class="meal" >
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                        <div class= "meal-info" data-mealId="${meal.idMeal}">
                            <h3> ${meal.strMeal}</h3>
                        </div>
                    </div>
                `
                  )
                  .join("")}
                `;
          search.value = "";
        }
      });
  } else {
    alert("Please enter something.");
  }
}
function getSingleMeal(mealId) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    });
}
function getRandomMeal() {
  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    });
}

function addMealToDOM(meal) {
  console.log(meal);
  const ingredients = [];

  for (i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]} `
      );
    } else {
      break;
    }
  }
  singleMealEl.innerHTML = `
        <div class="single-meal">
            <h2>${meal.strMeal}</h2>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
            <div class = "single-meal-info">
                ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
                ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
            </div>
            <div class = "main">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <ul>
                ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
                </ul>
            </div>
        </div>
    `;
}

submit.addEventListener("submit", searchMeal);
random.addEventListener("click", getRandomMeal);

mealsEl.addEventListener("click", (e) => {
  const mealInfo = e.path.find((meal) =>
    meal.classList.contains("meal-info") ? meal : ""
  );
  const mealId = mealInfo ? mealInfo.getAttribute("data-mealid") : "";

  getSingleMeal(mealId);
});
