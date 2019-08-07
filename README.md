# the-art-project

Art auction app made with the MERN stack.
Addition backend technologies include, but are not limited to, express.js, JSON webtokens and GraphQL.

You need to have node and mongodb installed to run this application locally.

### setup

Add an .env file in the server directory.
This file should have the following variable declarations:
SECRET=this will be your json webstoken secret
PORT=the port on which you'll run the server ideally it's port 3001 so React can connect.
ENV=will be development in development enviroment, otherwise switch to production
DB_CONNECT=a mongo connection string
