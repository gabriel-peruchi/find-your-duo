interface GameCardProps {
  title: string,
  adsCount: number,
  imageUrl: string,
}

export function GameCard({ adsCount, title, imageUrl }: GameCardProps) {
  return (
    <a className="relative rounded-lg overflow-hidden">
      <img src={imageUrl} />

      <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
        <strong className="font-bold text-white block">{title}</strong>
        <span className="text-zinc-300 text-sm block">{adsCount} anúncio(s)</span>
      </div>
    </a>
  )
}