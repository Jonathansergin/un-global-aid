import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

import heroField from "@/assets/hero-field.jpg";
import reportSolar from "@/assets/report-solar.jpg";
import reportClinic from "@/assets/report-clinic.jpg";

type Entry = { title: string; body: string };

const GOVERNANCE_ENTRIES: Entry[] = [
  {
    title: "Legal Status",
    body: "UN Ukraine operates under the Convention on the Privileges and Immunities of the United Nations (1946) and the Host Country Agreement with the Government of Ukraine. The Resident Coordinator represents the Secretary-General in-country and leads the UN Country Team, whose mandate is set out in the United Nations Sustainable Development Cooperation Framework agreed with national authorities.",
  },
  {
    title: "Transparency",
    body: "All programme expenditure is published against IATI (International Aid Transparency Initiative) standards and independently audited each year. Financial statements, donor contributions and results frameworks are open to the public, and allegations of fraud or misconduct can be reported confidentially to the Office of Internal Oversight Services without retaliation.",
  },
  {
    title: "Procurement",
    body: "Goods, works and services are sourced through open international competition following the UN Procurement Manual: fairness, integrity, transparency, effective competition and best value for money. Suppliers must register on the UN Global Marketplace, accept the UN Supplier Code of Conduct, and are evaluated on technical compliance, environmental performance and price. Local Ukrainian suppliers are actively encouraged to bid.",
  },
];

const UPDATE_ENTRIES: Entry[] = [
  {
    title: "Press Releases",
    body: "Official statements from the Resident Coordinator, joint agency communiqués and field briefings are issued in Ukrainian and English. Recent releases cover winter response funding, the restoration of energy infrastructure, and expanded mine-action operations in liberated territories. Accredited journalists can request interviews and field access through the intake form above.",
  },
  {
    title: "Data Portal",
    body: "Open datasets track humanitarian reach, funding flows and SDG indicators down to oblast level: people assisted by sector, cash transfers disbursed, shelter repairs completed, and access to water, energy and health services. Data is refreshed monthly and released under an open licence for researchers, municipalities and partner organisations.",
  },
  {
    title: "Reports",
    body: "The annual Results Report, the Humanitarian Needs and Response Plan, and thematic evaluations on poverty reduction, climate resilience and education recovery are published in full. Each report sets out targets, verified results, expenditure and lessons learned, alongside independent evaluation findings and management responses.",
  },
];

function DisclosureEntry({ title, body }: Entry) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-3 text-left text-sm text-foreground transition-colors hover:text-brand"
      >
        {title}
        <span className="text-xs text-muted-foreground">{open ? "−" : "+"}</span>
      </button>
      {open ? (
        <p className="pb-4 text-sm leading-relaxed text-muted-foreground">{body}</p>
      ) : null}
    </div>
  );
}


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "UN Ukraine — Reduce Poverty, Protect the Planet" },
      {
        name: "description",
        content:
          "UN Ukraine coordinates humanitarian relief and sustainable development: poverty eradication, climate action and quality education. Contact our team directly.",
      },
      { property: "og:title", content: "UN Ukraine — Reduce Poverty, Protect the Planet" },
      {
        property: "og:description",
        content:
          "Humanitarian relief and sustainable development across Ukraine, aligned with the 2030 Agenda.",
      },
    ],
  }),
  component: Index,
});

const impact = [
  { tag: "Impact 01", value: "1.2M", label: ["Displaced people", "supported annually"] },
  { tag: "Impact 02", value: "450+", label: ["Sustainable local", "projects active"] },
  { tag: "Impact 03", value: "14B", label: ["Invested in green", "infrastructure"] },
  { tag: "Impact 04", value: "100%", label: ["Commitment to", "UN Charter goals"] },
];

const pillars = [
  {
    n: "01",
    title: "Poverty Eradication",
    body: "Implementing social protection floors and expanding economic opportunities for vulnerable households.",
  },
  {
    n: "02",
    title: "Climate Action",
    body: "Advancing the transition to a low-carbon economy through renewable energy and resilient ecosystem management.",
  },
  {
    n: "03",
    title: "Quality Education",
    body: "Ensuring inclusive and equitable access to digital learning and vocational training for the youth of Ukraine.",
  },
];

function Index() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fd = new FormData(form);
    setStatus("sending");
    setError(null);
    try {
      const response = await fetch("https://formsubmit.co/ajax/info@ukraineunu.org", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: fd,
      });
      if (!response.ok) throw new Error("Submission failed");
      form.reset();
      setStatus("sent");
    } catch (err) {
      setStatus("idle");
      setError(
        err instanceof Error && err.message
          ? err.message
          : "We couldn't send your dispatch. Please try again.",
      );
    }
  }

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-brand/10">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center bg-brand">
              <div className="size-2 rounded-full bg-brand-foreground" />
            </div>
            <span className="text-[11px] font-semibold uppercase leading-none tracking-tighter">
              United Nations
              <br />
              <span className="text-brand">Ukraine</span>
            </span>
          </div>
        </div>
      </header>

      <main>
        <section className="py-8">
          <div className="mx-auto max-w-5xl">
            <div className="mb-6 px-4">
              <h1 className="mb-4 text-balance font-display text-5xl font-medium leading-none tracking-tight">
                Towards a resilient future for Ukraine.
              </h1>
              <p className="max-w-[56ch] text-pretty text-base leading-normal text-muted-foreground">
                Our mission is to reduce poverty, protect the planet, and ensure that all people in
                Ukraine enjoy peace and prosperity by 2030.
              </p>
            </div>

            <div className="px-4">
              <div className="relative w-full overflow-hidden rounded-md outline-1 -outline-offset-1 outline-foreground/5">
                <img
                  src={heroField}
                  alt="Golden wheat field under a wide blue sky with reconstruction cranes on the horizon"
                  width={1200}
                  height={800}
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="absolute bottom-4 left-4">
                  <a
                    href="#contact"
                    className="flex h-10 items-center gap-2 rounded-sm bg-brand px-6 text-sm font-medium text-brand-foreground ring-1 ring-brand transition-transform active:scale-95"
                  >
                    Primary Mandate
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-surface/50 py-12">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-x-4 gap-y-8 px-4">
            {impact.map((item) => (
              <div key={item.tag} className="flex flex-col gap-1">
                <span className="text-xs font-semibold uppercase tracking-widest text-brand">
                  {item.tag}
                </span>
                <span className="font-display text-3xl font-medium leading-none">{item.value}</span>
                <span className="text-[11px] uppercase leading-tight text-muted-foreground">
                  {item.label[0]}
                  <br />
                  {item.label[1]}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-background py-16">
          <div className="mx-auto max-w-5xl">
            <div className="mb-10 px-4">
              <h2 className="mb-4 text-balance font-display text-3xl font-medium leading-none">
                Sustainable Development Pillars
              </h2>
              <p className="max-w-[56ch] text-sm text-muted-foreground">
                Strategic focus areas aligned with the 2030 Agenda.
              </p>
            </div>

            <div className="flex flex-col border-t border-border">
              {pillars.map((pillar) => (
                <div
                  key={pillar.n}
                  className="flex flex-col gap-4 border-b border-border px-4 py-6"
                >
                  <div className="flex size-8 items-center justify-center bg-ink text-xs font-medium text-ink-foreground">
                    {pillar.n}
                  </div>
                  <h3 className="text-xl font-semibold leading-tight">{pillar.title}</h3>
                  <p className="text-pretty text-sm text-muted-foreground">{pillar.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-ink px-4 py-16 text-ink-foreground">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8">
              <h2 className="mb-4 text-balance font-display text-3xl font-medium leading-none">
                Field Reports
              </h2>
              <p className="text-sm text-ink-muted">
                Direct dispatches from our operations on the ground.
              </p>
            </div>

            <div className="flex flex-col gap-8">
              <article>
                <img
                  src={reportSolar}
                  alt="Solar panel installation on a rooftop in a rural village"
                  loading="lazy"
                  width={800}
                  height={600}
                  className="mb-4 aspect-[16/10] w-full rounded-sm object-cover outline-1 -outline-offset-1 outline-ink-border"
                />
                <span className="text-[10px] font-semibold uppercase tracking-widest text-ink-muted">
                  Energy Independence
                </span>
                <h3 className="mb-2 mt-1 text-lg font-medium">Restoring Power to Kharkiv</h3>
                <p className="text-sm leading-relaxed text-ink-muted">
                  How community-led microgrids are securing hospital power supplies during recovery.
                </p>
              </article>

              <article>
                <img
                  src={reportClinic}
                  alt="Mobile medical clinic van serving a remote mountain village"
                  loading="lazy"
                  width={800}
                  height={600}
                  className="mb-4 aspect-[16/10] w-full rounded-sm object-cover outline-1 -outline-offset-1 outline-ink-border"
                />
                <span className="text-[10px] font-semibold uppercase tracking-widest text-ink-muted">
                  Health &amp; Wellbeing
                </span>
                <h3 className="mb-2 mt-1 text-lg font-medium">Mobile Units in Remote Regions</h3>
                <p className="text-sm leading-relaxed text-ink-muted">
                  Reaching the underserved with essential primary healthcare and mental health
                  support services.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="contact" className="bg-background px-4 py-16">
          <div className="mx-auto max-w-xl rounded-lg bg-card p-6 shadow-sm ring-1 ring-foreground/5">
            <div className="mb-6 border-b border-border pb-6">
              <h2 className="mb-2 font-display text-2xl font-medium leading-tight">
                Formal Inquiry Intake
              </h2>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Secure Communications Protocol
              </p>
            </div>

            {status === "sent" ? (
              <div className="flex flex-col gap-3">
                <p className="text-sm font-medium">Dispatch received.</p>
                <p className="text-sm text-muted-foreground">
                  Your inquiry has been logged with the coordination team. A confirmation will be
                  sent to the address you provided.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-2 h-10 rounded-sm border border-border px-4 text-sm font-medium"
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_subject" value="New Formal Inquiry — UN Ukraine" />
                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    Full Identity
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    required
                    maxLength={100}
                    placeholder="Enter your name"
                    className="h-10 w-full rounded-sm border border-border bg-secondary px-3 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand/30"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    Contact Coordinates
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    maxLength={255}
                    placeholder="email@organization.org"
                    className="h-10 w-full rounded-sm border border-border bg-secondary px-3 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand/30"
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    Subject Matter
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    defaultValue="Program Partnership"
                    className="h-10 w-full rounded-sm border border-border bg-secondary px-3 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand/30"
                  >
                    <option>Program Partnership</option>
                    <option>Contract Retirement Procedures</option>
                    <option>Field Media Request</option>
                    <option>Policy Inquiry</option>


                  </select>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    Briefing Notes
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    maxLength={2000}
                    placeholder="Describe the nature of your inquiry"
                    className="w-full resize-none rounded-sm border border-border bg-secondary p-3 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand/30"
                  />
                </div>

                {error ? <p className="text-sm text-destructive">{error}</p> : null}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-2 flex h-12 items-center justify-center gap-2 rounded-sm bg-ink px-6 text-sm font-medium text-ink-foreground transition-colors active:bg-brand disabled:opacity-60"
                >
                  {status === "sending" ? "Transmitting…" : "Transmit Dispatch"}
                  <span className="size-1.5 animate-pulse rounded-full bg-brand" />
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-4 py-12">
        <div className="mx-auto flex max-w-5xl flex-col gap-8">
          <div className="flex items-center gap-2 opacity-50 grayscale">
            <div className="size-4 rounded-full bg-ink" />
            <span className="text-[10px] font-semibold uppercase tracking-widest">UN Ukraine</span>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex flex-col gap-3">
              <span className="text-[11px] font-semibold uppercase text-muted-foreground">
                Governance
              </span>
              <div className="flex flex-col">
                {GOVERNANCE_ENTRIES.map((entry) => (
                  <DisclosureEntry key={entry.title} {...entry} />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[11px] font-semibold uppercase text-muted-foreground">
                Updates
              </span>
              <div className="flex flex-col">
                {UPDATE_ENTRIES.map((entry) => (
                  <DisclosureEntry key={entry.title} {...entry} />
                ))}
              </div>
            </div>
          </div>


          <div className="border-t border-border pt-8">
            <p className="text-[10px] uppercase leading-relaxed text-muted-foreground">
              © 2026 United Nations Ukraine. Official Field Communication Channel.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
