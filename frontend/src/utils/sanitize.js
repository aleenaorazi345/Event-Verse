import DOMPurify from "dompurify";

/**
 * Escapes and sanitizes any string to prevent XSS attacks.
 * Use this if you are rendering user-generated content.
 */
export const sanitizeOutput = (text) => {
  if (!text) return "";
  // DOMPurify strips dangerous tags like <script> and returns safe HTML
  return DOMPurify.sanitize(text);
};