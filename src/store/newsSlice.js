import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk(
  'news/fetchPosts',
  async ({ limit = 10, skip = 0 }) => {
    const response = await fetch(`https://dummyjson.com/posts?limit=${limit}&skip=${skip}`);
    const data = await response.json();
    return data;
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    posts: [],
    loading: false,
    hasMore: true,
    skip: 0,
    total: 0,
    error: null
  },
  reducers: {
    resetNews: (state) => {
      state.posts = [];
      state.skip = 0;
      state.hasMore = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        const { posts, total } = action.payload;
        
        const existingIds = new Set(state.posts.map(post => post.id));
        const newPosts = posts
          .filter(post => !existingIds.has(post.id))
          .map((post, index) => ({
            ...post,
            uniqueId: `${post.id}-${state.posts.length + index}-${Date.now()}`
          }));
        
        state.posts = [...state.posts, ...newPosts];
        state.total = total;
        state.skip += posts.length;
        
        state.hasMore = state.posts.length < total;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { resetNews } = newsSlice.actions;
export default newsSlice.reducer;