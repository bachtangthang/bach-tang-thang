
## Problem 5 ##
### How to run ###
step 1: Go into directory src/problem5
step 2: npm install 
step 3: npm run start:dev 

## Description ##
- This BE design contains the least libraries I can think of.
- Folder structure:
	- Separate by modules, each module represents database tables, each module will has its own logic
	- Separate layer: API layer -> Service layer -> repository layer (easy for separating business logic)
	- Database: Postgresl
	- Built-in Http response and exception
	- Built-in filters for api post
- Future enhancement: validator, .. 
        
## Checking API ##
- Books:
	- Create: Post, '/books/create'
	- Update: Put, '/books'
	- Detail: Get, '/books/:id'
	- Delete: Delete, '/books/:id'
	- Listing: Post, '/books'
	body: `{
    "columns": [
        "id",
        "title",
        "content",
        "author"
    ],
    "filters": [
        {
            "field": "id",
            "operator": "greater_than",
            "value": 1,
            "dataType": 1
        },
        {
            "field": "title",
            "operator": "ends_with",
            "value": "code",
            "dataType": 2
        }
    ],
		"page": 1,
    "limit": 10
}`