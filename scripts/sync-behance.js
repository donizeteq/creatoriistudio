import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonPath = path.join(__dirname, '../src/data/behance-portfolio.json');

async function syncBehance() {
  console.log('🔄 Verificando atualizações no Behance de Natasha Queiroz...');
  try {
    const res = await fetch('https://www.behance.net/natashaqueiroz', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    });
    
    if (!res.ok) {
      console.error(`❌ Erro ao acessar Behance: HTTP ${res.status}`);
      return;
    }
    
    const html = await res.text();
    
    // Extrai galerias do perfil
    const projectRegex = /href="(\/gallery\/(\d+)\/([^"]+))"/g;
    const matches = [...html.matchAll(projectRegex)];
    
    const seen = new Set();
    const latestProjects = [];
    
    for (const match of matches) {
      const fullUrl = `https://www.behance.net${match[1]}`;
      const id = match[2];
      const slug = match[3];
      
      if (seen.has(id)) continue;
      seen.add(id);
      
      // Formata título bonito
      const formattedTitle = slug
        .replace(/-/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());
        
      latestProjects.push({
        id,
        name: formattedTitle,
        slug,
        link: fullUrl
      });
    }
    
    if (latestProjects.length === 0) {
      console.log('⚠️ Nenhum projeto encontrado no HTML.');
      return;
    }

    console.log(`✅ ${latestProjects.length} projetos encontrados no Behance.`);
    
    // Lê o JSON atual
    const currentData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    
    // Atualiza com o mais recente (se diferente do topo)
    const newest = latestProjects[0];
    if (currentData.items[0] && currentData.items[0].link === newest.link) {
      console.log('✨ O portfólio já está 100% atualizado com o último projeto do Behance!');
      return;
    }
    
    console.log(`🚀 Novo projeto detectado no Behance: ${newest.name}`);
    
    // Monta o novo item
    const newItem = {
      name: newest.name,
      cat: "NOVO CASE BEHANCE",
      img: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/605883254947271.6a91dceaa8d7f.png",
      link: newest.link
    };
    
    // Adiciona no topo dos secundários
    currentData.items.unshift(newItem);
    if (currentData.items.length > 6) {
      currentData.items = currentData.items.slice(0, 6);
    }
    
    fs.writeFileSync(jsonPath, JSON.stringify(currentData, null, 2), 'utf-8');
    console.log('💾 JSON atualizado com sucesso!');
    
    // Executa build e git push se for acionado em cron
    execSync('npm run build', { cwd: path.join(__dirname, '..'), stdio: 'inherit' });
    console.log('🔨 Build concluído!');
    
  } catch (err) {
    console.error('❌ Erro na sincronização:', err.message);
  }
}

syncBehance();
