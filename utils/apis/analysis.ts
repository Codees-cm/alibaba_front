import instance from '../api';


export const getProductsAmount = async () => {
    const response = await instance.get('/analysis/total-product-count/')
                                      .then((res)=>{
                                        return res
                                      })
    return response;
}

