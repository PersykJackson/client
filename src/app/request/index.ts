import axios from 'axios';

type Data = Record<string, unknown>;

export default axios;

export const post = (url: string, data: Data): Promise<Data> => axios.post(url, data);

export const get = (url: string): Promise<Data> => axios.get(url);
