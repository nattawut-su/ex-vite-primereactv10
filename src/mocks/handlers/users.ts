// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';
import { db, nextId } from '../db';
import type { User } from '../../model/User';

const API = '/api/users';

export const handlers = [
  // GET /api/users (list)
  http.get(API, ({ request }) => {
    // ตัวอย่างรองรับ ?q= สำหรับค้นหา
    const url = new URL(request.url);
    const q = url.searchParams.get('q')?.toLowerCase() || '';
    const items = q ? db.users.filter((u) => [u.name, u.email].some((v) => v.toLowerCase().includes(q))) : db.users;

    return HttpResponse.json(items, { status: 200 });
  }),

  // GET /api/users/:id
  http.get(`${API}/:id`, ({ params }) => {
    const id = Number(params.id);
    const user = db.users.find((u) => u.id === id);
    if (!user) return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    return HttpResponse.json(user, { status: 200 });
  }),

  // POST /api/users
  http.post(API, async ({ request }) => {
    const body = (await request.json()) as Partial<User>;

    // validation ง่าย ๆ
    if (!body?.name || !body?.email) {
      return HttpResponse.json({ message: 'name & email required' }, { status: 400 });
    }
    const exists = db.users.some((u) => u.email === body.email);
    if (exists) {
      return HttpResponse.json({ message: 'email already used' }, { status: 409 });
    }

    const newUser: User = { id: nextId(), name: body.name, email: body.email };
    db.users.push(newUser);
    // สไตล์ REST: ส่ง 201 + Location header
    return HttpResponse.json(newUser, {
      status: 201,
      headers: { Location: `${API}/${newUser.id}` },
    });
  }),

  // PUT /api/users/:id (แทนทั้ง object)
  http.put(`${API}/:id`, async ({ params, request }) => {
    const id = Number(params.id);
    const body = (await request.json()) as Partial<User>;

    const idx = db.users.findIndex((u) => u.id === id);
    if (idx === -1) return HttpResponse.json({ message: 'Not found' }, { status: 404 });

    if (!body?.name || !body?.email) {
      return HttpResponse.json({ message: 'name & email required' }, { status: 400 });
    }

    // ห้ามชน email กับ record อื่น
    const emailCollision = db.users.some((u) => u.email === body.email && u.id !== id);
    if (emailCollision) {
      return HttpResponse.json({ message: 'email already used' }, { status: 409 });
    }

    db.users[idx] = { id, name: body.name, email: body.email } as User;
    return HttpResponse.json(db.users[idx], { status: 200 });
  }),

  // PATCH /api/users/:id (แก้บางส่วน)
  http.patch(`${API}/:id`, async ({ params, request }) => {
    const id = Number(params.id);
    const body = (await request.json()) as Partial<User>;

    const idx = db.users.findIndex((u) => u.id === id);
    if (idx === -1) return HttpResponse.json({ message: 'Not found' }, { status: 404 });

    if (body.email) {
      const emailCollision = db.users.some((u) => u.email === body.email && u.id !== id);
      if (emailCollision) {
        return HttpResponse.json({ message: 'email already used' }, { status: 409 });
      }
    }

    db.users[idx] = { ...db.users[idx], ...body };
    return HttpResponse.json(db.users[idx], { status: 200 });
  }),

  // DELETE /api/users/:id
  http.delete(`${API}/:id`, ({ params }) => {
    const id = Number(params.id);
    const idx = db.users.findIndex((u) => u.id === id);
    if (idx === -1) return HttpResponse.json({ message: 'Not found' }, { status: 404 });

    db.users.splice(idx, 1);
    // 204 no content
    return new HttpResponse(null, { status: 204 });
  }),
];
