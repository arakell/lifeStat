# Используем официальный образ Nginx как базовый
FROM nginx:alpine

# Копируем файлы из директории authorization/front в директорию /usr/share/nginx/html/authorization
COPY /authorization/ /authorization/

# Копируем файлы из директории cooking/front в директорию /usr/share/nginx/html/cooking
COPY /cooking/front/ cooking/front

# Копируем файл конфигурации Nginx из директории authorization/front
COPY /authorization/front/nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт 3000
EXPOSE 3000

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
