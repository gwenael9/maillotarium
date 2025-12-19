import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
    return (
        <div className="h-20 w-full border-b">
            <div className="flex items-center justify-between h-full px-4">
                <a href="/">Accueil</a>
                <ThemeToggle />
            </div>
        </div>
    )
}