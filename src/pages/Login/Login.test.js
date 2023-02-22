import { LoggedOutContent } from './LoginPage';
import { mockStore } from '../../testUtils';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
jest.mock('../../features/auth/useAuth');

afterEach(() => {
  jest.clearAllMocks();
});


