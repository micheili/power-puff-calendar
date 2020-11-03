module.exports = class ACL {
  static allowed(table, req, res, db) {
    let { user } = req.session;
    let { method } = req;
    let loggedInId = user.id;

    // Allow all logged in users to see a list of other users
    if (table === "User") {
      // Allow everyone to create a user
      if (method === "POST") {
        return true;
      }

      // Allow all logged in users to see a list of other users
      if (method === "GET" && user) {
        console.log("user get", user);
        return true;
      }

      // Allow all logged in users to edit their account
      if (method === "PUT" && +req.params.id === loggedInId) {
        return true;
      }

      // Allow all logged in users to delete their account
      if (method === "DELETE" && +req.params.id === loggedInId) {
        return true;
      }
    }

    // Allow everyone to create an event
    if (table === "Event") {
      if (method === "POST") {
        //console.log("event post", loggedInId);

        //to do
        return true;
      }
      if (method === "PUT") {
        //console.log("event put", loggedInId);

        //to do
        return true;
      }
      if (method === "DELETE") {
        //console.log("event delete", loggedInId);

        //to do
        return true;
      }
    }

    if (table === "Invite") {
      // Allow everyone to create a user
      if (method === "POST") {
        //console.log("invite post", loggedInId);

        return true;
      }
      if (method === "PUT") {
        //console.log("invite put", loggedInId);

        return true;
      }
    }

    if (table == "") {
      console.log("own api", user);
      if (req.params.userId && req.params.userId == loggedInId) {
        return true;
      }

      if (req.params.eventId) {
        let owner = db.select("SELECT userId FROM Event WHERE id = $id", {
          id: req.params.eventId,
        });
        let invitee = db
          .select("SELECT invitedUser FROM Invite WHERE eventId = $id", {
            id: req.params.eventId,
          })
          .filter((i) => i.invitedUser === loggedInId);

        if (owner[0].userId === loggedInId || invitee.length) {
          return true;
        }
      }
    }

    res.status(403);
    res.json({ error: "Not allowed" });
    return false;
  }
};
