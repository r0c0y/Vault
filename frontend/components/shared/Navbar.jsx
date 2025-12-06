import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "../../lib/AuthContext";
import { useRouter } from "next/router";
import { LogOut, User, Settings, Menu, X, Compass, Layout as LayoutIcon, Plus, Heart, GitCompare } from "lucide-react";
import Button from './Button';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setShowMenu(false);
    setIsMobileMenuOpen(false);
    router.push('/');
  };

  const isActive = (path) => router.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform duration-200">
              <span className="text-background font-heading font-bold text-lg">V</span>
            </div>
            <span className="text-xl font-heading font-bold text-text-primary tracking-tight">Vault</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/explore"
              className={`flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${isActive('/explore') ? 'text-primary' : 'text-text-secondary hover:text-text-primary'}`}
            >
              <Compass size={18} />
              Explore
            </Link>
            <Link
              href="/match"
              className={`flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${isActive('/match') ? 'text-primary' : 'text-text-secondary hover:text-text-primary'}`}
            >
              <GitCompare size={18} />
              Match
            </Link>
            {user && (
              <Link
                href="/dashboard"
                className={`flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${isActive('/dashboard') ? 'text-primary' : 'text-text-secondary hover:text-text-primary'}`}
              >
                <LayoutIcon size={18} />
                Dashboard
              </Link>
            )}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="flex items-center gap-3 focus:outline-none group"
                >
                  <div className="hidden md:block text-right">
                    <p className="text-sm font-medium text-text-primary group-hover:text-primary transition-colors">{user.name}</p>
                  </div>
                  <div className="w-9 h-9 bg-surface border border-border rounded-full flex items-center justify-center text-text-primary group-hover:border-primary/50 transition-colors">
                    {user.avatarUrl ? (
                      <img src={user.avatarUrl} alt={user.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <span className="font-heading font-bold">{user.name?.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                </button>

                {/* Dropdown */}
                {showMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-surface border border-border rounded-xl shadow-xl py-2 animate-in fade-in zoom-in-95 duration-200">
                    <div className="px-4 py-3 border-b border-border md:hidden">
                      <p className="text-sm font-medium text-text-primary">{user.name}</p>
                      <p className="text-xs text-text-secondary truncate">{user.email}</p>
                    </div>

                    <Link
                      href={`/user/${user.id}`}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors"
                      onClick={() => setShowMenu(false)}
                    >
                      <User size={16} />
                      Profile
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors text-left"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login">
                  <Button variant="ghost" size="sm">Log in</Button>
                </Link>
                <Link href="/signup">
                  <Button variant="primary" size="sm">Sign up</Button>
                </Link>
              </div>
            )}
          </div>
          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-text-secondary hover:text-text-primary focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface border-b border-border animate-in slide-in-from-top-5 duration-200">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <Link
              href="/explore"
              className={`block px-3 py-3 rounded-lg text-base font-medium ${isActive('/explore') ? 'bg-primary/10 text-primary' : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex items-center gap-3">
                <Compass size={20} />
                Explore
              </div>
            </Link>
            <Link
              href="/match"
              className={`block px-3 py-3 rounded-lg text-base font-medium ${isActive('/match') ? 'bg-primary/10 text-primary' : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex items-center gap-3">
                <GitCompare size={20} />
                Match
              </div>
            </Link>
            {user && (
              <Link
                href="/dashboard"
                className={`block px-3 py-3 rounded-lg text-base font-medium ${isActive('/dashboard') ? 'bg-primary/10 text-primary' : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <LayoutIcon size={20} />
                  Dashboard
                </div>
              </Link>
            )}

            <div className="border-t border-white/5 my-2 pt-2">
              {user ? (
                <>
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium text-text-primary">{user.name}</p>
                    <p className="text-xs text-text-secondary truncate">{user.email}</p>
                  </div>
                  <Link
                    href={`/user/${user.id}`}
                    className="block px-3 py-3 rounded-lg text-base font-medium text-text-secondary hover:bg-white/5 hover:text-text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="flex items-center gap-3">
                      <User size={20} />
                      Profile
                    </div>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left block px-3 py-3 rounded-lg text-base font-medium text-red-400 hover:bg-red-500/10"
                  >
                    <div className="flex items-center gap-3">
                      <LogOut size={20} />
                      Logout
                    </div>
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-4 px-3 py-2">
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-center">Log in</Button>
                  </Link>
                  <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="primary" className="w-full justify-center">Sign up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
