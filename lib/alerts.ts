'use client'

import * as React from 'react'
import { Alert } from '@/components/ui/alert'
import { createRoot } from 'react-dom/client'
import { XCircle } from 'lucide-react'

type AlertType = 'default' | 'destructive'

let alertContainer: HTMLElement | null = null
let timeoutId: NodeJS.Timeout | null = null

function getAlertContainer() {
  if (!alertContainer) {
    alertContainer = document.getElementById('alert-container')
  }
  return alertContainer
}

export function showAlert(message: string, type: AlertType = 'default', duration = 5000) {
  const container = getAlertContainer()
  if (!container) return

  // Clear existing timeout if any
  if (timeoutId) {
    clearTimeout(timeoutId)
  }

  // Create a new div for this alert
  const alertDiv = document.createElement('div')
  container.appendChild(alertDiv)

  // Create a function to remove this specific alert
  const removeAlert = () => {
    if (alertDiv.parentElement === container) {
      container.removeChild(alertDiv)
    }
  }

  // Render the alert using React
  const root = createRoot(alertDiv)
  const element = React.createElement(Alert, {
    variant: type,
    className: "flex items-center justify-between",
    children: [
      React.createElement('span', { key: 'message' }, message),
      React.createElement('button', {
        key: 'close',
        onClick: removeAlert,
        className: "ml-2 hover:opacity-80",
        children: React.createElement(XCircle, { className: "h-4 w-4" })
      })
    ]
  })
  root.render(element)

  // Set timeout to remove the alert
  timeoutId = setTimeout(() => {
    removeAlert()
  }, duration)
} 