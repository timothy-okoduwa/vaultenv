'use client';

import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-zinc-950 group-[.toaster]:text-zinc-50 group-[.toaster]:border-zinc-800',
          description: 'group-[.toast]:text-zinc-400',
          actionButton: 'group-[.toast]:bg-green-500 group-[.toast]:text-black',
          cancelButton: 'group-[.toast]:bg-zinc-800 group-[.toast]:text-zinc-300',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
