import { instance } from "../interceptor/Interceptor";

// Getting all students
export const getStudents = async () => {
  try {
    const response = await instance.get("/api/student/getall");
    return response.data;
  } catch (error) {
    return error;
  }
};

// Getting student by id
export const getStudentById = async (studentId) => {
  try {
    const response = await instance.get(`/api/student/${studentId}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

// Activating student
export const activeStudent = async (studentId) => {
  try {
    const response = await instance.get(`/api/student/active/${studentId}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

// Deactivating student
export const deActiveStudent = async (studentId) => {
  try {
    const response = await instance.get(`/api/student/deactive/${studentId}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
