import axios from 'axios';
import jwt from './jwt';

class Auth {
  private jwtEndPoint = '/auth/jwt';
  private loginEndPoint = '/login';
  private logoutEndPoint = '/logout';
  private timeoutId = undefined;
  private refreshing: Promise<void> | false;

  public async authenticate(params: { username: string, password: string }): Promise<{ username: string } | null> {
    try {
      const result = await axios.get(this.loginEndPoint, { params });
      return result.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  
  public async logout(): Promise<void> {
    try {
      await axios.get(this.logoutEndPoint);
    } catch (error) {
      console.log(error);
    }
  }

  public async waitForJWT(): Promise<void> {
    if (this.refreshing) {
      return this.refreshing;
    }
    return Promise.resolve();
  }

  public setJWT(): Promise<void> {
    this.refreshing = this._setJWT();
    return this.refreshing;
  }

  private async _setJWT(): Promise<void> {
    try {
      const { token, expiry } = (await axios.get(this.jwtEndPoint)).data;
      jwt.token = token;
      this.timeoutId = jwt.refresh(expiry, this.setJWT.bind(this), this.cancel.bind(this));
    } catch (error) {
      jwt.token = false;
      console.log(error);
    }
  }

  public cancel(): void {
    if (this.timeoutId) {
      window.clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  public async authenticated(): Promise<boolean> {
    await this.waitForJWT();
    
    return jwt.token !== false;
  }
}

const auth = new Auth();

export default auth;
