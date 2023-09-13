import { create } from "zustand";

type useDeletePostModalStore = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  postId: string;
  onInsertPostId: (postId: string) => void;
};

const useDeletePostModal = create<useDeletePostModalStore>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
  onInsertPostId: (postId: string) => set({ postId }),
  postId: "string",
}));

export default useDeletePostModal;
