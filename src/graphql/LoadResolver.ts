import { UserResolver } from './resolver/UserResolver'
import { TodoResolver } from './resolver/TodoResolver'

export const LoadResolver = [
  UserResolver,
  TodoResolver
]