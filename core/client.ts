import selected from '@client-config';

export interface ClientConfig {
  name: string; fullName: string; shortName: string; brandName: string; brandTitle: string;
  brandSubtitle: string; footerSubtitle: string; footerDescription: string;
  phone: string; whatsapp: string; displayPhone: string; email: string; orderMessage: string; heroMessage: string;
  address: string; locality: string; region: string; country: string;
  maps: string; instagram: string; facebook: string; tiktok?: string; visitLabel: string; site: string;
  homeTitle: string; homeDescription: string; heroTitle: string; heroEmphasis: string;
  heroDescription: string; heroDesktop: string; heroMobile: string; shareImage: string; logo: string; favicon: string;
  storyLocation: string; storyFact: string; founded: number;
  featured: string[]; shrubs: string[]; awards: string[]; reviewCount: number; clientCount: number;
  currencyPrefix: string; priceLocale: string;
  copy: Record<string, string>;
  business?: { whatsappConfirmed: boolean; exporterUserReported?: boolean; stockStatus: { value: string | null; confirmed: boolean }; stockLastUpdated: { value: string | null; confirmed: boolean }; responseTimePromise: { value: string | null; confirmed: boolean } };
  workingRow?: { ground: string; ink: string; deep: string; hessian: string; accent: string; tape: string; lightAccent: string; specimenName: string; exploreLabel: string; sectionNote: string; sectionTitle: string; tagLabel: string; enquiryLabel: string };
  theme: string; layout: string; hero: string; productCard: string; sections: string[]; headerStyle?: string;
}

export const client: ClientConfig = selected;
