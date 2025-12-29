import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Copy, Sparkles, ExternalLink, Phone, Palette, Type } from "lucide-react";

const themes = [
  { id: "lanchonete", name: "Lanchonete", colors: ["#FF6B35", "#F7C59F", "#2E2E2E"], emoji: "🍔" },
  { id: "restaurante", name: "Restaurante", colors: ["#8B0000", "#FFD700", "#1A1A1A"], emoji: "🍽️" },
  { id: "cafeteria", name: "Cafeteria", colors: ["#6F4E37", "#D4A574", "#FFF8DC"], emoji: "☕" },
  { id: "pizzaria", name: "Pizzaria", colors: ["#C41E3A", "#FFD93D", "#228B22"], emoji: "🍕" },
  { id: "padaria", name: "Padaria", colors: ["#DEB887", "#8B4513", "#FFFAF0"], emoji: "🥖" },
  { id: "sorveteria", name: "Sorveteria", colors: ["#FF69B4", "#87CEEB", "#98FB98"], emoji: "🍦" },
  { id: "barbearia", name: "Barbearia", colors: ["#1C1C1C", "#C0C0C0", "#8B0000"], emoji: "💈" },
  { id: "salao", name: "Salão de Beleza", colors: ["#FF1493", "#FFB6C1", "#4B0082"], emoji: "💅" },
  { id: "academia", name: "Academia", colors: ["#FF4500", "#1A1A1A", "#FFFFFF"], emoji: "💪" },
  { id: "clinica", name: "Clínica/Saúde", colors: ["#00CED1", "#FFFFFF", "#2F4F4F"], emoji: "🏥" },
  { id: "pet", name: "Pet Shop", colors: ["#32CD32", "#FFD700", "#FF6347"], emoji: "🐾" },
  { id: "loja", name: "Loja/E-commerce", colors: ["#4169E1", "#FFD700", "#1A1A1A"], emoji: "🛍️" },
];

const fonts = [
  { id: "poppins", name: "Poppins", style: "Moderna e limpa" },
  { id: "roboto", name: "Roboto", style: "Profissional" },
  { id: "montserrat", name: "Montserrat", style: "Elegante" },
  { id: "opensans", name: "Open Sans", style: "Versátil" },
  { id: "playfair", name: "Playfair Display", style: "Sofisticada" },
  { id: "raleway", name: "Raleway", style: "Minimalista" },
  { id: "lato", name: "Lato", style: "Amigável" },
  { id: "nunito", name: "Nunito", style: "Arredondada" },
];

const Index = () => {
  const [businessName, setBusinessName] = useState("");
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [selectedFont, setSelectedFont] = useState<string | null>(null);
  const [useAIFonts, setUseAIFonts] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [includeWhatsapp, setIncludeWhatsapp] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");

  const getThemeData = () => themes.find(t => t.id === selectedTheme);
  const getFontData = () => fonts.find(f => f.id === selectedFont);

  const generatePrompt = () => {
    if (!businessName || !selectedTheme) {
      toast.error("Preencha o nome do negócio e selecione um tema!");
      return;
    }

    const theme = getThemeData();
    const font = getFontData();

    let prompt = `Crie um site para "${businessName}" (${theme?.name}).`;
    
    prompt += ` Use cores: ${theme?.colors.join(", ")}.`;
    
    if (useAIFonts) {
      prompt += ` Escolha fontes modernas que combinem com o tema ${theme?.name}.`;
    } else if (font) {
      prompt += ` Use a fonte ${font.name}.`;
    }

    if (includeWhatsapp && whatsappNumber) {
      const cleanNumber = whatsappNumber.replace(/\D/g, "");
      prompt += ` Adicione botão de WhatsApp para: wa.me/${cleanNumber}.`;
    }

    if (additionalInfo.trim()) {
      prompt += ` ${additionalInfo.trim()}`;
    }

    prompt += ` Design responsivo e moderno.`;

    setGeneratedPrompt(prompt);
    toast.success("Prompt gerado com sucesso!");
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(generatedPrompt);
    toast.success("Prompt copiado!");
  };

  const openLovable = () => {
    const encodedPrompt = encodeURIComponent(generatedPrompt);
    window.open(`https://lovable.dev/projects/create?prompt=${encodedPrompt}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              JOHN IA
            </h1>
          </div>
          <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">
            Gerador de Prompts
          </Badge>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
            Crie prompts perfeitos para a <span className="text-primary">Lovable</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Configure seu projeto e gere um prompt otimizado em segundos
          </p>
        </div>

        <div className="space-y-6">
          {/* Nome do Negócio */}
          <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
            <Label className="text-lg font-semibold mb-3 block text-foreground">
              Nome do seu negócio
            </Label>
            <Input
              placeholder="Ex: Hamburgueria do João"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="text-lg h-12 border-border focus:border-primary"
            />
          </Card>

          {/* Seleção de Tema */}
          <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <Palette className="w-5 h-5 text-primary" />
              <Label className="text-lg font-semibold text-foreground">
                Escolha o tema do negócio
              </Label>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                    selectedTheme === theme.id
                      ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                      : "border-border hover:border-primary/50 bg-card"
                  }`}
                >
                  <span className="text-2xl mb-2 block">{theme.emoji}</span>
                  <span className="font-medium text-sm text-foreground">{theme.name}</span>
                  <div className="flex gap-1 mt-2 justify-center">
                    {theme.colors.map((color, i) => (
                      <div
                        key={i}
                        className="w-4 h-4 rounded-full border border-border/50"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* Seleção de Fontes */}
          <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <Type className="w-5 h-5 text-primary" />
              <Label className="text-lg font-semibold text-foreground">
                Escolha a fonte
              </Label>
            </div>

            <div className="flex items-center gap-3 mb-4 p-3 rounded-lg bg-accent/10 border border-accent/20">
              <Switch
                checked={useAIFonts}
                onCheckedChange={setUseAIFonts}
                className="data-[state=checked]:bg-primary"
              />
              <div>
                <span className="font-medium text-foreground">Deixar a IA escolher</span>
                <p className="text-sm text-muted-foreground">A Lovable irá sugerir as melhores fontes</p>
              </div>
              <Sparkles className="w-4 h-4 text-accent ml-auto" />
            </div>

            {!useAIFonts && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {fonts.map((font) => (
                  <button
                    key={font.id}
                    onClick={() => setSelectedFont(font.id)}
                    className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                      selectedFont === font.id
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50 bg-card"
                    }`}
                  >
                    <span className="font-semibold text-foreground">{font.name}</span>
                    <p className="text-xs text-muted-foreground mt-1">{font.style}</p>
                  </button>
                ))}
              </div>
            )}
          </Card>

          {/* WhatsApp */}
          <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <Phone className="w-5 h-5 text-primary" />
              <Label className="text-lg font-semibold text-foreground">
                WhatsApp para atendimento
              </Label>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <Switch
                checked={includeWhatsapp}
                onCheckedChange={setIncludeWhatsapp}
                className="data-[state=checked]:bg-primary"
              />
              <span className="text-foreground">Adicionar botão de WhatsApp</span>
            </div>

            {includeWhatsapp && (
              <Input
                placeholder="(11) 99999-9999"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="h-12 border-border focus:border-primary"
              />
            )}
          </Card>

          {/* Info Adicional */}
          <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
            <Label className="text-lg font-semibold mb-3 block text-foreground">
              Informações adicionais (opcional)
            </Label>
            <Textarea
              placeholder="Descreva funcionalidades extras que você deseja..."
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              className="min-h-24 border-border focus:border-primary"
            />
          </Card>

          {/* Botão Gerar */}
          <Button
            onClick={generatePrompt}
            size="lg"
            className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/30"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Gerar Prompt
          </Button>

          {/* Resultado */}
          {generatedPrompt && (
            <Card className="p-6 border-2 border-primary/50 bg-primary/5">
              <Label className="text-lg font-semibold mb-3 block text-foreground">
                Seu prompt está pronto! 🎉
              </Label>
              <div className="p-4 rounded-lg bg-background border border-border mb-4">
                <p className="text-foreground leading-relaxed">{generatedPrompt}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={copyPrompt}
                  variant="outline"
                  className="flex-1 h-12 border-primary text-primary hover:bg-primary/10"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar Prompt
                </Button>
                <Button
                  onClick={openLovable}
                  className="flex-1 h-12 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Abrir na Lovable
                </Button>
              </div>
            </Card>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-16 py-6 text-center text-muted-foreground">
        <p>Feito com 💙 por <span className="text-primary font-semibold">JOHN IA</span></p>
      </footer>
    </div>
  );
};

export default Index;
