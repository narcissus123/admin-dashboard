import React from "react";
import { Avatar } from "@mui/material";

const TermImageCell = ({ params }) => {
  return <Avatar src={params.lesson.image} />;
};

export default React.memo(TermImageCell);
