"use client";

import { useState, useEffect } from "react";

export interface CMSData {
  hero: { tagline: string; description: string; ctaButton: string };
  whoWeAre: { paragraph1: string; paragraph2: string };
  vision: { text: string; quote: string; quoteAuthor: string };
  companies: Array<{ id: string; name: string; logo: string; logoStyle: string; description: string; href: string }>;
  pillars: Array<{ num: string; icon: string; title: string; description: string }>;
  team: Array<{ name: string; role: string; initials: string }>;
  departments: Array<{ id: string; icon: string; label: string; title: string; description: string }>;
  footer: { address: string; phone: string; email: string; copyright: string };
  site: { name: string };
}

export function useCMSData() {
  const [data, setData] = useState<CMSData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/cms")
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => { setError("Failed to load content"); setLoading(false); });
  }, []);

  return { data, loading, error };
}

export async function saveCMSData(data: CMSData): Promise<boolean> {
  try {
    const res = await fetch("/api/cms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.ok;
  } catch {
    return false;
  }
}
