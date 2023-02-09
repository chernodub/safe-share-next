import { Button } from '@chakra-ui/react';
import type { PropsWithChildren } from 'react';
import { useCallback } from 'react';

interface ShareLinkButtonProps extends PropsWithChildren {
  readonly link: string;
  readonly onCopy?: () => void;
}
export function ShareLinkButton({ children, link, onCopy }: ShareLinkButtonProps) {
  const handleShareClick = useCallback(async () => {
    // `canShare` is actually nullish when the browser doesn't support the API
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (navigator.canShare?.({ text: link })) {
      await navigator.share({ text: link });
      return;
    }

    await navigator.clipboard.writeText(link);
    onCopy?.();
  }, [link, onCopy]);

  return (
    <Button onClick={handleShareClick}>
      {children}
    </Button>
  );
}
