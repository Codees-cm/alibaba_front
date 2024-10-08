// import instance from '../api';


// export const fetchPromoCode = async () => {
//     const response = await instance.get('/promo-code/')
//                                       .then((res)=>{
//                                         return res
//                                       })
//     return response;
// }

// export const createPromoCode = async (data: any , id: any) => {
//     const response = await instance.post(`/generate-promo-code/${id}/`,data)
//     .then((res)=>{
//       return res
//     })
//     return response;
// }

// export const applyPromoCode = async (data: any , id: any)  => {
//   const response = await instance.post(`/apply-promo-code/${id}/`,data)
//   .then((res)=>{
//     return res
//   })
//   return response;
// }


// export const editPromoCode = async (data: any) => {
//     const response = await instance.put('/promo-code/',data)
//     .then((res)=>{
//       return res
//     })
//     return response;
// }


// export const viewPromoCode = async (id: any) => {
//     const response = await instance.get(`/promo-code/${id}/`)
//     .then((res)=>{
//       return res
//     })
//     return response;
// }

// export const deletePromoCode = async (id: any) => {
//     const response = await instance.delete(`/promo-code/${id}/`)
//     .then((res)=>{
//       return res
//     })
//     return response;
// }

import instance from '../api';

export const fetchPromoCodes = async () => {
    const response = await instance.get('/promo-code/')
    .then((res) => {
        return res;
    });
    return response;
}

export const editPromoCode = async (data: { id: any; }) => {
    const response = await instance.put(`/promo-code/${data.id}/`,data)
    .then((res)=>{
      return res
    })
    return response;
}

export const createPromoCode = async (data: any) => {
    const new_data = {
        discount:data.discount,
        expiry_date:data.expiry_date,
        max_usage: data.max_usage
    }
    const id = data.product.id
    var link = `/generate-promo-code/${id}/`
    if( id == undefined) {
        link = `/generate-promo-code/`
    }
    const response = await instance.post(link, data)
    .then((res) => {
        return res;
    });
    return response;
}

export const applyPromoCode = async (code: any) => {
    const response = await instance.post(`/apply-promo-code/${code}/`)
    .then((res) => {
        return res;
    });
    return response;
}

export const deletePromoCode = async (id: any) => {
    const response = await instance.delete(`/promo-code/${id}/`)
    .then((res) => {
        return res;
    });
    return response;
}

export const generatePromoCode = async (productId: any) => {
  const response = await instance.post(`/generate-promo-code/${productId}/`)
  .then((res) => {
      return res;
  });
  return response;
}

