import React from "react";

const Icon = ({ name, ...props }) => {
  const Component = require(`./${name}`).default;
  if (!Component) return false;
  return <Component {...props} />;
};

Icon.displayName = "Icon";

export default Icon;