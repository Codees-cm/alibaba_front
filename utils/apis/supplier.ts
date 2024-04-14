import instance from '../api';


export const fetchSuppliers = async () => {
    const response = await instance.get('/suppliers/')
                                      .then((res)=>{
                                        return res
                                      })
    return response;
}

export const createSuppliers = async (data) => {
    const response = await instance.post('/suppliers/',data)
    .then((res)=>{
      return res
    })
    return response;
}

export const editSuppliers = async (data) => {
    const response = await instance.put('/suppliers/',data)
    .then((res)=>{
      return res
    })
    return response;
}


export const viewSuppliers = async (id) => {
    const response = await instance.get(`/suppliers/${id}/`)
    .then((res)=>{
      return res
    })
    return response;
}

export const deleteSuppliers = async (id) => {
    const response = await instance.delete(`/suppliers/${id}/`)
    .then((res)=>{
      return res
    })
    return response;
}