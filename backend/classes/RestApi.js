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
      res.json(
        this.db
          .select("SELECT * FROM " + table)
          .map((x) => ({ ...x, password: undefined }))
      );
    });
    // get a post by id
    this.app.get(rp + "/" + table + "/:id", (req, res) => {
      let result = this.db
        .select(
          "SELECT * FROM " + table + " WHERE id = $id",
          // req.params includes the values of params
          // (things written with : before them in the route)
          { id: req.params.id }
        )
        .map((x) => ({ ...x, password: undefined }));
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

    //get events created by (logged-in) userId

    this.app.get(rp + "/myEvents/:userId", (req, res) => {
      let result = this.db.select(
        /*sql*/ `
      SELECT * FROM Event 
      WHERE userId = $userId
      `,
        req.params
      );
      if (result.length > 0) {
        res.json(result);
      } else {
        res.status(404);
        res.json({ error: 404 });
      }
    });

    //get events which i am invited for
    this.app.get(rp + "/invitedEvents/:userId", (req, res) => {
      let result = this.db.select(
        /*sql*/ `
      SELECT e.* FROM Event e
      INNER JOIN Invite i ON e.id = i.eventId 
      WHERE i.invitedUser = $userId AND accepted = true
      `,
        req.params
      );
      if (result.length > 0) {
        res.json(result);
      } else {
        res.status(404);
        res.json({ error: 404 });
      }
    });

    this.app.get(rp + "/pendingEvents/:userId", (req, res) => {
      let result = this.db.select(
        /*sql*/ `
      SELECT e.* FROM Event e
      INNER JOIN Invite i ON e.id = i.eventId 
      WHERE i.invitedUser = $userId AND accepted IS NULL
      `,
        req.params
      );
      if (result.length > 0) {
        res.json(result);
      } else {
        res.status(404);
        res.json({ error: 404 });
      }
    });

    //get all invited users by event id
    this.app.get(rp + "/invitedUsers/:eventId", (req, res) => {
      let result = this.db
        .select(
          /*sql*/ `
      SELECT u.* FROM User u
      INNER JOIN Invite i ON u.id = i.invitedUser
      WHERE i.eventId = $eventId
      `,
          req.params
        )
        .map((x) => ({ ...x, password: undefined }));
      if (result.length > 0) {
        res.json(result);
      } else {
        res.status(404);
        res.json({ error: 404 });
      }
    });
  }

  setupPostRoute(table) {
    // create a post

    this.app.post(this.routePrefix + "/" + table, (req, res) => {
      // if the Table name is  "Event", then check for the start and stop time,
      // check if the time duration is min 15 minutes (900 sec) and max 7 days (604800 sec)
      // otherwise forbidden to post
      if (table === "Event") {
        let start = Date.parse(req.body.start);
        let stop = Date.parse(req.body.stop);

        let diff = (stop - start) / 1000;
        console.log("start: ", start, " stop: ", stop, " diff: ", diff);
        if (diff >= 900 && diff < 604800) {
          res.json(
            this.db.run(
              /*sql*/ `
          INSERT INTO ${table} (${Object.keys(req.body)})
          VALUES (${Object.keys(req.body).map((x) => "$" + x)})
        `,
              req.body
            )
          );
        } else {
          res.status(403);
          res.json({ error: 403 });
        }
      } else {
        res.json(
          this.db.run(
            /* sql*/ `
        INSERT INTO ${table} (${Object.keys(req.body)})
        VALUES (${Object.keys(req.body).map((x) => "$" + x)})
      `,
            req.body
          )
        );
      }
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
};
