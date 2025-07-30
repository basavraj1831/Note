import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getOtp } from "../lib/api";

const useGetotp = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: getOtp,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });
  return { getPending: isPending, getError: error, getotpMutation: mutate };
};

export default useGetotp;
