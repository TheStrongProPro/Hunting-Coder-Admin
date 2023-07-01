if (localStorage.getItem('is_admin') === null) {
    window.location = 'index.html'
}


function logout() {
    localStorage.removeItem('is_admin')
    window.location = "index.html"
}



if (localStorage.getItem('contact_id') === null) {
    window.location = 'requests.html'
}


var edit_id = localStorage.getItem('edit_id')
const firebaseConfig = {
    apiKey: "AIzaSyD3fMRcD57S9uYrF_DNxk9eL6iEDTrqzRg",
    authDomain: "blog-18b3c.firebaseapp.com",
    databaseURL: "https://blog-18b3c-default-rtdb.firebaseio.com",
    projectId: "blog-18b3c",
    storageBucket: "blog-18b3c.appspot.com",
    messagingSenderId: "93500729847",
    appId: "1:93500729847:web:b6212053a76428e52126f2"
};


firebase.initializeApp(firebaseConfig)
var contact_id = localStorage.getItem('contact_id')
var contact = []
firebase
    .database()
    .ref("/contact")
    .on("value", function (snapshot) {
        contact = []
        snapshot.forEach(function (childSnapshot) {
            key = childSnapshot.key;
            value = childSnapshot.val()
            blogs.push(key)
        });
        if (!contact.includes(contact_id)) {
            window.location = "requests.html"
        }
    });
window.onbeforeunload = function () {
    localStorage.removeItem('contact_id')

}
firebase
    .database()
    .ref(`/contact/${contact_id}`)
    .on("value", function (snapshot) {
        blog_data = snapshot.val()
        document.getElementById('name').value = blog_data.name
        document.getElementById('email').value = blog_data.email
        document.getElementById('phone').value = blog_data.phone
        document.getElementById('message').value = blog_data.message
    });