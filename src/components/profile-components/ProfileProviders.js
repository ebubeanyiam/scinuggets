import { db } from "../../firebase/config";

export const getUserPosts = async (uid, args) => {
  db.collection("posts")
    .where("postedBy", "==", uid)
    .orderBy("timestamp", "desc")
    .limit(5)
    .get()
    .then((snapshots) => {
      args.setBlogPosts([...snapshots.docs]);
      args.setLastDoc(snapshots.docs[snapshots.docs.length - 1]);
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
};

export const getUserInfo = (uid, args) => {
  db.collection("users")
    .doc(uid)
    .get()
    .then((doc) => {
      args.setProfileData(doc.data());
      args.setLoading(false);
    });
};

export const fetchMore = (args, uid, lastDoc) => {
  db.collection("posts")
    .where("postedBy", "==", uid)
    .orderBy("timestamp", "desc")
    .startAfter(lastDoc)
    .limit(5)
    .get()
    .then((snapshots) => {
      args.setBlogPosts((blogPosts) => [...blogPosts, ...snapshots.docs]);
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
};
