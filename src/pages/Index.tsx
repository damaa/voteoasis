import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { AdminDashboard } from "@/components/AdminDashboard"
import { VotingList } from "@/components/VotingList"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import type { Tables } from "@/lib/supabase/schema"

const Index = () => {
  const { user, signInWithGoogle, signOut, loading } = useAuth()
  const [lists, setLists] = useState<Tables['lists'][]>([])
  const [loadingLists, setLoadingLists] = useState(true)

  useEffect(() => {
    async function fetchLists() {
      try {
        const { data, error } = await supabase
          .from('lists')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error
        setLists(data || [])
      } catch (error) {
        console.error('Error fetching lists:', error)
      } finally {
        setLoadingLists(false)
      }
    }

    fetchLists()
  }, [])

  if (loading || loadingLists) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex justify-end">
        {user ? (
          <Button onClick={signOut}>Sign Out</Button>
        ) : (
          <Button onClick={signInWithGoogle}>Sign in with Google</Button>
        )}
      </div>

      {user && (
        <AdminDashboard userId={user.id} />
      )}

      <div className="space-y-8">
        <h2 className="text-2xl font-bold">Available Voting Lists</h2>
        {lists.length === 0 ? (
          <p className="text-muted-foreground">No voting lists available yet.</p>
        ) : (
          lists.map((list) => (
            <VotingList key={list.id} list={list} />
          ))
        )}
      </div>
    </div>
  )
}

export default Index