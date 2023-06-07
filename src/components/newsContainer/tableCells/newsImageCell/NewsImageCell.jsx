import React from "react";
import { Avatar } from "@mui/material";

const NewsImageCell = ({ params }) => {
  return <Avatar src={params.image} />;
};

export default React.memo(NewsImageCell);
