export type Tables = {
  lists: {
    id: string
    title: string
    description: string
    created_at: string
    user_id: string
  }
  items: {
    id: string
    list_id: string
    title: string
    description: string
    votes: number
  }
  votes: {
    id: string
    item_id: string
    user_id: string
    created_at: string
  }
}