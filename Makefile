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

docker-format: _docker-format
_docker-%:
	make $* COMMAND_PREFIX='docker compose exec app'