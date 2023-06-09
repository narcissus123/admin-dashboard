import { instance } from "../interceptor/Interceptor";

export const getCourses = async () => {
  try {
    const response = await instance.get("/api/course/getall");
    return response.data;
  } catch (error) {
    return error;
  }
};

// Add student to course.
export const addStudentToCourse = async (studenId, courseId) => {
  try {
    const response = await instance.post(
      `/api/course/addStudentToCourse/${studenId}`,
      {
        courseId: courseId,
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

// Delete course by id.
export const deleteCourseById = async (courseId) => {
  try {
    const response = await instance.delete(`/api/course/${courseId}`);
    return response;
  } catch (error) {
    return error;
  }
};

// Remove student from course.
export const removeStudentFromCourse = async (studenId, courseId) => {
  try {
    const response = await instance.post(
      `/api/course/removeStudentFromCourse/${studenId}`,
      {
        courseId: courseId,
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

// Create Course
export const createCourse = async (course) => {
  try {
    const response = await instance.post("/api/course", course);
    return response.data;
  } catch (error) {
    return error;
  }
};

// Update Course
export const updateCourse = async (courseId, course) => {
  try {
    const response = await instance.put(`api/course/${courseId}`, course);
    return response.data;
  } catch (error) {
    return error;
  }
};
