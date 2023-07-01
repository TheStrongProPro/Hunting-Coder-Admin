if (localStorage.getItem('is_admin') === null) {
    window.location = 'index.html'
}

function logout() {
    localStorage.removeItem('is_admin')
    window.location = "index.html"
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

var post_number = 0
firebase.initializeApp(firebaseConfig);
var titles = []
firebase
    .database()
    .ref("/blogs")
    .on("value", function (snapshot) {
        titles = []
        snapshot.forEach(function (childSnapshot) {
            key = childSnapshot.key;
            value = childSnapshot.val()
            titles.push(value.title)
        });
    });
firebase
    .database()
    .ref("/project_settings")
    .on("value", function (snapshot) {
        value = snapshot.val()
        post_number = value.number_of_new_post
    });


function create() {

    if (document.getElementById('title').value == "" || document.getElementById('desc').value == "" || document.getElementById('img').value == "" || document.getElementById('content').value == "") {

        document.getElementById('outer-message').innerHTML = `
            <div id="messages" style="display: none;">
                    <div class="alert alert-warning alert-dismissible fade show" role="alert">
                        <div id="text"></div>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                      </div>
                </div>
                `
        document.getElementById('messages').style.display = 'block'
        document.getElementById('text').innerHTML = 'Please fill all the fields'
        return
    }
    else {
        if (!titles.includes(document.getElementById('title').value)) {
            // Date object
            const date = new Date();

            let currentDay = String(date.getDate()).padStart(2, '0');

            let currentMonth = String(date.getMonth() + 1).padStart(2, "0");

            let currentYear = date.getFullYear();

            // we will display the date as DD-MM-YYYY 

            let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;

            

            firebase.database().ref(`/blogs`).push({
                title: document.getElementById('title').value,
                desc: document.getElementById('desc').value,
                img: document.getElementById('img').value,
                content: document.getElementById('content').value,
                post_number: post_number,
                time : currentDate,
            });
            firebase.database().ref("/project_settings").update({
                number_of_new_post: post_number + 1,
            });
            document.getElementById('outer-message').innerHTML = `
            <div id="messages" style="display: none;">
                    <div class="alert alert-warning alert-dismissible fade show" role="alert">
                        <div id="text"></div>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                      </div>
                </div>
                `
            document.getElementById('messages').style.display = 'block'
            document.getElementById('text').innerHTML = 'Post created successfully'

        }
        else {
            document.getElementById('outer-message').innerHTML = `
            <div id="messages" style="display: none;">
                    <div class="alert alert-warning alert-dismissible fade show" role="alert">
                        <div id="text"></div>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                      </div>
                </div>
                `
            document.getElementById('messages').style.display = 'block'
            document.getElementById('text').innerHTML = 'Thsi title is alread taken please select any other title'
        }
    }
}