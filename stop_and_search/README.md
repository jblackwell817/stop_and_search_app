### Building the docker image
From the root of the back-end project, run:
```
docker build . -t stop_and_search_app
```

### Running the container
From the root of the back-end project, run:
```
docker run -p 8000:8000 stop_and_search_app
```
The app will appear at port 8000. Note the above command applies to windows.