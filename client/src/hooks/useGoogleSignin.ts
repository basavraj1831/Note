import { useMutation, useQueryClient } from "@tanstack/react-query";
import { googlesignin } from "../lib/api";

const useGoogleSignin = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: googlesignin,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });
  return { isPending, error, googlesigninMutation: mutate };
};

export default useGoogleSignin;
