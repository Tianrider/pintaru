'use client';

import { useUser } from '@/app/hooks/useUser';
import { updateProfile, updateEmail, updatePassword } from '@/app/actions/profile';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

export default function ProfilePage() {
  const { user, isLoading } = useUser();
  const [isUpdating, setIsUpdating] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const queryClient = useQueryClient();

  const handleProfileUpdate = async (formData: FormData) => {
    try {
      setIsUpdating(true);
      const result = await updateProfile(formData);

      if (result.success) {
        toast.success(result.message);
        queryClient.invalidateQueries({ queryKey: ['user'] });
      } else {
        toast.error(result.error);
      }
    } catch {
      toast.error('An unexpected error occurred');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleEmailUpdate = async (formData: FormData) => {
    try {
      setIsUpdating(true);
      const result = await updateEmail(formData);

      if (result.success) {
        toast.success(result.message);
        queryClient.invalidateQueries({ queryKey: ['user'] });
      } else {
        toast.error(result.error);
      }
    } catch {
      toast.error('An unexpected error occurred');
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePasswordUpdate = async (formData: FormData) => {
    try {
      setIsUpdating(true);
      const result = await updatePassword(formData);

      if (result.success) {
        toast.success(result.message);
        // Reset form
        const form = document.getElementById('password-form') as HTMLFormElement;
        if (form) form.reset();
      } else {
        toast.error(result.error);
      }
    } catch {
      toast.error('An unexpected error occurred');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">User Profile</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Profile Information Card */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your profile information here</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            ) : (
              <form id="profile-form" action={handleProfileUpdate}>
                <div className="flex flex-col items-center mb-4">
                  <Avatar className="w-20 h-20 mb-4">
                    <AvatarImage src={user?.user_metadata?.avatar_url || 'https://github.com/shadcn.png'} alt={user?.user_metadata?.full_name || 'User'} />
                    <AvatarFallback>{user?.user_metadata?.full_name?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                  <Input type="text" name="avatar_url" id="avatar_url" placeholder="Profile Picture URL (optional)" defaultValue={user?.user_metadata?.avatar_url || ''} className="w-full mb-4" />
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input type="text" name="full_name" id="full_name" defaultValue={user?.user_metadata?.full_name || ''} required />
                  </div>
                </div>
                <Button type="submit" className="w-full mt-4" disabled={isUpdating}>
                  {isUpdating ? 'Saving...' : 'Save Changes'}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Email Update Card */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Email</CardTitle>
            <CardDescription>Update your account email address</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-8 w-full" />
              </div>
            ) : (
              <form id="email-form" action={handleEmailUpdate}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current_email">Current Email</Label>
                    <Input type="email" name="current_email" id="current_email" value={user?.email || ''} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">New Email</Label>
                    <Input type="email" name="email" id="email" required />
                  </div>
                </div>
                <Button type="submit" className="w-full mt-4" disabled={isUpdating}>
                  {isUpdating ? 'Updating...' : 'Update Email'}
                </Button>
                <p className="text-xs text-muted-foreground mt-2">A confirmation email will be sent to your new email address</p>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Password Update Card */}
        <Card className="w-full md:col-span-2">
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>Update your account password</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            ) : (
              <form id="password-form" action={handlePasswordUpdate}>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="current_password">Current Password</Label>
                    <Input type={passwordVisible ? 'text' : 'password'} name="current_password" id="current_password" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new_password">New Password</Label>
                    <Input type={passwordVisible ? 'text' : 'password'} name="new_password" id="new_password" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm_password">Confirm Password</Label>
                    <Input type={passwordVisible ? 'text' : 'password'} name="confirm_password" id="confirm_password" required />
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <input type="checkbox" id="show-password" className="mr-2" onChange={() => setPasswordVisible(!passwordVisible)} />
                  <Label htmlFor="show-password" className="text-sm cursor-pointer">
                    Show password
                  </Label>
                </div>
                <Button type="submit" className="w-full mt-4" disabled={isUpdating}>
                  {isUpdating ? 'Updating...' : 'Update Password'}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
