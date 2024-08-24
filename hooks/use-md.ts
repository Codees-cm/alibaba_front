"use client"
import { useState, useEffect } from 'react';
import { marked } from 'marked';

export const useMarkdownContent = (link: unknown) => {
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error(`Failed to fetch the markdown file: ${response.statusText}`);
        }
        const markdown = await response.text();
        setContent(markdown);
      } catch (err) {
        setError(err.message);
      }
    };

    if (link) {
      fetchMarkdown();
    }
  }, [link]);

  return { content, error };
};
