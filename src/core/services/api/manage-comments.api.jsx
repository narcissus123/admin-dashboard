import { instance } from "../interceptor/Interceptor";

export const getAllComments = async () => {
  try {
    const response = await instance.get("/api/comments/");
    return response;
  } catch (error) {
    return error;
  }
};

export const SendUserComments = async (obj) => {
  try {
    const response = await instance.post("/api/comments/send", obj);
    return response;
  } catch (error) {
    return error;
  }
};

export const sendCommentAnswer = async (commentId, answer) => {
  try {
    const response = await instance.post("api/comments/answer", {
      id: commentId,
      answer: answer,
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const sendCommentVerification = async (commentId) => {
  try {
    const response = await instance.post("/api/comments/verify", {
      id: commentId,
    });

    return response;
  } catch (error) {
    return error;
  }
};
