// useNotifications.ts
"use client"

import { useState, useCallback } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const client = new W3CWebSocket('ws://localhost:8000/ws/notifications/');

 
export const useNotifications = () => {
  const [notifications, setNotifications] = useState<string[]>([]);

  const connectWebSocket = useCallback(() => {
    if (typeof window !== 'undefined') {
      if (Notification.permission !== "granted") {
        Notification.requestPermission();
      }

      client.onopen = () => {
        console.log('WebSocket Client Connected');
      };

      client.onmessage = (message) => {
        const dataFromServer = JSON.parse(message.data);
        setNotifications((prevNotifications) => [...prevNotifications, dataFromServer.message]);
        new Notification("Product Notification", {
          body: dataFromServer.message,
        });
      };

      return () => {
        client.close();
      };
    }
  }, []);

  return { notifications, connectWebSocket };
};
