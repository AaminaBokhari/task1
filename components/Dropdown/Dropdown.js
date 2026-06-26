"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Dropdown.module.css";
import { ChevronDownIcon } from "@/components/icons";

export default function Dropdown({ label, value, options, onChange, id }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.dropdown} ref={ref}>
      <button
        type="button"
        id={id}
        className={styles.trigger}
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={styles.label}>{label}</span>
        <ChevronDownIcon className={styles.chevron} />
      </button>

      {open && (
        <ul className={styles.menu} role="listbox" aria-labelledby={id}>
          {options.map((option) => (
            <li key={option} role="option" aria-selected={option === value}>
              <button
                type="button"
                className={`${styles.option} ${option === value ? styles.optionActive : ""}`}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
