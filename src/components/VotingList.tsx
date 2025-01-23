import { useState, useEffect } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { VotingItem } from "@/components/VotingItem"
import { supabase } from "@/lib/supabase/client"
import type { Tables } from "@/lib/supabase/schema"

interface VotingListProps {
  list: Tables['lists']
}

export const VotingList = ({ list }: VotingListProps) => {
  const [items, setItems] = useState<Tables['items'][]>([])
  const [votedItems, setVotedItems] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const maxVotes = 3

  useEffect(() => {
    async function fetchItems() {
      try {
        const { data, error } = await supabase
          .from('items')
          .select('*')
          .eq('list_id', list.id)

        if (error) throw error
        setItems(data || [])
      } catch (error) {
        console.error('Error fetching items:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchItems()
  }, [list.id])

  const handleVote = async (itemId: string) => {
    if (votedItems.length < maxVotes && !votedItems.includes(itemId)) {
      try {
        const { error } = await supabase.rpc('increment_vote', {
          item_id: itemId
        })

        if (error) throw error

        setVotedItems([...votedItems, itemId])
        setItems(items.map(item => 
          item.id === itemId 
            ? { ...item, votes: item.votes + 1 }
            : item
        ))
      } catch (error) {
        console.error('Error voting:', error)
      }
    }
  }

  if (loading) {
    return <div>Loading items...</div>
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{list.title}</h1>
        <p className="text-muted-foreground">{list.description}</p>
      </div>

      <Alert>
        <AlertTitle>Voting Rules</AlertTitle>
        <AlertDescription>
          You can vote for up to {maxVotes} items. You have {maxVotes - votedItems.length} votes
          remaining.
        </AlertDescription>
      </Alert>

      <div className="grid gap-4">
        {items.map((item) => (
          <VotingItem
            key={item.id}
            item={item}
            onVote={handleVote}
            isVoted={votedItems.includes(item.id)}
            disabled={votedItems.length >= maxVotes && !votedItems.includes(item.id)}
          />
        ))}
      </div>
    </div>
  )
}