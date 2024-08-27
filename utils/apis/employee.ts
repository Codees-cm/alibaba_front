import instance from '../api';


export const fetchEmployees = async () => {
    const response = await instance.get('/users_with_role_employee/')
                                      .then((res)=>{
                                        return res
                                      })
    return response;
}

export const createEmployees = async (data: any) => {
    const response = await instance.post('/create-employee/',data)
    .then((res)=>{
      return res
    })
    return response;
}


export const deleteEmployees = async (id: any) => {
  const response = await instance.delete(`/users/${id}/delete/`,)
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