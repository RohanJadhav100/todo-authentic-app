import { z } from "zod";

export const Foo = z.object({
  catId: z.string().optional(),
  identifier: z.string().optional(),
});

export type FooProps = z.infer<typeof Foo>;
