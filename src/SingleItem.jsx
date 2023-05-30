import { useMutation, useQueryClient } from '@tanstack/react-query';
import customFetch from './utils';
import { toast } from 'react-toastify';
import { useDelete, useEdit } from './reactQueryCustomHooks';

const SingleItem = ({ item }) => {
  const editTask = useEdit();

  const { deleteTask, deleteTaskLoading } = useDelete();
  return (
    <div className='single-item'>
      <input
        type='checkbox'
        checked={item.isDone}
        onChange={() => editTask({ taskId: item.id, isDone: !item.isDone })}
      />
      <p
        style={{
          textTransform: 'capitalize',
          textDecoration: item.isDone && 'line-through',
        }}
      >
        {item.title}
      </p>
      <button
        className='btn remove-btn'
        type='button'
        disabled={deleteTaskLoading}
        onClick={() => deleteTask(item.id)}
      >
        delete
      </button>
    </div>
  );
};

export default SingleItem;
