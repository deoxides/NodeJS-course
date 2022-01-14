function handleCredentialResponse(response) {
  const body = { id_token: response.credential };
  fetch("http://localhost:8080/auth/google", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((res) => {
         console.log(res)
        localStorage.setItem('email',res.googleUser.email)
    })
    .catch((err) => console.warn);

  const logoutButton = document.getElementById("logout");
  logoutButton.onclick = () =>{
      google.accounts.id.disableAutoSelect();
      google.accounts.id.revoke(localStorage.getItem('email'),done => {
          localStorage.clear();
          location.reload();
      });
  }
}

function login(e) {
  e.preventDefault();
  const data = new FormData(e.target);
  console.log(data);
}

function startApp() {
    const size = window.innerWidth;
    let button;
    const pillButton = {
    theme: "outline",
    shape: "pill",
    locale: "en",
    width: "300px",
  };
    const iconButton = {
    theme: "outline",
    type: "icon",
    shape: "circle",
    width:'50px'
  };
  if(size>=769 && size<860){
    button = iconButton
  }else if(size <769 || size >= 1160){
    button = pillButton;
  }
  else if(size>=860 && size <1160){
      button = pillButton;
      button.width = '200px'
  }
  console.log(button)
  google.accounts.id.initialize({
    client_id: "182365430926-86qies9agmltg7rfle1fm9tvg7e2l8l9.apps.googleusercontent.com",
    callback: handleCredentialResponse,
  });
  google.accounts.id.renderButton(document.getElementById("google_signin"),button);
  
}

window.onload = startApp();
