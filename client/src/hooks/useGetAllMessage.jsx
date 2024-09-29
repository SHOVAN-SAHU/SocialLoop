import { setChatRendering, setMessages } from "@/redux/chatSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllMessages = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.auth);
  useEffect(() => {
    dispatch(setChatRendering(true));
    const fetchAllMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/messages/${selectedUser?._id}/get`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setMessages(res.data.messages));
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setChatRendering(false));
      }
    };
    fetchAllMessages();
  }, [selectedUser]);
};

export default useGetAllMessages;
