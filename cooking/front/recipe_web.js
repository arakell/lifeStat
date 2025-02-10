/* Для веб взаимодействий */



export const addRecipe_web = async (title, recipe, category_id) => {
    try {

        let response = await fetch('http://localhost:8080/add_recipe', {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                recipe : recipe,
                category_id: category_id
            })
        });
    
        console.log(response.status);
        if (response.status == 200) { 
            return 'Успешно добавлено'
        } else if(response.status == 400){
            return 'Неуникальное имя'
        } else{
            return 'Неизвестная ошибка'
        }

    } catch (err) {
      return 'Неизвестная ошибка'
    }
  };


  export const getRecipesByCat_web = async (category_id) => {
    try {
        //TODO ЗДЕСЬ ОСТАНОВИЛИСь на бэке всё ок, надо запрос передать и обработать ответ
        let response = await fetch('http://localhost:8080/get_recipe?category=${category_id}', {
            method: 'GET',
            body: JSON.stringify({
                title: title,
                recipe : recipe,
                category_id: category_id
            })
        });
    
        console.log(response.status);
        if (response.status == 200) { 
            return 'Успешно добавлено'
        } else if(response.status == 400){
            return 'Неуникальное имя'
        } else{
            return 'Неизвестная ошибка'
        }

    } catch (err) {
      return 'Неизвестная ошибка'
    }
  };
