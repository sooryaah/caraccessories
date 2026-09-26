import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Caught by Error Boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <h2>Oops! Something went wrong.</h2>
          <p>This browser might not be fully supported.</p>
          <p><strong>For the best experience, tap the 3 dots (...) in the top right and select "Open in System Browser" or "Open in Safari".</strong></p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
