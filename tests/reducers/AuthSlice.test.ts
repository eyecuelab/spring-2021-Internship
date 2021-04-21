import { AnyAction } from 'redux';
import slice, {
  setEmail,
  setPassword,
  setUUID,
  signout,
  initialState,
} from '../../src/store/slices/authSlice';

describe('auth reducer', () => {
  let state = { ...initialState };
  it('should handle initial state', () => {
    state = slice(state, {} as AnyAction);
    expect(state).toEqual(initialState);
  });

  it('should set email', () => {
    const email = 'test@example.com';
    state = slice(state, setEmail(email));
    expect(state.email).toEqual(email);
  });

  it('should set password', () => {
    const password = '123456';
    state = slice(state, setPassword(password));
    expect(state.password).toEqual(password);
  });

  it('should set UUID', () => {
    state = slice(state, setUUID());
    expect(state.uuid).toBeTruthy();
  });

  it('should handle signout', () => {
    state = slice(state, signout());
    expect(state).toEqual(initialState);
  });
});
