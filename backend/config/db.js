const mongoose = require('mongoose');
const username = encodeURIComponent("user");
const password = encodeURIComponent("myPassword123");



let URI = `mongodb+srv://${username}:${password}@cluster0.ukbwj.mongodb.net/myJobbang`;




const connectDB = async () => {
  try {
    
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "myJobBang"
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error("error database" + err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
