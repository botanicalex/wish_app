"use client";
import Link from "next/link";
import { useAuthContext } from "./context/AuthContext";
import signOutUser from "../../firebase/auth/signout";
import { useRouter } from "next/navigation";

export default function Home() {
    const { user } = useAuthContext();
    const router = useRouter();

    const handleSignOut = async () => {
        const { error } = await signOutUser();
        if (!error) {
            router.push("/");
        } else {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <div className="min-h-screen">
            <div className="max-w-4xl mx-auto py-10 px-4">
                {/* ... otros elementos ... */}
                
                {user ? (
                    <div className="flex gap-2">
                        {/* ... otros botones ... */}
                        <button 
                            onClick={handleSignOut}
                            className="px-6 py-2 rounded-full bg-gray-300 text-gray-700 font-bold shadow"
                        >
                            Cerrar sesión
                        </button>
                    </div>
                ) : (
                    <Link href="/signin">
                        <button className="px-6 py-2 rounded-full bg-[#ffe6a0] text-[#8B2C3B] font-bold shadow">
                            Iniciar sesión
                        </button>
                    </Link>
                )}
            </div>
        </div>
    );
}