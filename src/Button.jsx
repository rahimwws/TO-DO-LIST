import React from "react";
export const Button = (props) => {
  console.log(props);
  return (
    <button
      className={props.className === 'red' ? 'red-btn':'btn'}
      onClick={props.onClick}
      style = {{background:props.color,}}
    >
      {props.children}
    </button>
  );
};
