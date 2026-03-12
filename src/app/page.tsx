import PasswordForm from '@/components/PasswordForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Hero with gradient */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-4 -top-4 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -bottom-8 right-1/4 h-96 w-96 rounded-full bg-blue-300/20 blur-3xl" />
          <div className="absolute right-0 top-1/3 h-64 w-64 rounded-full bg-indigo-300/20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Nav */}
          <nav className="flex items-center justify-between py-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-white sm:text-2xl">Sports Moments</h1>
            </div>
          </nav>

          {/* Hero content */}
          <div className="pb-20 pt-12 text-center sm:pb-28 sm:pt-20">
            <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Khoảnh khắc của bạn,
              <br />
              <span className="text-blue-200">chúng tôi lưu giữ</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-blue-100/80 sm:text-xl">
              Tìm lại những khoảnh khắc đáng nhớ tại các giải chạy và sự kiện thể thao. Nhập mật khẩu sự kiện để xem ảnh của bạn.
            </p>

            {/* Password form card */}
            <div className="mx-auto mt-10 max-w-sm">
              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-md ring-1 ring-white/20">
                <PasswordForm />
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 80V40C240 70 480 20 720 40C960 60 1200 10 1440 40V80H0Z" className="fill-zinc-50 dark:fill-zinc-950" />
          </svg>
        </div>
      </div>

      {/* Features */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-16 sm:py-24">
          <div className="text-center">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Dễ dàng sử dụng
            </h3>
            <p className="mt-2 text-2xl font-bold text-zinc-900 dark:text-white sm:text-3xl">
              Tìm ảnh trong 3 bước
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {/* Step 1 */}
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-900/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <h4 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-white">Nhập mật khẩu</h4>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                Sử dụng mật khẩu được cung cấp bởi ban tổ chức sự kiện
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-900/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h4 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-white">Tìm theo số bib hoặc khuôn mặt</h4>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                Nhập số bib hoặc upload ảnh khuôn mặt để tìm kiếm nhanh
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-900/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <h4 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-white">Tải ảnh về</h4>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                Xem ảnh chất lượng cao và tải về miễn phí
              </p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="border-t border-zinc-200 py-16 dark:border-zinc-800 sm:py-20">
          <div className="mx-auto max-w-lg">
            <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-10">
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-bold text-zinc-900 dark:text-white">
                  Liên hệ nhiếp ảnh gia
                </h3>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  Đặt chụp ảnh sự kiện hoặc cần hỗ trợ? Liên hệ ngay!
                </p>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-4 rounded-xl bg-zinc-50 px-4 py-3 dark:bg-zinc-800/50">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Nhiếp ảnh gia</p>
                    <p className="font-semibold text-zinc-900 dark:text-white">Hải - Sports Moments</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl bg-zinc-50 px-4 py-3 dark:bg-zinc-800/50">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Điện thoại</p>
                    <p className="font-semibold text-zinc-900 dark:text-white">0909 123 456</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl bg-zinc-50 px-4 py-3 dark:bg-zinc-800/50">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/30">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Email</p>
                    <p className="font-semibold text-zinc-900 dark:text-white">hai@sportsmoments.vn</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl bg-zinc-50 px-4 py-3 dark:bg-zinc-800/50">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 dark:text-purple-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Facebook</p>
                    <p className="font-semibold text-zinc-900 dark:text-white">Sports Moments Photography</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white py-6 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-zinc-500 dark:text-zinc-400 sm:px-6 lg:px-8">
          <p>Sports Moments - Tìm kiếm ảnh thể thao theo số bib</p>
        </div>
      </footer>
    </div>
  );
}
