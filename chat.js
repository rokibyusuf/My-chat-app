// 🔥 REPLACE WITH YOUR FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyBjYUgidUaapX8PXmdBa06du74mj0Y9Vcw",
  authDomain: "mychatapp-d3e7a.firebaseapp.com",
  projectId: "mychatapp-d3e7a",
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
    return;
  }

  db.collection("users").doc(user.uid).get()
    .then(doc => {
      document.getElementById("welcome").innerText =
        "Welcome, " + doc.data().username;
    });
});

function logout() {
  auth.signOut().then(() => {
    window.location.href = "index.html";
  });
}
