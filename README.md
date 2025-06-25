

# Express.js Products API

## Setup

1. Clone the repository.
2. Install dependencies:
   ```sh
   npm install
   ```
3. Copy `.env` and set your environment variables.
4. Start the server:
   ```sh
   npm start
   ```

## API Endpoints

### GET /api/products
- **Description:** Get all products.
- **Response:**  
  ```json
  [
    {
      "id": "1",
      "name": "Shoes",
      "description": "Elegance size 41",
      "price": 35000,
      "category": "foot wear",
      "inStock": true
    }
  ]
  ```

### GET /api/products/:id
- **Description:** Get a product by ID.
- **Response:**  
  ```json
  {
    "id": "1",
    "name": "Shoes",
    "description": "Elegance size 41",
    "price": 35000,
    "category": "foot wear",
    "inStock": true
  }
  ```

### POST /api/products
- **Description:** Create a new product.
- **Request Body:**  
  ```json
  {
    "name": "Shoes",
    "description": "Elegance size 41",
    "price": 35000,
    "category": "foot wear",
    "inStock": true
  }
  ```
- **Response:**  
  ```json
  {
    "id": "2",
    "name": "Shoes",
    "description": "Elegance size 41",
    "price": 35000,
    "category": "foot wear",
    "inStock": true
  }
  ```

### PUT /api/products/:id
- **Description:** Update a product.
- **Request Body:**  
  ```json
  {
    "name": "Boots"
  }
  ```
- **Response:**  
  ```json
  {
    "id": "1",
    "name": "Boots",
    "description": "Elegance size 41",
    "price": 35000,
    "category": "foot wear",
    "inStock": true
  }
  ```

### DELETE /api/products/:id
- **Description:** Delete a product.
- **Response:**  
  ```json
  { "message": "Product deleted" }
  ```

---

## 2. `.env.example`

````env
# .env.example
PORT=3000
````

## Requirements

- Node.js (v18 or higher)
- npm or yarn
- Postman, Insomnia, or curl for API testing

## API Endpoints

The API will have the following endpoints:

- `GET /api/products`: Get all products
- `GET /api/products/:id`: Get a specific product
- `POST /api/products`: Create a new product
- `PUT /api/products/:id`: Update a product
- `DELETE /api/products/:id`: Delete a product
