# Chat-App

A simple real time chat application. 
* The server is set up using nodejs and the application is initialized using Express.
* It has an authentication system using passport. 
* When a registration happens it stores the data in MongoDB, the password is encrypted before storing using bcrypt.
When logging in, passport checks the database for a matching email and password. The dasboard and chat pages cannot be seen unless authenticated.
* When entering a room, a link between the user and the room is created, so that the messages and the user won't appear in other rooms.
* Messages are also stored in the database with the user that sent them, the room they where sent in and the time at which they where sent. 
Communication between server side and client side happens using socket.io that both emits and listens for events.
* The pages are designed using bootstrap. 
* The logging functionality is created using log4js and the data is stored in a logFile.
* The testing functionality is created using jest and has basic unit testing for the custom simple function.
* Custom messages for error and succes situations are created using ejs, that creat HTML markups from javascript.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them


* [NodeJS](https://nodejs.org/en/) - Used for setting up the server side


* [MongoDB](https://docs.mongodb.com/manual/installation/) - The Database used



### Installing

A step by step series of examples that tell you how to get a development env running
```
Download the project
```
Install the dependencies (run this command in a terminal with the project location)

```
npm install
```

Create a directory for where you want the database to be stored. 
The --dbpath option points to your database directory.  
The terminal must be kept open while running the program.
Start the database using this command in a terminal:

```
"C:\Program Files\MongoDB\Server\4.2\bin\mongod.exe" --dbpath="c:\data\db"
```

Start the program by running this command in the project terminal

```
npm run dev
```

The application opens in port 5000

```
http://localhost:5000/
```

## Running the tests

In order to run a test for the links, messages and logger use the command

```
npm run test
```


## Built With

* [MongoDB Compass](https://www.mongodb.com/try/download/compass) - A GUI for the Database
* [Visual Studio Code](https://code.visualstudio.com/) - The text editor
* [Express](https://expressjs.com/) - The web application framework
* [Express-ejs-layouts](https://www.npmjs.com/package/express-ejs-layouts) - Layout support for ejs in express
* [Express-session](https://www.npmjs.com/package/express-session) - Session middleware for Express
* [connect-flash](https://www.npmjs.com/package/connect-flash) - Area for storing messages
* [EJS](https://ejs.co/) - Template for generating HTML markup with Javascript
* [log4js](https://www.npmjs.com/package/log4js) - The Logging Framework
* [bcrypt](https://www.npmjs.com/package/bcryptjs) - Library used for crypting the passwords
* [moment](https://momentjs.com/) - The Library for getting the current time
* [Mongoose](https://mongoosejs.com/) - Tool for modeling MongoDB objects
* [Passport](http://www.passportjs.org/) - Authentification Middleware
* [Socket.io](socket.io) - A library that enables realtime communication between server and client
* [jest](https://jestjs.io/) - The testing Framework
* [nodemon](https://nodemon.io/) - Restarts the server when a change occurrs in the surce code

## Authors

* **Gheorghe Catalin-Stefan**
