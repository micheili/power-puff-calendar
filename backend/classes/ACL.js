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

    if (table === "event") {
      // Allow everyone to create an event
      if (method === "POST") {
        return true;
      }
    }

    //allow everyone to send invitation
    if (table === "invite") {
      // Allow everyone to invite a user
      if (method === "POST") {
        return true;
      }
    }

    //only allow users that created the event see their own events

    //only allow the user that created the event to delete the event

    //only allow the user that created the event to edit it

    //only allow the user that created the event to invite other users

    //only allow users that have accepted the event to see it in the calendar

    res.status(403);
    res.json({ error: "Not allowed" });
    return false;
  }
};
