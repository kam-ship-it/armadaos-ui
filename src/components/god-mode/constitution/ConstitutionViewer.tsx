import { useState } from 'react';
import { mockArticles, Article } from './mockData';
import { ArticleCard } from './ArticleCard';
import { SearchBar } from './SearchBar';

export function ConstitutionViewer() {
  const [articles, setArticles] = useState<Article[]>(mockArticles);

  const handleSearch = (query: string) => {
    if (!query) {
      setArticles(mockArticles);
      return;
    }
    const lowerQuery = query.toLowerCase();
    const filtered = mockArticles.filter(a => 
      a.title.toLowerCase().includes(lowerQuery) || 
      a.content.toLowerCase().includes(lowerQuery)
    );
    setArticles(filtered);
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-[var(--gm-snow)] uppercase tracking-wider">
          The Constitution
        </h2>
        <div className="w-64">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2">
        {articles.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
        
        {articles.length === 0 && (
          <div className="text-center py-12 text-[var(--gm-silver)]">
            No articles found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
