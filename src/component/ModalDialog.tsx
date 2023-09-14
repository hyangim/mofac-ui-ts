import React,{ useEffect, useRef } from 'react';

interface props{
    isOpen : boolean, 
    children: React.ReactNode
}
export default function ModalDialog({ isOpen, children }: props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const dialog = ref.current;
    dialog?.showModal();
    return () => {
      dialog?.close();
    };
  }, [isOpen]);

  return <dialog ref={ref}> {children} </dialog>;
}
