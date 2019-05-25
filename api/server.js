const express = require('express');
const cors = require('cors');

const Names = require('../data/names-model.js');

const server = express();

server.use(express.json());
server.use(cors());

server.get('/names', async (req, res) => {
  try {
    const names = await Names.find();
    res.status(201).json(names);
  } catch(e) {
    res.status(500).json({error: "Something went wrong with the server."});
  }
});

server.post('/names', async (req, res) => {
  const name = req.body;

  try {
    const names = await Names.add(name);
    res.status(201).json(names);
  } catch(e) {
    res.status(500).json({error: "Something went wrong with the server."})
  }
})

server.delete('/names/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Names.remove(id);
    res.status(201).json({message: "Name deleted."})
  } catch(e) {
    res.status(500).json({error: "Something went wrong with the server."})
  }
})

module.exports = server;