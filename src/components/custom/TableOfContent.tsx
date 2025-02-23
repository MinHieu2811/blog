import React, { useEffect, useMemo, useState } from 'react'

type TableOfContentProps = {
  className?: string
  headings?: Array<{
    text: string
    level: number
  }>
}

const TableOfContent = ({ className, headings = [] }: TableOfContentProps) => {
  const [activeId, setActiveId] = useState<string>("");
  const transformedHeading = useMemo(() => headings?.filter((head) => head?.level > 1)?.map((i) => ({
    ...i,
    query: i?.text?.split(" ")?.map((e) => e?.toLocaleLowerCase())?.join("-")
  })), [headings])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2; // Lấy vị trí giữa màn hình
      let closestSection = "";
      let minDistance = Number.MAX_VALUE;

      document.querySelectorAll("h2, h3").forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        const distance = Math.abs(scrollPosition - sectionTop);

        if (distance < minDistance) {
          minDistance = distance;
          closestSection = section.id;
        }
      });

      setActiveId(closestSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = (event: React.MouseEvent, id: string) => {
    event.preventDefault()

    const section = document.getElementById(id)
    if (section) {
      const offset = 80
      const sectionPosition = section.getBoundingClientRect().top + window.scrollY - offset

      window.scrollTo({
        top: sectionPosition,
        behavior: 'smooth'
      })
    }
  }
  return (
    <div className={`sticky ${className} right-0 top-6`}>
      <nav className="toc">
        <p>Table of Contents</p>
        <ul>
          {transformedHeading?.map((heading, index) => (
            <li key={index} className='cursor-pointer' style={{ marginLeft: `${(heading?.level - 1) * 16}px` }}>
              <p onClick={(e) => handleScroll(e, heading?.query)}>{heading?.text}</p>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default TableOfContent
