import { Icon } from '@iconify/react'

const illustrations = [
  { icon: 'game-icons:fork-knife-spoon', className: 'home-illus home-illus-a', label: 'Cutlery illustration' },
  { icon: 'mdi:chef-hat', className: 'home-illus home-illus-b', label: 'Chef hat illustration' },
  { icon: 'game-icons:wine-glass', className: 'home-illus home-illus-c', label: 'Wine glass illustration' },
  { icon: 'game-icons:cocktail', className: 'home-illus home-illus-d', label: 'Cocktail illustration' },
  { icon: 'game-icons:meal', className: 'home-illus home-illus-e', label: 'Dining plate illustration' },
  { icon: 'mdi:silverware-fork-knife', className: 'home-illus home-illus-f', label: 'Fork and knife illustration' },
  { icon: 'game-icons:whisk', className: 'home-illus home-illus-g', label: 'Whisk illustration' },
  { icon: 'game-icons:cloche', className: 'home-illus home-illus-h', label: 'Serving cloche illustration' },
]

export default function HomeRestaurantIllustrations() {
  return (
    <div className="home-restaurant-illustrations" aria-hidden="true">
      {illustrations.map(({ icon, className, label }) => (
        <Icon key={className} icon={icon} className={className} aria-label={label} />
      ))}
    </div>
  )
}
