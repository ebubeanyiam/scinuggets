import { db, store, timestamp } from "../../firebase/config";
import slugify from "slugify";

export const getDraft = (props) => {
  if (props.draftId) {
    props.setNewPost(false);
    db.collection("drafts")
      .doc(props.draftId)
      .get()
      .then((doc) => {
        if (doc) {
          props.setTitle(doc.data().title);
          props.setEditorData(doc.data().savedData);
        }
      });
  } else {
    props.setEditorData("");
  }
};

export const saveDraft = async (props, title) => {
  props.setSaving(true);
  const savedData = await props.instanceRef.current.save();
  if (props.newPost) {
    db.collection("drafts")
      .add({
        title,
        savedData,
      })
      .then((res) => {
        props.setSaving(false);
        props.setNewPost(false);
        props.setDraftId(res.id);
        window.history.pushState({}, "", `/p/${res.id}`);
      });
  } else {
    db.collection("drafts")
      .doc(props.draftId)
      .set({
        title,
        savedData,
      })
      .then(() => {
        props.setSaving(false);
      });
  }
};

export const saveArticle = async (user, props, title, subtitle, file) => {
  let featuredImage;

  const saveData = async () => {
    const slugifyRes = slugify(title, {
      lower: true,
    });
    const slug = `${slugifyRes}-${props.draftId}`;
    const savedData = await props.instanceRef.current.save();

    db.collection("posts").doc(slug).set({
      title,
      subtitle,
      slug,
      savedData,
      timestamp,
      postedBy: user.uid,
      featuredImage,
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
    "image/jpg, image/gif, image/svg",
    "image/webp",
  ];

  let selectedFile = e.target.files[0];

  console.log(selectedFile);
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

export const getPostById = (id, postData, loading) => {
  db.collection("posts")
    .doc(id)
    .get()
    .then((doc) => {
      if (doc.data()) {
        postData(doc.data());
        loading(false);
      } else {
        postData(false);
        loading(false);
      }
    });
};
