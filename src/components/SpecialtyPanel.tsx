import { useEffect, useRef } from 'react';
import { siteConfig } from '../config/siteConfig';
import type { Specialty } from '../config/siteConfig';
import { Modal } from './Modal';

export function SpecialtyPanel({ specialty, onChange, onClose, onContact }: {
  specialty: Specialty; onChange: (specialty: Specialty) => void; onClose: () => void; onContact: () => void;
}) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const readingRef = useRef<HTMLDivElement>(null);
  const previousId = useRef(specialty.id);
  const index = siteConfig.specialties.findIndex(item => item.id === specialty.id);
  useEffect(() => {
    if (previousId.current === specialty.id) return;
    previousId.current = specialty.id;
    readingRef.current?.scrollTo({ top: 0, behavior: 'instant' });
    if (window.matchMedia('(max-width: 760px)').matches) readingRef.current?.closest('.service-layout')?.scrollTo({ top: 0, behavior: 'instant' });
    titleRef.current?.focus({ preventScroll: true });
  }, [specialty.id]);

  return <Modal title={specialty.title} onClose={onClose} className="service-modal">
    <div className="service-layout">
      <figure className="service-portrait">
        <img key={specialty.image} src={`${import.meta.env.BASE_URL}images/${specialty.image}.webp`} alt={specialty.imageAlt} width="1160" height="774" className="service-photograph" />
        <figcaption><span>MK Odontologia Integrada</span><span>Vitória da Conquista, Bahia</span></figcaption>
      </figure>
      <div className="service-reading" ref={readingRef}>
        <div className="service-copy" key={specialty.id}>
          <p className="eyebrow">ESPECIALIDADES</p>
          <h2 ref={titleRef} tabIndex={-1}>{specialty.title}</h2>
          <p className="service-introduction">{specialty.shortDescription}</p>
          <p>{specialty.description}</p>
          <section className="service-detail"><h3>Quando considerar</h3><p>{specialty.indication}</p></section>
          <section className="service-detail"><h3>O que o tratamento busca</h3>{specialty.benefits.map(benefit => <p key={benefit}>{benefit}</p>)}</section>
          <div className="service-appointment"><p>A avaliação é o primeiro passo para entender as possibilidades para o seu caso.</p><button className="button button-primary" onClick={onContact}>Agendar uma avaliação</button></div>
        </div>
        <nav className="service-pager" aria-label="Navegar entre especialidades">
          <button disabled={index === 0} onClick={() => onChange(siteConfig.specialties[index - 1])}><span aria-hidden="true">←</span> Anterior</button>
          <span>{index + 1} de {siteConfig.specialties.length}</span>
          <button disabled={index === siteConfig.specialties.length - 1} onClick={() => onChange(siteConfig.specialties[index + 1])}>Próxima <span aria-hidden="true">→</span></button>
        </nav>
      </div>
    </div>
  </Modal>;
}
