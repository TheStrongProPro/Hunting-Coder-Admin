if (localStorage.getItem('is_admin') != null){
    window.location = 'dashboard.html'
}


const firebaseConfig = {
    apiKey: "AIzaSyD3fMRcD57S9uYrF_DNxk9eL6iEDTrqzRg",
    authDomain: "blog-18b3c.firebaseapp.com",
    databaseURL: "https://blog-18b3c-default-rtdb.firebaseio.com",
    projectId: "blog-18b3c",
    storageBucket: "blog-18b3c.appspot.com",
    messagingSenderId: "93500729847",
    appId: "1:93500729847:web:b6212053a76428e52126f2"
  };


firebase.initializeApp(firebaseConfig);

function login() {
    user_name = document.getElementById('name').value;
    pass = document.getElementById('pass').value;
    if (user_name == "" || pass == ""){
        document.getElementById('message').innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        Username or Password is blank
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`
      return
    }
    if (user_name == "Admin" && pass == "Omkara"){
        localStorage.setItem('is_admin', true)
        window.location = "dashboard.html"
    }
    else{
        document.getElementById('message').innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        Wrong Username or password
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`
    }
}