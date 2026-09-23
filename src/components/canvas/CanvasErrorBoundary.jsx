import React from "react";

class CanvasErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn("3D Canvas rendering error caught gracefully:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className='w-full h-full flex items-center justify-center text-secondary text-sm p-4 text-center'>
            {/* Graceful fallback when WebGL is unavailable */}
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default CanvasErrorBoundary;
