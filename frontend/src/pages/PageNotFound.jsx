function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-rose-50">
      <h1 className="text-9xl font-dancing-script font-bold text-rose-300">404</h1>
      <h2 className="text-4xl font-playfair font-semibold text-rose-600 mt-4">Oops! Page Introuvable</h2>
      <p className="text-gray-600 mt-4 text-center max-w-md">Cette page n'existe pas, mais l'amour continue de fleurir. Retournez à l'accueil pour célébrer ce merveilleux mariage avec nous.</p>
      <a href="/" className="mt-8 px-8 py-3 bg-rose-400 text-white rounded-full hover:bg-rose-500 transition-colors font-semibold shadow-md hover:shadow-lg">
        Retour à l'Accueil
      </a>
      <div className="absolute opacity-20">
        <span className="text-8xl text-rose-300">♥</span>
      </div>
    </div>
  )
}
export default PageNotFound
