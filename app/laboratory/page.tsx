"use client"

import DashboardPageLayout from "@/components/dashboard/layout"
import AtomIcon from "@/components/icons/atom"
import mockDataJson from "@/mock.json"
import type { MockData } from "@/types/dashboard"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { useState } from "react"

const mockData = mockDataJson as MockData

export default function RealTimeMonitorPage() {
  const [selectedZone, setSelectedZone] = useState<string | null>(null)

  const sosAlerts = mockData.sosAlerts || []
  const rescueUnits = mockData.rescueUnits || []

  return (
    <DashboardPageLayout
      header={{
        title: "REAL-TIME MONITOR",
        description: "Live disaster tracking and analysis",
        icon: AtomIcon,
      }}
    >
      <div className="space-y-6">
        {/* Disaster Zone Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="ring-2 ring-pop rounded-lg p-6 bg-background">
            <p className="text-sm text-muted-foreground mb-2">Total Affected Population</p>
            <p className="text-4xl font-display mb-2">847K</p>
            <p className="text-xs text-red-400">↑ 12% from last hour</p>
          </div>
          <div className="ring-2 ring-pop rounded-lg p-6 bg-background">
            <p className="text-sm text-muted-foreground mb-2">Active SOS Alerts</p>
            <p className="text-4xl font-display mb-2">{sosAlerts.length}</p>
            <p className="text-xs text-orange-400">
              ↑ {sosAlerts.filter((a) => a.status === "In Progress").length} in progress
            </p>
          </div>
          <div className="ring-2 ring-pop rounded-lg p-6 bg-background">
            <p className="text-sm text-muted-foreground mb-2">Rescue Success Rate</p>
            <p className="text-4xl font-display mb-2">87%</p>
            <p className="text-xs text-green-400">↑ Up from 84%</p>
          </div>
        </div>

        {/* Zone Status with Interactive Selection */}
        <div className="ring-2 ring-pop rounded-lg p-6 bg-background">
          <h3 className="text-lg font-display mb-4">Disaster Zones Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { name: "Delhi", level: "Critical", percent: 72, color: "red" },
              { name: "Raipur", level: "High", percent: 54, color: "orange" },
              { name: "Lucknow", level: "High", percent: 68, color: "orange" },
              { name: "Patna", level: "Moderate", percent: 61, color: "yellow" },
              { name: "Mumbai", level: "Moderate", percent: 23, color: "yellow" },
              { name: "Surat", level: "Low", percent: 31, color: "blue" },
            ].map((zone) => (
              <div
                key={zone.name}
                onClick={() => setSelectedZone(zone.name)}
                className={`p-4 rounded border-2 cursor-pointer transition-all ${
                  selectedZone === zone.name ? "border-primary bg-primary/10" : "border-pop hover:border-primary/50"
                }`}
              >
                <div className="flex justify-between mb-2">
                  <p className="font-semibold">{zone.name}</p>
                  <span className={`text-sm font-bold text-${zone.color}-500`}>{zone.percent}%</span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{zone.level}</p>
                <div className="w-full bg-background border border-pop rounded-full h-2 overflow-hidden">
                  <div className={`bg-${zone.color}-500 h-full`} style={{ width: `${zone.percent}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Flood Impact Analysis Chart */}
        <div className="ring-2 ring-pop rounded-lg p-6 bg-background">
          <h3 className="text-lg font-display mb-4">Affected vs Rescued by Region</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockData.chartData.week || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #ff6b35" }} />
              <Legend />
              <Bar dataKey="affected" fill="#ef4444" radius={[8, 8, 0, 0]} />
              <Bar dataKey="rescued" fill="#22c55e" radius={[8, 8, 0, 0]} />
              <Bar dataKey="pending" fill="#eab308" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* System Health and Rescue Units */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* System Status */}
          <div className="ring-2 ring-pop rounded-lg p-6 bg-background">
            <h3 className="text-lg font-display mb-4">System Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded bg-background border border-pop">
                <span className="text-sm font-semibold">Monitoring Network</span>
                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs">Active</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded bg-background border border-pop">
                <span className="text-sm font-semibold">Data Sync Status</span>
                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs">Synced</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded bg-background border border-pop">
                <span className="text-sm font-semibold">Alert System</span>
                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs">Armed</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded bg-background border border-pop">
                <span className="text-sm font-semibold">Network Latency</span>
                <span className="text-xs font-semibold">45ms</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded bg-background border border-pop">
                <span className="text-sm font-semibold">Server Health</span>
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs">Optimal</span>
              </div>
            </div>
          </div>

          {/* Active Rescue Units */}
          <div className="ring-2 ring-pop rounded-lg p-6 bg-background">
            <h3 className="text-lg font-display mb-4">Active Rescue Units ({rescueUnits.length})</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {rescueUnits.map((unit) => (
                <div
                  key={unit.id}
                  className="p-3 rounded border border-pop bg-background/50 hover:bg-background/80 transition"
                >
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-sm font-semibold">{unit.name}</p>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        unit.status === "Deployed"
                          ? "bg-green-500/20 text-green-400"
                          : unit.status === "En Route"
                            ? "bg-orange-500/20 text-orange-400"
                            : "bg-blue-500/20 text-blue-400"
                      }`}
                    >
                      {unit.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{unit.location}</p>
                  <p className="text-xs text-pop mt-1">✓ {unit.rescuesCompleted} rescues completed</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SOS Alerts Table */}
        <div className="ring-2 ring-pop rounded-lg p-6 bg-background">
          <h3 className="text-lg font-display mb-4">Active SOS Alerts</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-pop">
                  <th className="text-left py-3 px-2 font-semibold">Location</th>
                  <th className="text-left py-3 px-2 font-semibold">People</th>
                  <th className="text-left py-3 px-2 font-semibold">Severity</th>
                  <th className="text-left py-3 px-2 font-semibold">Status</th>
                  <th className="text-left py-3 px-2 font-semibold">Assigned Unit</th>
                </tr>
              </thead>
              <tbody>
                {sosAlerts.map((alert) => (
                  <tr key={alert.id} className="border-b border-pop/30 hover:bg-background/50 transition">
                    <td className="py-3 px-2">{alert.location}</td>
                    <td className="py-3 px-2 font-semibold">{alert.people}</td>
                    <td className="py-3 px-2">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          alert.severity === "Critical"
                            ? "bg-red-500/20 text-red-400"
                            : alert.severity === "High"
                              ? "bg-orange-500/20 text-orange-400"
                              : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {alert.severity}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          alert.status === "In Progress"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-orange-500/20 text-orange-400"
                        }`}
                      >
                        {alert.status}
                      </span>
                    </td>
                    <td className="py-3 px-2">{alert.arrivedUnit || "Dispatching..."}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardPageLayout>
  )
}
