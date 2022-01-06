export function thunk({ dispatch }) {
  return function wrapDispatch(next) {
    return function handleAction(action) {
      if(typeof action === 'function') {
        action(dispatch)
      } else {
        return next(action);
      }
    };
  };
}
