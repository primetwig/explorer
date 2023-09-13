import {rejects} from 'assert'
import transEN from './en.json'
import transESMX from './es-MX.json'

interface Translation {
  [key: string]: string | undefined
}

interface Translations {
  [key: string]: Translation | undefined
}

const translations: Translations = {
  en: transEN,
  'es-MX': transESMX,
  // or if we have too many translations,
  // then we can fetch and use them dynamically
  // (see i18n.set in the end of this file)
}

let language = 'en'

const i18n = (key: string, variables?: Record<string, unknown>) => {
  let translation = translations[language]?.[key];
  if (!translation) return key

  if (variables) {
    Object.keys(variables).forEach(variable => {
      const value = variables[variable]
      translation = translation?.replace(variable, String(value))
    })
  }

  return translation
}

i18n.set = (newLanguage: string) => {
  language = newLanguage

  if (language in translations) {
    return Promise.resolve(translations[language])
  } else {
    return new Promise((resolve, reject) => {
      // fetch('/path/to/the/translation')
      // .then()
      resolve(translations[language])
      // .catch(reject)
    })
  }
}

export default i18n
