// 🔥 REPLACE WITH YOUR NEW FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyBjYUgidUaapX8PXmdBa06du74mj0Y9Vcw",
  authDomain: "mychatapp-d3e7a.firebaseapp.com",
  projectId: "mychatapp-d3e7a",
  appId: "1:580728953641:web:9f068f0163fd9113737538"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// GOOGLE LOGIN FUNCTION
function loginWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  const message = document.getElementById("message");

  console.log("Google button clicked");

  auth.signInWithPopup(provider)
    .then(result => {
      message.innerText = `Login successful! Welcome ${result.user.displayName} 🎉`;
      message.style.color = "green";
      console.log(result.user);
      // NEXT: redirect to chat page later
    })
    .catch(error => {
      message.innerText = error.message;
      message.style.color = "red";
      console.error(error);
    });
}
