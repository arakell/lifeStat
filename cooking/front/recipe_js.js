/* Для взаимодействий с фронтом */

import { addRecipe_web } from './recipe_web.js';

/* Список категорий блюд */
const dishesMap = new Map();
dishesMap.set("Завтраки", 1);
dishesMap.set("Супы", 2);
dishesMap.set("Горячее", 3);
dishesMap.set("Салаты", 4);
dishesMap.set("Соусы", 5);
dishesMap.set("Планы", 6);


var breakfasts =  ["Оладьи", "Яичница", "Бутерброд"];
var soups = ["Чечевичный суп", "Суп из тыквы"];
var main_course = ["Котлеты", "Макароны с соусом", "Рыба на гриле"];
var salads = ["Огуречный салат", "Цезарь", "Греческий салат"];
var sauces = ["Чесночный соус", "Соевый соус", "Томатный соус"];
var plans = ["Рататуй", "Бешбармак"];

/* Смена формы с "Добавления" на "Просмотр рецепта" */
function openForm(){

    if ( document.getElementById("tutorials").style.display != "block") {
        document.getElementById("tutorials").style.display = "block";
        document.getElementById("addForm").style.display = "none";
        return;
    }

    document.getElementById("tutorials").style.display = "none";
    document.getElementById("addForm").style.display = "flex";
    
}

/* При нажатии на категорию раскрывает список названий блюд */
function showList(category) {
    console.log('here' + category); 
    var listDiv = document.getElementById(category + "_list");
    if (listDiv.innerHTML != "") {
        listDiv.innerHTML = "";
        document.getElementById(category).style.backgroundColor = "#6aa2d3";
        document.getElementById(category).style.removeProperty("background-color");
        return;
    }
    document.getElementById(category).style.backgroundColor = "#2980b9";

    var items;
    /* Вместо этого из recipe_web посылаем веб запрос */
    switch(category) {
        case "breakfasts":
            items = breakfasts;
            break;
        case "soups":
            items = soups;
            break;
        case "main_course":
            items = main_course;
            break;
        case "salads":
            items = salads;
            break;
        case "sauces":
            items = sauces;
            break;
        case "plans":
            items = plans;
            break;
        default:
            items = ["Пока что тут пусто"];
    }
    

    items.forEach(item => {
        var listItem = document.createElement("div");
        listItem.textContent = item;
        listItem.className = "sub_list";
        listDiv.appendChild(listItem);
    });
    
}


/* На форме добавления нового рецепта раскрывает при нажатии выбор категории */
function dropList(){

    const dropdown = document.getElementById("dropdown");
    const options = document.querySelectorAll(".option");

    if (dropdown.style.display == "block"){
        dropdown.style.display = "none";
        return;
    }
    dropdown.style.display = "block";

    options.forEach(option => {
        option.addEventListener("click", () => {
            document.getElementById("category").value = option.textContent;
            
            dropdown.style.display = "none";
        });
    });
}

/* При нажатии на добавить рецепт посылает запрос к БД на добавление рецепта */
async function addRecipe(){

    let title = document.getElementById("title").value;
    let recipe = document.getElementById("recipe").value;
    let category_id = dishesMap.get(document.getElementById("category").value);

    if (!title || !recipe || !category_id){
        alert("Заполните поля");
        return;
    }

    let resp = await addRecipe_web(title, recipe, category_id)

    if (resp == 'Успешно добавлено'){
        document.getElementById("title").value = null;
        document.getElementById("recipe").value = null;
        document.getElementById("category").value = null;
    } 
    alert(resp);

}

/* Добавление обработчиков событий */
document.addEventListener('DOMContentLoaded', () => {
    console.log('load page');
    document.getElementById("iconPlus").addEventListener("click", () => openForm());
    document.getElementById("category").addEventListener("click", () => dropList());
    document.getElementById("addRecipe").addEventListener("click", () => addRecipe());

    document.getElementById("breakfasts").addEventListener("click", ()  => showList("breakfasts"));
    document.getElementById("soups").addEventListener("click", ()  => showList("soups"));
    document.getElementById("main_course").addEventListener("click", ()  => showList("main_course"));
    document.getElementById("salads").addEventListener("click", ()  => showList("salads"));
    document.getElementById("sauces").addEventListener("click", ()  => showList("sauces"));
    document.getElementById("plans").addEventListener("click", ()  => showList("plans"));
});

/* На форме добавления закрываем выпавший список выбора категории, если клик был вне поля ввода и списка*/
document.addEventListener("click", (event) => {
    const dropdown = document.getElementById("dropdown");
    const categoryInput = document.getElementById("category");
  
    
    if (event.target !== categoryInput && !dropdown.contains(event.target)) {
      dropdown.style.display = "none";
    }
  });

/*

категории заполнены сразу 
при нажатии на категорию получаем id name category_id всех рецептов из этой категории
при нажатии на рецепт получаем ещё content

категории {
    id:
    name:
}


recipes{
    id: 
    name: 
    content:
    category_id:
}

нужные операции 
зная категорию получить все рецепты
зная название рецепта получить сам рецепт



*/



