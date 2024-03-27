.PHONY: up
up:
	docker compose up

.PHONY: down
down:
	docker compose down

.PHONY: clean-down
clean-down:
	docker compose down -v --remove-orphans
	rm -rf dist

.PHONY: build
build:
	docker compose build ${BUILD_OPTION}

.PHONY: build-no-cache
build-no-cache:
	make build BUILD_OPTION='--no-cache'

.PHONY: format
format:
	$(COMMAND_PREFIX) yarn format

.PHONY: migrate
migrate:
	$(COMMAND_PREFIX) yarn prisma migrate dev

.PHONY: seed
seed:
	$(COMMAND_PREFIX) yarn db:seed-dev

.PHONY: reset-database
reset-database:
	$(COMMAND_PREFIX) yarn prisma migrate reset --force && $(COMMAND_PREFIX) yarn db:seed-dev

.PHONT: generate-openapi-interface
generate-openapi-interface:
	$(COMMAND_PREFIX) yarn swagger-typescript-api -p schema/HuLink.yml -o src/api -n api-interface.ts --no-client --route-types

docker-format: _docker-format
docker-migrate: _docker-migrate
docker-seed: _docker-seed
docker-reset-database: _docker-reset-database
docker-generate-openapi-interface: _docker-generate-openapi-interface
_docker-%:
	make $* COMMAND_PREFIX='docker compose exec app'