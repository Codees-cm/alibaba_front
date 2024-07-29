import instance from '../api';


export const fetchTransactions = async () => {
    const response = await instance.get('/transactions/')
                                      .then((res)=>{
                                        return res
                                      })
    return response;
}

export const createTransactions = async (data: any) => {
    const response = await instance.post('/transactions/',data)
    .then((res)=>{
      return res
    })
    return response;
}

export const viewTransactions = async (id: any) => {
    const response = await instance.get(`/transactions/${id}/`)
    .then((res)=>{
      return res
    })
    return response;
}

export const deleteTransactions = async (id: any) => {
    const response = await instance.delete(`/transactions/${id}/`)
    .then((res)=>{
      return res
    })
    return response;
}