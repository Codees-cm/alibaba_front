import instance from '../api';

type UnknownRecord = Record<string, any>;

const toUiProduct = (item: UnknownRecord) => {
  const stock = item.quantity ?? item.stockQuantity ?? 0;
  const status = stock === 0 ? 'Out of Stock' : stock < 10 ? 'Low Stock' : (item.available === false ? 'Inactive' : 'Active');
  return {
    id: item.id,
    name: item.name,
    category: typeof item.category === 'string' ? item.category : item.category?.name ?? 'Uncategorized',
    price: item.price ?? 0,
    originalPrice: item.originalPrice ?? item.original_price ?? undefined,
    sku: item.product_code ?? undefined,
    stock,
    status,
    sales: item.sales_count ?? 0,
    rating: item.rating ?? 0,
    image: item.imageUrl ?? item.image_url ?? undefined,
    images: item.images ?? [],
    tags: item.tags ?? [],
    brand: item.brand ?? undefined,
    product_code: item.product_code ?? undefined,
    available: item.available ?? (status !== 'Inactive'),
    specifications: item.specifications ?? {},
    createdAt: item.created ?? undefined,
    updatedAt: item.updated ?? undefined,
    trend: 'up',
    __raw: item,
  };
};

const parseMaybeNumber = (value: any) => {
  if (value === null || value === undefined || value === '') return undefined;
  const n = Number(value);
  return Number.isNaN(n) ? undefined : n;
};

const normalizeArray = (value: any): any[] => {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    if (!value.trim()) return [];
    try {
      const asJson = JSON.parse(value);
      if (Array.isArray(asJson)) return asJson;
    } catch {}
    return value.split(',').map((v) => v.trim()).filter(Boolean);
  }
  return [];
};

const toBackendPayload = (data: UnknownRecord): UnknownRecord => {
  // Accept either backend-shaped or UI-shaped input and produce backend snake_case payload
  const status: string | undefined = data.status;
  const availableFromStatus = status ? status.toLowerCase() !== 'inactive' : undefined;
  const categoryId =
    typeof data.category === 'number'
      ? data.category
      : parseMaybeNumber(data.category) ?? data.__raw?.category?.id ?? (typeof data.__raw?.category === 'number' ? data.__raw.category : undefined);

  let specifications: any = data.specifications;
  if (typeof specifications === 'string') {
    try {
      specifications = JSON.parse(specifications);
    } catch {
      specifications = undefined;
    }
  }

  return {
    name: data.name,
    description: data.description,
    price: parseMaybeNumber(data.price),
    original_price: parseMaybeNumber(data.original_price ?? data.originalPrice),
    image_url: data.image_url ?? data.imageUrl ?? data.image,
    images: normalizeArray(data.images),
    quantity: parseMaybeNumber(data.quantity ?? data.stock),
    category: categoryId,
    tags: normalizeArray(data.tags),
    brand: data.brand,
    specifications,
    product_code: data.product_code ?? data.sku,
    available: typeof data.available === 'boolean' ? data.available : availableFromStatus,
  };
};

export const fetchProducts = async () => {
  const response = await instance.get('/products/');
  const raw = response.data?.results ?? response.data ?? [];
  const list = Array.isArray(raw) ? raw : (raw.results ?? []);
  return list.map(toUiProduct);
};

export const createProducts = async (data: UnknownRecord) => {
  const payload = toBackendPayload(data);
  const response = await instance.post('/products/', payload);
  return toUiProduct(response.data);
};

export const editProducts = async (data: UnknownRecord) => {
  const id = data?.id ?? data?.product_id ?? data?.pk;
  if (!id) throw new Error('Product id is required');
  const payload = toBackendPayload(data);
  const response = await instance.put(`/products/${id}/`, payload);
  return toUiProduct(response.data);
};

export const viewProducts = async (id: number | string) => {
  const response = await instance.get(`/products/${id}/`);
  return toUiProduct(response.data);
};

export const deleteProducts = async (id: number | string) => {
  const response = await instance.delete(`/products/${id}/`);
  return response.data;
};