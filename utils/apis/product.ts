import instance from '../api';


export const fetchProducts = async () => {
    const response = await instance.get('/products/')
                                      .then((res)=>{
                                        return res
                                      })
    return response;
}

export const createProducts = async (data: any) => {
    const response = await instance.post('/products/',data)
    .then((res)=>{
      return res
    })
    return response;
}


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


export const updateProduct = async (product:any) => {
  try {
    console.log("Product data being sent:", product);

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