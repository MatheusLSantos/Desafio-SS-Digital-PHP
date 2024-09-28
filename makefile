enviroment:
	cp app/.env.example app/.env

migrate:
	docker compose exec app php artisan migrate