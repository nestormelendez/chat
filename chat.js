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

let userActive = {
  id: "1",
  userName: "Nestor",
  email: "Nestor",
  password: "Nestor0208",
  photo: "./assets/nestor.jpg",
};

let pageLogin = document.getElementById("page-login");
let pageChat = document.getElementById("page-chat");
let btnSignUp = document.getElementById("btn-sign-up");
let password = document.getElementById("password-input");
let email = document.getElementById("user-input");
let chatContactsContainer = document.getElementById("chat-contacts-container");

document.addEventListener("click", (e) => {
  if (e.target.matches(".user-out")) {
    pageChat.classList.toggle("disguise");
    pageLogin.classList.toggle("disguise");
  }

  if (e.target.matches(".btn-sign-up")) {
    if (email.value === "") {
      alert("el campo usuario es obligatorio");
      return false;
    } else if (password.value === "") {
      alert("el campo contraseña es obligatorio");
      return false;
    }
    pageChat.classList.toggle("disguise");
    pageLogin.classList.toggle("disguise");
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

    messages.push({
      id: messages.length ? messages[messages.length - 1].id + 1 : 1,
      message: chatInput,
      sender: userActive.userName,
      receiver: receiver.userName,
    });

    const userToSend = JSON.stringify(messages);

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

// console.log(chatActive)
// localStorage.setItem(chatInput)
