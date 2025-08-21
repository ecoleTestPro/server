import { Logger } from '@/utils/console.util';
import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class EditorErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    Logger.error('Lexical Editor Error:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 border border-red-300 rounded-lg bg-red-50">
          <h3 className="text-red-800 font-medium">Editor Error</h3>
          <p className="text-red-600 text-sm mt-1">
            Something went wrong with the text editor. Please refresh the page and try again.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default EditorErrorBoundary;