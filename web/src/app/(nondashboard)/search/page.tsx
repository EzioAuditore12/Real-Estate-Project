import { createFileRoute } from '@tanstack/react-router';
import type { Category, ItemFilters } from './-types';

export const Route = createFileRoute('/(nondashboard)/search/')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): ItemFilters => {
    return {
      query: search.qeury as string,
      hasDiscount: search.discout as boolean,
      categories: Array.isArray(search.categories)
        ? (search.categories as Category[])
        : ((search.categories as string)?.split(',') as Category[]),
    };
  },
});

function RouteComponent() {
  const { query, hasDiscount, categories } = Route.useSearch();

  return (
    <div className="mt-6">
      {JSON.stringify({ query, hasDiscount, categories }, null, 2)}
    </div>
  );
}
