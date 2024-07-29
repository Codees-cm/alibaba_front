import instance from '../api';


export const getProductsAmount = async () => {
    const response = await instance.get('/analysis/total-product-count/')
                                      .then((res)=>{
                                        return res
                                      })
    return response;
}


export const getProductsAmount_employee = async () => {
  const response = await instance.get('/analysis/count/')
                                    .then((res)=>{
                                      return res
                                    })
  return response;
}


export const getBarGraph = async () => {
  const response = await instance.get('/analysis/monthly-sales-data/')
                                    .then((res)=>{
                                      return res
                                    })
  return response;
}



export const getUserRoleDistib = async () => {
  const response = await instance.get('/user_role_distribution/')
                                    .then((res)=>{
                                      return res
                                    })
  return response;
}

export const getProductCatInsight = async () => {
  const response = await instance.get('analysis/product_category_insights/')
                                    .then((res)=>{
                                      return res
                                    })
  return response;
}

export const getInventoryStat = async () => {
  const response = await instance.get('analysis/inventory_status/')
                                    .then((res)=>{
                                      return res
                                    })
  return response;
}

export const getTopSellingReview = async () => {
  const response = await instance.get('analysis/top_selling_products_revenue/')
                                    .then((res)=>{
                                      return res
                                    })
  return response;
}