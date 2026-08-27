import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, CheckCircle2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { z } from 'zod';

const emailSchema = z.string().trim().email({ message: "Email inválido" }).max(255);

const EmailSubscription = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      toast({
        title: "Erro",
        description: result.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(import.meta.env.VITE_SUBSCRIBE_ENDPOINT || '/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: result.data }),
      });

      if (!response.ok) throw new Error('Falha ao cadastrar o e-mail.');

      setIsSubmitted(true);
      toast({ title: "Sucesso!", description: "Entraremos em contato em breve!" });
    } catch {
      toast({
        title: "Não foi possível enviar",
        description: "Tente novamente em alguns instantes ou fale conosco pelo WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center gap-3 animate-fade-in-up">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </div>
        <p className="text-foreground font-medium">Obrigado pela solicitação!</p>
        <p className="text-muted-foreground text-sm">Nossa equipe entrará em contato em breve.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="email"
            placeholder="Seu melhor e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 h-12 bg-card/50 border-border/50 focus:border-primary transition-colors"
            required
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="h-12 px-6 bg-[#7F77DD] hover:bg-[#6a62c4] text-white border-0 font-medium"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Enviando...
            </span>
          ) : (
            'Solicitar proposta'
          )}
        </Button>
      </div>
    </form>
  );
};

export default EmailSubscription;
