-- Database
CREATE DATABASE IF NOT EXISTS stock_management;
USE stock_management;

-- Category table
CREATE TABLE Category (
    CATEGORY_ID INT NOT NULL AUTO_INCREMENT,
    NAME CHAR(50) NOT NULL,
    DESCRIPTION CHAR(250),
    CREATED_AT DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    DELETED_AT DATETIME,
    PRIMARY KEY (CATEGORY_ID)
);

-- Product table
CREATE TABLE Product (
    PRODUCT_ID UUID NOT NULL DEFAULT UUID(),
    NAME CHAR(50) NOT NULL,
    CATEGORY_ID INT NOT NULL,
    DESCRIPTION CHAR(250),
    CREATED_AT DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    DELETED_AT DATETIME,
    STOCK INT NOT NULL,
    PRIMARY KEY (PRODUCT_ID),
    CONSTRAINT FK_Product_Category FOREIGN KEY (CATEGORY_ID) REFERENCES Category(CATEGORY_ID)
);

-- Sample data
INSERT INTO Category (NAME, DESCRIPTION, CREATED_AT, UPDATED_AT) VALUES
('No Category', 'No Category', NOW(), NOW()),
('Electronics', 'Gadgets, devices, and accessories', NOW(), NOW()),
('Books', 'Physical books, e-books, and audiobooks', NOW(), NOW()),
('Apparel', 'Clothing, shoes, and wearable accessories', NOW(), NOW());

INSERT INTO Product (NAME, CATEGORY_ID, DESCRIPTION, CREATED_AT, UPDATED_AT, STOCK) VALUES
-- Electronics (Category 1)
('Wireless Noise-Canceling Headphones', 1, 'Over-ear headphones with 30-hour battery life', NOW(), NOW(), 150),
('Smartphone Pro Max 1TB', 1, 'High-end smartphone with OLED display and triple camera', NOW(), NOW(), 45),
('Mechanical Gaming Keyboard', 1, 'RGB backlit keyboard with tactile switches', NOW(), NOW(), 85),
('4K Ultra HD Smart TV', 1, '55-inch smart television with streaming capabilities', NOW(), NOW(), 20),

-- Books (Category 2)
('The Galactic Empire', 2, 'Award-winning science fiction space opera novel', NOW(), NOW(), 300),
('Mastering MariaDB', 2, 'Comprehensive guide to relational database design', NOW(), NOW(), 75),
('Quick & Easy Meals', 2, 'A cookbook featuring 30-minute recipes for busy people', NOW(), NOW(), 120),

-- Apparel (Category 3)
('Classic Cotton T-Shirt', 3, '100% organic cotton crewneck tee in black', NOW(), NOW(), 500),
('Slim Fit Denim Jeans', 3, 'Comfort-stretch blue denim jeans', NOW(), NOW(), 250),
('Waterproof Winter Jacket', 3, 'Insulated heavy-duty jacket for cold weather', NOW(), NOW(), 60);