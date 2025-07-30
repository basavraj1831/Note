import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signout } from "../lib/api";
import toast from "react-hot-toast";

const useSignout = () => {
  const queryClient = useQueryClient();

  const {
    mutate: signoutMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: signout,
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  return { signoutMutation, isPending, error };
};
export default useSignout;
