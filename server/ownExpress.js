/* eslint-disable consistent-return */
const express = require('express');
const Mongo = require('mongodb');
const Monk = require('monk');
// const path = require('path');
const app = express();
// const publicPath = path.join(__dirname, '..', 'public');

const mongodb = Monk('mongodb://game_fam:GameFam321$@gamefam-shard-00-00-qehpm.mongodb.net:27017,gamefam-shard-00-01-qehpm.mongodb.net:27017,gamefam-shard-00-02-qehpm.mongodb.net:27017/gamefam?ssl=true&replicaSet=gamefam-shard-0&authSource=admin');

app.listen(3005, () => {
  console.log('Server listening on port 3005.');
});

app.get('/api/user/:id/lists', (req, res) => {
  const lists = mongodb.get('users');
  lists.find({}).then((users) => {
    res.json(users);
  });
});

module.exports = app;

