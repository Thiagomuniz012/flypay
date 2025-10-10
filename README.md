# 💰 FizPay - Aplicativo de Pagamentos

<div align="center">
  <img src="./assets/logo-fizpay.png" alt="FizPay Logo" width="200"/>
  
  Um aplicativo moderno de pagamentos e gerenciamento financeiro desenvolvido com React Native e Expo.

  [![Download APK](https://img.shields.io/badge/Download-APK-success?style=for-the-badge&logo=android)](https://github.com/Thiagomuniz012/fizpay/releases/download/release/Fizpay.apk)
</div>

---

## 📱 Download

Baixe a versão Android do aplicativo:

**[⬇️ Download FizPay APK](https://github.com/Thiagomuniz012/fizpay/releases/download/release/Fizpay.apk)**

---

## 🚀 Tecnologias Utilizadas

- **React Native** - Framework para desenvolvimento mobile multiplataforma
- **Expo** - Plataforma para desenvolvimento e build de apps React Native
- **TypeScript** - Superset JavaScript com tipagem estática
- **NativeWind** - Tailwind CSS para React Native
- **Expo Router** - Sistema de roteamento baseado em arquivos
- **SQLite** - Banco de dados local
- **AsyncStorage** - Armazenamento de dados persistente
- **React Native Reanimated** - Animações fluidas e performáticas

---

## 🏗️ Arquitetura e Recursos

### 📂 Dynamic Routes (Expo Router)

O projeto utiliza o **Expo Router** para navegação baseada em arquivos. A estrutura de pastas dentro de `/app` define automaticamente as rotas da aplicação:

```
app/
├── (tabs)/          # Rotas com tab navigation
│   ├── home.tsx     # Tela inicial
│   ├── extract.tsx  # Extrato
│   ├── cashback.tsx # Cashback
│   └── profile.tsx  # Perfil
├── login.tsx        # Tela de login
├── onboarding.tsx   # Onboarding
└── index.tsx        # Rota inicial
```

**Vantagens:**
- Navegação intuitiva e declarativa
- Menor código boilerplate
- Deep linking automático
- Type-safe navigation

### 🗄️ SQLite Database

O **Expo SQLite** é usado para armazenar dados localmente de forma estruturada e performática:

**Uso no projeto:**
- Armazenamento de dados de usuários
- Histórico de transações
- Cache de informações offline
- Dados sensíveis criptografados

**Exemplo de uso:**
```typescript
import * as SQLite from 'expo-sqlite';

const db = await SQLite.openDatabaseAsync('fizpay.db');
await db.execAsync(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE
  );
`);
```

### 💾 AsyncStorage

O **AsyncStorage** é utilizado para gerenciamento de sessão e preferências do usuário:

**Casos de uso:**
- Token de autenticação
- Sessão do usuário logado
- Preferências e configurações
- Estado de onboarding

**Exemplo de uso:**
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Salvar sessão
await AsyncStorage.setItem('userSession', JSON.stringify(userData));

// Recuperar sessão
const session = await AsyncStorage.getItem('userSession');
```

---

## 🛠️ Como Rodar o Projeto

### Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- **Expo CLI**: `npm install -g expo-cli`
- **Android Studio** (para emulador Android) ou dispositivo físico
- **Xcode** (para iOS, apenas macOS)

### Instalação

1. **Clone o repositório:**

```bash
git clone https://github.com/Thiagomuniz012/fizpay.git
cd fizpay
```

2. **Instale as dependências:**

```bash
npm install
# ou
yarn install
```

3. **Inicie o servidor de desenvolvimento:**

```bash
npm start
# ou
yarn start
```

### Executar no Android

**Opção 1: Usando dispositivo físico**
```bash
npm run android
```

**Opção 2: Usando Expo Go**
1. Instale o app **Expo Go** na Play Store
2. Escaneie o QR code exibido no terminal
3. O app será carregado automaticamente

**Opção 3: Usando emulador**
1. Abra o Android Studio e inicie um emulador
2. Execute: `npm run android`

### Executar no iOS (apenas macOS)

```bash
npm run ios
```

### Executar na Web

```bash
npm run web
```

---

## 📦 Build de Produção

### Build Android (APK)

1. **Configure o projeto:**

```bash
npm run prebuild
```

2. **Build de desenvolvimento:**

```bash
cd android
./gradlew assembleRelease
```

3. **O APK estará em:**
```
android/app/build/outputs/apk/release/app-release.apk
```

### Build com EAS (Expo Application Services)

```bash
npm install -g eas-cli
eas login
eas build --platform android
```

---

## 📁 Estrutura do Projeto

```
fizpay/
├── app/                    # Rotas da aplicação (Expo Router)
│   ├── (tabs)/            # Rotas com navegação em abas
│   ├── _layout.tsx        # Layout raiz
│   └── index.tsx          # Página inicial
├── src/
│   ├── components/        # Componentes reutilizáveis
│   ├── hooks/             # Custom hooks
│   └── models/            # Modelos de dados
├── contexts/              # Context API (AuthContext)
├── services/              # Serviços (storage, API)
├── assets/                # Imagens, fontes, etc.
├── android/               # Código nativo Android
└── app.json              # Configuração do Expo
```

---

## 🎨 Scripts Disponíveis

```bash
# Desenvolvimento
npm start           # Inicia o servidor Expo
npm run android     # Roda no Android
npm run ios         # Roda no iOS
npm run web         # Roda na web

# Build
npm run prebuild    # Prepara arquivos nativos

# Código
npm run lint        # Verifica o código
npm run format      # Formata o código
```

---

## 🔐 Segurança

- Senhas são criptografadas antes de serem armazenadas
- Tokens de sessão são gerenciados com AsyncStorage
- Dados sensíveis no SQLite podem ser criptografados
- Validação de CPF e campos de entrada

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

---

## 👤 Autor

**Thiago Muniz**

- GitHub: [@Thiagomuniz012](https://github.com/Thiagomuniz012)

---

## 📞 Suporte

Se encontrar algum problema ou tiver sugestões, abra uma [issue](https://github.com/Thiagomuniz012/fizpay/issues).

---

<div align="center">
  Feito com ❤️ por Thiago Muniz
</div>

