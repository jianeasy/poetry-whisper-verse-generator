
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="py-20 px-6 text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-poetry mb-6 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          诗意栖于<span className="brush-stroke text-cinnabar">心灵</span>之境
        </h1>
        <p className="text-xl md:text-2xl opacity-0 animate-fade-in max-w-2xl mx-auto" style={{ animationDelay: '0.5s' }}>
          探索中华古典诗词的美妙意境，让AI助您创作出富有传统韵味的诗篇。
        </p>
        <div className="mt-10 opacity-0 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <a 
            href="#generator" 
            className="bg-cinnabar text-white px-8 py-3 rounded-md font-medium text-lg hover:bg-cinnabar-dark transition-colors"
          >
            开始创作
          </a>
        </div>
      </div>
      <div className="absolute -right-20 top-10 opacity-10">
        <div className="vertical-text text-9xl font-poetry">诗词歌赋</div>
      </div>
      <div className="absolute -left-20 bottom-10 opacity-10">
        <div className="vertical-text text-9xl font-poetry">韵律意境</div>
      </div>
    </section>
  );
};

export default Hero;
