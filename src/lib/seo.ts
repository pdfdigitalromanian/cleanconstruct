export const siteUrl = 'https://cleanconstruct.ro'

export const businessSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
  '@id': `${siteUrl}/#business`,
  name: 'CleanConstruct',
  legalName: 'STEFI CLEAN CONSTRUCT S.R.L.',
  url: siteUrl,
  logo: `${siteUrl}/assets/brand/logo-mark.png`,
  image: `${siteUrl}/assets/site/hero-before-after.webp`,
  email: 'support@steficlean.com',
  telephone: '+40726631898',
  description: 'Servicii profesionale de curățenie, curățenie după constructor, renovare, construcții și finisaje.',
  areaServed: [
    { '@type': 'City', name: 'București' },
    { '@type': 'AdministrativeArea', name: 'Ilfov' },
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'RO',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    telephone: '+40726631898',
    email: 'support@steficlean.com',
    availableLanguage: ['Romanian'],
  },
}
