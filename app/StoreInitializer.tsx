"use client";

import { useEffect, useRef } from "react";
import { useMainStore } from "@/lib/stores/mainStore";

export function StoreInitializer() {
  const user = useMainStore((state) => state.user);
  const fetchEntries = useMainStore((state) => state.fetchEntries);
  // const fetchTags = useMainStore((state) => state.fetchTags);
  
  const fetchedUserId = useRef<string | null>(null);

  useEffect(() => {
    if (user && user.id !== fetchedUserId.current) {
      console.log("Initializing data for user:", user.id);
      fetchEntries();
      // fetchTags();
      fetchedUserId.current = user.id;
    }
  }, [user, fetchEntries]);

  return null;
}