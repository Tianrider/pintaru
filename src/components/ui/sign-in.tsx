'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { login } from '@/app/actions/auth';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useFormStatus } from 'react-dom';
import { Eye, EyeOff, KeyRound, Mail } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full h-12 text-base font-semibold transition-all duration-300 hover:shadow-lg">
      {pending ? 'Signing in...' : 'Sign in'}
    </Button>
  );
}

function SignInPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const clientAction = async (formData: FormData) => {
    try {
      const response = await login(formData);

      if (response.success) {
        toast.success('Login successful');
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed');
    }
  };

  return (
    <div className="w-full px-8 md:px-12 items-center sm:justify-center">
      <form action={clientAction} className="w-full max-w-md mx-auto">
        <Card className="w-full sm:w-full border-none shadow-xl bg-white/90 backdrop-blur-sm rounded-xl">
          <CardHeader className="">
            <div className="mx-auto flex justify-center mb-3">
              <Image src="/logo-expand.svg" className="w-1/2" alt="Jawab.in Logo" width={300} height={300} priority />
            </div>
            <CardTitle className="text-2xl font-bold text-center text-primary-blue">Masuk ke Akun PINTARU</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-y-5 pt-4">
            <div className="relative group">
              <Input type="email" required id="email" name="email" className="pl-11 h-12 rounded-lg border-input/80 transition-all focus:border-primary/80 focus:ring-2 focus:ring-primary/20" placeholder="Enter your email address" />
              <Mail className="absolute top-1/2 left-6 transform -translate-x-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
            </div>

            <div className="relative group">
              <Input type={showPassword ? 'text' : 'password'} required id="password" name="password" className="pl-11 h-12 rounded-lg border-input/80 transition-all focus:border-primary/80 focus:ring-2 focus:ring-primary/20" placeholder="Enter your password" />
              <KeyRound className="absolute top-1/2 left-6 transform -translate-x-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
              {showPassword ? <EyeOff className="absolute top-1/2 right-2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-primary transition-colors" onClick={() => setShowPassword(false)} /> : <Eye className="absolute top-1/2 right-2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-primary transition-colors" onClick={() => setShowPassword(true)} />}
            </div>

            {/* <div className='flex justify-end'>
							<Button
								variant='link'
								size='sm'
								className='p-0 text-xs text-primary hover:text-primary/80'
								asChild
							>
								<Link href='/auth/forgot-password'>Forgot password?</Link>
							</Button>
						</div> */}
          </CardContent>

          <CardFooter>
            <div className="grid w-full gap-y-5">
              <SubmitButton />
              <div className="relative flex items-center justify-center">
                <div className="absolute w-full border-t border-input/50"></div>
                <span className="relative px-2 bg-white text-xs text-muted-foreground">OR</span>
              </div>
              <Button variant="outline" size="sm" className="w-full h-11 border border-input/80 hover:border-primary/30 hover:bg-primary/5 transition-all font-medium" asChild>
                <Link href="/auth/register" className="flex gap-1 items-center justify-center">
                  Don&apos;t have an account? <span className="text-primary font-semibold">Sign up</span>
                </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

export { SignInPage };
