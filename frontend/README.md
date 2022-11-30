# OOSE-Project-Frontend

Frontend for a management application, developed during project period in my second school year of the HAN. 

## Containers

Het productie Docker Compose bestand bestaat uit 4 containers:

- Database;
- Backend;
- PHPMyAdmin;
- Frontend;

## Database

Voor het opspinnen van de database kan de volgende commando worden gebruikt: 

```docker exec lamport-database-1 sh /var/database.init/dbsetup.sh```

De database is vervolgens te benaderen op poort 3306.

## Backend

De backend start op na dat de database is opgestart. Dit gebeurt d.m.v. een java container, de backend is te benaderen op poort 8080.

## PHPMyAdmin

PHPMyAdmin fungeert als beheersysteem voor de database, deze container is echter niet nodig voor het draaien van de applicatie, en kan daarom ook verwijderd worden als dit nodig is.

PHPMyAdmin is te benaderen op poort 8081.

## Frontend

De frontend start op na dat de backend is opgestart. De frontend bestaat uit een nginx container, die de productiebuild van de React code draait.

De frontend is te benaderen op poort 80.

## Docker Compose

Om de containers te starten, wordt gebruik gemaakt van de commando `docker compose build` en vervolgens `docker compose up`.

Door het build commando te gebruiken worden zowel de backend als frontend docker files gebuild.
