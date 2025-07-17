export default function OverlayLoadingSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="size-10 animate-spin rounded-full border-4 border-yellow-300 border-t-transparent"></div>
    </div>
  )
}
