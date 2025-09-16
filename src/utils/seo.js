// SEO utilities for multilingual structured data and meta tags
import { translations } from '../data/translations.js'
import { countries } from '../data/countries.js'
import { languages } from '../data/languages.js'

// Generate structured data for logistics/shipping company
export const generateStructuredData = (language = 'en', country = 'GB') => {
  const t = translations[language] || translations.en
  const countryData = countries.find(c => c.code === country) || countries.find(c => c.code === 'GB')
  
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.vcanresources.com/#organization",
        "name": "VCanship",
        "alternateName": "VCanship Logistics",
        "url": "https://www.vcanresources.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.vcanresources.com/logo.png",
          "width": 512,
          "height": 512
        },
        "description": t.subtitle || "Global logistics and shipping solutions connecting businesses worldwide",
        "foundingDate": "2020",
        "numberOfEmployees": "50-100",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Gosport Business Centre",
          "addressLocality": "Gosport",
          "addressRegion": "Hampshire",
          "postalCode": "PO12 1BX",
          "addressCountry": "GB"
        },
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+44-23-9258-0000",
            "contactType": "customer service",
            "availableLanguage": languages.map(lang => lang.code),
            "areaServed": countries.map(country => country.code)
          }
        ],
        "sameAs": [
          "https://www.linkedin.com/company/vcanship",
          "https://twitter.com/vcanship",
          "https://www.facebook.com/vcanship"
        ]
      }
    ]
  }

  return JSON.stringify(structuredData, null, 2)
}

// Generate hreflang tags for multilingual SEO
export const generateHreflangTags = () => {
  const hreflangs = []
  const supportedLanguages = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'ja', 'ko', 'zh', 'ar', 'hi']
  
  supportedLanguages.forEach(lang => {
    hreflangs.push({
      rel: 'alternate',
      hreflang: lang,
      href: `https://www.vcanresources.com/${lang === 'en' ? '' : lang}`
    })
  })
  
  hreflangs.push({
    rel: 'alternate',
    hreflang: 'x-default',
    href: 'https://www.vcanresources.com'
  })
  
  return hreflangs
}

// Update document head with SEO data
export const updateSEOHead = (language = 'en', country = 'GB') => {
  const t = translations[language] || translations.en
  const countryData = countries.find(c => c.code === country) || countries.find(c => c.code === 'GB')
  
  document.title = `${t.shipAnything || 'Ship Anything, Anywhere'} - VCanship`
  
  // Update structured data
  let structuredDataScript = document.querySelector('script[type="application/ld+json"]')
  if (!structuredDataScript) {
    structuredDataScript = document.createElement('script')
    structuredDataScript.setAttribute('type', 'application/ld+json')
    document.head.appendChild(structuredDataScript)
  }
  structuredDataScript.textContent = generateStructuredData(language, country)
}
