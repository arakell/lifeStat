# Используем официальный образ Nginx как базовый
FROM nginx:alpine

# Устанавливаем рабочую директорию
#WORKDIR /usr/share/nginx/html

# Копируем файлы из директории authorization/front в директорию /usr/share/nginx/html/authorization
COPY authorization/front authorization/front/

# Копируем файлы из директории cooking/front в директорию /usr/share/nginx/html/cooking
#COPY cooking/front/ ./cooking/

# Копируем файл конфигурации Nginx из директории authorization/front
#COPY authorization/front/nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт 3000
#EXPOSE 3000

# Запускаем Nginx
#CMD ["nginx", "-g", "daemon off;"]
