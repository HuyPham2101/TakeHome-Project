<!-- Heading -->

## SET UP BACKEND

Create environment file 
* cp ./packages/backend/.env.example ./packages/backend/.env

Install npm packages inside Docker Container in backend
* docker-compose exec backend npm install

Start Container
* docker-compose up/docker-compose up -d 

Insert fixtures
* docker-compose exec backend npm run fixtures

Update schema in mysql
* docker-compose exec backend npm run typeorm schema:sync

## SET UP FRONTEND
Locate yourself in the frontend folder and run
* npm install 

Install npm packages inside Docker Container in frontend
* docker-compose exec frontend npm install

## ASSIGNMENT 
    Sever run on Localhost:3000 and backend run on port 4000 . The Web contains a main Pages -> DashBoard Page 
* DashBoard-Page
    * Wrapped inside the Layout Component
    * Fetch Track from the backend database with /trackings GET Methode
    * Display all Track and Informations with Table Styling using Material-Ui

## Build With
    * Node.js
    * Javascript
    * Typescript
    * Express.js
    * mySQL
    * Cypress
    * Material-ui

# Side Notes
It took me around 6 hours to get this done. The Assignment is interesting for me 