import NextAuth from 'next-auth';
import SendGrid from 'next-auth/providers/sendgrid';

import { TypeORMAdapter } from '@auth/typeorm-adapter';
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [SendGrid({
    from: 'noreply@example.com',
  })],
  adapter: TypeORMAdapter({
    type: 'postgres',
    host: process.env.PG_MASTER_HOST!,
    port: parseInt(process.env.PG_MASTER_PORT!, 10),
    username: process.env.PG_USER!,
    password: process.env.PG_PASSWORD!,
    database: process.env.PG_DB!,
    synchronize: true,
  }),
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth
    },
    signIn({ user }) {
      return !!user.email?.endsWith('@gmail.com');
    },
  }
});
