# Hey You Backend
## Local Setup
1. Clone this repository.
2. `cd` to this repository and run `npm install`.
3. Install [PostgreSQL](https://www.postgresql.org/download/) and configure it locally according to [official documentation](https://www.postgresql.org/docs/).
4. Create a local postgres database and tables by following commands found in [database.sql](./database.sql).
5. Configure postgres credentials in [db.js](./db.js).
6. Start server using `nodemon` by running `nodemon index`.

## API Endpoints

Method | Endpoint | Body (required) | Body (optional) | Notes
| ----- | ----------------- | -------------------- | --------------------- | ------------------ |
POST | /users | phone, day, time, week | name, friend_name | Post information that we get about the user from the frontend. |
GET | /users | N/A | N/A | Get information about all of our users.|
DELETE | /users/:user_id | N/A | N/A | Delete a user from database.|