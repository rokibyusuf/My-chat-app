// 🔥 REPLACE WITH YOUR FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyBjYUgidUaapX8PXmdBa06du74mj0Y9Vcw",
  authDomain: "mychatapp-d3e7a.firebaseapp.com",
  projectId: "mychatapp-d3e7a",
  appId: "1:580728953641:web:9f068f0163fd9113737538"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function loginWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  const msg = document.getElementById("message");

  auth.signInWithPopup(provider)
    .then(() => {
      msg.innerText = "Login successful 🎉";
      msg.style.color = "green";
      setTimeout(() => {
        window.location.href = "username.html";
      }, 300);
    })
    .catch(err => {
      msg.innerText = err.message;
      msg.style.color = "red";
    });
}
