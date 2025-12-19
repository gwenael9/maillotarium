import Header from "./Header";

export default function AppLayout() {
    return (
        <div className="min-h-svh">
            <Header />
            <main className="p-4">
                <h1>Maillotarium</h1>
            </main>
            
        </div>
    )
}