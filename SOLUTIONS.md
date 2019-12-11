# While approaching this challenge I kept a few things in mind
 - scalability, - code organization - readability
 
# Task one
- I started by configuring linting with eslint and prettier. this helped me move fast as I was able to lint the codebase, identify missing variable names and also spot syntax errors fast.
- The codebase had other error besides the wrong syntax
 - Controllers, on the event controller we were importing our mongoose schema directly, this was wrong because our controller only has to directly know about our database Models and the model, in turn, would import the already defined mongoose schema.
 - To fix the model and schema issue, I realized there was no database setup, so I set up mongo DB for both a test environment and a development environment, this means we maintain data integrity when testing and prevent side effects on development data.
 - Also on our controller for creating an event, we had some other errors like not getting any data from our request body, and also we had some wrong use of some javascript functions when creating a dateStart for an event.
 - The logic for checking if an existing event was in the database also had a bug because the start date was set to be greater than the end date. also, I felt this logic was making our controller fat and since it was a validation logic I abstracted that into a middleware folder.
 - now on the database front we have, a new model file I just created, an already existing schema file and also the index file containing our DB setup, I grouped all these files in a folder called DB(this helps with code organization and separation of concerns).
 - next, I moved to the routes folder where we had a couple of issues, we were calling an invalid route method on the router rather than an HTTP command like a POST and GET, also we were importing two invalid controllers rather than the one we created. to fix this I did a little refactoring, I introduced a new file to the codebase called index.js this would be our single source of truth as all routes files will pass through it. why the change? as our codebase begins to expand we will continue adding more resources like events, users which would all have full crud operations and thus multiple routes, etc, my strategy is to keep each resource in its own file events routes and all its crud operations would live in a file and we export that resources as a pack into our index folder and from there we serve it to our application. the same would apply for each new resource being added
 - next issue was on the entry file of the application, I properly imported our new routes file, imported our DB setup and configured that, I also introduced some API versioning for the application this means we can migrate to a new version easily without breaking our codebase.
 - Finally, I set up tests with jests and wrote some tests


# Task two

- For this challenge, I accomplished the following
N.B I set up an authentication system whereby to access some resources we would need to provide a user token.
1. Create a new API for User
2. Create Models for a User
3. For each event created, connect that event with a user such that every event has a user
4. Create a way to retrieve all events for a user
5. Make it possible to return all a user and all the events created by that user

# Initiatives

- Codebase refactor
- Test coverage above 90%
- API versioning/ proper naming of routes
- test database configuration

# How to test
To make this process easy I have included my .env file as part of this project

git clone the repo, cd into the folder and run the following commands
- npm test for running tests, view coverage and generate coverage folder
- npm start run server

_ sign up a new user by visiting this route POST-HTTP://127.0.0.1:5000/api/v1/auth/register

`
sample payload {
 "name": "Vic3king",
 "email": "king@ssssshow.com",
 "password": "king@show.com"
}
`


- to create an event, copy the token returned from the registration response|
set headers `authorization: copiedToken`, visit POST http://127.0.0.1:5000/api/v1/events/event

`
sample payload {
 "start": "July 3, 1999",
 "end": "July 3, 1999",
 "title": "New event two",
 "details": "My shiny second event",
 "location": {
 "address": "No 1 city of power avenue off pedro road",
 "latLng": {
 "lat": "000333",
 "lng": "0003333"
 }
 }
}
`

To view all created events for a user, 
- set headers `authorization: copiedToken`, visit GET http://127.0.0.1:5000/api/v1/events/user


To view user a user and all users events 
- set headers `authorization: copiedToken`, visit GET http://127.0.0.1:5000/api/v1/users/user


# Recommendations/ future initiatives
 - We could do document our API with swagger etc (http://127.0.0.1:5000/api/v1/api-docs/#)✅
 - we could convert the whole codebase to ECMA script 6 style(I tied to stay in line with our legacy codebase)
 - we could easily use google's API to validate the addresses, lat, and LNG of our events

 I will be implementing all recommendations pending feedback from the team. Cheers. 🙂