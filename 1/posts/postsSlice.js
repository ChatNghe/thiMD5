import {createSlice} from "@reduxjs/toolkit";
import {getPosts, deletePosts, searchPosts, addPosts} from "../postsService";

const initialState = {
    posts: [],
    loading: true
}
const postsSlice = createSlice({
        name: 'posts',
        initialState,
        reducers: {},
        extraReducers: builder => {
            builder.addCase(getPosts.fulfilled, (state, action) => {
                state.posts = action.payload
                state.loading = false
            });
            builder.addCase(searchPosts.fulfilled, (state, action) => {
                state.posts = action.payload
                state.loading = false
            });
            builder.addCase(addPosts.fulfilled, (state, action) => {
                state.posts.push(action.payload)
            })
            builder.addCase(deletePosts.fulfilled, (state, action) => {
                state.posts = action.payload
            })
        }
    }
)
export default postsSlice.reducer;