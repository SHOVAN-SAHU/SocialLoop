import { setPosts } from "@/redux/postSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetRandomPosts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchRendomPost = async () => {
      try {
        const res = await axios.get(
          "https://socialloop-server.onrender.com/api/v1/posts/random",
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setPosts(res.data.posts));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRendomPost();
  }, []);
};

export default useGetRandomPosts;
