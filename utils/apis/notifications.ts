import instance from '../api';


export const fetchNotifications = async () => {
    const response = await instance.get('/notifications/')
                                      .then((res)=>{
                                        return res
                                      })
    return response;
}

export const createNotifications = async (data: any) => {
    const response = await instance.post('/notifications/',data)
    .then((res)=>{
      return res
    })
    return response;
}

export const editNotifications = async (data: any) => {
    const response = await instance.put('/notifications/',data)
    .then((res)=>{
      return res
    })
    return response;
}


export const viewNotifications = async (id: any) => {
    const response = await instance.get(`/notifications/${id}/`)
    .then((res)=>{
      return res
    })
    return response;
}

export const deleteNotifications = async (id: any) => {
    const response = await instance.delete(`/notifications/${id}/`)
    .then((res)=>{
      return res
    })
    return response;
}