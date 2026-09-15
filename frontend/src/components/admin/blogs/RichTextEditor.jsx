import { useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

const RichTextEditor = ({ value, onChange }) => {
  const { quill, quillRef } = useQuill({
    theme: "snow",
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        ["blockquote", "code-block"],
        ["link"],
        ["clean"],
      ],
    },
  });

  useEffect(() => {
    if (!quill) return;

    const handleTextChange = () => {
      onChange(quill.root.innerHTML);
    };

    quill.on("text-change", handleTextChange);

    return () => {
      quill.off("text-change", handleTextChange);
    };
  }, [quill, onChange]);

  useEffect(() => {
    if (!quill || !value) return;

    if (quill.root.innerHTML !== value) {
      quill.root.innerHTML = value;
    }
  }, [quill, value]);

  return (
    <div className="bg-white rounded-lg border border-slate-200">
      <div ref={quillRef} className="min-h-[300px]" />
    </div>
  );
};

export default RichTextEditor;
