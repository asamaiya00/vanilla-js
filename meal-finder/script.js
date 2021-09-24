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

submit.addEventListener("submit", searchMeal);
