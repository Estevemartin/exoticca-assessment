import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

const fetchUsers = () => {
  return axios.get("https://jsonplaceholder.typicode.com/users").then(res=>res.data)
}

export const useFetchUsers = () => {
  return useQuery(['fetch-users'], fetchUsers)
}
