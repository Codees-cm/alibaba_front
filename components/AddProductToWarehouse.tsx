"use client"
import {useState} from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useProducts } from "@/hooks/stock_manage/use-product"
import { useWarehouses } from "@/hooks/stock_manage/use-warehouse"
import { useStockItem } from "@/hooks/stock_manage/use-stockitem"
export default function AddProductToWarehouse() {
    const { products } = useProducts();
    const { warehouses } = useWarehouses();
    const { addProductToWarehouse } = useStockItem();
    const [formData, setFormData] = useState({
        product: "",
        warehouse: "",
        quantity: ""
    });

    const handleProductChange = (value) => {
        const selectedProduct = products.data.find(product => product.id.toString() === value);
        if (selectedProduct) {
            setFormData(prevState => ({
                ...prevState,
                product: value,
                quantity: selectedProduct.quantity
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // console.log("form data", formData);
            await addProductToWarehouse(formData);
            setFormData({
                product: "",
                warehouse: "",
                quantity: ""
            });
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Add Product</CardTitle>
                <CardDescription>Add products to different warehouse.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="framework">Product Name</Label>
                            <Select value={formData.product} onValueChange={handleProductChange}>
                                <SelectTrigger id="name" value={formData.product} name="product">
                                    <SelectValue placeholder />
                                </SelectTrigger>
                                <SelectGroup>
                                    <SelectContent position="popper">
                                        {products?.data.map((product) => (
                                            <SelectItem key={product.id} value={product.id.toString()}>
                                                {product.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </SelectGroup>
                            </Select>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="framework">Warehouse</Label>
                            <Select value={formData.warehouse} onValueChange={(value) => setFormData({ ...formData, warehouse: value })}>
                                <SelectTrigger id="Warehouse">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    {warehouses?.data.map((warehouse) => (
                                        <SelectItem key={warehouse.id} value={warehouse.id.toString()}>
                                            {warehouse.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="quantity">Product Quantity</Label>
                            <Input id="quantity" disabled value={formData.quantity} placeholder="Product quantity" />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button type="submit">Save</Button>
                </CardFooter>
            </form>
        </Card>
    );
}
