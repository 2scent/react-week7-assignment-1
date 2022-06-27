import { fireEvent, render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import LoginFormContainer from './LoginFormContainer';

jest.mock('react-redux');

describe('LoginFormContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      loginFields: {
        email: 'test@test',
        password: '1234',
      },
    }));
  });

  it('render Input Control', () => {
    const { getByLabelText } = render(<LoginFormContainer />);

    expect(getByLabelText('E-mail')).not.toBeNull();
    expect(getByLabelText('Password')).not.toBeNull();

    expect(getByLabelText('E-mail').value).toBe('test@test');
  });

  it('renders "Log In" button', () => {
    const { getByText } = render(<LoginFormContainer />);

    fireEvent.click(getByText('Log In'));

    expect(dispatch).toBeCalled();
  });
});
