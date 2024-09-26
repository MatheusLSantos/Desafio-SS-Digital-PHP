# app/Dockerfile
FROM php:8.2-apache

# Instalar as bibliotecas necessárias para o PostgreSQL
RUN apt-get update && apt-get install -y \
    libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql

# Copia o código do app PHP para o container
COPY . /var/www/html

# Definir o DocumentRoot para o diretório 'public'
RUN sed -i 's|/var/www/html|/var/www/html/public|g' /etc/apache2/sites-available/000-default.conf

# Ajustar permissões para o diretório 'public'
RUN chmod -R 755 /var/www/html/public

# Habilitar o mod_rewrite para Laravel (necessário para rotas amigáveis)
RUN a2enmod rewrite

# Reiniciar o Apache
RUN service apache2 restart

# Define o diretório de trabalho como o root do Apache
WORKDIR /var/www/html

# Exponha a porta 80 (usada pelo Apache no container)
EXPOSE 80
