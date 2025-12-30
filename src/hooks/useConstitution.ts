import { useQuery } from '@apollo/client/react';
import { GET_EVENTS, GET_ARTICLES } from '../graphql/queries';

export interface Event {
  id: string;
  type: 'success' | 'failure' | 'warning' | 'info';
  title: string;
  description?: string;
  timestamp: string;
  component: string;
  agent?: string;
  metadata?: Record<string, unknown>;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  category: 'principle' | 'value' | 'protocol';
  last_updated: string;
  author?: string;
}

export function useEvents(cursor?: string) {
  const { data, loading, error, fetchMore } = useQuery<{
    events: Event[];
    next_cursor: string | null;
  }>(GET_EVENTS, {
    variables: { cursor },
    pollInterval: 3000, // Poll every 3 seconds for real-time feel
  });

  const loadMore = () => {
    if (data?.next_cursor) {
      return fetchMore({
        variables: { cursor: data.next_cursor },
      });
    }
  };

  return {
    events: data?.events || [],
    nextCursor: data?.next_cursor,
    loading,
    error,
    loadMore,
  };
}

export function useArticles() {
  const { data, loading, error } = useQuery<{ articles: Article[] }>(GET_ARTICLES);

  return {
    articles: data?.articles || [],
    loading,
    error,
  };
}
