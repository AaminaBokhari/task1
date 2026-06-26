import Image from "next/image";
import styles from "./ImageCard.module.css";

export default function ImageCard({ item }) {
  if (!item) {
    return <div className={styles.skeleton} aria-hidden="true" />;
  }

  if (item.type === "video") {
    return (
      <article className={styles.card}>
        <video
          className={styles.video}
          src={item.url}
          poster={item.poster}
          controls
          muted
          playsInline
          aria-label={item.alt}
        />
      </article>
    );
  }

  return (
    <article className={styles.card}>
      <Image
        src={item.url}
        alt={item.alt}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className={styles.image}
      />
    </article>
  );
}
