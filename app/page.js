import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-6xl font-bold text-primary">GPTGuide</h1>
          <p className="py-6 text-lg leading-loose">
            {/* GPTGenius: Your AI language companin. Powered by OpenAI,
            it enhances your conversations, content creation, and more ! */}
            GPTGuide : Votre assistant IA de voyage. Augmenté par openAI,
            un monsieur-je-sais-tout qui vous conseillera quoi visiter partout et bien plus !
          </p>
          <Link href="/chat" className="btn btn-secondary">
            {/* get started */}
            commencer
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage