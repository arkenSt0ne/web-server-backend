# Typescript RESTful Server Backend 

The main purpose of this repository is to show a working Node.js API Server  and workflow for writing Node code in TypeScript.

It is not a goal to be a comprehensive and definitive guide to making a TypeScript and Node project, but as a working reference maintained by the community. If you are interested in starting a new TypeScript project - check out the bootstrapping tools reference in [the TypeScript Website](https://www.typescriptlang.org/docs/home.html)
# Table of contents:

- [Pre-reqs](#pre-reqs)
- [Getting started](#getting-started)

# Pre-reqs
To build and run this app locally you will need a few things:
- Install [Node.js](https://nodejs.org/en/)
- Install [Sequelize](https://sequelize.org/master/manual/getting-started.html)
- Install [VS Code](https://code.visualstudio.com/)

# Getting started
- Clone the repository
```
git clone --depth=1 https://github.com/arkenSt0ne/web-server-backend.git <project-name>
```
- Install dependencies
```
cd <project_name>
npm install
```
- To run the project in localhost
```
npm run localhost
```
<!-- Or, if you're using VS Code, you can use `cmd + shift + b` to run the default build task (which is mapped to `npm run build`), and then you can use the command palette (`cmd + shift + p`) and select `Tasks: Run Task` > `npm: start` to run `npm start` for you. -->

> **Note on editors!** - TypeScript has great support in [every editor](http://www.typescriptlang.org/index.html#download-links), but this project has been pre-configured for use with [VS Code](https://code.visualstudio.com/).
Throughout the README We will try to call out specific places where VS Code really shines or where this project has been set up to take advantage of specific features.

Finally, navigate to `http://localhost:8080` and you should see the template being served and rendered locally!
