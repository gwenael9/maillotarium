import BreadcrumbNav from "@/components/Breadcrump";
import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function AppLayout() {
    return (
        <div className="flex flex-col h-screen orverflow-hidden">
            <Header />
            <main className="flex-1 flex flex-col mx-12 my-6 overflow-auto">
                <BreadcrumbNav />
                <div className="flex-1 mt-4 relative">
                    <Outlet />
                </div>
            </main>
            
        </div>
    )
}