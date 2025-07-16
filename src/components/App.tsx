import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'

import router from '@/routes'

function App() {
  return (
    <Suspense
      fallback={
        <div className="mb-6 flex items-start gap-4 border-b border-b-quack-gray py-5 xl:mb-10 xl:ml-10 xl:p-0 xl:pb-4" />
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App
