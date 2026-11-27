import { useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { t } from '../i18n/index.js';
import { examLogos, exams } from '../data/exams';

const logos = new Map(
  exams.filter(({ id }) => examLogos[id]).map(({ id, name }) => [
    examLogos[id], id === 'eear1' || id === 'eear2' ? 'EEAR' : name,
  ]),
);

export default function Hero() {
  const [paused, setPaused] = useState(false);
  return (
    <>
      <section className="hero">
        <div className="title">
          <h1>Plantel de Dúvidas</h1>
        </div>
        <div className="frase-kant"> {t("\"O ser humano é aquilo que a educação faz dele\"")}<br /> — Immanuel Kant
        </div>
      </section>
      <div className="hero-exam-carousel">
        <div className="hero-exam-window">
          <div className="hero-exam-track" data-paused={paused}>
            {[false, true].map((duplicate) => (
              <ul key={String(duplicate)} className="hero-exam-logos"
                aria-hidden={duplicate || undefined}
                aria-label={duplicate ? undefined : t("Calendário de concursos")}>
                {[...logos].map(([logo, name]) => (
                  <li key={logo}>
                    <img src={`/images/${logo}`} alt={duplicate ? "" : name} width="72" height="58" />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <button className="hero-exam-toggle" type="button" onClick={() => setPaused(!paused)}
          aria-label={t(paused ? "Retomar carrossel automático" : "Pausar carrossel automático")}>
          {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
        </button>
      </div>
    </>
  );
}
