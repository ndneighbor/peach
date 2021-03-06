const UserSchema = (Mongoose, application) => Mongoose.model('users', new Mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  level: { type: String, required: true },
  status: { type: String, required: true },
  application,
}));

export default UserSchema;
