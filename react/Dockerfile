# react/Dockerfile
FROM node:18

# Define o diretório de trabalho no container
WORKDIR /app

# Copia os arquivos de configuração do package.json e package-lock.json
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante do código da aplicação para o container
COPY . .

# Exponha a porta 3000 (usada pelo React)
EXPOSE 3000

# Comando para rodar a aplicação React
CMD ["npm", "start"]
