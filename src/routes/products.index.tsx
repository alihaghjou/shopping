import { createFileRoute, Link } from "@tanstack/react-router";
import { productsOptions } from "../ProductsOptions";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import React from "react";
import { ProductType } from "@/GetItems";
import { Button } from "@/components/ui/button";


export const Route = createFileRoute("/products/")({
  component: RouteComponent,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureInfiniteQueryData(productsOptions()),
});

function RouteComponent() {
  const {
    data: products,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery(productsOptions());

  if (isLoading) return <div>Loading...</div>;
  if (error) throw new Error(error.message);
  return (
    <main className="flex flex-col gap-4 p-2">
      <section className="flex flex-wrap gap-8 p-2 justify-evenly">
        {products?.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.map((project) => (
              <ProductFragment product={project} />
            ))}
          </React.Fragment>
        ))}
      </section>

      <div className="self-center">
        <Button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
              ? "Load More"
              : "Nothing more to load"}
        </Button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </main>
  );
}

function ProductFragment({ product }: { product: ProductType }) {
  return (
    <Card key={product.id} id={String(product.id)} className="py-2 px-4 max-w-70 hover:shadow-2xl">
      {product.id}
      <Link to="/products/$productid" params={{ productid: String(product.id) }}>
        <CardContent className="flex flex-col gap-3">
          <img
            src={product.thumbnail}
            className="rounded-md w-[200px] self-center"
          />
          <CardTitle className="text-pretty">{product.title}</CardTitle>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="font-bold">${product.price}</p>
          <p className="flex items-center">
            Rating: {product.rating}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-4 text-yellow-400"
            >
              <path
                fillRule="evenodd"
                d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z"
                clipRule="evenodd"
              />
            </svg>
          </p>
        </CardFooter>
      </Link>
    </Card>
  );
}