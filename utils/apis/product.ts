import instance from '../api';


// Update this in your /utils/apis/product.js file

export const fetchProducts = async (params = {}) => {
    const { page = 1, search = '', sort = { key: 'name', direction: 'asc' } } = params;

    // Build query parameters
    let queryParams = `page=${page}`;

    // Add search parameter if provided
    if (search) {
        queryParams += `&search=${encodeURIComponent(search)}`;
    }

    // Add sorting parameters if provided
    if (sort && sort.key) {
        // If direction is desc, add minus sign prefix to the sort key
        const sortPrefix = sort.direction === 'desc' ? '-' : '';
        queryParams += `&ordering=${sortPrefix}${sort.key}`;
    }

    const response = await instance.get(`/products/?${queryParams}`)
        .then((res) => {
            return res;
        });

    return response;
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