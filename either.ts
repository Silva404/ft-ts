import { liftThrowable } from "@effect/data/Option";

const safeJsonParse = liftThrowable(
  (value: string) => JSON.parse(value) as { foo: string },
  (error: string) => { new Error(error);
  },
);
