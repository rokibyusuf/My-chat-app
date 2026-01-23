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

function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();

  auth.signInWithPopup(provider)
    .then(() => {
      window.location.href = "username.html";
    })
    .catch(err => alert(err.message));
}
