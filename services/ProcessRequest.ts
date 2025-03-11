export default class ProcessRequest {
  private _url = "";

  public get url(): string {
    return this._url;
  }

  public set url(pUrl) {
    this._url = pUrl;
  }

  async get() {
    try {
      const response = await fetch(this.url);

      if (response) {
        try {
          const realData = await response.json();
          return realData;
        } catch (error) {
          throw error;
        }
      }
    } catch (error) {
      throw error;
    }
  }
}
