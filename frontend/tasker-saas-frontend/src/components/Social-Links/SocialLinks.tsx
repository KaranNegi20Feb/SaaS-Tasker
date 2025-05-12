import { Github, Linkedin, Twitter } from "lucide-react"
import { Button } from "../../components/ui/button"  // Ensure this import is correct

interface SocialLinksProps {
  github: string;
  twitter: string;
  linkedin: string;
}

const SocialLinks = ({ github, twitter, linkedin }: SocialLinksProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Social Links</h3>
      <div className="flex gap-4">
        <Button variant="outline" size="icon" asChild>
          <a href={github} target="_blank" rel="noopener noreferrer">
            <Github className="w-5 h-5" />
          </a>
        </Button>
        <Button variant="outline" size="icon" asChild>
          <a href={twitter} target="_blank" rel="noopener noreferrer">
            <Twitter className="w-5 h-5" />
          </a>
        </Button>
        <Button variant="outline" size="icon" asChild>
          <a href={linkedin} target="_blank" rel="noopener noreferrer">
            <Linkedin className="w-5 h-5" />
          </a>
        </Button>
      </div>
    </div>
  );
};

export default SocialLinks;
