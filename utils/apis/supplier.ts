import axiosInstance from '../api';


export const fetchSuppliers = async () => {
    const response = await axiosInstance.get('/suppliers')
                                      .then((res)=>{
                                        return res
                                      })
    return response;
}

export const createSuppliers = async (data) => {
    const response = await axiosInstance.post('/suppliers',data)
    .then((res)=>{
      return res
    })
    return response;
}

export const editSuppliers = async (data) => {
    const response = await axiosInstance.put('/suppliers',data)
    .then((res)=>{
      return res
    })
    return response;
}


export const viewSuppliers = async (id) => {
    const response = await axiosInstance.get(`/suppliers/${id}`)
    .then((res)=>{
      return res
    })
    return response;
}

export const deleteSuppliers = async (id) => {
    const response = await axiosInstance.delete(`/suppliers/${id}`)
    .then((res)=>{
      return res
    })
    return response;
}