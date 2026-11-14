"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Play } from "lucide-react";

const videoCategoryLabels = {
  creation: "AI VIDEO CREATION",
  editing: "VIDEO EDITING",
  "motion-graphics": "MOTION GRAPHICS VIDEOS",
};

type VideoCategory = keyof typeof videoCategoryLabels;
type Film = { id: string; title: string; brand: string; duration: string; poster: string; source: string; categories: VideoCategory[] };
const films: Film[] = [
  { id: "rz-film-2", title: "RZ — Film 02", brand: "RZ", duration: "0:36", poster: "/portfolio/rz-video-2/poster.jpg", source: "/portfolio/rz-video-2/film.mp4", categories: ["creation"] },
  { id: "habiba-bakery", title: "Habiba stores — Bakery", brand: "Habiba stores", duration: "0:12", poster: "/portfolio/habiba-stores/bakery.jpg", source: "/portfolio/habiba-stores/bakery.mp4", categories: ["creation"] },
  { id: "habiba-butchery", title: "Habiba stores — Butchery", brand: "Habiba stores", duration: "0:12", poster: "/portfolio/habiba-stores/butchery.jpg", source: "/portfolio/habiba-stores/butchery.mp4", categories: ["creation"] },
  { id: "habiba-deli", title: "Habiba stores — Deli", brand: "Habiba stores", duration: "0:12", poster: "/portfolio/habiba-stores/deli.jpg", source: "/portfolio/habiba-stores/deli.mp4", categories: ["creation"] },
  { id: "winter-cruise", title: "كروز الشتاء", brand: "Winter Cruise", duration: "0:42", poster: "/portfolio/winter-cruise/poster.jpg", source: "/portfolio/winter-cruise/film.mp4", categories: ["creation"] },
  { id: "maddox-film", title: "Maddox", brand: "Maddox", duration: "0:22", poster: "/portfolio/maddox-video/poster.jpg", source: "/portfolio/maddox-video/film.mp4", categories: ["editing"] },
  { id: "bwell-film-1", title: "B.Well — Film 01", brand: "B.Well", duration: "0:16", poster: "/portfolio/bwell-videos/film-1.jpg", source: "/portfolio/bwell-videos/film-1.mp4", categories: ["creation"] },
  { id: "bwell-film-2", title: "B.Well — Film 02", brand: "B.Well", duration: "0:15", poster: "/portfolio/bwell-videos/film-2.jpg", source: "/portfolio/bwell-videos/film-2.mp4", categories: ["creation"] },
  { id: "bwell-film-3", title: "B.Well — Film 03", brand: "B.Well", duration: "0:20", poster: "/portfolio/bwell-videos/film-3.jpg", source: "/portfolio/bwell-videos/film-3.mp4", categories: ["creation"] },
  { id: "bwell-film-4", title: "B.Well — Film 04", brand: "B.Well", duration: "0:21", poster: "/portfolio/bwell-videos/film-4.jpg", source: "/portfolio/bwell-videos/film-4.mp4", categories: ["creation"] },
  { id: "bwell-film-5", title: "B.Well — Film 05", brand: "B.Well", duration: "0:08", poster: "/portfolio/bwell-videos/film-5.jpg", source: "/portfolio/bwell-videos/film-5.mp4", categories: ["creation"] },
  { id: "habiba-film-1", title: "Habiba stores", brand: "Habiba stores", duration: "0:17", poster: "/portfolio/habiba-video/poster.jpg", source: "/portfolio/habiba-video/film.mp4", categories: ["creation"] },
  { id: "grams-film-1", title: "Grams — Film 01", brand: "Grams", duration: "0:14", poster: "/portfolio/grams-videos/film-1.jpg", source: "/portfolio/grams-videos/film-1.mp4", categories: ["creation"] },
  { id: "grams-film-2", title: "Grams — Film 02", brand: "Grams", duration: "0:21", poster: "/portfolio/grams-videos/film-2.jpg", source: "/portfolio/grams-videos/film-2.mp4", categories: ["creation"] },
  { id: "grams-film-3", title: "Grams — Film 03", brand: "Grams", duration: "0:13", poster: "/portfolio/grams-videos/film-3.jpg", source: "/portfolio/grams-videos/film-3.mp4", categories: ["creation"] },
  { id: "grams-film-4", title: "Grams — Film 04", brand: "Grams", duration: "0:14", poster: "/portfolio/grams-videos/film-4.jpg", source: "/portfolio/grams-videos/film-4.mp4", categories: ["creation"] },
  { id: "y-cafe-film", title: "Y Café — Motion Graphics Film", brand: "Y Café", duration: "0:08", poster: "/portfolio/y-cafe-video/poster.jpg", source: "/portfolio/y-cafe-video/film.mp4", categories: ["motion-graphics"] },
  { id: "iris-film-1", title: "Iris — Film 01", brand: "Iris", duration: "0:08", poster: "/portfolio/iris-videos/film-1.jpg", source: "/portfolio/iris-videos/film-1.mp4", categories: ["creation"] },
  { id: "iris-film-2", title: "Iris — Film 02", brand: "Iris", duration: "0:07", poster: "/portfolio/iris-videos/film-2.jpg", source: "/portfolio/iris-videos/film-2.mp4", categories: ["creation"] },
  { id: "iris-film-3", title: "Iris — Film 03", brand: "Iris", duration: "0:08", poster: "/portfolio/iris-videos/film-3.jpg", source: "/portfolio/iris-videos/film-3.mp4", categories: ["creation"] },
  { id: "rz-film", title: "RZ — Campaign Film", brand: "RZ", duration: "0:28", poster: "/portfolio/rz-video/poster.jpg", source: "/portfolio/rz-video/film.mp4", categories: ["motion-graphics"] },
  ...[
    { file: 1, title: "SC Tech — Final", seconds: 40 },
    { file: 2, title: "SC Fire — Final", seconds: 36 },
    { file: 3, title: "SC Fire — Film 03", seconds: 31 },
    { file: 4, title: "SC Tech — Film 03", seconds: 31 },
    { file: 5, title: "SC Fire — Film 02", seconds: 34 },
    { file: 6, title: "SC Tech — Film 02", seconds: 30 },
  ].map(({ file, title, seconds }): Film => ({ id: `sc-film-${file}`, title, brand: "SC", duration: `0:${String(seconds).padStart(2, "0")}`, poster: `/portfolio/sc-videos/${file}.jpg`, source: `/portfolio/sc-videos/${file}.mp4`, categories: ["creation", "editing"] })),
  ...[{ file: 1, seconds: 14 }, { file: 2, seconds: 14 }, { file: 3, seconds: 15 }, { file: 5, seconds: 15 }, { file: 6, seconds: 15 }, { file: 7, seconds: 15 }, { file: 8, seconds: 15 }, { file: 9, seconds: 14 }, { file: 10, seconds: 14 }, { file: 11, seconds: 13 }].map(({ file, seconds }, index): Film => ({ id: `zya-film-${index + 1}`, title: `ZYA Jewelry — Film ${String(index + 1).padStart(2, "0")}`, brand: "ZYA Jewelry", duration: `0:${String(seconds).padStart(2, "0")}`, poster: `/portfolio/zya-films-revised/${file}.jpg`, source: `/portfolio/zya-films-revised/${file}.mp4`, categories: ["creation"] })),
  { id: "zya-film-11", title: "ZYA Jewelry — Film 11", brand: "ZYA Jewelry", duration: "0:17", poster: "/portfolio/zya-films-revised/film-11.jpg", source: "/portfolio/zya-films-revised/film-11.mp4", categories: ["creation"] },
  { id: "film-01", title: "GREAT — Film 01", brand: "GREAT", duration: "0:34", poster: "/portfolio/great-videos/film-01.jpg", source: "/portfolio/great-videos/film-01.mp4", categories: ["creation", "editing"] },
  { id: "film-02", title: "GREAT — Film 02", brand: "GREAT", duration: "0:23", poster: "/portfolio/great-videos/film-02.jpg", source: "/portfolio/great-videos/film-02.mp4", categories: ["creation", "editing"] },
  { id: "tesla-film", title: "Tesla — Campaign Film", brand: "Tesla", duration: "0:17", poster: "/portfolio/tesla-video/poster.jpg", source: "/portfolio/tesla-video/film.mp4", categories: ["creation"] },
  { id: "northern-turkey", title: "Northern Turkey — Travel Film", brand: "الشمال التركي", duration: "0:18", poster: "/portfolio/northern-turkey/poster.jpg", source: "/portfolio/northern-turkey/film.mp4", categories: ["creation", "editing"] },
];

function VideoProject({ film, category }: { film: Film; category: VideoCategory }) {
  const [expanded, setExpanded] = useState(false);
  const player = useRef<HTMLVideoElement>(null);
  const titleId = `${category}-${film.id}-title`;
  const poster = film.poster;

  useEffect(() => {
    // A closed parent category must also stop any playing film.
    const pauseWhenHidden = (event: Event) => {
      if (event.target instanceof HTMLDetailsElement && !event.target.open && player.current && event.target.contains(player.current)) player.current.pause();
    };
    document.addEventListener("toggle", pauseWhenHidden, true);
    return () => document.removeEventListener("toggle", pauseWhenHidden, true);
  }, []);

  return <section className="cafe-project video-project" aria-labelledby={titleId}>
    <details className="cafe-project-details" onToggle={event => setExpanded(event.currentTarget.open)}>
      <summary className="cafe-project-summary">
        <div className="video-thumbnail"><Image src={poster} alt="" width={62} height={110} sizes="88px" /><span><Play size={16} fill="currentColor" /></span></div>
        <div className="cafe-summary-copy"><span className="project-eyebrow">{videoCategoryLabels[category]} / {film.duration}</span><h3 id={titleId}>{film.title}</h3><p>{film.brand} · Portrait film</p></div>
        <span className="cafe-summary-action"><span className="when-collapsed">Watch film</span><span className="when-expanded">Close film</span><ChevronDown size={21} /></span>
      </summary>
      <div className="video-project-player">{expanded && <video ref={player} controls playsInline preload="metadata" poster={poster} aria-label={`${film.title} video player`}>
        <source src={film.source} type="video/mp4" />
        Your browser does not support video playback. <a href={film.source}>Open the video</a>.
      </video>}</div>
    </details>
  </section>;
}

export function VideoProjects({ category }: { category: VideoCategory }) {
  return <>{films.filter(film => film.categories.includes(category)).map(film => <VideoProject key={film.id} film={film} category={category} />)}</>;
}
