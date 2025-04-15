

# Используем официальный образ Nginx как базовый
FROM nginx:alpine

# Копируем файлы из директории authorization в директорию /usr/share/nginx/html/authorization
COPY /authorization/front/ /usr/share/nginx/html/authorization/front/

# Копируем файлы из директории cooking/front в директорию /usr/share/nginx/html/cooking
COPY /cooking/front/ /usr/share/nginx/html/cooking/front/

# Копируем файл конфигурации Nginx
COPY /authorization/front/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]