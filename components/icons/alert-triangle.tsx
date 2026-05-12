import type { SVGProps } from "react"
const AlertTriangleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2L2 20h20L12 2Z" />
    <path stroke="currentColor" strokeWidth={2} d="M12 9v4" />
    <circle cx={12} cy={17} r={0.5} fill="currentColor" />
  </svg>
)
export default AlertTriangleIcon
