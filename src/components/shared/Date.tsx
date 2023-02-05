interface DateProps {
  readonly value: Date;
}

export function Date({ value: date }: DateProps) {
  return <>{date.toTimeString()}</>;
}
