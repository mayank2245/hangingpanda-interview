import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function add(props) {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M8 3.556c.368 0 .667.298.667.666v3.111h3.11a.667.667 0 010 1.334h-3.11v3.11a.667.667 0 01-1.334 0v-3.11h-3.11a.667.667 0 010-1.334h3.11v-3.11c0-.369.299-.667.667-.667z"
        fill="#D9D9D9"
      />
      <Path
        d="M0 2.889A2.889 2.889 0 012.889 0H13.11A2.889 2.889 0 0116 2.889V13.11A2.889 2.889 0 0113.111 16H2.89A2.889 2.889 0 010 13.111V2.89zm2.889-1.556c-.86 0-1.556.697-1.556 1.556V13.11c0 .86.697 1.556 1.556 1.556H13.11c.86 0 1.556-.697 1.556-1.556V2.89c0-.86-.697-1.556-1.556-1.556H2.89z"
        fill="#D9D9D9"
      />
    </Svg>
  );
}

export default add;
