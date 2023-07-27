# POST /users/sign_in - Signin with Project listing
curl -H 'Content-Type: application/json' -X POST -d '{"email":"something@anywhere.com","password":"Good"}' http://localhost:8888/users/sign_in

# POST /users/sign_in  - Signin - Not Auth
curl -H 'Content-Type: application/json' -X POST -d '{"email":"something@anywhere.com","password":"AnythingElseBad"}' http://localhost:8888/users/sign_in

# GET /monitoring/1 - Project Monitoring Overview (Init)
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjN9.PZLMJBT9OIVG2qgp9hQr685oVYFgRgWpcSPmNcw6y7M" http://localhost:8888/monitoring/1

# GET /monitoring/1/power
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjN9.PZLMJBT9OIVG2qgp9hQr685oVYFgRgWpcSPmNcw6y7M" http://localhost:8888/monitoring/1/power

# GET /monitoring/1/loads
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjN9.PZLMJBT9OIVG2qgp9hQr685oVYFgRgWpcSPmNcw6y7M" http://localhost:8888/monitoring/1/loads

# GET /monitoring/1/usage
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjN9.PZLMJBT9OIVG2qgp9hQr685oVYFgRgWpcSPmNcw6y7M" http://localhost:8888/monitoring/1/usage

# POST /monitoring/1/report - {"groupBy":"hours|days", "start":"2022-11-10T13:45:00.000Z" "end":"2023-05-10T13:45:00.000Z"}
curl -H 'Content-Type: application/json' -X POST -d '{"groupBy":"days", "start":"2022-11-10T13:45:00.000Z", "end":"2023-05-10T13:45:00.000Z"}' -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjN9.PZLMJBT9OIVG2qgp9hQr685oVYFgRgWpcSPmNcw6y7M" http://localhost:8888/monitoring/1/report