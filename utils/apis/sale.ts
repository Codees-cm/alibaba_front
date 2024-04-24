import instance from '../api';


export const fetchSales = async () => {
    const response = await instance.get('/sales/')
                                      .then((res)=>{
                                        return res
                                      })
    return response;
}

export const createSales = async (data) => {
    const response = await instance.post('/sales/',data)
    .then((res)=>{
      return res
    })
    return response;
}

export const viewSales = async (id) => {
    const response = await instance.get(`/sales/${id}/`)
    .then((res)=>{
      return res
    })
    return response;
}

export const deleteSales = async (id) => {
    const response = await instance.delete(`/sales/${id}/`)
    .then((res)=>{
      return res
    })
    return response;
}