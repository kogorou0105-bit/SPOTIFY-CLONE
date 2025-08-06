import { SignedIn, SignedOut, SignOutButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";
import { useAuthStore } from "@/store/useAuthStore";

const TopBar = () => {
  const { isAdmin } = useAuthStore();
  return (
    <div className="flex items-center justify-between p-4 sticky top-0 z-10 bg-zinc-900/75 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <img src="/spotify.png" className="size-8" alt="Spotify logo" />
        Spotify
      </div>
      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link
            to="/admin"
            className={cn(
              buttonVariants({ variant: "ghost", className: " cursor-pointer" })
            )}
          >
            <LayoutDashboardIcon className="size-4  mr-2" />
            Admin Dashboard
          </Link>
        )}
        <SignedIn>
          <SignOutButton
            children={
              <Button variant="ghost" className="cursor-pointer">
                Sign Out
              </Button>
            }
          />
        </SignedIn>
        <SignedOut>
          <SignInOAuthButtons />
        </SignedOut>
      </div>
    </div>
  );
};

export default TopBar;
