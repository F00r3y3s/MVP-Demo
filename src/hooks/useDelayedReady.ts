import { useState, useEffect } from 'react';

/**
 * Returns false immediately, then true after `ms` milliseconds.
 * Used to show skeleton loaders for a brief "loading feel" on fast screens.
 */
export function useDelayedReady(ms = 300): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), ms);
    return () => clearTimeout(timer);
  }, [ms]);

  return ready;
}
