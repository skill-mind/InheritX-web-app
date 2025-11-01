export default function Head() {
  const title = "Claims - InheritX Dashboard";
  const description =
    "View and manage claims to inheritance plans on InheritX. Track status, timestamps, and take necessary actions to process claims.";
  const url = "https://www.inheritx.org/user/claim";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.inheritx.org/" },
        { "@type": "ListItem", position: 2, name: "Dashboard", item: "https://www.inheritx.org/user" },
        { "@type": "ListItem", position: 3, name: "Claims", item: url },
      ],
    },
  };

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="claims, inheritx, digital inheritance, inheritx claims" />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.inheritx.org/og-image.png" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://www.inheritx.org/twitter-image.png" />
      <meta name="twitter:creator" content="@projectInheritX" />
      <meta name="twitter:site" content="@projectInheritX" />

      <link rel="canonical" href={url} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
