"use client";
import { useCallback, useEffect, useState, type MouseEvent, type KeyboardEvent } from "react";
import { ArrowUpRight, ArrowDown, Github, Linkedin, Mail, Plus, Cpu, Workflow, Sparkles, Palette, Film, Clapperboard, Layers } from "lucide-react";
import { portfolioData as data } from "@/data/portfolio";
import "./portfolio.css";
import { CreativeGallery } from "./CreativeGallery";
import { VideoProjects } from "./VideoProjects";
import { WelcomeTour } from "./WelcomeTour";

const notes = [
  { type: "MACHINE LEARNING", name: "Signal over noise.", text: "An SMS classification system that turns incoming messages into clear decisions.", steps: ["MESSAGE", "CLASSIFY", "SIGNAL"], detail: "Compared multiple machine learning models and connected the classifier to a desktop interface for real-time predictions. The recorded SVM result was 84% accuracy.", art: "signal" },
  { type: "APPLIED AI", name: "Intelligence with purpose.", text: "Exploring accessible lung cancer risk screening through a connected system.", steps: ["SENSOR", "MODEL", "MOBILE"], detail: "A project connecting a portable detection system with a mobile app over Bluetooth, using Random Forest and SVM models to explore risk screening.", art: "health" },
  { type: "GENERATIVE AI", name: "From idea to expression.", text: "An automated caption workflow built for the pace of content creation.", steps: ["BRIEF", "GENERATE", "DELIVER"], detail: "Built a web interface and an LLM-powered caption generation workflow with webhook integration for automated content delivery.", art: "creative" },
  { type: "AI AUTOMATION", name: "Better together.", text: "Multiple models. Conditional routing. A more considered creative output.", steps: ["INPUT", "ROUTE", "REFINE"], detail: "Designed a multi-model pipeline in n8n to compare and refine model outputs. Conditional routing connects the input to the appropriate generation path.", art: "flow" },
];
function SystemArt({ kind }: { kind: string }) {
  return <div className={`system-art ${kind}`} aria-hidden="true"><div className="art-grid" />
    {kind === "signal" ? <div className="signal-bars">{Array.from({ length: 29 }, (_, i) => <i key={i} style={{ height: `${18 + ((i * 37 + 19) % 90)}px` }} />)}</div>
      : kind === "health" ? <div className="radar"><i /><i /><i /><span>+</span><b /></div>
      : kind === "creative" ? <div className="type-art"><span>Ideas,</span><em>amplified.</em><small>HUMAN DIRECTION × ARTIFICIAL INTELLIGENCE</small></div>
      : <div className="flow-art"><span>01</span><i /><div><b>MODEL A</b><b>MODEL B</b></div><i /><span>↗</span></div>}
    <span className="art-label">SYSTEM CONCEPT / {kind.toUpperCase()}</span></div>;
}
const tabs = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "My Work" },
  { id: "portfolio", label: "Portfolio" },
  { id: "talk", label: "Let’s Talk" },
] as const;
type TabId = typeof tabs[number]["id"];
const destinations: Record<string, TabId> = { top: "home", home: "home", about: "about", experience: "about", projects: "work", work: "work", portfolio: "portfolio", contact: "talk", talk: "talk" };

export function Portfolio() {
  const [activeTab, setActiveTab] = useState<TabId>("home");
  useEffect(() => {
    const sync = () => setActiveTab(destinations[window.location.hash.slice(1)] || "home");
    sync();
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => { window.removeEventListener("hashchange", sync); window.removeEventListener("popstate", sync); };
  }, []);
  useEffect(() => {
    document.querySelectorAll<HTMLVideoElement>(".portfolio video").forEach(video => video.pause());
  }, [activeTab]);
  const selectTab = useCallback((id: TabId) => {
    setActiveTab(id);
    window.history.pushState(null, "", "#" + id);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  function followInternalLink(event: MouseEvent<HTMLElement>) {
    const anchor = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!anchor || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const destination = destinations[anchor.hash.slice(1)];
    if (destination) { event.preventDefault(); selectTab(destination); }
  }
  function navigateTabs(event: KeyboardEvent<HTMLElement>) {
    const current = tabs.findIndex(tab => tab.id === activeTab);
    const next = event.key === "ArrowRight" ? (current + 1) % tabs.length : event.key === "ArrowLeft" ? (current + tabs.length - 1) % tabs.length : event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : -1;
    if (next < 0) return;
    event.preventDefault();
    selectTab(tabs[next].id);
    document.getElementById("tab-" + tabs[next].id)?.focus();
  }
  const categories = Array.from(new Set(data.skills.map(s => s.category)));
  return <main className="portfolio" id="top" onClick={followInternalLink}>
    <WelcomeTour navigate={selectTab} activeTab={activeTab} />
    <header className="site-header wrap">
      <a className="wordmark" href="#home" aria-label="Omar home">omar<span>✳</span></a>
      <nav className="tab-navigation" role="tablist" aria-label="Portfolio sections" onKeyDown={navigateTabs}>
        {tabs.map(tab => <button type="button" key={tab.id} id={"tab-" + tab.id} role="tab" aria-selected={activeTab === tab.id} aria-controls={"panel-" + tab.id} tabIndex={activeTab === tab.id ? 0 : -1} onClick={() => selectTab(tab.id)}>{tab.label}</button>)}
      </nav>
      <span className="header-note">DESIGN · FILM · AI</span>
    </header>
    <div id="panel-home" role="tabpanel" aria-labelledby="tab-home" tabIndex={0} hidden={activeTab !== "home"}>
    <section className="hero wrap" aria-labelledby="hero-title"><div className="hero-topline"><span><i className="status-dot" /> AI DESIGNER · AI VIDEO MAKER · VIDEO EDITOR</span><span>PORTFOLIO — {new Date().getFullYear()}</span></div>
      <div className="hero-layout"><div className="hero-copy"><h1 id="hero-title">Intelligence.<br />Imagination.<br /><em>Real impact.</em></h1><p>I’m Omar — an AI designer, AI video maker, and video editor. I bring ideas to life through visuals, motion, and creative technology.</p><div className="hero-actions"><a href="#portfolio" className="button button-dark">Explore my portfolio <ArrowUpRight size={19} /></a><a href="#about" className="text-link">A little about me <ArrowDown size={16} /></a></div></div>
        <div className="hero-art" role="img" aria-label="Abstract orbit sculpture representing the intersection of intelligence and imagination"><div className="orbital-cross cross-one" /><div className="orbital-cross cross-two" /><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" /><div className="core"><span>o<span>m</span></span></div><div className="art-coordinate">FIG. 01 / CONNECTING POSSIBILITIES</div><div className="orbit-tag"><span>HUMAN CURIOSITY</span><Plus size={12} /><span>MACHINE INTELLIGENCE</span></div><span className="floating-point point-a" /><span className="floating-point point-b" /></div></div>
      <div className="hero-bottom"><span>ENGINEERING MEETS EXPRESSION</span><span>BUILT WITH CURIOSITY <Plus size={13} /></span></div></section>
    <div className="discipline-strip"><div className="wrap"><span>AI design</span><b>✳</b><span>AI video creation</span><b>✳</b><span>Video editing</span><b>✳</b><span>Creative production</span></div></div>
    </div>
    <div id="panel-work" role="tabpanel" aria-labelledby="tab-work" tabIndex={0} hidden={activeTab !== "work"}>
    <section id="projects" className="work-section wrap section-space"><div className="section-label"><span>01 / SELECTED WORK</span><span>IDEAS BUILT INTO SYSTEMS</span></div><div className="section-heading"><h2>Curiosity,<br /><em>put to work.</em></h2><p>A selection of projects at the intersection of intelligent systems, practical tools, and creative possibility.</p></div>
      <div className="project-grid">{data.projects.map((project, i) => { const note = notes[i]; return <article className="project" key={project.title}><SystemArt kind={note.art} /><div className="project-content"><div className="project-meta"><span>{note.type}</span><span>0{i + 1}</span></div><h3>{note.name}</h3><p className="project-subtitle">{project.title}</p><p>{note.text}</p><div className="tech-tags">{project.tech.map(t => <span key={t}>{t}</span>)}</div><details><summary>Inside the project <Plus size={17} /></summary><div className="project-detail"><p>{note.detail}</p><div className="project-steps">{note.steps.map((s, j) => <span key={s}>{j > 0 && <ArrowUpRight size={12} />}{s}</span>)}</div></div></details></div></article>; })}</div></section>
    </div>
    <div id="panel-about" role="tabpanel" aria-labelledby="tab-about" tabIndex={0} hidden={activeTab !== "about"}>
    <section className="about-section" id="about"><div className="wrap section-space"><div className="section-label"><span>02 / THE PERSON BEHIND THE WORK</span><span>LOGIC + INSTINCT</span></div><div className="about-layout"><div><h2>Technical mind.<br /><em>Creative instinct.</em></h2><div className="monogram" aria-hidden="true">o<span>m.</span><small>ALWAYS CURIOUS. ALWAYS BUILDING.</small></div></div><div className="about-copy"><p className="large-copy">I like the space where engineering and imagination meet.</p><p>I’m an AI designer, AI video maker, and video editor, currently working at Mundo Media as AI Production Manager & AI Designer. I create AI visuals and videos, edit moving images, and bring creative ideas into production.</p><p>My background in machine learning, data science, and automation supports the creative work I do today. I combine technical understanding with design, storytelling, and a curiosity for what AI can make possible.</p><div className="practice-list"><div><Cpu size={21} /><span><b>Intelligent systems</b><small>Models, data, and practical applications.</small></span></div><div><Workflow size={21} /><span><b>Connected workflows</b><small>Less repetition. More room for good work.</small></span></div><div><Sparkles size={21} /><span><b>AI design, video & editing</b><small>Visual ideas, moving stories, and the final cut.</small></span></div></div><a className="text-link" href={data.socials.linkedin} target="_blank" rel="noopener noreferrer">More about my background <ArrowUpRight size={18} /></a></div></div><div className="skills-grid">{categories.map(category => <div key={category}><h3>{category}</h3><p>{data.skills.filter(s => s.category === category).map(s => s.name).join(" / ")}</p></div>)}</div></div></section>
    <section className="experience-section wrap section-space" id="experience"><div className="section-label"><span>03 / EXPERIENCE</span><span>LEARNING THROUGH MAKING</span></div><div className="section-heading"><h2>A path shaped<br /><em>by doing.</em></h2><p>Working across technology and creative teams, from data exploration to campaign production.</p></div><div className="experience-list">{data.experience.map((exp, i) => <article key={`${exp.company}-${exp.period}`}><span className="experience-index">0{i + 1}</span><div><span className="experience-date">{exp.period}</span><h3>{exp.company}</h3><span className="experience-role">{exp.role}</span></div><p>{exp.description}</p></article>)}</div></section>
    </div>
    <div id="panel-portfolio" role="tabpanel" aria-labelledby="tab-portfolio" tabIndex={0} hidden={activeTab !== "portfolio"}>
      <section className="creative-portfolio wrap section-space" aria-labelledby="portfolio-title">
        <div className="section-label"><span>PORTFOLIO / CREATIVE PRODUCTION</span><span>VISUALS · MOTION · STORIES</span></div>
        <div className="section-heading"><h2 id="portfolio-title">Ideas into visuals.<br /><em>Stories into motion.</em></h2><p>I bring ideas to life through AI design, AI video creation, video editing, and motion graphics.</p></div>
        <div className="creative-disciplines">
          <details className="creative-category">
            <summary className="creative-category-summary"><Palette size={30} strokeWidth={1.4} /><span>01 / DESIGN</span><h3>AI Design</h3><p>Visual concepts and AI-generated imagery shaped by creative direction.</p><div className="category-toggle"><span className="when-collapsed">View projects</span><span className="when-expanded">Close category</span><Plus size={19} /></div></summary>
            <div className="creative-category-projects"><CreativeGallery /><CreativeGallery project="great" /><CreativeGallery project="nafeesah" /><CreativeGallery project="ramadan" /><CreativeGallery project="izhiman" /><CreativeGallery project="shanta" /><CreativeGallery project="zya" /><CreativeGallery project="malaysia" /></div>
          </details>
          <details className="creative-category">
            <summary className="creative-category-summary"><Film size={30} strokeWidth={1.4} /><span>02 / MOTION</span><h3>AI Video Creation</h3><p>Ideas developed into moving images through generative AI.</p><div className="category-toggle"><span className="when-collapsed">View films</span><span className="when-expanded">Close category</span><Plus size={19} /></div></summary>
            <div className="creative-category-projects"><VideoProjects category="creation" /></div>
          </details>
          <details className="creative-category">
            <summary className="creative-category-summary"><Clapperboard size={30} strokeWidth={1.4} /><span>03 / EDIT</span><h3>Video Editing</h3><p>Shaping footage through pacing, sequence, and visual storytelling.</p><div className="category-toggle"><span className="when-collapsed">View films</span><span className="when-expanded">Close category</span><Plus size={19} /></div></summary>
            <div className="creative-category-projects"><VideoProjects category="editing" /></div>
          </details>
          <details className="creative-category">
            <summary className="creative-category-summary">
              <Layers size={30} strokeWidth={1.4} />
              <span>04 / GRAPHICS</span>
              <h3>Motion Graphics Videos</h3>
              <p>Animated graphics that bring brand stories to life.</p>
              <div className="category-toggle"><span className="when-collapsed">View films</span><span className="when-expanded">Close category</span><Plus size={19} /></div>
            </summary>
            <div className="creative-category-projects"><VideoProjects category="motion-graphics" /></div>
          </details>
        </div>
        <a className="text-link" href="#work">Explore my technical projects <ArrowUpRight size={18} /></a>
      </section>
    </div>
    <div id="panel-talk" role="tabpanel" aria-labelledby="tab-talk" tabIndex={0} hidden={activeTab !== "talk"}>
    <section className="contact-section" id="contact"><div className="wrap"><div className="section-label"><span>04 / WHAT’S NEXT?</span><span><i className="status-dot" /> OPEN TO A CONVERSATION</span></div><a className="contact-headline" href={`mailto:${data.email}`}>Have an idea?<br /><em>Let’s make it real.</em><ArrowUpRight /></a><div className="contact-bottom"><a className="email-link" href={`mailto:${data.email}`}><Mail size={18} />{data.email}</a><div className="social-links"><a href={data.socials.github} target="_blank" rel="noopener noreferrer"><Github size={17} />GitHub <ArrowUpRight size={13} /></a><a href={data.socials.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={17} />LinkedIn <ArrowUpRight size={13} /></a><a href={data.socials.instagram} target="_blank" rel="noopener noreferrer">Instagram <ArrowUpRight size={13} /></a></div></div><footer><span>© {new Date().getFullYear()} Omar. Made with intention.</span><a href="#top">BACK TO TOP ↑</a></footer></div></section>
    </div>
  </main>;
}

