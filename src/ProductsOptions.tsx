import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { fetchItems, fetchOneItem } from "./GetItems";

export const productsOptions = () => infiniteQueryOptions({
  queryKey: ["products"], // Include limit in the query key for cache differentiation
  queryFn: ({ pageParam = 1 }) => fetchItems(pageParam), // Pass limit and pageParam to fetchItems
  staleTime: 60000,
  initialPageParam: 1,
  getNextPageParam: (lastPage, allPages, lastPageParam) => {
    if (lastPage.length === 0) {
      return undefined
    }
    return lastPageParam + 1
  },
  getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
    if (firstPageParam <= 1) {
      return undefined
    }
    return firstPageParam - 1
  },
});

export const productOneOptions = (productid: string) =>
    queryOptions({
      queryKey: ['products', { productid }],
      queryFn: () => fetchOneItem(+productid),
      staleTime: 60000,
    })