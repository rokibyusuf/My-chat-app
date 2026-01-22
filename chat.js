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

let currentUser;

// Check logged-in user
auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "index.html"; // Not logged in → go back
  } else {
    currentUser = user;
    loadUsernameAndUsers();
    listenForMessages();
  }
});

// Load username and populate user dropdown
function loadUsernameAndUsers() {
  db.collection("users").doc(currentUser.uid).get()
    .then(doc => {
      if (doc.exists) {
        document.getElementById("username-display").innerText = doc.data().displayName;
      }
    });

  // Load all users for private chat
  db.collection("users").get()
    .then(snapshot => {
      const select = document.getElementById("user-select");
      snapshot.forEach(doc => {
        if (doc.id !== currentUser.uid) {
          const option = document.createElement("option");
          option.value = doc.id;
          option.text = doc.data().displayName;
          select.appendChild(option);
        }
      });
    });
}

// Send a private message
function sendMessage() {
  const messageInput = document.getElementById("message-input");
  const toUserId = document.getElementById("user-select").value;
  const text = messageInput.value.trim();
  if (!text || !toUserId) return;

  const chatId = [currentUser.uid, toUserId].sort().join("_"); // unique chat ID

  db.collection("chats").doc(chatId).collection("messages").add({
    from: currentUser.uid,
    to: toUserId,
    text: text,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });

  messageInput.value = "";
}

// Listen for messages in real-time
function listenForMessages() {
  db.collection("chats")
    .where("messages", "!=", null) // placeholder to attach listener later
    // We'll fetch chat messages dynamically when user selects a recipient
}

// Logout function
function logout() {
  auth.signOut().then(() => {
    window.location.href = "index.html";
  });
}
