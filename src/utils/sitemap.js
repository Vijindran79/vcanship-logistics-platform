// Sitemap generator for multilingual SEO
import { languages } from '../data/languages.js'

// Generate XML sitemap
export const generateSitemap = () => {
  const baseUrl = 'https://www.vcanresources.com'
  const supportedLanguages = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'ja', 'ko', 'zh', 'ar', 'hi']
  const currentDate = new Date().toISOString().split('T')[0]
  
  const urls = []
  
  // Add main pages for each language
  const pages = [
    { path: '', priority: '1.0', changefreq: 'daily' },
    { path: '/services', priority: '0.9', changefreq: 'weekly' },
    { path: '/pricing', priority: '0.8', changefreq: 'weekly' },
    { path: '/track', priority: '0.7', changefreq: 'daily' },
    { path: '/contact', priority: '0.6', changefreq: 'monthly' },
    { path: '/about', priority: '0.5', changefreq: 'monthly' }
  ]
  
  supportedLanguages.forEach(lang => {
    pages.forEach(page => {
      const langPrefix = lang === 'en' ? '' : `/${lang}`
      const url = `${baseUrl}${langPrefix}${page.path}`
      
      // Generate alternate links for this URL
      const alternates = supportedLanguages.map(altLang => {
        const altPrefix = altLang === 'en' ? '' : `/${altLang}`
        return {
          hreflang: altLang,
          href: `${baseUrl}${altPrefix}${page.path}`
        }
      })
      
      // Add x-default
      alternates.push({
        hreflang: 'x-default',
        href: `${baseUrl}${page.path}`
      })
      
      urls.push({
        loc: url,
        lastmod: currentDate,
        changefreq: page.changefreq,
        priority: page.priority,
        alternates: alternates
      })
    })
  })
  
  // Generate XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'
  
  urls.forEach(url => {
    xml += '  <url>\n'
    xml += `    <loc>${url.loc}</loc>\n`
    xml += `    <lastmod>${url.lastmod}</lastmod>\n`
    xml += `    <changefreq>${url.changefreq}</changefreq>\n`
    xml += `    <priority>${url.priority}</priority>\n`
    
    // Add alternate links
    url.alternates.forEach(alt => {
      xml += `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}" />\n`
    })
    
    xml += '  </url>\n'
  })
  
  xml += '</urlset>'
  
  return xml
}

// Generate robots.txt
export const generateRobotsTxt = () => {
  const baseUrl = 'https://www.vcanresources.com'
  
  return `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Allow all major search engines
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: Baiduspider
Allow: /

User-agent: YandexBot
Allow: /

# Disallow admin and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /*.json$
Disallow: /temp/
Disallow: /cache/`
}

// Save sitemap to public directory
export const saveSitemap = () => {
  const sitemap = generateSitemap()
  const robots = generateRobotsTxt()
  
  // In a real application, you would save these files to the public directory
  console.log('Sitemap generated:', sitemap.length, 'characters')
  console.log('Robots.txt generated:', robots.length, 'characters')
  
  return { sitemap, robots }
}
