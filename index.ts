import { pipe } from "@effect/data/Function";
import * as A from "@effect/data/ReadonlyArray";
import * as O from "@effect/data/Option";

type User = {
  id: string;
};

type Users = Array<User>;

type Output = Array<{ organization: string; priority: number }>;

// export function transformUser(users: Users): Output {
//   const [user, ...rest] = users;
//
//   const [prefix, priority] = user.id.split("_");
//
//   return [{ organization: prefix, priority: priority }, ...transformUser(rest)];
// }

const users: Users = [
  { id: "breno_1" },
  { id: "breno_2" },
  { id: "somethingelse" },
];
export function transformUser(users: Users): Output {
  const transformation = pipe(
    users,
    A.head,
    O.fromNullable,
    O.map(({ id }) => {
      const [prefix, priority] = id.split("_");

      return {
        organization: pipe(
          prefix,
          O.fromNullable,
          O.match(
            () => "",
            (value) => value.toUpperCase(),
          ),
        ),
        priority: pipe(
          priority,
          O.fromNullable,
          O.match(
            () => 99,
            (value) => +value,
          ),
        ),
      };
    }),
  );

  return pipe(
    transformation,
    O.fromNullable,
    O.match(
      () => [],
      (value) => [
        value,
        ...pipe(
          users,
          A.tail,
          O.match(() => [], transformUser),
        ),
      ],
    ),
  );
}

console.log(transformUser(users));
