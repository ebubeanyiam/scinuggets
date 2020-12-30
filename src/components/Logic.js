import { db, store } from "../firebase/config";
export const selectImage = (e, setFile, setPostImage) => {
  const types = [
    "image/png",
    "image/jpeg",
    "image/jpg, image/gif, image/svg",
    "image/webp",
  ];

  let selectedFile = e.target.files[0];

  if (selectedFile && types.includes(selectedFile.type)) {
    const reader = new FileReader();
    reader.onload = () => {
      setFile(selectedFile);
      setPostImage(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  } else {
    alert("File type not supported");
  }
};

export const updateProfile = async (user, name, file, setUpdated) => {
  let photoUrl = "";

  const runUpdate = () => {
    user.updateProfile({
      displayName: name,
      photoUrl,
    });

    db.collection("users")
      .doc(user.uid)
      .get()
      .then(async (doc) => {
        if (doc.data()) {
          await db.collection("users").doc(user.uid).update({
            displayName: name,
            photoUrl,
          });
          setUpdated(true);
        } else {
          await db.collection("users").doc(user.uid).set({
            displayName: name,
            photoUrl,
          });
          setUpdated(true);
        }
      });
  };

  if (file) {
    await store
      .ref(file.name)
      .put(file)
      .then(async (snapshot) => {
        await snapshot.ref.getDownloadURL().then((res) => {
          photoUrl = res;
        });
        runUpdate();
      });
  } else {
    runUpdate();
  }
};

export const getAuthorDetails = async (uid, setAuthorDetails) => {
  await db
    .collection("users")
    .doc(uid)
    .get()
    .then((doc) => {
      if (doc.data()) {
        setAuthorDetails(doc.data());
      }
    });
};
