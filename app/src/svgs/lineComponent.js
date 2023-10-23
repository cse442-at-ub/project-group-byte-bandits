import { Svg, Rect } from "react-native-svg";

const LineComponent = (props) => (
  <Svg
    width="150"
    height="15"
    viewBox="0 0 200 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Rect
      width="200"
      height="15"
      rx="7.5"
      transform="matrix(1 0 0 -1 0 15)"
      fill="#3B4D4F"
    />
  </Svg>
);

export default LineComponent;
