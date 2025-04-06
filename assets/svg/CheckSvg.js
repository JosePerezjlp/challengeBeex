import React from "react";
import { Svg, Path, Rect } from "react-native-svg";

const CheckSvg = ({ color = "#fff", bgColor = "#000" }) => {
  return (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      {/* Fondo negro del SVG */}
      <Rect width="16" height="16" fill={bgColor} rx="4" />
      {/* Tilde blanca */}
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.35832 10.9675L12.4711 5.89485C12.7919 5.57405 12.7919 5.0728 12.4711 4.752C12.1503 4.43119 11.649 4.43119 11.3282 4.752L6.75682 9.32342L4.61145 7.35851C4.29065 7.05776 3.7894 7.07781 3.48865 7.39861C3.20794 7.71941 3.22799 8.22067 3.5488 8.52142L6.25556 10.9876C6.57637 11.2883 7.05757 11.2683 7.35832 10.9675Z"
        fill={color}
      />
    </Svg>
  );
};

export default CheckSvg;
