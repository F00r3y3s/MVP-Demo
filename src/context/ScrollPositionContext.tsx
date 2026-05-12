import React, { createContext, useContext, useRef, useLayoutEffect } from 'react';
import { ScreenName } from '../types';

// Module-level Map — persists across React render cycles, cleared on full app reload
const scrollMap = new Map<ScreenName, number>();

interface ScrollPositionContextValue {
  record: (screen: ScreenName, scrollTop: number) => void;
  restore: (screen: ScreenName) => number;
}

const ScrollPositionContext = createContext<ScrollPositionContextValue>({
  record: () => {},
  restore: () => 0,
});

export const ScrollPositionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const record = (screen: ScreenName, scrollTop: number) => {
    scrollMap.set(screen, scrollTop);
  };

  const restore = (screen: ScreenName): number => {
    return scrollMap.get(screen) ?? 0;
  };

  return (
    <ScrollPositionContext.Provider value={{ record, restore }}>
      {children}
    </ScrollPositionContext.Provider>
  );
};

/**
 * Hook that records scrollTop on unmount and restores it (via useLayoutEffect) on mount.
 * The consuming component must attach the returned ref to its scroll container element.
 */
export function useScrollPreservation(screen: ScreenName) {
  const { record, restore } = useContext(ScrollPositionContext);
  const ref = useRef<HTMLDivElement>(null);

  // Restore position after paint on mount
  useLayoutEffect(() => {
    const el = ref.current;
    if (el) {
      el.scrollTop = restore(screen);
    }
    // Cleanup: record position on unmount
    return () => {
      if (el) {
        record(screen, el.scrollTop);
      }
    };
  }, [screen]); // eslint-disable-line react-hooks/exhaustive-deps

  return ref;
}
