import type { SVGProps } from "react"
const FireIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 2s-2 3-2 6c0 2 1 3 1 5 0 3-2 4-2 4s0-3-2-5c-2-2-3-4-3-8 0-4 3-6 8-6Z"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 2s0 3 2 6c2 3 2 4 2 6 0 3-1 5-2 6"
    />
    <ellipse cx={12} cy={20} rx={4} ry={2} fill="currentColor" opacity={0.3} />
  </svg>
)
export default FireIcon
