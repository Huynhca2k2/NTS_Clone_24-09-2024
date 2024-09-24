import React from "react";

interface CustomIconProps {
  width?: number | string;
  height?: number | string;
  fill?: string;
}

const CustomUpnOutline: React.FC<CustomIconProps> = ({
  width = 12,
  height = 12,
  fill = "#28A645",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 12"
      fill="none"
      transform="rotate(180 0 0)"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.9998 8.5501C5.8873 8.5501 5.79355 8.5126 5.6998 8.4376L1.3873 4.2001C1.21855 4.03135 1.21855 3.76885 1.3873 3.6001C1.55605 3.43135 1.81855 3.43135 1.9873 3.6001L5.9998 7.51885L10.0123 3.5626C10.1811 3.39385 10.4436 3.39385 10.6123 3.5626C10.7811 3.73135 10.7811 3.99385 10.6123 4.1626L6.2998 8.4001C6.20605 8.49385 6.1123 8.5501 5.9998 8.5501Z"
        fill={fill}
      />
    </svg>
  );
};

export default CustomUpnOutline;
