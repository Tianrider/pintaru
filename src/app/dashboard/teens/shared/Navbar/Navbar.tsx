/* eslint-disable @next/next/no-img-element */
'use client';

import { useRouter, usePathname } from 'next/navigation';
import cn from 'classnames';

import { FC, useState, useEffect } from 'react';
import { Home, LogOut, User, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

const navItems = [
  {
    icon: Home,
    label: 'Dashboard',
    path: '/dashboard/teens',
  },
  {
    icon: User,
    label: 'Profile',
    path: '/dashboard/teens/profile',
  },
  {
    icon: LogOut,
    label: 'Logout',
    path: '/auth/logout',
  },
];

interface NavItemProps {
  icon: FC<{ fill: string; width: number; height: number }>;
  label: string;
  path: string;
  isActive: boolean;
}

const NavItem: FC<NavItemProps> = ({ icon: Icon, label, path, isActive }) => {
  const router = useRouter();

  return (
    <div onClick={() => router.push(path)} className={cn('cursor-pointer transition-all flex flex-col items-center gap-1 w-24 py-1 rounded-md', isActive ? 'text-primary-yellow bg-yellow-50' : 'text-[#5D5D5D] hover:bg-gray-100 active:bg-gray-200')}>
      <Icon fill={isActive ? '#d9a821' : '#5D5D5D'} width={20} height={20} />
      <span className="text-xs font-semibold">{label}</span>
    </div>
  );
};

// Mobile NavItem with a horizontal layout
const MobileNavItem: FC<NavItemProps> = ({ icon: Icon, label, path, isActive }) => {
  const router = useRouter();

  return (
    <div onClick={() => router.push(path)} className={cn('cursor-pointer transition-all flex items-center gap-3 py-3 px-4 rounded-md w-full', isActive ? 'text-primary-yellow bg-yellow-50' : 'text-[#5D5D5D] hover:bg-gray-100 active:bg-gray-200')}>
      <Icon fill={isActive ? '#d9a821' : '#5D5D5D'} width={20} height={20} />
      <span className="font-semibold">{label}</span>
    </div>
  );
};

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Scroll animation setup
  const { scrollY } = useScroll();
  const paddingY = useTransform(scrollY, [0, 100], [24, 12]); // py-6 to py-3
  const boxShadow = useTransform(scrollY, [0, 100], ['0 0 0 rgba(0,0,0,0)', '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)']);

  // Close mobile menu when navigating
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        className="bg-white px-4 sm:px-8 md:px-12 hidden sm:block sticky top-0 border-b border-b-[#F5F5F5] z-20"
        style={{
          paddingTop: paddingY,
          paddingBottom: paddingY,
          boxShadow,
        }}
      >
        <div className="flex items-center justify-between">
          <Link href="/">
            <img src="/logo-expand.svg" alt="logo" className="w-20" />
          </Link>
          <div className="flex items-center gap-2">
            {navItems.map((item, index) => (
              <NavItem key={index} icon={item.icon} label={item.label} path={item.path} isActive={item.path === '/dashboard' ? pathname === '/dashboard' : item.path !== '/auth/logout' && pathname.startsWith(item.path)} />
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navbar */}
      <motion.nav
        className="bg-white sm:hidden sticky top-0 border-b border-b-[#F5F5F5] z-30"
        style={{
          paddingTop: paddingY,
          paddingBottom: paddingY,
          paddingLeft: 16, // px-4
          paddingRight: 16, // px-4
          boxShadow,
        }}
      >
        <div className="flex items-center justify-between">
          <Link href="/">
            <img src="/logo-expand.svg" alt="logo" className="h-24" />
          </Link>
          <button onClick={toggleMenu} className="p-2 rounded-md hover:bg-gray-100" aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="absolute inset-x-0 top-[54px] bg-white z-20 sm:hidden border-b border-gray-200 shadow-md">
          <div className="flex flex-col p-4">
            {navItems.map((item, index) => (
              <MobileNavItem key={index} icon={item.icon} label={item.label} path={item.path} isActive={item.path === '/dashboard' ? pathname === '/dashboard' : item.path !== '/auth/logout' && pathname.startsWith(item.path)} />
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
}
