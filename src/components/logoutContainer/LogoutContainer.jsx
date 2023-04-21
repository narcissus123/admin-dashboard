import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SignOutEmployee } from "../../core/services/api/Employee-authentication.api";
import { useAuth } from "../../utils/auth/Auth";
import { getItem } from "../../core/services/storage/Storage";

const LogoutContainer = () => {
  const history = useNavigate();
  const auth = useAuth();
  useEffect(() => {
    SignOutEmployee();
    console.log("succss:");

    auth.logout(Boolean(getItem("employee")) === true);
    history("/");
  });

  return null;
};

export { LogoutContainer };
