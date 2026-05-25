-- Database
CREATE DATABASE IF NOT EXISTS stock_management;
USE stock_management;

-- Category table
CREATE TABLE Category (
    CATEGORY_ID INT NOT NULL AUTO_INCREMENT,
    NAME CHAR(50) NOT NULL,
    DESCRIPTION CHAR(250),
    CREATED_AT DATE NOT NULL DEFAULT CURDATE(),
    UPDATED_AT DATE NOT NULL DEFAULT CURDATE(),
    DELETED_AT DATE,
    PRIMARY KEY (CATEGORY_ID)
);

-- Product table
CREATE TABLE Product (
    PRODUCT_ID UUID NOT NULL DEFAULT UUID(),
    NAME CHAR(50) NOT NULL,
    CATEGORY_ID INT NOT NULL,
    DESCRIPTION CHAR(250),
    CREATED_AT DATE NOT NULL DEFAULT CURDATE(),
    UPDATED_AT DATE NOT NULL DEFAULT CURDATE(),
    DELETED_AT DATE,
    STOCK INT NOT NULL,
    PRIMARY KEY (PRODUCT_ID),
    CONSTRAINT FK_Product_Category FOREIGN KEY (CATEGORY_ID) REFERENCES Category(CATEGORY_ID)
);

-- Sample data
INSERT INTO Category (NAME, DESCRIPTION, CREATED_AT, UPDATED_AT) VALUES
('No Category', 'No Category', CURDATE(), CURDATE()),
('Electronics', 'Gadgets, devices, and accessories', CURDATE(), CURDATE()),
('Books', 'Physical books, e-books, and audiobooks', CURDATE(), CURDATE()),
('Apparel', 'Clothing, shoes, and wearable accessories', CURDATE(), CURDATE());

INSERT INTO Product (NAME, CATEGORY_ID, DESCRIPTION, CREATED_AT, UPDATED_AT, STOCK) VALUES
-- Electronics (Category 1)
('Wireless Noise-Canceling Headphones', 1, 'Over-ear headphones with 30-hour battery life', CURDATE(), CURDATE(), 150),
('Smartphone Pro Max 1TB', 1, 'High-end smartphone with OLED display and triple camera', CURDATE(), CURDATE(), 45),
('Mechanical Gaming Keyboard', 1, 'RGB backlit keyboard with tactile switches', CURDATE(), CURDATE(), 85),
('4K Ultra HD Smart TV', 1, '55-inch smart television with streaming capabilities', CURDATE(), CURDATE(), 20),

-- Books (Category 2)
('The Galactic Empire', 2, 'Award-winning science fiction space opera novel', CURDATE(), CURDATE(), 300),
('Mastering MariaDB', 2, 'Comprehensive guide to relational database design', CURDATE(), CURDATE(), 75),
('Quick & Easy Meals', 2, 'A cookbook featuring 30-minute recipes for busy people', CURDATE(), CURDATE(), 120),

-- Apparel (Category 3)
('Classic Cotton T-Shirt', 3, '100% organic cotton crewneck tee in black', CURDATE(), CURDATE(), 500),
('Slim Fit Denim Jeans', 3, 'Comfort-stretch blue denim jeans', CURDATE(), CURDATE(), 250),
('Waterproof Winter Jacket', 3, 'Insulated heavy-duty jacket for cold weather', CURDATE(), CURDATE(), 60);