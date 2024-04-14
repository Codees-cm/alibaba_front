import instance from '../api';


export const fetchWarehouse = async () => {
    const response = await instance.get('/warehouses/')
                                      .then((res)=>{
                                        return res
                                      })
    return response;
}

export const createWarehouse = async (data) => {
    const response = await instance.post('/warehouses/',data)
    .then((res)=>{
      return res
    })
    return response;
}

export const editWarehouse = async (data) => {
    const response = await instance.put('/warehouses/',data)
    .then((res)=>{
      return res
    })
    return response;
}


export const viewWarehouse = async (id) => {
    const response = await instance.get(`/warehouses/${id}/`)
    .then((res)=>{
      return res
    })
    return response;
}

export const deleteWarehouse = async (id) => {
    const response = await instance.delete(`/warehouses/${id}/`)
    .then((res)=>{
      return res
    })
    return response;
}