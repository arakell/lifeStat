const service = require('./service.js'); 
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  console.log("");
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
  console.log('search endpoint');
  console.log('url' + req.url);
  console.log('method' + req.method);
  console.log(req.url.substring(0, 11));
  // Обрабатываем POST-запрос по адресу /add-recipe
  if (req.method === 'POST' && req.url === '/add_recipe') {
    console.log('in /add_recipe')
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      console.log("got body:");
      console.log(body);

      tmp = await service.insertRecipe(body);

      console.log("tmp");
      console.log(tmp);
      if(tmp == 200){
        console.log('200');
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Успешно добавлено в БД.');    
      }
      else if (tmp == 400 ){
        console.log('400');
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.end('Неуникальное имя рецепта.');   
      }
      else{
        console.log('500');
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Неизвестная ошибка');
      };

    });
  }
  /* http://localhost:8080/get_recipe?category=1 (лучше передавать id)
  query параметры
  */
  else if(req.method === 'GET' && req.url.substring(0, 11) === '/get_recipe'){
    console.log('in get_recipe')
    const parsedUrl = url.parse(req.url, true);
    const category = parsedUrl.query.category;
    console.log('id caregory', category);

    req.on('data', () => {
    });
    
    req.on('end', async () => {
      console.log('in on end')
      let tmp = await service.getRecipe(category);
      console.log("tmp ", tmp);
      if(tmp != []){
        console.log('200');
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(JSON.stringify(tmp));    
      }  
      else{
        console.log('500');
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Неизвестная ошибка');
      };

    });
  }
  else{
  /* Если не вошли ни в какой endpoint */
    res.writeHead(404);
    res.end('EndPoint not found');
  }
});

// Запуск сервера
const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

