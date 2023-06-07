import { instance } from "../interceptor/Interceptor";

export const getNews = async () => {
  try {
    const response = await instance.get("/api/news");
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getNewsByPage = async (pagenumber, pagesize) => {
  try {
    const response = await instance.get(
      `/api/news/list?pagenumber=${pagenumber}&pagesize=${pagesize}&category=news`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getNewsById = async (newsId) => {
  try {
    const response = await instance.get(`/api/news/${newsId}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getTopNews = async () => {
  try {
    const response = await instance.get(`api/news/topNews`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateNewsById = async (newsId, news) => {
  try {
    const response = await instance.put(`api/news/${newsId}`, news);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteNewsById = async (newsId) => {
  try {
    const response = await instance.delete(`/api/news/${newsId}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const addnews = async (news) => {
  try {
    const response = await instance.post("/api/news", news);
    return response.data;
  } catch (error) {
    return error;
  }
};
