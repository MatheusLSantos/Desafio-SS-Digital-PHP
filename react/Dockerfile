# Usando uma imagem base do Node
FROM node:14

# Definindo o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiando o package.json e package-lock.json para o contêiner
COPY package*.json ./

# Instalando as dependências do projeto
RUN npm install
RUN npm install react-router-dom

# Copiando o restante do código para o contêiner
COPY . .

# Expondo a porta que o React usará
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "start"]
