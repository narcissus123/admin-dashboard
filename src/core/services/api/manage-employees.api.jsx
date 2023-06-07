import { instance } from "../interceptor/Interceptor";

export const createEmployee = async (obj) => {
  try {
    const response = await instance.post("/api/auth/employee/register", obj);
    return response.data;
  } catch (error) {
    return error;
  }
};

// Getting all instructors.
export const getInstructors = async () => {
  try {
    const response = await instance.get("/api/employee/getallteachers");
    return response.data;
  } catch (error) {
    return error;
  }
};

// Getting all employees (Admins/instructors).
export const getEmployees = async () => {
  try {
    const response = await instance.get("/api/employee/getall");
    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateEmployeeById = async (employeeId, employeeInfo) => {
  try {
    const response = await instance.put(
      `/api/employee/${employeeId}`,
      employeeInfo
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

// Activating employee
export const activeEmployee = async (employeeId) => {
  try {
    const response = await instance.put(`/api/employee/active/${employeeId}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

// Deactivating employee
export const deActiveEmployee = async (employeeId) => {
  try {
    const response = await instance.put(`/api/employee/deactive/${employeeId}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteEmployeeById = async (employeeId) => {
  try {
    const response = await instance.delete(`/api/employee/${employeeId}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const getlastteachers = async () => {
  try {
    const response = await instance.get(`/api/employee/getlastteachers`);
    return response.data;
  } catch (error) {
    return error;
  }
};
