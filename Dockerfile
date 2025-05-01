#Докер файл для фронта

# Используем официальный образ Nginx как базовый
FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY index.html /usr/share/nginx/html/
COPY ./authorization /usr/share/nginx/html/authorization
COPY ./cooking/front /usr/share/nginx/html/cooking/front

# Открываем порт 3000
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
