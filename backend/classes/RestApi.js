const DbHandler = require("./DbHandler");

module.exports = class RestApi {
  constructor(app, dbPath, routePrefix = "/api") {
    // app is supposed to be an Express web server instance
    this.app = app;
    // the routeprefix is what each url in
    // the REST api should begin with
    this.routePrefix = routePrefix;
    // get all the tables in the database
    this.db = new DbHandler(dbPath);
    // add rest routes for each table
    for (let table of this.getAllTables()) {
      this.setupGetRoutes(table);
      this.setupPostRoute(table);
      this.setupPutRoute(table);
      this.setupDeleteRoute(table);
      // we will write methods that setup
      // put, post and delete routes too later!
    }
    //this.setupRoutes();
  }

  getAllTables() {
    // This query returns a list of all tables
    // in an sqlite database
    // (when writing a comment /*sql*/
    // if you have ES6 String HTML installed
    // as a VSC extension then you will get
    // syntax highlighting of SQL-syntax)
    return this.db
      .select(
        /*sql*/ `
      SELECT 
          name
      FROM 
          sqlite_master 
      WHERE 
          type ='table' AND 
      name NOT LIKE 'sqlite_%';
    `
      )
      .map((x) => x.name);
  }

  setupGetRoutes(table) {
    let rp = this.routePrefix;
    // get all posts
    this.app.get(rp + "/" + table, (req, res) => {
      res.json(this.db.select("SELECT * FROM " + table));
    });
    // get a post by id
    this.app.get(rp + "/" + table + "/:id", (req, res) => {
      let result = this.db.select(
        "SELECT * FROM " + table + " WHERE id = $id",
        // req.params includes the values of params
        // (things written with : before them in the route)
        { id: req.params.id }
      );
      // if a post with the id exists return the post
      if (result.length > 0) {
        res.json(result[0]);
      }
      // else send a 404 (does not exist)
      else {
        res.status(404);
        res.json({ error: 404 });
      }
    });
  }

  setupPostRoute(table) {
    // create a post
    this.app.post(this.routePrefix + "/" + table, (req, res) => {
      res.json(
        this.db.run(
          /*sql*/ `
        INSERT INTO ${table} (${Object.keys(req.body)})
        VALUES (${Object.keys(req.body).map((x) => "$" + x)})
      `,
          req.body
        )
      );
    });
  }

  setupPutRoute(table) {
    // update a post
    this.app.put(this.routePrefix + "/" + table + "/:id", (req, res) => {
      res.json(
        this.db.run(
          /*sql*/ `
        UPDATE ${table}
        SET ${Object.keys(req.body).map((x) => x + "=$" + x)}
        WHERE id = $id 
      `,
          { ...req.body, ...req.params }
        )
      );
    });
  }

  setupDeleteRoute(table) {
    // delete a post
    this.app.delete(this.routePrefix + "/" + table + "/:id", (req, res) => {
      res.json(
        this.db.run(
          /*sql*/ `
        DELETE FROM ${table} WHERE id = $id
      `,
          req.params
        )
      );
    });
  }

  // setupRoutes() {
  //   // Tell express to answer a certain thing
  //   // when someone goes to the url /random-number
  //   this.app.get(this.routePrefix + "/random-number", (request, response) => {
  //     response.json({ aRandomNumber: Math.random() });
  //   });

  //   // Another route (note: request and response as arguments
  //   // are ofthen shortened to req and res)
  //   this.app.get(this.routePrefix + "/now", (req, res) => {
  //     res.json({ now: new Date() });
  //   });

  //   this.app.get(this.routePrefix + "/:start" + "/:end", (req, res) => {
  //     let start = new Date($start);
  //     let end = new Date($end);
  //     let diff = (end - start) / 1000;
  //     if (diff >= 900 && diff < 604800) {
  //       res.json({ allowed: "yes" });
  //     } else {
  //       res.json({ allowed: "no" });
  //     }
  //   });
  // }
};
