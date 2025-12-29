import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { 
  Copy, Sparkles, ExternalLink, Phone, Palette, Type, 
  Layout, Settings, ChevronRight, Check, Plus, Star,
  ShoppingCart, Calendar, MapPin, Image, MessageSquare
} from "lucide-react";

const themes = [
  { id: "lanchonete", name: "Lanchonete", colors: ["#FF6B35", "#F7C59F", "#2E2E2E"], emoji: "🍔", desc: "Fast food, hambúrgueres" },
  { id: "restaurante", name: "Restaurante", colors: ["#8B0000", "#FFD700", "#1A1A1A"], emoji: "🍽️", desc: "Refeições completas" },
  { id: "cafeteria", name: "Cafeteria", colors: ["#6F4E37", "#D4A574", "#FFF8DC"], emoji: "☕", desc: "Café e lanches" },
  { id: "pizzaria", name: "Pizzaria", colors: ["#C41E3A", "#FFD93D", "#228B22"], emoji: "🍕", desc: "Pizzas e massas" },
  { id: "padaria", name: "Padaria", colors: ["#DEB887", "#8B4513", "#FFFAF0"], emoji: "🥖", desc: "Pães e confeitaria" },
  { id: "sorveteria", name: "Sorveteria", colors: ["#FF69B4", "#87CEEB", "#98FB98"], emoji: "🍦", desc: "Sorvetes e açaí" },
  { id: "doceria", name: "Doceria", colors: ["#FFB6C1", "#FF1493", "#FFFACD"], emoji: "🧁", desc: "Doces e bolos" },
  { id: "sushi", name: "Sushi/Japonês", colors: ["#1A1A1A", "#FF6B6B", "#FFFFFF"], emoji: "🍣", desc: "Comida japonesa" },
  { id: "churrascaria", name: "Churrascaria", colors: ["#8B4513", "#FFD700", "#2F2F2F"], emoji: "🥩", desc: "Carnes e churrasco" },
  { id: "barbearia", name: "Barbearia", colors: ["#1C1C1C", "#C0C0C0", "#8B0000"], emoji: "💈", desc: "Cortes masculinos" },
  { id: "salao", name: "Salão de Beleza", colors: ["#FF1493", "#FFB6C1", "#4B0082"], emoji: "💅", desc: "Beleza feminina" },
  { id: "estetica", name: "Estética", colors: ["#E6E6FA", "#DDA0DD", "#9370DB"], emoji: "✨", desc: "Procedimentos estéticos" },
  { id: "academia", name: "Academia", colors: ["#FF4500", "#1A1A1A", "#FFFFFF"], emoji: "💪", desc: "Fitness e musculação" },
  { id: "crossfit", name: "CrossFit/Box", colors: ["#000000", "#FF0000", "#FFFFFF"], emoji: "🏋️", desc: "Treino funcional" },
  { id: "yoga", name: "Yoga/Pilates", colors: ["#98FB98", "#E6E6FA", "#FFFAF0"], emoji: "🧘", desc: "Bem-estar e meditação" },
  { id: "clinica", name: "Clínica Médica", colors: ["#00CED1", "#FFFFFF", "#2F4F4F"], emoji: "🏥", desc: "Saúde geral" },
  { id: "dentista", name: "Dentista", colors: ["#87CEEB", "#FFFFFF", "#1E90FF"], emoji: "🦷", desc: "Odontologia" },
  { id: "psicologia", name: "Psicologia", colors: ["#DDA0DD", "#F5F5DC", "#6B4C9A"], emoji: "🧠", desc: "Saúde mental" },
  { id: "veterinario", name: "Veterinário", colors: ["#32CD32", "#FFFFFF", "#4169E1"], emoji: "🐕", desc: "Saúde animal" },
  { id: "pet", name: "Pet Shop", colors: ["#32CD32", "#FFD700", "#FF6347"], emoji: "🐾", desc: "Produtos para pets" },
  { id: "loja", name: "Loja/E-commerce", colors: ["#4169E1", "#FFD700", "#1A1A1A"], emoji: "🛍️", desc: "Vendas online" },
  { id: "moda", name: "Moda/Boutique", colors: ["#1A1A1A", "#C9A227", "#FFFFFF"], emoji: "👗", desc: "Roupas e acessórios" },
  { id: "joalheria", name: "Joalheria", colors: ["#1A1A1A", "#FFD700", "#C0C0C0"], emoji: "💎", desc: "Joias e bijuterias" },
  { id: "imobiliaria", name: "Imobiliária", colors: ["#1E3A5F", "#C9A227", "#FFFFFF"], emoji: "🏠", desc: "Compra e aluguel" },
  { id: "advocacia", name: "Advocacia", colors: ["#1A1A1A", "#8B4513", "#FFFFFF"], emoji: "⚖️", desc: "Serviços jurídicos" },
  { id: "contabilidade", name: "Contabilidade", colors: ["#2F4F4F", "#4169E1", "#FFFFFF"], emoji: "📊", desc: "Serviços contábeis" },
  { id: "arquitetura", name: "Arquitetura", colors: ["#2F2F2F", "#FFFFFF", "#C9A227"], emoji: "📐", desc: "Projetos e design" },
  { id: "fotografia", name: "Fotografia", colors: ["#1A1A1A", "#FFFFFF", "#FF6B6B"], emoji: "📸", desc: "Ensaios e eventos" },
  { id: "marketing", name: "Marketing Digital", colors: ["#FF6B35", "#4169E1", "#1A1A1A"], emoji: "📱", desc: "Agência digital" },
  { id: "escola", name: "Escola/Curso", colors: ["#4169E1", "#FFD700", "#FFFFFF"], emoji: "📚", desc: "Educação" },
  { id: "mecanica", name: "Oficina Mecânica", colors: ["#1A1A1A", "#FF4500", "#C0C0C0"], emoji: "🔧", desc: "Reparos automotivos" },
  { id: "lavajato", name: "Lava-Jato", colors: ["#1E90FF", "#87CEEB", "#FFFFFF"], emoji: "🚗", desc: "Lavagem de veículos" },
  { id: "hotel", name: "Hotel/Pousada", colors: ["#2F4F4F", "#C9A227", "#FFFAF0"], emoji: "🏨", desc: "Hospedagem" },
  { id: "eventos", name: "Eventos/Festas", colors: ["#FF1493", "#FFD700", "#9400D3"], emoji: "🎉", desc: "Organização de eventos" },
  { id: "floricultura", name: "Floricultura", colors: ["#FF69B4", "#98FB98", "#FFB6C1"], emoji: "🌸", desc: "Flores e plantas" },
  { id: "outros", name: "Outro tema...", colors: ["#6366F1", "#8B5CF6", "#A855F7"], emoji: "✏️", desc: "Descreva seu negócio" },
];

const fonts = [
  { id: "poppins", name: "Poppins", style: "Moderna e limpa", sample: "Aa" },
  { id: "roboto", name: "Roboto", style: "Profissional", sample: "Aa" },
  { id: "montserrat", name: "Montserrat", style: "Elegante", sample: "Aa" },
  { id: "opensans", name: "Open Sans", style: "Versátil", sample: "Aa" },
  { id: "playfair", name: "Playfair Display", style: "Sofisticada", sample: "Aa" },
  { id: "raleway", name: "Raleway", style: "Minimalista", sample: "Aa" },
  { id: "lato", name: "Lato", style: "Amigável", sample: "Aa" },
  { id: "nunito", name: "Nunito", style: "Arredondada", sample: "Aa" },
  { id: "inter", name: "Inter", style: "Contemporânea", sample: "Aa" },
  { id: "dmSans", name: "DM Sans", style: "Geométrica", sample: "Aa" },
  { id: "spaceGrotesk", name: "Space Grotesk", style: "Futurista", sample: "Aa" },
  { id: "quicksand", name: "Quicksand", style: "Suave", sample: "Aa" },
];

const layoutOptions = [
  { id: "moderno", name: "Moderno", desc: "Design clean e atual" },
  { id: "minimalista", name: "Minimalista", desc: "Simples e elegante" },
  { id: "corporativo", name: "Corporativo", desc: "Profissional e sério" },
  { id: "criativo", name: "Criativo", desc: "Ousado e diferente" },
  { id: "classico", name: "Clássico", desc: "Tradicional e confiável" },
];

const sections = [
  { id: "hero", name: "Banner Principal", icon: Image, default: true },
  { id: "sobre", name: "Sobre Nós", icon: MessageSquare, default: true },
  { id: "servicos", name: "Serviços/Produtos", icon: ShoppingCart, default: true },
  { id: "galeria", name: "Galeria de Fotos", icon: Image, default: false },
  { id: "depoimentos", name: "Depoimentos", icon: Star, default: false },
  { id: "equipe", name: "Nossa Equipe", icon: Settings, default: false },
  { id: "precos", name: "Tabela de Preços", icon: ShoppingCart, default: false },
  { id: "agendamento", name: "Agendamento Online", icon: Calendar, default: false },
  { id: "localizacao", name: "Localização/Mapa", icon: MapPin, default: false },
  { id: "contato", name: "Formulário de Contato", icon: MessageSquare, default: true },
  { id: "faq", name: "Perguntas Frequentes", icon: MessageSquare, default: false },
  { id: "blog", name: "Blog/Notícias", icon: Layout, default: false },
];

const features = [
  { id: "responsivo", name: "Design Responsivo", desc: "Funciona em celular e desktop" },
  { id: "animacoes", name: "Animações Suaves", desc: "Transições e efeitos visuais" },
  { id: "seo", name: "Otimizado para SEO", desc: "Melhor posição no Google" },
  { id: "rapido", name: "Carregamento Rápido", desc: "Performance otimizada" },
  { id: "acessibilidade", name: "Acessibilidade", desc: "Inclusivo para todos" },
  { id: "darkmode", name: "Modo Escuro", desc: "Tema claro e escuro" },
];

const Index = () => {
  const [step, setStep] = useState(1);
  const [businessName, setBusinessName] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [customTheme, setCustomTheme] = useState("");
  const [selectedFont, setSelectedFont] = useState<string | null>(null);
  const [useAIFonts, setUseAIFonts] = useState(false);
  const [selectedLayout, setSelectedLayout] = useState("moderno");
  const [selectedSections, setSelectedSections] = useState<string[]>(
    sections.filter(s => s.default).map(s => s.id)
  );
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(["responsivo", "seo"]);
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [includeWhatsapp, setIncludeWhatsapp] = useState(false);
  const [instagramHandle, setInstagramHandle] = useState("");
  const [includeInstagram, setIncludeInstagram] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");

  const getThemeData = () => themes.find(t => t.id === selectedTheme);
  const getFontData = () => fonts.find(f => f.id === selectedFont);
  const getLayoutData = () => layoutOptions.find(l => l.id === selectedLayout);

  const toggleSection = (id: string) => {
    setSelectedSections(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const toggleFeature = (id: string) => {
    setSelectedFeatures(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const generatePrompt = () => {
    if (!businessName) {
      toast.error("Preencha o nome do negócio!");
      return;
    }
    if (!selectedTheme) {
      toast.error("Selecione um tema!");
      return;
    }

    const theme = getThemeData();
    const font = getFontData();
    const layout = getLayoutData();
    const themeLabel = selectedTheme === "outros" ? customTheme : theme?.name;

    let prompt = `# Projeto: ${businessName}\n\n`;
    prompt += `Crie um site profissional e moderno para "${businessName}", um negócio do segmento de ${themeLabel}.\n\n`;

    if (businessDescription) {
      prompt += `## Descrição do Negócio\n${businessDescription}\n\n`;
    }

    prompt += `## Design e Estilo Visual\n`;
    prompt += `- **Estilo do layout:** ${layout?.name} - ${layout?.desc}\n`;
    
    if (selectedTheme !== "outros") {
      prompt += `- **Paleta de cores sugerida:** Use as cores ${theme?.colors.join(", ")} como base, podendo adaptar para manter harmonia visual\n`;
    } else {
      prompt += `- **Paleta de cores:** Escolha cores apropriadas para o segmento de ${customTheme}\n`;
    }

    if (useAIFonts) {
      prompt += `- **Tipografia:** Selecione automaticamente fontes modernas e legíveis que combinem com o tema ${themeLabel}\n`;
    } else if (font) {
      prompt += `- **Tipografia:** Use a fonte ${font.name} (${font.style}) como principal\n`;
    }

    prompt += `\n## Seções do Site\nO site deve conter as seguintes seções:\n`;
    selectedSections.forEach(sectionId => {
      const section = sections.find(s => s.id === sectionId);
      if (section) {
        prompt += `- **${section.name}**\n`;
      }
    });

    prompt += `\n## Funcionalidades Técnicas\n`;
    selectedFeatures.forEach(featureId => {
      const feature = features.find(f => f.id === featureId);
      if (feature) {
        prompt += `- ${feature.name}: ${feature.desc}\n`;
      }
    });

    if (includeWhatsapp && whatsappNumber) {
      const cleanNumber = whatsappNumber.replace(/\D/g, "");
      prompt += `\n## Integração WhatsApp\n`;
      prompt += `- Adicione um botão flutuante de WhatsApp visível em todas as páginas\n`;
      prompt += `- Link direto: https://wa.me/55${cleanNumber}\n`;
      prompt += `- O botão deve estar no canto inferior direito com animação de pulso sutil\n`;
    }

    if (includeInstagram && instagramHandle) {
      prompt += `\n## Redes Sociais\n`;
      prompt += `- Link para Instagram: @${instagramHandle.replace("@", "")}\n`;
      prompt += `- Exibir ícone do Instagram no header e/ou footer\n`;
    }

    if (additionalInfo.trim()) {
      prompt += `\n## Instruções Adicionais\n${additionalInfo.trim()}\n`;
    }

    prompt += `\n## Requisitos Finais\n`;
    prompt += `- O site deve ser totalmente funcional e visualmente atraente\n`;
    prompt += `- Use componentes modernos com Tailwind CSS\n`;
    prompt += `- Garanta boa experiência do usuário (UX) em todos os dispositivos\n`;
    prompt += `- O design deve transmitir profissionalismo e confiança\n`;

    setGeneratedPrompt(prompt);
    setStep(5);
    toast.success("Prompt gerado com sucesso!");
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(generatedPrompt);
    toast.success("Prompt copiado para a área de transferência!");
  };

  const openLovable = () => {
    const encodedPrompt = encodeURIComponent(generatedPrompt);
    window.open(`https://lovable.dev/projects/create?prompt=${encodedPrompt}`, "_blank");
  };

  const nextStep = () => {
    if (step === 1 && !businessName) {
      toast.error("Digite o nome do seu negócio!");
      return;
    }
    if (step === 2 && !selectedTheme) {
      toast.error("Selecione um tema!");
      return;
    }
    if (step === 2 && selectedTheme === "outros" && !customTheme) {
      toast.error("Descreva o tema do seu negócio!");
      return;
    }
    setStep(s => s + 1);
  };

  const prevStep = () => setStep(s => s - 1);

  const StepIndicator = () => (
    <div className="flex items-center justify-center gap-2 mb-8">
      {[1, 2, 3, 4].map((s) => (
        <div key={s} className="flex items-center">
          <button
            onClick={() => s < step && setStep(s)}
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
              s === step
                ? "bg-primary text-primary-foreground scale-110 shadow-lg shadow-primary/30"
                : s < step
                ? "bg-primary/20 text-primary cursor-pointer hover:bg-primary/30"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {s < step ? <Check className="w-5 h-5" /> : s}
          </button>
          {s < 4 && (
            <div className={`w-12 h-1 mx-1 rounded ${s < step ? "bg-primary" : "bg-muted"}`} />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center shadow-lg shadow-primary/30">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                JOHN IA
              </h1>
              <p className="text-xs text-muted-foreground">Gerador de Prompts</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30 hidden sm:flex">
            <Sparkles className="w-3 h-3 mr-1" />
            Powered by AI
          </Badge>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {step < 5 && (
          <>
            {/* Hero */}
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
                Crie prompts perfeitos para a <span className="text-primary">Lovable</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Configure seu projeto passo a passo e gere um prompt profissional
              </p>
            </div>

            <StepIndicator />
          </>
        )}

        {/* Step 1: Nome e Descrição */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
              <Label className="text-xl font-semibold mb-4 block text-foreground flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-sm">1</span>
                Nome do seu negócio
              </Label>
              <Input
                placeholder="Ex: Hamburgueria do João, Studio Beleza, Clínica Saúde..."
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="text-lg h-14 border-border focus:border-primary"
              />
            </Card>

            <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
              <Label className="text-lg font-semibold mb-3 block text-foreground">
                Descrição do negócio (opcional)
              </Label>
              <Textarea
                placeholder="Conte um pouco sobre o que seu negócio faz, quem são seus clientes, qual o diferencial..."
                value={businessDescription}
                onChange={(e) => setBusinessDescription(e.target.value)}
                className="min-h-28 border-border focus:border-primary"
              />
              <p className="text-sm text-muted-foreground mt-2">
                Quanto mais detalhes, melhor será o prompt gerado!
              </p>
            </Card>

            <Button onClick={nextStep} size="lg" className="w-full h-14 text-lg font-semibold">
              Continuar <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        )}

        {/* Step 2: Tema e Cores */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <Palette className="w-6 h-6 text-primary" />
                <Label className="text-xl font-semibold text-foreground">
                  Qual é o tema do seu negócio?
                </Label>
              </div>
              <p className="text-muted-foreground mb-4">
                Selecione o tema que mais se aproxima. As cores serão sugeridas automaticamente.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[400px] overflow-y-auto pr-2">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-[1.02] text-left ${
                      selectedTheme === theme.id
                        ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                        : "border-border hover:border-primary/50 bg-card"
                    }`}
                  >
                    <span className="text-2xl mb-2 block">{theme.emoji}</span>
                    <span className="font-semibold text-sm text-foreground block">{theme.name}</span>
                    <span className="text-xs text-muted-foreground">{theme.desc}</span>
                    {theme.id !== "outros" && (
                      <div className="flex gap-1 mt-2">
                        {theme.colors.map((color, i) => (
                          <div
                            key={i}
                            className="w-5 h-5 rounded-full border border-border/50 shadow-sm"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    )}
                    {theme.id === "outros" && (
                      <div className="mt-2">
                        <Plus className="w-5 h-5 text-primary" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {selectedTheme === "outros" && (
                <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <Label className="font-semibold mb-2 block">Descreva o tema do seu negócio:</Label>
                  <Input
                    placeholder="Ex: Loja de artesanato, Estúdio de tatuagem, Consultoria financeira..."
                    value={customTheme}
                    onChange={(e) => setCustomTheme(e.target.value)}
                    className="border-primary/30 focus:border-primary"
                  />
                </div>
              )}
            </Card>

            <div className="flex gap-3">
              <Button onClick={prevStep} variant="outline" size="lg" className="flex-1 h-14">
                Voltar
              </Button>
              <Button onClick={nextStep} size="lg" className="flex-1 h-14 text-lg font-semibold">
                Continuar <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Layout, Fontes e Seções */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            {/* Layout */}
            <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <Layout className="w-6 h-6 text-primary" />
                <Label className="text-xl font-semibold text-foreground">
                  Estilo do Layout
                </Label>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {layoutOptions.map((layout) => (
                  <button
                    key={layout.id}
                    onClick={() => setSelectedLayout(layout.id)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedLayout === layout.id
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50 bg-card"
                    }`}
                  >
                    <span className="font-semibold text-sm block text-foreground">{layout.name}</span>
                    <span className="text-xs text-muted-foreground">{layout.desc}</span>
                  </button>
                ))}
              </div>
            </Card>

            {/* Fontes */}
            <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <Type className="w-6 h-6 text-primary" />
                <Label className="text-xl font-semibold text-foreground">
                  Tipografia
                </Label>
              </div>

              <div className="flex items-center gap-3 mb-4 p-4 rounded-xl bg-accent/10 border border-accent/20">
                <Switch
                  checked={useAIFonts}
                  onCheckedChange={setUseAIFonts}
                  className="data-[state=checked]:bg-primary"
                />
                <div className="flex-1">
                  <span className="font-semibold text-foreground">Deixar a IA escolher</span>
                  <p className="text-sm text-muted-foreground">A Lovable irá sugerir as melhores fontes para seu projeto</p>
                </div>
                <Sparkles className="w-5 h-5 text-accent" />
              </div>

              {!useAIFonts && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {fonts.map((font) => (
                    <button
                      key={font.id}
                      onClick={() => setSelectedFont(font.id)}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        selectedFont === font.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50 bg-card"
                      }`}
                    >
                      <span className="text-2xl font-bold text-primary block mb-1">{font.sample}</span>
                      <span className="font-semibold text-sm text-foreground">{font.name}</span>
                      <p className="text-xs text-muted-foreground">{font.style}</p>
                    </button>
                  ))}
                </div>
              )}
            </Card>

            {/* Seções */}
            <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <Settings className="w-6 h-6 text-primary" />
                <Label className="text-xl font-semibold text-foreground">
                  Seções do Site
                </Label>
              </div>
              <p className="text-muted-foreground mb-4">
                Selecione as seções que deseja incluir no seu site
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {sections.map((section) => {
                  const Icon = section.icon;
                  const isSelected = selectedSections.includes(section.id);
                  return (
                    <button
                      key={section.id}
                      onClick={() => toggleSection(section.id)}
                      className={`p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${
                        isSelected
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50 bg-card"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-medium text-foreground">{section.name}</span>
                      {isSelected && <Check className="w-5 h-5 text-primary ml-auto" />}
                    </button>
                  );
                })}
              </div>
            </Card>

            <div className="flex gap-3">
              <Button onClick={prevStep} variant="outline" size="lg" className="flex-1 h-14">
                Voltar
              </Button>
              <Button onClick={nextStep} size="lg" className="flex-1 h-14 text-lg font-semibold">
                Continuar <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Features e Contato */}
        {step === 4 && (
          <div className="space-y-6 animate-fade-in">
            {/* Features */}
            <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-6 h-6 text-primary" />
                <Label className="text-xl font-semibold text-foreground">
                  Funcionalidades Extras
                </Label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((feature) => {
                  const isSelected = selectedFeatures.includes(feature.id);
                  return (
                    <button
                      key={feature.id}
                      onClick={() => toggleFeature(feature.id)}
                      className={`p-4 rounded-xl border-2 flex items-start gap-3 transition-all text-left ${
                        isSelected
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50 bg-card"
                      }`}
                    >
                      <Checkbox checked={isSelected} className="mt-1" />
                      <div>
                        <span className="font-medium text-foreground block">{feature.name}</span>
                        <span className="text-sm text-muted-foreground">{feature.desc}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </Card>

            {/* WhatsApp */}
            <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <Phone className="w-6 h-6 text-primary" />
                <Label className="text-xl font-semibold text-foreground">
                  Contato e Redes Sociais
                </Label>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <Switch
                      checked={includeWhatsapp}
                      onCheckedChange={setIncludeWhatsapp}
                      className="data-[state=checked]:bg-green-500"
                    />
                    <span className="font-medium text-foreground">Botão de WhatsApp flutuante</span>
                  </div>
                  {includeWhatsapp && (
                    <Input
                      placeholder="(11) 99999-9999"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      className="border-green-500/30 focus:border-green-500"
                    />
                  )}
                </div>

                <div className="p-4 rounded-xl bg-pink-500/10 border border-pink-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <Switch
                      checked={includeInstagram}
                      onCheckedChange={setIncludeInstagram}
                      className="data-[state=checked]:bg-pink-500"
                    />
                    <span className="font-medium text-foreground">Link do Instagram</span>
                  </div>
                  {includeInstagram && (
                    <Input
                      placeholder="@seuperfil"
                      value={instagramHandle}
                      onChange={(e) => setInstagramHandle(e.target.value)}
                      className="border-pink-500/30 focus:border-pink-500"
                    />
                  )}
                </div>
              </div>
            </Card>

            {/* Info Adicional */}
            <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
              <Label className="text-lg font-semibold mb-3 block text-foreground">
                Instruções adicionais (opcional)
              </Label>
              <Textarea
                placeholder="Adicione qualquer informação extra que você gostaria de incluir no prompt...&#10;Ex: Quero um botão de promoções, preciso de um cardápio digital, quero cores mais vibrantes..."
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                className="min-h-28 border-border focus:border-primary"
              />
            </Card>

            <div className="flex gap-3">
              <Button onClick={prevStep} variant="outline" size="lg" className="flex-1 h-14">
                Voltar
              </Button>
              <Button onClick={generatePrompt} size="lg" className="flex-1 h-14 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90">
                <Sparkles className="w-5 h-5 mr-2" />
                Gerar Prompt
              </Button>
            </div>
          </div>
        )}

        {/* Step 5: Resultado */}
        {step === 5 && generatedPrompt && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/30">
                <Check className="w-10 h-10 text-primary-foreground" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Seu prompt está pronto! 🎉
              </h2>
              <p className="text-muted-foreground">
                Copie o prompt abaixo ou envie direto para a Lovable
              </p>
            </div>

            <Card className="p-6 border-2 border-primary/50 bg-card">
              <div className="flex items-center justify-between mb-4">
                <Label className="text-lg font-semibold text-foreground">
                  Prompt Gerado
                </Label>
                <Badge className="bg-primary/20 text-primary border-primary/30">
                  {generatedPrompt.length} caracteres
                </Badge>
              </div>
              <div className="p-4 rounded-xl bg-muted/50 border border-border max-h-96 overflow-y-auto">
                <pre className="text-sm text-foreground whitespace-pre-wrap font-mono leading-relaxed">
                  {generatedPrompt}
                </pre>
              </div>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                onClick={copyPrompt}
                variant="outline"
                size="lg"
                className="h-14 text-lg border-2 border-primary text-primary hover:bg-primary/10"
              >
                <Copy className="w-5 h-5 mr-2" />
                Copiar Prompt
              </Button>
              <Button
                onClick={openLovable}
                size="lg"
                className="h-14 text-lg bg-gradient-to-r from-primary to-accent hover:opacity-90 font-semibold shadow-lg shadow-primary/30"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Abrir na Lovable
              </Button>
            </div>

            <Button
              onClick={() => {
                setStep(1);
                setGeneratedPrompt("");
              }}
              variant="ghost"
              className="w-full text-muted-foreground hover:text-foreground"
            >
              Criar novo prompt
            </Button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-16 py-6 text-center text-muted-foreground">
        <p>
          Feito com 💙 por <span className="text-primary font-semibold">JOHN IA</span>
        </p>
      </footer>
    </div>
  );
};

export default Index;
