import { AlignJustify } from 'lucide-react'
import React from 'react'

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTrigger } from '@/components/ui/sheet'

const HeaderMobile = () => {
  return (
    <div className="container py-2 px-2 flex justify-between items-center md:hidden">
      <div className="logo">LOGO</div>

      <Sheet>
        <SheetTrigger>
          <AlignJustify />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your account and remove your data from our
              servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default HeaderMobile
