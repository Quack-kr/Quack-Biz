import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'

import router from 'routes'

function App() {
  return (
    <Suspense fallback={<div className="mt-20 text-center">로딩 중...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App
