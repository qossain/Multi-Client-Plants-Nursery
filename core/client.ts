import selected from '@client-config';

export interface ClientConfig {
  name: string; fullName: string; shortName: string; brandName: string; brandTitle: string;
  brandSubtitle: string; footerSubtitle: string; footerDescription: string;
  phone: string; whatsapp: string; displayPhone: string; email: string; orderMessage: string; heroMessage: string;
  address: string; locality: string; region: string; country: string;
  maps: string; instagram: string; facebook: string; visitLabel: string; site: string;
  homeTitle: string; homeDescription: string; heroTitle: string; heroEmphasis: string;
  heroDescription: string; heroDesktop: string; heroMobile: string; shareImage: string; logo: string; favicon: string;
  storyLocation: string; storyFact: string; founded: number;
  featured: string[]; shrubs: string[]; awards: string[]; reviewCount: number; clientCount: number;
  currencyPrefix: string; priceLocale: string;
  copy: Record<string, string>;
  theme: string; layout: string; hero: string; productCard: string; sections: string[];
}

export const client: ClientConfig = selected;
