import http from './http';

export async function login(data) {
  return http.post('/mobile/auth/login', data);
}

export async function register(data) {
  return http.post('/mobile/auth/register', data);
}
