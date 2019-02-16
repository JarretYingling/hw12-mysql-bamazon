DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products(
    item_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) UNIQUE NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT NULL
);

INSERT INTO products(
    product_name, department_name
) VALUES
    ('boolean', 'variables'),
    ('number', 'variables'),
    ('string', 'variables'),
    ('array', 'variables'),
    ('object', 'variables'),
    ('undefined', 'variables'),
    ('callback', 'functions'),
    ('closure', 'functions'),
    ('promise', 'functions'),
    ('recursion', 'functions');