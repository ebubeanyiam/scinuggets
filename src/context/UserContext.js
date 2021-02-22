import React, { useState, useEffect, createContext, useContext } from "react";
import { auth, db } from "../firebase/config";

export const UserContext = createContext();

export const User = () => {
  const [user] = useContext(UserContext);
  return user;
};

export const UserData = () => {
  const [, userData] = useContext(UserContext);
  return userData;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [userData, setUserData] = useState(null);

  auth.onAuthStateChanged((user) => {
    setUser(user);
  });

  useEffect(() => {
    if (!user) {
      return;
    }
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        if (doc.data()) {
          setUserData(doc.data());
        }
      });
  }, [user]);

  return (
    <UserContext.Provider value={[user, userData]}>
      {children}
    </UserContext.Provider>
  );
};
