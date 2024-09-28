# app/Dockerfile
FROM php:8.2-apache

# Instalar as bibliotecas necessárias para o PostgreSQL
RUN apt-get update && apt-get install -y \
    libpq-dev \
    unzip \
    git \
    && docker-php-ext-install pdo pdo_pgsql

# Instalar o Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copia o código do app PHP para o container
COPY . /var/www/html

# Definir o DocumentRoot para o diretório 'public'
RUN sed -i 's|/var/www/html|/var/www/html/public|g' /etc/apache2/sites-available/000-default.conf

# Ajustar permissões para o diretório 'public'
RUN chmod -R 755 /var/www/html/public

# Habilitar o mod_rewrite para Laravel (necessário para rotas amigáveis)
RUN a2enmod rewrite

# Define o diretório de trabalho como o root do Apache
WORKDIR /var/www/html

# Certifique-se de que o arquivo .env está presente, se não, crie um padrão
RUN cp .env.example .env

# Instalar as dependências do Laravel com o Composer
RUN composer install --no-dev --optimize-autoloader

# Criar diretórios storage e bootstrap/cache, ajustar permissões
RUN mkdir -p bootstrap/cache storage \
    && chmod -R 775 storage bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache

# Gerar a chave do aplicativo Laravel
RUN php artisan key:generate

# Exponha a porta 80 (usada pelo Apache no container)
EXPOSE 80

# Comando de entrada
CMD ["apache2-foreground"]