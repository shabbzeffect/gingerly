// Prisma client stub — allows build to succeed without `prisma generate`.
// At runtime, database operations return empty results.
// Run `npx prisma generate` and `npx prisma db push` with a real database for production.

const empty = [];
const nullItem = null;

function makeModel() {
  return new Proxy(
    {},
    {
      get(_, prop) {
        if (prop === Symbol.toStringTag) return "ModelStub";
        if (prop === "findMany") return async () => empty;
        if (prop === "findUnique") return async () => nullItem;
        if (prop === "findFirst") return async () => nullItem;
        if (prop === "create") return async () => nullItem;
        if (prop === "update") return async () => nullItem;
        if (prop === "delete") return async () => nullItem;
        if (prop === "count") return async () => 0;
        if (prop === "aggregate") return async () => ({});
        if (prop === "upsert") return async () => nullItem;
        return async () => empty;
      },
    }
  );
}

const models = {
  admin: makeModel(),
  session: makeModel(),
  auditLog: makeModel(),
  setting: makeModel(),
  consultationEnquiry: makeModel(),
  virtualFittingSubmission: makeModel(),
  lookbookProject: makeModel(),
  lookbookImage: makeModel(),
  ceremonyPage: makeModel(),
  service: makeModel(),
  fAQ: makeModel(),
  rentalItem: makeModel(),
  rentalImage: makeModel(),
  rentalEnquiry: makeModel(),
  contactMessage: makeModel(),
};

const prisma = new Proxy(
  {},
  {
    get(_, prop) {
      if (prop === "$connect") return async () => {};
      if (prop === "$disconnect") return async () => {};
      if (prop === "$transaction") return async (tx) => tx;
      if (models[prop]) return models[prop];
      return undefined;
    },
  }
);

module.exports = { PrismaClient: class { constructor() { return prisma; } }, prisma };
