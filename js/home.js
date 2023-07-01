function sortByNumber(objects) {
  // Create a comparator function that compares the numbers in the objects.
  const comparator = (a, b) => {
    // Get the numbers from the objects.
    const numberA = a.post_number;
    const numberB = b.post_number;

    // Return the difference between the numbers, negated so that the sort is in descending order.
    return numberB - numberA;
  };

  // Sort the objects by the number property, in descending order.
  return objects.sort(comparator);
}


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




count = 0
database.ref("/blogs").on("value", (snapshot) => {
  document.getElementById('no-posts').innerHTML = `All the Posts : <br />
  <table class="table">
      <thead>
          <tr>
              <th>Title</th>
              <th>Subheading</th>
              <th>Actions</th>
          </tr>
      </thead>
      <tbody>
          <!-- This is where the data from Firebase will be fetched and displayed -->
      </tbody>
  </table>`
  const table = document.querySelector("tbody");
  list = []
  count = 0
  snapshot.forEach(function (childSnapshot) {

    value = childSnapshot.val()
    key = childSnapshot.key
    value['key'] = key
    list.push(value)
    
    count++
  })
  list = sortByNumber(list)
  for (i in list){
    value = list[i]
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${value.title}</td>
    <td>${value.desc}</td>
    <td><button class="btn btn-outline-primary mx-3" onclick="editPost('` + `${value.key}` + `')">Edit</button><button class="btn btn-outline-primary" onclick="deletePost('` + `${value.key}` + `')">Delete</button></td>
    `;
    table.appendChild(row);
  }
    if (count == 0) {
      document.getElementById('no-posts').innerHTML = 'No Posts found'
    }
});



function editPost(post_id) {
  localStorage.setItem('edit_id', post_id)
  window.location = 'edit.html'
}


function deletePost(post_id) {
  firebase.database().ref(`/blogs/${post_id}`).remove()
} 