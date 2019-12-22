export class User {
  constructor(
    id: string,
    email: string,
    private _token: string,
    private _tokenExpiration: Date,
  ) {}

  get token() {
    if (!this._tokenExpiration || new Date() > this._tokenExpiration) {
      console.log('não rolou token');
      return;
    }
    return this._token;
  }

  get tokenExpiration() {
    return this._tokenExpiration;
  }
}
