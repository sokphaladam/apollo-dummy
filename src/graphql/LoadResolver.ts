import { UserResolver } from './resolver/UserResolver'
import { TodoResolver } from './resolver/TodoResolver'
import { CommentResolver } from './resolver/CommentResolver'

export const LoadResolver = [
  UserResolver,
  TodoResolver,
  CommentResolver
]