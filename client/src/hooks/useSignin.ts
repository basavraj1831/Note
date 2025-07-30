import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signin } from "../lib/api";


const useSignin = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: signin,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });
  return { isPending, error, signinMutation: mutate };
};

export default useSignin;
