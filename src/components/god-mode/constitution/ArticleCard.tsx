import { Article } from './mockData';
import { BookOpen, ArrowRight } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <div className="p-6 bg-[var(--gm-graphite)] rounded-lg border border-[var(--gm-graphite)] hover:border-[var(--gm-violet)] transition-colors group">
      <div className="flex items-center gap-3 mb-4">
        <BookOpen className="w-5 h-5 text-[var(--gm-violet)]" />
        <h3 className="text-sm font-bold text-[var(--gm-snow)] uppercase tracking-wider">
          {article.title}
        </h3>
      </div>
      
      <p className="text-sm text-[var(--gm-silver)] leading-relaxed mb-6 font-serif">
        {article.content}
      </p>
      
      <button className="flex items-center gap-2 text-xs text-[var(--gm-violet)] group-hover:text-[var(--gm-violet-light)] font-mono uppercase tracking-wider transition-colors">
        <span>Ask Nexus about this article</span>
        <ArrowRight className="w-3 h-3" />
      </button>
    </div>
  );
}
