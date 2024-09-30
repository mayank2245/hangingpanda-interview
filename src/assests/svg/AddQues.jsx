import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function addques(props) {
  return (
    <Svg
      width={30}
      height={24}
      viewBox="0 0 30 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M21.296 0H8.719C3.257 0 0 3.257 0 8.72v12.56c0 5.478 3.257 8.735 8.72 8.735h12.56c5.463 0 8.72-3.257 8.72-8.72V8.72C30.015 3.257 26.758 0 21.296 0zm-.285 16.133h-4.878v4.878c0 .615-.51 1.125-1.125 1.125-.616 0-1.126-.51-1.126-1.125v-4.878H9.004c-.615 0-1.125-.51-1.125-1.125 0-.616.51-1.126 1.125-1.126h4.878V9.004c0-.615.51-1.125 1.126-1.125.615 0 1.125.51 1.125 1.125v4.878h4.878c.615 0 1.125.51 1.125 1.126 0 .615-.51 1.125-1.125 1.125z"
        fill="#fff"
      />
    </Svg>
  );
}

export default addques;
