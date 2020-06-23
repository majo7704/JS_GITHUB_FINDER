# JS_GITHUB_FINDER
By fetching data from Github API (https://developer.github.com/v3/repos/) I've created a web application on which after entering such a code: repos data-user="devballteam" data-update="2019-05-01" 
it will be replaced by an element div with information regarding repositories of the given user in attribute data-user updated after the date provided in attribute data-update. 
The application allows to exchange more than one type of this repos. The tag div includes:

name of the user
table with repositories with specific columns:
name of the repository
description of the repository
date of the last update
Url to the repository

Technologies used: HTML5, CSS3, Sass(scss), JavaScript, ES6, JSdoc, git, Github API


npm run watch-css (use nodemon to watch fro changes in scss and automaticaly process them to css)
