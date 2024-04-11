import axiosInstance from '../api';


export const fetchCategories = async () => {
    const response = await axiosInstance.get('/categories')
                                      .then((res)=>{
                                        return res
                                      })
    return response;
}

export const createCategories = async (data) => {
    const response = await axiosInstance.post('/categories',data)
    .then((res)=>{
      return res
    })
    return response;
}

export const editCategories = async (data) => {
    const response = await axiosInstance.put('/categories',data)
    .then((res)=>{
      return res
    })
    return response;
}


export const viewCategories = async (id) => {
    const response = await axiosInstance.get(`/categories/${id}`)
    .then((res)=>{
      return res
    })
    return response;
}

export const deleteCategories = async (id) => {
    const response = await axiosInstance.delete(`/categories/${id}`)
    .then((res)=>{
      return res
    })
    return response;
}