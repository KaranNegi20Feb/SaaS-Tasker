"use client"

import { useEffect, useState } from "react"
import { Loader2,ArrowLeft} from "lucide-react"
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore"
import { useApolloClient } from "@apollo/client"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { toast } from "sonner"
import { Label } from "../components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/card"

export default function ProfileEditor() {
  const [loading, setLoading] = useState(false)
  const client = useApolloClient()
  const navigate = useNavigate();

  const {
    user,
    updateUserDetails,
    fetchUserDetails,
    resetDetails,
  } = useUserStore()

  const [form, setForm] = useState({
    bio: "",
    skills: "",
    githubUsername: "",
    avatar: "",
    githubUrl: "",
    twitterUrl: "",
    linkedinUrl: "",
  })

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) {
      resetDetails()
      setForm({
        bio: "",
        skills: "",
        githubUsername: "",
        avatar: "",
        githubUrl: "",
        twitterUrl: "",
        linkedinUrl: "",
      })
      return
    }

    if (!user) {
      fetchUserDetails(client)
    } else {
      setForm({
        bio: user.bio || "",
        skills: user.skills?.join(", ") || "",
        githubUsername: user.githubUsername || "",
        avatar: user.avatar || "",
        githubUrl: user.githubUrl || "",
        twitterUrl: user.twitterUrl || "",
        linkedinUrl: user.linkedinUrl || "",
      })
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleUpdate = async () => {
    setLoading(true)
    const toastId = toast.loading("Updating your profile...")

    try {
      await updateUserDetails(client, {
        bio: form.bio,
        skills: form.skills.split(",").map((s) => s.trim()),
        githubUsername: form.githubUsername,
        avatar: form.avatar,
        githubUrl: form.githubUrl,
        twitterUrl: form.twitterUrl,
        linkedinUrl: form.linkedinUrl,
      })

      toast.success("Profile updated successfully!", {
        id: toastId,
      })
    } catch (error) {
      console.error(error)
      toast.error("Failed to update profile.", {
        id: toastId,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
    <Button
        onClick={() => navigate("/dashboard")}
        variant="outline"
        size="sm"
        className="hidden sm:fixed sm:top-4 sm:left-4 sm:z-50 sm:flex sm:items-center sm:gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Button>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      <Card className="rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Edit Profile</CardTitle>
          <CardDescription>Update your public information and social links.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {Object.entries(form).map(([key, value]) => (
            <div key={key} className="space-y-1">
              <Label htmlFor={key} className="capitalize">{key.replace(/([A-Z])/g, " $1")}</Label>
              <Input
                id={key}
                name={key}
                value={value}
                onChange={handleChange}
                placeholder={`Enter your ${key}`}
              />
            </div>
          ))}
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button
            onClick={handleUpdate}
            disabled={loading}
            className="flex items-center gap-2"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Update Profile"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
    </>
    
  )
}
