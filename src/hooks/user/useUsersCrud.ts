import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../../service/userService';
import type { User } from '../../model/User';
import { userKeys } from './userKeys';

export function useUsers(q?: string) {
  return useQuery({ queryKey: userKeys.list(q), queryFn: () => userService.listUsers(q), staleTime: 10_000 });
}
export function useUser(id: number) {
  return useQuery({ queryKey: id ? userKeys.detail(id) : userKeys.detail(-1), queryFn: () => userService.getUser(id), enabled: !!id });
}
export function useCreateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: Pick<User, 'name' | 'email'>) => userService.createUser(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: userKeys.all });
    },
  });
}
export function useUpdateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: number; input: Pick<User, 'name' | 'email'> }) => userService.updateUser(id, input),
    onMutate: async ({ id, input }) => {
      await qc.cancelQueries({ queryKey: userKeys.all });
      const snapshots = qc.getQueryData(userKeys.all);

      qc.setQueriesData({ queryKey: ['users'] }, (old: any) => {
        if (Array.isArray(old)) return old.map((u: User) => (u.id === id ? { ...u, ...input } : u));
        return old;
      });

      return { snapshots };
    },
    onError: (_e, _vars, ctx) => {
      // rollback
      if (!ctx) return;
      qc.setQueryData(userKeys.all, ctx.snapshots);
    },
    onSettled: (_data, _err, vars) => {
      qc.invalidateQueries({ queryKey: userKeys.all });
      qc.invalidateQueries({ queryKey: userKeys.detail(vars.id) });
    },
  });
}
export function usePatchUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: number; input: Partial<Pick<User, 'name' | 'email'>> }) => userService.patchUser(id, input),
    onSuccess: (updated) => {
      qc.setQueriesData({ queryKey: ['users'] }, (old: any) => {
        if (Array.isArray(old)) return old.map((u: User) => (u.id === updated.id ? updated : u));
        return old;
      });
      qc.setQueryData(userKeys.detail(updated.id), updated);
    },
  });
}
export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => userService.deleteUser(id),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: userKeys.all });
      const prev = qc.getQueriesData({ queryKey: ['users'] });
      qc.setQueriesData({ queryKey: ['users'] }, (old: any) => (Array.isArray(old) ? old.filter((u: User) => u.id !== id) : old));
      return { prev };
    },
    onError: (_e, _id, ctx) => {
      // rollback lists
      ctx?.prev.forEach(([key, data]: any) => {
        (qc as any).setQueryData(key, data);
      });
    },
    onSettled: (_d, _e, id) => {
      qc.invalidateQueries({ queryKey: userKeys.all });
      qc.removeQueries({ queryKey: userKeys.detail(id) });
    },
  });
}
