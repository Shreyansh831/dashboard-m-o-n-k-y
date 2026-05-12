import DashboardPageLayout from "@/components/dashboard/layout"
import DashboardStat from "@/components/dashboard/stat"
import DashboardChart from "@/components/dashboard/chart"
import DisasterReports from "@/components/dashboard/disaster-reports"
import AIInsights from "@/components/dashboard/ai-insights"
import AlertTriangleIcon from "@/components/icons/alert-triangle"
import WaterDropIcon from "@/components/icons/water-drop"
import FireIcon from "@/components/icons/fire"
import mockDataJson from "@/mock.json"
import type { MockData } from "@/types/dashboard"

const mockData = mockDataJson as MockData

// Icon mapping for disaster management
const iconMap = {
  waterDrop: WaterDropIcon,
  fire: FireIcon,
  alertTriangle: AlertTriangleIcon,
}

export default function DashboardOverview() {
  return (
    <DashboardPageLayout
      header={{
        title: "AI DAMAGE ASSESSMENT",
        description: "Last updated 12:05",
        icon: AlertTriangleIcon,
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {mockData.dashboardStats.map((stat, index) => (
          <DashboardStat
            key={index}
            label={stat.label}
            value={stat.value}
            description={stat.description}
            icon={iconMap[stat.icon as keyof typeof iconMap]}
            tag={stat.tag}
            intent={stat.intent}
            direction={stat.direction}
          />
        ))}
      </div>

      <div className="mb-6">
        <DashboardChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <DisasterReports reports={mockData.rebelsRanking} />
        <AIInsights insights={mockData.securityStatus} />
      </div>
    </DashboardPageLayout>
  )
}
