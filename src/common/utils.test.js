import { getData, postData } from './utils';

afterEach(() => {
  jest.clearAllMocks();
});

const url = 'www.test.com/data';

describe('utils', () => {
  describe('WHEN: getData() is invoked', () => {
    it('THEN: it returns a JSON data object.', async () => {
      const mockData = { foo: 'bar' };
      const mockResponse = { json: jest.fn().mockResolvedValue(mockData) };
      const mockFetch = jest.fn().mockResolvedValue(mockResponse);
      global.fetch = mockFetch;

      const data = await getData(url);

      expect(mockFetch).toHaveBeenCalledWith(url);
      expect(mockResponse.json).toHaveBeenCalled();
      expect(data).toEqual(mockData);
    });
  });
  describe('WHEN: postData() is invoked,', () => {
    it('THEN: posts data to a specified URL', async () => {
      const data = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: 'Hello, world!' })
      };

      const mockResponse = { status: 200 };
      const mockFetch = jest.fn().mockResolvedValue(mockResponse);
      global.fetch = mockFetch;
      const spy = jest.spyOn(console, 'log');
      await postData(url, data);

      expect(mockFetch).toHaveBeenCalledWith(url, data);
      expect(spy).toBeCalledWith(mockResponse);
    });
    it('THEN: handles errors when posting data', async () => {
      const data = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: 'Hello, world!' })
      };

      const mockError = new Error('Something went wrong.');
      const mockFetch = jest.fn().mockRejectedValueOnce(mockError);
      global.fetch = mockFetch;

      await expect(postData(url, data)).resolves.toThrow(mockError);
    });
  });
});
