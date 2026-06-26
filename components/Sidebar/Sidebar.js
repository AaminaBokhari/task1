"use client";

import styles from "./Sidebar.module.css";
import Dropdown from "@/components/Dropdown/Dropdown";
import Accordion from "@/components/Accordion/Accordion";
import { SparkleIcon } from "@/components/icons";
import {
  ASPECT_RATIOS,
  IMAGE_COUNTS,
  MODELS,
} from "@/lib/data";

export default function Sidebar({
  contentType,
  onContentTypeChange,
  prompt,
  onPromptChange,
  imageCount,
  onImageCountChange,
  aspectRatio,
  onAspectRatioChange,
  model,
  onModelChange,
  onGenerate,
  isGenerating,
}) {
  return (
    <aside className={styles.sidebar} aria-label="Generation controls">
      <div className={styles.panel}>
        <div className={styles.tabs} role="tablist" aria-label="Content type">
          <button
            type="button"
            role="tab"
            aria-selected={contentType === "image"}
            className={`${styles.tab} ${contentType === "image" ? styles.tabActive : ""}`}
            onClick={() => onContentTypeChange("image")}
          >
            Image
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={contentType === "video"}
            className={`${styles.tab} ${contentType === "video" ? styles.tabActive : ""}`}
            onClick={() => onContentTypeChange("video")}
          >
            Video
          </button>
        </div>

        <div className={styles.promptArea}>
          <label htmlFor="prompt-input" className="sr-only">
            Describe your imagination
          </label>
          <textarea
            id="prompt-input"
            className={styles.textarea}
            placeholder="Describe you imaginations to be converted to piece of art ..."
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            rows={5}
          />
        </div>

        <button
          type="button"
          className={styles.generateBtn}
          onClick={onGenerate}
          disabled={isGenerating}
        >
          <SparkleIcon className="w-4 h-4" />
          {isGenerating ? "Generating..." : "Generate"}
        </button>

        <div className={styles.settings}>
          <Dropdown
            id="image-count"
            label="# Images"
            value={imageCount}
            options={IMAGE_COUNTS}
            onChange={(val) => onImageCountChange(Number(val))}
          />
          <Dropdown
            id="aspect-ratio"
            label={aspectRatio}
            value={aspectRatio}
            options={ASPECT_RATIOS}
            onChange={onAspectRatioChange}
          />
          <Dropdown
            id="model-select"
            label="Model: Name"
            value={model}
            options={MODELS}
            onChange={onModelChange}
          />
        </div>

        <div className={styles.accordions}>
          <Accordion title="Advance">
            <p>
              Fine-tune seed, guidance scale, and negative prompts for more
              control over your generations.
            </p>
          </Accordion>
          <Accordion title="Styles">
            <p>
              Choose from cinematic, anime, oil painting, and more preset
              styles to shape your output.
            </p>
          </Accordion>
        </div>
      </div>
    </aside>
  );
}
