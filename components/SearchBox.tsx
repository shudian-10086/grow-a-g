'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface SearchBoxProps {
  placeholder?: string
  onSearch: (query: string) => void
  className?: string
}

export function SearchBox({ 
  placeholder = "Search recipes, ingredients...", 
  onSearch,
  className 
}: SearchBoxProps) {
  const [query, setQuery] = useState('')

  const handleSearch = (value: string) => {
    setQuery(value)
    onSearch(value)
  }

  return (
    <div className={cn('relative', className)}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={placeholder}
        className="pl-10 h-12 text-base"
      />
    </div>
  )
}