import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '../ui/badge'
import { Separator } from '../ui/separator'
import { format } from 'date-fns'
import ListingCompo from './ListingCompo'

type CardProps = {
  title?: string
  tag?: string[]
  image?: string
  link?: string
  publishedAt?: Date
  className?: string
}

const MainCard = ({ title, tag = [], image, link, publishedAt, className }: CardProps) => {
  return (
    <Card className={className}>
      <CardContent className="rounded-t-lg">
        <Image src={image ?? ''} alt={title ?? ''} fill />
      </CardContent>
      <CardFooter>
        <div className="flex">
          <ListingCompo list={tag} renderItem={(tag) => <Badge key={tag}>{tag}</Badge>} />
          {tag?.length > 0 && <Separator orientation="vertical" />}
          <div className="flex">
            <p>{format(publishedAt ?? new Date(), 'dd MMM')}</p>
          </div>
        </div>
        <CardTitle>
          <Link href={link ?? ''}>{title ?? ''}</Link>
        </CardTitle>
      </CardFooter>
    </Card>
  )
}

const SubCard = ({
  className,
  title,
  tag = [],
  image,
  link,
  publishedAt,
  placeHeader
}: CardProps & { placeHeader?: 'top' | 'bottom' }) => {
  return (
    <Card className={className}>
      {placeHeader == 'top' && (
        <CardHeader>
          <div className="flex">
            <ListingCompo list={tag} renderItem={(tag) => <Badge key={tag}>{tag}</Badge>} />
            {tag?.length > 0 && <Separator orientation="vertical" />}
            <div className="flex">
              <p>{format(publishedAt ?? new Date(), 'dd MMM')}</p>
            </div>
          </div>
          <CardTitle>
            <Link href={link ?? ''}>{title ?? ''}</Link>
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className="rounded-t-lg">
        <Image src={image ?? ''} alt={title ?? ''} fill />
      </CardContent>
      {placeHeader == 'bottom' && (
        <CardFooter>
          <div className="flex">
            <ListingCompo list={tag} renderItem={(tag) => <Badge key={tag}>{tag}</Badge>} />
            {tag?.length > 0 && <Separator orientation="vertical" />}
            <div className="flex">
              <p>{format(publishedAt ?? new Date(), 'dd MMM')}</p>
            </div>
          </div>
          <CardTitle>
            <Link href={link ?? ''}>{title ?? ''}</Link>
          </CardTitle>
        </CardFooter>
      )}
    </Card>
  )
}

const SuggestCard = () => {
  return <div>Card</div>
}

export { MainCard, SubCard, SuggestCard }
