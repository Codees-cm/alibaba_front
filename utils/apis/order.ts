
import instance from '../api';


export const fetchOrders = async () => {
    const response = await instance.get('/orders/')
                                      .then((res)=>{
                                        return res
                                      })
    return response;
}

export const createOrder = async (data) => {
    const response = await instance.post('/orders/create_order/',data)
    .then((res)=>{
      return res
    })
    return response;
}


export const changeOrderToPaid = async (id) => {
    const response = await instance.post(`/orders/${id}/mark_as_paid/`)
    .then((res)=>{
      return res
    })
    return response;
}