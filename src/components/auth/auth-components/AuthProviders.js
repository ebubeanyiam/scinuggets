import { auth } from "../../../firebase/config";

export const validEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

export const authFunction = (provider, status) => {
  console.log(status);
  auth.signInWithRedirect(provider).then((res) => {
    console.log(res);
  });
};

export const mailAuthFunction = (email, password, status, setAuthModal) => {
  if (status === "Login") {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => res && setAuthModal(false));
  } else {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => res && setAuthModal(false));
  }
};
