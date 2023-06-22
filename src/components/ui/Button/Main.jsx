import React from "react";

/**
 * @function Button
 * @param {Object} props
 * @param {string} props.text - Text to display on the button
 * @param {Object} props.styles - Styles to apply to the button
 * @param {Function} props.onClick - Function to call when the button is clicked
 * @returns {JSX.Element}
 */

export const Button = (props) => {
  const { text, styles = {}, onClick } = props;
  return (
    <button
      style={{
        ...styles,
      }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default React.memo(Button);
