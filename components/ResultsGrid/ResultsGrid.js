import ImageCard from "@/components/ImageCard/ImageCard";
import PromptCard from "@/components/PromptCard/PromptCard";
import styles from "./ResultsGrid.module.css";

export default function ResultsGrid({ items, prompt, model, isLoading }) {
  const hasItems = items && items.length > 0;

  return (
    <section className={styles.grid} aria-label="Generated content" aria-busy={isLoading}>
      {!hasItems && !isLoading && (
        <p className={styles.empty}>
          Enter a prompt and click Generate to create artwork.
        </p>
      )}

      {isLoading && (
        <div className={styles.inner}>
          <div className={styles.promptColumn}>
            <div className={styles.promptSkeleton} aria-hidden="true" />
          </div>
          <div className={styles.imagesGrid}>
            {Array.from({ length: 8 }).map((_, index) => (
              <ImageCard key={`skeleton-${index}`} item={null} />
            ))}
          </div>
        </div>
      )}

      {hasItems && !isLoading && (
        <div className={styles.inner}>
          <div className={styles.promptColumn}>
            <PromptCard prompt={prompt} model={model} />
          </div>

          <div className={styles.imagesGrid}>
            {items.map((item) => (
              <ImageCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
