-- Database
CREATE DATABASE IF NOT EXISTS stock_management;
USE stock_management;

-- Category table
CREATE TABLE Category (
    CATEGORY_ID INT NOT NULL AUTO_INCREMENT,
    NAME CHAR(50) NOT NULL,
    DESCRIPTION CHAR(250),
    CREATED_AT DATE NOT NULL,
    UPDATED_AT DATE NOT NULL,
    DELETED_AT DATE,
    PRIMARY KEY (CATEGORY_ID)
);

-- Product table
CREATE TABLE Product (
    PRODUCT_ID UUID NOT NULL DEFAULT UUID(),
    NAME CHAR(50) NOT NULL,
    CATEGORY_ID INT NOT NULL,
    DESCRIPTION CHAR(250),
    CREATED_AT DATE NOT NULL,
    UPDATED_AT DATE NOT NULL,
    DELETED_AT DATE,
    STOCK INT NOT NULL,
    PRIMARY KEY (PRODUCT_ID),
    CONSTRAINT FK_Product_Category FOREIGN KEY (CATEGORY_ID) REFERENCES Category(CATEGORY_ID)
);

-- Sample data
INSERT INTO Category (CATEGORY_ID, NAME, DESCRIPTION, CREATED_AT, UPDATED_AT) VALUES
(1, 'Electronics', 'Gadgets, devices, and accessories', CURDATE(), CURDATE()),
(2, 'Books', 'Physical books, e-books, and audiobooks', CURDATE(), CURDATE()),
(3, 'Apparel', 'Clothing, shoes, and wearable accessories', CURDATE(), CURDATE());

INSERT INTO Product (PRODUCT_ID, NAME, CATEGORY_ID, DESCRIPTION, CREATED_AT, UPDATED_AT, STOCK) VALUES
-- Electronics (Category 1)
(UUID(), 'Wireless Noise-Canceling Headphones', 1, 'Over-ear headphones with 30-hour battery life', CURDATE(), CURDATE(), 150),
(UUID(), 'Smartphone Pro Max 1TB', 1, 'High-end smartphone with OLED display and triple camera', CURDATE(), CURDATE(), 45),
(UUID(), 'Mechanical Gaming Keyboard', 1, 'RGB backlit keyboard with tactile switches', CURDATE(), CURDATE(), 85),
(UUID(), '4K Ultra HD Smart TV', 1, '55-inch smart television with streaming capabilities', CURDATE(), CURDATE(), 20),

-- Books (Category 2)
(UUID(), 'The Galactic Empire', 2, 'Award-winning science fiction space opera novel', CURDATE(), CURDATE(), 300),
(UUID(), 'Mastering MariaDB', 2, 'Comprehensive guide to relational database design', CURDATE(), CURDATE(), 75),
(UUID(), 'Quick & Easy Meals', 2, 'A cookbook featuring 30-minute recipes for busy people', CURDATE(), CURDATE(), 120),

-- Apparel (Category 3)
(UUID(), 'Classic Cotton T-Shirt', 3, '100% organic cotton crewneck tee in black', CURDATE(), CURDATE(), 500),
(UUID(), 'Slim Fit Denim Jeans', 3, 'Comfort-stretch blue denim jeans', CURDATE(), CURDATE(), 250),
(UUID(), 'Waterproof Winter Jacket', 3, 'Insulated heavy-duty jacket for cold weather', CURDATE(), CURDATE(), 60);