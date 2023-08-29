<h1 align="center">
  Simulador de Urna Eletrônica 🗳️
</h1>

<div align="center">
   <a href="https://github.com/JohnPetros">
      <img alt="Made by JohnPetros" src="https://img.shields.io/badge/made%20by-JohnPetros-blueviolet">
   </a>
   <img alt="GitHub Language Count" src="https://img.shields.io/github/languages/count/JohnPetros/urna-eletronica">
   <a href="https://github.com/JohnPetros/urna-eletronica/commits/main">
      <img alt="GitHub Last Commit" src="https://img.shields.io/github/last-commit/JohnPetros/urna-eletronica">
   </a>
  </a>
   </a>
   <a href="https://github.com/JohnPetros/urna-eletronica/blob/main/LICENSE.md">
      <img alt="GitHub License" src="https://img.shields.io/github/license/JohnPetros/urna-eletronica">
   </a>
    <img alt="Stargazers" src="https://img.shields.io/github/stars/JohnPetros/urna-eletronica?style=social">
</div>
<br>

<p align="center">
 <a href="##-🖥️-sobre-o-projeto">Sobre o Projeto</a> |
 <a href="##-⏹️-demonstração">Demonstração</a> | 
 <a href="##-✨-funcionalidades">Funcionalidades</a> | 
 <a href="##-♿-práticas-de-acessibilidade-aplicadas">Práticas de acessibilidade aplicadas</a> | 
 <a href="##-⚙️-deploy">Deploy</a> | 
 <a href="##-🛠️-tecnologias">Tecnologias</a> | 
 <a href="##-🚀-como-rodar-a-aplicação">Como  rodar a aplicação?</a> | 
 <a href="##-💪-como-contribuir">Como contribuir</a> | 
 <a href="##-🎨-layout">Layout</a> | 
 <a href="##-📝-license">Licença</a>
</p>

## 🖥️ Sobre o Projeto

Essa é uma aplicação que visa simular o processo de votar em uma urna eletrônica, em que usuário deve votar em candidatos para 5 cargos diferentes: Deputado Federal, Estadual, Senador, Governador e Presidente.

O objetivo para a construção do projeto foi estudar e aplicar o conceito de acessibilidade nas aplicações web com base na documentação da [ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/) da [W3C](https://www.w3c.br/)

Este projeto foi inspirado no [simulador de urna eletrônica oficial](https://www.tse.jus.br/hotsites/simulador-de-votacao/) do [Tribunal Superior Eleitoral (TSE)](https://www.tse.jus.br/) 


### ⏹️ Demonstração

<table align="center">
  <tr>
    <td align="center" width="700">
    <span>Página da Urna funcionando<br/></span>
    <img alt="Home page" src=".github/urna-eletronica-funcionando.gif" alt="Demonstração da urna funcionando" />
    </td>
  </tr>
</table>

---

## ✨ Funcionalidades

- [x] Verificar se o usuário tem a idade necessária para prosseguir para a etapa de votação
- [x] Exibir os candidatos disponíveis de acordo com o atual cargo que está sendo votado
- [x] Exibir corretamente os dados do candidato caso o usuário insira seu número de voto na urna
- [x] Sugerir voto nulo caso o usuário insira um número de um candidato que não existe
- [x] Permitir voto em branco
- [x] Permitir apagar o último dígito inserido pelo usuário
- [x] Bloquear o usuário de votar em branco caso ele já tenha inserido pelo menos um dígito 
- [x] Exibir os dados acerca dos suplementes de um candidato caso ele tenha
- [x] Permitir o usuário de votar em um candidato somente quando ele inserir todos os dígitos do candidato corretamente
- [x] Exibir após o processo de votação todos os candidatos que foram votados pelo usuário 
- [x] Indicar os votos em branco/nulo de um cargo específico em caso de ocorrência
- [x] Consumir dados de candidatos de uma [API fake](https://github.com/JohnPetros/urna-eletronica-api)
- [x] Processo de autenticação simples usando `localstorage` 

---

## ♿ Práticas de acessibilidade aplicadas
- HTML semântico
- Navegação por `tab`
- Fechar modal ou um conteúdo expansível, como um menu lateral, usando a tecla `esc` ou clicando fora dele
- Ao fechar um modal devolver o focus para o botão que foi usado para abri-lo
- Permitir focar elementos como modal, lista de tabs r outros elementos que possuem posição absoluta usando a tecla `tab` 
- Navegar por uma lista tabs usando as teclas de `seta` em vez de `tab` 
- Definir a orientação de uma lista de tabs corretemente (se é vertical ou horinzontal)
- Focar o útimo tab usando a tecla `End` ou o primeiro usando a tecla `Home`
- Inserir `aria-label` em botões que não indicam claramente para que servem considerando apenas o conteúdo, Ex.: Um botão para fechar um tab tendo apenas um `x` como conteúdo
- Deifinir `aria-controls` em elementos que permitem alterar o estado de outro elemento
- Definir `aria-exapanded` de elementos que controlam o estado de outro elemento como `true` caso o elemento associado a este esteja expandido (exemplo: menu lateral) ou `false` quando recolhido 
- Avisar o leitor de tela que o conteúdo de um elemento foi atualizado usando o atributo `aria-live`
- Usar a propriedade `visibility` ou o atributo `hidden` para omitir elementos do leitor de tela 
- Definir o `role` como `alert` de elementos que servem como messagens de erro
- Definir atributo `alt` em todas as imagens 
- Layout responsivo


## 🛠️ Tecnologias

Este projeto foi desenvolvido usando as seguintes tecnologias:

✔️ **[ReactJs](https://react.dev/)**

✔️ **[Next.js](https://nextjs.org/)**

✔️ **[TypeScript](https://www.typescriptlang.org/)**

✔️ **[Framer Motion](https://www.framer.com/motion/)**

✔️ **[TailwindCSS](https://tailwindcss.com/)**

✔️ **[RadixUi](https://www.radix-ui.com/)**

✔️ **[Lottie](https://lottiefiles.com/)**

✔️ **[JSON Server](https://github.com/typicode/json-server)**

> Para mais detalhes acerca das dependências do projeto veja o arquivo [package.json](https://github.com/JohnPetros/urna-eletronica/blob/main/package.json)

---

## 🚀 Como  rodar a aplicação?

### 🔧 Pré-requisitos

Antes de baixar o projeto você vai precisar ter instalado na sua máquina as seguintes ferramentas:

- [Git](https://git-scm.com/)
- [NodeJS](https://nodejs.org/en)
- [Yarn](https://yarnpkg.com/) ou [NPM](https://www.npmjs.com/)

> Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

#### 📟 Rodando a aplicação

```bash

# Clone este repositório
$ git clone https://github.com/JohnPetros/urna-eletronica.git

# Acesse a pasta do projeto
$ cd urna-eletronica

# Instale as dependências
$ npm install or yarn add

# Execute a aplicação em modo de desenvolvimenro
$ npm run dev or yarn dev

# Provavelmente a aplicação estará rodando na porta 3000, então acesse http://localhost:3000

```

---

## ⚙️ Deploy

O deploy dessa aplicação foi realizada usando a plataforma da **[Vercel](https://vercel.com/home)**, o que implica dizer que você pode acessar aplicação funcionando acessando **[link](https://urna-eletronica-john-petros.vercel.app/)**.

---

## 💪 Como contribuir

```bash

# Fork este repositório
$ git clone https://github.com/JohnPetros/urna-eletronica.git

# Cria uma branch com a sua feature
$ git checkout -b minha-feature

# Commit suas mudanças:
$ git commit -m 'feat: Minha feature'

# Push sua branch:
$ git push origin minha-feature

```
> Você deve substituir 'minha-feature' pelo nome da feature que você está adicionando

> Você também pode abrir um [nova issue](https://github.com/JohnPetros/urna-eletronica/issues) a respeito de algum problema, dúvida ou sugestão para o projeto. Ficarei feliz em poder ajudar, assim como melhorar este projeto

---

## 📝 Licença

Esta aplicação está sob licença do MIT. Consulte o [Arquivo de licença](LICENSE) para obter mais detalhes sobre.

---

## 🎨 Layout
O design do projeto é inpirado no [simulador de urna eletrônica oficial](https://www.tse.jus.br/hotsites/simulador-de-votacao/) do [Tribunal Superior Eleitoral (TSE)](https://www.tse.jus.br/) 

---

<p align="center">
   Feito 💜 by John Petros 👋🏻
</p>
