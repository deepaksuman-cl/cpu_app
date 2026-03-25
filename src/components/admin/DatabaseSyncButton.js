"use client"

import syncSystemDatabase from "@/lib/actions/systemActions"
import { useState } from "react"
import toast from "react-hot-toast"

const DatabaseSyncButton = () => {
  const [isLoading, setLoading] = useState(false)

  const handleSync = async () => {
    try {
      setLoading(true)
      const res = await syncSystemDatabase()
      
      if (res?.success) {
        toast.success(res.message || "Database synced successfully")
      } else {
        toast.error(res?.message || "Sync Failed")
      }
    } catch (error) {
      console.error("Sync Failed:", error)
      toast.error("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleSync}
      disabled={isLoading}
      className="border p-3 bg-black text-white rounded-md disabled:opacity-50"
    >
      {isLoading ? "Syncing..." : "Sync Database"}
    </button>
  )
}

export default DatabaseSyncButton