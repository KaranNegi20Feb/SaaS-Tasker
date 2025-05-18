import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Mail, ArrowLeft ,Loader2} from "lucide-react";
import GitHubCalendarSection from "../components/Github/GitHubCalendarSection";
import bannerImg from "@/assets/banner.jpg";
import SocialLinks from "../components/Social-Links/SocialLinks";
import { Button } from "../components/ui/button";
import { useUserStore } from "../store/useUserStore";

const ProfilePage = () => {
  const navigate = useNavigate();
  const client = useApolloClient();
  const { user, loading, fetchUserDetails, resetUser } = useUserStore();
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  // Watch for manual or external token changes
  useEffect(() => {
    const handleStorage = () => {
      const newToken = localStorage.getItem("token");
      setToken(newToken);
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Watch for local token changes (even within same tab)
  useEffect(() => {
    const interval = setInterval(() => {
      const newToken = localStorage.getItem("token");
      if (newToken !== token) {
        setToken(newToken);
      }
    }, 1000); // poll every 1s

    return () => clearInterval(interval);
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchUserDetails(client);
    } else {
      resetUser();
    }
  }, [token, fetchUserDetails, resetUser, client]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-4">
      <Loader2 className="w-12 h-12 text-gray-500 animate-spin" />
      <p className="text-xl font-semibold text-gray-700">Loading user profile...</p>
    </div>
    );
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

      <div className="min-h-screen py-10 px-4 flex justify-center items-start">
        <Card className="w-full max-w-5xl shadow-lg rounded-2xl">
          <CardHeader className="flex flex-col gap-4">
            <div className="w-full relative">
              <img
                src={bannerImg}
                alt="Banner"
                className="w-full h-40 object-cover rounded-t-sm"
              />
              <div className="absolute -bottom-16 left-4 z-10">
                <Avatar className="w-40 h-40 border-4 border-white shadow-md">
                  <AvatarImage src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
                  <AvatarFallback>{user.firstName[0]}{user.lastName[0]}</AvatarFallback>
                </Avatar>
              </div>
            </div>
            <div className="h-10" />
            <CardContent className="pl-2">
              <CardTitle className="text-2xl font-bold mt-2">
                {user.firstName} {user.lastName}
              </CardTitle>
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

            <SocialLinks
              github={user.githubUrl}
              twitter={user.twitterUrl}
              linkedin={user.linkedinUrl}
            />

            

            <GitHubCalendarSection username={user.githubUsername} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ProfilePage;
