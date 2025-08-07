'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Home, Menu, X, User, LogOut, Plus } from 'lucide-react'
import { cn } from '../../lib/utils'


export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const token = document.cookie.includes('token=')
    if (token) {
      // In a real app, you'd decode the token to get user info
      setUser({ name: 'John Doe', role: 'SEEKER' })
    }
  }, [])

  const handleLogout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    setUser(null)
    router.push('/')
  }

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Home className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">PropertyHub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/properties" className="text-gray-700 hover:text-primary-600 transition-colors">
              Browse Properties
            </Link>
            {user ? (
              <div className="flex items-center space-x-4">
                {user.role === 'OWNER' && (
                  <Link href="/properties/new" className="btn btn-primary">
                    <Plus className="h-4 w-4 mr-2" />
                    List Property
                  </Link>
                )}
                <Link href="/dashboard" className="text-gray-700 hover:text-primary-600 transition-colors">
                  Dashboard
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors">
                    <User className="h-5 w-5" />
                    <span>{user.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/auth/login/" className="text-gray-700 hover:text-primary-600 transition-colors">
                  Login
                </Link>
                <Link href="/auth/register" className="btn btn-primary">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={cn(
        "md:hidden transition-all duration-300 ease-in-out",
        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
      )}>
        <div className="px-4 pt-2 pb-3 space-y-1 bg-white border-t">
          <Link href="/properties" className="block px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors">
            Browse Properties
          </Link>
          {user ? (
            <>
              <Link href="/dashboard" className="block px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors">
                Dashboard
              </Link>
              {user.role === 'OWNER' && (
                <Link href="/properties/new" className="block px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors">
                  List Property
                </Link>
              )}
              <Link href="/profile" className="block px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="block px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors">
                Login
              </Link>
              <Link href="/auth/register" className="block px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}