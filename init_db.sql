--Создать БД life_stats
--Схему cooking

-- 1. Создаем базу данных (если не существует)
CREATE DATABASE lifeStat;

-- 2. Подключаемся к созданной БД
\c lifestat

-- 3. Создаем схему cooking
CREATE SCHEMA cooking;

CREATE TABLE cooking.categories (
    id SERIAL PRIMARY KEY,        
    name VARCHAR(50) UNIQUE NOT NULL
);


INSERT INTO cooking.categories (name) 
VALUES 
    ('завтраки'), 
    ('супы'), 
    ('горячее'), 
    ('салаты'), 
    ('соусы'), 
    ('планы');


CREATE TABLE cooking.recipes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(250) UNIQUE NOT NULL,    
    content TEXT,         
    category_id INT NOT NULL,     
    	FOREIGN KEY (category_id)   
        REFERENCES cooking.categories(id)
        ON DELETE RESTRICT       
);


INSERT INTO cooking.recipes (name, content, category_id)
VALUES 
    (
        'Блины', 
        '> 3 яйца взбиваем венчиком
		> добавляем 3 ст ложки сахара и пол чайной соли
		> вливаем стакан молока и перемешиваем
		> понемногу добавляем 1,5 стакана муки и замешиваем густое тесто
		> добавляем стакан молока, 3 ст ложки подсолнечного масла, стакан кипятка
		> перемешиваем
		> жарим на ~150 градусах', 
        (SELECT id FROM cooking.categories WHERE name = 'завтраки')
    ),
    (
        'Гренки', 
        '> примерно в соотношении 1:1 молоко и яйца + немного соли
		> обмакивать гренки (выдержать) и обжаривать на сковородке с маслом', 
        (SELECT id FROM cooking.categories WHERE name = 'завтраки')
    ),
    (
        'Окрошка', 
        'Колбаса, огурец, редис, яйца, картошка, зелень
		Вода, майонез, уксус, горчица', 
        (SELECT id FROM cooking.categories WHERE name = 'супы')
    );

