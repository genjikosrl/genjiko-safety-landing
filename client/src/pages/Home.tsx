import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, ShieldCheck, Truck, CreditCard, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ContactDialog } from "@/components/ContactDialog";
import logoImg from "@assets/web_1769614776326.png";

type Lang = "en" | "it" | "de";

const detectLang = (): Lang => {
  const l = (navigator.language || "en").toLowerCase();
  if (l.startsWith("it")) return "it";
  if (l.startsWith("de")) return "de";
  return "en";
};

const i18n: Record<Lang, any> = {
  en: {
    kicker: "B2B ONLY • ITALY",
    title: "Genjiko Safety – Italian Hub",
    subtitle:
      "B2B distribution for Safety & Compliance in Italy: safety signage (DIN/ISO/EN), fire protection equipment, evacuation & emergency solutions.",
    ctaMail: "Contact (B2B)",
    ctaMailSub: "Please detail your request. We strictly serve B2B clients.",
    ctaSup: "For manufacturers & suppliers",
    ctaSupSub: "Looking to distribute your products in Italy? Send us your proposal.",
    subnote:
      "No retail. No end-customer shop. We work with manufacturers, distributors and professional partners.",
    chips: [
      "Safety Signage",
      "Fire Protection",
      "Evacuation & Plans",
      "Emergency Preparedness",
      "Business Continuity (selected)",
    ],
    h2a: "What we distribute",
    b1t: "Safety & Compliance",
    b1: [
      "DIN / ISO / EN safety signage",
      "Exit & escape route signs (incl. photoluminescent)",
      "Evacuation plans, markers, supports",
      "Workplace safety accessories",
    ],
    b2t: "Fire Protection",
    b2: [
      "Fire extinguishers & accessories",
      "Wall mounts, cabinets, identification signage",
      "Basic fire safety equipment",
    ],
    b3t: "Emergency / Preparedness",
    b3: [
      "Workplace emergency kits",
      "Emergency lighting & tools",
      "Non-medical first-response equipment",
    ],
    b4t: "Business Continuity (selected)",
    b4: ["UPS / USV (selected ranges)", "Blackout readiness solutions"],
    howline:
      "We prioritize professional-grade products, technical documentation and compliant supply chains.",
    h2b: "For manufacturers & suppliers",
    supIntro: "We are looking for EU manufacturers or established B2B wholesalers with:",
    supList: [
      "Distributor price lists (not retail discounts)",
      "Technical PDF catalogs / datasheets",
      "Partner / Händler / Distributor program",
      "B2B direct shipping to Italy (after payment)",
    ],
    supAsk: "Send: price list, catalogs, MOQ, delivery terms.",
    actionRequired: "Action required",
    contactSupplyTeam: "Contact supply team",
    h2c: "How we work",
    workList: [
      "Strictly B2B: companies, hotels, facilities, condominiums, industry.",
      "Payment-first: shipment after funds are received.",
      "No stock required: direct supply chain with manufacturers/wholesalers.",
      "Neutral / institutional packaging where applicable.",
    ],
    footer:
      "Operated by <strong>Genjiko S.r.l.</strong> (Italy).<br/>VAT / P.IVA &amp; Tax Code: <span class='mono'>02584250035</span> • REA (Verbania): <span class='mono'>VB 206638</span><br/>B2B: <span class='mono'>partners@genjiko.it</span> • Main website: <span class='mono'>genjiko.eu</span>",
  },

  it: {
    kicker: "SOLO B2B • ITALIA",
    title: "Genjiko Safety – Hub Italia",
    subtitle:
      "Distribuzione B2B per Safety & Compliance in Italia: segnaletica (DIN/ISO/EN), dotazioni antincendio, evacuazione e soluzioni di emergenza.",
    ctaMail: "Contatto (B2B)",
    ctaMailSub: "Descrivi la richiesta in dettaglio. Serviamo esclusivamente clienti B2B.",
    ctaSup: "Per produttori & fornitori",
    ctaSupSub: "Vuoi distribuire i tuoi prodotti in Italia? Inviaci una proposta.",
    subnote:
      "Niente retail. Nessun e-commerce per il pubblico. Lavoriamo con produttori, distributori e partner professionali.",
    chips: [
      "Segnaletica sicurezza",
      "Antincendio",
      "Evacuazione & planimetrie",
      "Preparazione emergenze",
      "Continuità operativa (selez.)",
    ],
    h2a: "Cosa distribuiamo",
    b1t: "Safety & Compliance",
    b1: [
      "Segnaletica DIN / ISO / EN",
      "Cartelli uscita e vie di fuga (anche fotoluminescenti)",
      "Planimetrie evacuazione, marker, supporti",
      "Accessori sicurezza per ambienti di lavoro",
    ],
    b2t: "Antincendio",
    b2: [
      "Estintori & accessori",
      "Supporti, armadi/teche, cartellonistica identificativa",
      "Dotazioni antincendio di base",
    ],
    b3t: "Emergenza / Preparedness",
    b3: [
      "Kit emergenza aziendali",
      "Illuminazione di emergenza & strumenti",
      "Dotazioni di primo supporto non medicali",
    ],
    b4t: "Continuità operativa (selez.)",
    b4: ["UPS / gruppi di continuità (selezionati)", "Soluzioni blackout (selezionate)"],
    howline: "Selezioniamo prodotti professionali con documentazione tecnica e filiera conforme.",
    h2b: "Per produttori & fornitori",
    supIntro: "Cerchiamo produttori UE o grossisti B2B consolidati con:",
    supList: [
      "Listini da distributore (non sconti retail)",
      "Cataloghi PDF tecnici / datasheet",
      "Programmi Partner / Händler / Distributor",
      "Spedizione B2B diretta in Italia (dopo pagamento)",
    ],
    supAsk: "Inviare: listini, cataloghi, MOQ, condizioni di consegna.",
    actionRequired: "Azione richiesta",
    contactSupplyTeam: "Contatta team forniture",
    h2c: "Come lavoriamo",
    workList: [
      "Solo B2B: aziende, hotel, strutture, condomini, industria.",
      "Pagamento prima: spedizione dopo accredito.",
      "No magazzino richiesto: filiera diretta con produttori/grossisti.",
      "Packaging neutro o istituzionale ove applicabile.",
    ],
    footer:
      "Operato da <strong>Genjiko S.r.l.</strong> (Italia).<br/>P.IVA e C.F.: <span class='mono'>02584250035</span> • REA (Verbania): <span class='mono'>VB 206638</span><br/>B2B: <span class='mono'>partners@genjiko.it</span> • Sito principale: <span class='mono'>genjiko.eu</span>",
  },

  de: {
    kicker: "NUR B2B • ITALIEN",
    title: "Genjiko Safety – Italienischer Hub",
    subtitle:
      "B2B-Vertrieb für Safety & Compliance in Italien: Sicherheitskennzeichnung (DIN/ISO/EN), Brandschutz, Evakuierung & betriebliche Notfalllösungen.",
    ctaMail: "Kontakt (B2B)",
    ctaMailSub:
      "Bitte beschreiben Sie Ihre Anfrage. Wir bedienen ausschließlich B2B-Kunden.",
    ctaSup: "Für Hersteller & Lieferanten",
    ctaSupSub:
      "Sie möchten Ihre Produkte in Italien vertreiben? Senden Sie uns Ihren Vorschlag.",
    subnote:
      "Kein Einzelhandel. Kein Endkundenshop. Wir arbeiten mit Herstellern, Händlern und professionellen Partnern.",
    chips: [
      "Sicherheitskennzeichnung",
      "Brandschutz",
      "Evakuierung & Pläne",
      "Notfallvorsorge",
      "Betriebskontinuität (ausgewählt)",
    ],
    h2a: "Was wir vertreiben",
    b1t: "Safety & Compliance",
    b1: [
      "DIN / ISO / EN Sicherheitskennzeichnung",
      "Fluchtwegschilder (inkl. langnachleuchtend)",
      "Evakuierungspläne, Marker, Halterungen",
      "Arbeitssicherheitszubehör",
    ],
    b2t: "Brandschutz",
    b2: ["Feuerlöscher & Zubehör", "Wandhalterungen, Schränke, Kennzeichnung", "Grundlegende Brandschutzausrüstung"],
    b3t: "Notfall / Preparedness",
    b3: [
      "Notfall-Kits für den Arbeitsplatz",
      "Notbeleuchtung & Werkzeuge",
      "Nicht-medizinische Ersthelfer-Ausrüstung",
    ],
    b4t: "Betriebskontinuität (ausgewählt)",
    b4: ["USV / UPS (ausgewählte Bereiche)", "Blackout-Vorsorgelösungen"],
    howline:
      "Wir priorisieren professionelle Produkte, technische Dokumentation und konforme Lieferketten.",
    h2b: "Für Hersteller & Lieferanten",
    supIntro: "Wir suchen EU-Hersteller oder etablierte B2B-Großhändler mit:",
    supList: [
      "Distributor-Preislisten (keine Einzelhandelsrabatte)",
      "Technische PDF-Kataloge / Datenblätter",
      "Partner- / Händler- / Distributor-Programm",
      "B2B-Direktversand nach Italien (nach Zahlung)",
    ],
    supAsk: "Senden Sie: Preisliste, Kataloge, MOQ, Lieferbedingungen.",
    actionRequired: "Aktion erforderlich",
    contactSupplyTeam: "Supply-Team kontaktieren",
    h2c: "Wie wir arbeiten",
    workList: [
      "Streng B2B: Firmen, Hotels, Einrichtungen, Eigentumswohnungen, Industrie.",
      "Vorkasse: Versand nach Geldeingang.",
      "Kein Lagerbestand erforderlich: direkte Lieferkette mit Herstellern/Großhändlern.",
      "Neutrale / institutionelle Verpackung wo möglich.",
    ],
    footer:
      "Betrieben von <strong>Genjiko S.r.l.</strong> (Italien).<br/>USt-IdNr. / P.IVA &amp; Steuernr.: <span class='mono'>02584250035</span> • Handelsreg.: <span class='mono'>REA VB 206638</span><br/>B2B: <span class='mono'>partners@genjiko.it</span> • Hauptseite: <span class='mono'>genjiko.eu</span>",
  },
};

const iconMap = {
  0: <ShieldCheck className="h-5 w-5" />,
  1: <CreditCard className="h-5 w-5" />,
  2: <Truck className="h-5 w-5" />,
  3: <Package className="h-5 w-5" />,
};

export default function Home() {
  const [lang, setLang] = useState<Lang>(() => detectLang());
  const t = useMemo(() => i18n[lang], [lang]);

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-foreground selection:bg-primary selection:text-white">
      {/* Top Bar */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            <span className="font-mono text-xs font-bold tracking-widest uppercase text-muted-foreground">
              {t.kicker}
            </span>
            <LanguageSwitcher currentLang={lang} onChange={setLang} />
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-16 max-w-4xl text-center"
        >
          <div className="mb-8 flex justify-center">
            <img src={logoImg} alt="Genjiko Safety Logo" className="h-28 object-contain md:h-40 lg:h-44" />
          </div>

          <h1 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            {t.title}
          </h1>
          <p className="mx-auto mb-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t.subtitle}
          </p>

          <div className="mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ContactDialog
              title={t.ctaMail}
              subtitle={t.ctaMailSub}
              trigger={
                <Button size="lg" className="h-12 rounded-none bg-primary px-8 font-medium hover:bg-primary/90">
                  {t.ctaMail}
                </Button>
              }
            />

            <ContactDialog
              title={t.ctaSup}
              subtitle={t.ctaSupSub}
              trigger={
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-none border-primary px-8 font-medium text-primary hover:bg-secondary/10"
                >
                  {t.ctaSup}
                </Button>
              }
            />
          </div>

          <p className="inline-block border border-border bg-white px-3 py-1 font-mono text-sm text-muted-foreground">
            {t.subnote}
          </p>
        </motion.div>

        {/* Chips */}
        <div className="mb-16 flex flex-wrap justify-center gap-2">
          {t.chips.map((chip: string, i: number) => (
            <Badge
              key={i}
              variant="secondary"
              className="rounded-none bg-secondary/10 px-3 py-1.5 font-mono text-xs uppercase tracking-wide text-secondary hover:bg-secondary/20"
            >
              {chip}
            </Badge>
          ))}
        </div>

        {/* Main Grid */}
        <div className="mx-auto mb-16 grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Column: Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-8 lg:col-span-2"
          >
            <div className="b2b-card h-full border-t-4 border-t-secondary">
              <h2 className="mb-6 flex items-center gap-2 text-xl font-bold">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                {t.h2a}
              </h2>

              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <h3 className="mb-3 font-mono text-sm font-semibold uppercase tracking-wide text-primary">
                    {t.b1t}
                  </h3>
                  <ul className="space-y-2">
                    {t.b1.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-secondary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="mb-3 font-mono text-sm font-semibold uppercase tracking-wide text-primary">
                    {t.b2t}
                  </h3>
                  <ul className="space-y-2">
                    {t.b2.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-secondary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="mb-3 font-mono text-sm font-semibold uppercase tracking-wide text-primary">
                    {t.b3t}
                  </h3>
                  <ul className="space-y-2">
                    {t.b3.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-secondary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="mb-3 font-mono text-sm font-semibold uppercase tracking-wide text-primary">
                    {t.b4t}
                  </h3>
                  <ul className="space-y-2">
                    {t.b4.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-secondary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 border-t border-border pt-6">
                <p className="text-sm italic text-muted-foreground">{t.howline}</p>
              </div>
            </div>
          </motion.div>

          {/* Aside: Suppliers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="b2b-card h-full border-primary border-t-4 border-t-accent bg-primary text-background">
              <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {t.h2b}
              </h2>

              <p className="mb-6 text-sm leading-relaxed text-white/80">{t.supIntro}</p>

              <ul className="mb-8 space-y-4">
                {t.supList.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/90">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="rounded-sm border border-white/20 bg-white/10 p-4">
                <p className="mb-2 font-mono text-xs uppercase tracking-wide text-white/70">
                  {t.actionRequired}
                </p>
                <p className="mb-4 text-sm font-medium text-white">{t.supAsk}</p>

                <ContactDialog
                  title={t.ctaSup}
                  subtitle={t.supAsk}
                  trigger={
                    <Button
                      variant="secondary"
                      className="w-full rounded-none border-none bg-accent font-medium text-white hover:bg-accent/90"
                    >
                      {t.contactSupplyTeam}
                    </Button>
                  }
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* How We Work Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mx-auto mb-16 max-w-6xl"
        >
          <div className="b2b-card">
            <h2 className="mb-8 flex items-center gap-2 text-xl font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {t.h2c}
            </h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {t.workList.map((item: string, i: number) => (
                <div
                  key={i}
                  className="flex flex-col gap-4 border border-transparent bg-[#f8f8f8] p-4 transition-colors hover:border-secondary/20"
                >
                  <div className="flex h-10 w-10 items-center justify-center border border-border bg-white text-primary">
                    {iconMap[i as keyof typeof iconMap]}
                  </div>
                  <p className="text-sm font-medium leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-white py-12">
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 flex justify-center gap-4">
            <div className="h-1 w-8 bg-secondary" />
            <div className="h-1 w-8 border border-border bg-white" />
            <div className="h-1 w-8 bg-accent" />
          </div>
          <p
            className="text-sm leading-relaxed text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: t.footer }}
          />
        </div>
      </footer>
    </div>
  );
}
