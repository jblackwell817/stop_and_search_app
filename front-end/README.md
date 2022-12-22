### Building the docker image
From the root of the front-end project, run:
```
docker build -t front-end:dev .
```

### Running the container
From the root of the front-end project, run:
```
docker run -it --rm -v %cd%:/app -v /app/node_modules -p 3001:3000 -e CHOKIDAR_USEPOLLING=true front-end:dev
```
The app will appear at port 3001. Note the above command applies to windows.