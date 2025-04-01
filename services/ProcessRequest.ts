export default class ProcessRequest {
  static async get(url: string) {
    try {
      const response = await fetch(url);

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
