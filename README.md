# API with Clean Architecture and Hexagonal Architecture

Study project based on the Udemy course **"Domine a Arquitetura Limpa e Hexagonal"**, focused on the practical application of the concepts.

The API implements a basic CRUD for Users (with authentication) and Products.

## 🛠️ Tech Stack

* Node.js
* TypeScript
* MongoDB
* Express
* JWT (jsonwebtoken)
* bcrypt

## 🚀 How to Run

1.  Clone this repository:
    ```bash
    git clone [YOUR_REPOSITORY_URL]
    cd [FOLDER_NAME]
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Create a `.env` file in the project root with the following variables:
    ```env
    # Application Port
    PORT=3000

    # MongoDB Connection URL
    DB_URL="mongodb://user:pass@localhost:27017/your_db_name"

    # JWT Secret
    JWT_SECRET="your_random_secret_here"
    ```

4.  Start the development server:
    ```bash
    npm run dev
    ```

## 🔌 Endpoints

### 👤 User

* `POST /users` - Creates a new user.
    * Body: `{ "name": "...", "email": "...", "password": "..." }`
* `POST /login` - Authenticates a user.
    * Body: `{ "email": "...", "password": "..." }`
    * Response: `{ "token": "..." }`

### 📦 Product (Authenticated Routes)

* `GET /products/:id` - Finds a product by ID.
    * Header: `Authorization: Bearer [token]`
