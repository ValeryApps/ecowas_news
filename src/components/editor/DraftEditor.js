import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./editor.css";

export const DraftEditor = ({ editorState, onEditorStateChange }) => {
  return (
    <Editor
      editorState={editorState}
      wrapperClassName="p-4 border-gray-300"
      editorClassName="bg-gray-200 h-56 p-4 border-gray-300 custom-scroll"
      onEditorStateChange={onEditorStateChange}
    />
  );
};
