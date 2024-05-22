"use client"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DataTable } from "@/components/DataTable";
import React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel"
import ProductInfo from "@/components/ProductInfo";
import SalesCard, { SalesProps } from "@/components/SalesCard";
import { useProducts } from "@/hooks/stock_manage/use-product";

import Link from 'next/link';

const UserSalesData: SalesProps[] = [
    {
        name: "Oliviia Martin",
        email: "olivia.marting@gmail.com",
        saleAmount: "$1,999.0"
    },
    {
        name: "Ricky Farel",
        email: "ricky.farel@gmail.com",
        saleAmount: "$3,999.0"
    },
    {
        name: "William kit",
        email: "wiliam.kit@gmail.com",
        saleAmount: "$299.0"
    },
    {
        name: "Jackson luc",
        email: "jackson.luc@gmail.com",
        saleAmount: "$799.0"
    }
];

type Props = {
    params: {
        id: number;
    };  
};

const ProductDetails: React.FC<Props> = ({ params }) => {
    // Assuming you fetch the product data here based on params.id
    const { oneProduct, singleLoading, singleFetchError, productTrans, loadingProdTrans } = useProducts(true, params.id);

    if (singleLoading || loadingProdTrans) {
        return (
            <>
                Loading...
            </>
        );
    }

    const product = {
        id: oneProduct?.data.id,
        name: oneProduct?.data.name,
        code: oneProduct?.data.product_code,
        available: oneProduct?.data.quantity,
        description: oneProduct?.data.description,
        price: oneProduct?.data.price,
        price_with_tax: oneProduct?.data.price_with_tax,
        online: oneProduct?.data.available
    };

    // console.log(oneProduct?.data.images);
    return (
        <div className="bg-gradient-to-r from-amber-100 to-white">
            <div className="m-10 flex justify-between mt-10" style={{ width: "90vh" }}>
                <div className="w-[100%] flex justify-center" style={{ height: 'max-content' }}>
                    <Carousel className="w-[300px] max-w-xs">
                        <CarouselContent>
                            {oneProduct?.data.images.map((image, index) => (
                                <CarouselItem key={index}>
                                    <div className="p-1">
                                        <Card>
                                            <CardContent className="flex aspect-square items-center justify-center p-6">
                                                <img src={image.image_url} alt="" />
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
                <div className="w-[100%] flex justify-center">
                    <ProductInfo product={product} />
                </div>
            </div>
            <div className="m-10 flex justify-between mt-10" style={{ width: "90vh" }}>
                <Card>
                    <CardHeader>
                        Recent transactions
                    </CardHeader>
                    <CardContent>
                        <DataTable columns={columns} data={productTrans?.data} />
                    </CardContent>
                </Card>
                <Card style={{ maxWidth: "min-content" }}>
                    <CardHeader>
                        Product Details
                        <div className="ml-auto flex items-center gap-2">
                            <Link  href={{ pathname: `${product.id}/markdown/`, query: { data: JSON.stringify(product.name) } }}>
                                {/* <a className="text-sm font-semibold border-slate-950"> */}
                                    Add details
                                    {/* </a> */}
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <DataTable columns={file_columns} data={oneProduct?.data.markdown_files} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export const columns = [
    {
        accessorKey: "quantity_sold",
        header: "Quantity"
    },
    {
        accessorKey: "sale_date",
        header: "Date"
    },
    {
        accessorKey: "sale_price",
        header: "Price"
    },
];

export const file_columns = [
    {
        accessorKey: "file_url",
        header: "Markdown Url"
    },
];

export default ProductDetails;
