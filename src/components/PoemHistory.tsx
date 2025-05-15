
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { getPoemHistory } from '@/services/poemService';
import PoemDisplay from './PoemDisplay';

const PoemHistory: React.FC = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const poemHistory = getPoemHistory();
    setHistory(poemHistory);
  }, [refresh]);

  const refreshCollections = () => {
    setRefresh(prev => prev + 1);
  };

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
                <PoemDisplay poem={poem} refreshCollections={refreshCollections} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PoemHistory;
