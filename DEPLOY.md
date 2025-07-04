# Deployment

```bash
cd common-voice
docker compose down
git pull
docker compose -f docker-compose-production.yaml up -d
```
