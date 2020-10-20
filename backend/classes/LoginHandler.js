const session = require("express-session");
const DbHandler = require("./DbHandler");

module.exports = class LoginHandler {
  constructor(app, dbPath) {
    // connect to db via DbHandler
    this.db = new DbHandler(dbPath);
    // change secret for each project
    this.secret = "my secret salt";
    this.app = app;
    this.addExpressSessionMiddleware();
    this.setupLoginRoutes();
  }

  addExpressSessionMiddleware() {
    // adding express-session middleware that will give us a session object
    // as a property on each request object in express routes
    this.app.use(
      session({
        secret: this.secret,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: "auto" },
      })
    );
  }

  setupLoginRoutes() {
    // Post = login
    this.app.post("/api/login", (req, res) => {
      // User already logged in
      if (req.session.user) {
        res.json({ error: "Already logged in!" });
        return;
      }
      // Check if email and password exists
      // in the db and matches the request
      let result = this.db.select(
        /*sql*/ `
        SELECT *
        FROM User
        WHERE email = $email AND password = $password
        `,
        req.body
      );
      // We did not find any matching email + password
      if (result.length === 0) {
        res.json({ error: "No match!" });
        return;
      }
      // Log in by adding user to the session
      req.session.user = result[0];
      res.json(req.session.user);
    });

    // Get = check who is logged in
    this.app.get("/api/login", (req, res) => {
      res.json(req.session.user || { error: "No user logged in!" });
    });

    // Delete = logout
    this.app.delete("/api/login", (req, res) => {
      if (!req.session.user) {
        // No user is logged assert.notInstanceOf(object, constructor, "[message]");
        res.json({ error: "Already logged out!" });
        return;
      }
      // Log out the user by deleting the session.user property
      delete req.session.user;
      res.json({ success: "Logged out! " });
    });
  }
};
