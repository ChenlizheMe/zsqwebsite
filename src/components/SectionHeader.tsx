import { Reveal } from "./Reveal";

export function SectionHeader({ id, title, note }: { id: string; title: string; note?: string }) {
  return (
    <Reveal>
      <div className="section-head">
        <span className="section-head__id">SEC · {id}</span>
        <div className="section-head__main">
          <h2>{title}</h2>
          {note ? <p className="section-head__note">{note}</p> : null}
        </div>
      </div>
    </Reveal>
  );
}
