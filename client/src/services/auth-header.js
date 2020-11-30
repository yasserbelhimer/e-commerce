export default function authHeader() {
  const admin = JSON.parse(localStorage.getItem('admin'));

  if (admin && admin.accessToken) {
    return {'Content-Type': 'application/json','x-access-token': admin.accessToken };
  } else {
    return {'Content-Type': 'application/json'};
  }
}