import instance from '../api';


export const fetchProducts = async () => {
    const response = await instance.get('/products/');
    const raw = response.data?.results ?? response.data ?? [];
    const list = Array.isArray(raw) ? raw : (raw.results ?? []);
    return list.map((item: any) => {
      const stock = item.quantity ?? item.stockQuantity ?? 0;
      const status = stock === 0 ? 'Out of Stock' : stock < 10 ? 'Low Stock' : 'Active';
      return {
        id: item.id,
        name: item.name,
        category: typeof item.category === 'string' ? item.category : item.category?.name ?? 'Uncategorized',
        price: item.price ?? 0,
        stock,
        status,
        sales: item.sales_count ?? 0,
        rating: item.rating ?? 0,
        image: item.imageUrl ?? item.image_url ?? undefined,
        trend: 'up',
        // keep original for detail modals if needed
        __raw: item,
      };
    });
}

export const createProducts = async (data) => {
    const response = await instance.post('/products/', data);
    return response.data;
}

export const editProducts = async (data) => {
    if (!data?.id) throw new Error('Product id is required');
    const response = await instance.put(`/products/${data.id}/`, data);
    return response.data;
}


export const viewProducts = async (id) => {
    const response = await instance.get(`/products/${id}/`);
    return response.data;
}

export const deleteProducts = async (id) => {
    const response = await instance.delete(`/products/${id}/`);
    return response.data;
}