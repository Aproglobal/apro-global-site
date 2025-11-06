import { useEffect } from "react";

type Props = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
};

export function SeoHead({ title, description, image = "/assets/hero.jpg", url }: Props) {
  useEffect(() => {
    if (title) document.title = title;

    const setMeta = (name: string, content?: string) => {
      if (!content) return;
      let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.name = name;
        document.head.appendChild(el);
      }
      el.content = content;
    };

    const setProp = (property: string, content?: string) => {
      if (!content) return;
      let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", property);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    setMeta("description", description);
    setProp("og:title", title);
    setProp("og:description", description);
    setProp("og:image", image);
    setProp("og:url", url || location.href);
  }, [title, description, image, url]);

  return null;
}
