import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M11.21 3.53a.75.75 0 011.06.22l5.25 6.5a.75.75 0 01-.84 1.2L12 8.788l-4.68 2.652a.75.75 0 01-.84-1.2l5.25-6.5a.75.75 0 01.48-.22zM8.07 12.382l-4.68 2.652a.75.75 0 00-.22 1.06l5.25 6.5a.75.75 0 001.28-.44l-1.42-7.22v-.001a.75.75 0 00-.4-1.05zM15.93 12.382a.75.75 0 00-.4 1.05v.001l-1.42 7.22a.75.75 0 001.28.44l5.25-6.5a.75.75 0 00-.22-1.06l-4.68-2.652z"
        clipRule="evenodd"
      />
    </svg>
  );
}
