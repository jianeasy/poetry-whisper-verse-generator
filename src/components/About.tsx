
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const About: React.FC = () => {
  return (
    <section id="about" className="py-16 px-4">
      <div className="poetry-container">
        <h2 className="text-3xl font-poetry mb-8 text-center">关于<span className="text-cinnabar">诗韵</span></h2>
        
        <Card className="bg-parchment border-ink/10">
          <CardHeader>
            <CardTitle className="text-2xl font-poetry">诗韵生成器</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p>
              诗韵生成器是一个致力于传承和弘扬中国古典诗词艺术的创新工具。我们结合现代人工智能技术与传统文学艺术，
              为热爱中国古典文化的用户提供一个探索诗词创作的平台。
            </p>
            
            <h3 className="font-poetry text-xl mt-6">中国古典诗词简介</h3>
            <p>
              中国古典诗词是中华文明的瑰宝，历经数千年的发展，形成了诗、词、赋、曲等多种体裁，
              每一种都有其独特的格律规范和美学特点。唐诗、宋词、元曲等各朝代的文学成就，
              不仅展现了中国古代社会的风貌，也表达了文人们对自然、人生和社会的深刻思考。
            </p>
            
            <h3 className="font-poetry text-xl mt-6">创作理念</h3>
            <p>
              我们希望通过这个工具，让更多人能够感受到中国古典诗词的魅力，了解不同体裁的特点和风格。
              无论您是古典文学爱好者，还是初次接触中国诗词的学习者，都能在这里找到灵感，
              创作出属于自己的诗词作品。
            </p>
            
            <h3 className="font-poetry text-xl mt-6">使用方法</h3>
            <p>
              选择您喜欢的诗词风格，输入创作灵感或主题，系统将为您生成符合对应体裁格律和风格的诗词作品。
              您可以保存自己喜欢的创作，也可以不断尝试不同的风格和主题，探索中国古典诗词的无限可能。
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default About;
