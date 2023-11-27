import {
    addDoc,
    collection,
    doc,
    getDocs,
    query,
    updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

const initialState = {
    posts: [],
    loading: false,
    error: null,
};

export const FETCH_POSTS = "postsReduer/FETCH_POSTS";
export const ADD_POST = "postsReduer/ADD_POST";
export const DELETE_POST = "postsReduer/DELETE_POST";
export const UPDATE_POST = "postsReduer/UPDATE_POST";

export const fetchPosts = () => async (dispatch) => {
    try {
        const q = query(collection(db, "posts"));
        const querySnapshot = await getDocs(q);
        const posts = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        dispatch({ type: FETCH_POSTS, payload: posts });
    } catch (error) {
        dispatch({ type: FETCH_POSTS, error });
    }
};

export const addPost = (newPost) => async (dispatch) => {
    try {
        const collectionRef = collection(db, "posts");
        const docRef = await addDoc(collectionRef, newPost);
        const newPostWithID = { ...newPost, id: docRef.id };
        dispatch({ type: ADD_POST, payload: newPostWithID });
        return docRef.id; // Return the new post's ID
    } catch (error) {
        dispatch({ type: ADD_POST, error });
        return null; // Return null or handle the error as needed
    }
};

export const deletePost = (postUpdate) => async (dispatch) => {
    try {
        const postRef = doc(db, "posts", postUpdate.id);
        const updateData = {
            title: postUpdate.title,
            content: postUpdate.content,
            selectedBread: postUpdate.selectedBread,
        };
        await updateDoc(postRef, updateData);
        dispatch({ type: UPDATE_POST, payload: postUpdate });
    } catch (error) {
        console.error({ type: UPDATE_POST, error });
    }
};

export const updatePost = (postId, updatedData) => async (dispatch) => {
    try {
        const postRef = doc(db, "posts", postId);
        await updateDoc(postRef, updatedData);
        dispatch({ type: UPDATE_POST, payload: updatedData });
    } catch (error) {
        console.error({ type: UPDATE_POST, error });
    }
};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POSTS:
            if (action.error) {
                return { ...state, loading: false, error: action.error };
            }
            return { ...state, loading: false, posts: action.payload };

        case ADD_POST:
            return {
                ...state,
                loading: false,
                posts: [action.payload, ...state.posts],
            };

        case UPDATE_POST:
            const updatedPosts = state.posts.map((post) => {
                if (post.id === action.payload.id) {
                    return { ...post, ...action.payload };
                }
                return post;
            });
            return { ...state, posts: updatedPosts };

        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter((post) => post.id !== action.payload),
            };

        default:
            return state;
    }
};

export default postsReducer;
