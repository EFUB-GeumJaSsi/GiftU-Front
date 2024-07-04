import axios from 'axios';

const client = axios.create();
client.defaults.baseURL = `${process.env.SERVER_URL}`;
client.defaults.withCredentials = true;

export default client;
