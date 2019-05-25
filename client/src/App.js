import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [names, setNames] = useState([]);
  const [edit, setEdit] = useState(false);
  const nameRef = useRef();

  useEffect(() => {
    getNames();
  }, []);

  function randomize() {
    const temp = [...names]
    setNames(temp.sort(() => Math.random() - 0.5))
  }

  function copyNames() {
    let list = names.map(el => el.name);
    navigator.clipboard.writeText(list.join(', '));
  }


  function getNames() {
    axios.get('http://localhost:5000/names')
      .then(res => {
        const names = res.data
        setNames(names);
      })
      .catch(err => {
        console.log(err);
      })
  }

  function remove(id) {
    axios.delete(`http://localhost:5000/names/${id}`)
      .then(res => {
        setNames(names.filter(name => name.id !== id))
      })
      .catch(err => {
        console.log(err);
      })
  }

  function handleSubmit(event) {
    event.preventDefault();
    const name = {
      name: nameRef.current.value
    }
    axios.post('http://localhost:5000/names', name)
      .then(res => {
        getNames();
      })
      .catch(err => {
        console.log(err);
      })
    nameRef.current.value = ''
  }

  return (
    <div className="App">
      <button className="control" onClick={randomize}>Randomize</button> 
      {names.map(el => 
        <div className="name" key={el.id}>
          <p>{el.name}</p>
          {edit && <button onClick={() => remove(el.id)}>X</button>}
        </div>
      )}
      {edit && <form onSubmit={handleSubmit}>
        <input ref={nameRef} />
        <button className="control">Submit</button>
      </form>}
      {!edit && <button className="control" onClick={copyNames}>Copy</button>}
      <button className="control" onClick={() => setEdit(!edit)}>{edit ? "Done" : "Edit"}</button>
    </div>
  );
}

export default App;
