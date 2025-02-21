import { Button } from "@/components/ui/button";
import type { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useState } from "react";
import { Search, ShoppingCart } from "lucide-react";
import SearchDialog from "@/components/SearchDialog";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootLayout,
});

function RootLayout() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  return (
    <>
      <header className="bg-white shadow-xs">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-bold text-gray-800 [&.active]:font-bold"
          >
            ShopNest
          </Link>
          <nav className="hidden md:flex space-x-4">
            <Link
              to="/categories"
              className="text-gray-600 hover:text-gray-800 [&.active]:font-bold"
            >
              Categories
            </Link>
            <Link
              to="/products"
              className="text-gray-600 hover:text-gray-800 [&.active]:font-bold"
            >
              Products
            </Link>
            {/* <Link
                to="/new-arrivals"
                className="text-gray-600 hover:text-gray-800 [&.active]:font-bold"
              >
                New Arrivals
              </Link>
              <Link
                to="/deals"
                className="text-gray-600 hover:text-gray-800 [&.active]:font-bold"
              >
                Deals
              </Link> */}
            <Link
              to="/about"
              className="text-gray-600 hover:text-gray-800 [&.active]:font-bold"
            >
              About
            </Link>{" "}
          </nav>
          <div className="flex items-center space-x-4">
            <Button
              variant={"ghost"}
              aria-label="Search"
              className="text-gray-600 hover:text-gray-800"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-6 w-6" />
            </Button>

            <Button
              variant={"ghost"}
              aria-label="Cart"
              className="text-gray-600 hover:text-gray-800"
            >
              <ShoppingCart className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>

      <SearchDialog
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
