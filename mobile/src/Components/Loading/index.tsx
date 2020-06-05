import React from "react";
import { Spinner } from "./style";

interface Load {
  size: number;
  color: string;
}

const Loading = (props: Load) => {
  return <Spinner />;
};

export default Loading;
