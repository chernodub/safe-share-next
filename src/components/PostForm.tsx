import { FormControl, FormLabel } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { PostEditor } from './Post/PostEditor';

export interface PostFormValue {
  readonly content: string;
}

interface PostFormProps {
  readonly formId: string;
  readonly defaultValue: PostFormValue;
  readonly onSubmit: (data: PostFormValue) => void;
}

export function PostForm({ defaultValue, onSubmit, formId }: PostFormProps) {
  const { handleSubmit, setValue } = useForm({
    defaultValues: defaultValue,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} id={formId}>
      <FormControl>
        <FormLabel>Post Content</FormLabel>
        <PostEditor value={defaultValue.content} onChange={value => setValue('content', value)} />
      </FormControl>
    </form>
  );
}
