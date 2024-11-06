const inputUsername = document.getElementById("inputUsername");
const inputPassword = document.getElementById("inputPassword");
const inputEmail = document.getElementById("inputEmail"); 
const btSignUp = document.getElementById("btSignUp");
const btLogin = document.getElementById("btLogin");
const btLogout = document.getElementById("btLogout");
const h1IndexTitle = document.getElementById("h1IndexTitle");

const baseURL = "https://parseapi.back4app.com";
const usersURL = `${baseURL}/users`;
const loginURL = `${baseURL}/login`;
const logoutURL = `${baseURL}/logout`;
const headers = {
  "X-Parse-Application-Id": "oMVkG3lK6L2DFEkZlxSzDDbDJ3nUYZ6k1hGIYjMP",
  "X-Parse-REST-API-Key": "0UFWwez04u5Ywpl8l5rYbl484skM44NBwjBHFKF3",
};
const headersRevSession = {
  ...headers,
  "X-Parse-Revocable-Session": "1",
};
const headersJson = {
  ...headersRevSession,
  "Content-Type": "application/json",
};

const handleBtSignUpClick = async () => {
  const username = inputUsername.value.trim();
  if (!username) {
    alert("Preencha o nome do usuário!");
    inputUsername.focus();
    return;
  }

  const password = inputPassword.value.trim();
  if (!password) {
    alert("Preencha a senha!");
    inputPassword.focus();
    return;
  }

  const email = inputEmail.value.trim();
  if (!email) {
    alert("Preencha o e-mail!");
    inputEmail.focus();
    return;
  }

  const response = await fetch(usersURL, {
    method: "POST",
    headers: headersJson,
    body: JSON.stringify({ username, password, email }),
  });
  const data = await response.json();
  console.log("user:", data);
};

const handleBtLoginClick = async () => {
  const username = inputUsername.value.trim();
  if (!username) {
    alert("Preencha o nome do usuário!");
    inputUsername.focus();
    return;
  }

  const password = inputPassword.value.trim();
  if (!password) {
    alert("Preencha a senha!");
    inputPassword.focus();
    return;
  }

  const response = await fetch(loginURL, {
    method: "POST",
    headers: headersRevSession,
    body: new URLSearchParams({
      username,
      password,
    }),
  });
  console.log("response", response);
  const data = await response.json();
  if (!response.ok) {
    alert(`Code: ${data.code} - error: ${data.error}`);
    return;
  }
  console.log("data:", data);
  localStorage.user = JSON.stringify(data);
  const searchParams = new URLSearchParams(location.search);
  if (searchParams.has("url")) {
    location.replace(searchParams.get("url"));
  } else {
    history.back();
  }
};

const handleBtLogoutClick = async () => {
  const userJson = localStorage.user;
  if (userJson) {
    const user = JSON.parse(userJson);
    const response = await fetch(logoutURL, {
      method: "POST",
      headers: {
        ...headers,
        "X-Parse-Session-Token": user.sessionToken,
      },
    });
    console.log("response", response);
    const data = await response.json();
    if (!response.ok) {
      alert(`Code: ${data.code} - error: ${data.error}`);
      return;
    }
    console.log("data:", data);
    delete localStorage.user;
    history.back();
  }
};

// ================= Events ==========================

if (btSignUp) {
  btSignUp.onclick = handleBtSignUpClick;
}

if (btLogin) {
  btLogin.onclick = handleBtLoginClick;
}

if (btLogout) {
  btLogout.onclick = handleBtLogoutClick;
}

if (h1IndexTitle) {
  window.onload = async () => {
    await verificacao()
    const userJson = localStorage.user;
    if (userJson) {
      const user = JSON.parse(userJson);
      h1IndexTitle.innerHTML = `Back4App User (${user.username})`;
      if (btLogout) {
        btLogout.disabled = false;
      }
    }
  };
}

// Nova verificação

async function verificacao() {
  const response = await fetch("https://parseapi.back4app.com/users/me",
    {
    method : "GET",
    headers : {
      "X-Parse-Application-Id": "oMVkG3lK6L2DFEkZlxSzDDbDJ3nUYZ6k1hGIYjMP",
      "X-Parse-REST-API-Key": "0UFWwez04u5Ywpl8l5rYbl484skM44NBwjBHFKF3",
      "X-Parse-Session-Token" : localStorage.getItem("user"),
    } 
  } 
)  
  const data = await response.json()
  console.log(data)  
  if(data.code === 209){
    window.location.href = "https://exercicio-programacao-web-ck1p.vercel.app/ex11/login.html"
  }
}
