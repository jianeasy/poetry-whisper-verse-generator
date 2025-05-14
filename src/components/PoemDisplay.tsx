import React from "react";
import { Card } from "@/components/ui/card";

interface PoemDisplayProps {
  poem: {
    title: string;
    content: string;
    author: string;
    style: string;
    timestamp?: number;
  };
  vertical?: boolean;
}

const PoemDisplay: React.FC<PoemDisplayProps> = ({
  poem,
  vertical = false,
}) => {
  // Split the content by newlines to display each line separately
  const lines = poem.content.split("\n");

  return (
    <div className={`w-full ${vertical ? "flex justify-center" : ""}`}>
      <div
        className={`poem-card ${
          vertical ? "poem-scroll h-80 py-6 px-8" : "py-6"
        }`}
      >
        <h3
          className={`text-2xl font-poetry mb-4 ${
            vertical ? "" : "text-center"
          }`}
        >
          《{poem.title}》
        </h3>
        <div className={`space-y-2 ${vertical ? "" : "text-center"} mb-4`}>
          {lines.map((line, index) => (
            <p key={index} className="text-lg font-serif">
              {line}
            </p>
          ))}
        </div>
        <div
          className={`text-sm text-muted-foreground ${
            vertical ? "" : "text-center"
          }`}
        >
          <span className="mr-3">{poem.style}</span>
          {/* <span>{poem.author}</span> */}
        </div>
      </div>
    </div>
  );
};

export default PoemDisplay;
