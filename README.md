# Portfolio - Ismael Fernandes Rojas

Portfolio profissional moderno desenvolvido com HTML5, CSS3 e JavaScript vanilla, apresentando as habilidades e experiência de Ismael Fernandes Rojas como Engenheiro de Dados na IBM.

## 🚀 Características

### Design Moderno e Responsivo
- Layout totalmente responsivo que se adapta a todos os dispositivos
- Design moderno com gradientes, sombras e animações suaves
- Paleta de cores profissional com tema azul e acentos vibrantes
- Tipografia otimizada usando Google Fonts (Inter e Poppins)

### Seções Principais
1. **Hero Section** - Apresentação impactante com call-to-actions e foto profissional
2. **Sobre** - Biografia profissional com estatísticas animadas
3. **Experiência** - Timeline interativa com histórico profissional
4. **Habilidades** - Barras de progresso animadas organizadas por categoria
5. **Projetos** - Grid de projetos com filtros e hover effects
6. **Contato** - Formulário funcional e informações de contato

### Funcionalidades Interativas
- ✨ Navegação fixa com scroll spy
- 🎯 Animações on-scroll usando Intersection Observer
- 📊 Contadores animados para estatísticas
- 📈 Barras de progresso animadas para habilidades
- 🎨 Efeitos parallax no hero section
- 📱 Menu mobile responsivo
- ⬆️ Botão scroll-to-top
- 📝 Formulário de contato com validação
- 🔄 Loading animation
- 🎭 Filtros de projetos por categoria

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica e acessível
- **CSS3** - Estilização moderna com:
  - CSS Variables para temas
  - Flexbox e Grid Layout
  - Animações e transições
  - Media queries para responsividade
- **JavaScript (ES6+)** - Interatividade com:
  - Classes e módulos
  - Intersection Observer API
  - Event delegation
  - Debounce e throttle para performance

## 📁 Estrutura do Projeto

```
portfolio-ismael/
│
├── index.html          # Estrutura HTML principal
├── styles.css          # Estilos CSS
├── script.js           # Funcionalidades JavaScript
├── images/             # Pasta para imagens
│   ├── profile-photo.jpg    # Foto de perfil
│   └── INSTRUCOES.txt       # Instruções para adicionar imagens
└── README.md           # Documentação
```

## 🚀 Como Usar

### Passo 1: Adicionar sua Foto
1. Salve sua foto de perfil na pasta `images/` com o nome `profile-photo.jpg`
2. Formato recomendado: JPG ou PNG, 800x800 pixels (quadrado)

### Passo 2: Abrir o Portfolio

#### Opção A: Abrir Localmente
1. Abra o arquivo `index.html` em seu navegador
2. Pronto! O portfolio está funcionando

#### Opção B: Servidor Local (Recomendado)
```bash
# Usando Python 3
python -m http.server 8000

# Usando Node.js (http-server)
npx http-server

# Usando PHP
php -S localhost:8000
```

Depois acesse: `http://localhost:8000`

## 🎨 Personalização

### Cores
Edite as variáveis CSS no arquivo `styles.css`:

```css
:root {
    --primary-color: #0066ff;
    --secondary-color: #00d4ff;
    --accent-color: #ff6b35;
    /* ... outras cores */
}
```

### Conteúdo
Edite o arquivo `index.html` para atualizar:
- Informações pessoais (linhas 46-52)
- Experiências profissionais (linhas 165-230)
- Habilidades e níveis (linhas 280-420)
- Projetos (linhas 470-650)
- Links de redes sociais (linhas 58-66)
- Informações de contato (linhas 700-750)

### Funcionalidades
Edite o arquivo `script.js` para:
- Adicionar/remover funcionalidades
- Ajustar animações
- Modificar comportamentos

## 📱 Responsividade

O portfolio é totalmente responsivo com breakpoints em:
- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px
- **Small Mobile**: < 480px

## ⚡ Performance

### Otimizações Implementadas
- Lazy loading de imagens
- Debounce e throttle em eventos de scroll
- CSS otimizado com variáveis
- JavaScript modular e eficiente
- Animações com GPU acceleration
- Preload de recursos críticos

### Métricas Esperadas
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Lighthouse Score**: > 90

## 🌐 Compatibilidade

### Navegadores Suportados
- ✅ Chrome (últimas 2 versões)
- ✅ Firefox (últimas 2 versões)
- ✅ Safari (últimas 2 versões)
- ✅ Edge (últimas 2 versões)
- ✅ Opera (últimas 2 versões)

### Recursos Modernos Utilizados
- CSS Grid e Flexbox
- CSS Variables
- Intersection Observer API
- ES6+ JavaScript
- Async/Await

## 🚀 Deploy

### GitHub Pages
1. Crie um repositório no GitHub
2. Faça upload dos arquivos
3. Vá em Settings > Pages
4. Selecione a branch main
5. Seu site estará disponível em: `https://seu-usuario.github.io/portfolio-ismael`

### Netlify
1. Arraste a pasta do projeto para [Netlify Drop](https://app.netlify.com/drop)
2. Seu site estará online em segundos!

### Vercel
```bash
npm i -g vercel
vercel
```

## 🔧 Melhorias Futuras

### Funcionalidades Planejadas
- [ ] Modo escuro/claro
- [ ] Internacionalização (PT/EN)
- [ ] Blog integrado
- [ ] Integração com CMS
- [ ] Analytics tracking
- [ ] SEO avançado
- [ ] PWA (Progressive Web App)
- [ ] Animações mais complexas com GSAP

### Integrações Possíveis
- [ ] Google Analytics 4
- [ ] Google Tag Manager
- [ ] EmailJS para formulário
- [ ] GitHub API para projetos
- [ ] LinkedIn API

## 📊 SEO

### Otimizações Implementadas
- Meta tags apropriadas
- Estrutura semântica HTML5
- Alt text em imagens
- URLs amigáveis
- Open Graph tags (pode ser adicionado)
- Schema.org markup (pode ser adicionado)

### Para Melhorar SEO
Adicione no `<head>` do HTML:

```html
<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://seu-site.com/">
<meta property="og:title" content="Ismael Fernandes Rojas - Engenheiro de Dados">
<meta property="og:description" content="Portfolio profissional de Ismael Fernandes Rojas">
<meta property="og:image" content="https://seu-site.com/images/profile-photo.jpg">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://seu-site.com/">
<meta property="twitter:title" content="Ismael Fernandes Rojas - Engenheiro de Dados">
<meta property="twitter:description" content="Portfolio profissional de Ismael Fernandes Rojas">
<meta property="twitter:image" content="https://seu-site.com/images/profile-photo.jpg">
```

## 🔒 Segurança

### Boas Práticas
- Validação de formulário client-side
- Sanitização de inputs
- HTTPS recomendado para produção
- Content Security Policy (pode ser adicionado)

## 📝 Licença

Este projeto é de código aberto e está disponível para uso pessoal e comercial.

## 👤 Autor

**Ismael Fernandes Rojas**
- Engenheiro de Dados @ IBM
- Especialista em Google Analytics
- LinkedIn: [linkedin.com/in/ismaelrojas](https://linkedin.com/in/ismaelrojas)
- GitHub: [github.com/ismaelrojas](https://github.com/ismaelrojas)
- Email: ismael.rojas@example.com

## 🤝 Contribuições

Sugestões e melhorias são bem-vindas! Sinta-se à vontade para:
1. Fazer um fork do projeto
2. Criar uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abrir um Pull Request

## 📞 Suporte

Para dúvidas ou suporte, entre em contato através:
- Email: ismael.rojas@example.com
- LinkedIn: [linkedin.com/in/ismaelrojas](https://linkedin.com/in/ismaelrojas)

## 🙏 Agradecimentos

- Font Awesome para os ícones
- Google Fonts para as tipografias
- Comunidade open source por inspiração e recursos

---

**Desenvolvido com ❤️ e ☕ por Ismael Fernandes Rojas**

*Última atualização: Abril 2026*