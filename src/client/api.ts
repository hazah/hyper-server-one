import axios, { AxiosInstance } from 'axios';
import jwt from './jwt';
import auth from './auth';

class Api {
  private _baseURL: string;

  public constructor(baseURL: string) {
    this._baseURL = baseURL;
  }

  private get baseURL(): string {
    return this._baseURL;
  }

  private async client(): Promise<AxiosInstance | null> {
    if (await auth.authenticated()) {
      const { baseURL } = this;

      return axios.create({
        baseURL,
        headers: {
          'Authorization': `Bearer ${jwt.token}`
        }
      });
    }

    return null;
  }
}

export default Api;
