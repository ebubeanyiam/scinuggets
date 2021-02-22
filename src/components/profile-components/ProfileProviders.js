import { db } from "../../firebase/config";

export const getUserId = async (username, setter, loading) => {
  const getUserInfo = async (uid) => {
    await db
      .collection("users")
      .doc(uid)
      .get()
      .then((doc) => {
        setter(doc.data());
        loading(false);
      });
  };

  await db
    .collection("usernames")
    .doc(username)
    .get()
    .then((doc) => {
      getUserInfo(doc.data().userId);
    });
};
