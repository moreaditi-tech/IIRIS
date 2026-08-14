import React from 'react';
import { Html } from '@react-three/drei';

export default class ModelErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("3D Model Loading Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Html center>
          <div className="flex flex-col items-center justify-center p-4 bg-black/80 backdrop-blur-md border border-red-500/30 rounded-lg whitespace-nowrap">
            <div className="w-6 h-6 mb-2 text-red-500">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            </div>
            <p className="text-xs font-mono text-red-400 uppercase tracking-widest">Model Data Corrupted</p>
            <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mt-1">Telemetry Offline</p>
          </div>
        </Html>
      );
    }
    return this.props.children;
  }
}
