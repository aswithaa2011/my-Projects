import { createElement } from "react";

const withClickHandler = (Component) => (props) => {

  const handleClick = () => {
    alert("Welcome from HOC ");
  };

  return createElement(Component, { handleClick, ...props });
};

export default withClickHandler;