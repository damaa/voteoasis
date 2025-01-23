import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Tables } from "@/lib/supabase/schema"

interface VotingItemProps {
  item: Tables['items']
  onVote: (id: string) => void
  isVoted: boolean
  disabled: boolean
}

export const VotingItem = ({ item, onVote, isVoted, disabled }: VotingItemProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
        <CardDescription>{item.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between items-center">
        <span className="text-2xl font-bold">{item.votes}</span>
        <Button
          onClick={() => onVote(item.id)}
          disabled={disabled || isVoted}
          variant={isVoted ? "secondary" : "default"}
        >
          {isVoted ? "Voted" : "Vote"}
        </Button>
      </CardContent>
    </Card>
  )
}