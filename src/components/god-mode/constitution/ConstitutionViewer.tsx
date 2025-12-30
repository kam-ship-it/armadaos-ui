import { useState } from 'react';
import { useArticles } from '@/hooks/useConstitution';
import { ArticleCard } from './ArticleCard';
import { SearchBar } from './SearchBar';

export function ConstitutionViewer() {
  const [searchQuery, setSearchQuery] = useState('');
  const { articles, loading, error } = useArticles();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Client-side filtering for now
  const filteredArticles = articles.filter(a => {
    if (!searchQuery) return true;
    const lowerQuery = searchQuery.toLowerCase();
    return a.title.toLowerCase().includes(lowerQuery) || 
           a.content.toLowerCase().includes(lowerQuery);
  });

  // Error state
  if (error) {
    return (
      <div className="flex flex-col h-full space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-[var(--gm-snow)] uppercase tracking-wider">
            The Constitution
          </h2>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-400 font-mono mb-2">Failed to load articles</p>
            <p className="text-[var(--gm-silver)] text-sm">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
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
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-[var(--gm-obsidian)] border border-[var(--gm-silver)]/20 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

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
        {filteredArticles.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
        
        {filteredArticles.length === 0 && (
          <div className="text-center py-12 text-[var(--gm-silver)]">
            {searchQuery ? 'No articles found matching your search.' : 'No articles available.'}
          </div>
        )}
      </div>
    </div>
  );
}
