import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Embed from "@editorjs/embed";
import List from "@editorjs/list";
import SimpleImage from "@editorjs/simple-image";
import Code from "@editorjs/code";
import Raw from "@editorjs/raw";

export const editor = new EditorJS({
  tools: {
    header: {
      class: Header,
    },
    list: {
      class: List,
      inlineToolbar: true,
    },
    embed: {
      class: Embed,
      config: {
        services: {
          youtube: true,
          coub: true,
          twitter: true,
          instagram: true,
        },
      },
    },
  },
});
