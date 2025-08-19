export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Garden Recipes",
    "alternateName": "Grow a Garden Cooking Guide",
    "description": "Comprehensive recipe and ingredient database for the Grow a Garden game. Find recipes, explore ingredients, and satisfy your cooking cravings.",
    "url": process.env.NODE_ENV === 'production' ? 'https://garden-recipes.com' : 'http://localhost:3001',
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": process.env.NODE_ENV === 'production' 
          ? "https://garden-recipes.com/recipes?search={search_term_string}"
          : "http://localhost:3001/recipes?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "mainEntity": {
      "@type": "Recipe",
      "@id": "#recipe-collection",
      "name": "Garden Recipe Collection",
      "description": "A collection of recipes for the Grow a Garden cooking game"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Garden Recipes",
      "description": "Community-driven recipe database for garden cooking games"
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "Gamers, Cooking enthusiasts, Game guide users"
    },
    "keywords": "garden recipes, grow a garden, cooking game, recipe guide, garden ingredients, cooking simulator, food recipes, game recipes",
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
    "usageInfo": "Free to use for educational and entertainment purposes",
    "creativeWorkStatus": "Published"
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}