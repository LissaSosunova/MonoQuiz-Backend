db = db.getSiblingDB('mydb');

db.createUser({
  user: 'admin',
  pwd: 'admin',
  roles: [
    {
      role: 'readWrite',
      db: 'mydb',
    },
  ],
});

db.users.insertMany([
  {
    name: 'Admin',
    email: 'admin@test.com',
    role: 'admin',
    isActive: true,
    password: '$2b$10$.jRz4H4SoN86pYtHBwoJDuo/vKnqHT9WfSidIl7Oh9059Ew5hNy7e',
  },
  {
    name: 'Test User',
    email: 'user@test.com',
    role: 'user',
    isActive: true,
    password: '$2b$10$.jRz4H4SoN86pYtHBwoJDuo/vKnqHT9WfSidIl7Oh9059Ew5hNy7e',
  },
]);
