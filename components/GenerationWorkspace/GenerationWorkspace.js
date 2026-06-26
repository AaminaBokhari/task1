"use client";

import { useCallback, useEffect, useState } from "react";
import Header from "@/components/Header/Header";
import HistoryCarousel from "@/components/HistoryCarousel/HistoryCarousel";
import Sidebar from "@/components/Sidebar/Sidebar";
import ResultsGrid from "@/components/ResultsGrid/ResultsGrid";
import { DEFAULT_PROMPT } from "@/lib/data";
import styles from "./GenerationWorkspace.module.css";

export default function GenerationWorkspace() {
  const [contentType, setContentType] = useState("image");
  const [prompt, setPrompt] = useState("");
  const [displayPrompt, setDisplayPrompt] = useState(DEFAULT_PROMPT);
  const [imageCount, setImageCount] = useState(8);
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [model, setModel] = useState("Flux Pro");
  const [items, setItems] = useState([]);
  const [resultModel, setResultModel] = useState("Flux Pro");
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  const fetchResults = useCallback(async (options) => {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options),
    });

    const data = await response.json();
    setItems(data.items || []);
    setResultModel(data.model || options.model);
    setDisplayPrompt(data.prompt || options.prompt || DEFAULT_PROMPT);
    return data;
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadInitial() {
      setIsLoading(true);
      try {
        await fetchResults({
          type: "image",
          count: 8,
          prompt: DEFAULT_PROMPT,
          model: "Flux Pro",
        });
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadInitial();
    return () => {
      cancelled = true;
    };
  }, [fetchResults]);

  async function handleGenerate() {
    setIsGenerating(true);
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      await fetchResults({
        type: contentType,
        count: imageCount,
        prompt: prompt.trim() || DEFAULT_PROMPT,
        model,
      });
    } finally {
      setIsGenerating(false);
      setIsLoading(false);
    }
  }

  return (
    <>
      <Header />
      <HistoryCarousel />
      <div className={styles.workspace}>
        <div className={styles.main}>
          <Sidebar
            contentType={contentType}
            onContentTypeChange={setContentType}
            prompt={prompt}
            onPromptChange={setPrompt}
            imageCount={imageCount}
            onImageCountChange={setImageCount}
            aspectRatio={aspectRatio}
            onAspectRatioChange={setAspectRatio}
            model={model}
            onModelChange={setModel}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
          />
          <ResultsGrid
            items={items}
            prompt={displayPrompt}
            model={resultModel}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
}
