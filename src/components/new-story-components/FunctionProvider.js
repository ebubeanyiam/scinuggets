import { db, timestamp } from "../../firebase/config";
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

export const saveArticle = async (user, props, title, subtitle) => {
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
  });
};

export const changeHandler = (e, setFile, setPostImage) => {
  const types = ["image/png", "image/jpeg", "image/jpg, image/gif, image/svg"];

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
    console.log("file type not supported");
  }
};
