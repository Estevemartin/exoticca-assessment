import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';


const fetchPosts = () => {
  return axios.get("https://jsonplaceholder.typicode.com/posts").then(res=>res.data)
}
const addPost = async (post) => {
  return await axios.post("https://jsonplaceholder.typicode.com/posts",post)
}
const deletePost = async (postId) => {
  return await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`)
}
const editPost = async(post) => {
  return await axios.put(`https://jsonplaceholder.typicode.com/posts/${post.id}`,{post})
}


export const useFetchPost = () => {
  return useQuery(['fetch-posts'], fetchPosts)
}
export const useAddPost = () => {
  return useMutation(addPost)
}
export const useDeletePost = (postId) => {
  return useMutation(deletePost,postId)
}
export const useEditPost = (post) => {
  return useMutation(editPost,post)
}