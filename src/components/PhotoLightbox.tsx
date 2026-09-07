import { useRef, useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { Modal } from './Modal';

export function PhotoLightbox({ initialIndex, onClose }: { initialIndex: number; onClose: () => void }) {
  const [index, setIndex] = useState(initialIndex);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const photos = siteConfig.gallery;
  const photo = photos[index];
  const move = (direction: number) => setIndex(current => (current + direction + photos.length) % photos.length);
  return <Modal title="Fotos da clínica" className="lightbox" onClose={onClose} onKeyDown={event => {
    if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
  }}>{close => <>
    <header className="lightbox-header"><span className="eyebrow">NOSSO ESPAÇO</span><span>MK Odontologia Integrada</span></header>
    <div className="lightbox-stage" onClick={event => { if (event.target === event.currentTarget) close(); }}
      onTouchStart={event => { if (event.touches.length === 1) touch.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; else touch.current = null; }}
      onTouchEnd={event => {
        if (!touch.current || !event.changedTouches[0]) return;
        const dx = event.changedTouches[0].clientX - touch.current.x;
        const dy = event.changedTouches[0].clientY - touch.current.y;
        if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) move(dx < 0 ? 1 : -1);
        touch.current = null;
      }}>
      <img key={photo.name} src={`${import.meta.env.BASE_URL}images/${photo.name}.webp`} alt={photo.alt} width="1160" height="774" draggable={false} />
    </div>
    <footer className="lightbox-footer">
      <p aria-live="polite" aria-atomic="true"><strong>{photo.label}</strong><span>{index + 1} de {photos.length}</span></p>
      <nav aria-label="Navegar entre fotos"><button onClick={() => move(-1)} aria-label="Foto anterior"><span aria-hidden="true">←</span></button><button onClick={() => move(1)} aria-label="Próxima foto"><span aria-hidden="true">→</span></button></nav>
    </footer>
  </>}</Modal>;
}
