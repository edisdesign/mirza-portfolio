import { useEffect } from "react";

const BASE = "Mirza Smajlović";
const DEFAULT_DESC = "Portfolio akademskog slikara Mirze Smajlovića — figurativno i ekspresivno slikarstvo, ulje na platnu, Bosna i Hercegovina.";

export function usePageTitle(subtitle?: string, description?: string) {
  useEffect(() => {
    document.title = subtitle ? `${subtitle} — ${BASE}` : `${BASE} | Akademski Slikar`;

    // Update meta description
    const desc = description || DEFAULT_DESC;
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = desc;

    // OG tags
    const ogTags: Record<string, string> = {
      "og:title": subtitle ? `${subtitle} — ${BASE}` : `${BASE} | Akademski Slikar`,
      "og:description": desc,
      "og:type": "website",
      "og:site_name": BASE,
    };

    for (const [property, content] of Object.entries(ogTags)) {
      let ogMeta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!ogMeta) {
        ogMeta = document.createElement("meta");
        ogMeta.setAttribute("property", property);
        document.head.appendChild(ogMeta);
      }
      ogMeta.content = content;
    }

    return () => {
      document.title = `${BASE} | Akademski Slikar`;
    };
  }, [subtitle, description]);
}