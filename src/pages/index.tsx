import { MainCard, SubCard } from '@/components/custom/Card'

const fakeData = {
  main: {
    title: 'Lorem ipsum dolor sit amet ',
    image: '',
    link: '/',
    publishedAt: new Date(),
    tag: ['tag1', 'tag2', 'tag3']
  },
  sub1: {
    title: 'Lorem ipsum dolor sit amet ',
    image: '',
    link: '/',
    publishedAt: new Date(),
    tag: ['tag1', 'tag2', 'tag3']
  },
  sub2: {
    title: 'Lorem ipsum dolor sit amet ',
    image: '',
    link: '/',
    publishedAt: new Date(),
    tag: ['tag1', 'tag2', 'tag3']
  },
  sub3: {
    title: 'Lorem ipsum dolor sit amet ',
    image: '',
    link: '/',
    publishedAt: new Date(),
    tag: ['tag1', 'tag2', 'tag3']
  },
  sub4: {
    title: 'Lorem ipsum dolor sit amet ',
    image: '',
    link: '/',
    publishedAt: new Date(),
    tag: []
  }
}

export default function Home() {
  return (
    <div className="container">
      <div className="grid-masonry-container">
        <MainCard {...fakeData.main} className="grid-item large" />
        <SubCard {...fakeData.sub1} className="grid-item medium" placeHeader="top" />
        <SubCard {...fakeData.sub2} className="grid-item medium" placeHeader="bottom" />
        <SubCard {...fakeData.sub3} className="grid-item small" placeHeader='top'/>
        <SubCard {...fakeData.sub4} className="grid-item tags" />
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  try {
    const res = await fetch('/api/list-post')
    const data = await res.json()
    return {
      props: {
        data
      }
    }
  } catch (error) {
    console.error(error)
    return {
      props: {
        error: 'Failed to fetch data'
      }
    }
  }
}
