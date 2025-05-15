import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookmarkPlus, BookmarkCheck } from "lucide-react";
import { collectPoemApi, cancelCollectPoemApi } from "@/request/api";
import { useToast } from "@/hooks/use-toast";

interface PoemDisplayProps {
  poem: {
    title: string;
    content: string;
    author: string;
    style: string;
    timestamp?: number;
    uuid?: string;
    collected?: boolean;
  };
  vertical?: boolean;
  refreshCollections?: () => void;
}

const PoemDisplay: React.FC<PoemDisplayProps> = ({
  poem,
  vertical = false,
  refreshCollections,
}) => {
  const [isCollected, setIsCollected] = useState(poem.collected || false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Split by Chinese punctuation marks and newlines to display each segment separately
  const punctuationRegex = /([，。！？；：、]|\n)/g;
  const segments = poem.content.split(punctuationRegex);

  // Group segments with their punctuation
  const lines: string[] = [];
  for (let i = 0; i < segments.length; i += 2) {
    const text = segments[i];
    const punctuation = segments[i + 1] || "";
    if (text) {
      lines.push(text + punctuation);
    }
  }

  const handleCollect = async () => {
    if (!poem.uuid) {
      toast({
        title: "无法收藏",
        description: "此诗词无法收藏，请先保存",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      if (isCollected) {
        await cancelCollectPoemApi({ uuid: poem.uuid });
        setIsCollected(false);
        toast({
          title: "已取消收藏",
          description: `《${poem.title}》已从收藏中移除`,
        });
      } else {
        await collectPoemApi({ uuid: poem.uuid });
        setIsCollected(true);
        toast({
          title: "收藏成功",
          description: `《${poem.title}》已添加到收藏`,
        });
      }
      // Refresh collections list if provided
      if (refreshCollections) {
        refreshCollections();
      }
    } catch (error) {
      toast({
        title: "操作失败",
        description: "服务器繁忙，请稍后再试",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`w-full ${vertical ? "flex justify-center" : ""}`}>
      <div
        className={`poem-card ${
          vertical ? "poem-scroll h-80 py-6 px-8" : "py-6"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <Button
            style={{ visibility: "hidden" }}
            variant="ghost"
            size="icon"
          ></Button>
          <h3
            className={`text-2xl font-poetry ${vertical ? "" : "text-center"}`}
          >
            《{poem.title}》
          </h3>
          {poem.uuid && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCollect}
              disabled={isLoading}
              className="ml-2"
              title={isCollected ? "取消收藏" : "收藏"}
            >
              {isCollected ? (
                <BookmarkCheck className="h-5 w-5 text-cinnabar" />
              ) : (
                <BookmarkPlus className="h-5 w-5" />
              )}
            </Button>
          )}
        </div>
        <div className={`space-y-2 ${vertical ? "" : "text-center"} mb-4`}>
          {lines.map((line, index) => (
            <p key={index} className="text-lg font-serif">
              {line}
            </p>
          ))}
        </div>
        {/* <div
          className={`text-sm text-muted-foreground ${
            vertical ? "" : "text-center"
          }`}
        >
          <span className="mr-3">{poem.style}</span>
        </div> */}
      </div>
    </div>
  );
};

export default PoemDisplay;
