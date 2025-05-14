
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { poetryStyles } from '@/utils/poetryStyles';
import { generatePoem, savePoemToHistory } from '@/services/poemService';
import PoemDisplay from './PoemDisplay';

const PoemGenerator: React.FC = () => {
  const [selectedStyle, setSelectedStyle] = useState("shi");
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPoem, setGeneratedPoem] = useState<{
    title: string;
    content: string;
    author: string;
    style: string;
    timestamp: number;
  } | null>(null);

  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt) {
      toast({
        title: "请输入提示词",
        description: "请填写想要表达的主题或意境",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const poem = await generatePoem({
        style: selectedStyle,
        prompt,
        length: "medium",
      });
      
      setGeneratedPoem(poem);
      savePoemToHistory(poem);
      
      toast({
        title: "诗词已生成",
        description: `《${poem.title}》已创作完成`,
      });
    } catch (error) {
      toast({
        title: "生成失败",
        description: "服务器繁忙，请稍后再试",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section id="generator" className="py-16 px-4">
      <div className="poetry-container">
        <h2 className="text-3xl font-poetry mb-8 text-center">诗词<span className="text-cinnabar">创作</span></h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-parchment border-ink/10">
            <CardHeader>
              <CardTitle>创作参数</CardTitle>
              <CardDescription>选择诗词风格并输入创作灵感</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>选择诗词风格</Label>
                <RadioGroup value={selectedStyle} onValueChange={setSelectedStyle} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {poetryStyles.map((style) => (
                    <div key={style.id} className="flex items-start space-x-2">
                      <RadioGroupItem value={style.id} id={style.id} />
                      <div className="grid gap-1.5">
                        <Label htmlFor={style.id} className="font-bold">{style.name}</Label>
                        <p className="text-sm text-muted-foreground">{style.description}</p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="prompt">创作灵感</Label>
                <Textarea 
                  id="prompt"
                  placeholder="请输入您想要表达的主题、意境或情感..."
                  className="h-32 resize-none bg-white/50"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleGenerate} 
                className="w-full bg-cinnabar hover:bg-cinnabar-dark"
                disabled={isGenerating}
              >
                {isGenerating ? "生成中..." : "生成诗词"}
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-parchment border-ink/10 min-h-[400px] flex flex-col">
            <CardHeader>
              <CardTitle>创作成果</CardTitle>
              <CardDescription>您的诗词将显示在这里</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center">
              {generatedPoem ? (
                <PoemDisplay poem={generatedPoem} />
              ) : (
                <div className="text-center text-muted-foreground italic">
                  点击「生成诗词」按钮开始创作...
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PoemGenerator;
