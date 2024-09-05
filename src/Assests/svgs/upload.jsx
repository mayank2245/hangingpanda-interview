import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function upload(props) {
  return (
    <Svg
      width={30}
      height={32}
      viewBox="0 0 30 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M28.421 12.932h-4.563c-3.742 0-6.79-3.048-6.79-6.79V1.58C17.068.71 16.358 0 15.49 0H8.796C3.932 0 0 3.158 0 8.795v13.99c0 5.636 3.932 8.794 8.795 8.794h12.41c4.863 0 8.795-3.158 8.795-8.795v-8.273c0-.869-.71-1.58-1.579-1.58zm-14.163 5.273a1.171 1.171 0 01-.837.348c-.3 0-.6-.11-.837-.348l-1.137-1.137v6.616c0 .648-.536 1.184-1.184 1.184a1.193 1.193 0 01-1.184-1.184v-6.616l-1.137 1.137a1.191 1.191 0 01-1.674 0 1.191 1.191 0 010-1.673l3.158-3.158a1.69 1.69 0 01.348-.237c.031-.016.079-.032.11-.048.095-.031.19-.047.3-.063h.127c.126 0 .252.032.379.08h.031c.126.047.253.141.347.236.016.016.032.016.032.032l3.158 3.158a1.191 1.191 0 010 1.673z"
        fill="#fff"
      />
      <Path
        d="M23.573 10.753c1.5.016 3.584.016 5.369.016.9 0 1.373-1.058.742-1.69C27.41 6.79 23.336 2.67 21 .333c-.648-.647-1.769-.205-1.769.695v5.51c0 2.306 1.958 4.216 4.342 4.216z"
        fill="#fff"
      />
    </Svg>
  );
}

export default upload;
