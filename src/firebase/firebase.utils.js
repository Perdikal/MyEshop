import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBncs-yyPmNaQTTTaBBS8DPB3K0rdVmvPw",
  authDomain: "perdikals-store-db.firebaseapp.com",
  databaseURL: "https://perdikals-store-db.firebaseio.com",
  projectId: "perdikals-store-db",
  storageBucket: "perdikals-store-db.appspot.com",
  messagingSenderId: "685945315446",
  appId: "1:685945315446:web:ba196ba620c2cd6431ff57",
  measurementId: "G-GC9SQRH6LT",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserPofileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
