'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PageSEO, getDefaultSEO } from '@/lib/seo-defaults';

interface SEOMetadataProps {
  initialSEO?: PageSEO;
}

export default function SEOMetadata({ initialSEO }: SEOMetadataProps) {
  const pathname = usePathname();
  const [seo, setSeo] = useState<PageSEO>(() => initialSEO || getDefaultSEO(pathname || '/'));

  useEffect(() => {
    let isMounted = true;
    const currentPath = pathname || '/';

    // Fetch dynamic metadata for current pathname
    fetch(`/api/seo?path=${encodeURIComponent(currentPath)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (isMounted && data && data.title) {
          setSeo(data);
        }
      })
      .catch(() => {
        // Fallback to client side default
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

    // 1. Update Title
    if (seo.title) {
      document.title = seo.title;
    }

    // 2. Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    if (seo.description) {
      metaDesc.setAttribute('content', seo.description);
    }

    // 3. Update Meta Robots
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', seo.robots || 'index, follow');

    // 4. Update Canonical Link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    if (seo.canonicalUrl) {
      linkCanonical.setAttribute('href', seo.canonicalUrl);
    }

    // 5. Update OpenGraph tags
    const updateOG = (property: string, content: string) => {
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
    if (seo.canonicalUrl) updateOG('og:url', seo.canonicalUrl);

    // 6. Update Hreflang alternate links
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
    if (seo.hreflangs && Array.isArray(seo.hreflangs)) {
      seo.hreflangs.forEach((hf) => {
        if (hf.lang && hf.url) {
          const link = document.createElement('link');
          link.setAttribute('rel', 'alternate');
          link.setAttribute('hreflang', hf.lang);
          link.setAttribute('href', hf.url);
          document.head.appendChild(link);
        }
      });
    }

    // 7. Update JSON-LD Structured Data
    const existingJsonLd = document.getElementById('dynamic-jsonld');
    if (existingJsonLd) {
      existingJsonLd.remove();
    }
    if (seo.jsonLd) {
      try {
        const script = document.createElement('script');
        script.id = 'dynamic-jsonld';
        script.type = 'application/ld+json';
        script.text = typeof seo.jsonLd === 'string' ? seo.jsonLd : JSON.stringify(seo.jsonLd);
        document.head.appendChild(script);
      } catch (err) {
        console.error('Invalid JSON-LD format:', err);
      }
    }
  }, [seo]);

  return null;
}
