import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API = axios.create({ baseURL: `${API_BASE}/api/students`, timeout: 120000 }); // 120s timeout

export const uploadStudents = async (file, year) => {
  const fd = new FormData();
  fd.append('file', file);
  if (year) fd.append('year', year);
  const { data } = await API.post('/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
  return data;
};

export const getLeaderboard = async () => {
  const { data } = await API.get('/leaderboard', { params: { t: Date.now() } });
  return data;
};

export const refreshStudentStats = async (id) => {
  const { data } = await API.post(`/${id}/refresh`);
  return data;
};

export const refreshAll = async () => {
  const { data } = await API.post('/refresh-all');
  return data;
};
