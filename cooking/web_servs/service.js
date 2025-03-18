
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',      
  host: 'localhost',    
  database: 'life_stats',  
  password: 'arakelf1',     
  port: 5432,
});


async function getRecipes(category_id){
  console.log("at getRecipes");
  const client = await pool.connect();

  try {
      const insertQuery = `
        select name from cooking.recipes where category_id = $1 order by name;`;
      //TODO попробовать в качестве категории передать ;DROP название таблицы;
/*
    todo: поменять позиционные параметры на именованные 
    должно быть так 
    const query = 'SELECT * FROM recipes WHERE category_id = :categoryId';
    const values = {
      categoryId: categoryId,
      name: name
    };

*/

      const values = [category_id];
      
      const response = await client.query(insertQuery, values);

      console.log("object added to DB")

      return response.rows;
  
    } catch (err) {
      console.error('Ошибка при выполнении запроса:', err);
      return [];
    } finally {
      // Всегда освобождаем клиента
      client.release();
    }

}

async function insertRecipe(body){
    console.log("at insertRecipe");
    const client = await pool.connect();

    try {
    
        const json = JSON.parse(body);

        const insertQuery = `
          INSERT INTO cooking.recipes (name, content, category_id)
          VALUES ($1, $2, $3);`;
        
        const values = [json.title, json.recipe, json.category_id];
        
        await client.query(insertQuery, values);
        
        // Фиксация транзакции
        await client.query('COMMIT');
        console.log("object added to DB")
        return 200;
    
      } catch (err) {
    
        if(err.code == '23505'){
          /* Не прошла проверка на уникальность поля name */
            return 400;
        }
        await client.query('ROLLBACK');
        console.error('Ошибка при выполнении запроса:', err);
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



