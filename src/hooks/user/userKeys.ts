export const userKeys = {
  all: ['users'] as const,
  list: (q?: string) => ['users', { q: q ?? '' }] as const,
  detail: (id: number) => ['users', id] as const,
};
