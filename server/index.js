/* eslint-disable no-unused-vars,no-underscore-dangle */
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Mongo = require('mongodb');
const Monk = require('monk');
const path = require('path');
const http = require('http');

const app = express();
const publicPath = path.join(__dirname, '..', 'public');

const mongodb = Monk('mongodb://game_fam:GameFam321$@gamefam-shard-00-00-qehpm.mongodb.net:27017,gamefam-shard-00-01-qehpm.mongodb.net:27017,gamefam-shard-00-02-qehpm.mongodb.net:27017/gamefam?ssl=true&replicaSet=gamefam-shard-0&authSource=admin');

app.use(logger('dev'));
app.use(express.static(publicPath));
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
  list.users.push(id);

  lists.insert(list).then(() => {
    res.send({ addList: false });
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
    res.send({ editList: false });
  });
});

app.put('/api/list/:id/games/add', (req, res) => {
  const lists = mongodb.get('lists');
  const id = Math.random().toString(36).substr(2, 9);
  const params = req.body;
  const listId = req.params.id;
  const game = params.game;
  const newGames = params.list.games;
  const newGame = {
    id,
    name: game.name,
    price: game.price,
    platform: game.platform,
  };
  newGames.push(newGame);
  lists.update({ _id: listId }, { $set: { games: newGames } }).then(() => {
    res.send(true);
  });
});

app.put('/api/list/:id/games/delete', (req, res) => {
  const lists = mongodb.get('lists');
  const params = req.body;
  const listId = req.params.id;
  const newGames = params.games;

  lists.update({ _id: listId }, { $set: { games: newGames } }).then(() => {
    res.send(true);
  });
});

app.delete('/api/list/:id/delete', (req, res) => {
  const users = mongodb.get('users');
  const lists = mongodb.get('lists');
  const params = req.params;
  const id = params.id;
  const user = req.body;

  lists.remove({ _id: id }, {}).then(() => {
    res.send({ editList: false });
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
  }).catch(error => res.send(error));
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
  }).catch(error => res.send(error));
});

app.get('/api/user/:id', (req, res) => {
  const users = mongodb.get('users');
  const params = req.params;
  const id = params.id;

  users.findOne({ _id: id }, {}).then((user) => {
    res.json(user);
  });
});

app.get('/api/user/', (req, res) => {
  const users = mongodb.get('users');
  users.find({}, {}).then((user) => {
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

app.use((req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

const server = http.createServer(app);
server.listen(3005, () => {
  console.log(`Server listening on port ${server.address().port}`);
});

module.exports = app;

