'use client'

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl font-extralight text-white mb-4">Ошибка</h1>
        <p className="text-white/70 mb-8">Что-то пошло не так</p>
        <button onClick={() => reset()} className="px-8 py-3 rounded-full border border-white/30 bg-white/10 text-white text-sm tracking-wide hover:bg-white/20 transition-colors">
          Попробовать снова
        </button>
      </div>
    </div>
  )
}
