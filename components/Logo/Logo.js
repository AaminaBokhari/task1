import styles from "./Logo.module.css";

export default function Logo({ className = "" }) {
  return (
    <svg
      className={`${styles.logo} ${className}`}
      viewBox="0 0 96 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M96 0H10L0 10V100L10 110H30V50H72V38H30V24H96V0Z"
        fill="currentColor"
      />
    </svg>
  );
}
