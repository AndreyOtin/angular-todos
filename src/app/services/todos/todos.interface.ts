export interface ITodo {
  id: string,
  title: string,
  description: string,
  status: TodoStatus
}

export type TodoStatus = 'default' | 'important' | 'done'
