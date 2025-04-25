"use client";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {register} from "@/app/actions/auth";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {useFormStatus} from "react-dom";
import {Eye, EyeOff, KeyRound, Mail, UserRound} from "lucide-react";
import {useState} from "react";
import Image from "next/image";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";

function SubmitButton() {
	const {pending} = useFormStatus();

	return (
		<Button
			type="submit"
			disabled={pending}
			className="w-full h-12 text-base font-semibold transition-all duration-300 hover:shadow-lg"
		>
			{pending ? "Signing up...." : "Sign up"}
		</Button>
	);
}

function SignUpPage() {
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);
	const [isPasswordNotEmpty, setIsPasswordNotEmpty] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const clientAction = async (formData: FormData) => {
		try {
			const password = formData.get("password") as string;
			const confirmPassword = formData.get("confirm_password") as string;

			if (password !== confirmPassword) {
				toast.error("Passwords do not match");
				return;
			}

			const response = await register(formData);

			if (response.success) {
				toast.success("Account created successfully");
				router.push("/dashboard");
			}
		} catch (error) {
			console.error("Login failed:", error);
			toast.error("Login failed");
		}
	};

	return (
		<div className="w-full px-8 md:px-12 items-center sm:justify-center">
			<form
				onSubmit={(event) => {
					event.preventDefault();
					const formData = new FormData(event.currentTarget);
					clientAction(formData);
				}}
				className="w-full max-w-md mx-auto"
			>
				<Card className="w-full sm:w-full border-none shadow-none">
					<CardHeader className="space-y-3">
						<div className="mx-auto flex justify-center mb-6">
							<Image
								src="/logo-small.svg"
								alt="Jawab.in Logo"
								width={64}
								height={64}
								priority
							/>
						</div>
						<CardTitle className="text-2xl font-bold text-center">
							Create your Jawab.in Account!
						</CardTitle>
						<p className="text-center text-sm opacity-80">
							Join our community and start asking questions
						</p>
					</CardHeader>
					<CardContent className="grid gap-y-5 pt-4">
						<div className="relative group">
							<Input
								type="text"
								required
								id="full_name"
								name="full_name"
								className="pl-11 h-12 rounded-lg border-input/80 transition-all focus:border-primary/80 focus:ring-2 focus:ring-primary/20"
								placeholder="Enter your full name"
							/>
							<UserRound className="absolute top-1/2 left-6 transform -translate-x-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
						</div>

						<div className="relative group">
							<Input
								type="email"
								required
								id="email"
								name="email"
								className="pl-11 h-12 rounded-lg border-input/80 transition-all focus:border-primary/80 focus:ring-2 focus:ring-primary/20"
								placeholder="Enter your email address"
							/>
							<Mail className="absolute top-1/2 left-6 transform -translate-x-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
						</div>

						<div className="relative group">
							<Input
								type={showPassword ? "text" : "password"}
								required
								id="password"
								name="password"
								className="pl-11 h-12 rounded-lg border-input/80 transition-all focus:border-primary/80 focus:ring-2 focus:ring-primary/20"
								placeholder="Enter your password"
								onChange={(e) => {
									setIsPasswordNotEmpty(
										e.target.value !== ""
									);
								}}
							/>
							<KeyRound className="absolute top-1/2 left-6 transform -translate-x-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
							{showPassword ? (
								<EyeOff
									className="absolute top-1/2 right-2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-primary transition-colors"
									onClick={() => setShowPassword(false)}
								/>
							) : (
								<Eye
									className="absolute top-1/2 right-2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-primary transition-colors"
									onClick={() => setShowPassword(true)}
								/>
							)}
						</div>

						{isPasswordNotEmpty && (
							<div className="relative group">
								<Input
									type={
										showConfirmPassword
											? "text"
											: "password"
									}
									required
									id="confirm_password"
									name="confirm_password"
									className="pl-11 h-12 rounded-lg border-input/80 transition-all focus:border-primary/80 focus:ring-2 focus:ring-primary/20"
									placeholder="Confirm your password"
								/>
								<KeyRound className="absolute top-1/2 left-6 transform -translate-x-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
								{showConfirmPassword ? (
									<EyeOff
										className="absolute top-1/2 right-2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-primary transition-colors"
										onClick={() =>
											setShowConfirmPassword(false)
										}
									/>
								) : (
									<Eye
										className="absolute top-1/2 right-2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-primary transition-colors"
										onClick={() =>
											setShowConfirmPassword(true)
										}
									/>
								)}
							</div>
						)}

						<div className="space-y-2">
							<Label>Account Type</Label>
							<RadioGroup
								required
								name="user_type"
								defaultValue="teens"
								className="flex space-x-4"
							>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="teens" id="r1" />
									<Label htmlFor="r1">Teens</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="kids" id="r2" />
									<Label htmlFor="r2">Kids</Label>
								</div>
							</RadioGroup>
						</div>
					</CardContent>

					<CardFooter>
						<div className="grid w-full gap-y-5">
							<SubmitButton />
							<div className="relative flex items-center justify-center">
								<div className="absolute w-full border-t border-input/50"></div>
								<span className="relative px-2 bg-white text-xs text-muted-foreground">
									OR
								</span>
							</div>
							<Button
								variant="outline"
								size="sm"
								className="w-full h-11 border border-input/80 hover:border-primary/30 hover:bg-primary/5 transition-all font-medium"
								asChild
							>
								<Link
									href="/auth/login"
									className="flex gap-1 items-center justify-center"
								>
									Already have an account?{" "}
									<span className="text-primary font-semibold">
										Log in
									</span>
								</Link>
							</Button>
						</div>
					</CardFooter>
				</Card>
			</form>
		</div>
	);
}

export {SignUpPage};
