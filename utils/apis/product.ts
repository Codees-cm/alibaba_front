import instance from '../api';



export const fetchAllProducts = async () => {
    try {
        // Get all available products with a large page size
        const response = await instance.get('/products/?page_size=1000&available=true');
        return response;
    } catch (error) {
        console.error("Error fetching all products:", error);
        throw error;
    }
};

export const fetchProducts = async (params = {}) => {
    const { page = 1, search = '', sort = { key: 'name', direction: 'asc' } } = params;

    // Build query parameters
    let queryParams = `page=${page}`;

    if (search) {
        queryParams += `&search=${encodeURIComponent(search)}`;
    }

    if (sort && sort.key) {
        const sortPrefix = sort.direction === 'desc' ? '-' : '';
        queryParams += `&ordering=${sortPrefix}${sort.key}`;
    }

    try {
        const response = await instance.get(`/products/?${queryParams}`);
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            throw new Error(`Server responded with status: ${response.status}`);
        }
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};
// export const createProducts = async (data: any) => {
//     const response = await instance.post('/products/',data)
//     .then((res)=>{
//       console.log(res.data)
//       return res.data.id;
//     })

//     console.log('***************')
//     console.log(response.data)

//     return response;
// }

export const createProducts = async (data: any) => {
  const response = await instance.post('/products/', data);
  return response.data.id; 
};


export const createProductsMarkdown = async (data: any) => {
//  console.log(edit,id)
  try {
    console.log(data)
    const response = await instance.post(`/products-markdown/`, data);
    return response.data; // Return the response data
  } catch (error) {
    throw error; // Propagate the error
  }
};


export const updateProduct = async (product: any) => {
  try {
    console.log("Product data being sent:", product);  // Log the correct object

    const response = await instance.patch(`/update-product/${product.id}/`, product, {
      headers: {
        'Content-Type': 'application/json',  // Ensure correct content type
      },
    });
    console.log("Response from server:", response.data);
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error during product update:", error);
    throw error; // Propagate the error
  }
};


export const viewProducts = async (id: number | null) => {
    const response = await instance.get(`/products/${id}/`)
    .then((res)=>{
      return res
    })
    return response;
}

export const deleteProducts = async (id: any) => {
    const response = await instance.delete(`/products/${id}/`)
    .then((res)=>{
      return res
    })
    return response;
}


export const productTransactions = async (id: number | null) => {
  const response = await instance.get(`/product/${id}/transactions/`)
  .then((res)=>{
    return res
  })
  return response;
}

export const update_markdown = async (data:any) => {
console.log(data)
const payload = {
  product_id: data.product_id,
  file_url: data.file_url
};
  const response = await instance.patch(`/products-markdown/${data.id}/`,payload,
  {
    headers: {
      'Content-Type': 'application/json',  // Ensure correct content type
    },
  })
  .then((res)=>{
    return res
  })
  return response;
}