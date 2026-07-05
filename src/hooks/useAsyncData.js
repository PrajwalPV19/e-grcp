import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export function useAsyncData(status, actionCreator) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(actionCreator());
    }
  }, [dispatch, status, actionCreator]);
}
