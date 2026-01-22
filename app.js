// 🔥 REPLACE WITH YOUR FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyBjYUgidUaapX8PXmdBa06du74mj0Y9Vcw",
  authDomain: "mychatapp-d3e7a.firebaseapp.com",
  projectId: "mychatapp-d3e7a",
  appId: "1:580728953641:web:9f068f0163fd9113737538"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// GOOGLE LOGIN FUNCTION
function loginWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  const message = document.getElementById("message");

  console.log("Google button clicked");

  auth.signInWithPopup(provider)
    .then(result => {
      console.log("User logged in:", result.user);
      message.innerText = "Login successful! Redirecting...";
      message.style.color = "green";

      // ✅ Redirect to username setup page
      window.location.href = "username.html";
    })
    .catch(error => {
      message.innerText = error.message;
      message.style.color = "red";
      console.error("Login error:", error);
    });
}

// OPTIONAL: Check if user is already logged in and redirect
auth.onAuthStateChanged(user => {
  if (user) {
    // Already logged in → go to username page directly
    window.location.href = "username.html";
  }
});
