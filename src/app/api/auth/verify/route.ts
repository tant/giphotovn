import { NextRequest, NextResponse } from 'next/server';
import { findEventByPassword, verifyPasswordForSlug, generateCookieToken } from '@/lib/events';

export async function POST(request: NextRequest) {
  try {
    const { password, slug } = await request.json();

    if (!password) {
      return NextResponse.json({ success: false, error: 'Vui lòng nhập mật khẩu' });
    }

    let eventSlug: string;

    if (slug) {
      const valid = verifyPasswordForSlug(slug, password);
      if (!valid) {
        return NextResponse.json({ success: false, error: 'Mật khẩu không đúng' });
      }
      eventSlug = slug;
    } else {
      const event = findEventByPassword(password);
      if (!event) {
        return NextResponse.json({ success: false, error: 'Mật khẩu không đúng' });
      }
      eventSlug = event.slug;
    }

    const token = generateCookieToken(eventSlug);
    const response = NextResponse.json({ success: true, slug: eventSlug });

    response.cookies.set(`event_access_${eventSlug}`, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    });

    return response;
  } catch {
    return NextResponse.json({ success: false, error: 'Có lỗi xảy ra' }, { status: 500 });
  }
}
