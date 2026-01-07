import React from 'react';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  currentPage: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, currentPage }) => {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://gestaoboa.com.br"
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.name,
        "item": item.url
      })),
      {
        "@type": "ListItem",
        "position": items.length + 2,
        "name": currentPage,
        "item": window.location.href
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav aria-label="Breadcrumb" className="breadcrumbs">
        <ol>
          <li>
            <a href="/" title="Voltar para página inicial">Home</a>
          </li>
          {items.map((item, index) => (
            <li key={index}>
              <span aria-hidden="true"> › </span>
              <a href={item.url} title={`Ir para ${item.name}`}>
                {item.name}
              </a>
            </li>
          ))}
          <li>
            <span aria-hidden="true"> › </span>
            <span aria-current="page">{currentPage}</span>
          </li>
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;
