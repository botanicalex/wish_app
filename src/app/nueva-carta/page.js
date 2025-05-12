&quot;use client&quot;;
import { useState } from &quot;react&quot;;
import { useRouter } from &quot;next/navigation&quot;;

export default function NuevaCarta() {
    const [nombre, setNombre] = useState(&quot;&quot;);
    const [mensaje, setMensaje] = useState(&quot;&quot;);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await fetch(&quot;/api/firestore&quot;, {
            method: &quot;POST&quot;,
            headers: { &quot;Content-Type&quot;: &quot;application/json&quot; },
            body: JSON.stringify({ data: { nombre, mensaje } }),
        });
        setLoading(false);
        if (res.ok) {
            router.push(&quot;/cartas&quot;);
        } else {
            alert(&quot;Error al enviar la carta&quot;);
        }
    };

    return (
        <form onSubmit={handleSubmit} className=&quot;space-y-4 max-w-md mx-auto&quot;>
            <input className=&quot;w-full border border-[#ffe6a0] rounded px-3 py-2&quot; value={nombre} onChange={e => setNombre(e.target.value)} placeholder=&quot;Nombre&quot; required />
            <textarea className=&quot;w-full border border-[#ffe6a0] rounded px-3 py-2&quot; value={mensaje} onChange={e => setMensaje(e.target.value)} placeholder=&quot;Mensaje&quot; required />
            <button type=&quot;submit&quot; className=&quot;w-full py-2 rounded-full bg-[#ffe6a0] text-[#8B2C3B] font-bold shadow-sm transition hover:bg-[#ffda6a]&quot; disabled={loading}>
                {loading ? &quot;Enviando...&quot; : &quot;Enviar carta&quot;}
            </button>
        </form>
    );
}