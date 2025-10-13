//Data
let messages = [
  {
    message: "This is the first message"
  },
  {
    message: "This is the second message"
  }
];

//Set up a server
// let express = require('express');
import express from 'express';
let app = express();

//Serve a public folder
app.use(express.static('public'));
app.use(express.json()); //parse the data

//Install LowDB
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

//Connect to the db
const defaultData = { messages: [] };
const adapter = new JSONFile('db.json');
const db = new Low(adapter, defaultData);
// console.log(db.data);

//Add values to db
//Fetch from the db

//Start a server
let port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on localhost: ${port}`);
});

//ROUTES
app.get('/messages', (request, response) => {
  //Send data as an object
  // let messagesData = {
  //   data: messages
  // }

  // response.json(messagesData);

  //get data from the db
  db.read()
    .then(() => {
      let messagesData = {
        data: db.data.messages
      };

      response.json(messagesData);
    })
});

app.post('/new-message', (request, response) => {
  // console.log(request.body);
  let messageData = request.body;
  //push to the messages array
  // messages.push(messageData);
  // console.log(messages);

  //Send the message back to the client
  let messageObject = {
    task: "success",
    message: messageData
  }
  //push to the db using lowdb
  db.data.messages.push(messageData);
  db.write() //save to the db
    .then(() => {
      response.json(messageObject);
    })
});
