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

let localStorage = window.localStorage;

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
    chatActive.innerHTML += `\n <div class="messageSend"><blockquote>${userActive.userName}</blockquote> \n <span>${chatInput} <span></div>`;
    document.getElementById(`input-chat-contact-${position}`).value = "";
    chatActive.scrollTop = `9999`;
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
});

// console.log(chatActive)
// localStorage.setItem(chatInput)
