const express = require('express');
const router  = express.Router();

module.exports = () => {
  router.get("/register", (req, res) => {
    const session = req.session["user_id"];
    let tempVars = {
      session
    };
    res.render('register', tempVars);

  });
  return router;
};
