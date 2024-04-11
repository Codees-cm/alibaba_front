import axiosInstance from '../api';


export const fetchProducts = async () => {
    const response = await axiosInstance.get('/products')
                                      .then((res)=>{
                                        return res
                                      })
    return response;
}

export const createProducts = async (data) => {
    const response = await axiosInstance.post('/products',data)
    .then((res)=>{
      return res
    })
    return response;
}

export const editProducts = async (data) => {
    const response = await axiosInstance.put('/products',data)
    .then((res)=>{
      return res
    })
    return response;
}


export const viewProducts = async (id) => {
    const response = await axiosInstance.get(`/products/${id}`)
    .then((res)=>{
      return res
    })
    return response;
}

export const deleteProducts = async (id) => {
    const response = await axiosInstance.delete(`/products/${id}`)
    .then((res)=>{
      return res
    })
    return response;
}