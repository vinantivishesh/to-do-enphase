import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const list = [
  {
    name: "todo1",
    items: ["todo11", "todo12", "todo13"]
  },
  {
    name: "todo2",
    items: ["todo21", "todo22", "todo23"]
  },
  {
    name: "todo3",
    items: ["todo31", "todo32", "todo33"]
  }
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App list={list}/>
  </React.StrictMode>
);

