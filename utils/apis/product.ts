import instance from '../api';


export const fetchProducts = async () => {
    const response = await instance.get('/products/')
                                      .then((res)=>{
                                        return res
                                      })
    return response;
}

export const createProducts = async (data) => {
    const response = await instance.post('/products/',data)
    .then((res)=>{
      return res
    })
    return response;
}


export const createProductsMarkdown = async (data) => {
//  console.log(edit,id)
  try {
    console.log(data)
    const response = await instance.post(`/products-markdown/`, data);
    return response.data; // Return the response data
  } catch (error) {
    throw error; // Propagate the error
  }
};


export const updateProduct = async (product) => {

  try {
    // const {} = product
    console.log(product)
      const response = await instance.patch(`/update-product/${product.id}/`,  product.data);
      return response.data; // Return the response data
    } catch (error) {
      throw error; // Propagate the error
    }
}
export const viewProducts = async (id) => {
    const response = await instance.get(`/products/${id}/`)
    .then((res)=>{
      return res
    })
    return response;
}

export const deleteProducts = async (id) => {
    const response = await instance.delete(`/products/${id}/`)
    .then((res)=>{
      return res
    })
    return response;
}


export const productTransactions = async (id) => {
  const response = await instance.get(`/product/${id}/transactions/`)
  .then((res)=>{
    return res
  })
  return response;
}