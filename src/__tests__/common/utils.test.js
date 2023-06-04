import {getBlogs, getCrosswords, postData, updateBlogPost} from 'src/common/utils';

afterEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

const url = 'www.test.com/data';

describe('utils', () => {
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
    describe('GIVEN: the server has problems,', () => {
      describe('WHEN: getCrosswords() is invoked,', () => {
        it('THEN: The function throws an error.', async () => {
          global.fetch = jest.fn(() =>
            Promise.resolve({
              ok: false,
            })
          );

          await expect(getCrosswords()).rejects.toThrow('An error occurred while fetching the crossword puzzles.');
        });
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

          const result = await getBlogs();

          expect(global.fetch).toHaveBeenCalledWith(process.env.REACT_APP_GET_BLOG_ENTRIES);
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

          await expect(getBlogs()).rejects.toThrow('An error occurred while fetching the posts.');
        });
      });
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
      const url = `${process.env.REACT_APP_UPDATE_BLOG_ENTRY}/${entityId}`;
      it('THEN: updates the aspect of the blog.', async () => {
        const mockResponse = { status: 200 };
        const mockFetch = jest.fn().mockReturnValue(mockResponse);
        global.fetch = mockFetch;

        await updateBlogPost(entityId, data);

        expect(mockFetch).toBeCalledWith(url, data);
      });
      it('THEN: updates logs a success response.', async () => {
        const mockResponse = { status: 200 };
        const mockFetch = jest.fn().mockReturnValue(mockResponse);
        global.fetch = mockFetch;

        const logSpy = jest.spyOn(console, 'log').mockImplementationOnce(jest.fn());
        await updateBlogPost(entityId, data);

        expect(logSpy).toBeCalledWith(mockResponse);
      });
    });
    describe('WHEN: updateBlogPost() is invoked but there is an error', () => {
      it('THEN: logs the error', async () => {
        const mockFetch = jest.fn(() => {
          throw new Error('API is down');
        });
        global.fetch = mockFetch;
        const errorSpy = jest.spyOn(console, 'error').mockImplementationOnce(jest.fn());

        await updateBlogPost(entityId, data);

        expect(errorSpy).toBeCalledTimes(1);
        expect(errorSpy).toBeCalledWith('oh nose');
      });
    });
  });
});
