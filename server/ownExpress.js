/* eslint-disable no-unused-vars,no-underscore-dangle */
const express = require('express');
const bodyParser = require('body-parser');
const Mongo = require('mongodb');
const Monk = require('monk');
// const path = require('path');
const app = express();
// const publicPath = path.join(__dirname, '..', 'public');

const mongodb = Monk('mongodb://game_fam:GameFam321$@gamefam-shard-00-00-qehpm.mongodb.net:27017,gamefam-shard-00-01-qehpm.mongodb.net:27017,gamefam-shard-00-02-qehpm.mongodb.net:27017/gamefam?ssl=true&replicaSet=gamefam-shard-0&authSource=admin');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/user/:id/lists', (req, res) => {
  const users = mongodb.get('users');
  const params = req.params;
  const id = params.id;

  users.findOne({ _id: id }, {}).then((user) => {
    res.json(user.lists);
  });
});

app.get('/api/user/:id/list/:list/games', (req, res) => {
  const users = mongodb.get('users');
  const params = req.params;
  const id = params.id;
  const list = params.list;

  users.findOne({ _id: id }, {}).then((user) => {
    const lists = user.lists;
    const gameList = lists.find(item => item.id === list);
    res.json(gameList.games);
  });
});

app.put('/api/user/:id/list/add', (req, res) => {
  const users = mongodb.get('users');
  const params = req.body;
  const id = params.user.id;
  const userUpdate = params.list.users;
  const updateList = params.lists;
  users.update({ _id: id }, { $set: { lists: updateList } }).then(() => {
    res.send(false);
  });
});

app.put('/api/user/:id/list/:list/edit', (req, res) => {

});

app.delete('/api/user/:id/list/:list/delete', (req, res) => {

});

app.post('/api/user/:id/list/:list/games/add', (req, res) => {
});

app.delete('/api/user/:id/list/:list/games/delete', (req, res) => {
});

app.post('/api/login', (req, res) => {
  const users = mongodb.get('users');
  const params = req.body;
  const mail = params.mail;
  const pw = params.pw;

  let loggedIn = false;
  users.findOne({ mail }, {}).then((user) => {
    if (user.pw === pw) {
      loggedIn = true;
      const obj = {
        login: loggedIn,
        id: user._id,
        mail: user.mail,
        name: user.name,
      };
      res.send(obj);
    }
  });
});

app.get('/api/user/:id', (req, res) => {
  const users = mongodb.get('users');
  const params = req.params;
  const id = params.id;

  users.findOne({ _id: id }, {}).then((user) => {
    res.json(user);
  });
});

app.post('/api/user/add', (req, res) => {
  const users = mongodb.get('users');
  const params = req.body;

  users.insert(params).then((user) => {
    const obj = {
      login: true,
      register: false,
      mail: user.mail,
      name: user.name,
      id: user._id,
    };
    res.send(obj);
  });
});

app.listen(3005, () => {
  console.log('Server listening on port 3005.');
});

module.exports = app;

