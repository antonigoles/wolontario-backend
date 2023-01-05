# wolontario-backend

.env file specs

```

MAILTRAP_USERNAME={Mailtrap username}
MAILTRAP_PASS={Mailtrap pass}

RCON_PASS={RCON PASS}
JWT_SECRET={JWT secret}

MONGO_PASS={MongoDB user's password}
MONGO_LOGIN={MongoDB user's login }
MONGO_URL={MongoDB entire connection url}
```

---

For local development,
ngrok is required because of the nonSSL http requests error (https://github.com/facebook/react-native/issues/24627#issuecomment-1049496059)