import http from "./httpService";

const apiEndPoint = "http://localhost:5000";

export function getTweets(query) {
  return http.post(`${apiEndPoint}/getTweets`, { q: query });
}

export function getUsers(users) {
  return http.get(`${apiEndPoint}/getUsers?q=${users}`);
}
