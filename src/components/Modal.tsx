import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';

type ModalProps = {
  title: string;
  onClose: () => void;
  className?: string;
  onKeyDown?: (event: KeyboardEvent<HTMLDialogElement>) => void;
  children: ReactNode | ((close: () => void) => ReactNode);
};

export function Modal({ title, onClose, children, className = '', onKeyDown }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [closing, setClosing] = useState(false);
  const requestClose = () => {
    if (closing) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { onClose(); return; }
    setClosing(true);
    timer.current = setTimeout(onClose, 280);
  };

  useEffect(() => {
    const prior = document.activeElement as HTMLElement | null;
    const dialog = ref.current!;
    const bodyOverflow = document.body.style.overflow;
    const bodyPadding = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
    return () => {
      clearTimeout(timer.current);
      dialog.close();
      document.body.style.overflow = bodyOverflow;
      document.body.style.paddingRight = bodyPadding;
      if (prior?.isConnected) prior.focus({ preventScroll: true });
    };
  }, []);

  return <dialog ref={ref} className={`modal ${className} ${closing ? 'is-closing' : ''}`}
    aria-label={title}
    onCancel={event => { event.preventDefault(); requestClose(); }}
    onKeyDown={event => {
      onKeyDown?.(event);
      if (event.key !== 'Tab') return;
      const items = [...event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex="0"]')].filter(el => el.getClientRects().length > 0);
      const first = items[0], last = items[items.length - 1];
      const current = document.activeElement;
      if (event.shiftKey && (current === first || !items.includes(current as HTMLElement))) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && (current === last || !items.includes(current as HTMLElement))) { event.preventDefault(); first?.focus(); }
    }}
    onClick={event => {
      if (event.target !== event.currentTarget) return;
      const bounds = event.currentTarget.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) requestClose();
    }}>
    <button className="close-button" onClick={requestClose} aria-label="Fechar painel" autoFocus>
      <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m6 6 12 12M18 6 6 18" /></svg>
    </button>
    {typeof children === 'function' ? children(requestClose) : children}
  </dialog>;
}
