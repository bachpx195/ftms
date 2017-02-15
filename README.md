# ftms
Framgia Training Management System

# Set up
Run command below step by step

1 Install ruby gem and npm package
```
$ bundle && npm i
```
2 Migrate database
```
$ rails db:migrate
```
3 Create master data
```
$ rails db:create_master_data
```
4 Build webpack file. This command will build a file whenver you update a jsx file in client folder.
```
$ rails run:npm
```
5 Open new terminal and run command
```
rails server
```

