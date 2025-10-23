import api from './fetchApi';

export const servicesApi = {
  getAllServices: () => api.get('/services'),
  scheduleService: (payload: { userEmail: string; serviceId: string; date: string; time: string }) =>
    api.post('/appointments', payload),
  getUserAppointments: (email: string) => api.get(`/appointments/user/${encodeURIComponent(email)}`),
};