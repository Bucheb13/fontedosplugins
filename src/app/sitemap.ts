import { MetadataRoute } from "next";

const SITE_URL = "https://www.fontedosplugins.com.br";

type ItemComSlug = {
  id: string;
  slug: string;
  updated_at?: string;
  imagem_capa_url?: string | null;
};

async function safeFetch<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { cache: "no-store" });
    return await res.json();
  } catch {
    return null;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // =====================
  // PÁGINAS FIXAS
  // =====================
  const paginasFixas: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}`, lastModified: new Date(), priority: 1.0 },
    { url: `${SITE_URL}/assinaturas`, lastModified: new Date(), priority: 0.8 },
    { url: `${SITE_URL}/contato`, lastModified: new Date(), priority: 0.6 },
    { url: `${SITE_URL}/termos-de-uso`, lastModified: new Date(), priority: 0.3 },
    { url: `${SITE_URL}/privacidade`, lastModified: new Date(), priority: 0.3 },
    { url: `${SITE_URL}/plugins`, lastModified: new Date(), priority: 0.9 },
    { url: `${SITE_URL}/daws`, lastModified: new Date(), priority: 0.9 },
    { url: `${SITE_URL}/drum-kit`, lastModified: new Date(), priority: 0.9 },
    { url: `${SITE_URL}/programas`, lastModified: new Date(), priority: 0.8 },
  ];

  // =====================
  // DADOS DINÂMICOS DAS APIS
  // =====================
  const [pluginsRes, dawsRes, drumKitsRes, programasRes] = await Promise.all([
    safeFetch<{ plugins: ItemComSlug[] }>(`${SITE_URL}/api/plugins`),
    safeFetch<{ daws: ItemComSlug[] }>(`${SITE_URL}/api/daws`),
    safeFetch<{ drumKits: ItemComSlug[] }>(`${SITE_URL}/api/drum-kit`),
    safeFetch<{ programas: ItemComSlug[] }>(`${SITE_URL}/api/programas`),
  ]);

  // =====================
  // FUNÇÃO AUXILIAR PARA CRIAR URL DINÂMICA
  // =====================
  function mapItemToSitemap(item: ItemComSlug, basePath: string, priority = 0.7): MetadataRoute.Sitemap[0] {
    const lastMod = item.updated_at ? new Date(item.updated_at) : new Date();
    const images = item.imagem_capa_url ? [item.imagem_capa_url] : undefined;
    return {
      url: `${SITE_URL}/${basePath}/${item.slug}`,
      lastModified: lastMod,
      priority,
      images,
    };
  }

  // =====================
  // URLs DINÂMICAS
  // =====================
  const pluginsUrls: MetadataRoute.Sitemap =
    pluginsRes?.plugins?.map(item => mapItemToSitemap(item, "plugins", 0.85)) ?? [];

  const dawsUrls: MetadataRoute.Sitemap =
    dawsRes?.daws?.map(item => mapItemToSitemap(item, "daws", 0.85)) ?? [];

  const drumKitsUrls: MetadataRoute.Sitemap =
    drumKitsRes?.drumKits?.map(item => mapItemToSitemap(item, "drum-kit", 0.8)) ?? [];

  const programasUrls: MetadataRoute.Sitemap =
    programasRes?.programas?.map(item => mapItemToSitemap(item, "programas", 0.8)) ?? [];

  // =====================
  // RETORNAR SITEMAP COMPLETO
  // =====================
  return [
    ...paginasFixas,
    ...pluginsUrls,
    ...dawsUrls,
    ...drumKitsUrls,
    ...programasUrls,
  ];
}
