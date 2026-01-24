import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import * as Icons from "lucide-react"

export interface NavLink {
  key: string
  href: string
  text: string
}

export interface HeaderMinimalProps {
  logoText?: string
  navLinks?: NavLink[]
  url?: string
  className?: string
}

export function HeaderMinimal({
  logoText = "Ehsan Pourhadi",
  navLinks = [],
  url = "home",
  className,
}: HeaderMinimalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  const Newurl = new URL(url);
  const currentPage = Newurl.pathname.split("/").filter(Boolean)[0] || "/";

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false)
    }
    window.addEventListener("resize", handleResize)

    // Initialize theme state
    const currentTheme = document.documentElement.classList.contains("dark") ? "dark" : "light"
    setTheme(currentTheme)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
      document.documentElement.classList.remove("light")
    } else {
      document.documentElement.classList.remove("dark")
      document.documentElement.classList.add("light")
    }
    localStorage.setItem("theme", newTheme)
  }

  const handleSearchClick = () => {
    // 1. Try to find and click the DocSearch button if it exists in the DOM
    const docSearchButton = document.querySelector(".DocSearch-Button") as HTMLElement;
    if (docSearchButton) {
      docSearchButton.click();
      return;
    }

    // 2. Dispatch Ctrl+K keyboard event (as per DocSearch standard)
    const event = new KeyboardEvent("keydown", {
      key: "k",
      code: "KeyK",
      ctrlKey: true,
      bubbles: true,
      cancelable: true,
    })
    document.dispatchEvent(event)

    // Also try Cmd+K for Mac users
    const metaEvent = new KeyboardEvent("keydown", {
      key: "k",
      code: "KeyK",
      metaKey: true,
      bubbles: true,
      cancelable: true,
    })
    document.dispatchEvent(metaEvent)
  }

  return (
    <nav className={cn("fixed left-1/2 -translate-x-1/2 z-[100] w-[92%] top-1 transition-all duration-300", className)}>
      <div className="rounded-full px-4 md:px-6 py-2.5 md:py-3 flex items-center justify-between border border-black/5 dark:border-white/10 bg-white/80 dark:bg-[#050505]/80 backdrop-blur-xl shadow-2xl shadow-black/5 dark:shadow-black/50">
        <a href="/" className="font-black text-lg tracking-tighter uppercase flex items-center gap-2.5 group shrink-0">
          <svg
            width="36px"
            className="h-6 w-6 text-primary"
            data-rellax-speed="-7"
            version="1.1"
            viewBox="0 0 27.8 26.7"
            xmlSpace="preserve"
          >
            <path
              fill="currentColor"
              className="st1"
              d="M0.5,19.4C0.2,19,0,18.7,0,18.2c0-0.4,0.2-0.8,0.5-1.1L17.1,0.5C17.4,0.2,17.8,0,18.2,0c0.4,0,0.8,0.2,1.1,0.5
          c0.3,0.3,0.5,0.7,0.5,1.1c0,0.4-0.2,0.8-0.5,1.1L2.7,19.4c-0.3,0.3-0.7,0.5-1.1,0.5C1.2,19.8,0.8,19.7,0.5,19.4z M12.4,25.6
          c-0.3,0.3-0.8,0.6-1.3,0.8s-1,0.3-1.5,0.3c-0.5,0-1.1-0.1-1.6-0.3c-0.5-0.2-1.1-0.5-1.5-1l-2.1-2.1c-0.4-0.4-0.6-0.8-0.5-1.2
          c0.1-0.4,0.4-0.8,0.9-1.3L20.6,5c0.3-0.3,0.7-0.5,1.1-0.5c0.4,0,0.8,0.2,1.1,0.5c0.3,0.3,0.5,0.7,0.5,1.1c0,0.4-0.2,0.8-0.5,1.1
          l-15,15L9,23.4c0.2,0.2,0.4,0.2,0.6,0.2c0.2,0,0.5-0.1,0.7-0.4L25.1,8.4C25.4,8.1,25.8,8,26.2,8c0.4,0,0.8,0.2,1.1,0.5
          c0.3,0.3,0.5,0.7,0.5,1.1c0,0.4-0.2,0.8-0.5,1.1L12.4,25.6z"
            ></path>
          </svg>

          <span className="text-neutral-900 dark:text-white text-base md:text-lg group-hover:text-transparent bg-clip-text bg-gradient-to-r from-[#F24E1E] via-[#FFC700] to-[#1ABCFE] transition-all duration-300">
            {logoText}
          </span>
        </a>

        <div className="hidden md:flex gap-8 font-mono tracking-widest font-medium text-neutral-600 dark:text-white/70">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className={cn(
                "transition-colors hover:text-neutral-900 dark:hover:text-white relative after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-primary after:transition-all hover:after:w-full",
                currentPage === link.href ? "text-neutral-900 dark:text-white after:w-full" : ""
              )}
            >
              {link.text}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSearchClick}
            className="text-neutral-500 dark:text-white/70 p-2 hover:bg-neutral-100 dark:hover:bg-white/10 rounded-full transition-all group relative"
            title="Search (Ctrl+K)"
          >
            <Icons.Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="sr-only">Search</span>
          </button>

          <button
            onClick={toggleTheme}
            className="text-neutral-500 dark:text-white/70 p-2 hover:bg-neutral-100 dark:hover:bg-white/10 rounded-full transition-all group relative overflow-hidden"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            <div className="relative w-5 h-5">
              <Icons.Sun className={cn(
                "w-5 h-5 absolute transition-all duration-500 transform",
                theme === "dark" ? "translate-y-8 opacity-0 rotate-12" : "translate-y-0 opacity-100 rotate-0"
              )} />
              <Icons.Moon className={cn(
                "w-5 h-5 absolute transition-all duration-500 transform",
                theme === "dark" ? "translate-y-0 opacity-100 rotate-0" : "-translate-y-8 opacity-0 -rotate-12"
              )} />
            </div>
            <span className="sr-only">Toggle theme</span>
          </button>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-neutral-900 dark:text-white/90 p-1.5 hover:bg-neutral-100 dark:hover:bg-white/10 rounded-full transition-colors active:scale-90">
            {isOpen ? <Icons.X className="w-5 h-5" /> : <Icons.Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className={cn(
        "absolute top-[calc(100%+12px)] left-0 right-0 bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-3xl p-4 flex-col gap-2 origin-top transition-all duration-300 shadow-2xl shadow-black/10 dark:shadow-black/80 ring-1 ring-black/5 dark:ring-white/5",
        isOpen ? "flex scale-100 opacity-100" : "hidden scale-95 opacity-0"
      )}>
        {navLinks.map((link) => (
          <a key={link.key} href={link.href} onClick={() => setIsOpen(false)} className={cn("text-sm font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-between group", currentPage === link.key ? "bg-neutral-100 dark:bg-white/10 text-neutral-900 dark:text-white" : "text-neutral-600 dark:text-white/70 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/5")}>
            {link.text}
            <Icons.ChevronRight className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-neutral-400 dark:text-white/50 w-4 h-4" />
          </a>
        ))}
      </div>
    </nav>
  )
}