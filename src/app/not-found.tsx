import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-extralight text-white mb-4">404</h1>
        <p className="text-white/70 text-lg mb-8">Страница не найдена</p>
        <Link href="/" className="px-8 py-3 rounded-full border border-white/30 bg-white/10 text-white text-sm tracking-wide hover:bg-white/20 transition-colors">
          На главную
        </Link>
      </div>
    </div>
  )
}
