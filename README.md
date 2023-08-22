
## About Project

  

This project is basically an online suvey app. Users can register and login in their admin panel. After being 
registered any user can create new survey and see responses against surveys. Can view and delete surveys and
responses. Users will also be able to have some recent surveys and response statistics in the dashboard area.
Any public can the surveys in the home page and submit a feedback. After feedback submission the survey author will be notified by sending email to his/her respective email.

## Necessary Softwares to install

  

Before using the system you need to install couple of softwares such as PHP >=8.0 , MySQL, Composer and NodeJs.
For php & mysql go to https://www.apachefriends.org/ and download the xampp application for your system ( windows / linux/ mac ). Go to https://getcomposer.org/ for downloading composer.Finally, go to https://nodejs.org/ for downloading nodejs. After installing the necessary softwares follow the instructions to make the application live. Create an account in https://mailtrap.io website for email sending purpose.

  

## Preparing the API backend
<b>Step # 1 Clone repository: </b>
Clone the git repository & cd into the <b>survey-app</b> folder. Inside <b>survey-app</b> folder there are two folders called <b>backend</b> and <b>web</b>.
  

```
git clone https://github.com/tanvirasifkhan/survey-app.git
cd survey-app
```

<b>Step # 2 Configuring backend API: </b>
In this step just <code>cd backend</code> into the <b>backend</b> folder. After that, run <code>composer install</code> command. Create <code>.env</code> file in the root folder. Copy <code>.env.example</code> file to <code>.env</code>. After that change your database configuration in the <code>.env</code> file like below and then create a database called <b>survey</b> in phpMyadmin panel by running xampp control panel. Hit <code>localhost/phpmyadmin</code> in the browser to access your database admin panel.
  

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=survey
DB_USERNAME=root
DB_PASSWORD=
```
<b>Step # 3 Configuring Email Service: </b>
After creating an account in https://mailtrap.io, create an inbox called <code>survey</code>. From the SMTP configuration tab select Laravel 9+ from the dropdown. Copy the configuration and paste into your <code>.env</code> file like below and replace the credentials.

```
MAIL_MAILER=smtp
MAIL_HOST=<host>
MAIL_PORT=<port>
MAIL_USERNAME=<username>
MAIL_PASSWORD=<passowrd>
MAIL_ENCRYPTION=tls
```
<b>Step # 4 Configuring Laravel: </b>
First generate security key then run the migration for creating tables and then run the application by following the below commands
  

```
php artisan key:generate
php artisan migrate
php artisan serve
```
A default user will be created during this. Email : <code>tanvir@gmail.com</code> and Password: <code>tanvir</code> are the default user credentials. Application will run at <code>localhost:8000</code>.

### Preparing the frontend
<b>Step # 1 Configuring frontend: </b>
In this step just <code>cd web</code> into the <b>web</b> folder. After that, run <code>npm install</code> command. Run the following command.

```
npm run dev
```
It will run the application at <code>localhost:5173</code>. The logo of the app is linked to the home page <code>localhost:5173/</code>.

<b>So, this is the way the application works. Thanks</b>