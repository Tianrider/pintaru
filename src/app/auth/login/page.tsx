import { SignInPage } from '@/components/ui/sign-in';

export default function Login() {
  return (
    <div className="w-full h-screen flex overflow-hidden">
      <div className="flex flex-col w-full justify-center items-center bg-white py-10 md:py-0">
        <SignInPage />
      </div>
    </div>
  );
}
