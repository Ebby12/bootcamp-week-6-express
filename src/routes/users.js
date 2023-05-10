const express = require('express');
const router = express.Router();

const User = require('../models/User.js');

router.get('/', async (request, response) => {
  // response.send(`This is a ${request.method} method`)
  const users = await User.findAll();
  response.send(users);
});

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.send(user.username);
  } catch (error) {
    next(error);
  }
})

router.get('/:username', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {username: req.params.username}
    })
    res.send(user);
  } catch (error) {
    next(error);
  }
})

// PUT request that uses req.params.username to find a user, and req.body to update the user with whatever data is in there. sendStatus returns a successful Status Code of 200 if updated successfully
router.put("/:username", async (req, res, next) => {
  try {
    const updated = await User.update(req.body, {
      where: { username: req.params.username },
    });
    console.log(updated);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

// DELETE request that uses req.params.username to find a user and delete them. sendStatus returns a successful Status Code of 200 if deleted successfully
router.delete("/:username", async (req, res, next) => {
  try {
    const deleted = await User.destroy({
      where: { username: req.params.username },
    });
    if (deleted === 0) {
      throw new Error("No user deleted");
    }
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;