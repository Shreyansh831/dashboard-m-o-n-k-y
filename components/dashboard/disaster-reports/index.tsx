import { Badge } from "@/components/ui/badge"
import DashboardCard from "@/components/dashboard/card"
import type { RebelRanking } from "@/types/dashboard"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface DisasterReportsProps {
  reports: RebelRanking[]
}

export default function DisasterReports({ reports }: DisasterReportsProps) {
  const statusMap: { [key: string]: { color: string; icon: string } } = {
    pending: { color: "text-red-500", icon: "🔴" },
    in_progress: { color: "text-yellow-500", icon: "🟠" },
    resolved: { color: "text-green-500", icon: "🟢" },
  }

  return (
    <DashboardCard
      title="CITIZEN REPORTS & RESCUE STATUS"
      intent="default"
      addon={<Badge variant="outline-warning">847 ACTIVE</Badge>}
    >
      <div className="space-y-4">
        {reports.map((report, index) => {
          const statuses = ["pending", "in_progress", "resolved"]
          const status = statuses[index % 3] as keyof typeof statusMap
          const statusInfo = statusMap[status]

          return (
            <div key={report.id} className="flex items-center justify-between">
              <div className="flex items-center gap-1 w-full">
                <div
                  className={cn(
                    "flex items-center justify-center rounded text-sm font-bold px-1.5 mr-1 md:mr-2",
                    report.featured
                      ? "h-10 bg-primary text-primary-foreground"
                      : "h-8 bg-secondary text-secondary-foreground",
                  )}
                >
                  {report.id}
                </div>
                <div
                  className={cn(
                    "rounded-lg overflow-hidden bg-muted",
                    report.featured ? "size-14 md:size-16" : "size-10 md:size-12",
                  )}
                >
                  {report.avatar ? (
                    <Image
                      src={report.avatar || "/placeholder.svg"}
                      alt={report.name}
                      width={120}
                      height={120}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted" />
                  )}
                </div>
                <div
                  className={cn(
                    "flex flex-1 h-full items-center justify-between py-2 px-2.5 rounded",
                    report.featured && "bg-accent",
                  )}
                >
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span
                          className={cn("font-display", report.featured ? "text-xl md:text-2xl" : "text-lg md:text-xl")}
                        >
                          {report.name}
                        </span>
                        <span className="text-muted-foreground text-xs md:text-sm">{report.handle}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{statusInfo.icon}</span>
                        <Badge variant={status === "resolved" ? "secondary" : "default"}>
                          {status.replace("_", " ").toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    {report.subtitle && <span className="text-sm text-muted-foreground italic">{report.subtitle}</span>}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </DashboardCard>
  )
}
