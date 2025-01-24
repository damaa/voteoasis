import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { supabase } from "@/lib/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import type { Tables } from "@/lib/supabase/schema"

interface AddItemFormProps {
  listId: string
  onItemAdded: () => void
}

export const AddItemForm = ({ listId, onItemAdded }: AddItemFormProps) => {
  const [title, setTitle] = useState("")
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const { error } = await supabase
        .from('items')
        .insert([
          {
            list_id: listId,
            title,
          },
        ])

      if (error) throw error

      toast({
        title: "Success!",
        description: "Item has been added to the list.",
      })

      setTitle("")
      onItemAdded()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium">Title</label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter item title"
          required
        />
      </div>
      <Button type="submit">Add Item</Button>
    </form>
  )
}