import { Button } from "@/components/ui/button";

type Lang = "en" | "it" | "de";

interface LanguageSwitcherProps {
  currentLang: Lang;
  onChange: (lang: Lang) => void;
}

export function LanguageSwitcher({ currentLang, onChange }: LanguageSwitcherProps) {
  return (
    <div className="flex items-center gap-1">
      {(["en", "it", "de"] as const).map((lang) => (
        <Button
          key={lang}
          variant="ghost"
          size="sm"
          onClick={() => onChange(lang)}
          className={`
            h-7 px-2 font-mono text-xs uppercase tracking-wider
            ${currentLang === lang ? "bg-secondary font-bold text-foreground" : "text-muted-foreground hover:text-foreground"}
          `}
        >
          {lang}
        </Button>
      ))}
    </div>
  );
}
