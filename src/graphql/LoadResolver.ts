import { UserResolver } from "./resolver/UserResolver";
import { TodoResolver } from "./resolver/TodoResolver";
import { CommentResolver } from "./resolver/CommentResolver";
import { ProductResolver } from "./resolver/ProductResolver";
import GraphQLJSON, { GraphQLJSONObject } from "graphql-type-json";
import { inventoryResolver } from "./resolver/InventoryResolver";

export const LoadResolver = [
  UserResolver,
  TodoResolver,
  CommentResolver,
  ProductResolver,
  inventoryResolver,
];
