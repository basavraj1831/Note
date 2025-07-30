import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signout } from "../lib/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useSignout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: signoutMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: signout,
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/signin");
    },
  });

  return { signoutMutation, isPending, error };
};
export default useSignout;
