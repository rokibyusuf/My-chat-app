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

// Make sure user is logged in
auth.onAuthStateChanged(user => {
  if (!user) {
    // If not logged in, redirect to login
    window.location.href = "index.html";
  }
});

// Save username to Firestore
function saveUsername() {
  const username = document.getElementById("username").value.trim();
  const message = document.getElementById("message");
  const user = auth.currentUser;

  if (!username) {
    message.innerText = "Please enter a username";
    message.style.color = "red";
    return;
  }

  db.collection("users").doc(user.uid).set({
    displayName: username,
    email: user.email,
    uid: user.uid
  })
  .then(() => {
    message.innerText = "Username saved! 🎉";
    message.style.color = "green";

    // Redirect to chat page later (we'll create this next)
    setTimeout(() => {
      alert("Next: Chat page will be ready soon!");
    }, 1000);
  })
  .catch(error => {
    message.innerText = error.message;
    message.style.color = "red";
  });
}
