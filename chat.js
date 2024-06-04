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
let perfilUser = document.getElementById("perfil-user");

let btnSignUp = document.getElementById("btn-sign-up");

let btnNewChat = document.getElementById("btn-new-chat");

let bubbleContainer = document.getElementById("bubble-container");

let password = document.getElementById("password-input");
let email = document.getElementById("user-input");

let chatContactsContainer = document.getElementById("chat-contacts-container");

const channel = new BroadcastChannel("chat");

document.addEventListener("click", (e) => {
  if (e.target.matches(".user-out")) {
    pageLogin.classList.toggle("disguise");

    pageChat.classList.toggle("disguise");
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
  </header>`;

      for (let index = 0; index < user.length; index++) {
        const element = user[index];

        if (element.userName !== userActive.userName)
          bubbleContainer.innerHTML += `
        <div id="bubble-${index}" class="bubble-contact">

                        <div id="conectado-${index}"> </div>

                        <img class="bubble-contact" data-bubble="${index}" src="${element.photo}" alt="${element.userName}">

                        <span id="notification-${index}"> </span>



                    </div>`;
      }

      let newMessage = {
        conect: userActive.userName,
      };

      channel.postMessage(JSON.stringify(newMessage));

      pageLogin.classList.toggle("disguise");

      pageChat.classList.toggle("disguise");
    }
  }

  if (e.target.matches(".--btn-chat-send-contacts")) {
    let position = e.target.dataset.index;
    let chatActive = document.getElementById(`chat-${position}`);
    let chatInput = document.getElementById(
      `input-chat-contact-${position}`
    ).value;
    let receiver = user[position];

    const userStorage = localStorage.getItem(userActive.userName);

    let messages = [];
    if (userStorage) {
      messages = JSON.parse(userStorage);
    }

    console.log(messages);

    let newMessage = {
      id: messages.length ? messages[messages.length - 1].id + 1 : 1,
      message: chatInput,
      sender: userActive.userName,
      receiver: receiver.userName,
      position: position,
    };

    messages.push(newMessage);

    channel.postMessage(JSON.stringify(newMessage));

    const menssageSave = JSON.stringify(messages);
    localStorage.setItem(userActive.userName, menssageSave);

    let createChat = "";
    console.log(messages);
    for (let index = 0; index < messages.length; index++) {
      const element = messages[index];
      if (element.sender == userActive.userName) {
        createChat += `<br> <div class="messageSend"><blockquote>${element.sender}</blockquote> <br> <span>${element.message} <span></div>`;
      } else {
        createChat += `<br> <div class="messageReceived"><blockquote>${element.sender}</blockquote> <br> <span>${element.message} <span></div>`;
      }
    }

    let chatContactsContainer = document.getElementById(`chat-${position}`);
    chatContactsContainer.innerHTML = `${createChat}`;

    document.getElementById(`input-chat-contact-${position}`).value = "";
    chatActive.scrollTop = `999999`;
  }

  if (e.target.matches(".--btn-new-chat")) {
    let container = document.getElementById("bubble-container");
    container.classList.toggle("bubble-chat-active");
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
    console.log(messages);
    for (let index = 0; index < messages.length; index++) {
      const element = messages[index];
      if (element.sender == userActive.userName) {
        createChat += `<br> <div class="messageSend"><blockquote>${element.sender}</blockquote> <br> <span>${element.message} <span></div>`;
      } else {
        createChat += `<br> <div class="messageReceived"><blockquote>${element.sender}</blockquote> <br> <span>${element.message} <span></div>`;
      }
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
    chatActive.scrollTop = `999999`;
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
  if (receivedMessage.receiver === userActive.userName) {
    let lugar = user.findIndex((u) => u.userName === receivedMessage.sender);
    let chatActive = document.getElementById(`chat-${lugar}`);
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
    const menssageSave = JSON.stringify(messages);
    localStorage.setItem(userActive.userName, menssageSave);

    if (chatActive) {
      let createChat = `<br> <div class="messageReceived"><blockquote>${receivedMessage.sender}</blockquote> <br> <span>${receivedMessage.message} <span></div>`;
      chatActive.innerHTML += createChat;
      chatActive.scrollTop = `999999`;
    } else {
      let notificationContent = document.getElementById(`notification-${lugar}`);
      let notification = `✉️`;
      notificationContent.innerText = notification;
    }
  }

  if (receivedMessage.conect !== userActive.userName) {
    for (let index = 0; index < user.length; index++) {
      const element = user[index];
      if (element.userName == receivedMessage.conect) {
      
        let userConectado = document.getElementById(`conectado-${element.id - 1}`);

        userConectado.classList.add("contectado")
      }
    }
  }
});

function verifyEmail(user, email) {
  for (const usuario of user) {
    if (usuario.email === email) {
      userActive = usuario;
    }
  }
}
