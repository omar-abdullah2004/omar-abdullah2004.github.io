"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import "./welcome-tour.css";

type Destination = "home" | "about" | "work" | "portfolio" | "talk";
const seenKey = "omar-portfolio-tour-v1";
const steps: { tab: Destination; target: string; title: string; copy: string; open?: "category" | "project" }[] = [
  { tab: "home", target: ".hero-actions", title: "Hey, I’m Omar!", copy: "Welcome to my creative space. Let me show you where to find my designs, films, and the stories behind them." },
  { tab: "about", target: ".about-copy", title: "Meet the person behind the work.", copy: "About is where you’ll find my creative approach, skills, and experience in AI production." },
  { tab: "work", target: ".project-grid .project", title: "A little curiosity. A lot of making.", copy: "My Work explores my technical side. Open “Inside the project” to see how each idea comes together." },
  { tab: "portfolio", target: ".creative-category-summary", title: "Your next stop: the portfolio.", copy: "Choose AI Design, AI Video Creation, Video Editing, or Motion Graphics Videos. Each category expands when you click it." },
  { tab: "portfolio", target: ".creative-category-projects .cafe-project-summary", open: "category", title: "Pick a project that catches your eye.", copy: "Inside a category, projects stay compact. Click “View project” for a collection, or “Watch film” to open a video player." },
  { tab: "portfolio", target: ".creative-category-projects .cafe-tile", open: "project", title: "Take a closer look.", copy: "Click any design to view it larger. Use the arrows to browse and Escape to close. Videos have their own playback controls." },
  { tab: "talk", target: ".contact-headline", title: "Let’s make something together.", copy: "Have a project in mind? Let’s Talk brings you to my email and social links. You’re ready to explore!" },
];

export function WelcomeTour({ navigate, activeTab }: { navigate: (tab: Destination) => void; activeTab: Destination }) {
  const [step, setStep] = useState<number | null>(null);
  const [spot, setSpot] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const dialog = useRef<HTMLDialogElement>(null);
  const nextButton = useRef<HTMLButtonElement>(null);
  const returnTab = useRef<Destination>(activeTab);
  const latestTab = useRef(activeTab);
  latestTab.current = activeTab;
  const originalDetails = useRef(new Map<HTMLDetailsElement, boolean>());
  const running = step !== null;

  const start = useCallback(() => {
    returnTab.current = latestTab.current;
    originalDetails.current.clear();
    document.querySelectorAll<HTMLDetailsElement>(".creative-category, .creative-category .cafe-project-details").forEach(item => originalDetails.current.set(item, item.open));
    setStep(0);
  }, []);

  useEffect(() => {
    try { if (localStorage.getItem(seenKey)) return; } catch { /* A tour also works without storage. */ }
    const timer = window.setTimeout(start, 650);
    return () => window.clearTimeout(timer);
    // Check once per visit; navigation must not restart the introduction.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function finish(skipped = false) {
    try { localStorage.setItem(seenKey, "done"); } catch { /* Private browsing may disable storage. */ }
    originalDetails.current.forEach((open, item) => { if (item.isConnected) item.open = open; });
    dialog.current?.close();
    setStep(null);
    const destination = skipped ? returnTab.current : "portfolio";
    navigate(destination);
    requestAnimationFrame(() => document.getElementById(`tab-${destination}`)?.focus());
  }

  useEffect(() => {
    if (!running) return;
    dialog.current?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [running]);

  useEffect(() => {
    if (step === null) return;
    const current = steps[step];
    navigate(current.tab);
    let frame = 0;
    let observer: ResizeObserver | undefined;
    const measure = () => {
      const element = document.querySelector<HTMLElement>(current.target);
      if (!element) return;
      const rect = element.getBoundingClientRect();
      setSpot({ top: Math.max(8, rect.top - 8), left: Math.max(8, rect.left - 8), width: Math.min(rect.width + 16, window.innerWidth - 16), height: Math.min(rect.height + 16, Math.max(80, window.innerHeight - 345)) });
    };
    frame = requestAnimationFrame(() => {
      const category = document.querySelector<HTMLDetailsElement>(".creative-category");
      const project = category?.querySelector<HTMLDetailsElement>(".cafe-project-details");
      if (current.tab === "portfolio" && category) {
        category.open = !!current.open;
        if (project) project.open = current.open === "project";
      }
      document.querySelector(current.target)?.scrollIntoView({ block: "start", behavior: "instant" });
      window.scrollBy(0, -24);
      measure();
      nextButton.current?.focus({ preventScroll: true });
      observer = new ResizeObserver(measure);
      const target = document.querySelector(current.target);
      if (target) observer.observe(target);
    });
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => { cancelAnimationFrame(frame); observer?.disconnect(); window.removeEventListener("resize", measure); window.removeEventListener("scroll", measure, true); };
  }, [step, navigate]);

  return <>
    <button type="button" className="tour-replay" onClick={start} aria-label="Replay the website tour"><Sparkles size={15} /> Quick tour</button>
    <dialog ref={dialog} className="welcome-tour" aria-labelledby="tour-title" aria-describedby="tour-description" onCancel={event => { event.preventDefault(); finish(true); }}>
      {step !== null && <>
        <div className="tour-spotlight" style={spot} aria-hidden="true" />
        <div className="tour-layout">
          <div key={`pose-${step}`} className="tour-character" data-pose={step} aria-hidden="true"><div className="tour-character-glow" />
            <div className="tour-pose-entrance">{step === 0
              ? <Image src="/tour/omar-guide.png" alt="" width={1280} height={1200} priority />
              : <div className="tour-pose-frame"><Image className="tour-sprite-sheet" src="/tour/omar-poses.png" alt="" width={1536} height={1024} priority sizes="900px" style={{ left: `${((step - 1) % 3) * -100}%`, top: `${Math.floor((step - 1) / 3) * -100}%` }} /></div>}
            </div><span>YOUR GUIDE, OMAR</span>
          </div>
          <section className="tour-card">
            <div className="tour-top"><span><Sparkles size={13} /> A LITTLE LOOK AROUND</span><button type="button" onClick={() => finish(true)}>Skip tour</button></div>
            <div key={step} className="tour-message" aria-live="polite"><h2 id="tour-title">{steps[step].title}</h2><p id="tour-description">{steps[step].copy}</p></div>
            <div className="tour-bottom"><div className="tour-progress" aria-label={`Step ${step + 1} of ${steps.length}`}><span>{String(step + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}</span><div aria-hidden="true">{steps.map((_, i) => <i key={i} className={i <= step ? "is-done" : ""} />)}</div></div><div className="tour-actions">{step > 0 && <button type="button" className="tour-back" onClick={() => setStep(step - 1)} aria-label="Previous tour step"><ArrowLeft size={17} /></button>}<button type="button" ref={nextButton} className="tour-next" onClick={() => step === steps.length - 1 ? finish() : setStep(step + 1)}>{step === steps.length - 1 ? "Explore portfolio" : step === 0 ? "Show me around" : "Next"}<ArrowRight size={16} /></button></div></div>
          </section>
        </div>
      </>}
    </dialog>
  </>;
}
