import type { ReactNode } from 'react';

interface Props {
  link: string;
  children: ReactNode;
}

function ConditionalLink({ link, children }: Props) {
  return (
    <>
      {link ? (
        <a href={link} target='_blank'>
          {children}
        </a>
      ) : (
        children
      )}
    </>
  );
}

export default ConditionalLink;
