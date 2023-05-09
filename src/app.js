const express = require('express');
const app = express();
const User = require('./models/User.js');

app.use(express.json());

app.get('/users', async (request, response) => {
  // response.send(`This is a ${request.method} method`)
  const users = await User.findAll();
  response.send(users);
});

app.post('/users', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.send(user.username);
  } catch (error) {
    next(error);
  }
})

app.get('/users/:username', async (req, res, next) => {
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
app.put("/users/:username", async (req, res, next) => {
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
app.delete("/:username", async (req, res, next) => {
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

module.exports = app;