import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function CrossIcon(props) {
  return (
    <Svg
      width={22}
      height={22}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M8.17 13.83l5.66-5.66M13.83 13.83L8.17 8.17M8 21h6c5 0 7-2 7-7V8c0-5-2-7-7-7H8C3 1 1 3 1 8v6c0 5 2 7 7 7z"
        stroke="#FF3856"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default CrossIcon;
