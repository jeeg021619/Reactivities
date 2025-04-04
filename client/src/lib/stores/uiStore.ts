import { create } from "zustand";

interface uiStore {
  count: number;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  increment: () => void;
  decrement: () => void;
  incrementBy: (x: number) => void;
}

export const uiStore = create<uiStore>((set) => ({
  count: 0,
  loading: false,
  setLoading: (loading) => set({ loading }),
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  incrementBy: (x) => set((state) => ({ count: state.count + x })),
}));
