import { db } from "../../firebase/config";

export const getUserId = async (username, setter, loading, blogPosts) => {
  const getUserPosts = async (uid) => {
    db.collection("posts")
      .where("postedBy", "==", uid)
      .limit(5)
      .get()
      .then((snapshots) => {
        blogPosts([...snapshots.docs]);
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  };

  const getUserInfo = async (uid) => {
    await db
      .collection("users")
      .doc(uid)
      .get()
      .then((doc) => {
        setter(doc.data());
        loading(false);
        getUserPosts(uid);
      });
  };

  await db
    .collection("usernames")
    .doc(username)
    .get()
    .then((doc) => {
      getUserInfo(doc.data().userId);
    })
    .catch((e) => {
      setter(false);
      loading(false);
    });
};
