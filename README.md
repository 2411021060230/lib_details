# Short Bookstore Lab

1. Extract the folder and open it in VS Code.
2. Install Node.js and MongoDB Community Server if needed. Start MongoDB Server.
3. Compass > Add new connection > mongodb://127.0.0.1:27017 > Connect.
4. Create Database: bookstore. Collection Name: books.
5. VS Code terminal: npm install, then npm start.
6. Import Bookstore.postman_collection.json into Postman.
7. Send Create book, then refresh bookstore > books > Documents in Compass.
8. Test Get all, Get one, Update, and Delete. Refresh Compass after each write.

JavaScript files run in Node.js, not Compass. Compass views the database.
This project requires Express 5 for automatic async error forwarding.
The bundled package.json selects Express 5. Use npm install before starting.
ISBN cannot be updated. Unknown fields and invalid schema values are rejected.
PUT updates supplied fields as requested by the assignment.
Unique ISBN is enforced by a MongoDB unique index.
Direct edits in Compass do not run Mongoose validation: use Postman for the lab.
If connection is refused, ensure MongoDB Community Server is running.
Code has not been runtime-tested with a live MongoDB server here.
