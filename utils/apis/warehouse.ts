import axiosInstance from '../api';


export const fetchWarehouse = async () => {
    const response = await axiosInstance.get('/warehouses')
                                      .then((res)=>{
                                        return res
                                      })
    return response;
}

export const createWarehouse = async (data) => {
    const response = await axiosInstance.post('/warehouses',data)
    .then((res)=>{
      return res
    })
    return response;
}

export const editWarehouse = async (data) => {
    const response = await axiosInstance.put('/warehouses',data)
    .then((res)=>{
      return res
    })
    return response;
}


export const viewWarehouse = async (id) => {
    const response = await axiosInstance.get(`/warehouses/${id}`)
    .then((res)=>{
      return res
    })
    return response;
}

export const deleteWarehouse = async (id) => {
    const response = await axiosInstance.delete(`/warehouses/${id}`)
    .then((res)=>{
      return res
    })
    return response;
}