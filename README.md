# **Blog post App**

**NodeJS, Express, React, Redux toolkit, Typescript, Postgresql, Docker, Unit testing(JEST) and End to End testing(Cypress)**

User can **Sign up**, **Sign in**, **Sign out**<br>

There are three type of users **admin, author and general user**

**Admin user** can edit, like and comment the blogs.

**Author user** can create blog and edit own blog and cannot like or comment to own blog.
<br>

**General user** can read, like and comment the blog.

<br>
<br>

# **After cloning**

run **npm install** on both server and client
<br>
create **.env file** using .env.template

<br>
<br>

# Client

## Scripts

**npm start**: To start frontend<br>
**npm run test:e2e**: To start test<br>
(please start the server in test-mode using npm run start:test first )

<br>

# Server

## scripts

**NOTE:** run **docker-compose up --build** command, to use docker postgres
<br>
<br>
**npm run dev**: To start server in dev mode<br>
**npm run test**: To start test<br>
**npm run start:test**: To start server for client to test
