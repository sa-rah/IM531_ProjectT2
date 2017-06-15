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
  const lists = mongodb.get('lists');
  const params = req.params;
  const id = params.id;

  lists.find({ users: id }).then((userLists) => {
    res.send(userLists);
  });
});

app.put('/api/user/:id/list/add', (req, res) => {
  const users = mongodb.get('users');
  const lists = mongodb.get('lists');
  const params = req.body;
  const id = params.user.id;
  const list = params.list;
  const user = params.user;
  list.users.push(id);

  lists.insert(list).then((newList) => {
    user.lists.push(JSON.stringify(newList._id));
    users.update({ _id: id }, { $set: { lists: user.lists } }).then(() => {
      res.send({ addList: false });
    });
  });
});

app.put('/api/list/:id/edit', (req, res) => {
  const lists = mongodb.get('lists');
  const users = mongodb.get('users');
  const params = req.params;
  const id = params.id;
  const data = req.body.list;
  const user = req.body.user;

  lists.update({ _id: id }, { $set: data }).then(() => {
    users.find({ _id: user.id }, {}).then((foundUser) => {
      res.send({ editList: false });
    });
  });
});

app.delete('/api/list/:id/delete', (req, res) => {
  const users = mongodb.get('users');
  const lists = mongodb.get('lists');
  const params = req.params;
  const id = params.id;
  const user = req.body;

  users.update({ lists: id }, { $set: { 'lists.$': '' } }, { multi: true }).then(() => {
    lists.remove({ _id: id }, {}).then(() => {
      users.find({ _id: user.id }, {}).then((foundUser) => {
        res.send({ editList: false });
      });
    });
  });
});

app.post('/api/user/login', (req, res) => {
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
        lists: user.lists,
      };
      res.send(obj);
    }
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
      lists: user.lists,
    };
    res.send(obj);
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

app.get('/api/lists/:id', (req, res) => {
  const lists = mongodb.get('lists');
  const params = req.params;
  const id = params.id;

  lists.find({ _id: id }).then((list) => {
    res.send(list);
  });
});

app.listen(3005, () => {
  console.log('Server listening on port 3005.');
});

module.exports = app;

