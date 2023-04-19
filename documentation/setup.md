### Apr 19th

I'm figuring out the markdown blog slowly and steadily.

Here's the flow


- PostMetric.tsx
  - usePostLikes.tsx (from lib)
    - api/likes/slug.ts prisma finally understanding
  - usePostViews.tsx (from lib)


so build backend first? keep modifying until needs are met.

`crypto` createHash
`prisma` - for backend
`zod` - backend type validation


so in prisma you can infer and that's insane lmeow.

also have to add `"postinstall": "prisma generate"`

```
Introspected 2 models and wrote them into prisma/schema.prisma in 1.66s
```

so that was insane.

very close, good inferring, but I actually need it for better needs.

installed `@prisma/client`

- Import the `PrismaClient` constructor from the `@prisma/client` node module
- Instantiate `PrismaClient`
- Define an `async` function named main to send queries to the database
- Connect to the database
- Call the `main` function
- Close the database connections when the script terminates


this is from the official documentation

in the space to write queries

okay so the route `/api/prismaTest/index.ts` doesn't work, I don't know the exact reason. But the way the blog has done it is different, because this is Next.js


create `lib/prisma.ts` in root, it also tacles some Next.js related issue with Prisma.

the difference between `[slug].js` and `[...slug].js` is that you receive string array in the latter

`prisma.post.upsert()` has where condition if satisfied updates, otherwise creates