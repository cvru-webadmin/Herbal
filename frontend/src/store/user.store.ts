import { create } from "zustand";

type TUserStore = {
  user: {
    email: string;
    name: string;
  } | null;
  setUser: (params: { email: string; name: string }) => void;
  removeUser: () => void;
};

const userStore = create<TUserStore>((set) => ({
  user: {
    email: "",
    name: "",
  },
  setUser: (params: { email: string; name: string }) => set({ user: params }),
  removeUser: () => set({ user: null }),
}));

export default userStore;
