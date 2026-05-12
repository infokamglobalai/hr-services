
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model ResumeData
 * 
 */
export type ResumeData = $Result.DefaultSelection<Prisma.$ResumeDataPayload>
/**
 * Model CareerRoadmap
 * 
 */
export type CareerRoadmap = $Result.DefaultSelection<Prisma.$CareerRoadmapPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more ResumeData
 * const resumeData = await prisma.resumeData.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more ResumeData
   * const resumeData = await prisma.resumeData.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.resumeData`: Exposes CRUD operations for the **ResumeData** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ResumeData
    * const resumeData = await prisma.resumeData.findMany()
    * ```
    */
  get resumeData(): Prisma.ResumeDataDelegate<ExtArgs>;

  /**
   * `prisma.careerRoadmap`: Exposes CRUD operations for the **CareerRoadmap** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CareerRoadmaps
    * const careerRoadmaps = await prisma.careerRoadmap.findMany()
    * ```
    */
  get careerRoadmap(): Prisma.CareerRoadmapDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    ResumeData: 'ResumeData',
    CareerRoadmap: 'CareerRoadmap'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "resumeData" | "careerRoadmap"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      ResumeData: {
        payload: Prisma.$ResumeDataPayload<ExtArgs>
        fields: Prisma.ResumeDataFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ResumeDataFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeDataPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ResumeDataFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeDataPayload>
          }
          findFirst: {
            args: Prisma.ResumeDataFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeDataPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ResumeDataFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeDataPayload>
          }
          findMany: {
            args: Prisma.ResumeDataFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeDataPayload>[]
          }
          create: {
            args: Prisma.ResumeDataCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeDataPayload>
          }
          createMany: {
            args: Prisma.ResumeDataCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ResumeDataCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeDataPayload>[]
          }
          delete: {
            args: Prisma.ResumeDataDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeDataPayload>
          }
          update: {
            args: Prisma.ResumeDataUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeDataPayload>
          }
          deleteMany: {
            args: Prisma.ResumeDataDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ResumeDataUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ResumeDataUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumeDataPayload>
          }
          aggregate: {
            args: Prisma.ResumeDataAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateResumeData>
          }
          groupBy: {
            args: Prisma.ResumeDataGroupByArgs<ExtArgs>
            result: $Utils.Optional<ResumeDataGroupByOutputType>[]
          }
          count: {
            args: Prisma.ResumeDataCountArgs<ExtArgs>
            result: $Utils.Optional<ResumeDataCountAggregateOutputType> | number
          }
        }
      }
      CareerRoadmap: {
        payload: Prisma.$CareerRoadmapPayload<ExtArgs>
        fields: Prisma.CareerRoadmapFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CareerRoadmapFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerRoadmapPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CareerRoadmapFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerRoadmapPayload>
          }
          findFirst: {
            args: Prisma.CareerRoadmapFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerRoadmapPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CareerRoadmapFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerRoadmapPayload>
          }
          findMany: {
            args: Prisma.CareerRoadmapFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerRoadmapPayload>[]
          }
          create: {
            args: Prisma.CareerRoadmapCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerRoadmapPayload>
          }
          createMany: {
            args: Prisma.CareerRoadmapCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CareerRoadmapCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerRoadmapPayload>[]
          }
          delete: {
            args: Prisma.CareerRoadmapDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerRoadmapPayload>
          }
          update: {
            args: Prisma.CareerRoadmapUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerRoadmapPayload>
          }
          deleteMany: {
            args: Prisma.CareerRoadmapDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CareerRoadmapUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CareerRoadmapUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CareerRoadmapPayload>
          }
          aggregate: {
            args: Prisma.CareerRoadmapAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCareerRoadmap>
          }
          groupBy: {
            args: Prisma.CareerRoadmapGroupByArgs<ExtArgs>
            result: $Utils.Optional<CareerRoadmapGroupByOutputType>[]
          }
          count: {
            args: Prisma.CareerRoadmapCountArgs<ExtArgs>
            result: $Utils.Optional<CareerRoadmapCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model ResumeData
   */

  export type AggregateResumeData = {
    _count: ResumeDataCountAggregateOutputType | null
    _avg: ResumeDataAvgAggregateOutputType | null
    _sum: ResumeDataSumAggregateOutputType | null
    _min: ResumeDataMinAggregateOutputType | null
    _max: ResumeDataMaxAggregateOutputType | null
  }

  export type ResumeDataAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type ResumeDataSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type ResumeDataMinAggregateOutputType = {
    id: number | null
    userId: number | null
    fullName: string | null
    email: string | null
    phone: string | null
    summary: string | null
    skills: string | null
    workExp: string | null
    education: string | null
    templateId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ResumeDataMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    fullName: string | null
    email: string | null
    phone: string | null
    summary: string | null
    skills: string | null
    workExp: string | null
    education: string | null
    templateId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ResumeDataCountAggregateOutputType = {
    id: number
    userId: number
    fullName: number
    email: number
    phone: number
    summary: number
    skills: number
    workExp: number
    education: number
    templateId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ResumeDataAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type ResumeDataSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type ResumeDataMinAggregateInputType = {
    id?: true
    userId?: true
    fullName?: true
    email?: true
    phone?: true
    summary?: true
    skills?: true
    workExp?: true
    education?: true
    templateId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ResumeDataMaxAggregateInputType = {
    id?: true
    userId?: true
    fullName?: true
    email?: true
    phone?: true
    summary?: true
    skills?: true
    workExp?: true
    education?: true
    templateId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ResumeDataCountAggregateInputType = {
    id?: true
    userId?: true
    fullName?: true
    email?: true
    phone?: true
    summary?: true
    skills?: true
    workExp?: true
    education?: true
    templateId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ResumeDataAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ResumeData to aggregate.
     */
    where?: ResumeDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResumeData to fetch.
     */
    orderBy?: ResumeDataOrderByWithRelationInput | ResumeDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ResumeDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResumeData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResumeData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ResumeData
    **/
    _count?: true | ResumeDataCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ResumeDataAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ResumeDataSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ResumeDataMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ResumeDataMaxAggregateInputType
  }

  export type GetResumeDataAggregateType<T extends ResumeDataAggregateArgs> = {
        [P in keyof T & keyof AggregateResumeData]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateResumeData[P]>
      : GetScalarType<T[P], AggregateResumeData[P]>
  }




  export type ResumeDataGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResumeDataWhereInput
    orderBy?: ResumeDataOrderByWithAggregationInput | ResumeDataOrderByWithAggregationInput[]
    by: ResumeDataScalarFieldEnum[] | ResumeDataScalarFieldEnum
    having?: ResumeDataScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ResumeDataCountAggregateInputType | true
    _avg?: ResumeDataAvgAggregateInputType
    _sum?: ResumeDataSumAggregateInputType
    _min?: ResumeDataMinAggregateInputType
    _max?: ResumeDataMaxAggregateInputType
  }

  export type ResumeDataGroupByOutputType = {
    id: number
    userId: number
    fullName: string
    email: string
    phone: string | null
    summary: string | null
    skills: string
    workExp: string
    education: string
    templateId: string
    createdAt: Date
    updatedAt: Date
    _count: ResumeDataCountAggregateOutputType | null
    _avg: ResumeDataAvgAggregateOutputType | null
    _sum: ResumeDataSumAggregateOutputType | null
    _min: ResumeDataMinAggregateOutputType | null
    _max: ResumeDataMaxAggregateOutputType | null
  }

  type GetResumeDataGroupByPayload<T extends ResumeDataGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ResumeDataGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ResumeDataGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ResumeDataGroupByOutputType[P]>
            : GetScalarType<T[P], ResumeDataGroupByOutputType[P]>
        }
      >
    >


  export type ResumeDataSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    fullName?: boolean
    email?: boolean
    phone?: boolean
    summary?: boolean
    skills?: boolean
    workExp?: boolean
    education?: boolean
    templateId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["resumeData"]>

  export type ResumeDataSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    fullName?: boolean
    email?: boolean
    phone?: boolean
    summary?: boolean
    skills?: boolean
    workExp?: boolean
    education?: boolean
    templateId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["resumeData"]>

  export type ResumeDataSelectScalar = {
    id?: boolean
    userId?: boolean
    fullName?: boolean
    email?: boolean
    phone?: boolean
    summary?: boolean
    skills?: boolean
    workExp?: boolean
    education?: boolean
    templateId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $ResumeDataPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ResumeData"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      fullName: string
      email: string
      phone: string | null
      summary: string | null
      skills: string
      workExp: string
      education: string
      templateId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["resumeData"]>
    composites: {}
  }

  type ResumeDataGetPayload<S extends boolean | null | undefined | ResumeDataDefaultArgs> = $Result.GetResult<Prisma.$ResumeDataPayload, S>

  type ResumeDataCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ResumeDataFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ResumeDataCountAggregateInputType | true
    }

  export interface ResumeDataDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ResumeData'], meta: { name: 'ResumeData' } }
    /**
     * Find zero or one ResumeData that matches the filter.
     * @param {ResumeDataFindUniqueArgs} args - Arguments to find a ResumeData
     * @example
     * // Get one ResumeData
     * const resumeData = await prisma.resumeData.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResumeDataFindUniqueArgs>(args: SelectSubset<T, ResumeDataFindUniqueArgs<ExtArgs>>): Prisma__ResumeDataClient<$Result.GetResult<Prisma.$ResumeDataPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ResumeData that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ResumeDataFindUniqueOrThrowArgs} args - Arguments to find a ResumeData
     * @example
     * // Get one ResumeData
     * const resumeData = await prisma.resumeData.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResumeDataFindUniqueOrThrowArgs>(args: SelectSubset<T, ResumeDataFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ResumeDataClient<$Result.GetResult<Prisma.$ResumeDataPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ResumeData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeDataFindFirstArgs} args - Arguments to find a ResumeData
     * @example
     * // Get one ResumeData
     * const resumeData = await prisma.resumeData.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResumeDataFindFirstArgs>(args?: SelectSubset<T, ResumeDataFindFirstArgs<ExtArgs>>): Prisma__ResumeDataClient<$Result.GetResult<Prisma.$ResumeDataPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ResumeData that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeDataFindFirstOrThrowArgs} args - Arguments to find a ResumeData
     * @example
     * // Get one ResumeData
     * const resumeData = await prisma.resumeData.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResumeDataFindFirstOrThrowArgs>(args?: SelectSubset<T, ResumeDataFindFirstOrThrowArgs<ExtArgs>>): Prisma__ResumeDataClient<$Result.GetResult<Prisma.$ResumeDataPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ResumeData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeDataFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ResumeData
     * const resumeData = await prisma.resumeData.findMany()
     * 
     * // Get first 10 ResumeData
     * const resumeData = await prisma.resumeData.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const resumeDataWithIdOnly = await prisma.resumeData.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ResumeDataFindManyArgs>(args?: SelectSubset<T, ResumeDataFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResumeDataPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ResumeData.
     * @param {ResumeDataCreateArgs} args - Arguments to create a ResumeData.
     * @example
     * // Create one ResumeData
     * const ResumeData = await prisma.resumeData.create({
     *   data: {
     *     // ... data to create a ResumeData
     *   }
     * })
     * 
     */
    create<T extends ResumeDataCreateArgs>(args: SelectSubset<T, ResumeDataCreateArgs<ExtArgs>>): Prisma__ResumeDataClient<$Result.GetResult<Prisma.$ResumeDataPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ResumeData.
     * @param {ResumeDataCreateManyArgs} args - Arguments to create many ResumeData.
     * @example
     * // Create many ResumeData
     * const resumeData = await prisma.resumeData.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ResumeDataCreateManyArgs>(args?: SelectSubset<T, ResumeDataCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ResumeData and returns the data saved in the database.
     * @param {ResumeDataCreateManyAndReturnArgs} args - Arguments to create many ResumeData.
     * @example
     * // Create many ResumeData
     * const resumeData = await prisma.resumeData.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ResumeData and only return the `id`
     * const resumeDataWithIdOnly = await prisma.resumeData.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ResumeDataCreateManyAndReturnArgs>(args?: SelectSubset<T, ResumeDataCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResumeDataPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ResumeData.
     * @param {ResumeDataDeleteArgs} args - Arguments to delete one ResumeData.
     * @example
     * // Delete one ResumeData
     * const ResumeData = await prisma.resumeData.delete({
     *   where: {
     *     // ... filter to delete one ResumeData
     *   }
     * })
     * 
     */
    delete<T extends ResumeDataDeleteArgs>(args: SelectSubset<T, ResumeDataDeleteArgs<ExtArgs>>): Prisma__ResumeDataClient<$Result.GetResult<Prisma.$ResumeDataPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ResumeData.
     * @param {ResumeDataUpdateArgs} args - Arguments to update one ResumeData.
     * @example
     * // Update one ResumeData
     * const resumeData = await prisma.resumeData.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ResumeDataUpdateArgs>(args: SelectSubset<T, ResumeDataUpdateArgs<ExtArgs>>): Prisma__ResumeDataClient<$Result.GetResult<Prisma.$ResumeDataPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ResumeData.
     * @param {ResumeDataDeleteManyArgs} args - Arguments to filter ResumeData to delete.
     * @example
     * // Delete a few ResumeData
     * const { count } = await prisma.resumeData.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ResumeDataDeleteManyArgs>(args?: SelectSubset<T, ResumeDataDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ResumeData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeDataUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ResumeData
     * const resumeData = await prisma.resumeData.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ResumeDataUpdateManyArgs>(args: SelectSubset<T, ResumeDataUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ResumeData.
     * @param {ResumeDataUpsertArgs} args - Arguments to update or create a ResumeData.
     * @example
     * // Update or create a ResumeData
     * const resumeData = await prisma.resumeData.upsert({
     *   create: {
     *     // ... data to create a ResumeData
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ResumeData we want to update
     *   }
     * })
     */
    upsert<T extends ResumeDataUpsertArgs>(args: SelectSubset<T, ResumeDataUpsertArgs<ExtArgs>>): Prisma__ResumeDataClient<$Result.GetResult<Prisma.$ResumeDataPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ResumeData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeDataCountArgs} args - Arguments to filter ResumeData to count.
     * @example
     * // Count the number of ResumeData
     * const count = await prisma.resumeData.count({
     *   where: {
     *     // ... the filter for the ResumeData we want to count
     *   }
     * })
    **/
    count<T extends ResumeDataCountArgs>(
      args?: Subset<T, ResumeDataCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ResumeDataCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ResumeData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeDataAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ResumeDataAggregateArgs>(args: Subset<T, ResumeDataAggregateArgs>): Prisma.PrismaPromise<GetResumeDataAggregateType<T>>

    /**
     * Group by ResumeData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeDataGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ResumeDataGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ResumeDataGroupByArgs['orderBy'] }
        : { orderBy?: ResumeDataGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ResumeDataGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResumeDataGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ResumeData model
   */
  readonly fields: ResumeDataFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ResumeData.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ResumeDataClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ResumeData model
   */ 
  interface ResumeDataFieldRefs {
    readonly id: FieldRef<"ResumeData", 'Int'>
    readonly userId: FieldRef<"ResumeData", 'Int'>
    readonly fullName: FieldRef<"ResumeData", 'String'>
    readonly email: FieldRef<"ResumeData", 'String'>
    readonly phone: FieldRef<"ResumeData", 'String'>
    readonly summary: FieldRef<"ResumeData", 'String'>
    readonly skills: FieldRef<"ResumeData", 'String'>
    readonly workExp: FieldRef<"ResumeData", 'String'>
    readonly education: FieldRef<"ResumeData", 'String'>
    readonly templateId: FieldRef<"ResumeData", 'String'>
    readonly createdAt: FieldRef<"ResumeData", 'DateTime'>
    readonly updatedAt: FieldRef<"ResumeData", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ResumeData findUnique
   */
  export type ResumeDataFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeData
     */
    select?: ResumeDataSelect<ExtArgs> | null
    /**
     * Filter, which ResumeData to fetch.
     */
    where: ResumeDataWhereUniqueInput
  }

  /**
   * ResumeData findUniqueOrThrow
   */
  export type ResumeDataFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeData
     */
    select?: ResumeDataSelect<ExtArgs> | null
    /**
     * Filter, which ResumeData to fetch.
     */
    where: ResumeDataWhereUniqueInput
  }

  /**
   * ResumeData findFirst
   */
  export type ResumeDataFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeData
     */
    select?: ResumeDataSelect<ExtArgs> | null
    /**
     * Filter, which ResumeData to fetch.
     */
    where?: ResumeDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResumeData to fetch.
     */
    orderBy?: ResumeDataOrderByWithRelationInput | ResumeDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ResumeData.
     */
    cursor?: ResumeDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResumeData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResumeData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ResumeData.
     */
    distinct?: ResumeDataScalarFieldEnum | ResumeDataScalarFieldEnum[]
  }

  /**
   * ResumeData findFirstOrThrow
   */
  export type ResumeDataFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeData
     */
    select?: ResumeDataSelect<ExtArgs> | null
    /**
     * Filter, which ResumeData to fetch.
     */
    where?: ResumeDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResumeData to fetch.
     */
    orderBy?: ResumeDataOrderByWithRelationInput | ResumeDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ResumeData.
     */
    cursor?: ResumeDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResumeData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResumeData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ResumeData.
     */
    distinct?: ResumeDataScalarFieldEnum | ResumeDataScalarFieldEnum[]
  }

  /**
   * ResumeData findMany
   */
  export type ResumeDataFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeData
     */
    select?: ResumeDataSelect<ExtArgs> | null
    /**
     * Filter, which ResumeData to fetch.
     */
    where?: ResumeDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResumeData to fetch.
     */
    orderBy?: ResumeDataOrderByWithRelationInput | ResumeDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ResumeData.
     */
    cursor?: ResumeDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResumeData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResumeData.
     */
    skip?: number
    distinct?: ResumeDataScalarFieldEnum | ResumeDataScalarFieldEnum[]
  }

  /**
   * ResumeData create
   */
  export type ResumeDataCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeData
     */
    select?: ResumeDataSelect<ExtArgs> | null
    /**
     * The data needed to create a ResumeData.
     */
    data: XOR<ResumeDataCreateInput, ResumeDataUncheckedCreateInput>
  }

  /**
   * ResumeData createMany
   */
  export type ResumeDataCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ResumeData.
     */
    data: ResumeDataCreateManyInput | ResumeDataCreateManyInput[]
  }

  /**
   * ResumeData createManyAndReturn
   */
  export type ResumeDataCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeData
     */
    select?: ResumeDataSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ResumeData.
     */
    data: ResumeDataCreateManyInput | ResumeDataCreateManyInput[]
  }

  /**
   * ResumeData update
   */
  export type ResumeDataUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeData
     */
    select?: ResumeDataSelect<ExtArgs> | null
    /**
     * The data needed to update a ResumeData.
     */
    data: XOR<ResumeDataUpdateInput, ResumeDataUncheckedUpdateInput>
    /**
     * Choose, which ResumeData to update.
     */
    where: ResumeDataWhereUniqueInput
  }

  /**
   * ResumeData updateMany
   */
  export type ResumeDataUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ResumeData.
     */
    data: XOR<ResumeDataUpdateManyMutationInput, ResumeDataUncheckedUpdateManyInput>
    /**
     * Filter which ResumeData to update
     */
    where?: ResumeDataWhereInput
  }

  /**
   * ResumeData upsert
   */
  export type ResumeDataUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeData
     */
    select?: ResumeDataSelect<ExtArgs> | null
    /**
     * The filter to search for the ResumeData to update in case it exists.
     */
    where: ResumeDataWhereUniqueInput
    /**
     * In case the ResumeData found by the `where` argument doesn't exist, create a new ResumeData with this data.
     */
    create: XOR<ResumeDataCreateInput, ResumeDataUncheckedCreateInput>
    /**
     * In case the ResumeData was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ResumeDataUpdateInput, ResumeDataUncheckedUpdateInput>
  }

  /**
   * ResumeData delete
   */
  export type ResumeDataDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeData
     */
    select?: ResumeDataSelect<ExtArgs> | null
    /**
     * Filter which ResumeData to delete.
     */
    where: ResumeDataWhereUniqueInput
  }

  /**
   * ResumeData deleteMany
   */
  export type ResumeDataDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ResumeData to delete
     */
    where?: ResumeDataWhereInput
  }

  /**
   * ResumeData without action
   */
  export type ResumeDataDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeData
     */
    select?: ResumeDataSelect<ExtArgs> | null
  }


  /**
   * Model CareerRoadmap
   */

  export type AggregateCareerRoadmap = {
    _count: CareerRoadmapCountAggregateOutputType | null
    _avg: CareerRoadmapAvgAggregateOutputType | null
    _sum: CareerRoadmapSumAggregateOutputType | null
    _min: CareerRoadmapMinAggregateOutputType | null
    _max: CareerRoadmapMaxAggregateOutputType | null
  }

  export type CareerRoadmapAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type CareerRoadmapSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type CareerRoadmapMinAggregateOutputType = {
    id: number | null
    userId: number | null
    targetRole: string | null
    milestones: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CareerRoadmapMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    targetRole: string | null
    milestones: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CareerRoadmapCountAggregateOutputType = {
    id: number
    userId: number
    targetRole: number
    milestones: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CareerRoadmapAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type CareerRoadmapSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type CareerRoadmapMinAggregateInputType = {
    id?: true
    userId?: true
    targetRole?: true
    milestones?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CareerRoadmapMaxAggregateInputType = {
    id?: true
    userId?: true
    targetRole?: true
    milestones?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CareerRoadmapCountAggregateInputType = {
    id?: true
    userId?: true
    targetRole?: true
    milestones?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CareerRoadmapAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CareerRoadmap to aggregate.
     */
    where?: CareerRoadmapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CareerRoadmaps to fetch.
     */
    orderBy?: CareerRoadmapOrderByWithRelationInput | CareerRoadmapOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CareerRoadmapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CareerRoadmaps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CareerRoadmaps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CareerRoadmaps
    **/
    _count?: true | CareerRoadmapCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CareerRoadmapAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CareerRoadmapSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CareerRoadmapMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CareerRoadmapMaxAggregateInputType
  }

  export type GetCareerRoadmapAggregateType<T extends CareerRoadmapAggregateArgs> = {
        [P in keyof T & keyof AggregateCareerRoadmap]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCareerRoadmap[P]>
      : GetScalarType<T[P], AggregateCareerRoadmap[P]>
  }




  export type CareerRoadmapGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CareerRoadmapWhereInput
    orderBy?: CareerRoadmapOrderByWithAggregationInput | CareerRoadmapOrderByWithAggregationInput[]
    by: CareerRoadmapScalarFieldEnum[] | CareerRoadmapScalarFieldEnum
    having?: CareerRoadmapScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CareerRoadmapCountAggregateInputType | true
    _avg?: CareerRoadmapAvgAggregateInputType
    _sum?: CareerRoadmapSumAggregateInputType
    _min?: CareerRoadmapMinAggregateInputType
    _max?: CareerRoadmapMaxAggregateInputType
  }

  export type CareerRoadmapGroupByOutputType = {
    id: number
    userId: number
    targetRole: string
    milestones: string
    createdAt: Date
    updatedAt: Date
    _count: CareerRoadmapCountAggregateOutputType | null
    _avg: CareerRoadmapAvgAggregateOutputType | null
    _sum: CareerRoadmapSumAggregateOutputType | null
    _min: CareerRoadmapMinAggregateOutputType | null
    _max: CareerRoadmapMaxAggregateOutputType | null
  }

  type GetCareerRoadmapGroupByPayload<T extends CareerRoadmapGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CareerRoadmapGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CareerRoadmapGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CareerRoadmapGroupByOutputType[P]>
            : GetScalarType<T[P], CareerRoadmapGroupByOutputType[P]>
        }
      >
    >


  export type CareerRoadmapSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    targetRole?: boolean
    milestones?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["careerRoadmap"]>

  export type CareerRoadmapSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    targetRole?: boolean
    milestones?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["careerRoadmap"]>

  export type CareerRoadmapSelectScalar = {
    id?: boolean
    userId?: boolean
    targetRole?: boolean
    milestones?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $CareerRoadmapPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CareerRoadmap"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      targetRole: string
      milestones: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["careerRoadmap"]>
    composites: {}
  }

  type CareerRoadmapGetPayload<S extends boolean | null | undefined | CareerRoadmapDefaultArgs> = $Result.GetResult<Prisma.$CareerRoadmapPayload, S>

  type CareerRoadmapCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CareerRoadmapFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CareerRoadmapCountAggregateInputType | true
    }

  export interface CareerRoadmapDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CareerRoadmap'], meta: { name: 'CareerRoadmap' } }
    /**
     * Find zero or one CareerRoadmap that matches the filter.
     * @param {CareerRoadmapFindUniqueArgs} args - Arguments to find a CareerRoadmap
     * @example
     * // Get one CareerRoadmap
     * const careerRoadmap = await prisma.careerRoadmap.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CareerRoadmapFindUniqueArgs>(args: SelectSubset<T, CareerRoadmapFindUniqueArgs<ExtArgs>>): Prisma__CareerRoadmapClient<$Result.GetResult<Prisma.$CareerRoadmapPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CareerRoadmap that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CareerRoadmapFindUniqueOrThrowArgs} args - Arguments to find a CareerRoadmap
     * @example
     * // Get one CareerRoadmap
     * const careerRoadmap = await prisma.careerRoadmap.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CareerRoadmapFindUniqueOrThrowArgs>(args: SelectSubset<T, CareerRoadmapFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CareerRoadmapClient<$Result.GetResult<Prisma.$CareerRoadmapPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CareerRoadmap that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerRoadmapFindFirstArgs} args - Arguments to find a CareerRoadmap
     * @example
     * // Get one CareerRoadmap
     * const careerRoadmap = await prisma.careerRoadmap.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CareerRoadmapFindFirstArgs>(args?: SelectSubset<T, CareerRoadmapFindFirstArgs<ExtArgs>>): Prisma__CareerRoadmapClient<$Result.GetResult<Prisma.$CareerRoadmapPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CareerRoadmap that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerRoadmapFindFirstOrThrowArgs} args - Arguments to find a CareerRoadmap
     * @example
     * // Get one CareerRoadmap
     * const careerRoadmap = await prisma.careerRoadmap.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CareerRoadmapFindFirstOrThrowArgs>(args?: SelectSubset<T, CareerRoadmapFindFirstOrThrowArgs<ExtArgs>>): Prisma__CareerRoadmapClient<$Result.GetResult<Prisma.$CareerRoadmapPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CareerRoadmaps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerRoadmapFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CareerRoadmaps
     * const careerRoadmaps = await prisma.careerRoadmap.findMany()
     * 
     * // Get first 10 CareerRoadmaps
     * const careerRoadmaps = await prisma.careerRoadmap.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const careerRoadmapWithIdOnly = await prisma.careerRoadmap.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CareerRoadmapFindManyArgs>(args?: SelectSubset<T, CareerRoadmapFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CareerRoadmapPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CareerRoadmap.
     * @param {CareerRoadmapCreateArgs} args - Arguments to create a CareerRoadmap.
     * @example
     * // Create one CareerRoadmap
     * const CareerRoadmap = await prisma.careerRoadmap.create({
     *   data: {
     *     // ... data to create a CareerRoadmap
     *   }
     * })
     * 
     */
    create<T extends CareerRoadmapCreateArgs>(args: SelectSubset<T, CareerRoadmapCreateArgs<ExtArgs>>): Prisma__CareerRoadmapClient<$Result.GetResult<Prisma.$CareerRoadmapPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CareerRoadmaps.
     * @param {CareerRoadmapCreateManyArgs} args - Arguments to create many CareerRoadmaps.
     * @example
     * // Create many CareerRoadmaps
     * const careerRoadmap = await prisma.careerRoadmap.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CareerRoadmapCreateManyArgs>(args?: SelectSubset<T, CareerRoadmapCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CareerRoadmaps and returns the data saved in the database.
     * @param {CareerRoadmapCreateManyAndReturnArgs} args - Arguments to create many CareerRoadmaps.
     * @example
     * // Create many CareerRoadmaps
     * const careerRoadmap = await prisma.careerRoadmap.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CareerRoadmaps and only return the `id`
     * const careerRoadmapWithIdOnly = await prisma.careerRoadmap.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CareerRoadmapCreateManyAndReturnArgs>(args?: SelectSubset<T, CareerRoadmapCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CareerRoadmapPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CareerRoadmap.
     * @param {CareerRoadmapDeleteArgs} args - Arguments to delete one CareerRoadmap.
     * @example
     * // Delete one CareerRoadmap
     * const CareerRoadmap = await prisma.careerRoadmap.delete({
     *   where: {
     *     // ... filter to delete one CareerRoadmap
     *   }
     * })
     * 
     */
    delete<T extends CareerRoadmapDeleteArgs>(args: SelectSubset<T, CareerRoadmapDeleteArgs<ExtArgs>>): Prisma__CareerRoadmapClient<$Result.GetResult<Prisma.$CareerRoadmapPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CareerRoadmap.
     * @param {CareerRoadmapUpdateArgs} args - Arguments to update one CareerRoadmap.
     * @example
     * // Update one CareerRoadmap
     * const careerRoadmap = await prisma.careerRoadmap.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CareerRoadmapUpdateArgs>(args: SelectSubset<T, CareerRoadmapUpdateArgs<ExtArgs>>): Prisma__CareerRoadmapClient<$Result.GetResult<Prisma.$CareerRoadmapPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CareerRoadmaps.
     * @param {CareerRoadmapDeleteManyArgs} args - Arguments to filter CareerRoadmaps to delete.
     * @example
     * // Delete a few CareerRoadmaps
     * const { count } = await prisma.careerRoadmap.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CareerRoadmapDeleteManyArgs>(args?: SelectSubset<T, CareerRoadmapDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CareerRoadmaps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerRoadmapUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CareerRoadmaps
     * const careerRoadmap = await prisma.careerRoadmap.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CareerRoadmapUpdateManyArgs>(args: SelectSubset<T, CareerRoadmapUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CareerRoadmap.
     * @param {CareerRoadmapUpsertArgs} args - Arguments to update or create a CareerRoadmap.
     * @example
     * // Update or create a CareerRoadmap
     * const careerRoadmap = await prisma.careerRoadmap.upsert({
     *   create: {
     *     // ... data to create a CareerRoadmap
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CareerRoadmap we want to update
     *   }
     * })
     */
    upsert<T extends CareerRoadmapUpsertArgs>(args: SelectSubset<T, CareerRoadmapUpsertArgs<ExtArgs>>): Prisma__CareerRoadmapClient<$Result.GetResult<Prisma.$CareerRoadmapPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CareerRoadmaps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerRoadmapCountArgs} args - Arguments to filter CareerRoadmaps to count.
     * @example
     * // Count the number of CareerRoadmaps
     * const count = await prisma.careerRoadmap.count({
     *   where: {
     *     // ... the filter for the CareerRoadmaps we want to count
     *   }
     * })
    **/
    count<T extends CareerRoadmapCountArgs>(
      args?: Subset<T, CareerRoadmapCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CareerRoadmapCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CareerRoadmap.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerRoadmapAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CareerRoadmapAggregateArgs>(args: Subset<T, CareerRoadmapAggregateArgs>): Prisma.PrismaPromise<GetCareerRoadmapAggregateType<T>>

    /**
     * Group by CareerRoadmap.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerRoadmapGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CareerRoadmapGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CareerRoadmapGroupByArgs['orderBy'] }
        : { orderBy?: CareerRoadmapGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CareerRoadmapGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCareerRoadmapGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CareerRoadmap model
   */
  readonly fields: CareerRoadmapFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CareerRoadmap.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CareerRoadmapClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CareerRoadmap model
   */ 
  interface CareerRoadmapFieldRefs {
    readonly id: FieldRef<"CareerRoadmap", 'Int'>
    readonly userId: FieldRef<"CareerRoadmap", 'Int'>
    readonly targetRole: FieldRef<"CareerRoadmap", 'String'>
    readonly milestones: FieldRef<"CareerRoadmap", 'String'>
    readonly createdAt: FieldRef<"CareerRoadmap", 'DateTime'>
    readonly updatedAt: FieldRef<"CareerRoadmap", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CareerRoadmap findUnique
   */
  export type CareerRoadmapFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerRoadmap
     */
    select?: CareerRoadmapSelect<ExtArgs> | null
    /**
     * Filter, which CareerRoadmap to fetch.
     */
    where: CareerRoadmapWhereUniqueInput
  }

  /**
   * CareerRoadmap findUniqueOrThrow
   */
  export type CareerRoadmapFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerRoadmap
     */
    select?: CareerRoadmapSelect<ExtArgs> | null
    /**
     * Filter, which CareerRoadmap to fetch.
     */
    where: CareerRoadmapWhereUniqueInput
  }

  /**
   * CareerRoadmap findFirst
   */
  export type CareerRoadmapFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerRoadmap
     */
    select?: CareerRoadmapSelect<ExtArgs> | null
    /**
     * Filter, which CareerRoadmap to fetch.
     */
    where?: CareerRoadmapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CareerRoadmaps to fetch.
     */
    orderBy?: CareerRoadmapOrderByWithRelationInput | CareerRoadmapOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CareerRoadmaps.
     */
    cursor?: CareerRoadmapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CareerRoadmaps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CareerRoadmaps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CareerRoadmaps.
     */
    distinct?: CareerRoadmapScalarFieldEnum | CareerRoadmapScalarFieldEnum[]
  }

  /**
   * CareerRoadmap findFirstOrThrow
   */
  export type CareerRoadmapFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerRoadmap
     */
    select?: CareerRoadmapSelect<ExtArgs> | null
    /**
     * Filter, which CareerRoadmap to fetch.
     */
    where?: CareerRoadmapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CareerRoadmaps to fetch.
     */
    orderBy?: CareerRoadmapOrderByWithRelationInput | CareerRoadmapOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CareerRoadmaps.
     */
    cursor?: CareerRoadmapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CareerRoadmaps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CareerRoadmaps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CareerRoadmaps.
     */
    distinct?: CareerRoadmapScalarFieldEnum | CareerRoadmapScalarFieldEnum[]
  }

  /**
   * CareerRoadmap findMany
   */
  export type CareerRoadmapFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerRoadmap
     */
    select?: CareerRoadmapSelect<ExtArgs> | null
    /**
     * Filter, which CareerRoadmaps to fetch.
     */
    where?: CareerRoadmapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CareerRoadmaps to fetch.
     */
    orderBy?: CareerRoadmapOrderByWithRelationInput | CareerRoadmapOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CareerRoadmaps.
     */
    cursor?: CareerRoadmapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CareerRoadmaps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CareerRoadmaps.
     */
    skip?: number
    distinct?: CareerRoadmapScalarFieldEnum | CareerRoadmapScalarFieldEnum[]
  }

  /**
   * CareerRoadmap create
   */
  export type CareerRoadmapCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerRoadmap
     */
    select?: CareerRoadmapSelect<ExtArgs> | null
    /**
     * The data needed to create a CareerRoadmap.
     */
    data: XOR<CareerRoadmapCreateInput, CareerRoadmapUncheckedCreateInput>
  }

  /**
   * CareerRoadmap createMany
   */
  export type CareerRoadmapCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CareerRoadmaps.
     */
    data: CareerRoadmapCreateManyInput | CareerRoadmapCreateManyInput[]
  }

  /**
   * CareerRoadmap createManyAndReturn
   */
  export type CareerRoadmapCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerRoadmap
     */
    select?: CareerRoadmapSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CareerRoadmaps.
     */
    data: CareerRoadmapCreateManyInput | CareerRoadmapCreateManyInput[]
  }

  /**
   * CareerRoadmap update
   */
  export type CareerRoadmapUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerRoadmap
     */
    select?: CareerRoadmapSelect<ExtArgs> | null
    /**
     * The data needed to update a CareerRoadmap.
     */
    data: XOR<CareerRoadmapUpdateInput, CareerRoadmapUncheckedUpdateInput>
    /**
     * Choose, which CareerRoadmap to update.
     */
    where: CareerRoadmapWhereUniqueInput
  }

  /**
   * CareerRoadmap updateMany
   */
  export type CareerRoadmapUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CareerRoadmaps.
     */
    data: XOR<CareerRoadmapUpdateManyMutationInput, CareerRoadmapUncheckedUpdateManyInput>
    /**
     * Filter which CareerRoadmaps to update
     */
    where?: CareerRoadmapWhereInput
  }

  /**
   * CareerRoadmap upsert
   */
  export type CareerRoadmapUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerRoadmap
     */
    select?: CareerRoadmapSelect<ExtArgs> | null
    /**
     * The filter to search for the CareerRoadmap to update in case it exists.
     */
    where: CareerRoadmapWhereUniqueInput
    /**
     * In case the CareerRoadmap found by the `where` argument doesn't exist, create a new CareerRoadmap with this data.
     */
    create: XOR<CareerRoadmapCreateInput, CareerRoadmapUncheckedCreateInput>
    /**
     * In case the CareerRoadmap was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CareerRoadmapUpdateInput, CareerRoadmapUncheckedUpdateInput>
  }

  /**
   * CareerRoadmap delete
   */
  export type CareerRoadmapDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerRoadmap
     */
    select?: CareerRoadmapSelect<ExtArgs> | null
    /**
     * Filter which CareerRoadmap to delete.
     */
    where: CareerRoadmapWhereUniqueInput
  }

  /**
   * CareerRoadmap deleteMany
   */
  export type CareerRoadmapDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CareerRoadmaps to delete
     */
    where?: CareerRoadmapWhereInput
  }

  /**
   * CareerRoadmap without action
   */
  export type CareerRoadmapDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerRoadmap
     */
    select?: CareerRoadmapSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ResumeDataScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    fullName: 'fullName',
    email: 'email',
    phone: 'phone',
    summary: 'summary',
    skills: 'skills',
    workExp: 'workExp',
    education: 'education',
    templateId: 'templateId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ResumeDataScalarFieldEnum = (typeof ResumeDataScalarFieldEnum)[keyof typeof ResumeDataScalarFieldEnum]


  export const CareerRoadmapScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    targetRole: 'targetRole',
    milestones: 'milestones',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CareerRoadmapScalarFieldEnum = (typeof CareerRoadmapScalarFieldEnum)[keyof typeof CareerRoadmapScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type ResumeDataWhereInput = {
    AND?: ResumeDataWhereInput | ResumeDataWhereInput[]
    OR?: ResumeDataWhereInput[]
    NOT?: ResumeDataWhereInput | ResumeDataWhereInput[]
    id?: IntFilter<"ResumeData"> | number
    userId?: IntFilter<"ResumeData"> | number
    fullName?: StringFilter<"ResumeData"> | string
    email?: StringFilter<"ResumeData"> | string
    phone?: StringNullableFilter<"ResumeData"> | string | null
    summary?: StringNullableFilter<"ResumeData"> | string | null
    skills?: StringFilter<"ResumeData"> | string
    workExp?: StringFilter<"ResumeData"> | string
    education?: StringFilter<"ResumeData"> | string
    templateId?: StringFilter<"ResumeData"> | string
    createdAt?: DateTimeFilter<"ResumeData"> | Date | string
    updatedAt?: DateTimeFilter<"ResumeData"> | Date | string
  }

  export type ResumeDataOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    summary?: SortOrderInput | SortOrder
    skills?: SortOrder
    workExp?: SortOrder
    education?: SortOrder
    templateId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ResumeDataWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId?: number
    AND?: ResumeDataWhereInput | ResumeDataWhereInput[]
    OR?: ResumeDataWhereInput[]
    NOT?: ResumeDataWhereInput | ResumeDataWhereInput[]
    fullName?: StringFilter<"ResumeData"> | string
    email?: StringFilter<"ResumeData"> | string
    phone?: StringNullableFilter<"ResumeData"> | string | null
    summary?: StringNullableFilter<"ResumeData"> | string | null
    skills?: StringFilter<"ResumeData"> | string
    workExp?: StringFilter<"ResumeData"> | string
    education?: StringFilter<"ResumeData"> | string
    templateId?: StringFilter<"ResumeData"> | string
    createdAt?: DateTimeFilter<"ResumeData"> | Date | string
    updatedAt?: DateTimeFilter<"ResumeData"> | Date | string
  }, "id" | "userId">

  export type ResumeDataOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    summary?: SortOrderInput | SortOrder
    skills?: SortOrder
    workExp?: SortOrder
    education?: SortOrder
    templateId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ResumeDataCountOrderByAggregateInput
    _avg?: ResumeDataAvgOrderByAggregateInput
    _max?: ResumeDataMaxOrderByAggregateInput
    _min?: ResumeDataMinOrderByAggregateInput
    _sum?: ResumeDataSumOrderByAggregateInput
  }

  export type ResumeDataScalarWhereWithAggregatesInput = {
    AND?: ResumeDataScalarWhereWithAggregatesInput | ResumeDataScalarWhereWithAggregatesInput[]
    OR?: ResumeDataScalarWhereWithAggregatesInput[]
    NOT?: ResumeDataScalarWhereWithAggregatesInput | ResumeDataScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ResumeData"> | number
    userId?: IntWithAggregatesFilter<"ResumeData"> | number
    fullName?: StringWithAggregatesFilter<"ResumeData"> | string
    email?: StringWithAggregatesFilter<"ResumeData"> | string
    phone?: StringNullableWithAggregatesFilter<"ResumeData"> | string | null
    summary?: StringNullableWithAggregatesFilter<"ResumeData"> | string | null
    skills?: StringWithAggregatesFilter<"ResumeData"> | string
    workExp?: StringWithAggregatesFilter<"ResumeData"> | string
    education?: StringWithAggregatesFilter<"ResumeData"> | string
    templateId?: StringWithAggregatesFilter<"ResumeData"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ResumeData"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ResumeData"> | Date | string
  }

  export type CareerRoadmapWhereInput = {
    AND?: CareerRoadmapWhereInput | CareerRoadmapWhereInput[]
    OR?: CareerRoadmapWhereInput[]
    NOT?: CareerRoadmapWhereInput | CareerRoadmapWhereInput[]
    id?: IntFilter<"CareerRoadmap"> | number
    userId?: IntFilter<"CareerRoadmap"> | number
    targetRole?: StringFilter<"CareerRoadmap"> | string
    milestones?: StringFilter<"CareerRoadmap"> | string
    createdAt?: DateTimeFilter<"CareerRoadmap"> | Date | string
    updatedAt?: DateTimeFilter<"CareerRoadmap"> | Date | string
  }

  export type CareerRoadmapOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    targetRole?: SortOrder
    milestones?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CareerRoadmapWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId?: number
    AND?: CareerRoadmapWhereInput | CareerRoadmapWhereInput[]
    OR?: CareerRoadmapWhereInput[]
    NOT?: CareerRoadmapWhereInput | CareerRoadmapWhereInput[]
    targetRole?: StringFilter<"CareerRoadmap"> | string
    milestones?: StringFilter<"CareerRoadmap"> | string
    createdAt?: DateTimeFilter<"CareerRoadmap"> | Date | string
    updatedAt?: DateTimeFilter<"CareerRoadmap"> | Date | string
  }, "id" | "userId">

  export type CareerRoadmapOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    targetRole?: SortOrder
    milestones?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CareerRoadmapCountOrderByAggregateInput
    _avg?: CareerRoadmapAvgOrderByAggregateInput
    _max?: CareerRoadmapMaxOrderByAggregateInput
    _min?: CareerRoadmapMinOrderByAggregateInput
    _sum?: CareerRoadmapSumOrderByAggregateInput
  }

  export type CareerRoadmapScalarWhereWithAggregatesInput = {
    AND?: CareerRoadmapScalarWhereWithAggregatesInput | CareerRoadmapScalarWhereWithAggregatesInput[]
    OR?: CareerRoadmapScalarWhereWithAggregatesInput[]
    NOT?: CareerRoadmapScalarWhereWithAggregatesInput | CareerRoadmapScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"CareerRoadmap"> | number
    userId?: IntWithAggregatesFilter<"CareerRoadmap"> | number
    targetRole?: StringWithAggregatesFilter<"CareerRoadmap"> | string
    milestones?: StringWithAggregatesFilter<"CareerRoadmap"> | string
    createdAt?: DateTimeWithAggregatesFilter<"CareerRoadmap"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CareerRoadmap"> | Date | string
  }

  export type ResumeDataCreateInput = {
    userId: number
    fullName: string
    email: string
    phone?: string | null
    summary?: string | null
    skills: string
    workExp: string
    education: string
    templateId?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ResumeDataUncheckedCreateInput = {
    id?: number
    userId: number
    fullName: string
    email: string
    phone?: string | null
    summary?: string | null
    skills: string
    workExp: string
    education: string
    templateId?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ResumeDataUpdateInput = {
    userId?: IntFieldUpdateOperationsInput | number
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: StringFieldUpdateOperationsInput | string
    workExp?: StringFieldUpdateOperationsInput | string
    education?: StringFieldUpdateOperationsInput | string
    templateId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeDataUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: StringFieldUpdateOperationsInput | string
    workExp?: StringFieldUpdateOperationsInput | string
    education?: StringFieldUpdateOperationsInput | string
    templateId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeDataCreateManyInput = {
    id?: number
    userId: number
    fullName: string
    email: string
    phone?: string | null
    summary?: string | null
    skills: string
    workExp: string
    education: string
    templateId?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ResumeDataUpdateManyMutationInput = {
    userId?: IntFieldUpdateOperationsInput | number
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: StringFieldUpdateOperationsInput | string
    workExp?: StringFieldUpdateOperationsInput | string
    education?: StringFieldUpdateOperationsInput | string
    templateId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResumeDataUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: StringFieldUpdateOperationsInput | string
    workExp?: StringFieldUpdateOperationsInput | string
    education?: StringFieldUpdateOperationsInput | string
    templateId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CareerRoadmapCreateInput = {
    userId: number
    targetRole: string
    milestones: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CareerRoadmapUncheckedCreateInput = {
    id?: number
    userId: number
    targetRole: string
    milestones: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CareerRoadmapUpdateInput = {
    userId?: IntFieldUpdateOperationsInput | number
    targetRole?: StringFieldUpdateOperationsInput | string
    milestones?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CareerRoadmapUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    targetRole?: StringFieldUpdateOperationsInput | string
    milestones?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CareerRoadmapCreateManyInput = {
    id?: number
    userId: number
    targetRole: string
    milestones: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CareerRoadmapUpdateManyMutationInput = {
    userId?: IntFieldUpdateOperationsInput | number
    targetRole?: StringFieldUpdateOperationsInput | string
    milestones?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CareerRoadmapUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    targetRole?: StringFieldUpdateOperationsInput | string
    milestones?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ResumeDataCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    summary?: SortOrder
    skills?: SortOrder
    workExp?: SortOrder
    education?: SortOrder
    templateId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ResumeDataAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type ResumeDataMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    summary?: SortOrder
    skills?: SortOrder
    workExp?: SortOrder
    education?: SortOrder
    templateId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ResumeDataMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    summary?: SortOrder
    skills?: SortOrder
    workExp?: SortOrder
    education?: SortOrder
    templateId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ResumeDataSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type CareerRoadmapCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    targetRole?: SortOrder
    milestones?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CareerRoadmapAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type CareerRoadmapMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    targetRole?: SortOrder
    milestones?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CareerRoadmapMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    targetRole?: SortOrder
    milestones?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CareerRoadmapSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use ResumeDataDefaultArgs instead
     */
    export type ResumeDataArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ResumeDataDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CareerRoadmapDefaultArgs instead
     */
    export type CareerRoadmapArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CareerRoadmapDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}