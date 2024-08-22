
import instance from '../api';


export const fetchOrders = async () => {
    const response = await instance.get('/orders/')
                                      .then((res)=>{
                                        return res
                                      })
    return response;
}


export const fetchOrder = async (id: any) => {
  const response = await instance.get(`/orders/${id}/`)
                                    .then((res)=>{
                                      return res
                                    })
  return response;
}


export const deleteOrder= async (id: any) => {
  const response = await instance.delete(`/orders/${id}/`)
  .then((res)=>{
    return res
  })
  return response;
}

export const createOrder = async (data: any) => {
    const response = await instance.post('/orders/',data)
    .then((res)=>{
      return res
    })
    return response;
}


export const changeOrderToPaid = async (id: any) => {
    const response = await instance.post(`/orders/${id}/mark_as_paid/`)
    .then((res)=>{
      return res
    })
    return response;
}