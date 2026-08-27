import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, Tooltip } from 'recharts';
import { Users, Eye, Smartphone, Monitor, Tablet, TrendingUp, ArrowLeft, Globe, Clock } from 'lucide-react';

// Demo data
const dailyData = [
  { date: '01/01', visits: 45 },
  { date: '02/01', visits: 52 },
  { date: '03/01', visits: 49 },
  { date: '04/01', visits: 63 },
  { date: '05/01', visits: 71 },
  { date: '06/01', visits: 55 },
  { date: '07/01', visits: 48 },
  { date: '08/01', visits: 89 },
  { date: '09/01', visits: 92 },
  { date: '10/01', visits: 78 },
  { date: '11/01', visits: 85 },
  { date: '12/01', visits: 97 },
  { date: '13/01', visits: 110 },
  { date: '14/01', visits: 95 },
  { date: '15/01', visits: 88 },
];

const deviceData = [
  { name: 'Mobile', value: 58, color: 'hsl(var(--brand-coral))' },
  { name: 'Desktop', value: 32, color: 'hsl(var(--brand-lilac))' },
  { name: 'Tablet', value: 10, color: 'hsl(var(--muted-foreground))' },
];

const referrerData = [
  { source: 'Instagram', visits: 342 },
  { source: 'Google', visits: 256 },
  { source: 'Direto', visits: 189 },
  { source: 'WhatsApp', visits: 145 },
  { source: 'LinkedIn', visits: 98 },
];

const recentVisitors = [
  { id: 1, time: '14:32', device: 'mobile', source: 'instagram.com', location: 'São Paulo, BR' },
  { id: 2, time: '14:28', device: 'desktop', source: 'google.com', location: 'Rio de Janeiro, BR' },
  { id: 3, time: '14:25', device: 'mobile', source: 'direto', location: 'Curitiba, BR' },
  { id: 4, time: '14:20', device: 'tablet', source: 'linkedin.com', location: 'Belo Horizonte, BR' },
  { id: 5, time: '14:15', device: 'mobile', source: 'whatsapp', location: 'Brasília, BR' },
  { id: 6, time: '14:10', device: 'desktop', source: 'google.com', location: 'Salvador, BR' },
  { id: 7, time: '14:05', device: 'mobile', source: 'instagram.com', location: 'Fortaleza, BR' },
  { id: 8, time: '14:00', device: 'mobile', source: 'direto', location: 'Porto Alegre, BR' },
];

const chartConfig = {
  visits: {
    label: "Visitas",
    color: "hsl(var(--brand-coral))",
  },
};

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo password: "creatorii"
    if (password === 'creatorii') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Senha incorreta. Dica: creatorii');
    }
  };

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'mobile': return <Smartphone className="h-4 w-4" />;
      case 'desktop': return <Monitor className="h-4 w-4" />;
      case 'tablet': return <Tablet className="h-4 w-4" />;
      default: return <Monitor className="h-4 w-4" />;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl gradient-text">Dashboard Analytics</CardTitle>
            <CardDescription>Digite a senha para acessar</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Senha de acesso"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-center"
              />
              {error && <p className="text-destructive text-sm text-center">{error}</p>}
              <Button type="submit" className="w-full">
                Acessar Dashboard
              </Button>
              <Button type="button" variant="ghost" className="w-full" onClick={() => navigate('/')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar ao site
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold gradient-text">Dashboard Analytics</h1>
            <p className="text-muted-foreground">Dados de demonstração - Creatorii</p>
          </div>
          <Button variant="outline" onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao site
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total de Visitas</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-green-500">+12%</span> vs semana anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Hoje</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87</div>
              <p className="text-xs text-muted-foreground">Visitantes únicos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Usuários Ativos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">Agora no site</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Principal Origem</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Instagram</div>
              <p className="text-xs text-muted-foreground">27% do tráfego</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Area Chart - Visits */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Visitas Diárias</CardTitle>
              <CardDescription>Últimos 15 dias</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <AreaChart data={dailyData}>
                  <defs>
                    <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--brand-coral))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--brand-coral))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="visits"
                    stroke="hsl(var(--brand-coral))"
                    fillOpacity={1}
                    fill="url(#colorVisits)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Pie Chart - Devices */}
          <Card>
            <CardHeader>
              <CardTitle>Dispositivos</CardTitle>
              <CardDescription>Distribuição por tipo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      nameKey="name"
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number, name: string) => [`${value}%`, name]}
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--background))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4 mt-4">
                {deviceData.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-muted-foreground">{item.name}: {item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Bar Chart - Referrers */}
          <Card>
            <CardHeader>
              <CardTitle>Origens de Tráfego</CardTitle>
              <CardDescription>Top 5 fontes</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[250px] w-full">
                <BarChart data={referrerData} layout="vertical">
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis dataKey="source" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={80} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="visits" fill="hsl(var(--brand-lilac))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Recent Visitors Table */}
          <Card>
            <CardHeader>
              <CardTitle>Visitantes Recentes</CardTitle>
              <CardDescription>Últimos acessos</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Hora</TableHead>
                    <TableHead>Dispositivo</TableHead>
                    <TableHead>Origem</TableHead>
                    <TableHead className="hidden sm:table-cell">Local</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentVisitors.map((visitor) => (
                    <TableRow key={visitor.id}>
                      <TableCell className="font-mono text-sm">{visitor.time}</TableCell>
                      <TableCell>{getDeviceIcon(visitor.device)}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{visitor.source}</TableCell>
                      <TableCell className="hidden sm:table-cell text-muted-foreground text-sm">{visitor.location}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center py-4">
          <p className="text-xs text-muted-foreground">
            ⚠️ Estes são dados de demonstração. Para analytics reais, habilite o backend.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
