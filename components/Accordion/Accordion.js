"use client";

import { useState } from "react";
import styles from "./Accordion.module.css";
import { ChevronDownIcon } from "@/components/icons";

export default function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = `accordion-${title.toLowerCase().replace(/\s/g, "-")}`;

  return (
    <div className={styles.accordion}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span>{title}</span>
        <ChevronDownIcon className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`} />
      </button>

      {open && (
        <div id={panelId} className={styles.panel} role="region" aria-label={title}>
          {children}
        </div>
      )}
    </div>
  );
}
