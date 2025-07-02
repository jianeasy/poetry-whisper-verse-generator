import React from "react";
import { Book } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="py-4 px-6 border-b border-ink/10">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Book className="h-6 w-6 text-cinnabar" />
          <h1 className="text-2xl font-poetry">诗韵生成器</h1>
        </div>
        <nav>
          <ul className="flex gap-6">
            <li>
              <a
                href="#"
                className="text-ink/70 hover:text-cinnabar transition-colors"
              >
                首页
              </a>
            </li>
            <li>
              <a
                href="#collections"
                className="text-ink/70 hover:text-cinnabar transition-colors"
              >
                收藏
              </a>
            </li>
            {/* <li>
              <a
                href="#about"
                className="text-ink/70 hover:text-cinnabar transition-colors"
              >
                关于
              </a>
            </li> */}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
