import type { SVGProps } from "react"
const SOSIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <circle cx={12} cy={12} r={10} stroke="currentColor" strokeWidth={2} />
    <text x={12} y={16} textAnchor="middle" fontSize={10} fontWeight="bold" fill="currentColor">
      SOS
    </text>
  </svg>
)
export default SOSIcon
