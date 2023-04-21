import { setItem, clearStorage } from "../storage/Storage";
import { instance } from "../interceptor/Interceptor";

const SignInEmployee = async (employeeInfo) => {
  try {
    const response = await instance.post(
      "/api/auth/employee/login",
      employeeInfo
    );

    const employee = JSON.stringify(response.data.result.employeeModel);
    const token = response.data.result.jwtToken;

    setItem("token", token);
    setItem("employee", employee);

    console.log(token);
    console.log(employee);

    return response.data;
  } catch (error) {
    console.log("error sign in: ", error);
    return error;
  }
};

const SignUpEmployee = async (employee) => {
  try {
    console.log("hello:");
    const response = await instance.post(
      "/api/auth/employee/register",
      employee
    );

    console.log(JSON.stringify(response));
    console.log(JSON.stringify(response.data));

    return response.data;
  } catch (error) {
    console.log("error sign up: ", error);
    return error;
  }
};

const SignOutEmployee = async () => {
  try {
    console.log("cleared");
    clearStorage();
  } catch (error) {
    console.log(error);
    return error;
  }
};

export { SignInEmployee, SignUpEmployee, SignOutEmployee };
