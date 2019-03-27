require("dotenv").config();
require("./config/passport.js");

import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import mongoose from "mongoose";
import schema from "./graphql/types/";
import resolvers from "./graphql/resolvers/";
import session from "express-session";
import passport from "passport";
import { ApolloServer } from "apollo-server-express";

const app = express();

mongoose.connect(
	"mongodb://localhost:27017/art-db",
	{ useNewUrlParser: true },
	err => {
		if (err) console.log(err);
		else console.log("Connected");
	}
);

app.use(
	session({
		secret: process.env.SECRET,
		resave: true,
		saveUninitialized: false
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/graphql", (req, res, next) => {
	passport.authenticate("jwt", { session: false }, (err, user, info) => {
		if (user) {
			req.user = user;
		} else {
			req.user = { name: "test" };
		}

		next();
	})(req, res, next);
});

const server = new ApolloServer({
	context: ({ req }) => {
		debugger;
		return req.user;
	},
	typeDefs: schema,
	resolvers,

	engine: {
		apiKey: process.env.ENGINE_API_KEY
	}
});

server.applyMiddleware({ app, path: "/graphql" });

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser("big old long secret"));

if (process.env.ENV === "development") {
	app.set("views", path.join(__dirname, "views"));
	app.use(express.static(path.join(__dirname, "public")));
	app.use(
		require("cors")({
			credentials: true,
			origin: [
				"http://localhost:3000",
				"http://localhost:3000/",
				"http://192.168.2.87:3000",
				"http://192.168.2.87:3000/",
				"192.168.2.87:3000",
				"192.168.2.87:3000/",
				"localhost:3000/",
				"http://localhost:3001",
				"http://10.85.5.196:3000/",
				"10.85.5.196:3000/",
				"http://10.85.5.196:3000"
			]
		})
	);

	app.get("/", (req, res) => {
		res.render("index");
	});
}

if (process.env.ENV === "production") {
	app.use(express.static(path.join(__dirname, "client")));
	app.get("/", function(req, res) {
		res.sendFile(path.join(__dirname, "/client", "index.html"));
	});
}

const authroutes = require("./routes/authroutes");
app.use("/api", authroutes);

const searchRoutes = require("./routes/search");
app.use("/api", searchRoutes);

const uploadroutes = require("./routes/upload");
app.use("/api", uploadroutes);

const update = require("./routes/update");
app.use("/api", update);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
