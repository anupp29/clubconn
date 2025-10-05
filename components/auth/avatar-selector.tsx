"use client"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { DEFAULT_AVATARS } from "@/lib/default-avatars"
import { Check } from "lucide-react"

interface AvatarSelectorProps {
  selectedAvatar: string
  onSelect: (avatarId: string) => void
  disabled?: boolean
}

export function AvatarSelector({ selectedAvatar, onSelect, disabled }: AvatarSelectorProps) {
  return (
    <div className="space-y-3">
      <Label>Choose Your Avatar</Label>
      <div className="grid grid-cols-4 gap-3">
        {DEFAULT_AVATARS.map((avatar) => (
          <button
            key={avatar.id}
            type="button"
            onClick={() => onSelect(avatar.id)}
            disabled={disabled}
            className="relative group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Avatar className="h-16 w-16 border-2 transition-all group-hover:border-primary">
              <AvatarImage src={avatar.url || "/placeholder.svg"} alt={avatar.name} />
              <AvatarFallback>{avatar.name[0]}</AvatarFallback>
            </Avatar>
            {selectedAvatar === avatar.id && (
              <div className="absolute inset-0 flex items-center justify-center bg-primary/20 rounded-full">
                <div className="bg-primary rounded-full p-1">
                  <Check className="h-4 w-4 text-primary-foreground" />
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
