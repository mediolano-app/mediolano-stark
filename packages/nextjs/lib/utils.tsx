type ClassValue = string | { [key: string]: boolean } | undefined | null

export function cn(...classes: ClassValue[]) {
  return classes
    .flatMap(cls => 
      typeof cls === 'string' 
        ? cls 
        : cls instanceof Object 
          ? Object.entries(cls)
              .filter(([, value]) => Boolean(value))
              .map(([key]) => key)
          : []
    )
    .filter(Boolean)
    .join(' ')
}