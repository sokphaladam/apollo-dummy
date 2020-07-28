import { ContextType } from "../../ContextType";
const toonavatar = require('cartoon-avatar');

const TodoList = async (_: any, {}, ctx: ContextType) => {
  const knex = await ctx.knex;
  const todos = await knex('todos');
  const targets = await knex('todo_targets').whereIn('todo_id', todos.map(x => x.id));
  const users = await knex('users').whereIn('id', targets.map(x => x.user_id));
  const items: any[] = [];
  
  todos.map(x => {
    const target: any[] = [];

    targets.map(t => {
      if(t.todo_id === x.id){
        const user = users.find(u => u.id === t.user_id);
        target.push({
          ...user,
          url: toonavatar.generate_avatar({
            id: user.id,
            gender: user.gender === 'M' ? 'male': 'female'
          })
        });
      }
    })

    items.push({
      ...x,
      target: target
    })
  })

  return items;
}

const TodoCreate = async (_: any, {data}: any, ctx: ContextType) => {
  const knex = await ctx.knex;
  const user: any = await ctx.knex;
  const target: any[] = [];

  const todo = await knex('todos').insert({
    title: data.title,
    description: data.description,
    start_date: data.start_date,
    end_date: data.end_date
  });

  target.push({
    todo_id: todo[0],
    user_id: user.id
  });

  data.target.map((x: any) => {
    target.push({
      todo_id: todo[0],
      user_id: x
    })
  });

  await knex('todo_targets').insert(target);
  await ctx.pubsub.publish('@ADDTODO', { 
    CommentCreated: {
      id: todo[0],
      title: data.title,
      description: data.description,
      start_date: data.start_date,
      end_date: data.end_date
    }
  });

  return true
}

const TodoUpdate = async (_: any, { id, data }: any, ctx: ContextType) => {
  const knex = await ctx.knex;

  await knex('todos').update({
    title: data.title,
    description: data.description,
    start_date: data.start_date,
    end_date: data.end_date
  }).where({ id });

  await ctx.pubsub.publish('@EDITTODO', {TodoUpdated: true});
  return true;
}

const TodoToggleStatus = async (_: any, { id, status }: any, ctx: ContextType) => {
  const knex = await ctx.knex;
  await knex('todos').update({ status }).where({ id });
  await ctx.pubsub.publish('@EDITTODO', {TodoUpdated: true});
  return true;
}

const TodoAddMember = async (_: any, { id, user_id }: any, ctx: ContextType) => {
  const knex = await ctx.knex;
  const target: any[] = [];
  user_id.map((x: any) => {
    target.push({
      todo_id: id,
      user_id: x
    })
  })
  await knex('todo_targets').insert(target);
  return true;
}

const TodoRemoverMember = async (_: any, { id, user_id }: any, ctx: ContextType) => {
  const knex = await ctx.knex;

  await knex('todo_targets').delete().where({ todo_id: id }).whereIn('user_id', user_id.map((x: number) => x));
  return true;
}

export const TodoResolver = {
  StatusTodo: {
    New: 'New',
    Delegated: 'Delegated',
    InProgress: 'In-Progress',
    Canceled: 'Canceled',
    Completed: 'Completed'
  },
  Query: {
    TodoList
  },
  Mutation: {
    TodoCreate,
    TodoUpdate,
    TodoToggleStatus,
    TodoAddMember,
    TodoRemoverMember
  }
}