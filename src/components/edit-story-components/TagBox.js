import React, { useState, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";

const TagBox = ({ tags, setTags }) => {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  const focus = () => {
    inputRef.current.focus();
  };

  return (
    <div
      className="new-story__publish--publish-info__tags-container"
      onClick={focus}
    >
      <div className="new-story__publish--publish-info__tags">
        {tags.map((tag, index) => (
          <div key={index}>
            <span>{tag}</span>{" "}
            <AiOutlineClose
              onClick={() => {
                setTags([...tags.splice(0, index), ...tags.splice(index + 1)]);
              }}
            />
          </div>
        ))}
      </div>
      <input
        ref={inputRef}
        type="text"
        className="new-story__publish--publish-info__tag-input"
        value={input}
        placeholder="Add a tag"
        onChange={(e) => {
          setInput(e.target.value);
        }}
        style={{ display: tags.length < 5 ? "initial" : "none" }}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            setTags([...tags, e.target.value]);
            setInput("");
          }
        }}
      />
    </div>
  );
};

export default TagBox;
