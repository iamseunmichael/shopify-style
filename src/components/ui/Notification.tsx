"use client";

import { useEffect } from "react";
import { connectWebSocket } from "@/lib/websocket";

export default function Notifications() {
  useEffect(() => {
    const socket = connectWebSocket();

    return () => socket.close();
  }, []);

  return null;
}