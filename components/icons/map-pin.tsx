import type { SVGProps } from "react"
const MapPinIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 2c-4 0-6 3-6 7 0 4 6 11 6 11s6-7 6-11c0-4-2-7-6-7Z"
    />
    <circle cx={12} cy={9} r={2} fill="currentColor" />
  </svg>
)
export default MapPinIcon
