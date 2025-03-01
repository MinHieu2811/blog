import { useState } from 'react'
import { useSpring, animated } from '@react-spring/web'

const SPRING_CONFIG = {
  tension: 300,
  friction: 16,
}

const CopyIcon = () => {
  const [clicked, setClicked] = useState(false)

  const props = useSpring({
    y: clicked ? -4 : 0,
    scale: clicked ? 0.9 : 1,
    color: clicked ? 'green' : 'currentColor',
    config: SPRING_CONFIG,
    onRest: () => setClicked(false)
  })

  return (
    <animated.svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLineJoin="round"
      className="lucide lucide-copy"
    >
      <animated.rect {...props} />
      <animated.path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </animated.svg>
  )
}

export default CopyIcon