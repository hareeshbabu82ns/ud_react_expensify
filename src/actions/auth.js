import { firebase, googleAuthProvider } from "../firebase/firebase";

export const login = uid => {
  return {
    type: "LGOIN",
    uid
  };
};
export const startLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };
};

export const logout = () => {
  return {
    type: "LOGOUT"
  };
};
export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};
