interface DateProps {
  readonly value: Date;
}

export function Date({ value: date }: DateProps) {
  return (
    <>
      {date.toLocaleDateString()}, {date.toLocaleTimeString(undefined, { timeStyle: 'short' })}
    </>
  );
}
