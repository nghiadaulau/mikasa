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
    @Transaction(false)
    @Returns('Todo[]')
    public async GetAll(ctx: Context): Promise<Todo[]> {
        const todoListsIterator = await ctx.stub.getStateByRange('', '');
        let result = await todoListsIterator.next();
        const todos: Todo[] = [];
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record: any;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            todos.push(record);
            result = await todoListsIterator.next();
        }
        return todos;
    }

}
