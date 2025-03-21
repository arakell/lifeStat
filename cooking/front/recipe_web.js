/******************************************************
 *************** Для веб-взаимодействий ***************
 ******************************************************/


// Запрос на добавление рецепта
export const addRecipe_web = async (title, recipe, category_id) => {
    try {

        let response = await fetch(
            'http://localhost:8080/add_recipe', 
            {
                method: 'POST',
                body: JSON.stringify({
                    title: title,
                    recipe : recipe,
                    category_id: category_id
                })
            }
        );
    
        console.log('Прошёл запрос на добавление рецепта, статус ответа: ' + response.status);
        if (response.status == 200) { 
            return 'Успешно добавлено';
        } else if(response.status == 400){
            return 'Неуникальное имя';
        } else{
            return 'Неизвестная ошибка';
        }

    } catch (err) {
      return 'Неизвестная ошибка';
    }
};

// Запрос на получение рецептов в данной категории
export const getRecipesByCat_web = async (category_id) => {
    try {

        let response = await fetch(
            'http://localhost:8080/get_recipes_by_cat?category=' + category_id, 
            {
                method: 'GET'
            }
        );
    
        console.log('Прошёл запрос на получение рецептов в категории, статус ответа: ' + response.status);
        if (response.status == 200) {
            return await response.json();
        } else{
            return 'Неизвестная ошибка';
        }

    } catch (err) {
      return 'Неизвестная ошибка';
    }
};

// Запрос рецепта по наименованию
export const getRecipeByName_web = async (name) => {

    try {

        let response = await fetch(
            'http://localhost:8080/get_recipe_by_name?name=' + name, 
            {
                method: 'GET'
            }
        );
    
        console.log('Прошёл запрос на получение рецепта по наименованию, статус ответа: ' + response.status);
        if (response.status == 200) {
            return await response.json();
        } else{
            return 'Неизвестная ошибка';
        }

    } catch (err) {
      return 'Неизвестная ошибка';
    }
};

