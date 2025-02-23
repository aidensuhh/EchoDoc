import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn afterSignInUrl="/onboarding" redirectUrl="/onboarding" />
    </div>
  );
}
