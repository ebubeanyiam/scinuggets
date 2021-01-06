// import { db } from "../../firebase/config";
import readingTime from "reading-time";

export const timeToRead = (savedData) => {
  let html = "";
  savedData.blocks.forEach((block) => {
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
  return readingTime(html).text;
};
