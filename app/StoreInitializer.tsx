"use client";

import { useRef } from "react";
import { useMainStore } from "@/lib/stores/mainStore";
import { Entry } from "@/types/entry";
import { Tag } from "@/types/tag";

interface Props {
  entries: Entry[];
  tags: Tag[];
}

export function StoreInitializer({ entries, tags }: Props) {
  const initialized = useRef(false);

  if (!initialized.current) {
    // Storeのアクションを呼んでデータを注入！
    // useMainStore.getState().setInitialData(entries, tags);
    useMainStore.getState().setEntries(entries);
    useMainStore.getState().setTags(tags);
    initialized.current = true;
  }

  return null;
}