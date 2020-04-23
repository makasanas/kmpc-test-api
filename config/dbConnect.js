const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });
console.log(`Database connected`);
