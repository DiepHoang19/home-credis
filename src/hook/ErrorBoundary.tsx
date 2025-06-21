import React from "react";

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
  error?: Error;
};

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Caught in ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
          <div className="max-w-md w-full border border-red-300 bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-red-500 text-4xl mb-4">⚠️</div>
            <h1 className="text-xl font-semibold text-red-700 mb-2">
              Something went wrong.
            </h1>
            <p className="text-sm text-red-600 break-words">
              {this.state.error?.message || "An unexpected error occurred."}
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
