// Translation utilities with fallback logic
import { translations } from '../data/translations.js'

// Get translation with fallback to English
export const getTranslation = (key, language = 'en', fallbackLanguage = 'en') => {
  // Try requested language first
  if (translations[language] && translations[language][key]) {
    return translations[language][key]
  }
  
  // Fallback to English
  if (translations[fallbackLanguage] && translations[fallbackLanguage][key]) {
    return translations[fallbackLanguage][key]
  }
  
  // Final fallback to key itself
  return key
}

// Get all translations for a language with fallbacks
export const getTranslations = (language = 'en', fallbackLanguage = 'en') => {
  const baseTranslations = translations[fallbackLanguage] || translations.en || {}
  const languageTranslations = translations[language] || {}
  
  // Merge with fallback, prioritizing requested language
  return {
    ...baseTranslations,
    ...languageTranslations
  }
}

// Check if language is fully supported
export const isLanguageSupported = (language) => {
  return translations[language] && Object.keys(translations[language]).length > 10
}

// Get supported languages list
export const getSupportedLanguages = () => {
  return Object.keys(translations).filter(lang => isLanguageSupported(lang))
}

// Get language completion percentage
export const getLanguageCompletion = (language) => {
  const englishKeys = Object.keys(translations.en || {})
  const languageKeys = Object.keys(translations[language] || {})
  
  if (englishKeys.length === 0) return 0
  
  const completedKeys = languageKeys.filter(key => 
    translations[language][key] && translations[language][key].trim() !== ''
  )
  
  return Math.round((completedKeys.length / englishKeys.length) * 100)
}

// Validate translation completeness
export const validateTranslations = () => {
  const report = {}
  const englishKeys = Object.keys(translations.en || {})
  
  Object.keys(translations).forEach(lang => {
    const completion = getLanguageCompletion(lang)
    const missingKeys = englishKeys.filter(key => 
      !translations[lang] || !translations[lang][key] || translations[lang][key].trim() === ''
    )
    
    report[lang] = {
      completion: completion,
      missingKeys: missingKeys,
      totalKeys: englishKeys.length,
      translatedKeys: englishKeys.length - missingKeys.length
    }
  })
  
  return report
}
