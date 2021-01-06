import { db, fieldValue } from "../../firebase/config";

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

export const getHTMLData = (postData, setHtmlData) => {
  let html = "";
  postData.savedData.blocks.forEach((block) => {
    switch (block.type) {
      case "header":
        html += `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
        break;
      case "paragraph":
        html += `<p>${block.data.text}</p>`;
        break;
      case "delimiter":
        html += "<hr />";
        break;
      case "image":
        html += `<img class="img-fluid" src="${block.data.file.url}" title="${block.data.caption}" /><br /><em>${block.data.caption}</em>`;
        break;
      case "simpleImage":
        html += `<img class="img-fluid" src="${block.data.url}" title="${block.data.caption}" /><br /><em>${block.data.caption}</em>`;
        break;
      case "list":
        html += "<ul>";
        block.data.items.forEach(function (li) {
          html += `<li>${li}</li>`;
        });
        html += "</ul>";
        break;
      case "code":
        html += `<code>${block.data.code}</code>`;
        break;
      default:
        console.log("Unknown block type", block.type);
        console.log(block);
        break;
    }
  });
  setHtmlData(html);
};

export const calcLike = async (args) => {
  if (args.user) {
    if (!args.likedPost) {
      await db
        .collection("posts")
        .doc(args.props.match.params.id)
        .update({
          likes: {
            count: fieldValue.increment(1),
            liked_by: fieldValue.arrayUnion(args.user.uid),
          },
        });
      args.setPostLikes(args.postLikes + 1);
      args.setLikedPost(true);
    } else {
      await db
        .collection("posts")
        .doc(args.props.match.params.id)
        .update({
          likes: {
            count: fieldValue.increment(-1),
            liked_by: fieldValue.arrayRemove(args.user.uid),
          },
        });
      args.setPostLikes(args.postLikes - 1);
      args.setLikedPost(false);
    }
  } else {
    args.setLoginAction(true);
  }
};

export const calcSaves = async (args) => {
  if (args.user) {
    if (!args.savedPost) {
      await db
        .collection("posts")
        .doc(args.props.match.params.id)
        .update({
          likes: {
            count: fieldValue.increment(1),
            saved_by: fieldValue.arrayUnion(args.user.uid),
          },
        });
      args.setPostSaves(args.postSaves + 1);
      args.setSavedPost(true);
    } else {
      await db
        .collection("posts")
        .doc(args.props.match.params.id)
        .update({
          likes: {
            count: fieldValue.increment(-1),
            saved_by: fieldValue.arrayRemove(args.user.uid),
          },
        });
      args.setPostSaves(args.postSaves - 1);
      args.setSavedPost(false);
    }
  } else {
    args.setLoginAction(true);
  }
};
