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
        return true;
      }
      if (
        method === "PUT" &&
        module.exports.isOwner(db, loggedInId, req.params.id)
      ) {
        return true;
      }
      if (
        method === "DELETE" &&
        module.exports.isOwner(db, loggedInId, req.params.id)
      ) {
        return true;
      }
    }

    if (table === "Invite") {
      if (method === "POST" && user) {
        return true;
      }
      if (method === "PUT") {
        let invite = db.select("SELECT * FROM Invite WHERE id=$id", {
          id: req.params.id,
        });
        console.log("invite", invite);
        if (
          !invite.error &&
          (module.exports.isOwner(db, loggedInId, invite[0].eventId) ||
            invite[0].invitedUser === loggedInId)
        ) {
          return true;
        }
      }
    }

    if (table === "Category") {
      return true;
    }

    if (table == "") {
      console.log("own api", user);
      if (req.params.userId && req.params.userId == loggedInId) {
        return true;
      }

      if (req.params.eventId) {
        /*  let owner = db.select("SELECT userId FROM Event WHERE id = $id", {
          id: req.params.eventId,
        });
        let invitee = db
          .select("SELECT invitedUser FROM Invite WHERE eventId = $id", {
            id: req.params.eventId,
          })
          .filter((i) => i.invitedUser === loggedInId);

        if (owner[0].userId === loggedInId || invitee.length) {
          return true;
        }*/

        if (
          module.exports.isOwner(db, loggedInId, req.params.eventId) ||
          module.exports.isInvitee(db, loggedInId, req.params.eventId)
        ) {
          return true;
        }
      }
    }

    res.status(403);
    res.json({ error: "Not allowed" });
    return false;
  }

  static isOwner = function (db, uId, eId) {
    let owner = db.select("SELECT userId FROM Event WHERE id = $id", {
      id: eId,
    });
    if (owner[0].userId === uId) {
      return true;
    }
    return false;
  };

  static isInvitee = function (db, uId, eId) {
    let invitee = db
      .select("SELECT invitedUser FROM Invite WHERE eventId = $id", {
        id: eId,
      })
      .filter((i) => i.invitedUser === uId);
    if (invitee.length) {
      return true;
    }
    return false;
  };
};
