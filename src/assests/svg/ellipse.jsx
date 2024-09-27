import * as React from "react"
import Svg, { Circle } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={85}
      height={85}
      viewBox="0 0 85 85"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={42.5} cy={42.5} r={40.5} stroke="#FF3856" strokeWidth={4} />
    </Svg>
  )
}

export default SvgComponent

