import { instance } from "../interceptor/Interceptor";

export const getAllLessons = async () => {
  try {
    const response = await instance.get("/api/lesson");
    return response.data;
  } catch (error) {
    return error;
  }
};

// Delete lesson by id.
export const deleteLessonById = async (lessonId) => {
  try {
    const response = await instance.delete(`/api/lesson/${lessonId}`);
    return response;
  } catch (error) {
    return error;
  }
};

// Update Lesson by id
export const UpdteLessonById = async (lessonId, lesson) => {
  try {
    const response = await instance.put(`api/lesson/${lessonId}`, lesson);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const addLesson = async (lesson) => {
  try {
    const response = await instance.post("api/lesson/add/", lesson);
    return response.data;
  } catch (error) {
    return error;
  }
};
