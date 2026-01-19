# Полный сброс контейнера 
docker compose -f docker-compose.dev.yml down -v
docker volume prune -f
docker compose -f docker-compose.dev.yml up --build

# Поднять контейнер 
docker compose -f docker-compose.dev.yml up
