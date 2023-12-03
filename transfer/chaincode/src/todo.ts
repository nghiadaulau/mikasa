/*
  SPDX-License-Identifier: Apache-2.0
*/

import {Object, Property} from 'fabric-contract-api';
// @ts-ignore
@Object
export class Todo {
    @Property()
    public docType?: string
    @Property()
    public ID: string
    @Property()
    public Title: string
    @Property()
    public Completed: boolean
    @Property()
    public Owner: string
    constructor(id: string, title: string, completed: boolean, owner: string) {
        this.docType = 'todo';
        this.ID = id;
        this.Title = title;
        this.Completed = completed;
        this.Owner = owner;
    }

}

export class ErrInvalidOwner extends Error {
    constructor(message?: string) {
        super(message || 'Introduced owner is not the owner for the task');
        this.name = 'ErrInvalidOwner';
    }
}

export class ErrInvalidTodoInformation extends Error {
    constructor(message?: string) {
        super(message || 'Invalid title or owner information');
        this.name = 'ErrInvalidTodoInformation';
    }
}

export class ErrGettingTodo extends Error {
    constructor(message?: string) {
        super(message || 'Error Getting todo');
        this.name = 'ErrGettingTodo';
    }
}

export class ErrNotFoundTodo extends Error {
    constructor(message?: string) {
        super(message || 'Todo was not found');
        this.name = 'ErrNotFoundTodo';
    }
}