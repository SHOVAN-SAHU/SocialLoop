import { setUserProfile } from "@/redux/authSlice";
import { setProfileRendering } from "@/redux/suggestedSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetUserProfile = (userId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setProfileRendering(true));
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(
          `https://socialloop-server.onrender.com/api/v1/users/${userId}/profile`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setUserProfile(res.data.user));
          console.log(res.data.user);
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setProfileRendering(false));
      }
    };
    if (userId) fetchUserProfile();
  }, [userId, dispatch]);
};

export default useGetUserProfile;
