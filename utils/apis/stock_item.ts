import instance from '../api';


export const fetchItemsInWarehouse = async (id) => {
    const response = await instance.get(`/products-in-warehouse/${id}/`)
                                      .then((res)=>{
                                        return res
                                      })
    return response;
}

export const stockProductInWarehouse = async (data) => {
    const response = await instance.post('/stockitems/',data)
    .then((res)=>{
      return res
    })
    return response;
}

export const removeProductInWarehouse = async (data) => {
    const response = await instance.delete('/stockitems/',data)
    .then((res)=>{
      return res
    })
    return response;
}

