import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import customFetch from './utils';
import { toast } from 'react-toastify';

export const useCreate = () => {
  const queryClient = useQueryClient();
  const { mutate: createTask } = useMutation({
    mutationFn: async (taskTitle) => {
      await customFetch.post('/', { title: taskTitle });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('task added');
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    },
  });
  return { createTask };
};

export const useFetch = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data } = await customFetch.get('/');
      return data;
    },
  });
  return { data, isLoading, isError };
};

export const useEdit = () => {
  const queryClient = useQueryClient();
  // edit task
  const { mutate: editTask } = useMutation({
    mutationFn: async ({ taskId, isDone }) => {
      await customFetch.patch(`/${taskId}`, { isDone });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('task edited');
    },
  });
  return editTask;
};

export const useDelete = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteTask, isLoading: deleteTaskLoading } = useMutation({
    mutationFn: async (taskId) => {
      const { data } = await customFetch.delete(`/${taskId}`);
      console.log(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('task deleted');
    },
  });
  return { deleteTask, deleteTaskLoading };
};
