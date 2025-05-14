
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getPoemHistory } from '@/services/poemService';
import PoemDisplay from './PoemDisplay';

const PoemHistory: React.FC = () => {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const poemHistory = getPoemHistory();
    setHistory(poemHistory);
  }, []);

  if (history.length === 0) {
    return null;
  }

  return (
    <section id="history" className="py-16 px-4 bg-parchment-dark bg-opacity-30">
      <div className="poetry-container">
        <h2 className="text-3xl font-poetry mb-8 text-center">创作<span className="text-cinnabar">历史</span></h2>
        
        <div className="grid grid-cols-1 gap-6">
          {history.map((poem, index) => (
            <Card key={index} className="bg-white/80 border-ink/10">
              <CardContent className="py-6">
                <PoemDisplay poem={poem} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PoemHistory;
