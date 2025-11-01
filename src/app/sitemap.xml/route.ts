export const dynamic = "force-dynamic"; // 👈 prevents prerendering at build

export async function GET() {
  const baseUrl = "https://www.inheritx.org";
  const pages = [
    "/",
    "/about",
    "/user",
    "/user/plans",
    "/user/claim",
    "/user/portfolio",
    "/user/inactivity",
    "/user/security",
    "/user/kyc",
    "/user/kyc/id-upload",
    "/user/kyc/selfie-verification",
    "/user/kyc/review",
    "/user/plans/create",
    "/user/plans/edit",
    "/user/plans/view",
    "/user/swap",
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
