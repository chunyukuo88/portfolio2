import {
  createHttpRequest,
  deleteBlog,
  getBlogs,
  getCrosswords,
  postData,
  updateBlogPost,
} from 'src/common/utils';

afterEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

const url = 'www.test.com/data';

describe('utils', () => {
  describe('createHttpRequest()', () => {
    describe('WHEN: The user passes an http method, a token, and NO data', () => {
      test('THEN: it creates a request that does not contain a "data" field.', () => {
        const httpMethod = 'GET';
        const token = 'abc';
        const expectedResult = {
          "headers": {
            "Authorization": "Bearer abc",
            "Content-Type": "application/json"
          },
          "method": "GET"
        };

        const result = createHttpRequest(httpMethod, token);

        expect(result).toEqual(expectedResult);
      });
    });
    describe('WHEN: The user passes an http method, a token, and some data', () => {
      test('THEN: it creates a request that contains a "data" field.', () => {
        const httpMethod = 'POST';
        const token = 'abc';
        const data = {
          foo: 'bar',
        };
        const expectedResult = {
          'headers': {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          'method': `${httpMethod}`,
          'body': "{\"foo\":\"bar\"}",
        };

        const result = createHttpRequest(httpMethod, token, data);

        expect(result).toEqual(expectedResult);
      });
    });
  });
  describe('getCrosswords()', () => {
    describe('GIVEN: there are no problems with the server,', () => {
      describe('WHEN: getCrosswords() is invoked,', () => {
        it('THEN: The function returns data for all crossword puzzles.', async () => {
          global.fetch = jest.fn(() =>
            Promise.resolve({
              ok: true,
              json: () => Promise.resolve({ puzzles: ['puzzle1', 'puzzle2'] }), // Mock the response data
            })
          );

          const result = await getCrosswords();

          expect(global.fetch).toHaveBeenCalledWith(process.env.REACT_APP_GET_ALL_CROSSWORDS);
          expect(result).toEqual({ puzzles: ['puzzle1', 'puzzle2'] });
        });
      });
    });
  });
    describe('GIVEN: there are no problems with the server,', () => {
      describe('WHEN: deleteBlog() is invoked,', () => {
        it('THEN: The fetch is invoked with the options to delete the blog.', async () => {
          global.fetch = jest.fn(() =>
            Promise.resolve({
              ok: true,
              json: () => Promise.resolve({ res: 'some response' }),
            })
          );
          jest.spyOn(console, 'log').mockImplementationOnce(jest.fn());
          const entityId = '123';
          const options = {};
          const concatenatedUrl = `${process.env.REACT_APP_DELETE_BLOG_ENTRY}/${entityId}`

          await deleteBlog(entityId, options);

          expect(global.fetch).toHaveBeenCalledWith(concatenatedUrl, options);
        });
      });
    });
  describe('getBlogs()', () => {
    describe('GIVEN: there are no problems with the server,', () => {
      describe('WHEN: getBlogs() is invoked,', () => {
        it('THEN: The function returns data for all blogs.', async () => {
          global.fetch = jest.fn(() =>
            Promise.resolve({
              ok: true,
              json: () => Promise.resolve({ puzzles: ['entry1', 'entry2'] }), // Mock the response data
            })
          );
          const expectedURL = `${process.env.REACT_APP_GET_BLOG_ENTRIES_INFINITE}/1`;

          const result = await getBlogs();

          expect(global.fetch).toHaveBeenCalledWith(expectedURL);
          expect(result).toEqual({ puzzles: ['entry1', 'entry2'] });
        });
      });
    });
    describe('GIVEN: the server has problems,', () => {
      describe('WHEN: getBlogs() is invoked,', () => {
        it('THEN: The function throws an error.', async () => {
          global.fetch = jest.fn(() =>
            Promise.resolve({
              ok: false,
            })
          );

          const expectedErrorMsg = 'errorLogger is not a constructor';

          await expect(getBlogs()).rejects.toThrow(expectedErrorMsg);
        });
      });
    });
  });
  describe('WHEN: postData() is invoked,', () => {
    it.skip('THEN: posts data to a specified URL', async () => {
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
    it.skip('THEN: handles errors when posting data', async () => {
      const mockFetch = jest.fn(() => {
        throw new Error('API is down');
      });
      global.fetch = mockFetch;
      const spy = jest.spyOn(console, 'error').mockImplementationOnce(jest.fn());

      await postData(url, {});

      await expect(spy).toHaveBeenCalledTimes(1);
    });
  });
  describe('updateBlogPost()', () => {
    const entityId = '123';
    const data = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: 'This is an updated title!' }),
    };
    describe('WHEN: updateBlogPost() is invoked with valid data,', () => {
      const url = `${process.env.REACT_APP_UPDATE_BLOG}${entityId}`;
      it('THEN: updates the aspect of the blog.', async () => {
        const mockResponse = { status: 200 };
        const mockFetch = jest.fn().mockReturnValue(mockResponse);
        global.fetch = mockFetch;

        await updateBlogPost(entityId, data);

        expect(mockFetch).toBeCalledWith(url, data);
      });
      it.skip('THEN: updates logs a success response.', async () => {
        const mockResponse = { status: 200 };
        const mockFetch = jest.fn().mockReturnValue(mockResponse);
        global.fetch = mockFetch;

        const logSpy = jest.spyOn(console, 'log').mockImplementationOnce(jest.fn());
        await updateBlogPost(entityId, data);

        expect(logSpy).toBeCalledWith(expect.any(String), mockResponse);
      });
    });
    describe('WHEN: updateBlogPost() is invoked but there is an error', () => {
      it.skip('THEN: logs the error', async () => {
        const apiError = new Error('API is down');
        const mockFetch = jest.fn(() => {
          throw apiError;
        });
        global.fetch = mockFetch;
        const errorSpy = jest.spyOn(console, 'error').mockImplementationOnce(jest.fn());

        await updateBlogPost(entityId, data);

        expect(errorSpy).toBeCalledTimes(1);
        expect(errorSpy).toBeCalledWith(expect.any(String), apiError);
      });
    });
  });
});
