# [http://development.pokemon.divshot.io/](http://development.pokemon.divshot.io/)

Take control of your pokemon's history  with a web app for users.
App created to learn angular.

## Usage

Install the required tools: `gulp`, `bower`
```
npm install -g gulp bower
```
```
npm install -g gulp gulp
```

Install dependencies: `npm`, `bower`
```
npm install 
```
```
bower install 
```

## Run the App
```
gulp serve 
```

## Upload to Divshot

[http://docs.divshot.com/guides/getting-started](http://docs.divshot.com/guides/getting-started)

After installing divshot cli you can run the build:
```
gulp build
```
and then run
```
divshot push
```

### Use Gulp tasks

* `gulp` or `gulp build` to build an optimized version of your application in `/dist`
* `gulp serve` to launch a browser sync server on your source files
* `gulp serve:dist` to launch a server on your optimized application
* `gulp wiredep` to fill bower dependencies in your `.html` file(s)
* `gulp injectjs` to fill angular modulos in your `.html` file(s)


### Directory structure
[Best Practice Recommendations for Angular App Structure](https://docs.google.com/document/d/1XXMvReO8-Awi1EZXAXS4PzDzdNvV6pGcuaF4Q9821Es/pub)

### 0.0.1
* Layout with bootstrap.
* Authentification with Parse.com
* Login, Register, Recover Passwor, Email Confirmation 
* Save forms from angular
* Use of directives, services and filters
* Nice Alerts with sweetalert
* Sidebar Navigation
* Svg Animation

