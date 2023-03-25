# About this file

This project is the term paper for the module "Web Technologies 2022/23" in the form of a multi-page application. This README contains information about:

- the installation,
- the functions of TexCareFinder: What can you do with this app?
- the product goal behind TexCareFinder: Why this app?
- the technical background and components of TexCareFinder

# Installation

To start the project in the terminal go to the project folder "frontend_TexCareFinder" and there install 

    `npm install`

This will install all necessary dependencies. Afterwards please run

	`ng serve` 

to start the frontend and open it in the browser under localhost:4200.


Now open another terminal window and change to the folder "backend_TexCareFinder" and run
    
    `npm run watch` 

to start the backend.


# What can you do with TexCare Finder?

The app has three sections:
1) Home: information about what you can do.
![TexCare Finder Screenshot](https://github.com/AntheaMeier/frontend_TexCareFinder/raw/main/assets/SC_home.png)
2) All: Here you can get an overview of all your database entries, delete them or switch to edit mode by going to the details page where you can update a specific database entry.
3) New: Here you can use a form to create a new database entry.


# Why this app?
Database entries that you can manage with this app are care instruction infos of textiles. This way you can remove labels from your clothes to prevent skin irritation and safely store all the information you need and prevent it from being washed out.


# Technical background and CRUD functionalities

This project was generated with [Angular CLI](https://github.com/angular/angular-cli). While its backend was build using Node.js and its used database is based on a MongoDB cluster.
The app is implemented based on the following CRUD functionalities:
- a component to create and store a database entry ("New"),
- a component to display all database entries and a component to delete each entry ("All"),
- a component to change a database entry (/detail)
