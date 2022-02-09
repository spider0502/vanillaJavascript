const search = document.getElementById('search')
const submit = document.getElementById('submit')
const random = document.getElementById('random')
const mealsEl = document.getElementById('meals')
const resultHeading = document.getElementById('result-heading')
const singleMealEl = document.getElementById('single-meal')

//Search meal and fetch from API
async function searchMeal(e) {
    e.preventDefault()

    //Clear single meal
    singleMealEl.innerHTML = ''

    //Get search term
    const term = search.value

    if (term.trim()) {
        try {
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            const data = await res.json()
            resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`
            //console.log(data)
            if (data.meals === null) {
                resultHeading.innerHTML = `<p>There are no search results. Try again!<p>`
            } else {
                mealsEl.innerHTML = data.meals.map(meal => `
                    <div class='meal'>
                        <img src='${meal.strMealThumb}' alt='${meal.strMeal}'/>
                        <div class='meal-info' data-mealId='${meal.idMeal}'>
                            <h3>${meal.strMeal}</h3>
                        </div>
                    </div>
                `)
                    .join('')
            }
        } catch (error) {
            console.log(error)
        }

        //Clear search text
        search.value = ''
    } else {
        alert('Please enter a search term.')
    }
}

//Fetch meal by id
function getMealById(mealId) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then((res) => res.json())
        .then((data) => {
            const meal = data.meals[0]
            addMealToDom(meal)
        })
        .catch((err) => console.log(err))
}

//Fetch random meal
function getRandomMeal() {
    //Clear meals and heading
    clearMealsAndHeading()

    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        .then((res) => res.json())
        .then((data) => {
            const meal = data.meals[0]
            addMealToDom(meal)
        })
        .catch((err) => console.log(err))
}

//Clear meals and heading
function clearMealsAndHeading() {
    mealsEl.innerHTML = ''
    resultHeading.innerHTML = ''
}

//Add meal to dom
function addMealToDom(meal) {
    const ingredients = []

    for (let i = 0; i < 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
        } else {

        }
    }

    singleMealEl.innerHTML = `
        <div class='single-meal'>
            <h1>${meal.strMeal}</h1>
            <img src='${meal.strMealThumb}' alt='${meal.strMeal}' />
            <div class='single-meal-info'>
                ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
                ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
            </div>
            <div class='main'>
                <p>${meal.strInstructions}</p>
                <h2>Ingredients</h2>
                <ul>
                    ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
                </ul>
            </div>
        </div>
    `
}

//Event listeners
submit.addEventListener('submit', searchMeal)
random.addEventListener('click', getRandomMeal)
mealsEl.addEventListener('click', (e) => {
    const mealInfo = e.path.find((item) => {
        if (item.classList) {
            return item.classList.contains('meal-info')
        } else {
            return false
        }
    })

    if (mealInfo) {
        clearMealsAndHeading()
        const mealId = mealInfo.getAttribute('data-mealId')
        getMealById(mealId)
    }
})