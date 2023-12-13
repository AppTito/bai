<p ><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

## Installation

### Clone the repository

```bash
git clone 
```

### Install dependencies

```bash
composer install
```

### Create a copy of your .env file

```bash
cp .env.example .env
```

### Generate an app encryption key

```bash
php artisan key:generate
```

### Create an empty database for our application

### In the .env file, add database information to allow Laravel to connect to the database.

### Migrate the database

```bash
php artisan migrate
```

### Install node modules

```bash
npm install
```

### Build assets using Laravel Mix

```bash
npm run build
```

### Start the local development server

```bash
php artisan serve
```

### You can now access the server at http://localhost:8000
