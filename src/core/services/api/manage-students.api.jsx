import { instance } from "../interceptor/Interceptor";

export const createStudent = async (obj) => {
  try {
    const response = await instance.post("/api/auth/register", obj);
    return response.data;
  } catch (error) {
    return error;
  }
};

// Getting all students
export const getStudents = async () => {
  try {
    const response = await instance.get("/api/student/getall");
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deactivateStudentById = async (studentId) => {
  try {
    const response = await instance.put(`/api/student/deactive/${studentId}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const activateStudentById = async (studentId) => {
  try {
    const response = await instance.put(`/api/student/active/${studentId}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateStudentInfoById = async (studentId, studentInfo) => {
  try {
    const response = await instance.put(
      `api/student/${studentId}`,
      studentInfo
    );

    return response;
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

export const deleteStudenById = async (studentId) => {
  try {
    const response = await instance.delete(`/api/student/${studentId}`);
    return response;
  } catch (error) {
    return error;
  }
};
