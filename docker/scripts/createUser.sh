mongo $MONGO_INITDB_DATABASE << EOF
db.createUser(
  {
    user: "${APP_USER_USERNAME}",
    pwd: "${APP_USER_PASSWORD}",
    roles: [ { role: "readWrite", db: "${MONGO_INITDB_DATABASE}" } ]
  }
);
EOF
