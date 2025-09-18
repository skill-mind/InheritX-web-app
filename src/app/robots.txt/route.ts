// export async function GET() {
//   const sitemapUrl = "https://www.inheritx.org/sitemap.xml";
//   const content = `User-agent: *\nAllow: /\nSitemap: ${sitemapUrl}\n`;

//   return new Response(content, {
//     headers: {
//       "Content-Type": "text/plain",
//       "Cache-Control": "s-maxage=86400, stale-while-revalidate=3600",
//     },
//   });
// }

export const dynamic = "force-dynamic"; // 👈 disables prerendering

export async function GET() {
  const sitemapUrl = "https://www.inheritx.org/sitemap.xml";
  const content = `User-agent: *\nAllow: /\nSitemap: ${sitemapUrl}\n`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "s-maxage=86400, stale-while-revalidate=3600",
    },
  });
}