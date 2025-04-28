/************************************************************
 *************** Обработка входящих запросов ****************
 ************************************************************/

const service = require('./service.js');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  console.log('');
  console.log('Начало обработки запроса');

  // Настройка CORS (разрешаем запросы с любого источника)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Обработка предварительного OPTIONS-запроса
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  console.log('url: ' + req.url);
  console.log('method: ' + req.method);
  
  // POST-запрос /add-recipe
  if (req.method === 'POST' && req.url === '/add_recipe') {
    console.log('Вошли в POST /add_recipe')
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      console.log('Получили тело запроса:');
      console.log(body);

      tmp = await service.insertRecipe(body);
      console.log('Статус ответа ' + tmp);

      if(tmp == 200){
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Успешно добавлено в БД.');    
      }
      else if (tmp == 400 ){
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.end('Неуникальное имя рецепта.');   
      }
      else{
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Неизвестная ошибка');
      };

    });
  }
  // GET запрос /get_recipes_by_cat?category=VALUE
  else if(req.method === 'GET' && req.url.substring(0, 19) === '/get_recipes_by_cat'){
    console.log('Вошли в GET /get_recipes_by_cat')
    const parsedUrl = url.parse(req.url, true);
    const category = parsedUrl.query.category;
    console.log('id caregory ' + category);

    req.on('data', () => {
    });
    
    req.on('end', async () => {
      let tmp = await service.getRecipes(category);
      console.log('Ответ ' + tmp);
      if(tmp != []){
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(JSON.stringify(tmp));    
      }  
      else{
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Неизвестная ошибка');
      };

    });
  }
  
  // GET запрос /get_recipe_by_name?name=VALUE
  else if(req.method === 'GET' && req.url.substring(0, 19) === '/get_recipe_by_name'){
    console.log('Вошли в GET /get_recipe_by_name')
    const parsedUrl = url.parse(req.url, true);
    const name = parsedUrl.query.name;
    console.log('name ' + name);

    req.on('data', () => {
    });
    
    req.on('end', async () => {
      let tmp = await service.getRecipeByName(name);
      console.log('Ответ ' + tmp);
      if(tmp != []){
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(JSON.stringify(tmp));    
      }  
      else{
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Неизвестная ошибка');
      };

    });
  }
  // Endpoint не нашёлся
  else{
    console.log('EndPoint не найден');
    res.writeHead(404);
    res.end('EndPoint not found');
  }
});

// Запуск сервера
//TODO прописать явно localhost
const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log('Сервер запущен на порту ' + PORT);
});

