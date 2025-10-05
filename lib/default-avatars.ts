// Default avatar options for users
export const DEFAULT_AVATARS = [
  {
    id: "avatar-1",
    url: "/professional-avatar-blue-gradient.jpg",
    name: "Blue Gradient",
  },
  {
    id: "avatar-2",
    url: "/professional-avatar-purple-gradient.jpg",
    name: "Purple Gradient",
  },
  {
    id: "avatar-3",
    url: "/professional-avatar-green-gradient.jpg",
    name: "Green Gradient",
  },
  {
    id: "avatar-4",
    url: "/professional-avatar-orange-gradient.jpg",
    name: "Orange Gradient",
  },
  {
    id: "avatar-5",
    url: "/professional-avatar-teal-gradient.jpg",
    name: "Teal Gradient",
  },
  {
    id: "avatar-6",
    url: "/professional-avatar-pink-gradient.jpg",
    name: "Pink Gradient",
  },
  {
    id: "avatar-7",
    url: "/professional-avatar-red-gradient.jpg",
    name: "Red Gradient",
  },
  {
    id: "avatar-8",
    url: "/professional-avatar-yellow-gradient.jpg",
    name: "Yellow Gradient",
  },
]

export function getDefaultAvatar(id: string): string {
  const avatar = DEFAULT_AVATARS.find((a) => a.id === id)
  return avatar?.url || DEFAULT_AVATARS[0].url
}
