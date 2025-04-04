import { create } from "zustand";

interface CounterStore {
  count: number;
  loading: boolean;
  increment: () => void;
  decrement: () => void;
  incrementBy: (x: number) => void;
}

export const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  loading: false,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  incrementBy: (x) => set((state) => ({ count: state.count + x })),
}));
