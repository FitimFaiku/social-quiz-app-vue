import firebase from "firebase";
import store from "../store"
// config data from your firebase dashboard

class FirebaseService {

   
    CONFIG = {
    apiKey: "AIzaSyCk1laCfQmhgGem65A0u9LIO3_WrO9oRJc",
    authDomain: "socialquizapp.firebaseapp.com",
    projectId: "socialquizapp",
    storageBucket: "socialquizapp.appspot.com",
    messagingSenderId: "1024038656131",
    appId: "1:1024038656131:web:d55b8bafe5b9807e62a3b6",
    measurementId: "G-30BVR2FD06"
    };
    
    // Export methods which will be used to access the firebase api
    initializationComplete = false;
    // initalize firebase      

    signInWithPopup(){
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
            console.log("result", result);
            if(result.additionalUserInfo.isNewUser){
                console.log("New User", result.user);
                console.log("UID:", result.user.uid); // Password
                const user = {
                    username: result.user.displayName,
                    email: result.user.email,
                    password: result.user.uid,
                    dateOfBirth: null,
                }
                store.dispatch('auth/register', user);
            } else {
                // login
                // Just Login
                console.log("Login");
                    // login()
                const loginData = {username:result.user.displayName, password:result.user.uid};
                store.dispatch('auth/login', loginData);  
                //this.login(result.user.email,result.user.uid)
            }
                
                // this.$router.replace('home');
        }).catch((err) => {
            //alert('Oops. ' + err.message);
            /* commit('registerFailure', error);
            dispatch('alert/error', error, { root: true }); */
            console.log("Error", err);
        }) 
    }

    createFireBaseUser(email,password){
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
            console.log("User Signed in", user)
            // Signed in 
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert("User couldnt be created" + errorCode + errorMessage);
        // ..
      });
    }

    init() {
        firebase.initializeApp(this.CONFIG)
        // check the initialization status
        firebase.auth().onAuthStateChanged(() => {
            this.initializationComplete = true;
        });
    }

    async login(email, password) {
        try {
            // log in using email and password
            const response = await firebase.auth().signInWithEmailAndPassword(email, password)
            // return the currently logged in user.
            console.log("User", response);
            return response.user
        } catch (error) {
            alert(error);
        }
    }

    async logout () {
        await firebase.auth().signOut()
    }

    getLoggedInUser() {
        // resolve with the currently authenticated user.
        return new Promise((resolve) => {
            let initializationInterval = setInterval(() => {
            if (this.initializationComplete) {
                clearInterval(initializationInterval);
                resolve(firebase.auth().currentUser)
            }
            },10);
        })
    }
}

export default new FirebaseService();