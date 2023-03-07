import {createAsyncThunk} from "@reduxjs/toolkit";

import customAxios from "../M5-Case/client/src/services/api";

export const getPosts = createAsyncThunk(
    'students/getStudents',
    async ()=>{
        const res = await customAxios.get('students')
        return res.data;
    }
)
export const addPosts = createAsyncThunk(
    'students/addStudents',
    async (data)=>{
        await customAxios.post('students',data)
        const res = await customAxios.get('')
        return res.data;
    }
)
export const deletePosts = createAsyncThunk(
    'students/deleteStudents',
    async (id)=>{
        const r = await customAxios.delete(`students/${id}`)
        console.log(r)
        const res = await customAxios.get('')
        return res.data;
    }
)
export const searchPosts = createAsyncThunk(
    'posts/searchPosts',
    async (a)=>{
        const res = await customAxios.get(`/search${a}`)
        console.log(res.data)
        return res.data;
    }
)