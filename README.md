# vega
A sample vehicle dealer app built with Angular 4, ASP.NET Core and Entity Framework Core.<br />
:warning:**_I am not a UX/UI designer, so the main focus of this app is on functionality._**

# How to run the project:
```
$ npm install
$ dotnet restore
$ dotnet user-secrets set ConnectionStrings:Default "<YOUR CONNECTION STRING>"
$ webpack --config webpack.config.vendor.js
$ webpack 
$ dotnet ef database update
$ dotnet watch run 
```

# What was used:
**APS.NET Core** 2.0 <br />
**Entity Framework Core** 2.0 <br />
**TypeScript** 2.6.1 <br />
**Angular** 4 <br />

[**AutoMapper**](http://automapper.org/) for mapping <br />
[**toasty**](https://www.npmjs.com/package/ng2-toasty) for growl-style alerts and messages <br />
[**chart.js**](http://www.chartjs.org/) for creating charts <br />
[**raven.js**](https://www.npmjs.com/package/raven-js) - automatically reports uncaught JavaScript exceptions triggered from a browser and sends them to [Sentry](https://sentry.io) <br />
