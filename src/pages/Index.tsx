import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { AdminDashboard } from "@/components/AdminDashboard"
import { VotingList } from "@/components/VotingList"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import type { Tables } from "@/lib/supabase/schema"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

const Index = () => {
  const { user, signIn, signUp, signOut, loading } = useAuth()
  const [lists, setLists] = useState<Tables['lists'][]>([])
  const [loadingLists, setLoadingLists] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSignUp, setIsSignUp] = useState(false)
  const { toast } = useToast()

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

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (isSignUp) {
        await signUp(email, password)
        toast({
          title: "Check your email",
          description: "We sent you a confirmation link.",
        })
      } else {
        await signIn(email, password)
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      })
    }
  }

  if (loading || loadingLists) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex justify-end">
        {user ? (
          <Button onClick={signOut}>Sign Out</Button>
        ) : (
          <form onSubmit={handleAuth} className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row items-end">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-x-2">
              <Button type="submit">
                {isSignUp ? "Sign Up" : "Sign In"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? "Have an account? Sign In" : "Need an account? Sign Up"}
              </Button>
            </div>
          </form>
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