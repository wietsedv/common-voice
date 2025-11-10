# Praoten / Proaten / Praotn / Proatn

De praoten applicatie draait in vier Docker containers met Docker Compose. Met `docker ps` kun je zien dat de volgende services draaien:

- `web`
- `db`
- `storage`
- `redis`

De services kunnen worden gestart met `docker compose up -d`. Dit kan ook helpen als een van de vier services is gestopt.

## Updates

De live applicatie komt overeen met de `production` branch op https://github.com/wietsedv/common-voice. Om updates uit te voeren moet je het volgende doen:

```bash
git pull
docker compose restart
```

Updaten kan een paar minuten duren. Je kunt de logs van `web` volgen om te checken wat de progressie is:

```bash
docker logs -f web
```

De laatste stap is `APPLICATION -- Maintenance complete`.

## Belangrijke bestanden

- Applicatie: `/home/martijnwieling/common-voice`
- Database: `/home/martijnwieling/common-voice/data/mysql`
- Audio bestanden: `/mnt/blockstorage/praoten/storage`