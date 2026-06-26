import Image from "next/image";
import { HISTORY_IMAGES } from "@/lib/data";
import styles from "./HistoryCarousel.module.css";

export default function HistoryCarousel() {
  const items = HISTORY_IMAGES.map((url, index) => ({
    id: `history-${index + 1}`,
    type: "image",
    url,
    alt: `Previously generated artwork ${index + 1}`,
  }));

  return (
    <section className={styles.carousel} aria-label="Generation history">
      <div className={styles.inner}>
        <div className={styles.bar}>
          <div className={styles.historyCard}>
            <span className={styles.historyTitle}>History</span>
            <a href="#history" className={styles.viewAll}>
              View All
            </a>
          </div>

          <div className={styles.divider} aria-hidden="true" />

          <div className={styles.scrollWrap}>
            <div className={styles.track}>
              {items.map((item) => (
                <div key={item.id} className={styles.thumbnail}>
                  <Image
                    src={item.url}
                    alt={item.alt}
                    fill
                    sizes="72px"
                    className={styles.thumbnailImage}
                  />
                </div>
              ))}
            </div>
            <div className={styles.fadeRight} aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
