import {Context, Contract, Info, Returns, Transaction} from 'fabric-contract-api';
import stringify from 'json-stringify-deterministic';
import sortKeysRecursive from 'sort-keys-recursive';
import {ErrInvalidTodoInformation, Todo} from './todo';
@Info({title: 'TodoTransfer', description: 'Smart contract for todo list'})
export class TodoTransferContract extends Contract {
    @Transaction()
    public async CreateTodoList(ctx: Context, title: string, owner: string): Promise<void> {
        if (title.length === 0 || owner.length === 0) {
            throw new ErrInvalidTodoInformation('Invalid title or owner information');
        }

        const timestamp = ctx.stub.getTxTimestamp();
        const newTodo = new Todo(String(timestamp.seconds), title, false, owner);
        const todoAsJSON = JSON.stringify(newTodo);
        await ctx.stub.putState(newTodo.ID, Buffer.from(todoAsJSON));
    }
}
