import instance from '../api';


export const fetchExpenses = async () => {
    const response = await instance.get('/expenses/')
                                      .then((res)=>{
                                        return res
                                      })
    return response;
}

export const createExpenses = async (data: any) => {
    const response = await instance.post('/expenses/',data)
    .then((res)=>{
      return res
    })
    return response;
}

export const editExpenses = async (data: any) => {
    const response = await instance.put(`/expenses/${data.id}/`,data)
    .then((res)=>{
      return res
    })
    return response;
}


export const viewExpenses = async (id: any) => {
    const response = await instance.get(`/expenses/${id}/`)
    .then((res)=>{
      return res
    })
    return response;
}

export const deleteExpenses = async (id: any) => {
    const response = await instance.delete(`/expenses/${id}/`)
    .then((res)=>{
      return res
    })
    return response;
}