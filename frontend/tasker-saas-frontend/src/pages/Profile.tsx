import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Badge } from "../components/ui/badge"
import { Mail } from "lucide-react"
import { GitHubStats } from "../components/Github/GitHubStats"
import GitHubCalendarSection from "../components/Github/GitHubCalendarSection"
import bannerImg from "@/assets/banner.jpg"
import SocialLinks from "../components/Social-Links/SocialLinks"
import { Button } from "../components/ui/button"
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";


const ProfilePage = () => {
  const user = {
    avatar: "https://github.com/karannegi20feb.png",
    fname: "Karan",
    lname: "Negi",
    userid: "karanegi076",
    githubusername:"KaranNegi20Feb",
    email: "karanegi076@gmail.com",
    bio: "Full-stack developer passionate about AI, open source, and building things that matter.",
    organizations: ["DTC Transport", "AI4Gov India", "Open Source"],
    skills: ["React", "Tailwind", "Django", "Docker", "YOLOv8", "C++", "Node.js"],
    githubStats: {
      repos: 42,
      stars: 120,
      forks: 30,
    },
    social: {
      github: "https://github.com/KaranNegi20Feb",
      twitter: "https://twitter.com/yourhandle",
      linkedin: "https://linkedin.com/in/karan-negi"
    }
  }
  const navigate = useNavigate();
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
    <div className="min-h-screen py-10 px-4 flex justify-center items-start">
      <Card className="w-full max-w-5xl shadow-lg rounded-2xl">
        <CardHeader className="flex flex-col gap-4">
      <div className="w-full relative">
        {/* Banner Image */}
        <img
          src={bannerImg}
          alt="Banner"
          className="w-full h-40 object-cover rounded-t-sm"
        />

        {/* Avatar - Bottom Left Overlay */}
        <div className="absolute -bottom-16 left-4 z-10">
          <Avatar className="w-40 h-40 border-4 border-white shadow-md">
            <AvatarImage src={user.avatar} alt={`${user.fname} ${user.lname}`} />
            <AvatarFallback>{user.fname[0]}{user.lname[0]}</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Spacer for avatar height */}
      <div className="h-10" />
      {/* User Info */}
        <CardContent className="pl-2">
           <CardTitle className="text-2xl font-bold mt-2">{user.fname} {user.lname}</CardTitle>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span>{user.email}</span>
          </div>
          <h3 className="mt-3 font-medium">{user.bio}</h3>
        </CardContent>
      
      
    </CardHeader>

        <CardContent className="space-y-8 px-8 pb-10">          
          {/* Skills */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill, idx) => (
                <Badge key={idx} variant="secondary">{skill}</Badge>
              ))}
            </div>
          </div>

          <SocialLinks github={user.social.github} twitter={user.social.twitter} linkedin={user.social.linkedin}/>

          {/* GitHub Stats */}
          <div>
            <GitHubStats repos={user.githubStats.repos} stars={user.githubStats.stars} forks={user.githubStats.forks} />
          </div>

          {/* GitHub Calendar */}
          <div>
            <GitHubCalendarSection username={user.githubusername}/>
          </div>
        </CardContent>
      </Card>
    </div>
  </>
  )
}

export default ProfilePage
