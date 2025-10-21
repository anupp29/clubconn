"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertTriangle, Trash2, Mail, UserCheck } from "lucide-react"

interface BulkActionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  items: Array<{ id: string; name: string }>
  action: "delete" | "email" | "approve" | "reject"
  onConfirm: (selectedIds: string[]) => void
}

export function BulkActionDialog({ open, onOpenChange, items, action, onConfirm }: BulkActionDialogProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const actionConfig = {
    delete: {
      icon: Trash2,
      title: "Delete Items",
      description: "Are you sure you want to delete the selected items? This action cannot be undone.",
      buttonText: "Delete",
      buttonVariant: "destructive" as const,
    },
    email: {
      icon: Mail,
      title: "Send Email",
      description: "Send an email notification to the selected recipients.",
      buttonText: "Send Email",
      buttonVariant: "default" as const,
    },
    approve: {
      icon: UserCheck,
      title: "Approve Items",
      description: "Approve the selected items and notify the users.",
      buttonText: "Approve",
      buttonVariant: "default" as const,
    },
    reject: {
      icon: AlertTriangle,
      title: "Reject Items",
      description: "Reject the selected items and notify the users.",
      buttonText: "Reject",
      buttonVariant: "destructive" as const,
    },
  }

  const config = actionConfig[action]
  const Icon = config.icon

  const toggleAll = () => {
    if (selectedIds.length === items.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(items.map((item) => item.id))
    }
  }

  const toggleItem = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const handleConfirm = async () => {
    setLoading(true)
    try {
      await onConfirm(selectedIds)
      onOpenChange(false)
      setSelectedIds([])
    } catch (error) {
      console.error("[v0] Error performing bulk action:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon className="h-5 w-5" />
            {config.title}
          </DialogTitle>
          <DialogDescription>{config.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b">
            <Checkbox checked={selectedIds.length === items.length} onCheckedChange={toggleAll} />
            <span className="text-sm font-medium">
              Select All ({selectedIds.length}/{items.length})
            </span>
          </div>

          <div className="max-h-[300px] overflow-y-auto space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-2 p-2 rounded hover:bg-muted">
                <Checkbox checked={selectedIds.includes(item.id)} onCheckedChange={() => toggleItem(item.id)} />
                <span className="text-sm">{item.name}</span>
              </div>
            ))}
          </div>

          {action === "delete" && selectedIds.length > 0 && (
            <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <p>Warning: This action cannot be undone. {selectedIds.length} items will be permanently deleted.</p>
            </div>
          )}

          <div className="flex gap-3">
            <Button
              onClick={handleConfirm}
              disabled={loading || selectedIds.length === 0}
              variant={config.buttonVariant}
              className="flex-1"
            >
              {loading ? "Processing..." : `${config.buttonText} (${selectedIds.length})`}
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
