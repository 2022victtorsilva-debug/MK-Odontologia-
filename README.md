# MK-Odontologia-

Site institucional da MK Odontologia Integrada, em Vitória da Conquista — BA.

## Desenvolvimento

React, TypeScript, Vite e Tailwind CSS. Node.js 22 ou superior.

```sh
npm install
npm run dev
npm run lint
npm run build
```

## Conteúdo

As informações da clínica estão centralizadas em `src/config/siteConfig.ts`:

- Contatos, endereço e horários permanecem vazios até a confirmação da clínica.
- WhatsApp deve receber uma URL completa, como `https://wa.me/55...`. Enquanto vazio, os botões abrem orientações de atendimento presencial, sem realizar agendamento ou transmitir dados.
- Apenas Implantodontia e Ortodontia estão publicadas. Novas especialidades seguem a interface `Specialty`, incluindo `confirmed` para controle editorial interno.
- Os campos de nome, CRO, formação e descrição da equipe aguardam dados confirmados.
- Avaliações só aparecem se houver registros reais em `reviews`, com fonte e URL.
- Não há formulário, mapa embutido, rastreamento ou backend.

## Imagens e fontes

As seis fotografias fornecidas são utilizadas localmente em WebP, em resolução original e 480 px. As pessoas e os ambientes não foram alterados. Os tratamentos e cortes são feitos apenas no layout. Fontes DM Sans e Cormorant Garamond hospedadas localmente; licenças em `public/fonts/`.

## Publicação

Repositório original: `2022victtorsilva-debug/MK-Odontologia-`. Branch principal: `main`.

O workflow `.github/workflows/pages.yml` instala as dependências, verifica o código, gera `dist` e publica no GitHub Pages. A origem do Pages deve ser **GitHub Actions**, em **Settings → Pages → Build and deployment**.

O `base` do Vite é `/MK-Odontologia-/`, correspondente ao slug real. URL de destino: https://2022victtorsilva-debug.github.io/MK-Odontologia-/

`noindex, nofollow` e `robots.txt` impedem a indexação nesta etapa. Não há dados estruturados afirmando oficialidade. Altere essa configuração apenas após aprovação da clínica.

## Acessibilidade e revisão

HTML semântico, link para pular navegação, foco visível, modais com foco confinado, Escape, retorno do foco e bloqueio da rolagem de fundo. Animações respeitam `prefers-reduced-motion`. A galeria móvel tem rolagem por toque e botões de navegação.

Os painéis das especialidades têm fotografia lateral no desktop e rolagem interna no celular. Os controles Anterior e Próxima permitem trocar de especialidade sem fechar o painel.

Todas as fotos de Nosso espaço abrem um lightbox com proporção preservada. A navegação funciona com botões, teclas direcionais e gesto horizontal no celular. Clique fora da foto, Escape e botão de fechar encerram a visualização e devolvem o foco à fotografia de origem.

A imagem de compartilhamento `public/images/mk-compartilhamento.jpg` tem 1200 × 630 px e usa a fotografia real da equipe. O Open Graph aponta para a URL prevista do GitHub Pages; a prévia nos aplicativos de mensagens só ficará disponível após a publicação.

A composição original está em `src/styles.css`. Os ajustes visuais desta revisão estão em `src/refinements.css`, e os componentes acessíveis de modal, especialidade e lightbox estão em `src/components/`.

Revisar nas larguras 320, 360, 390, 430, 768, 1024, 1440 e 1920 px após qualquer alteração importante. Validar a versão publicada e os caminhos das imagens, fontes, CSS e JavaScript.
