import React, { useCallback, useEffect, useMemo } from "react";
type KeyHandler = (e: KeyboardEvent) => void;
type KeyMap = {
  [key: string]: KeyHandler;
};
export function useKeyboardShortcut(keyMap: KeyMap) {
  const memoizedKeyMap = useMemo(() => keyMap, [JSON.stringify(keyMap)]);
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const handler = memoizedKeyMap[key];
      if (
        handler &&
        (event.metaKey || event.ctrlKey || !memoizedKeyMap.requiresCmd)
      ) {
        event.preventDefault();
        handler(event);
      }
    },
    [memoizedKeyMap],
  );
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);
}
