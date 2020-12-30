import { auth, db, timestamp } from "../../../firebase/config";

export const validEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

export const authFunction = (provider, status) => {
  console.log(status);
  auth.signInWithRedirect(provider).then((res) => {
    if (res.additionalUserInfo.isNewUser) {
      db.collection("registeredEmails").doc(res.user.email).set({
        userID: res.user.uid,
      });
      db.collection("users").doc(res.user.uid).set({
        displayName: "",
        bio: "",
        username: "",
        photoUrl: "",
        website: "",
        timestamp,
      });
    }
  });
};

export const mailAuthFunction = (email, password, setAuthModal, status) => {
  if (status === "Login") {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => res && setAuthModal(false));
  } else {
    auth.createUserWithEmailAndPassword(email, password).then((res) => {
      res && setAuthModal(false);
      db.collection("registeredEmails").doc(email).set({
        userID: res.user.uid,
      });
      db.collection("users").doc(res.user.uid).set({
        displayName: "",
        bio: "",
        username: "",
        photoUrl: "",
        website: "",
        timestamp,
      });
      if (res.additionalUserInfo.isNewUser) {
        console.log("new user");
        auth.currentUser
          .sendEmailVerification()
          .then(() => {
            console.log("Email sent");
          })
          .catch((e) => console.log(e));
      }
    });
  }
};

export const checkEmail = async (props) => {
  if (props.emailLoginValue.match(validEmail)) {
    const emailRef = db
      .collection("registeredEmails")
      .doc(props.emailLoginValue);
    if (props.status === "Sign up") {
      emailRef.get().then((res) => {
        if (res.exists) {
          props.setErrorMessage("That email is already registered");
          return;
        } else {
          props.setLoginStep(1);
          props.setErrorMessage("");
          props.setEnterPassword(true);
          props.setFormSubHeading("Create a new password for your account");
        }
      });
    }
    if (props.status === "Login") {
      emailRef.get().then((res) => {
        if (res.exists) {
          props.setLoginStep(1);
          props.setErrorMessage("");
          props.setEnterPassword(true);
          props.setFormSubHeading("Enter the password associated with ....");
          return;
        } else {
          props.setErrorMessage("Email isn't registered");
        }
      });
    }
  } else {
    props.setErrorMessage(
      props.emailLoginValue.length < 1
        ? "You haven't typed in an Email"
        : "Invalid Email"
    );
  }
};

export const checkPassword = (props) => {
  if (props.status === "Sign up") {
    if (!props.passwordLoginValue.match(validPassword)) {
      props.setErrorMessage(
        "Password must be at least 8 characters and contain an uppercase letter, lowercase letter and a number "
      );
    } else {
      props.setErrorMessage("");
    }
  }
};
