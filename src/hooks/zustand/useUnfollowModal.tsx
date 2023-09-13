import { create } from "zustand";

type useUnfollowModalStore = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  userId: string;
  onInsertUserId: (userId: string) => void;
};

const useUnfollowModal = create<useUnfollowModalStore>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
  userId: "",
  onInsertUserId: (userId: string) => set({ userId }),
}));

export default useUnfollowModal;
