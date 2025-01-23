import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { supabase } from '@/lib/supabase/client'
import { useToast } from "@/components/ui/use-toast"

export function AdminDashboard({ userId }: { userId: string }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const { toast } = useToast()

  const handleCreateList = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data, error } = await supabase
        .from('lists')
        .insert([
          {
            title,
            description,
            user_id: userId,
          },
        ])
        .select()

      if (error) throw error

      toast({
        title: "Success!",
        description: "Your list has been created.",
      })

      setTitle('')
      setDescription('')
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create list. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Voting List</CardTitle>
        <CardDescription>Create a new list for people to vote on</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleCreateList} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">Title</label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter list title"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">Description</label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter list description"
              required
            />
          </div>
          <Button type="submit">Create List</Button>
        </form>
      </CardContent>
    </Card>
  )
}