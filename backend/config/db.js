const mongoose = require('mongoose');


const connectDB = async () => {
  try {
    // A Configurer par pitié
    await mongoose.connect(process.env.MONG_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
