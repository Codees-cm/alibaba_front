import instance from '../api';


export const fetchSuppliers = async () => {
    const response = await instance.get('/suppliers/');
    const raw = response.data?.results ?? response.data ?? [];
    const list = Array.isArray(raw) ? raw : (raw.results ?? []);
    return list.map((item: any) => ({
      id: item.id,
      name: item.name ?? item.company_name ?? 'Supplier',
      email: item.email ?? '',
      phone: item.phone_number ?? item.phone ?? '',
      address: item.address ?? '',
      created: item.created,
      updated: item.updated,
    }));
}

export const createSuppliers = async (data) => {
    const response = await instance.post('/suppliers/', data);
    return response.data;
}

export const editSuppliers = async (data) => {
    if (!data?.id) throw new Error('Supplier id is required');
    const response = await instance.put(`/suppliers/${data.id}/`, data);
    return response.data;
}


export const viewSuppliers = async (id) => {
    const response = await instance.get(`/suppliers/${id}/`);
    return response.data;
}

export const deleteSuppliers = async (id) => {
    const response = await instance.delete(`/suppliers/${id}/`);
    return response.data;
}