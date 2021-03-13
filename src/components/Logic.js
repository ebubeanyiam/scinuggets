import { db, store } from "../firebase/config";

export const paths = ["/m/new-story"];

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

export const updateProfile = async (
  user,
  name,
  username,
  file,
  error,
  setUpdated
) => {
  const runUpdate = async () => {
    user.updateProfile({
      displayName: name,
    });

    await db.collection("users").doc(user.uid).set(
      {
        displayName: name,
        username,
      },
      { merge: true }
    );
    setUpdated(true);
  };

  const checkImage = async () => {
    if (file) {
      await store
        .ref(file.name)
        .put(file)
        .then(async (snapshot) => {
          await snapshot.ref.getDownloadURL().then((res) => {
            db.collection("users").doc(user.uid).set(
              {
                photoUrl: res,
              },
              { merge: true }
            );
            user.updateProfile({
              photoURL: res,
            });
          });
          runUpdate();
        });
    } else {
      runUpdate();
    }
  };

  await db
    .collection("usernames")
    .doc(username)
    .get()
    .then((doc) => {
      if (doc.exists) {
        error("Username is taken");
        return;
      } else {
        checkImage();
        db.collection("usernames").doc(username).set({
          userEmail: user.email,
          userId: user.uid,
        });
      }
    });
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

export const copyFunction = (link) => {
  const text = `scinuggets.com/${link}`;

  let input = document.createElement("input");
  input.setAttribute("value", text);
  document.body.appendChild(input);

  input.select();
  input.setSelectionRange(0, 99999);

  document.execCommand("copy");
  alert("Link Copied");
  input.parentNode.removeChild(input);
};
