if (localStorage.getItem('is_admin') === null) {
    window.location = 'index.html'
}
if (localStorage.getItem('edit_id') === null) {
    window.location = 'dashboard.html'
}


function logout() {
    localStorage.removeItem('is_admin')
    window.location = "index.html"
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


firebase.initializeApp(firebaseConfig);

var blogs = []
var titles = []
firebase
    .database()
    .ref("/blogs")
    .on("value", function (snapshot) {
        titles = []
        blogs = []
        snapshot.forEach(function (childSnapshot) {
            key = childSnapshot.key;
            value = childSnapshot.val()
            blogs.push(key)
            titles.push(value.title)
        });
        if (!blogs.includes(edit_id)) {
            window.location = "dashboard.html"
        }
    });
var post_number = 0
firebase
    .database()
    .ref("/project_settings")
    .on("value", function (snapshot) {
        value = snapshot.val()
        post_number = value.number_of_new_post
    });

var blog_data = undefined
firebase
    .database()
    .ref(`/blogs/${edit_id}`)
    .on("value", function (snapshot) {
        blog_data = snapshot.val()
        document.getElementById('title').value = blog_data.title
        document.getElementById('desc').value = blog_data.desc
        document.getElementById('img').value = blog_data.img
        document.getElementById('content').value = blog_data.content
    });

window.onbeforeunload = function () {
    localStorage.removeItem('edit_id')
}


function edit() {
    if (!titles.includes(document.getElementById('title').value)) {
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
        const date = new Date();

        let currentDay = String(date.getDate()).padStart(2, '0');

        let currentMonth = String(date.getMonth() + 1).padStart(2, "0");

        let currentYear = date.getFullYear();

        // we will display the date as DD-MM-YYYY 

        let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;
        firebase.database().ref(`/blogs/${edit_id}`).update({
            title: document.getElementById('title').value,
            desc: document.getElementById('desc').value,
            img: document.getElementById('img').value,
            content: document.getElementById('content').value,
            time: currentDate,
            post_number: post_number,
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
        document.getElementById('text').innerHTML = 'Edits made successfully'
    }
    else {
        if (document.getElementById('title').value != blog_data.title) {
            document.getElementById('outer-message').innerHTML = `
            <div id="messages" style="display: none;">
                    <div class="alert alert-warning alert-dismissible fade show" role="alert">
                        <div id="text"></div>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                      </div>
                </div>
                `
            document.getElementById('messages').style.display = 'block'
            document.getElementById('text').innerHTML = 'Please take another title this title is already occupied'
        }
        else {
            const date = new Date();

            let currentDay = String(date.getDate()).padStart(2, '0');

            let currentMonth = String(date.getMonth() + 1).padStart(2, "0");

            let currentYear = date.getFullYear();

            // we will display the date as DD-MM-YYYY 

            let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;
            firebase.database().ref(`/blogs/${edit_id}`).update({
                title: document.getElementById('title').value,
                desc: document.getElementById('desc').value,
                img: document.getElementById('img').value,
                content: document.getElementById('content').value,
                time: currentDate,
                post_number: post_number,
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
            document.getElementById('text').innerHTML = 'Edits made successfully'
        }


    }


}