// Define the type for the product
export type ProductType = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
};

// Update the fetchItemsType to use the Product type
type fetchItemsType = (
  limit?: number,
  pageParam?: number
) => Promise<ProductType[]>;
type fetchOneItemType = (productid: number) => Promise<ProductType>;
type fetchSearchType = (searchQuery: string) => Promise<ProductType[]>;

export const fetchItems: fetchItemsType = async (pageParam = 1) => {
  // Calculate the skip based on the pageParam and limit
  const skip = (pageParam - 1) * 10;

  // Fetch data from the API with the calculated skip
  const res = await fetch(
    `https://dummyjson.com/products?limit=10&skip=${skip}`
  );
  console.log("here");
  // Check if the response is ok
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await res.json();

  // Return the products array
  return data.products; // Assuming the API returns an object with a 'products' array
};

export const fetchOneItem: fetchOneItemType = async (productid: number) => {
  const res = await fetch(`https://dummyjson.com/products/${productid}`);
  const data = await res.json();
  return data;
};

export const fetchSearch: fetchSearchType = async (searchQuery: string) => {
  const res = await fetch(
    `https://dummyjson.com/products/search?q=${searchQuery}`
  );
  const data = await res.json();
  return data;
};

type categoryType = {
  slug: string;
  name: string;
  url: string;
};

export const fetchCategory: () => Promise<categoryType[]> = async () => {
  const res = await fetch("https://dummyjson.com/products/categories");
  const data = await res.json();
  return data;
};

type ProductsBasedCategoryType = {
  products: ProductType[];
  total: number;
  skip: number;
  limit: number;
};

export const fetchProductsBasedCategory: (
  category: string
) => Promise<ProductsBasedCategoryType> = async (category: string) => {
  const res = await fetch(
    `https://dummyjson.com/products/category/${category}`
  );
  const data = await res.json();
  return data;
};
