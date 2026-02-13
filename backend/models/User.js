const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

// Auto-remove password when converting to JSON
UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

// Login Logic
UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error("Incorrect email");
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Incorrect password");
  return user;
};

// Register Logic
UserSchema.statics.register = async function (name, email, password) {
  const exists = await this.findOne({ email });
  if (exists) throw new Error("Email already in use");
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return await this.create({ name, email, password: hash });
};

module.exports = mongoose.model("User", UserSchema);
