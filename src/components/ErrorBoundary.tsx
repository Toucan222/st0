import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { trackError } from "../utils/analytics";
interface Props {
  children: React.ReactNode;
}
interface State {
  hasError: boolean;
  error?: Error;
}
export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }
  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      error,
    };
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    trackError(error);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-900 text-center">
          <div className="p-4 bg-red-500/10 rounded-full mb-4">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-xl font-bold text-white mb-2">
            Something went wrong
          </h1>
          <p className="text-gray-400 mb-6 max-w-md">
            We've encountered an unexpected error. Please try refreshing the
            page or contact support if the issue persists.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            <RefreshCw size={16} />
            Refresh Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
