export const dynamic = "force-dynamic"; // 👈 prevents prerendering at build

export async function GET() {
  const baseUrl = "https://www.inheritx.org";
  const pages = [
    "/",
    "/about",
    "/dashboard",
    "/dashboard/plans",
    "/dashboard/claim",
    "/dashboard/portfolio",
    "/dashboard/inactivity",
    "/dashboard/security",
    "/dashboard/kyc",
    "/dashboard/kyc/id-upload",
    "/dashboard/kyc/selfie-verification",
    "/dashboard/kyc/review",
  ];

  const lastmod = new Date().toISOString();

  const urls = pages
    .map(
      (p) =>
        `  <url>\n    <loc>${baseUrl}${p}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=86400, stale-while-revalidate=3600",
    },
  });
}
