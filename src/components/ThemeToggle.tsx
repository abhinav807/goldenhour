"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import styles from "./Navigation.module.css";

const storageKey = "gh-theme";
const readTheme = () => document.documentElement.dataset.theme === "dark";
const serverTheme = () => false;

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  const syncStorage = (event: StorageEvent) => {
    if (event.key !== storageKey && event.key !== null) return;
    document.documentElement.dataset.theme = event.newValue === "dark" ? "dark" : "light";
  };
  window.addEventListener("storage", syncStorage);
  return () => { observer.disconnect(); window.removeEventListener("storage", syncStorage); };
}

export default function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, readTheme, serverTheme);
  const label = `Switch to ${dark ? "light" : "dark"} mode`;
  function toggle() {
    const theme = readTheme() ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem(storageKey, theme); } catch { /* Theme still works when storage is unavailable. */ }
  }
  return <button type="button" data-theme-toggle className={styles.themeToggle} onClick={toggle} aria-label={label} title={label} aria-pressed={dark}>
    {dark ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
  </button>;
}
