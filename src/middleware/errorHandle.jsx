
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export const ErrorFallback = ({ error, resetErrorBoundary }) => {
    const location = useLocation();
    const errorLocation = useRef(location.pathname);
    useEffect(() => {
        if (location.pathname !== errorLocation.current) {
            resetErrorBoundary();
        }
    }, [location.pathname, resetErrorBoundary])
    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <pre>{error.message}</pre>
            <button onClick={resetErrorBoundary}>Try again</button>
        </div>
    )
}

export const errorHandler = (error, errorInfo) => {
    console.log("Logging", error, errorInfo)
}