import { FormControl, FormLabel, Textarea } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

export interface PostFormValue {
  readonly content: string;
}

interface PostFormProps {
  readonly formId: string;
  readonly defaultValue: PostFormValue;
  readonly onSubmit: (data: PostFormValue) => void;
}

export function PostForm({ defaultValue, onSubmit, formId }: PostFormProps) {
  const { handleSubmit, register } = useForm({
    defaultValues: defaultValue,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} id={formId}>
      <FormControl>
        <FormLabel>Post Content</FormLabel>
        <Textarea {...register('content', { required: true })} />
      </FormControl>
    </form>
  );
}
