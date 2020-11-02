module.exports = class ACL {
  static allowed(table, req, res) {
    let { user } = req.session;
    let { method } = req;

    // Allow all logged in users to see a list of other users
    if (table === "User") {
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

    // Allow everyone to create an event
    if (table === "Event") {
      if (method === "POST") {
        //to do
        return true;
      }
      if (method === "DELETE" && user) {
        //to do
        return true;
      }
    }

    if (table === "Invite") {
      // Allow everyone to create a user
      if (method === "POST") {
        return true;
      }
      if (method === "PUT" && user) {
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

    if (req.params.eventId) {
      //allow event-owner to see the guest list
      let owner = db.select("SELECT userId FROM Event WHERE id = $id", {
        id: req.params.eventId,
      });

      //console.log("owner", owner);

      //also allow invitees to see the guest list
      let invitees = db.select(
        "SELECT invitedUser FROM Invite WHERE eventId = $id",
        { id: req.params.eventId }
      );

      //check if logged-in user is a owner or a invitee, if yes then allow

      let invitee = invitees.filter(
        (invitee) => invitee.invitedUser === user.id
      );

      console.log("invitee", invitee);

      if (user && (owner[0].userId === user.id || invitee.length === 1)) {
        return true;
      }
    }

    if (req.params.userId) {
      if (user && req.params.userId == user.id) {
        return true;
      }
    }

    res.status(403);
    res.json({ error: "Not allowed" });
    return false;
  }
};
