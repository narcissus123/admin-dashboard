import { setItem, clearStorage } from "../storage/Storage";
import { instance } from "../interceptor/Interceptor";

export const SignInEmployee = async (employeeInfo) => {
  try {
    const response = await instance.post(
      "/api/auth/employee/login",
      employeeInfo
    );

    if (response.status === 200) {
      const employee = JSON.stringify(response.data.result.employeeModel);
      const token = response.data.result.jwtToken;
      setItem("token", token);
      setItem("employee", employee);
    }

    return response;
  } catch (error) {
    return error;
  }
};

export const SignUpEmployee = async (employee) => {
  try {
    const response = await instance.post(
      "/api/auth/employee/register",
      employee
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const SignOutEmployee = async () => {
  try {
    clearStorage();
  } catch (error) {
    return error;
  }
};

export const getAllTeachers = async () => {
  try {
    const response = await instance.get("api/employee/getallteachers");
    return response.data;
  } catch (error) {
    return error;
  }
};
