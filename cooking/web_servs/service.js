/****************************************************
 *************** Взаимодействия с БД ****************
*****************************************************/

const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',      
  host: 'localhost',    
  database: 'life_stats',  
  password: 'arakelf1',     
  port: 5432,
});

// Получение рецептов из БД по категории
async function getRecipes(categoryId){
  console.log('Вошли в обработку getRecipes');
  const client = await pool.connect();

  try {
    
    const insertQuery = `select name from cooking.recipes where category_id = $1 order by name;`;
    const values = [categoryId];
    const response = await client.query(insertQuery, values);
    console.log('Данные получены');
    return response.rows;
  
  } catch (err) {
    console.error('Ошибка при выполнении запроса:', err);
    return [];
  } finally {
    // Всегда освобождаем клиента
    client.release();
  }

}

//Добавление рецепта в БД
async function insertRecipe(body){
  console.log('Вошли в обработку insertRecipe');
  const client = await pool.connect();

  try {
    
    const json = JSON.parse(body);
    
    // TODO попробовать передать DROP TABLE;
    const insertQuery = 
      `INSERT INTO cooking.recipes (name, content, category_id)
       VALUES ($1, $2, $3);`;
        
    const values = [json.title, json.recipe, json.category_id];    
    await client.query(insertQuery, values);
        
    // Фиксация транзакции
    await client.query('COMMIT');
    console.log('Объект добавлен в БД')
     return 200;
    
  } catch (err) {
    console.error('Ошибка при выполнении запроса: ', err);
    // Не прошла проверка на уникальность поля name
    if(err.code == '23505'){
        return 400;
    }
    await client.query('ROLLBACK');
    return 500;

  } finally {
    // Всегда освобождаем клиента
    client.release();
  }

}

module.exports = {
    insertRecipe,
    getRecipes
};



