import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, ShieldCheck, Truck, CreditCard, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ContactDialog } from "@/components/ContactDialog";

type Lang = "en" | "it" | "de";

const i18n = {
  en: {
    kicker: "B2B ONLY • ITALY",
    title: "Genjiko Safety – Italian Hub",
    subtitle: "B2B distribution for Safety & Compliance in Italy: safety signage (DIN/ISO/EN), fire protection equipment, evacuation & emergency solutions.",
    ctaMail: "Contact (B2B)",
    ctaSup: "For manufacturers & suppliers",
    subnote: "No retail. No end-customer shop. We work with manufacturers, distributors and professional partners.",
    chips: ["Safety Signage","Fire Protection","Evacuation & Plans","Emergency Preparedness","Business Continuity (selected)"],
    h2a: "What we distribute",
    b1t: "Safety & Compliance",
    b1: ["DIN / ISO / EN safety signage","Exit & escape route signs (incl. photoluminescent)","Evacuation plans, markers, supports","Workplace safety accessories"],
    b2t: "Fire Protection",
    b2: ["Fire extinguishers & accessories","Wall mounts, cabinets, identification signage","Basic fire safety equipment"],
    b3t: "Emergency / Preparedness",
    b3: ["Workplace emergency kits","Emergency lighting & tools","Non-medical first-response equipment"],
    b4t: "Business Continuity (selected)",
    b4: ["UPS / USV (selected ranges)","Blackout readiness solutions"],
    howline: "We prioritize professional-grade products, technical documentation and compliant supply chains.",
    h2b: "For manufacturers & suppliers",
    supIntro: "We are looking for EU manufacturers or established B2B wholesalers with:",
    supList: ["Distributor price lists (not retail discounts)","Technical PDF catalogs / datasheets","Partner / Händler / Distributor program","B2B direct shipping to Italy (after payment)"],
    supAsk: "Send: price list, catalogs, MOQ, delivery terms.",
    h2c: "How we work",
    workList: ["Strictly B2B: companies, hotels, facilities, condominiums, industry.","Payment-first: shipment after funds are received.","No stock required: direct supply chain with manufacturers/wholesalers.","Neutral / institutional packaging where applicable."],
    footer: "Operated by <strong>Genjiko Srl</strong> (Italy).<br/>VAT / P.IVA: <span class='mono'>[INSERISCI P.IVA]</span> • Address: <span class='mono'>[INSERISCI SEDE]</span><br/>Main website: <span class='mono'>https://www.genjiko.eu</span>"
  },
  it: {
    kicker: "SOLO B2B • ITALIA",
    title: "Genjiko Safety – Hub Italia",
    subtitle: "Distribuzione B2B per Safety & Compliance in Italia: segnaletica (DIN/ISO/EN), dotazioni antincendio, evacuazione e soluzioni di emergenza.",
    ctaMail: "Contatto (B2B)",
    ctaSup: "Per produttori & fornitori",
    subnote: "Niente retail. Nessun e-commerce per il pubblico. Lavoriamo con produttori, distributori e partner professionali.",
    chips: ["Segnaletica sicurezza","Antincendio","Evacuazione & planimetrie","Preparazione emergenze","Continuità operativa (selez.)"],
    h2a: "Cosa distribuiamo",
    b1t: "Safety & Compliance",
    b1: ["Segnaletica DIN / ISO / EN","Cartelli uscita e vie di fuga (anche fotoluminescenti)","Planimetrie evacuazione, marker, supporti","Accessori sicurezza per ambienti di lavoro"],
    b2t: "Antincendio",
    b2: ["Estintori & accessori","Supporti, armadi/teche, cartellonistica identificativa","Dotazioni antincendio di base"],
    b3t: "Emergenza / Preparedness",
    b3: ["Kit emergenza aziendali","Illuminazione di emergenza & strumenti","Dotazioni di primo supporto non medicali"],
    b4t: "Continuità operativa (selez.)",
    b4: ["UPS / gruppi di continuità (selezionati)","Soluzioni blackout (selezionate)"],
    howline: "Selezioniamo prodotti professionali con documentazione tecnica e filiera conforme.",
    h2b: "Per produttori & fornitori",
    supIntro: "Cerchiamo produttori UE o grossisti B2B consolidati con:",
    supList: ["Listini da distributore (non sconti retail)","Cataloghi PDF tecnici / datasheet","Programmi Partner / Händler / Distributor","Spedizione B2B diretta in Italia (dopo pagamento)"],
    supAsk: "Inviare: listini, cataloghi, MOQ, condizioni di consegna.",
    h2c: "Come lavoriamo",
    workList: ["Solo B2B: aziende, hotel, strutture, condomini, industria.","Pagamento prima: spedizione dopo accredito.","No magazzino richiesto: filiera diretta con produttori/grossisti.","Packaging neutro o istituzionale ove applicabile."],
    footer: "Operato da <strong>Genjiko Srl</strong> (Italia).<br/>P.IVA: <span class='mono'>[INSERISCI P.IVA]</span> • Sede: <span class='mono'>[INSERISCI SEDE]</span><br/>Sito principale: <span class='mono'>https://www.genjiko.eu</span>"
  },
  de: {
    kicker: "NUR B2B • ITALIEN",
    title: "Genjiko Safety – Italienischer Hub",
    subtitle: "B2B-Vertrieb für Safety & Compliance in Italien: Sicherheitskennzeichnung (DIN/ISO/EN), Brandschutz, Evakuierung & betriebliche Notfalllösungen.",
    ctaMail: "Kontakt (B2B)",
    ctaSup: "Für Hersteller & Lieferanten",
    subnote: "Kein Einzelhandel. Kein Endkundenshop. Wir arbeiten mit Herstellern, Händlern und professionellen Partnern.",
    chips: ["Sicherheitskennzeichnung","Brandschutz","Evakuierung & Pläne","Notfallvorsorge","Betriebskontinuität (ausgewählt)"],
    h2a: "Was wir vertreiben",
    b1t: "Safety & Compliance",
    b1: ["DIN / ISO / EN Sicherheitskennzeichnung","Fluchtwegschilder (inkl. langnachleuchtend)","Evakuierungspläne, Marker, Halterungen","Arbeitssicherheitszubehör"],
    b2t: "Brandschutz",
    b2: ["Feuerlöscher & Zubehör","Wandhalterungen, Schränke, Kennzeichnung","Grundlegende Brandschutzausrüstung"],
    b3t: "Notfall / Preparedness",
    b3: ["Notfall-Kits für den Arbeitsplatz","Notbeleuchtung & Werkzeuge","Nicht-medizinische Ersthelfer-Ausrüstung"],
    b4t: "Betriebskontinuität (ausgewählt)",
    b4: ["USV / UPS (ausgewählte Bereiche)","Blackout-Vorsorgelösungen"],
    howline: "Wir priorisieren professionelle Produkte, technische Dokumentation und konforme Lieferketten.",
    h2b: "Für Hersteller & Lieferanten",
    supIntro: "Wir suchen EU-Hersteller oder etablierte B2B-Großhändler mit:",
    supList: ["Distributor-Preislisten (keine Einzelhandelsrabatte)","Technische PDF-Kataloge / Datenblätter","Partner- / Händler- / Distributor-Programm","B2B-Direktversand nach Italien (nach Zahlung)"],
    supAsk: "Senden Sie: Preisliste, Kataloge, MOQ, Lieferbedingungen.",
    h2c: "Wie wir arbeiten",
    workList: ["Streng B2B: Firmen, Hotels, Einrichtungen, Eigentumswohnungen, Industrie.","Vorkasse: Versand nach Geldeingang.","Kein Lagerbestand erforderlich: direkte Lieferkette mit Herstellern/Großhändlern.","Neutrale / institutionelle Verpackung wo möglich."],
    footer: "Betrieben von <strong>Genjiko Srl</strong> (Italien).<br/>USt-IdNr. / P.IVA: <span class='mono'>[INSERISCI P.IVA]</span> • Adresse: <span class='mono'>[INSERISCI SEDE]</span><br/>Haupt-Website: <span class='mono'>https://www.genjiko.eu</span>"
  }
};

const iconMap = {
  0: <ShieldCheck className="h-5 w-5" />,
  1: <CreditCard className="h-5 w-5" />,
  2: <Truck className="h-5 w-5" />,
  3: <Package className="h-5 w-5" />,
};

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const t = i18n[lang];

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-foreground selection:bg-black selection:text-white">
      {/* Top Bar */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            <span className="font-mono text-xs font-bold tracking-widest uppercase text-black">
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
          className="mx-auto max-w-4xl text-center mb-16"
        >
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl mb-6">
            {t.title}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed mb-8">
            {t.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <ContactDialog 
              title={t.ctaMail}
              subtitle="Please detail your request. We strictly serve B2B clients."
              trigger={
                <Button size="lg" className="rounded-none h-12 px-8 font-medium">
                  {t.ctaMail}
                </Button>
              }
            />
            
            <ContactDialog 
              title={t.ctaSup}
              subtitle="Looking to distribute your products in Italy? Send us your proposal."
              trigger={
                <Button size="lg" variant="outline" className="rounded-none h-12 px-8 font-medium border-foreground text-foreground hover:bg-secondary">
                  {t.ctaSup}
                </Button>
              }
            />
          </div>

          <p className="text-sm text-muted-foreground font-mono bg-white inline-block px-3 py-1 border border-border">
            {t.subnote}
          </p>
        </motion.div>

        {/* Chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {t.chips.map((chip, i) => (
            <Badge 
              key={i} 
              variant="secondary" 
              className="rounded-none px-3 py-1.5 text-xs font-mono uppercase tracking-wide bg-[#f0f0f0] hover:bg-[#e0e0e0] text-muted-foreground"
            >
              {chip}
            </Badge>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto">
          {/* Main Column: Distribution */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="b2b-card h-full">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-black rounded-full" />
                {t.h2a}
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-8">
                {/* Section 1 */}
                <div>
                  <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-3 font-mono">
                    {t.b1t}
                  </h3>
                  <ul className="space-y-2">
                    {t.b1.map((item, i) => (
                      <li key={i} className="text-sm flex items-start gap-2">
                        <ArrowRight className="w-3.5 h-3.5 mt-1 shrink-0 text-muted-foreground/50" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Section 2 */}
                <div>
                  <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-3 font-mono">
                    {t.b2t}
                  </h3>
                  <ul className="space-y-2">
                    {t.b2.map((item, i) => (
                      <li key={i} className="text-sm flex items-start gap-2">
                        <ArrowRight className="w-3.5 h-3.5 mt-1 shrink-0 text-muted-foreground/50" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Section 3 */}
                <div>
                  <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-3 font-mono">
                    {t.b3t}
                  </h3>
                  <ul className="space-y-2">
                    {t.b3.map((item, i) => (
                      <li key={i} className="text-sm flex items-start gap-2">
                        <ArrowRight className="w-3.5 h-3.5 mt-1 shrink-0 text-muted-foreground/50" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Section 4 */}
                <div>
                  <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-3 font-mono">
                    {t.b4t}
                  </h3>
                  <ul className="space-y-2">
                    {t.b4.map((item, i) => (
                      <li key={i} className="text-sm flex items-start gap-2">
                        <ArrowRight className="w-3.5 h-3.5 mt-1 shrink-0 text-muted-foreground/50" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground italic">
                  {t.howline}
                </p>
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
            <div className="b2b-card h-full bg-foreground text-background border-foreground">
              <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-white rounded-full" />
                {t.h2b}
              </h2>
              
              <p className="text-sm text-white/80 mb-6 leading-relaxed">
                {t.supIntro}
              </p>

              <ul className="space-y-4 mb-8">
                {t.supList.map((item, i) => (
                  <li key={i} className="text-sm text-white/90 flex items-start gap-3">
                    <Check className="w-4 h-4 mt-0.5 shrink-0 text-white/50" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-white/10 p-4 rounded-sm border border-white/20">
                <p className="text-xs font-mono uppercase tracking-wide text-white/70 mb-2">
                  Action Required
                </p>
                <p className="text-sm font-medium text-white mb-4">
                  {t.supAsk}
                </p>
                <ContactDialog 
                  title={t.ctaSup}
                  subtitle={t.supAsk}
                  trigger={
                    <Button variant="secondary" className="w-full rounded-none font-medium">
                      Contact Supply Team
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
          className="max-w-6xl mx-auto mb-16"
        >
          <div className="b2b-card">
            <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-black rounded-full" />
              {t.h2c}
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.workList.map((item, i) => (
                <div key={i} className="flex flex-col gap-4 p-4 bg-[#f8f8f8] border border-transparent hover:border-border transition-colors">
                  <div className="w-10 h-10 bg-white border border-border flex items-center justify-center text-foreground">
                    {iconMap[i as keyof typeof iconMap]}
                  </div>
                  <p className="text-sm font-medium leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-border py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p 
            className="text-sm text-muted-foreground leading-relaxed"
            dangerouslySetInnerHTML={{ __html: t.footer }}
          />
        </div>
      </footer>
    </div>
  );
}
