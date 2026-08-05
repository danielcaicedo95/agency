'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PageSEO, getDefaultSEO } from '@/lib/seo-defaults';

interface SEOMetadataProps {
  initialSEO?: PageSEO;
}

// Prepend the current origin to a path/URL stored in the data.
// If the value is already a full URL (starts with http), leave it as-is.
// If it's a relative path (starts with /), prefix window.location.origin.
// If it's empty, return empty so we skip setting the tag.
function toAbsolute(value: string | undefined, origin: string): string {
  if (!value) return '';
  if (value.startsWith('http')) return value;
  if (value.startsWith('/')) return `${origin}${value}`;
  return value;
}

export default function SEOMetadata({ initialSEO }: SEOMetadataProps) {
  const pathname = usePathname();
  const [seo, setSeo] = useState<PageSEO>(() => initialSEO || getDefaultSEO(pathname || '/'));

  useEffect(() => {
    let isMounted = true;
    const currentPath = pathname || '/';

    fetch(`/api/seo?path=${encodeURIComponent(currentPath)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (isMounted && data && data.title) {
          setSeo(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setSeo(getDefaultSEO(currentPath));
        }
      });

    return () => {
      isMounted = false;
    };
  }, [pathname]);

  useEffect(() => {
    if (!seo) return;

    // Detect domain at runtime — works on localhost, Vercel preview, and production
    const origin = typeof window !== 'undefined' ? window.location.origin : '';

    // 1. Title
    if (seo.title) document.title = seo.title;

    // 2. Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    if (seo.description) metaDesc.setAttribute('content', seo.description);

    // 3. Meta Robots
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', seo.robots || 'index, follow');

    // 4. Canonical — assemble full URL from origin + path
    const canonicalHref = toAbsolute(seo.canonicalUrl, origin);
    if (canonicalHref) {
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute('href', canonicalHref);
    }

    // 5. OpenGraph
    const updateOG = (property: string, content: string) => {
      if (!content) return;
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    if (seo.title) updateOG('og:title', seo.title);
    if (seo.description) updateOG('og:description', seo.description);
    if (canonicalHref) updateOG('og:url', canonicalHref);

    // 6. Hreflang alternate links — prepend origin to relative paths
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
    if (seo.hreflangs && Array.isArray(seo.hreflangs)) {
      seo.hreflangs.forEach((hf) => {
        if (!hf.lang) return;
        const href = toAbsolute(hf.url, origin);
        if (!href) return;
        const link = document.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', hf.lang);
        link.setAttribute('href', href);
        document.head.appendChild(link);
      });
    }

    // 7. JSON-LD Structured Data
    const existingJsonLd = document.getElementById('dynamic-jsonld');
    if (existingJsonLd) existingJsonLd.remove();
    if (seo.jsonLd) {
      try {
        // If JSON-LD contains the old hardcoded domain, replace with current origin
        const jsonText = (typeof seo.jsonLd === 'string' ? seo.jsonLd : JSON.stringify(seo.jsonLd))
          .replace(/https:\/\/danielcaicedo\.com/g, origin);
        const script = document.createElement('script');
        script.id = 'dynamic-jsonld';
        script.type = 'application/ld+json';
        script.text = jsonText;
        document.head.appendChild(script);
      } catch (err) {
        console.error('Invalid JSON-LD format:', err);
      }
    }
  }, [seo]);

  return null;
}
