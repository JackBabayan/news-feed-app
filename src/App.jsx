import  { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spin, Typography } from 'antd';
import NewsCard from './components/NewsCard';
import { fetchPosts } from './store/newsSlice';
import './App.css';

const { Title, Text } = Typography;

const App = () => {
  const dispatch = useDispatch();
  const { posts, loading, hasMore, skip } = useSelector(state => state.news);

  useEffect(() => {
    dispatch(fetchPosts({ limit: 10, skip: 0 }));
  }, [dispatch]);

  const loadMorePosts = useCallback(() => {
    if (!loading && hasMore) {
      dispatch(fetchPosts({ limit: 10, skip }));
    }
  }, [dispatch, loading, hasMore, skip]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        loadMorePosts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMorePosts]);

  return (
    <div className="app-container">
      <Title level={1} className="app-title">
        Лента новостей
      </Title>
      

      <div className="news-list">
        {posts.map((post) => (
          <NewsCard key={post.uniqueId || `${post.id}-${Math.random()}`} post={post} />
        ))}
      </div>
      
      {loading && (
        <div className="loading-container">
          <Spin size="large" />
          <div className="loading-text">
            <Text>Загружаем новости...</Text>
          </div>
        </div>
      )}

      {!hasMore && posts.length > 0 && (
        <div className="end-message">
          <Text type="secondary">
            Все новости загружены! Всего: {posts.length} новостей
          </Text>
        </div>
      )}
    </div>
  );
};

export default App;