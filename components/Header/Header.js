"use client";

import Link from "next/link";
import Logo from "@/components/Logo/Logo";
import styles from "./Header.module.css";
import { useTheme } from "@/components/ThemeProvider/ThemeProvider";
import {
  NavHomeIcon,
  NavImageIcon,
  NavVideoIcon,
  NavWandIcon,
  NavFolderIcon,
} from "@/components/icons/navIcons";
import {
  GalleryIcon,
  SupportIcon,
  MoonIcon,
  SunIcon,
} from "@/components/icons";
import Image from "next/image";

const NAV_ITEMS = [
  { id: "home", label: "Home", icon: NavHomeIcon, active: true },
  { id: "image", label: "Images", icon: NavImageIcon },
  { id: "video", label: "Video", icon: NavVideoIcon },
  { id: "edit", label: "Edit", icon: NavWandIcon },
  { id: "folder", label: "Projects", icon: NavFolderIcon },
];

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const activeIndex = NAV_ITEMS.findIndex((item) => item.active);
  const progressWidth = `${((activeIndex + 1) / NAV_ITEMS.length) * 100}%`;

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label="Home">
          <Logo />
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
          <div className={styles.navStack}>
            <div
              className={styles.progressTrack}
              role="progressbar"
              aria-valuenow={activeIndex + 1}
              aria-valuemin={1}
              aria-valuemax={NAV_ITEMS.length}
              aria-label="Navigation progress"
            >
              <div
                className={styles.progressFill}
                style={{ width: progressWidth }}
              />
            </div>

            <div className={styles.navIcons}>
              {NAV_ITEMS.map(({ id, label, icon: Icon, active }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`${styles.navItem} ${active ? styles.navItemActive : ""}`}
                  aria-label={label}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon className={styles.navIcon} />
                </a>
              ))}
            </div>
          </div>
        </nav>

        <div className={styles.actions}>
          <a href="#gallery" className={styles.actionLink}>
            <GalleryIcon className="w-4 h-4" />
            <span>Gallery</span>
          </a>
          <a href="#support" className={styles.actionLink}>
            <SupportIcon className="w-4 h-4" />
            <span>Support</span>
          </a>
          <button
            type="button"
            className={styles.iconButton}
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={isDark}
          >
            {isDark ? (
              <SunIcon className="w-5 h-5" />
            ) : (
              <MoonIcon className="w-5 h-5" />
            )}
          </button>
          <Image
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop"
            alt="User profile"
            width={32}
            height={32}
            className={styles.avatar}
          />
        </div>
      </div>
    </header>
  );
}
