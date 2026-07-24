import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

const ShellContext = createContext(null);

export function ShellProvider({ children }) {
  const [shellProps, setShellPropsState] = useState({});

  const setShellProps = useCallback((props) => {
    setShellPropsState((prev) => {
      // Basic shallow equality check to prevent unnecessary re-renders
      let changed = false;
      const keys = new Set([...Object.keys(prev), ...Object.keys(props)]);
      for (let key of keys) {
        if (prev[key] !== props[key]) {
          changed = true;
          break;
        }
      }
      return changed ? { ...props } : prev;
    });
  }, []);

  const value = useMemo(() => ({
    shellProps,
    setShellProps
  }), [shellProps, setShellProps]);

  return (
    <ShellContext.Provider value={value}>
      {children}
    </ShellContext.Provider>
  );
}

export function useShell() {
  const context = useContext(ShellContext);
  if (!context) {
    return { shellProps: {}, setShellProps: () => {} };
  }
  return context;
}
