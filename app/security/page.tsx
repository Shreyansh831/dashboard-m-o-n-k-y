"use client"

import DashboardPageLayout from "@/components/dashboard/layout"
import CuteRobotIcon from "@/components/icons/cute-robot"
import mockDataJson from "@/mock.json"
import type { MockData } from "@/types/dashboard"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useState } from "react"

const mockData = mockDataJson as MockData

export default function SecuritySafetyPage() {
  const [selectedThreat, setSelectedThreat] = useState<string | null>("all")

  const threats = [
    {
      id: "structural",
      name: "Structural Damage Risk",
      level: "HIGH",
      color: "red",
      details: "Multiple buildings at risk in affected zones",
      affectedAreas: 8,
    },
    {
      id: "disease",
      name: "Disease Outbreak Risk",
      level: "MODERATE",
      color: "orange",
      details: "Water contamination detected",
      affectedAreas: 5,
    },
    {
      id: "infrastructure",
      name: "Infrastructure Failure",
      level: "MEDIUM",
      color: "blue",
      details: "Power lines and bridges compromised",
      affectedAreas: 12,
    },
    {
      id: "landslide",
      name: "Landslide Risk",
      level: "HIGH",
      color: "red",
      details: "Hilly regions showing instability",
      affectedAreas: 3,
    },
    {
      id: "sanitation",
      name: "Sanitation Crisis",
      level: "MODERATE",
      color: "orange",
      details: "Sewage systems overwhelmed",
      affectedAreas: 7,
    },
  ]

  const safetyProtocols = [
    { name: "Evacuation Routes", status: "Active", count: 47 },
    { name: "Shelters Deployed", status: "Active", count: "18/25" },
    { name: "Emergency Hotline", status: "Operating", count: "24/7" },
    { name: "Quarantine Zones", status: "Active", count: "12/12" },
    { name: "Medical Checkpoints", status: "Active", count: 32 },
    { name: "Supply Distribution", status: "Active", count: 23 },
  ]

  return (
    <DashboardPageLayout
      header={{
        title: "SECURITY & SAFETY",
        description: "Monitor threat levels and safety protocols",
        icon: CuteRobotIcon,
      }}
    >
      <div className="space-y-6">
        {/* Overall Safety Score */}
        <div className="ring-2 ring-pop rounded-lg p-6 bg-background">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-display mb-2">Overall Safety Index</h3>
              <p className="text-sm text-muted-foreground">Based on all threat and protocol assessments</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-display text-orange-400 mb-2">6.2/10</div>
              <p className="text-xs text-muted-foreground">Moderate Risk</p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={mockData.chartData.week || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" domain={[0, 100]} />
              <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #ff6b35" }} />
              <Area type="monotone" dataKey="pending" fill="#ef4444" stroke="#ef4444" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Threat Assessment */}
        <div>
          <h3 className="text-lg font-display mb-4">Active Threats Assessment</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {threats.map((threat) => (
              <div
                key={threat.id}
                onClick={() => setSelectedThreat(threat.id)}
                className={`p-4 rounded border-2 cursor-pointer transition-all ${
                  selectedThreat === threat.id
                    ? "border-primary bg-primary/10"
                    : `border-${threat.color}-500/30 hover:border-${threat.color}-500`
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold">{threat.name}</h4>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold bg-${threat.color}-500/20 text-${threat.color}-400`}
                  >
                    {threat.level}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{threat.details}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Affected Areas:</span>
                  <span className="font-semibold">{threat.affectedAreas}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Protocols Status */}
        <div className="ring-2 ring-pop rounded-lg p-6 bg-background">
          <h3 className="text-lg font-display mb-4">Active Safety Protocols</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {safetyProtocols.map((protocol) => (
              <div
                key={protocol.name}
                className="p-4 rounded border border-pop bg-background/50 hover:bg-background/80 transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-sm">{protocol.name}</h4>
                  <span className="px-2 py-1 rounded text-xs bg-green-500/20 text-green-400 font-semibold">
                    {protocol.status}
                  </span>
                </div>
                <p className="text-2xl font-display text-primary">{protocol.count}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Threat Metrics */}
        <div className="ring-2 ring-pop rounded-lg p-6 bg-background">
          <h3 className="text-lg font-display mb-4">Threat Risk Levels by Zone</h3>
          <div className="space-y-4">
            {[
              { zone: "Delhi North", risk: 95, color: "red" },
              { zone: "Raipur Central", risk: 78, color: "orange" },
              { zone: "Lucknow South", risk: 72, color: "orange" },
              { zone: "Mumbai Coast", risk: 45, color: "yellow" },
              { zone: "Surat Urban", risk: 32, color: "green" },
            ].map((item) => (
              <div key={item.zone} className="p-4 rounded border border-pop">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-sm">{item.zone}</span>
                  <span className={`text-sm font-bold text-${item.color}-500`}>{item.risk}%</span>
                </div>
                <div className="w-full bg-background border border-pop rounded-full h-2 overflow-hidden">
                  <div className={`bg-${item.color}-500 h-full`} style={{ width: `${item.risk}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Alerts */}
        <div className="ring-2 ring-pop rounded-lg p-6 bg-background">
          <h3 className="text-lg font-display mb-4">Security Alerts & Notifications</h3>
          <div className="space-y-3">
            {[
              {
                id: 1,
                type: "critical",
                msg: "Structural failure imminent in Sector 12 - Building C",
                time: "2 min ago",
              },
              { id: 2, type: "warning", msg: "Water contamination detected - 3 zones affected", time: "8 min ago" },
              { id: 3, type: "info", msg: "Evacuation route 5 reopened - traffic normal", time: "15 min ago" },
              {
                id: 4,
                type: "critical",
                msg: "Disease outbreak suspected - quarantine zone 7 activated",
                time: "28 min ago",
              },
            ].map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded border-l-4 transition ${
                  alert.type === "critical"
                    ? "border-l-red-500 bg-red-500/10 border border-red-500/20"
                    : alert.type === "warning"
                      ? "border-l-orange-500 bg-orange-500/10 border border-orange-500/20"
                      : "border-l-blue-500 bg-blue-500/10 border border-blue-500/20"
                }`}
              >
                <div className="flex justify-between">
                  <p className="text-sm font-semibold">{alert.msg}</p>
                  <span className="text-xs text-muted-foreground">{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardPageLayout>
  )
}
