import { IncomingMessage } from 'http';

export const clientHeaderLang = (req: IncomingMessage): string => {
  const langStr = req.headers['accept-language'] ?? '';

  const lang = new RegExp(/th|en/g).exec(langStr)?.[0];

  const i18nRoute = lang && lang !== 'en' ? `${lang}/` : '';

  return i18nRoute;
};
