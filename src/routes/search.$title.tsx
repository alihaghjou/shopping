import { searchProductOptions } from "@/ProductsOptions";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/search/$title")({
  component: RouteComponent,
  loader: ({ params: { title }, context: { queryClient } }) => {
    return queryClient.ensureQueryData(searchProductOptions(title));
  },
});

function RouteComponent() {
  const {title} = Route.useParams()
  const {data: searchedProducts} = useSuspenseQuery(searchProductOptions(title))
  console.log(searchedProducts)
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Search Results for &quot;{title}&quot;</h1>
      <div className="flex flex-col md:flex-row gap-8">
         
      </div>
    </div>
  )
}
