import {create} from 'zustand';

const usePostStore = create((set) => ({
    posts: [],
    createPost: (post) => set(state => ({ posts: [post, ...state.posts] })),
    setPosts: (posts) => set({ posts }),
    deletePost: (postId) => set((state) => ({ posts: state.posts.filter((post) => post.id !== postId) })),
    addComment: (postId, comment) => set((state) => ({
        posts: state.posts.map((post) => {
            if(post.id === postId){
                return {
                    ...post,
                    comments: [ ...post.comments, comment]
                }
            }
            return post;
        })
    }))
}))

export default usePostStore;