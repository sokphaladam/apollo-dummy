import { UserResolver } from './resolver/UserResolver'
import { TodoResolver } from './resolver/TodoResolver'
import { CommentResolver } from './resolver/CommentResolver'
import { FeedResolver } from './resolver/FeedResolver'

export const LoadResolver = [
  UserResolver,
  TodoResolver,
  CommentResolver,
  FeedResolver
]