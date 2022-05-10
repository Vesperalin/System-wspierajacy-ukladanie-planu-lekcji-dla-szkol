## First launch (if no db schema needed, then skip steps 5,9)
1. Run docker
2. Go to docker folder location 
3. Run command 
```sh
docker-compose up
```
4. If everything is ok, then open new cmd and copy ID of your container
```sh
docker ps
```
5. Copy the SQL file into the Docker container
```sh
docker cp create-db.sql [CONTAINER ID]:/create-db.sql
```
6. Go to the shell of your container
```sh
docker exec -it [CONTAINER ID] /bin/bash
```
7. Log in to mysql server
```sh
mysql -u root -p
password
```
8. Show existing databases
```sh
show databases;
```
9. Run the SQL file
```sh
source create-db.sql
```
10. Done, now you can move into database school-plan and run your queries

## How to work with docker container
While working on project, all you have to do is simply run docker and run docker container
```sh
docker-compose up
```
After finishing your work, close the container in another cmd tab:
```sh
docker-compose down
```
You can see running containers:
```sh
docker ps
```

# Database 
Connection to database (if you want to connect using Workbench):
127.0.0.1:3306
Username: root
Password: password

That's all I know. Don't judge me. :(