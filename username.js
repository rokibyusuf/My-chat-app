const firebaseConfig = {
  apiKey: "AIzaSyBjYUgidUaapX8PXmdBa06du74mj0Y9Vcw",
  authDomain: "mychatapp-d3e7a.firebaseapp.com",
  projectId: "mychatapp-d3e7a",
  storageBucket: "mychatapp-d3e7a.firebasestorage.app",
  messagingSenderId: "580728953641",
  appId: "1:580728953641:web:9f068f0163fd9113737538"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "index.html";
  }
});

function saveUsername() {
  const user = auth.currentUser;
  const username = document.getElementById("username").value.trim();

  if (!username) {
    document.getElementById("msg").innerText = "Enter username";
    return;
  }

  db.collection("users").doc(user.uid).set({
    uid: user.uid,
    username: username,
    email: user.email
  }).then(() => {
    window.location.replace("chat.html");
  });
}
