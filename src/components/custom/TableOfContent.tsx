import { motion } from 'framer-motion'
import React, { useEffect, useMemo, useState } from 'react'

type TableOfContentProps = {
  className?: string
  headings?: Array<{
    text: string
    level: number
  }>
}

const TableOfContent = ({ className, headings = [] }: TableOfContentProps) => {
  const [activeId, setActiveId] = useState<string>('')
  const transformedHeading = useMemo(
    () =>
      headings
        ?.filter((head) => head?.level > 1)
        ?.map((i) => ({
          ...i,
          query: i?.text
            ?.split(' ')
            ?.map((e) => e?.toLocaleLowerCase())
            ?.join('-')
        })),
    [headings]
  )

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollPosition = window.scrollY + window.innerHeight / 2 // Lấy vị trí giữa màn hình
  //     let closestSection = ''
  //     let minDistance = Number.MIN_VALUE

  //     document.querySelectorAll('h2, h3').forEach((section) => {
  //       const sectionTop = section.getBoundingClientRect().top + window.scrollY
  //       const distance = Math.abs(scrollPosition - sectionTop)

  //       if (distance < minDistance) {
  //         minDistance = distance
  //         closestSection = section.id
  //       }
  //     })

  //     setActiveId(closestSection)
  //   }

  //   window.addEventListener('scroll', handleScroll)
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll)
  //   }
  // }, [])

  useEffect(() => {
    const headingElements = Array.from(document.querySelectorAll("h2, h3, h4"));

    const handleScroll = () => {
      let closestHeading: string | null = null;
      let closestDistance = Number.POSITIVE_INFINITY;

      headingElements.forEach((heading) => {
        const rect = heading.getBoundingClientRect();
        const distance = Math.abs(rect.top); // Khoảng cách so với mép trên viewport

        if (rect.top >= 0 && distance < closestDistance) {
          closestDistance = distance;
          closestHeading = heading.id;
        }
      });

      setActiveId(closestHeading ?? '');
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = (event: React.MouseEvent, id: string) => {
    event.preventDefault()

    const section = document.getElementById(id)
    if (section) {
      section?.scrollIntoView({
        block: 'start',
        behavior: 'smooth'
      })
    }
  }
  return (
    <div className={`sticky ${className} right-0 top-6`}>
      <nav className="toc">
        <ul className="toc-item-wrapper">
          {transformedHeading?.map((heading, index) => (
            <li
              key={index}
              className={`cursor-pointer toc-item-wrapper mb-2 ${activeId === heading?.query ? 'active' : ''}`}
              style={{ marginLeft: `${(heading?.level - 1) * 16}px` }}
            >
              {heading?.query === activeId && (
                <motion.div
                  layoutId="activeIndicator"
                  className="active-indicator"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                />
              )}
              <p
                className={`toc-item ${heading?.query === activeId ? 'active' : ''}`}
                onClick={(e) => handleScroll(e, heading?.query)}
              >
                {heading?.text}
              </p>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default TableOfContent
