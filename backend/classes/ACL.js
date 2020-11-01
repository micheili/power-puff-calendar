module.exports = class ACL {
  static allowed(table, req, res) {
    let { user } = req.session;
    let { method } = req;

    // Allow all logged in users to see a list of other users
    if (table === "user") {
      // Allow everyone to create a user
      if (method === "POST") {
        return true;
      }

      // Allow all logged in users to see a list of other users
      if (method === "GET" && user) {
        return true;
      }

      // Allow all logged in users to edit their account
      if (method === "PUT" && +req.params.id === user.id) {
        return true;
      }

      // Allow all logged in users to delete their account
      if (method === "DELETE" && +req.params.id === user.id) {
        return true;
      }
    }

    res.status(403);
    res.json({ error: "Not allowed" });
    return false;
  }

  // method for our own rest-apis
  static allowedOwnApi(db, req, res) {
    let { user } = req.session;
    let { method } = req;

    //only allow users that created the event see their own events
    if (req.params.eventId) {
      let result = db.select("SELECT userId FROM Event WHERE id = $id", {
        id: req.params.eventId,
      });

      if (user && result[0].userId == user.id) {
        return true;
      }
    }

    if (req.params.userId) {
      if (user && req.params.userId == user.id) {
        return true;
      }
    }

    //only allow the user that created the event to delete the event

    //only allow the user that created the event to edit it

    //only allow the user that created the event to invite other users

    res.status(403);
    res.json({ error: "Not allowed" });
    return false;
  }
};
