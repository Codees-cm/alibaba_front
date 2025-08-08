import instance from '../api';


export const fetchCategories = async () => {
    const response = await instance.get('/categories/');
    const raw = response.data?.results ?? response.data ?? [];
    const list = Array.isArray(raw) ? raw : (raw.results ?? []);
    return list.map((item: any) => ({
      id: item.id,
      name: item.name,
      product_count: item.product_count ?? 0,
      created: item.created,
      updated: item.updated,
    }));
}

export const createCategories = async (data) => {
    const response = await instance.post('/categories/', data);
    return response.data;
}

export const editCategories = async (data) => {
    if (!data?.id) throw new Error('Category id is required');
    const response = await instance.put(`/categories/${data.id}/`, data);
    return response.data;
}


export const viewCategories = async (id) => {
    const response = await instance.get(`/categories/${id}/`);
    return response.data;
}

export const deleteCategories = async (id) => {
    const response = await instance.delete(`/categories/${id}/`);
    return response.data;
}