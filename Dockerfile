#Докер файл для фронта

# Используем официальный образ Nginx как базовый
FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY /authorization /authorization

COPY /cooking/front cooking/front

COPY index.html index.html

# Открываем порт 3000
EXPOSE 3000

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
