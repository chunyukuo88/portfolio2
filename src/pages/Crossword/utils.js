import axios from 'axios';

export const emptyGridFiveByFive = [
  [{value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''}],
  [{value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''}],
  [{value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''}],
  [{value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''}],
  [{value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''}],
];

export const emptyGridThreeByThree = [
  [{value: ''}, {value: ''}, {value: ''}],
  [{value: ''}, {value: ''}, {value: ''}],
  [{value: ''}, {value: ''}, {value: ''}],
];

export const emptyGridTwoByTwo = [
  [{ value: '' },{ value: '' }],
  [{ value: '' },{ value: '' }],
];

export const getData = (url, handlers, jwt) => {
  if (jwt) {
    axios.defaults.headers.common.Authorization = `Bearer ${jwt}`;
  }
  axios.get(url)
    .then((response) => handlers.success(response))
    .catch(() => handlers.failure());
};
