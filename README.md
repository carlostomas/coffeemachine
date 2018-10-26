# Corner Coffe Marketplace
## Test backend
### 1. Run tests
###
#### Install dependencies
After clone the project, install the package dependencies.
```bash
$ npm install -D
```
#### Configure service
This service uses MongoDB as a docker image. Check the config.js file to set up according the local ip or your host name.
```bash
db: {
        uri: 'mongodb://localhost:27017',
        dbName: 'mydb'
    }
```
#### Persistent data
A directory with user permissions must be created to store the data.
```bash
$ mkdir /data
$ cd /data
$ mkdir db
```
#### Run MongoDB docker image
```bash
$ docker run -dit -p 27017:27017 --name mongo -v /data/db/:/data/db/mongo mongo
```

#### Install test suite
Jasmine is the test framework used at this project.
```bash
$ npm install -g jasmine
```

#### Run spec and spec tests
At the project root, the spec test.
```bash
$ jasmime
```
And the integration tests.
```bash
$ jasmine spec/coffeeMachine_Integ.js
```

### 2. Installation
#### Check the bridge network
We need to know the ip of the MongoDB service at the default network of the Docker service.
```bash
$ docker inspect bridge
```
We found it at the containers section
```bash
"c33ee4279f99341f22776cbe302fde438fbb942501b0dc9ad8f59e2587b51ef9": {
                "Name": "mongo",
                "EndpointID": "51d6a208813303c623c442e56e5032c14a900f4b8f0ef3d0e3a3d2886f0f81de",
                "MacAddress": "02:42:ac:11:00:02",
                "IPv4Address": "172.17.0.2/16",
```
#### Configure service
Check the config.js file to set up according the ip environment of the default bridge network of the Docker service.
```bash
db: {
        uri: 'mongodb://172.17.0.2:27017',
        dbName: 'mydb'
    }
```
#### Create docker image
To create the docker image of this service, run the following script at the root project:
```bash
$ sh scripts/create_docker_image.sh
```

### 3. Run service
Once we have the service image created, run the images of MongoDB and this service:
And finally, run the service image:
```bash
$ docker run -dit -p 3000:3000 --name coffee cornerjob/coffee
```
 You can check the service with a http request:
```bash
$ curl http://localhost:3000/test
```

### 4. Create default user
A default user must be created to be able to log in.
Exec a shell in to the coffee docker image.
```bash
$ docker exec -it coffee /bin/bash
```

and exec the script
```bash
/usr/src/app# npm run defaultUser
```
Now you are able to login with user admin with password admin

### 5. Use it
You can found a swagger.yaml file with the endpoint declaration.

### 6. Logs
You can check the service logs with the docker image logs.

```bash
$ docker logs coffee
```
