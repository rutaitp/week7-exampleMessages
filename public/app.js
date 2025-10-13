//load the page
window.addEventListener('load', () => {

  let feed = document.querySelector('#feed');

  //Fetch all the messages from the server
  fetch('/messages')
    .then(response => {
      return response.json()
    })
    .then(data => {
      // console.log(data);
      //Add all the messages from the server to the page
      let messages = data.data;
      // console.log(messages);
      for (let i = 0; i < messages.length; i++) {
        // console.log(messages[i]);
        let message = messages[i].message;
        // console.log(message);
        let newMessage = document.createElement('p');
        newMessage.innerHTML = message;

        //append to the feed
        feed.appendChild(newMessage);
      }
    })
    .catch(error => {
      console.log(error);
    });

  //Listen for a new message input and log it
  let msg = document.querySelector('#msg-input');
  let button = document.querySelector('#msg-submit');

  button.addEventListener('click', () => {
    let msgValue = msg.value;
    console.log(msgValue);

    //Send this message to the
    //1. Create a message object
    let messageObject = {
      message: msgValue
    }
    console.log(messageObject);

    //2. Stringify data
    let messageObjectJSON = JSON.stringify(messageObject);
    console.log(messageObjectJSON);

    //3. Create a POST request
    fetch('/new-message', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: messageObjectJSON
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      //add a new message to the feed as well
      let message = data.message.message;
      let newMessage = document.createElement('p');
      newMessage.innerHTML = message;
      feed.appendChild(newMessage);
    })
    .catch(error => {
      console.log(error);
    });
  })
});
