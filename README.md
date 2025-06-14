[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19767095&assignment_repo_type=AssignmentRepo)
# Product API

A RESTful API built with Express.js for managing products with features like authentication, validation, and advanced filtering.

## Features

- Complete CRUD operations for products
- Authentication using API key
- Request logging
- Input validation
- Error handling
- Advanced features:
  - Filtering by category
  - Search functionality
  - Pagination
  - Product statistics

## API Endpoints

### Public Endpoints
- `GET /api/products` - Get all products (with filtering and pagination)
- `GET /api/products/search` - Search products
- `GET /api/products/stats` - Get product statistics
- `GET /api/products/:id` - Get a specific product

### Protected Endpoints (requires API key)
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-name>
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Usage Examples

### Authentication
All protected endpoints require an API key in the header:
```
x-api-key: test-api-key-12345678
```

### Create a Product
```bash
curl -X POST http://localhost:3000/api/products \
  -H "x-api-key: test-api-key-12345678" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "description": "High-performance laptop with 16GB RAM",
    "price": 1200,
    "category": "electronics",
    "inStock": true
  }'
```

### Get All Products
```bash
curl http://localhost:3000/api/products
```

### Search Products
```bash
curl "http://localhost:3000/api/products/search?query=laptop&category=electronics"
```

### Update a Product
```bash
curl -X PUT http://localhost:3000/api/products/1 \
  -H "x-api-key: test-api-key-12345678" \
  -H "Content-Type: application/json" \
  -d '{
    "price": 1100,
    "inStock": false
  }'
```

### Delete a Product
```bash
curl -X DELETE http://localhost:3000/api/products/1 \
  -H "x-api-key: test-api-key-12345678"
```

## Project Structure
```
.
├── src/
│   ├── config/
│   │   └── config.js
│   ├── controllers/
│   │   └── productController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   ├── logger.js
│   │   └── validation.js
│   ├── routes/
│   │   └── productRoutes.js
│   └── utils/
│       └── errors.js
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── server.js
```

## Environment Variables
Create a `.env` file in the root directory with:
```
PORT=3000
API_KEY=test-api-key-12345678
```

## Dependencies
- express: Web framework
- body-parser: Request body parsing
- uuid: Unique ID generation
- dotenv: Environment variables

## Development Dependencies
- nodemon: Auto-reload during development
- jest: Testing framework

## Error Handling
The API uses custom error classes for different types of errors:
- AuthenticationError
- ValidationError
- NotFoundError

## Testing
Run tests with:
```bash
npm test
```

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License
This project is licensed under the MIT License.

## Requirements

- Node.js (v18 or higher)
- npm or yarn
- Postman, Insomnia, or curl for API testing

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [RESTful API Design Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) 
- [RESTful API Design Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) 
- [RESTful API Design Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) 
- [RESTful API Design Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) 