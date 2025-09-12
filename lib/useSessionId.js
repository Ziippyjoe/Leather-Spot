'use client';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export function useSessionId() {
  const [sessionId, setSessionId] = useState(uuidv4()); // Initialize with temporary UUID

  useEffect(() => {
    // Only access localStorage on the client side
    if (typeof window !== 'undefined') {
      let id = localStorage.getItem('sessionId');
      if (!id) {
        id = uuidv4();
        localStorage.setItem('sessionId', id);
      }
      setSessionId(id);
      console.log('useSessionId: Set sessionId:', id); // Debug log
    }
  }, []);

  return sessionId;
}