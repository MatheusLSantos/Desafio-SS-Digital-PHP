# web/Dockerfile
FROM nginx:alpine

# Copia os arquivos HTML e Bootstrap para o diretório do Nginx
COPY . /usr/share/nginx/html

# Exponha a porta 80 (usada pelo Nginx no container)
EXPOSE 80

# O Nginx já inicia por padrão ao rodar o container
