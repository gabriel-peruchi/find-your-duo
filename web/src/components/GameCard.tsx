interface GameCardProps {
  ads: number,
  title: string,
  imageUrl: string,
}

export function GameCard({ ads, title, imageUrl }: GameCardProps) {
  return (
    <a className="relative rounded-lg overflow-hidden">
      <img src={imageUrl} />

      <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
        <strong className="font-bold text-white block">{title}</strong>
        <span className="text-zinc-300 text-sm block">{ads} anúncios</span>
      </div>
    </a>
  )
}