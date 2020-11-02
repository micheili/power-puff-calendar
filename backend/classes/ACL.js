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

    // Allow everyone to create an event
      if (table === "event") {
        if (method === "POST") {
          //to do 
          return true;
        }
      
      }

      if (table === "invite") {
        // Allow everyone to create a user
        if (method === "POST") {

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

    if (method === "GET" && req.params.eventId) {
      //allow event-owner to see the guest list
      let owner = db.select("SELECT userId FROM Event WHERE id = $id", {
        id: req.params.eventId,
      });

      //also allow invitees to see the guest list
      let invitees = db.select(
        "SELECT invitedUser FROM Invite WHERE eventId = $id",
        { id: req.params.eventId }
      );

      //check if logged-in user is a owner or a invitee, if yes then allow
      if (user) {
        console.log(user);
        let invitee = invitees.filter(
          (invitee) => invitee.invitedUser === user.id
        );

        console.log("invitee", invitee);
        console.log('owner', owner)

        if (owner[0].userId === user.id || invitee.length === 1) {
          return true;
        }
      }
    }

    if (method === 'GET' && req.params.userId) {
      if (user && req.params.userId == user.id) {
        return true;
      }
    }

    //only allow the user that created the event to delete the event
    if (method === 'DELETE'){
      let owner = db.select("SELECT userId FROM Event WHERE id = $id", {
        id: req.params.eventId,
      });
   
      if (user && owner[0].userId === user.id ) {
        return true;
      }
    }
    
    console.log('owner', owner)
    //only allow the user that created the event to edit it

   
    res.status(403);
    res.json({ error: "Not allowed" });
    return false;
  }
};
