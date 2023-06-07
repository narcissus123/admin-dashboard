import React from "react";
import { Avatar } from "@mui/material";

const InstructorImageCell = ({ params }) => {
  return <Avatar src={params.profile} />;
};

export default React.memo(InstructorImageCell);
