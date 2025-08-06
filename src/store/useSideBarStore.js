import { create } from "zustand";

export const useSideBarStore = create((set) => ({
  isSideBarActive: false,
  toggleSideBar: () =>
    set((state) => ({ isSideBarActive: !state.isSideBarActive })),
  showSideBar: () => set((state) => ({ isSideBarActive: true })),
  hideSideBar: () => set((state) => ({ isSideBarActive: false })),
}));
