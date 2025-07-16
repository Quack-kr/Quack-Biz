import { Link } from 'react-router-dom'

import { PATH } from '@/constants/path'

const randoms = [
  [1, 2],
  [3, 4, 5],
  [6, 7]
]

function NotFoundPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="flex h-screen flex-col items-center justify-center sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:static sm:px-6 lg:px-8">
          <div className="mx-auto sm:max-w-lg">
            <div className="my-4 flex items-center justify-center">
              <img
                src="/logo.svg"
                alt="꽥 플레이스"
                className="h-[56px] w-[60px] xl:h-[100px] xl:w-[110px]"
              />
            </div>
            <h1 className="mb-4 text-6xl font-extrabold tracking-tight text-quack-yellow">
              404
            </h1>
            <h2 className="mb-6 text-2xl font-semibold text-quack-white">
              페이지를 찾을 수 없습니다.
            </h2>
            <p className="mb-8 text-gray-500">
              요청하신 페이지가 존재하지 않거나, 이동하신 주소가 잘못되었습니다.
            </p>
            <Link
              to={PATH.home}
              className="inline-block rounded-md border border-transparent bg-quack-white px-8 py-3 text-center font-medium text-quack-black hover:bg-white focus:outline-none focus:ring-2 focus:ring-quack-yellow focus:ring-offset-2"
            >
              홈으로 돌아가기
            </Link>
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none mt-10 md:mt-0 lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
          >
            <div className="absolute sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
              <div className="flex items-center space-x-6 lg:space-x-8">
                {randoms.map((random, number) => (
                  <div
                    key={`random-${random[number]}`}
                    className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8"
                  >
                    {random.map((number) => (
                      <div
                        key={`random-${number}`}
                        className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100"
                      >
                        <img
                          src={`https://picsum.photos/600?random=${number}`}
                          alt=""
                          className="size-full bg-indigo-100 object-cover object-center"
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
