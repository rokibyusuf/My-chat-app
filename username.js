// 🔥 REPLACE WITH YOUR FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyBjYUgidUaapX8PXmdBa06du74mj0Y9Vcw",
  authDomain: "mychatapp-d3e7a.firebaseapp.com",
  projectId: "mychatapp-d3e7a",
  appId: "1:580728953641:web:9f068f0163fd9113737538"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "index.html";
  } else {
    db.collection("users").doc(user.uid).get().then(doc => {
      if (doc.exists) {
        window.location.href = "chat.html";
      }
    });
  }
});

function saveUsername() {
  const user = auth.currentUser;
  const username = document.getElementById("username").value.trim();
  const msg = document.getElementById("message");

  if (!username) {
    msg.innerText = "Enter a username";
    msg.style.color = "red";
    return;
  }

  db.collection("users").doc(user.uid).set({
    uid: user.uid,
    username: username,
    email: user.email
  }).then(() => {
    window.location.href = "chat.html";
  });
}

