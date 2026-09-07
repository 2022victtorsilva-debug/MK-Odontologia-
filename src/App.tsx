import { useEffect, useRef, useState } from 'react';
import { Modal } from './components/Modal';
import { SpecialtyPanel } from './components/SpecialtyPanel';
import { PhotoLightbox } from './components/PhotoLightbox';
import { siteConfig as site } from './config/siteConfig';
import type { Specialty } from './config/siteConfig';

const asset = (name: string) => `${import.meta.env.BASE_URL}images/${name}.webp`;
const links = [['Sobre', 'sobre'], ['Especialidades', 'especialidades'], ['Profissionais', 'profissionais'], ['Estrutura', 'estrutura'], ['Contato', 'contato']];

function Brand({ light = false }: { light?: boolean }) {
  return <a className={`brand ${light ? 'brand-light' : ''}`} href="#inicio" aria-label={`${site.name}, início`}><span className="brand-monogram">MK<span /></span><span className="brand-name">ODONTOLOGIA<span>INTEGRADA</span></span></a>;
}
function Photo({ name, alt, className = '', eager = false, sizes = '(max-width: 760px) 100vw, 50vw' }: { name: string; alt: string; className?: string; eager?: boolean; sizes?: string }) {
  const portrait = name === 'mk-hero-equipe' || name === 'mk-equipe-logo';
  return <img className={className} src={asset(name)} srcSet={`${asset(`${name}-480`)} 480w, ${asset(name)} ${portrait ? 736 : 1160}w`} sizes={sizes} width={portrait ? 736 : 1160} height={name === 'mk-hero-equipe' ? 804 : name === 'mk-equipe-logo' ? 852 : 774} alt={alt} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} decoding="async" />;
}
function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState<Specialty | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    document.querySelectorAll('[data-reveal]').forEach(el => { el.classList.add('will-reveal'); observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const resize = () => { if (window.innerWidth > 1000) setMenuOpen(false); };
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const outside = (event: PointerEvent) => { if (!(event.target as Element).closest('.site-header')) setMenuOpen(false); };
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') { setMenuOpen(false); menuButton.current?.focus(); } };
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape);
    return () => { document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', escape); };
  }, [menuOpen]);

  const contact = () => {
    if (site.whatsapp) window.open(site.whatsapp, '_blank', 'noopener,noreferrer');
    else setContactOpen(true);
  };
  const gallery = site.gallery;
  const moveGallery = (index: number) => {
    const el = galleryRef.current?.children[index] as HTMLElement | undefined;
    if (el && galleryRef.current) galleryRef.current.scrollTo({ left: el.offsetLeft - (galleryRef.current.children[0] as HTMLElement).offsetLeft, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };

  return <>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <header className="site-header">
      <div className="header-inner"><Brand />
        <nav className="desktop-nav" aria-label="Navegação principal">{links.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
        <button className="header-cta" onClick={contact}>Agendar avaliação</button>
        <button ref={menuButton} className={`menu-toggle ${menuOpen ? 'is-open' : ''}`} aria-expanded={menuOpen} aria-controls="mobile-nav" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
      </div>
      <nav id="mobile-nav" className={`mobile-nav ${menuOpen ? 'is-open' : ''}`} inert={!menuOpen} aria-hidden={!menuOpen} aria-label="Navegação móvel" onKeyDown={e => { if (e.key === 'Escape') { setMenuOpen(false); menuButton.current?.focus(); } }}>{links.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}<button className="button button-primary" onClick={() => { setMenuOpen(false); contact(); }}>Agendar avaliação</button></nav>
    </header>
    <main id="conteudo">
      <section className="hero" id="inicio" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow hero-intro">MK ODONTOLOGIA INTEGRADA</p>
          <h1 id="hero-title" className="hero-title">Odontologia<br />integrada com<br /><em>atenção a você.</em></h1>
          <p className="hero-description">{site.institutional.introduction}</p>
          <div className="hero-actions"><a className="button button-primary" href="#especialidades">Conheça as especialidades</a><a className="text-link" href="#sobre">Conheça a MK</a></div>
        </div>
        <div className="hero-visual"><div className="hero-photo"><Photo name="mk-hero-equipe" alt="Os dois profissionais da MK Odontologia com uniformes azuis no consultório" eager sizes="(max-width: 760px) 100vw, 52vw" /></div><div className="hero-photo-caption"><span>MK ODONTOLOGIA INTEGRADA</span><span>Vitória da Conquista, Bahia</span></div></div>
      </section>

      <section id="sobre" className="about section-pad" aria-labelledby="about-title">
        <div className="section-grid" data-reveal><p className="eyebrow">SOBRE A MK</p><div><h2 id="about-title">{site.institutional.aboutTitle}</h2><div className="about-text"><p>{site.institutional.about}</p><p>{site.institutional.aboutComplement}</p></div></div></div>
      </section>

      <section id="especialidades" className="specialties section-pad" aria-labelledby="specialties-title">
        <div className="section-heading" data-reveal><div><p className="eyebrow">ESPECIALIDADES</p><h2 id="specialties-title">Encontre informações<br />sobre o seu tratamento.</h2></div><p>Entenda o que cada especialidade avalia<br className="desktop-break" /> e quando procurar orientação.</p></div>
        <div className="specialty-grid">{site.specialties.map((item, index) => <button className={`specialty-card specialty-${index}`} key={item.id} onClick={() => setSelected(item)} aria-label={`Saiba mais sobre ${item.title}`} aria-haspopup="dialog" data-reveal data-reveal-delay={index}><div className="specialty-image"><Photo name={item.image} alt={item.imageAlt} /></div><div className="specialty-content"><h3>{item.title}</h3><p>{item.shortDescription}</p><span className="text-link">Saiba mais</span></div></button>)}</div>
      </section>

      <section className="experience section-pad" aria-labelledby="experience-title"><div className="experience-intro" data-reveal><p className="eyebrow">COMO É O ATENDIMENTO</p><h2 id="experience-title">Você participa<br />de cada decisão.</h2></div><div className="experience-list">{site.experience.map(item => <div className="experience-item" key={item.title} data-reveal><div><h3>{item.title}</h3><p>{item.text}</p></div></div>)}</div></section>

      <section id="profissionais" className="team section-pad" aria-labelledby="team-title"><div className="team-photo" data-reveal><Photo name="mk-equipe-logo" alt="Equipe da MK na recepção, em frente à marca da clínica" /><div className="team-photo-note">A equipe da MK</div></div><div className="team-copy" data-reveal><p className="eyebrow">PROFISSIONAIS</p><h2 id="team-title">{site.institutional.teamTitle}</h2><p>{site.institutional.team}</p><p>{site.institutional.teamComplement}</p><div className="team-disciplines">{site.professionals.map(p => <div key={p.specialty}><span>{p.specialty}</span>{p.name && <p>{p.name}{p.cro && `, CRO ${p.cro}`}</p>}<button onClick={() => setSelected(site.specialties.find(item => item.title === p.specialty) ?? null)} aria-label={`Conhecer a área de ${p.specialty}`}>Conhecer a área</button></div>)}</div><a className="text-link" href="#estrutura">Conheça nosso espaço</a></div></section>

      <section id="estrutura" className="structure section-pad" aria-labelledby="structure-title"><div className="section-heading" data-reveal><div><p className="eyebrow">NOSSO ESPAÇO</p><h2 id="structure-title">Conheça a clínica<br /><em>antes da sua visita.</em></h2></div><p>Da recepção à sala de atendimento,<br className="desktop-break" /> veja os ambientes da MK.</p></div><div className="gallery" ref={galleryRef} onScroll={e => { const el = e.currentTarget; const first = el.children[0] as HTMLElement; const second = el.children[1] as HTMLElement; const step = second.offsetLeft - first.offsetLeft; if (step > 0) setGalleryIndex(Math.min(2, Math.round(el.scrollLeft / step))); }}>{gallery.map((photo, i) => <figure className={`gallery-item gallery-${i}`} key={photo.name} data-reveal><button className="gallery-photo-button" onClick={() => setLightboxIndex(i)} aria-label={`Ampliar foto: ${photo.label}`} aria-haspopup="dialog"><Photo name={photo.name} alt={photo.alt} /></button><figcaption><strong>{photo.label}</strong></figcaption></figure>)}</div><div className="gallery-controls" aria-label="Navegação das fotos">{gallery.map((photo, i) => <button key={photo.name} onClick={() => moveGallery(i)} aria-label={`Ver ${photo.label}`} aria-current={galleryIndex === i ? 'true' : undefined}><span /></button>)}<span>Toque na foto para ampliar</span></div></section>

      {site.reviews.length > 0 && <section className="reviews section-pad" aria-label="Avaliações de pacientes"><p className="eyebrow">QUEM JÁ CONHECE A MK</p><h2>Experiências compartilhadas.</h2>{site.reviews.map(review => <blockquote key={review.url}><p>{review.text}</p><footer>{review.name} · <a href={review.url} target="_blank" rel="noreferrer">{review.source}</a></footer></blockquote>)}</section>}

      <section id="contato" className="location" aria-labelledby="location-title"><div className="location-image"><Photo name="mk-fachada" alt="Fachada azul da MK Odontologia Integrada e acesso à clínica" /></div><div className="location-copy" data-reveal><p className="eyebrow">VISITE A MK</p><h2 id="location-title">Vamos conversar<br />sobre o seu tratamento?</h2><p>Uma avaliação ajuda a esclarecer suas dúvidas<br className="desktop-break" /> e entender por onde começar.</p><div className="location-address"><svg aria-hidden="true" viewBox="0 0 24 24" width="23" height="23" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.4"/></svg><span>{site.city}, {site.state}{site.address && <small>{site.address}</small>}</span></div>{site.hours && <p>{site.hours}</p>}<button className="button button-light" onClick={contact}>Agendar uma avaliação</button></div></section>
    </main>
    <footer className="footer"><div className="footer-main"><Brand /><p>Atendimento odontológico<br />em Vitória da Conquista.</p><nav aria-label="Navegação do rodapé"><a href="#especialidades">Especialidades</a><a href="#profissionais">Profissionais</a><a href="#contato">Contato</a>{site.instagram && <a href={site.instagram} target="_blank" rel="noreferrer">Instagram</a>}</nav><a className="back-top" href="#inicio" aria-label="Voltar ao início">Início</a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {site.name}.</span><span>{site.city}, Bahia</span></div></footer>

    {selected && <SpecialtyPanel specialty={selected} onChange={setSelected} onClose={() => setSelected(null)} onContact={() => { setSelected(null); contact(); }} />}
    {lightboxIndex !== null && <PhotoLightbox initialIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />}
    {contactOpen && <Modal title="Converse com a MK" onClose={() => setContactOpen(false)} className="contact-modal"><div className="modal-content"><p className="eyebrow">ATENDIMENTO</p><h2>Converse com<br />a recepção da MK.</h2><p>A recepção pode orientar você sobre consultas e horários de atendimento.</p><div className="contact-location"><strong>{site.name}</strong><span>{site.city}, {site.state}</span>{site.address && <span>{site.address}</span>}{site.phone && <a href={`tel:${site.phone}`}>{site.phone}</a>}</div><p className="clinical-note">O agendamento é realizado diretamente com a clínica.</p><button className="button button-primary" onClick={() => { setContactOpen(false); document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' }); }}>Conheça nossa localização</button></div></Modal>}
  </>;
}
export default App;
