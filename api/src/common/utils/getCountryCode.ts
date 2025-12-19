import * as countries from 'i18n-iso-countries';
import * as frLocale from 'i18n-iso-countries/langs/fr.json';

countries.registerLocale(frLocale);

export function getCountryCode(country: string): string {
  const normalizedCountry = country.trim().toLowerCase();
  const exceptions: Record<string, string> = {
    angleterre: 'GB-ENG',
    // ajouter les autres pays UK si besoin
  };

  if (exceptions[normalizedCountry]) {
    return exceptions[normalizedCountry];
  }

  const capitalizedCountry =
    normalizedCountry.charAt(0).toUpperCase() + normalizedCountry.slice(1);
  const code = countries.getAlpha2Code(capitalizedCountry, 'fr');

  if (!code) {
    console.warn(`Code pays introuvable pour le pays : ${country}`);
    return country.slice(0, 2).toUpperCase();
  }

  return code.toUpperCase();
}
