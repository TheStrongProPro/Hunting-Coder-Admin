if (localStorage.getItem('is_admin') === null) {
    window.location = "index.html"
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


firebase.initializeApp(firebaseConfig);

const database = firebase.database();

var count = 0
database.ref("/contact").on("value", (snapshot) => {
  document.getElementById('no-posts').innerHTML = `All the Contact Requests : <br />
  <table class="table">
      <thead>
          <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
          </tr>
      </thead>
      <tbody>
          <!-- This is where the data from Firebase will be fetched and displayed -->
      </tbody>
  </table>`
  const table = document.querySelector("tbody");
  count = 0
  snapshot.forEach(function (childSnapshot) {
    
    value = childSnapshot.val()
    key = childSnapshot.key
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${value.name}</td>
    <td>${value.email}</td>
    <td><button class="btn btn-outline-primary mx-3" onclick="readContact('` + `${key}` + `')">Read</button><button class="btn btn-outline-primary mx-3" onclick="deleteContact('` + `${key}` + `')">Mark as Done</button></td>
    `;
    table.appendChild(row);
    count++
  })
  if (count == 0) {
    document.getElementById('no-posts').innerHTML = 'No Contact Requests found'
  }
});

function readContact(contact_id) {
    localStorage.setItem('contact_id', contact_id)
    window.location = 'readContact.html'
}


function deleteContact(id) {
  firebase.database().ref(`/contact/${id}`).remove()
}