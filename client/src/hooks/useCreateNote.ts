import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../lib/api";

const useCreateNote = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: createNote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });
  return { isPending, error, createNoteMutation: mutate };
};

export default useCreateNote;
