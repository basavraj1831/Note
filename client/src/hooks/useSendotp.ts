import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendOtp } from "../lib/api";

const useSendotp = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: sendOtp,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });
  return {
    sendotpPending: isPending,
    sendotpError: error,
    sendotpMutation: mutate,
  };
};

export default useSendotp;
