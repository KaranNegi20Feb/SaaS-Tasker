"use client"

import { useEffect, useState } from "react"
import {Loader2} from "lucide-react"
import { useUserStore } from "../store/useUserStore"
import { useApolloClient } from "@apollo/client"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { toast } from "sonner";
import { Label } from "../components/ui/label"

export default function ProfileEditor() {
  const [loading, setLoading] = useState(false);
  const client = useApolloClient()
  const {
    user,
    updateUserDetails,
    fetchUserDetails,
    resetDetails, // Add resetDetails here
    successUpdated,
    resetSuccess,
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

  // Check for token and user
  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) {
      resetDetails()  // Reset user state when no token
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
  setLoading(true);
  const toastId = toast.loading("Updating your profile...");

  try {
    await updateUserDetails(client, {
      bio: form.bio,
      skills: form.skills.split(",").map((s) => s.trim()),
      githubUsername: form.githubUsername,
      avatar: form.avatar,
      githubUrl: form.githubUrl,
      twitterUrl: form.twitterUrl,
      linkedinUrl: form.linkedinUrl,
    });

    toast.success("Profile updated successfully!", {
      id: toastId,
    });
  } catch (error) {
    console.error(error);
    toast.error("Failed to update profile.", {
      id: toastId,
    });
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="max-w-xl mx-auto space-y-4 p-6">
      <h1 className="text-2xl font-bold">Edit Profile</h1>

      {Object.entries(form).map(([key, value]) => (
        <div key={key} className="space-y-2">
          <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
          <Input
            id={key}
            name={key}
            value={value}
            onChange={handleChange}
            placeholder={`Enter your ${key}`}
          />
        </div>
      ))}

      <Button
        onClick={handleUpdate}
        disabled={loading}
        className="btn-primary flex items-center justify-center">
        {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
        "Update Profile"
        )}
      </Button>
    </div>
  )
}
