import styles from "./PromptCard.module.css";

export default function PromptCard({ prompt, model }) {
  return (
    <article className={styles.card} aria-label="Generation prompt">
      <p className={styles.text}>{prompt}</p>
      <div className={styles.footer}>
        <span className={styles.modelTag}>Model: {model}</span>
      </div>
    </article>
  );
}
