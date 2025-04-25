/* eslint-disable @next/next/no-img-element */
"use client";

import {useRouter, usePathname} from "next/navigation";
import cn from "classnames";
import {FC, useEffect, useState, useRef} from "react";
import {Home, LogIn, LogOut, Menu, X} from "lucide-react";
import Link from "next/link";
import {createClient} from "@/utils/supabase/client";
import {User} from "@supabase/supabase-js";

interface NavItemProps {
	icon: FC<{fill: string; width: number; height: number}>;
	label: string;
	path: string;
	isActive: boolean;
}

const NavItem: FC<NavItemProps> = ({icon: Icon, label, path, isActive}) => {
	const router = useRouter();

	return (
		<div
			onClick={() => router.push(path)}
			className={cn(
				"cursor-pointer transition-all flex flex-col items-center gap-1 w-24 py-1 rounded-md",
				isActive
					? "text-primary-yellow bg-yellow-50"
					: "text-[#5D5D5D] hover:bg-gray-100 active:bg-gray-200"
			)}
		>
			<Icon
				fill={isActive ? "#d9a821" : "#5D5D5D"}
				width={20}
				height={20}
			/>
			<span className="text-xs font-semibold">{label}</span>
		</div>
	);
};

// Mobile NavItem with a horizontal layout
const MobileNavItem: FC<NavItemProps> = ({
	icon: Icon,
	label,
	path,
	isActive,
}) => {
	const router = useRouter();

	return (
		<div
			onClick={() => router.push(path)}
			className={cn(
				"cursor-pointer transition-all flex items-center gap-3 py-3 px-4 rounded-md w-full",
				isActive
					? "text-primary-yellow bg-yellow-50"
					: "text-[#5D5D5D] hover:bg-gray-100 active:bg-gray-200"
			)}
		>
			<Icon
				fill={isActive ? "#d9a821" : "#5D5D5D"}
				width={20}
				height={20}
			/>
			<span className="font-semibold">{label}</span>
		</div>
	);
};

export default function HomeNavbar() {
	const pathname = usePathname();
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const navbarRef = useRef<HTMLDivElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);
	const supabase = createClient();

	useEffect(() => {
		const getUser = async () => {
			try {
				const {data, error} = await supabase.auth.getUser();
				if (error) {
					console.error("Error fetching user:", error);
					setUser(null);
				} else {
					setUser(data.user);
				}
			} catch (error) {
				console.error("Unexpected error:", error);
				setUser(null);
			} finally {
				setIsLoading(false);
			}
		};

		getUser();
	}, [supabase.auth]);

	// Close mobile menu when navigating
	useEffect(() => {
		setIsMenuOpen(false);
	}, [pathname]);

	// Close mobile menu when clicking outside
	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
			if (
				isMenuOpen &&
				navbarRef.current &&
				menuRef.current &&
				!navbarRef.current.contains(event.target as Node) &&
				!menuRef.current.contains(event.target as Node)
			) {
				setIsMenuOpen(false);
			}
		};

		document.addEventListener("mousedown", handleOutsideClick);

		// Add event listener for touch events as well for mobile devices
		document.addEventListener("touchstart", handleOutsideClick);

		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
			document.removeEventListener("touchstart", handleOutsideClick);
		};
	}, [isMenuOpen]);

	const navItems = [
		{
			icon: Home,
			label: "Dashboard",
			path: "/dashboard",
		},
	];

	// Add conditional login/logout button
	if (!isLoading) {
		if (user) {
			// User is logged in, show logout button
			navItems.push({
				icon: LogOut,
				label: "Logout",
				path: "/auth/logout",
			});
		} else {
			// User is logged out, show login button
			navItems.push({
				icon: LogIn,
				label: "Login",
				path: "/auth/login",
			});
		}
	}

	return (
		<>
			{/* Desktop Navbar */}
			<nav className="bg-white px-4 sm:px-8 md:px-12 py-2 hidden sm:block fixed w-full top-0 border-b border-b-[#F5F5F5] shadow-md z-20">
				<div className="flex items-center justify-between">
					<Link href="/">
						<img
							src="/logo-expand.svg"
							alt="logo"
							className="h-7 w-auto"
						/>
					</Link>
					<div className="flex items-center gap-2">
						{navItems.map((item, index) => (
							<NavItem
								key={index}
								icon={item.icon}
								label={item.label}
								path={item.path}
								isActive={pathname === item.path}
							/>
						))}
					</div>
				</div>
			</nav>

			{/* Mobile Navbar */}
			<nav
				ref={navbarRef}
				className="bg-white sm:hidden fixed w-full top-0 border-b border-b-[#F5F5F5] shadow-md z-30"
			>
				<div className="flex items-center  px-4 py-2 relative justify-between">
					<Link href="/">
						<img
							src="/logo-expand.svg"
							alt="logo"
							className="h-6 w-auto"
						/>
					</Link>
					<button
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						className="p-2 rounded-md hover:bg-gray-100"
						aria-label={isMenuOpen ? "Close menu" : "Open menu"}
					>
						{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
					</button>

					{/* Mobile Menu */}
					{isMenuOpen && (
						<div
							ref={menuRef}
							className="absolute inset-x-0 top-[54px] bg-white z-20 sm:hidden border-b border-gray-200 shadow-md"
						>
							<div className="flex flex-col p-4">
								{navItems.map((item, index) => (
									<MobileNavItem
										key={index}
										icon={item.icon}
										label={item.label}
										path={item.path}
										isActive={pathname === item.path}
									/>
								))}
							</div>
						</div>
					)}
				</div>
			</nav>
		</>
	);
}
