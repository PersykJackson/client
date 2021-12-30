import axios from 'axios';
import store from '../store';

type Data = Record<string, unknown>;

export default axios;

const { token } = store.getState().auth;

export const post = (url: string, data: Data): Promise<Data> =>
  axios.post(url, data, {
    headers: {
      authorization: token || '',
    },
  });

export const get = (url: string): Promise<Data> =>
  axios.get(url, {
    headers: {
      authorization: token || '',
    },
  });
