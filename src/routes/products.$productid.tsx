import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { productOneOptions } from "../ProductsOptions";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, Truck, ShieldCheck } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/products/$productid")({
  // In a loader
  loader: ({ params: { productid }, context: { queryClient } }) => {
    return queryClient.ensureQueryData(productOneOptions(productid));
  },
  // Or in a component
  component: PostComponent,
});

function PostComponent() {
  const { productid } = Route.useParams();

  const {
    data: product,
    isLoading,
    error,
  } = useSuspenseQuery(productOneOptions(productid));

  if (isLoading) return <div>Loading...</div>;

  if (error) throw new Error(error.message);

  const [selectedImage, setSelectedImage] = useState(product.images[0])

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/products">
        <Button variant={"outline"}><ArrowLeft /></Button>
      </Link>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="relative aspect-square mb-4">
            <img
              src={selectedImage || "/placeholder.svg"}
              alt={product.title}
              className="rounded-lg"
            />
          </div>
          <div className="flex space-x-2">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(img)}
                className="relative w-20 h-20 border-2 rounded-md overflow-hidden"
              >
                <img
                  src={img || "/placeholder.svg"}
                  alt={`${product.title} thumbnail ${index + 1}`}
                />
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                />
              ))}
              <span className="ml-2 text-gray-600">({product.rating.toFixed(1)})</span>
            </div>
            <div className="text-3xl font-bold mb-4">
              ${product.price.toFixed(2)}
              {product.discountPercentage > 0 && (
                <span className="ml-2 text-sm text-red-500">{product.discountPercentage}% OFF</span>
              )}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Availability:</span> {product.availabilityStatus} ({product.stock} in
              stock)
            </div>
            <div className="mb-4">
              <span className="font-semibold">Brand:</span> {product.brand}
            </div>
            <div className="mb-4">
              <span className="font-semibold">SKU:</span> {product.sku}
            </div>
          </div>
          <div>
            <Button className="w-full mb-4">Add to Cart</Button>
            <div className="flex justify-between text-sm text-gray-600">
              <div className="flex items-center">
                <Truck className="w-4 h-4 mr-1" />
                Free Shipping
              </div>
              <div className="flex items-center">
                <ShieldCheck className="w-4 h-4 mr-1" />
                Secure Transaction
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Product Details</h2>
          <ul className="space-y-2">
            <li>
              <span className="font-semibold">Category:</span> {product.category}
            </li>
            <li>
              <span className="font-semibold">Weight:</span> {product.weight} kg
            </li>
            <li>
              <span className="font-semibold">Dimensions:</span> {product.dimensions.width}W x{" "}
              {product.dimensions.height}H x {product.dimensions.depth}D cm
            </li>
            <li>
              <span className="font-semibold">Warranty:</span> {product.warrantyInformation}
            </li>
            <li>
              <span className="font-semibold">Shipping:</span> {product.shippingInformation}
            </li>
            <li>
              <span className="font-semibold">Return Policy:</span> {product.returnPolicy}
            </li>
            <li>
              <span className="font-semibold">Minimum Order:</span> {product.minimumOrderQuantity}
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
          {product.reviews.map((review, index) => (
            <div key={index} className="mb-4 p-4 border rounded-lg">
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">{review.date}</span>
              </div>
              <p className="mb-2">{review.comment}</p>
              <p className="text-sm text-gray-600">By {review.reviewerName}</p>
            </div>
          ))}
        </div>
      </div>
    </div>)
}
