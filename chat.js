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
      document.getElementById("welcome").innerText =
        "Welcome, " + doc.data().username;
    });
  }
});

function logout() {
  auth.signOut().then(() => {
    window.location.href = "index.html";
  });
}
