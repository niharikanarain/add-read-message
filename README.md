# Add and read messages app

## Testing

### Running app

```CLI
npm install
npm start
```

### Auth Endpoints

POST /login

```CLI
Request Body

username
pwd
```

```CLI
Response Body

authToken
```

POST /logout

```CLI
Request Header

Authorization: Bearer <insert_auth_token>
```

### Other Endpoints

GET /stats

```CLI
Request Header

Authorization: Bearer <insert_auth_token>
```

```CLI
Response Body

lastMessage: {
  from
  to
  message
}
numberOfCalls
```

POST /message

```CLI
Request Body

from
to
message
```
