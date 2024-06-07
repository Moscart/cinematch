import { useState } from "react";

const TextTruncate = ({ text }: { text: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text) {
    return <div>Tidak ada ringkasan</div>;
  }

  const truncatedText =
    text.substring(0, 200) + (text.length > 200 ? "..." : "");

  const handleReadMore = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <>
      {isExpanded ? text : truncatedText}
      {text.length > 200 && (
        <button onClick={handleReadMore} className="text-primary ms-2">
          {isExpanded ? "Read less" : "Read more"}
        </button>
      )}
    </>
  );
};

export default TextTruncate;
