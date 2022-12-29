import { createI18n } from "vue-i18n"

const messages = {
  en: {
    message: {
      eslogan: 'Whats to Phone',
      disclaimer: 'Send a whatsapp to a phone without add it to contacts',
      phone: 'Phone number',
      country: 'Country',
    }
  },
  es: {
    message: {
      eslogan: 'Whats to Phone',
      disclaimer: 'Manda un whatsapp a un móvil sin añadirlo a tus contactos',
      phone: 'Número de teléfono',
      country: 'País',
    }
  }
}

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: "es",
  fallbackLocale: "es",
  availableLocales: ["es", "en"],
  messages: messages,
});
