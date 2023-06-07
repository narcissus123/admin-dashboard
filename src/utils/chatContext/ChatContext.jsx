import { createContext, useState, useContext } from "react";
import { useAuth } from "../auth/Auth";

const ChatContext = createContext(false);
export const ChatProvider = ({ children }) => {
  const [messageId, setMessengeId] = useState("");

  const handleMessanger = (id) => {
    setMessengeId(id);
  };

  const getStudentChat = (data) => {
    const userChat = data.filter(
      (message) => message.username.split(" ")[0] === "userChat"
    );

    return userChat;
  };

  const user = useAuth();

  const getAllChats = (data) => {
    const userChat = data.filter(
      (comment) =>
        (comment.username.split(" ")[0] === "userChat" ||
          comment.username.split(" ")[0] === "adminChat") &&
        user.isEmployee &&
        messageId === comment.postId
    );
    return userChat;
  };

  const getChatsById = (data, id) => {
    const userChat = data.filter(
      (comment) =>
        (comment.username.split(" ")[0] === "userChat" ||
          comment.username.split(" ")[0] === "adminChat") &&
        user.isEmployee &&
        id === comment.postId
    );
    return userChat;
  };

  return (
    <ChatContext.Provider
      value={{
        handleMessanger,
        messageId,
        getStudentChat,
        getAllChats,
        getChatsById,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  return useContext(ChatContext);
};
