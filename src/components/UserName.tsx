"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const NAME_KEY = "torties-visitor-name";

type UserNameContextValue = {
  name: string | null;
  ready: boolean;
  dismissed: boolean;
  setName: (name: string) => void;
  dismiss: () => void;
};

const UserNameContext = createContext<UserNameContextValue | null>(null);

export function UserNameProvider({ children }: { children: ReactNode }) {
  const [name, setNameState] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(NAME_KEY);
      if (stored) setNameState(stored);
    } catch {
      // localStorage unavailable (private mode, etc.) — fall back to asking every visit
    }
    setReady(true);
  }, []);

  const setName = (value: string) => {
    setNameState(value);
    try {
      window.localStorage.setItem(NAME_KEY, value);
    } catch {}
  };

  return (
    <UserNameContext.Provider
      value={{ name, ready, dismissed, setName, dismiss: () => setDismissed(true) }}
    >
      {children}
    </UserNameContext.Provider>
  );
}

export function useUserName() {
  const ctx = useContext(UserNameContext);
  if (!ctx) throw new Error("useUserName must be used within a UserNameProvider");
  return ctx;
}
