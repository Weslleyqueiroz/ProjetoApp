import api from './api';

export interface AppointmentData {
  serviceId: string;
  date: string;
  time: string;
}

export const appointmentService = {
  create: async (data: AppointmentData) => {
    return api.post('/appointments', data);
  },

  getUserAppointments: async () => {
    return api.get('/appointments/user');
  },

  getAvailableHours: async (date: string) => {
    return api.get(`/appointments/available?date=${date}`);
  }
};