import { FormControl, FormLabel, Textarea } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

export interface MessageFormValue {
  readonly content: string;
}
interface MessageFormProps {
  readonly formId: string;
  readonly defaultValue: MessageFormValue;
  readonly onSubmit: (data: MessageFormValue) => void;
}

export function MessageForm({ defaultValue, onSubmit, formId }: MessageFormProps) {
  const { handleSubmit, register } = useForm({
    defaultValues: defaultValue,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} id={formId}>
      <FormControl>
        <FormLabel>Message</FormLabel>
        <Textarea {...register('content', { required: true })} />
      </FormControl>
    </form>
  );
}
