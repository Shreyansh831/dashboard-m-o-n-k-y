"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import TVNoise from "@/components/ui/tv-noise";
import type { WidgetData } from "@/types/dashboard";
import Image from "next/image";

interface WidgetProps {
  widgetData: WidgetData;
}


const DISASTER_YOUTUBE_ID = "https://www.youtube.com/shorts/a9I5GppQQaI?feature=share"; // sample flood footage

export default function Widget({ widgetData }: WidgetProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState<"clock" | "split">("clock");
  const [camStatus, setCamStatus] = useState<"idle" | "loading" | "active" | "error">("idle");
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const startWebcam = useCallback(async () => {
    setCamStatus("loading");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 640 }, height: { ideal: 360 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCamStatus("active");
    } catch {
      setCamStatus("error");
    }
  }, []);

  const stopWebcam = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setCamStatus("idle");
  }, []);

  useEffect(() => {
    if (activeTab === "split") startWebcam();
    else stopWebcam();
  }, [activeTab, startWebcam, stopWebcam]);

  useEffect(() => () => stopWebcam(), [stopWebcam]);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-US", { hour12: true, hour: "numeric", minute: "2-digit" });

  const formatDate = (date: Date) => ({
    dayOfWeek: date.toLocaleDateString("en-US", { weekday: "long" }),
    restOfDate: date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
  });

  const dateInfo = formatDate(currentTime);

  return (
    <Card className="w-full aspect-[2] relative overflow-hidden">
      <TVNoise opacity={0.3} intensity={0.2} speed={40} />

      {/* Tab switcher */}
      <div className="absolute top-2 right-2 z-30 flex gap-1">
        <button
          onClick={() => setActiveTab("clock")}
          className={`px-2 py-0.5 text-[10px] uppercase font-medium rounded transition-colors ${
            activeTab === "clock"
              ? "bg-primary text-primary-foreground"
              : "bg-accent/60 text-muted-foreground hover:bg-accent"
          }`}
        >
          Clock
        </button>
        <button
          onClick={() => setActiveTab("split")}
          className={`px-2 py-0.5 text-[10px] uppercase font-medium rounded transition-colors ${
            activeTab === "split"
              ? "bg-primary text-primary-foreground"
              : "bg-accent/60 text-muted-foreground hover:bg-accent"
          }`}
        >
          📡 Live
        </button>
      </div>

      {/* CLOCK VIEW */}
      {activeTab === "clock" && (
        <CardContent className="bg-accent/30 flex-1 flex flex-col justify-between text-sm font-medium uppercase relative z-20 h-full">
          <div className="flex justify-between items-center">
            <span className="opacity-50">{dateInfo.dayOfWeek}</span>
            <span>{dateInfo.restOfDate}</span>
          </div>
          <div className="text-center">
            <div className="text-5xl font-display" suppressHydrationWarning>
              {formatTime(currentTime)}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="opacity-50">{widgetData.temperature}</span>
            <span>{widgetData.location}</span>
            <Badge variant="secondary" className="bg-accent">
              {widgetData.timezone}
            </Badge>
          </div>
          <div className="absolute inset-0 -z-[1]">
            <Image
              src="/assets/pc_blueprint.gif"
              alt="logo"
              width={250}
              height={250}
              className="size-full object-contain"
            />
          </div>
        </CardContent>
      )}

      {/* SPLIT VIEW: Webcam (left) + YouTube (right) */}
      {activeTab === "split" && (
        <div className="absolute inset-0 z-20 flex bg-black">

          {/* LEFT — Webcam */}
          <div className="relative w-1/2 h-full border-r border-white/10">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />

            {/* Webcam label */}
            <div className="absolute top-1.5 left-1.5 flex items-center gap-1 bg-black/60 px-1.5 py-0.5 rounded text-[9px] uppercase text-white/80">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              Camera
            </div>

            {camStatus === "loading" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-[10px] uppercase text-green-400 tracking-widest animate-pulse">
                Connecting...
              </div>
            )}
            {camStatus === "error" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 gap-2">
                <span className="text-red-400 text-[10px] uppercase tracking-widest">Access Denied</span>
                <button
                  onClick={startWebcam}
                  className="text-[9px] px-2 py-0.5 border border-red-400 text-red-400 rounded hover:bg-red-400/10 transition"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Bottom time overlay */}
            {camStatus === "active" && (
              <div className="absolute bottom-0 left-0 right-0 px-2 py-1 bg-black/50 text-[9px] text-white/60 uppercase text-center" suppressHydrationWarning>
                {formatTime(currentTime)}
              </div>
            )}
          </div>

          {/* RIGHT — YouTube Disaster Video */}
          <div className="relative w-1/2 h-full">
            <iframe
              src={`https://www.youtube.com/embed/${DISASTER_YOUTUBE_ID}?autoplay=1&mute=1&loop=1&playlist=${DISASTER_YOUTUBE_ID}&controls=0&modestbranding=1&rel=0`}
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Disaster Feed"
            />

            {/* YouTube label */}
            <div className="absolute top-1.5 left-1.5 flex items-center gap-1 bg-black/60 px-1.5 py-0.5 rounded text-[9px] uppercase text-white/80 pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              Disaster Feed
            </div>
          </div>

        </div>
      )}
    </Card>
  );
}