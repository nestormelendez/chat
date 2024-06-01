let user = [
  {
    id: "1",
    userName: "Nestor",
    email: "Nestor",
    password: "Nestor0208",
    photo: "./assets/nestor.jpg",
  },
  {
    id: "2",
    userName: "Leonardo",
    email: "Leonardo",
    password: "Leonardo0202",
    photo: "./assets/leonardo.jpg",
  },
  {
    id: "3",
    userName: "Leonel",
    email: "Leonel",
    password: "Leonel3011",
    photo: "./assets/leonel.jpg",
  },
  {
    id: "4",
    userName: "Luimary",
    email: "Luimary",
    password: "Luimary0111",
    photo: "./assets/luimary.jpg",
  },
  {
    id: "5",
    userName: "Lismary",
    email: "Lismary",
    password: "Lismary0609",
    photo: "./assets/lismary.jpg",
  },
];

let userActive = {};

let pageLogin = document.getElementById("page-login");
let pageChat = document.getElementById("page-chat");
let btnNewChat = document.getElementById("btn-new-chat");
let bubbleContainer = document.getElementById("bubble-container");
let perfilUser = document.getElementById("perfil-user");



let btnSignUp = document.getElementById("btn-sign-up");
let password = document.getElementById("password-input");
let email = document.getElementById("user-input");
let chatContactsContainer = document.getElementById("chat-contacts-container");
const channel = new BroadcastChannel("chat");



document.addEventListener("click", (e) => {
  if (e.target.matches(".user-out")) {
    pageChat.classList.toggle("disguise");
    // pageLogin.classList.toggle("disguise");
    // btnNewChat.classList.toggle("disguise");

  }

  if (e.target.matches(".btn-sign-up")) {
    if (email.value === "") {
      alert("el campo usuario es obligatorio");
      return false;
    } else if (password.value === "") {
      alert("el campo contraseña es obligatorio");
      return false;
    }

    userActive = {};

    verifyEmail(user, email.value);

    if (!userActive.email) {
      alert("Disculpe el usuario no se encuentra registrado");
      return;
    }

    if (userActive.password == password.value) {

      perfilUser.innerHTML = `<header class="perfil-user">
      <div class="user-header-contact">
          <img class="image-user-active" src="${userActive.photo}" alt="${userActive.userName}">
          <span class="name-contact">${userActive.userName}</span>
      </div>
      <button class="btn user-out --btn-options">x</button>
  </header>`



      for (let index = 0; index < user.length; index++) {
        const element = user[index];
        bubbleContainer.innerHTML += `
        <div id="bubble-${index}" class="bubble-contact">
                        <img class="bubble-contact" data-bubble="${index}" src="${element.photo}" alt="${element.userName}">
                    </div>
        `

      }



      pageLogin.classList.toggle("disguise");
      // pageChat.classList.toggle("disguise");
      // btnNewChat.classList.toggle("disguise");

      
    }
  }

  if (e.target.matches(".--btn-new-chat")) {
    let container = document.getElementById("bubble-container");
    container.classList.toggle("bubble-chat-active");
  }

  if (e.target.matches(".--btn-chat-send-contacts")) {
    let position = e.target.dataset.index;
    let chatActive = document.getElementById(`chat-${position}`);
    let chatInput = document.getElementById(
      `input-chat-contact-${position}`
    ).value;
    let receiver = user[position];
    chatActive.innerHTML += `\n <div class="messageSend"><blockquote>${userActive.userName}</blockquote> \n <span>${chatInput} <span></div>`;

    const userStorage = localStorage.getItem(userActive.userName);

    let messages = [];
    if (userStorage) {
      messages = JSON.parse(userStorage);
    }
    console.log(chatInput, receiver.userName, position);
    let newMessage = {
      id: messages.length ? messages[messages.length - 1].id + 1 : 1,
      message: chatInput,
      sender: userActive.userName,
      receiver: receiver.userName,
      position: position,
    }
    messages.push(newMessage);
    console.log(messages);

    channel.postMessage(JSON.stringify(newMessage));

    const userToSend = JSON.stringify(messages);
    console.log(userToSend);
    localStorage.setItem(userActive.userName, userToSend);

    document.getElementById(`input-chat-contact-${position}`).value = "";
    chatActive.scrollTop = `9999`;
  }

  if (e.target.matches(".bubble-contact")) {
    let position = e.target.dataset.bubble;
    let receiver = user[position];

    const userStorage = localStorage.getItem(userActive.userName);

    let messages = [];
    if (userStorage) {
      messages = JSON.parse(userStorage);
    }
    let createChat = "";
    let chatWithReceiver = [];

    for (let index = 0; index < messages.length; index++) {
      const element = messages[index];
      if (element.receiver == receiver.userName) {
        chatWithReceiver.push(element);
      }
    }

    for (let index = 0; index < chatWithReceiver.length; index++) {
      const element = chatWithReceiver[index];
      createChat += `\n <div class="messageSend"><blockquote>${element.sender}</blockquote> \n <span>${element.message} <span></div>`;
    }

    let chatContactsContainer = document.getElementById(
      "chat-contacts-container"
    );
    chatContactsContainer.innerHTML += `<div id="chat-content-contact-${position}" class="chat-content-active">
    <header data-index="${position}" class="content-header-footer">
        <div class="user-header-contact">
            <img class="image-contact" src="${receiver.photo}" alt="${receiver.userName}">
            <span class="name-contact">${receiver.userName}</span>
        </div>
        <button data-index="${position}" id="btn-chat-down-contact-${position}"
            class="btn btn-chat-down-contacts --btn-arrow">↕️</button>
        <button data-index="${position}" class="btn --btn-delete">x</button>
    </header>
    <div id="chat-${position}" class="is-active no-active">${createChat}</div>
    <footer data-index="${position}" class="content-header-footer">
        <input data-index="${position}" id="input-chat-contact-${position}" class="input input-chat-contacts"
            type="text" placeholder="Chat con ${receiver.userName}">
        <button data-index="${position}" id="btn-chat-send-contact-${position}"
            class="btn --btn-chat-send-contacts">✉️</button>
    </footer>
</div>`;
  }

  if (e.target.matches(".btn-chat-down-contacts")) {
    let position = e.target.dataset.index;
    let chatInput = document.getElementById(
      `input-chat-contact-${position}`
    ).value;
    let chatActive = document.getElementById(`chat-${position}`);
    chatActive.classList.toggle("no-active");
    chatInput = "";
  }

  if (e.target.matches(".--btn-delete")) {
    let element = e.target.dataset.index;
    let elementRemove = document.getElementById(
      `chat-content-contact-${element}`
    );
    elementRemove.parentNode.removeChild(elementRemove);
  }
});

channel.addEventListener("message", (event) => {
  const receivedMessage = JSON.parse(event.data);
  console.log("receivedMessage", receivedMessage)
  if (receivedMessage) {

    let lugar  = user.findIndex(u => u.userName === receivedMessage.sender);
    let chatActive = document.getElementById(`chat-${lugar}`);
    console.log(chatActive, lugar, receivedMessage);
    
    chatActive.innerHTML += `<br> <div class="messageReceived"><blockquote>${receivedMessage.receiver}</blockquote> <br> <span>${receivedMessage.message} <span></div>`;

    const userStorage = localStorage.getItem(userActive.userName);

    let messages = [];
    if (userStorage) {
      messages = JSON.parse(userStorage);
    }

    messages.push({
      id: messages.length ? messages[messages.length - 1].id + 1 : 1,
      message: receivedMessage.message,
      sender: receivedMessage.sender,
      receiver: receivedMessage.receiver,
      position: lugar,
    });

    const userToSend = JSON.stringify(messages);

    localStorage.setItem(userActive.userName, userToSend);
  }
});


function verifyEmail(user, email) {
  for (const usuario of user) {
    if (usuario.email === email) {
      userActive = usuario;
    }
  }
}

// console.log(chatActive)
// localStorage.setItem(chatInput)
