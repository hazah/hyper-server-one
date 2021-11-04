class JWT {
  private _token: string | false = false;
  private cancel: () => void;

  private logoutEvent = 'logout';

  public constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (event) => {
        if (event.key === this.logoutEvent) {
          this._token = false;
        }
      });
    }
  }

  public get token(): string | false {
    return this._token;
  }

  public set token(newToken: string | false) {
    if (newToken === false) {
      if (this.cancel) {
        this.cancel();
      }
      window.localStorage.setItem(this.logoutEvent, `${Date.now()}`);
    } else {
      this._token = newToken;
    }
  }

  public refresh(expiry: number, getJWT: TimerHandler, cancel: () => void) {
    this.cancel = cancel;
    return window.setTimeout(getJWT, expiry * 1000 - 5000);
  }
}

const jwt = new JWT();

export default jwt;
