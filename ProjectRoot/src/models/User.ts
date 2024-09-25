import mongoose, { Document, Schema } from 'mongoose'
import bcrypt from 'bcryptjs'


export interface IUser extends Document {
  name: string
  email: string
  password: string
  createdAt: Date
  comparePassword(password: string): Promise<boolean>
}


const UserSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, validate: { validator: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), message: (props: any) => `${props.value} is not a valid email!` }},
  password: { type: String, required: true, minlength: 6 },
  createdAt: { type: Date, default: Date.now }
})


UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next()
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})


UserSchema.methods.comparePassword = function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password)
}


export const User = mongoose.model<IUser>('User', UserSchema)