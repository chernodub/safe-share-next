interface DateProps {
  readonly value: Date;
  readonly locale?: string;
}

export function DateTime({ value, locale = 'en' }: DateProps) {

  /*
   * Unable to use default local time formatting because https://github.com/nodejs/node/issues/46123
   * is causing issues when running app in SSR mode.
   * This will automatically be fixed when Chrome ships 110 (which brings new ICU that is in sync with Node 18.13+).
   */
  const time = `${formatTimePart(value.getHours())}:${formatTimePart(value.getMinutes())}`;
  const date = value.toLocaleDateString(locale);

  return (
    <>
      {date}, {time}
    </>
  );
}

const formatTimePart = (time: number) => time.toString().padStart(2, '0');
