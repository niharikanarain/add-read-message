# Add and read messages app

## Testing

### Auth Endpoints

POST /login

```CLI
Request Body >
username
pwd
```

POST /logout

```CLI
Request Header >
Authorization: Bearer <insert_auth_token>
```

### Other Endpoints

GET /stats

```CLI
Request Header >
Authorization: Bearer <insert_auth_token>
```

POST /message

```CLI
Request Body >
from
to
message
```
