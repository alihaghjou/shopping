import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { productsBasedOnCategoriesOptions } from "@/ProductsOptions";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, Badge } from "lucide-react";

export const Route = createFileRoute("/categories/$category")({
  component: RouteComponent,
  loader: ({ params: { category }, context: { queryClient } }) =>
    queryClient.ensureQueryData(productsBasedOnCategoriesOptions(category)),
});

function RouteComponent() {
  const { category } = Route.useParams();
  const {
    data: Result,
    error,
    isLoading,
  } = useSuspenseQuery(productsBasedOnCategoriesOptions(category));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
      <h1>Products in {category}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Result.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <Link href={`/product/${product.id}`}>
          <div className="relative aspect-square mb-4">
            <img
              src={product.thumbnail || "/placeholder.svg"}
              alt={product.title}
              className="object-cover rounded-md"
            />
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold truncate">{product.title}</h3>
            <p className="text-sm text-gray-500">{product.brand}</p>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                ({product.reviews.length})
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">
                ${product.price.toFixed(2)}
              </span>
              {product.stock > 0 ? (
                <Badge variant="secondary">In Stock</Badge>
              ) : (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
            </div>
          </div>
        </Link>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" disabled={product.stock === 0}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
