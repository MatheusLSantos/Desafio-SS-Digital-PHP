# Desafio-SS-Digital-PHP
Desafio proposto pela empresa SS Digital no qual consiste em duas aplicaçōes, uma utilizando React e outra HTML com bootstrap, ambas se comunicando com a mesma aplicação Back-end em Laravel

### 📋 Pré-requisitos

Será necessário ter instalado na sua máquina:

```
git
docker
docker compose

```

### 🔧 Instalação

Primeiro será necessário clonar o projeto git, para isso digite o seguinte comando:

```
git clone https://github.com/MatheusLSantos/Desafio-SS-Digital-PHP.git
```

Após clonar, acesse a pasta Desafio-SS-Digital-PHP:

```
cd Desafio-SS-Digital-PHP
```

Agora crie o arquivo de variáveis de ambiente .env, para isso apenas execute o comando:

```
make enviroment
```

O próximo passo é construir as imagens docker, para isso rode o seguinte comando:

```
docker compose build
```

 - Ou para versões mais antigas do Docker Compose:

```
docker-compose build
```

Para rodar os containers Docker, execute esse comando:

```
docker compose up -d
```

 - Ou para versões mais antigas do Docker Compose:
```
docker-compose up -d
```

Como os containers estão rodando, será preciso agora rodar as migrações do banco de dados, para isso execute o seguinte comando:

```
make migrate
```

Instalação concluída, o projeto estarará disponível nas seguintes portas:

 - API Laravel: http://localhost:8000
 - React: http://localhost:3000
 - Html/Bootstrap: http://localhost:8080

## ⚙️ Executando os testes

Para executar os testes utilize o seguinte comando:

```
docker compose exec app php artisan teste
```
