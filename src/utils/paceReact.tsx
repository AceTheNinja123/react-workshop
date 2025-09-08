"use client"
import React, { useEffect } from 'react';

interface Props {
  children: React.ReactNode | React.ReactNode[]
}

export const PaceReact: React.FC<Props> = ({ children }) => {
  useEffect(() => {
    const pace = async () => {
      if (typeof window !== "undefined") {
        const Pace = (await import('pace-js')).default;
        const paceOptions = {
          ajax: {
            trackMethods: ['GET', 'POST'],
            trackWebSockets: true,
          },
          document: true,
          eventLag: false,
          restartOnPushState: true,
          theme: 'center-circle'
        };
        Pace.options = paceOptions;
        Pace.start();
      }
    }
    pace()
  }, []);
  return <>{children}</>
}