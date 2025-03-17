import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    fetchProducts,
    createProducts,
    createProductsMarkdown,
    viewProducts,
    update_markdown,
    deleteProducts,
    productTransactions,
    updateProduct
} from "@/utils/apis/product";
import { useToast } from "@/components/ui/use-toast";

export const useProducts = (enable = false, productId = null) => {
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [Product_Id, setProduct_Id] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const [tableRefetching, setTableRefetching] = React.useState(false);

    // New state for pagination parameters
    const [paginationParams, setPaginationParams] = React.useState({
        page: 1,
        search: '',
        sort: { key: 'name', direction: 'asc' }
    });

    // Standard products query without params (kept for backward compatibility)
    const {
        data: products,
        isLoading: allLoading,
        error: allFetchError,
        refetch,
        isFetching
    } = useQuery({
        queryKey: ['products', paginationParams],
        queryFn: () => fetchProducts(paginationParams),
        staleTime: 300000,
        enabled: !enable,
    });

    // Update tableRefetching state when isFetching changes
    React.useEffect(() => {
        setTableRefetching(isFetching && !allLoading);
    }, [isFetching, allLoading]);

    // Function to fetch products with pagination, search, and sort
    const fetchProductsWithParams = async (page = 1, search = '', sort = { key: 'name', direction: 'asc' }) => {
        setPaginationParams({ page, search, sort });
        // Return the promise from refetch for better control
        return refetch();
    };

    // Query for a single product
    const {
        data: oneProduct,
        isLoading: singleLoading,
        error: singleFetchError
    } = useQuery({
        queryKey: ['product', productId],
        queryFn: () => viewProducts(productId),
        staleTime: 300000,
        enabled: enable && productId !== null,
    });

    // Query for product transactions
    const {
        data: productTrans,
        isLoading: loadingProdTrans,
        error: errorProdTrans
    } = useQuery({
        queryKey: ['productTransactions', productId],
        queryFn: () => productTransactions(productId),
        staleTime: 300000,
        enabled: enable && productId !== null,
    });

    // Mutation for adding product
    const { mutate: addProductMutation, isPending: isAddingProduct } = useMutation({
        mutationFn: createProducts,
        onSuccess: (productId) => {
            queryClient.invalidateQueries(["products"]);
            setProduct_Id(productId);
            setIsSuccess(true);
            toast({
                title: "Product saved",
                description: "The product was successfully created.",
            });
        },
        onError: (error) => {
            setErrorMessage(error.message);
            toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            });
        },
    });

    // Mutation for editing product
    const { mutate: editProductMutation, isPending: isEditingProduct } = useMutation({
        mutationFn: updateProduct,
        onSuccess: () => {
            queryClient.invalidateQueries(["product", productId]);
            queryClient.invalidateQueries(["products"]); // Invalidate products list too
            toast({
                title: "Product Edited",
                description: "Product updated successfully.",
            });
            setIsSuccess(true);
        },
        onError: (error) => {
            setErrorMessage(error.message);
            toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            });
        },
    });

    // Mutation for updating markdown
    const { mutate: UpdateMarkdownMutation, isPending: isEditingMarkdown } = useMutation({
        mutationFn: update_markdown,
        onSuccess: () => {
            queryClient.invalidateQueries(["product", productId]);
            toast({
                title: "Product Edited",
                description: "Markdown updated successfully.",
            });
            setIsSuccess(true);
        },
        onError: (error) => {
            setErrorMessage(error.message);
            toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            });
        },
    });

    // Mutation for creating product markdown
    const { mutate: createProductsMarkdownMutation, isPending: isCreatingProductsMarkdown } = useMutation({
        mutationFn: createProductsMarkdown,
        onSuccess: () => {
            queryClient.invalidateQueries(["product", productId]);
            toast({
                title: "Product Markdown saved",
                description: "Markdown created successfully.",
            });
            setIsSuccess(true);
        },
        onError: (error) => {
            setErrorMessage(error.message);
            toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            });
        },
    });

    // Mutation for deleting product
    const { mutate: deleteProductMutation, isPending: isDeletingProduct } = useMutation({
        mutationFn: deleteProducts,
        onSuccess: () => {
            queryClient.invalidateQueries(["products"]);
            toast({
                title: "Product deleted",
                description: "Product successfully removed.",
            });
            setIsSuccess(true);
        },
        onError: (error) => {
            setErrorMessage(error.message);
            toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            });
        },
    });

    // Function handlers
    const addProduct = async (newProduct) => {
        await addProductMutation(newProduct);
    };

    const modifyProduct = async (product) => {
        editProductMutation(product);
    };

    const markdown_update_product = async (product) => {
        UpdateMarkdownMutation(product);
    };

    const createProductMarkdown = async (product) => {
        createProductsMarkdownMutation(product);
    };

    const deletingProduct = async (id) => {
        await deleteProductMutation(id);
    };

    return {
        products,
        allLoading,
        allFetchError,
        fetchProductsWithParams,
        tableRefetching,

        oneProduct,
        singleLoading,
        singleFetchError,

        productTrans,
        loadingProdTrans,
        errorProdTrans,

        addProduct,
        Product_Id,
        isAddingProduct,

        modifyProduct,
        isEditingProduct,

        createProductMarkdown,
        isCreatingProductsMarkdown,

        deletingProduct,
        isDeletingProduct,

        markdown_update_product,
        isEditingMarkdown,

        isSuccess,
        errorMessage,
    };
};