import instance from '../api';


export const fetchCustomers = async () => {
    const response = await instance.get('/users_with_role_user/')
                                      .then((res)=>{
                                        return res
                                      })
    return response;
}

export const createCustomers = async (data) => {
    const response = await instance.post('/create-customers/',data)
    .then((res)=>{
      return res
    })
    return response;
}



export const editCustomers = async (data) => {
  const response = await instance.post(`/users/${data.id}`,data)
  .then((res)=>{
    return res
  })
  return response;
}
// export const editCategories = async (data) => {
//     const response = await instance.put('/users/',data)
//     .then((res)=>{
//       return res
//     })
//     return response;
// }


// export const viewCategories = async (id) => {
//     const response = await instance.get(`/products_by_category/${id}/`)
//     .then((res)=>{
//       return res
//     })
//     return response;
// }

// export const deleteCategories = async (id) => {
//     const response = await instance.delete(`/users/${id}/`)
//     .then((res)=>{
//       return res
//     })
//     return response;
// }