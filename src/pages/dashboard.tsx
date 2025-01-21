import ProtectedRoute from '../components/ProtectedRoute'

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-900">
        {/* Your dashboard content */}
      </div>
    </ProtectedRoute>
  )
}
