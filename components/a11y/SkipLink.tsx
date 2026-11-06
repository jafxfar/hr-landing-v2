import { a11y } from "@/content/landing";

export function SkipLink() {
  return (
    <a href="#content" className="skip-link">
      {a11y.skipToContent}
    </a>
  );
}
