## MENU BACKEND API 
This  Backend API for a menu management system contains  Categories, Subcategories, and Items.
Built using Node.js, Express, and MongoDB (Mongoose).

## Features
- Read, Update categories, subcategories, and items.
- Nested structure: Items → Subcategories → Categories.
- Tax calculation based on category or subcategory.
- Search items by name.
- Dynamic population of references (populate) for better data structure.
- RESTful API design.

## API ENDPOINTS
for categories
| Method | Endpoint                    | Description                |
| ------ | --------------------------- | -------------------------- |
| POST   | `/api/categories`           | Create new category        |
| GET    | `/api/categories`           | Get all categories         |
| GET    | `/api/categories/:idOrName` | Get category by ID or Name |
| PUT    | `/api/categories/:id`       | Update category            |

for subcategories
| Method | Endpoint                                  | Description                        |
| ------ | ----------------------------------------- | ---------------------------------- |
| POST   | `/api/subcategories`                      | Create new subcategory             |
| GET    | `/api/subcategories`                      | Get all subcategories              |
| GET    | `/api/subcategories/:idOrName`            | Get subcategory by ID or Name      |
| GET    | `/api/subcategories/category/:categoryId` | Get subcategories under a category |
| PUT    | `/api/subcategories/:id`                  | Update subcategory                 |

for items
| Method | Endpoint                                | Description                   |
| ------ | --------------------------------------- | ----------------------------- |
| POST   | `/api/items`                            | Create new item               |
| GET    | `/api/items`                            | Get all items                 |
| GET    | `/api/items/:idOrName`                  | Get item by ID or Name        |
| GET    | `/api/items/category/:categoryId`       | Get items under a category    |
| GET    | `/api/items/subcategory/:subCategoryId` | Get items under a subcategory |
| GET    | `/api/items/search?name=<name>`         | Search items by name          |
| PUT    | `/api/items/:id`                        | Update item                   |

## PROJECT SETUP AND RUNNING

## clone the repo
- git clone https://github.com/PunithKumar-13/Menu-assignment-guestara.git
- cd menu-backend

## install dependencies
- npm install 

## add .env 
- MONGO_URI= Your MongoDB Connection String
- PORT=5000

## run the server
- now server will run on http://localhost/5000

## Notes
- Make sure your IP is allowed in MongoDB Atlas Network Access.
- .env file is ignored in .gitignore for security.
- MongoDB collections: categories, subcategories, items.

## Sample Data
- Categories: Beverages, Cakes, Snacks

- Subcategories (Beverages):Hot drinks

- Items (Hot Drinks):Cappuccino
## Assignment Reflection

## Which database you have chosen and why?
- I chose MongoDB because it’s flexible and schema-less, which made it easy to model nested data like Categories → Subcategories → Items. Its integration with Mongoose in Node.js allows for easy population of references and validation, which was perfect for this assignment.

## Three things I learned from this assignment:
- How to design a nested data structure with proper references between categories, subcategories, and items.
- How to implement dynamic calculations (like tax and total price) based on parent or child objects.
-How to write RESTful APIs with proper error handling and query features (search by name, get by category/subcategory).

## The most challenging part of the assignment:
- Designing and linking the nested structure of categories, subcategories, and items while ensuring data validation, proper population, and dynamic tax calculation worked correctly for all cases.

## What I would have done differently given more time:
- I would have added user authentication, role-based access, and pagination/search optimization for items to make the API more robust and closer to a real-world application.

  











