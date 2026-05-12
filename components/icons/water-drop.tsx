import type { SVGProps } from "react"
const WaterDropIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 2c0 0-8 8-8 13a8 8 0 1 0 16 0c0-5-8-13-8-13Z"
    />
    <circle cx={12} cy={15} r={1} fill="currentColor" />
  </svg>
)
export default WaterDropIcon
