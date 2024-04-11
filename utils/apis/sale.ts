import axiosInstance from '../api';


export const fetchSales = async () => {
    const response = await axiosInstance.get('/sales')
                                      .then((res)=>{
                                        return res
                                      })
    return response;
}

export const createSales = async (data) => {
    const response = await axiosInstance.post('/sales',data)
    .then((res)=>{
      return res
    })
    return response;
}

export const viewSales = async (id) => {
    const response = await axiosInstance.get(`/sales/${id}`)
    .then((res)=>{
      return res
    })
    return response;
}

export const deleteSales = async (id) => {
    const response = await axiosInstance.delete(`/sales/${id}`)
    .then((res)=>{
      return res
    })
    return response;
}