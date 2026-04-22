import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface SiteStat {
  label: string;
  value: string;
}

export interface SiteSettings {
  phone: string;
  whatsappNumber: string;
  email: string;
  address: string;
  businessHours: string;
  gstin: string;
  homeStats: SiteStat[];
}

interface SiteSettingsStore {
  settings: SiteSettings;
  updateSettings: (data: SiteSettings) => void;
}

const defaultSettings: SiteSettings = {
  phone: "+91 9985850777",
  whatsappNumber: "919985850777",
  email: "info@waterfilterstore.in",
  address: "#7-13-23/2, NH-16 Main Road, Old Gajuwaka, Visakhapatnam - 530026, Andhra Pradesh",
  businessHours: "Mon-Sat: 9:00 AM - 7:00 PM | Sunday: 10:00 AM - 2:00 PM",
  gstin: "37ACHPL4663M1Z2",
  homeStats: [
    { label: "Happy Customers", value: "10,000+" },
    { label: "Customer Satisfaction", value: "98%" },
    { label: "Years of Experience", value: "10+" },
    { label: "Certified Engineers", value: "50+" },
  ],
};

export const useSiteSettingsStore = create<SiteSettingsStore>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      updateSettings: (data) => set({ settings: data }),
    }),
    { name: "aquasafe-site-settings" }
  )
);
