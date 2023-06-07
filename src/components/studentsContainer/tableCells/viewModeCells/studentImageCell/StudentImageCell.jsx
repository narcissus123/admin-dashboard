import React from "react";
import { Avatar } from "@mui/material";

const StudentImageCell = ({ params }) => {
  return <Avatar src={params.profile} />;
};

export default React.memo(StudentImageCell);
