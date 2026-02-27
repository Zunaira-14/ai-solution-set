// src/components/ToolCard.js
export default function ToolCard({ name, desc, icon, link }) {
  return (
    <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
       {icon}
       <h3 className="text-xl font-bold mt-4">{name}</h3>
       <p className="text-gray-400 text-sm">{desc}</p>
       <Link href={link} className="text-indigo-500 mt-4 block">Launch Tool →</Link>
    </div>
  );
}
