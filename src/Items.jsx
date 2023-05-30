import { useQuery } from '@tanstack/react-query';
import customFetch from './utils';
import SingleItem from './SingleItem';
import { useFetch } from './reactQueryCustomHooks';

const Items = () => {
  const { data, isLoading, isError } = useFetch();
  if (isLoading) {
    return <h4 style={{ marginTop: '2rem' }}>Loading...</h4>;
  }
  if (isError) {
    return <h4 style={{ marginTop: '2rem' }}>Error....</h4>;
  }
  return (
    <div className='items'>
      {data.taskList.map((item) => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div>
  );
};

export default Items;
