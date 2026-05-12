"use client"

import DashboardPageLayout from "@/components/dashboard/layout"
import EmailIcon from "@/components/icons/email"
import mockDataJson from "@/mock.json"
import type { MockData } from "@/types/dashboard"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { useState } from "react"

const mockData = mockDataJson as MockData

export default function CitizenCommunicationPage() {
  const [selectedPriority, setSelectedPriority] = useState<"all" | "high" | "medium">("all")
  const [selectedType, setSelectedType] = useState<string>("all")

  const communicationLogs = mockData.communicationLogs || []
  const filteredLogs = communicationLogs.filter((log) => {
    if (selectedPriority === "all") return true
    return log.priority === selectedPriority
  })

  const messageStats = [
    { name: "Hour 1", sent: 240, received: 210 },
    { name: "Hour 2", sent: 320, received: 290 },
    { name: "Hour 3", sent: 410, received: 380 },
    { name: "Hour 4", sent: 580, received: 520 },
    { name: "Hour 5", sent: 720, received: 650 },
    { name: "Hour 6", sent: 847, received: 780 },
  ]

  return (
    <DashboardPageLayout
      header={{
        title: "CITIZEN COMMUNICATION",
        description: "Manage citizen alerts and updates",
        icon: EmailIcon,
      }}
    >
      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="ring-2 ring-pop rounded-lg p-6 bg-background">
            <p className="text-sm text-muted-foreground mb-2">Messages Sent Today</p>
            <p className="text-4xl font-display mb-2">2,847</p>
            <p className="text-xs text-green-400">↑ 24% from yesterday</p>
          </div>
          <div className="ring-2 ring-pop rounded-lg p-6 bg-background">
            <p className="text-sm text-muted-foreground mb-2">Active Alerts</p>
            <p className="text-4xl font-display mb-2">156</p>
            <p className="text-xs text-orange-400">⚠ 12 critical</p>
          </div>
          <div className="ring-2 ring-pop rounded-lg p-6 bg-background">
            <p className="text-sm text-muted-foreground mb-2">Response Rate</p>
            <p className="text-4xl font-display mb-2">94%</p>
            <p className="text-xs text-blue-400">Avg response: 4.2 min</p>
          </div>
          <div className="ring-2 ring-pop rounded-lg p-6 bg-background">
            <p className="text-sm text-muted-foreground mb-2">Citizen Engagement</p>
            <p className="text-4xl font-display mb-2">8.7K</p>
            <p className="text-xs text-purple-400">Active users online</p>
          </div>
        </div>

        {/* Message Traffic Chart */}
        <div className="ring-2 ring-pop rounded-lg p-6 bg-background">
          <h3 className="text-lg font-display mb-4">Message Traffic (Last 6 Hours)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={messageStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #ff6b35" }} />
              <Legend />
              <Line type="monotone" dataKey="sent" stroke="#ff6b35" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="received" stroke="#22c55e" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Message Type Filters */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedPriority("all")}
            className={`px-4 py-2 rounded font-semibold text-sm transition ${
              selectedPriority === "all"
                ? "bg-primary text-background"
                : "bg-background border border-pop hover:border-primary"
            }`}
          >
            All Messages
          </button>
          <button
            onClick={() => setSelectedPriority("high")}
            className={`px-4 py-2 rounded font-semibold text-sm transition ${
              selectedPriority === "high"
                ? "bg-red-500 text-background"
                : "bg-background border border-red-500/30 hover:border-red-500"
            }`}
          >
            High Priority
          </button>
          <button
            onClick={() => setSelectedPriority("medium")}
            className={`px-4 py-2 rounded font-semibold text-sm transition ${
              selectedPriority === "medium"
                ? "bg-orange-500 text-background"
                : "bg-background border border-orange-500/30 hover:border-orange-500"
            }`}
          >
            Medium Priority
          </button>
        </div>

        {/* Communication Logs */}
        <div className="ring-2 ring-pop rounded-lg p-6 bg-background">
          <h3 className="text-lg font-display mb-4">Communication Log</h3>
          <div className="space-y-3">
            {filteredLogs.map((log) => (
              <div
                key={log.id}
                className={`p-4 rounded border-l-4 transition hover:bg-background/80 ${
                  log.priority === "critical"
                    ? "border-l-red-500 bg-red-500/10 border border-red-500/20"
                    : log.priority === "high"
                      ? "border-l-orange-500 bg-orange-500/10 border border-orange-500/20"
                      : "border-l-blue-500 bg-blue-500/10 border border-blue-500/20"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-sm">{log.sender}</p>
                    <p className="text-xs text-muted-foreground">
                      {log.role} • {log.type}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        log.priority === "critical"
                          ? "bg-red-500/20 text-red-400"
                          : log.priority === "high"
                            ? "bg-orange-500/20 text-orange-400"
                            : "bg-blue-500/20 text-blue-400"
                      }`}
                    >
                      {log.priority.toUpperCase()}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">{new Date(log.timestamp).toLocaleTimeString()}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{log.message}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Broadcast Messages */}
        <div className="ring-2 ring-pop rounded-lg p-6 bg-background">
          <h3 className="text-lg font-display mb-4">Recent Broadcast Messages</h3>
          <div className="space-y-3">
            {[
              {
                title: "URGENT: Evacuation Order",
                desc: "Immediate evacuation required for zones A1-A5. Proceed to nearest shelter.",
                type: "critical",
                time: "2 min ago",
              },
              {
                title: "Safety Update: Water Supply",
                desc: "Water distribution centers are now operational in districts 3 & 7. Bring containers.",
                type: "info",
                time: "15 min ago",
              },
              {
                title: "Medical Assistance Available",
                desc: "Free medical camps set up at 5 locations. Check dashboard for nearest clinic.",
                type: "info",
                time: "28 min ago",
              },
              {
                title: "All Clear: Bridge Safe",
                desc: "City Central Bridge has been inspected and declared safe for traffic. Resume normal routes.",
                type: "success",
                time: "42 min ago",
              },
              {
                title: "Supply Distribution",
                desc: "Relief supplies being distributed at Community Centers. Bring ID for registration.",
                type: "info",
                time: "58 min ago",
              },
            ].map((msg, idx) => (
              <div
                key={idx}
                className={`p-4 rounded border-l-4 transition hover:bg-background/80 ${
                  msg.type === "critical"
                    ? "border-l-red-500 bg-red-500/10 border border-red-500/20"
                    : msg.type === "success"
                      ? "border-l-green-500 bg-green-500/10 border border-green-500/20"
                      : "border-l-blue-500 bg-blue-500/10 border border-blue-500/20"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <p className="font-semibold text-sm">{msg.title}</p>
                  <span className="text-xs text-muted-foreground">{msg.time}</span>
                </div>
                <p className="text-sm text-muted-foreground">{msg.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Engagement Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="ring-2 ring-pop rounded-lg p-6 bg-background">
            <h4 className="font-semibold text-sm mb-4">Message Types</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Evacuation Orders</span>
                <span className="font-bold text-primary">24%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Supply Updates</span>
                <span className="font-bold text-green-400">18%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Safety Alerts</span>
                <span className="font-bold text-orange-400">32%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Information</span>
                <span className="font-bold text-blue-400">26%</span>
              </div>
            </div>
          </div>

          <div className="ring-2 ring-pop rounded-lg p-6 bg-background">
            <h4 className="font-semibold text-sm mb-4">Platform Statistics</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">SMS Sent</span>
                <span className="font-bold">1,284</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Push Notifications</span>
                <span className="font-bold">847</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Emails Sent</span>
                <span className="font-bold">716</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Avg. Read Time</span>
                <span className="font-bold">3.2s</span>
              </div>
            </div>
          </div>

          <div className="ring-2 ring-pop rounded-lg p-6 bg-background">
            <h4 className="font-semibold text-sm mb-4">Channel Activity</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Web App</span>
                <span className="font-bold">3.2K</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Mobile App</span>
                <span className="font-bold">4.5K</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">SMS Gateway</span>
                <span className="font-bold">2.8K</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Radio/Broadcast</span>
                <span className="font-bold">1.2K</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardPageLayout>
  )
}
