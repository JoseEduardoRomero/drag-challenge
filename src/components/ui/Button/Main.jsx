import React from "react";
import buttonStyles from '../../../styles/ui/Button/Button.module.css';

/**
 * @function Button
 * @param {Object} props
 * @param {string} props.text - Text to display on the button
 * @param {Object} props.styles - Styles to apply to the button
 * @param {Function} props.onClick - Function to call when the button is clicked
 * @returns {JSX.Element}
 */

export const Button = (props) => {
  const { text, onClick, styles= {} } = props;
  return (
    <button
      className={buttonStyles.button}
      onClick={onClick}
      style={styles}
    >
      {text}
    </button>
  );
};

export default React.memo(Button);
