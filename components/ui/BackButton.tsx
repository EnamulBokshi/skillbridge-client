
"use client"

import { ArrowLeft } from 'lucide-react'
import { Button } from './button'

export default function BackButton() {
  return (
    <Button variant="outline" onClick={() => window.history.back()} className="mb-4">
      <ArrowLeft className="h-4 w-4" />
      
    </Button>
  )
}
