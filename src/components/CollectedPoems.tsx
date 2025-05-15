import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCollectPoemListApi } from "@/request/api";
import PoemDisplay from "./PoemDisplay";
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";

const CollectedPoems: React.FC<{ refreshKey: number }> = ({ refreshKey }) => {
  const [collections, setCollections] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 5;
  const { toast } = useToast();

  const fetchCollections = async (pageNum = 1, refresh = false) => {
    setIsLoading(true);
    try {
      const response = await getCollectPoemListApi({
        page: pageNum,
        pageSize,
        toolName: "ai-poem-generate",
      });
      console.log("response ", response.data);
      const { total } = response.data;
      const collections = response.data.list.map((item) => {
        return {
          ...JSON.parse(JSON.parse(item.setting).setting),
          uuid: item.uuid,
        };
      });
      console.log("collections ", collections);

      if (refresh) {
        setCollections(collections);
      } else {
        setCollections((prev) => [...prev, ...collections]);
      }

      // 根据当前页数和总数判断是否还有更多数据
      const hasMoreData = pageNum * pageSize < total;
      setHasMore(hasMoreData);

      setPage(pageNum);
    } catch (error) {
      toast({
        title: "获取收藏列表失败",
        description: "服务器繁忙，请稍后再试",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections(1, true);
  }, [refreshKey]);

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      fetchCollections(page + 1);
    }
  };

  const refreshCollections = () => {
    fetchCollections(1, true);
  };

  if (collections.length === 0 && !isLoading) {
    return (
      <section
        id="collections"
        className="py-16 px-4 bg-parchment-light bg-opacity-30"
      >
        <div className="poetry-container">
          <h2 className="text-3xl font-poetry mb-8 text-center">
            我的<span className="text-cinnabar">收藏</span>
          </h2>
          <Card className="bg-white/80 border-ink/10">
            <CardContent className="py-12 text-center">
              <p className="text-lg text-muted-foreground">
                您尚未收藏任何诗词
              </p>
              <p className="text-md text-muted-foreground mt-2">
                生成诗词后点击收藏按钮即可加入收藏
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section
      id="collections"
      className="py-16 px-4 bg-parchment-light bg-opacity-30"
    >
      <div className="poetry-container">
        <h2 className="text-3xl font-poetry mb-8 text-center">
          我的<span className="text-cinnabar">收藏</span>
        </h2>

        <div className="grid grid-cols-1 gap-6">
          {isLoading && collections.length === 0 ? (
            <Card className="bg-white/80 border-ink/10">
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">加载中...</p>
              </CardContent>
            </Card>
          ) : (
            collections.map((item, index) => {
              const poem = {
                title: item.title || "无题",
                content: item.content || "",
                author: "佚名",
                style: item.style || "",
                uuid: item.uuid,
                collected: true,
              };

              return (
                <Card
                  key={item.uuid || index}
                  className="bg-white/80 border-ink/10"
                >
                  <CardContent className="py-6">
                    <PoemDisplay
                      poem={poem}
                      refreshCollections={refreshCollections}
                    />
                  </CardContent>
                </Card>
              );
            })
          )}

          {hasMore && (
            <div className="flex justify-center mt-4">
              <Button
                onClick={handleLoadMore}
                disabled={isLoading}
                variant="outline"
              >
                {isLoading ? "加载中..." : "加载更多"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CollectedPoems;
