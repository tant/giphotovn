'use client';

import PasswordForm from '@/components/PasswordForm';

export default function EventPasswordGate({ slug }: { slug: string }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-10">
          <div className="mb-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-900/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="mt-4 text-xl font-bold text-zinc-900 dark:text-white">
              Nhập mật khẩu để xem ảnh
            </h2>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Vui lòng nhập mật khẩu được cung cấp để truy cập ảnh sự kiện
            </p>
          </div>
          <div className="flex justify-center">
            <PasswordForm slug={slug} />
          </div>
        </div>
      </div>
    </div>
  );
}
