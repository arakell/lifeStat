/************************************************************
 *************** Для взаимодействий с фронтом ***************
 ************************************************************/

import { addRecipe_web, getRecipesByCat_web } from './recipe_web.js';

// Список категорий блюд 
const dishesMap = new Map();
dishesMap.set('Завтраки', 1);
dishesMap.set('breakfasts', 1);
dishesMap.set('Супы', 2);
dishesMap.set('soups', 2);
dishesMap.set('Горячее', 3);
dishesMap.set('main_course', 3);
dishesMap.set('Салаты', 4);
dishesMap.set('salads', 4);
dishesMap.set('Соусы', 5);
dishesMap.set('sauces', 5);
dishesMap.set('Планы', 6);
dishesMap.set('plans', 6);

// Смена формы с "Добавления" на "Просмотр рецепта"
function openForm(){

    if ( document.getElementById('tutorials').style.display != 'block') {
        document.getElementById('tutorials').style.display = 'block';
        document.getElementById('addForm').style.display = 'none';
        return;
    }

    document.getElementById('tutorials').style.display = 'none';
    document.getElementById('addForm').style.display = 'flex';
    
}

//При нажатии на категорию раскрывает список названий блюд
async function showList(category) {
    console.log('Раскрываем категорию ' + category); 
    var listDiv = document.getElementById(category + '_list');
    if (listDiv.innerHTML != '') {
        listDiv.innerHTML = '';
        document.getElementById(category).style.backgroundColor = '#6aa2d3';
        document.getElementById(category).style.removeProperty('background-color');
        return;
    }

    var items = await getRecipesByCat_web(dishesMap.get(category));
    if(items == 'Неизвестная ошибка'){
        alert('Запрос завершился ошибкой');
        return;
    }

    if(items != undefined && items.length != 0){
        document.getElementById(category).style.backgroundColor = '#2980b9';
    }

    items.forEach(item => {
        var listItem = document.createElement('div');
        listItem.textContent = item.name;
        listItem.className = 'sub_list';
        listDiv.appendChild(listItem);
    });
    
}


// Выбор категории при добавлении нового рецепта
function dropList(){

    const dropdown = document.getElementById('dropdown');
    const options = document.querySelectorAll('.option');

    if (dropdown.style.display == 'block'){
        dropdown.style.display = 'none';
        return;
    }
    dropdown.style.display = 'block';

    options.forEach(option => {
        option.addEventListener('click', () => {
            document.getElementById('category').value = option.textContent;
            
            dropdown.style.display = 'none';
        });
    });
}

// Добавление нового рецепта
async function addRecipe(){

    console.log('Добавляем новый рецепт');
    let title = document.getElementById('title').value;
    let recipe = document.getElementById('recipe').value;
    let category_id = dishesMap.get(document.getElementById('category').value);

    if (!title || !recipe || !category_id){
        alert('Заполните поля');
        return;
    }

    let resp = await addRecipe_web(title, recipe, category_id)

    if (resp == 'Успешно добавлено'){
        document.getElementById('title').value = null;
        document.getElementById('recipe').value = null;
        document.getElementById('category').value = null;
    } 
    alert(resp);

}

// Добавление обработчиков событий 
document.addEventListener('DOMContentLoaded', () => {
    console.log('Загрузка страницы');
    document.getElementById('iconPlus').addEventListener('click', () => openForm());
    document.getElementById('category').addEventListener('click', () => dropList());
    document.getElementById('addRecipe').addEventListener('click', () => addRecipe());

    document.getElementById('breakfasts').addEventListener('click', ()  => showList('breakfasts'));
    document.getElementById('soups').addEventListener('click', ()  => showList('soups'));
    document.getElementById('main_course').addEventListener('click', ()  => showList('main_course'));
    document.getElementById('salads').addEventListener('click', ()  => showList('salads'));
    document.getElementById('sauces').addEventListener('click', ()  => showList('sauces'));
    document.getElementById('plans').addEventListener('click', ()  => showList('plans'));
});

// Закрытие раскрытых списков
document.addEventListener('click', (event) => {
    const dropdown = document.getElementById('dropdown');
    const categoryInput = document.getElementById('category');
  
    
    if (event.target !== categoryInput && !dropdown.contains(event.target)) {
      dropdown.style.display = 'none';
    }
  });


