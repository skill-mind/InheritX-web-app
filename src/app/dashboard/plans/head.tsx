export default function Head() {
  const title = "Plans - InheritX Dashboard";
  const description =
    "Create and manage inheritance plans on InheritX. Securely configure beneficiaries, triggers, and assets for automated transfer.";
  const url = "https://www.inheritx.org/dashboard/plans";

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
        { "@type": "ListItem", position: 2, name: "Dashboard", item: "https://www.inheritx.org/dashboard" },
        { "@type": "ListItem", position: 3, name: "Plans", item: url },
      ],
    },
    publisher: {
      "@type": "Organization",
      name: "InheritX",
      url: "https://www.inheritx.org",
      logo: { "@type": "ImageObject", url: "https://www.inheritx.org/og-image.png" },
    },
  };

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="inheritance plans, digital legacy, InheritX, StarkNet, NFT inheritance" />

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

      <link rel="canonical" href={url} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
