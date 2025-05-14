
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 px-4 border-t border-ink/10">
      <div className="container text-center">
        <p className="text-muted-foreground">
          © {new Date().getFullYear()} 诗韵生成器 | 探索中华古典诗词的美妙境界
        </p>
      </div>
    </footer>
  );
};

export default Footer;
