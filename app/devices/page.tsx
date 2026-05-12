"use client"

import DashboardPageLayout from "@/components/dashboard/layout"
import ProcessorIcon from "@/components/icons/proccesor"
import mockDataJson from "@/mock.json"
import type { MockData } from "@/types/dashboard"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { useState } from "react"

const mockData = mockDataJson as MockData

export default function ResourceManagementPage() {
  const [activeTab, setActiveTab] = useState<"units" | "camps">("units")

  const rescueUnits = mockData.rescueUnits || []
  const refugeeCamps = mockData.refugeeCamps || []

  const resourceData = [
    { name: "Rescue Equipment", available: 78, total: 100 },
    { name: "Medical Supplies", available: 92, total: 100 },
    { name: "Food & Water", available: 65, total: 100 },
    { name: "Shelter Kits", available: 54, total: 100 },
    { name: "Communication Gear", available: 88, total: 100 },
    { name: "Transport Vehicles", available: 71, total: 100 },
  ]

  return (
    <DashboardPageLayout
      header={{
        title: "RESOURCE MANAGEMENT",
        description: "Track and allocate emergency resources",
        icon: ProcessorIcon,
      }}
    >
      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="ring-2 ring-pop rounded-lg p-6 bg-background">
            <p className="text-sm text-muted-foreground mb-2">Rescue Units</p>
            <p className="text-4xl font-display mb-2">{rescueUnits.length}</p>
            <p className="text-xs text-green-400">
              ✓ {rescueUnits.filter((u) => u.status === "Deployed").length} deployed
            </p>
          </div>
          <div className="ring-2 ring-pop rounded-lg p-6 bg-background">
            <p className="text-sm text-muted-foreground mb-2">Refugee Camps</p>
            <p className="text-4xl font-display mb-2">{refugeeCamps.length}</p>
            <p className="text-xs text-blue-400">
              ✓ {refugeeCamps.reduce((a, c) => a + c.currentOccupancy, 0).toLocaleString()} occupants
            </p>
          </div>
          <div className="ring-2 ring-pop rounded-lg p-6 bg-background">
            <p className="text-sm text-muted-foreground mb-2">Overall Capacity</p>
            <p className="text-4xl font-display mb-2">89%</p>
            <p className="text-xs text-orange-400">↑ Increasing demand</p>
          </div>
          <div className="ring-2 ring-pop rounded-lg p-6 bg-background">
            <p className="text-sm text-muted-foreground mb-2">Critical Supplies</p>
            <p className="text-4xl font-display mb-2">12</p>
            <p className="text-xs text-red-400">⚠ Need urgent replenishment</p>
          </div>
        </div>

        {/* Resource Distribution Chart */}
        <div className="ring-2 ring-pop rounded-lg p-6 bg-background">
          <h3 className="text-lg font-display mb-4">Resource Availability Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={resourceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" angle={-45} textAnchor="end" height={100} />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #ff6b35" }} />
              <Bar dataKey="available" fill="#22c55e" radius={[8, 8, 0, 0]} />
              <Bar dataKey="total" fill="#ef4444" radius={[8, 8, 0, 0]} opacity={0.3} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab("units")}
            className={`px-4 py-2 rounded font-semibold text-sm transition ${
              activeTab === "units"
                ? "bg-primary text-background"
                : "bg-background border border-pop hover:border-primary"
            }`}
          >
            Rescue Units ({rescueUnits.length})
          </button>
          <button
            onClick={() => setActiveTab("camps")}
            className={`px-4 py-2 rounded font-semibold text-sm transition ${
              activeTab === "camps"
                ? "bg-primary text-background"
                : "bg-background border border-pop hover:border-primary"
            }`}
          >
            Refugee Camps ({refugeeCamps.length})
          </button>
        </div>

        {/* Rescue Units */}
        {activeTab === "units" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rescueUnits.map((unit) => (
              <div
                key={unit.id}
                className="ring-2 ring-pop rounded-lg p-6 bg-background hover:bg-background/80 transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-display text-lg">{unit.name}</h4>
                    <p className="text-sm text-muted-foreground">{unit.type}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded text-xs font-semibold ${
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

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="font-semibold">{unit.location}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Personnel:</span>
                    <span className="font-semibold">{unit.personnel} members</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Rescues:</span>
                    <span className="font-semibold text-green-400">{unit.rescuesCompleted} completed</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-muted-foreground mb-2">Equipment:</p>
                  <div className="flex flex-wrap gap-1">
                    {unit.equipment.map((item, idx) => (
                      <span key={idx} className="px-2 py-1 rounded text-xs bg-primary/20 text-primary">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-muted-foreground">
                  Last Update: {new Date(unit.lastUpdate).toLocaleTimeString()}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Refugee Camps */}
        {activeTab === "camps" && (
          <div className="space-y-4">
            {refugeeCamps.map((camp) => {
              const occupancyPercent = (camp.currentOccupancy / camp.capacity) * 100
              return (
                <div
                  key={camp.id}
                  className="ring-2 ring-pop rounded-lg p-6 bg-background hover:bg-background/80 transition"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-display">{camp.name}</h4>
                      <p className="text-sm text-muted-foreground">{camp.location}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded text-xs font-semibold ${
                        camp.healthCondition === "Stable"
                          ? "bg-green-500/20 text-green-400"
                          : camp.healthCondition === "Good"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-orange-500/20 text-orange-400"
                      }`}
                    >
                      {camp.healthCondition}
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-semibold">
                        Occupancy: {camp.currentOccupancy.toLocaleString()} / {camp.capacity.toLocaleString()}
                      </span>
                      <span className="text-primary font-semibold">{occupancyPercent.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-background border border-pop rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          occupancyPercent > 90
                            ? "bg-red-500"
                            : occupancyPercent > 70
                              ? "bg-orange-500"
                              : "bg-green-500"
                        }`}
                        style={{ width: `${occupancyPercent}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {camp.facilities.map((facility) => (
                      <span key={facility} className="px-2 py-1 rounded text-xs bg-primary/20 text-primary">
                        ✓ {facility}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Resource Timeline */}
        <div className="ring-2 ring-pop rounded-lg p-6 bg-background">
          <h3 className="text-lg font-display mb-4">Resource Usage Timeline (Last 5 Weeks)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={mockData.chartData.month || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #ff6b35" }} />
              <Legend />
              <Line type="monotone" dataKey="affected" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="rescued" stroke="#22c55e" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardPageLayout>
  )
}
