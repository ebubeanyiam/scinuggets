// tools.js
import Header from "@editorjs/header";
import Embed from "@editorjs/embed";
import List from "@editorjs/list";

// import Table from "@editorjs/table";
import Code from "@editorjs/code";
// import LinkTool from "@editorjs/link";

import ImageTool from "@editorjs/image";
import Raw from "@editorjs/raw";
import SimpleImage from "@editorjs/simple-image";

import {
  editorImageFile,
  editorImageUrl,
} from "../components/new-story-components/FunctionProvider";

export const EDITOR_JS_TOOLS = {
  embed: Embed,
  list: List,
  code: Code,
  image: {
    class: ImageTool,
    config: {
      uploader: {
        uploadByFile(file) {
          return editorImageFile(file);
        },
        uploadByUrl(url) {
          return editorImageUrl(url);
        },
      },
    },
  },
  raw: Raw,
  header: Header,
  simpleImage: SimpleImage,
};
