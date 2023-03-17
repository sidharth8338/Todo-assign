# Todo-assign

## Client

1. cd client/
2. npm install or yarn install --> To install all necessary packages
3. npm run start --> To start the project in development mode.
4. npm run build --> To build the project for production
5. npm run serve --> To serve the build folder, make sure you have installed the `serve` package globally in your os.

## Server

1. cd server/
2. npm install
3. Create a .env file and put these (MONGO_URI='mongodb+srv://{{username}}:{{password}}@cluster0.vh8j3.mongodb.net'
   URL_CONNECTOR='retryWrites=true&w=majority'
   JWT_AUTH_TOKEN_SECRET="Hello") 3 variables in it --> Put your username and password in the place of username and password
4. npm run start --> This will start the server.
