import React from "react";
import Editorjs from "react-editor-js";

import Header from "./new-story-components/Header";
import { EDITOR_JS_TOOLS } from "../editor/editorConfig";
import "../style/new-story.css";

const NewStory = () => {
  return (
    <div className="new-story">
      <Header />
      <div className="new-story__editor">
        <div className="new-story__editor--header">
          <Editorjs placeholder="Title" />
        </div>

        <div className="new-story__editor--body">
          <Editorjs placeholder="Write your article" tools={EDITOR_JS_TOOLS} />
        </div>
      </div>
    </div>
  );
};

export default NewStory;
