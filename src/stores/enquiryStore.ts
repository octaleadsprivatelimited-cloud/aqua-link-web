import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WhatsAppEnquiry {
  id: string;
  source: string;
  message: string;
  createdAt: string;
}

interface EnquiryStore {
  enquiries: WhatsAppEnquiry[];
  addEnquiry: (payload: Omit<WhatsAppEnquiry, "id" | "createdAt">) => void;
}

export const useEnquiryStore = create<EnquiryStore>()(
  persist(
    (set) => ({
      enquiries: [],
      addEnquiry: (payload) =>
        set((state) => ({
          enquiries: [
            { ...payload, id: Date.now().toString(), createdAt: new Date().toISOString() },
            ...state.enquiries,
          ],
        })),
    }),
    { name: "aquasafe-enquiries" }
  )
);
