import { Badge } from "@/components/ui/badge"
import DashboardCard from "@/components/dashboard/card"
import type { SecurityStatus as SecurityStatusType } from "@/types/dashboard"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Bullet } from "@/components/ui/bullet"

const insightItemVariants = cva("border rounded-md ring-4", {
  variants: {
    variant: {
      success: "border-success bg-success/5 text-success ring-success/3",
      warning: "border-warning bg-warning/5 text-warning ring-warning/3",
      destructive: "border-destructive bg-destructive/5 text-destructive ring-destructive/3",
    },
  },
  defaultVariants: {
    variant: "success",
  },
})

interface AIInsightItemProps extends VariantProps<typeof insightItemVariants> {
  title: string
  value: string
  status: string
  className?: string
}

function AIInsightItem({ title, value, status, variant, className }: AIInsightItemProps) {
  return (
    <div className={cn(insightItemVariants({ variant }), className)}>
      <div className="flex items-center gap-2 py-1 px-2 border-b border-current">
        <Bullet size="sm" variant={variant} />
        <span className="text-sm font-medium">{title}</span>
      </div>
      <div className="py-1 px-2.5">
        <div className="text-2xl font-bold mb-1">{value}</div>
        <div className="text-xs opacity-50">{status}</div>
      </div>
    </div>
  )
}

interface AIInsightsProps {
  insights: SecurityStatusType[]
}

export default function AIInsights({ insights }: AIInsightsProps) {
  return (
    <DashboardCard
      title="AI INSIGHTS & RECOMMENDATIONS"
      intent="success"
      addon={<Badge variant="outline-success">AI POWERED</Badge>}
    >
      <div className="flex flex-col gap-4">
        <div className="bg-accent rounded-lg p-4 border border-border">
          <p className="text-sm leading-relaxed text-foreground">
            <strong>AI Summary:</strong> Deploy 3 rescue units to northern zone immediately. 82% probability of
            worsening flood intensity within 24 hours. Recommend evacuation of Block A and Block B. Medical facilities
            at Sector 5 ready to receive 200+ patients.
          </p>
        </div>

        <div className="max-md:order-1 grid grid-cols:3 md:grid-cols-1 gap-4 py-2 px-1 md:max-w-max">
          {insights.map((item, index) => (
            <AIInsightItem
              key={index}
              title={item.title}
              value={item.value}
              status={item.status}
              variant={item.variant}
            />
          ))}
        </div>
      </div>
    </DashboardCard>
  )
}
