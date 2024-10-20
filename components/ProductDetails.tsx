"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/DataTable";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,

} from "@/components/ui/carousel";
import ProductInfo from "@/components/ProductInfo";
import { useProducts } from "@/hooks/stock_manage/use-product";

import Link from "next/link";
import { useMarkdownContent } from "@/hooks/use-md";

type Props = {
  role: any;
  params: {
    id: number;
  };
};

const ProductDetails: React.FC<Props> = ({ params, role }) => {
  const { oneProduct, singleLoading, singleFetchError, productTrans, loadingProdTrans } = useProducts(true, params.id);

  if (singleLoading || loadingProdTrans) {
    return <div className="text-center mt-10 text-lg">Loading...</div>;
  }

  const product = {
    id: oneProduct?.data.id, 
    name: oneProduct?.data.name,
    code: oneProduct?.data.product_code,
    available: oneProduct?.data.quantity,
    category: oneProduct?.data.category,
    description: oneProduct?.data.description,
    price: oneProduct?.data.price,
    price_with_tax: oneProduct?.data.price_with_tax,
    online: oneProduct?.data.available,
  };

  const MarkdownCell = ({ file_url, product, markdownKey }) => {
    const { content, error } = useMarkdownContent(file_url);

    if (error) {
      return <div className="text-red-500">Error: {error}</div>;
    }

    if (!content) {
      return <div className="text-gray-500">Loading...</div>;
    }

    localStorage.setItem(markdownKey, content);

    return (
      <Link href={{ pathname: `${product.id}/markdown/${markdownKey}` }}>
        <button className="text-blue-500 hover:text-blue-700">Edit</button>
      </Link>
    );
  };

  const file_columns = [
    {
      accessorKey: "file_url",
      header: "Markdown URL",
    },
    {
      accessorKey: "edit",
      header: "Actions",
      cell: ({ row }) => {
        const file_url = oneProduct?.data.markdown_files[0].file_url;
        const key = oneProduct?.data.markdown_files[0].id;
        return <MarkdownCell file_url={file_url} product={product} markdownKey={key} />;
      },
    },
  ];

  return (
    <div className="bg-gradient-to-r from-amber-100 to-white p-10" style={{ minWidth:"120vh" }}>
      <div className="flex flex-col lg:flex-row justify-between gap-10">
        {/* Carousel Section */}
        <div className="w-full lg:w-[300px]">
          <Carousel className="max-w-xs mx-auto">
            <CarouselContent>
              <CarouselItem>
                <Card className="p-2">
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <img src={oneProduct?.data.image_urls} alt="Product Image" className="w-full h-full object-cover" />
                  </CardContent>
                </Card>
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </div>

        {/* Product Info Section */}
        <div className="w-full lg:w-[70%]">
          <ProductInfo product={product} role={role} />
        </div>
      </div>

      {/* Recent Transactions Section */}
      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={productTrans?.data} />
          </CardContent>
        </Card>

        {role === "admin" && (
          <Card className="w-full lg:max-w-sm">
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
              <div className="flex justify-end">
                <Link
                  href={{
                    pathname: `${product.id}/markdown/`,
                    query: { data: JSON.stringify(product.name) },
                  }}
                >
                  <button className="text-blue-500 hover:text-blue-700">Add Details</button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable columns={file_columns} data={oneProduct?.data.markdown_files} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export const columns = [
  {
    accessorKey: "quantity_sold",
    header: "Quantity",
  },
  {
    accessorKey: "sale_date",
    header: "Date",
  },
  {
    accessorKey: "sale_price",
    header: "Price",
  },
];

export default ProductDetails;
