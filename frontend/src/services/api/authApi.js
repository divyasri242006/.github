import api from './client';

export const signupApi = (payload) => api.post('/auth/signup', payload);
export const loginApi = (payload) => api.post('/auth/login', payload);
export const refreshApi = (payload) => api.post('/auth/refresh', payload);
