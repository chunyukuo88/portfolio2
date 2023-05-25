import { getCrosswords, postData } from 'src/common/utils';

afterEach(() => {
  jest.clearAllMocks();
});

const url = 'www.test.com/data';

describe('utils', () => {
  describe('WHEN: postData() is invoked,', () => {
    // TODO: Tests for getCrosswords
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
      const mockFetch = jest.fn().mockReturnValue(mockResponse);
      global.fetch = mockFetch;
      const spy = jest.spyOn(console, 'log').mockImplementationOnce(jest.fn());

      await postData(url, data);

      expect(mockFetch).toHaveBeenCalledWith(url, data);
      expect(spy).toBeCalledWith(mockResponse);
    });
    it('THEN: handles errors when posting data', async () => {
      const mockFetch = jest.fn(() => {
        throw new Error('API is down');
      });
      global.fetch = mockFetch;
      const spy = jest.spyOn(console, 'error').mockImplementationOnce(jest.fn());

      await postData(url, {});

      await expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});

