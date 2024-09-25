import { Request, Response } from 'express'
import { User } from '../models/User'


export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body


  try {
    let user = await User.findOne({ email })
    if (user) {
      res.status(400).json({ message: 'User already exists' })
      return
    }


    user = new User({ name, email, password })
    await user.save()
    res.status(201).json({ message: 'User registered successfully', user })
  } catch (error: any) {
    console.error('Error registering user:', error.message)
    res.status(500).json({ message: 'Internal server error' })
  }
}
