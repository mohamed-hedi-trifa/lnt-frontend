import React from 'react'
import { Button } from '../ui/button'
import { Bell, CreditCard, HelpCircle, Home, MapPin, Settings, User, X, Calendar, LogOut } from 'lucide-react';
import { useAuthContext } from '@/contexts/AuthProvider';
import { Link, navigate } from 'gatsby'

function AdminSidebar({
    sidebarOpen,
    setSidebarOpen,
}: {
    sidebarOpen: any;
    setSidebarOpen: (open: any) => void;
}) {

    const { setUser } = useAuthContext();
    const logoutSubmit = (e: any) => {
        e.preventDefault();
        if (typeof window !== "undefined") {
            localStorage.removeItem('token');
        }
        setUser(null);
        navigate("/");
    }

    const sidebarItems = [
        { icon: Home, label: "Tableau de bord", href: "/admin", active: true },
        { icon: User, label: "Propriétaires", href: "/admin/owners" },
        { icon: MapPin, label: "Annonces", href: "/admin/announcments" },
        { icon: Calendar, label: "Réservations", href: "/admin/reservations" },
        { icon: CreditCard, label: "Paiements & Abonnements", href: "/admin/paiements" },
        { icon: Bell, label: "Notifications", href: "/admin/notifications" },
        { icon: HelpCircle, label: "Support & Tickets", href: "/admin/support" },
        { icon: Settings, label: "Paramètres", href: "/admin/parametres" },
    ]
    return (
        <div>
            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
            >
                <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
                    <h2 className="text-lg font-semibold text-sidebar-foreground">Admin LNT</h2>
                    <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)} className="lg:hidden">
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <nav className="p-4 space-y-2">
                    {sidebarItems.map((item, index) => (
                        <Link key={index} href={item.href}>
                            <Button
                                key={item.href}
                                variant={item.active ? "default" : "ghost"}
                                className={`w-full justify-start ${item.active ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground hover:bg-muted"}`}
                            >
                                <item.icon className="mr-3 h-4 w-4" />
                                {item.label}
                            </Button>
                        </Link>
                    ))}
                </nav>

                <div className="absolute bottom-4 left-4 right-4">
                    <Button onClick={logoutSubmit} variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-muted">
                        <LogOut className="mr-3 h-4 w-4" />
                        Déconnexion
                    </Button>
                </div>
            </div>

            {/* Overlay pour mobile */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}
        </div>
    )
}

export default AdminSidebar
