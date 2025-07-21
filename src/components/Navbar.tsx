import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

interface NavbarProps {
  title: string
}

const Navbar =  ({ title }: NavbarProps) => {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <header className="w-full border-b px-4 py-3 flex items-center justify-between bg-background text-foreground">
            <h1 className="text-xl font-bold">{title}</h1>

            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className='cursor-pointer'
                >
                    {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </div>
        </header>
    )
}

export default Navbar