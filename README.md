# Full-Stack-Application-Development

# Name:Abd-alrahman mansour ata

## Set up Database :
### - Create a postgress database with name Full-Stack-Application-Development
### - Create table 
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100),
    description TEXT,
    availability_status BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

### - Add data 
INSERT INTO products (name, price, category, description, availability_status) VALUES
('Wireless Mouse', 25.99, 'Electronics', 'A sleek wireless mouse with ergonomic design.', TRUE),
('Bluetooth Headphones', 59.99, 'Electronics', 'Noise-cancelling headphones with superior sound quality.', TRUE),
('Gaming Keyboard', 89.99, 'Electronics', 'Mechanical keyboard with customizable RGB lighting.', TRUE),
('Coffee Maker', 49.99, 'Home Appliances', 'Brews rich coffee in minutes with a programmable timer.', TRUE),
('Electric Kettle', 35.00, 'Home Appliances', 'Boils water quickly and features auto shut-off.', TRUE),
('Yoga Mat', 19.99, 'Sports', 'Non-slip yoga mat for comfortable workouts.', TRUE),
('Running Shoes', 75.00, 'Footwear', 'Lightweight running shoes designed for comfort and speed.', TRUE),
('Backpack', 39.99, 'Accessories', 'Durable backpack with multiple compartments.', TRUE),
('LED Desk Lamp', 29.99, 'Home Decor', 'Adjustable LED desk lamp with various brightness settings.', TRUE),
('Portable Charger', 24.99, 'Electronics', 'Compact power bank with fast charging capabilities.', TRUE);


## Set up backend server :
### - install express ,cors , body-parser, pg, dotenv
### - Create .env file and add DB_HOST ,DB_USER , DB_PASSWORD, DB_NAME
### - Run server (npm start : if dowenloaded nodemon)

## Set up frontend :
### - install axios ,lucide-react , react-router-dom
### - install tailwind vite 
### - Run forntend (npm run dev)
