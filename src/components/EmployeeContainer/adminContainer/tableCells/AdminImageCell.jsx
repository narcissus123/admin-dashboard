import React from "react";
import { Avatar } from "@mui/material";

const AdminImageCell = ({ params }) => {
  return <Avatar src={params.profile} />;
};

export default React.memo(AdminImageCell);
