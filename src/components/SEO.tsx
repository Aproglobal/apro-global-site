import React, { useEffect } from "react";

type OpenGraph = {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  type?: "website" | "article" | "product" | string;
  siteName?: string;
  locale?: string;
};

type Twitter = {
  card?: "summary" | "summary_large_image" | "app" | "player";
  site?: string;     // @handle
  creator?: string;  // @handle
  image?: string;
};

type SEOProps = {
  title?: string;
  description?: string;
  canonical?: string;
  noindex?: boolean;
  og?: OpenGraph;
  twitter?: Twitter;
  jsonLd?: Record<string, any> | Record<string, any>[]; // one or multiple LD blocks
};

/** Ensures a <meta name="..."> exists and updates content */
function setMetaName(name: string, content?: string) {
  if (!content) return;
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/** Ensures a <meta property="..."> exists and updates content */
function setMetaProp(prop: string, content?: string) {
  if (!content) return;
  let el = document.querySelector<HTMLMetaElement>(`meta[property="${prop}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", prop);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/** Ensures a single canonical <link> */
function setCanonical(href?: string) {
  if (!href) return;
  let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

/** Inject or replace JSON-LD by id */
function setJsonLd(id: string, data?: Record<string, any> | Record<string, any>[]) {
  const prev = document.getElementById(id);
  if (prev) prev.remove();
  if (!data) return;
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = id;
  script.text = JSON.stringify(data);
  document.head.appendChild(script);
}

export default function SEO({
  title,
  description,
  canonical,
  noindex,
  og,
  twitter,
  jsonLd,
}: SEOProps) {
  useEffect(() => {
    if (title) document.title = title;

    setMetaName("description", description);
    setCanonical(canonical);

    if (noindex) {
      setMetaName("robots", "noindex, nofollow");
    }

    // Open Graph
    const origin = window.location.origin;
    const url = og?.url || canonical || window.location.href;
    const image = og?.image || "/assets/hero.jpg"; // fallback to your hero
    setMetaProp("og:type", og?.type || "website");
    setMetaProp("og:title", og?.title || title || "");
    setMetaProp("og:description", og?.description || description || "");
    setMetaProp("og:site_name", og?.siteName || "APRO");
    setMetaProp("og:locale", og?.locale || "en_US");
    setMetaProp("og:url", url);
    setMetaProp("og:image", image.startsWith("http") ? image : origin + image);

    // Twitter
    setMetaName("twitter:card", twitter?.card || "summary_large_image");
    if (twitter?.site) setMetaName("twitter:site", twitter.site);
    if (twitter?.creator) setMetaName("twitter:creator", twitter.creator);
    const twImg = twitter?.image || image;
    setMetaName("twitter:image", twImg.startsWith("http") ? twImg : origin + twImg);

    // JSON-LD
    setJsonLd("ld-primary", jsonLd);
  }, [title, description, canonical, noindex, og, twitter, jsonLd]);

  return null;
}
