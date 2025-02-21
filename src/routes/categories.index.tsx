import { Card, CardContent } from "@/components/ui/card";
import { categoriesOptions } from "@/ProductsOptions";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/categories/")({
  component: RouteComponent,
  loader: ({context: {queryClient}}) => queryClient.ensureQueryData(categoriesOptions())
});

function RouteComponent() {
  const {data: categories, isLoading, error} = useSuspenseQuery(categoriesOptions());

  if (isLoading) return <div>Loading...</div>
  if (error) throw new Error(error.message)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {categories.map((category) => (
        <Link href={`/categories/${category.slug}`}>
        <Card className="transition-colors duration-200 hover:bg-gray-50">
          <CardContent className="flex justify-between items-center p-4">
            <h3 className="text-lg font-semibold">{category.name}</h3>
            <span className="text-sm text-gray-600">{category.itemCount} items</span>
          </CardContent>
        </Card>
      </Link>
      ))}
    </div>
  );
}
