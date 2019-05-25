const db = require('./dbConfig.js');

module.exports = {
  find,
  add,
  remove,
}

function find() {
  return db('names');
}

function add(name) {
  return db('names').insert(name);
}

function remove(id) {
  return db('names').where('id', id).del();
}