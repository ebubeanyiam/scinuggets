import { db, store, timestamp } from "../../firebase/config";

export const getDraft = (props) => {
  if (props.draftId) {
    props.setNewPost(false);
    db.collection("posts")
      .doc(props.draftId)
      .get()
      .then((doc) => {
        if (doc.data() && doc.data().postedBy === props.user.uid) {
          props.setTags(doc.data().tags);
          props.setTitle(doc.data().title);
          props.setSubtitle(doc.data().subtitle);
          props.setEditorData(doc.data().savedData);
          props.setPostImage(doc.data().featuredImage);
          props.setLoading(false);
        } else {
          props.setUserDraft(false);
          props.setLoading(false);
        }
      });
  } else {
    props.setEditorData("");
    props.setLoading(false);
  }
};

export const saveArticle = async (
  user,
  props,
  title,
  subtitle,
  tags,
  file,
  p,
  draftId
) => {
  p(true);
  let featuredImage = "";

  const saveData = async () => {
    const savedData = await props.instanceRef.current.save();

    await db
      .collection("posts")
      .doc(props.draftId)
      .update({
        title,
        subtitle,
        savedData,
        featuredImage,
        tags,
        edited: true,
        lastEdited: timestamp,
      })
      .then((res) => {
        window.location.replace(`/${props.draftId}`);
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  if (file) {
    store
      .ref(file.name)
      .put(file)
      .then(async (snapshot) => {
        await snapshot.ref.getDownloadURL().then((res) => {
          featuredImage = res;
        });
        saveData();
      });
  } else {
    saveData();
  }
};

export const addFeaturedImage = (e, setFile, setPostImage) => {
  const types = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/gif",
    "image/svg",
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

export const editorImageFile = async (file) => {
  let response;

  await store
    .ref(file.name)
    .put(file)
    .then(async (snapshot) => {
      await snapshot.ref.getDownloadURL().then((res) => {
        response = res;
      });
    });

  return {
    success: 1,
    file: {
      url: response,
    },
  };
};

export const editorImageUrl = async (url) => {
  return {
    success: 1,
    file: {
      url: url,
    },
  };
};
