# hrla22-capstone-fe
Capstone FE Project - eBay

# Set-up DB
- create database `product_images` in psql admin: `createdb product_images`
  - user set as `root`; either create user `root` and add to db or set user to your own
- seed data from db/seed.sql
  - psql product_images [USER NAME HERE] < db/seed.sql
  
# Set-up AWS Config
- create folder `config` in root directory and add file `aws.config.js`
- get contents for config from kevinmjacobs

# Start Server
- run `npm install`
- run `npm run build`
- run `npm start`
