# Base image
FROM node:20-alpine

# Diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos de configuração e dependências
COPY package.json package-lock.json ./

# Instalar dependências
RUN npm install

# Copiar todo o código para o container
COPY . .

# Construir o projeto Next.js
RUN npm run build

# Porta exposta pelo Next.js
EXPOSE 3000

# Comando para rodar o servidor Next.js em produção
CMD ["npm", "run", "start"]
