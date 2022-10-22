import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
});

instance.interceptors.request.use((context) => {
  const accessToken = localStorage.getItem('Authorization') || '';
  if (accessToken && context.headers) {
    context.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return context;
});

export default instance;
