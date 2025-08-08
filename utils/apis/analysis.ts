import instance from '../api';

export const getDashboardOverview = async () => {
    const response = await instance.get('/dashboard/overview/');
    return response.data;
}

