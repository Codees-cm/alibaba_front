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

export const editProducts = async (data) => {
    const response = await instance.put('/products/',data)
    .then((res)=>{
      return res
    })
    return response;
}


export const viewProducts = async (id) => {
    const response = await instance.get(`/products/${id}`)
    .then((res)=>{
      return res
    })
    return response;
}

export const deleteProducts = async (id) => {
    const response = await instance.delete(`/products/${id}`)
    .then((res)=>{
      return res
    })
    return response;
}