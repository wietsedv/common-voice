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


## Leaderboard

### meest actieve sprekers

```sql
SELECT 
            locales.native_name as variant,
            email,
            username as gebruikersnaam,
            COUNT(clips.id) AS opnames,
            ROUND(SUM(clips.duration) / 60000, 1) as minuten
      FROM user_clients
      LEFT JOIN clips ON user_clients.client_id = clips.client_id AND clips.locale_id = 4
      JOIN locales ON clips.locale_id = locales.id
      GROUP BY user_clients.client_id
        HAVING opnames > 0 AND email IS NOT NULL
      ORDER BY opnames DESC
      LIMIT 3;
```

### meest actieve beoordelaars

```sql
SELECT 
            locales.native_name as variant,
            email,
            username as gebruikersnaam,
            COUNT(votes.id) AS beoordelingen
      FROM user_clients
      LEFT JOIN votes ON user_clients.client_id = votes.client_id
      LEFT JOIN clips ON votes.clip_id = clips.id AND clips.locale_id = 19
      JOIN locales ON clips.locale_id = locales.id
      WHERE votes.created_at >= CURDATE() - INTERVAL 30 DAY
      GROUP BY user_clients.client_id
        HAVING beoordelingen > 0 AND email IS NOT NULL
      ORDER BY beoordelingen DESC
      LIMIT 3;
```