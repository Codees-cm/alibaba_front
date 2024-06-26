import instance from '../api';


export const fetchCategories = async () => {
    const response = await instance.get('/categories/')
                                      .then((res)=>{
                                        return res
                                      })
    return response;
}

export const createCategories = async (data) => {
    const response = await instance.post('/categories/',data)
    .then((res)=>{
      return res
    })
    return response;
}

export const editCategories = async (data) => {
    const response = await instance.put('/categories/',data)
    .then((res)=>{
      return res
    })
    return response;
}


export const viewCategories = async (id) => {
    const response = await instance.get(`/categories/${id}/`)
    .then((res)=>{
      return res
    })
    return response;
}

export const deleteCategories = async (id) => {
    const response = await instance.delete(`/categories/${id}/`)
    .then((res)=>{
      return res
    })
    return response;
}