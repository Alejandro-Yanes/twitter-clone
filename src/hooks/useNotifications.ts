import { Notification } from "@prisma/client";
import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useNotification = (userId: string) => {
  const url = userId ? `api/notifications/${userId}` : null;

  const { data, isLoading, error, mutate } = useSWR<Notification[]>(
    url,
    fetcher
  );
  return { data, isLoading, error, mutate };
};

export default useNotification;
