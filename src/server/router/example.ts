import { z } from 'zod';
import { createProtectedRouter } from './protected-router';

export const exampleRouter = createProtectedRouter()
	.query('getTodos', {
		async resolve({ ctx }) {
			const todos = await ctx.prisma.todo.findMany({
				where: {
					userId: ctx.session.user.id,
				},
			});
			return todos;
		},
	})
	.mutation('createTodo', {
		input: z.object({
			name: z.string(),
			done: z.boolean(),
		}),
		async resolve({ input, ctx }) {
			const userId = ctx.session?.user?.id;
			return await ctx.prisma.todo.create({
				data: {
					...input,
					user: {
						connect: { id: userId },
					},
				},
			});
		},
	})
	.mutation('deleteTodo', {
		input: z.object({
			id: z.string(),
		}),
		async resolve({ input, ctx }) {
			return await ctx.prisma.todo.delete({
				where: {
					id: input.id,
				},
			});
		},
	});
