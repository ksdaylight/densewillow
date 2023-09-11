import { z } from 'zod';
import { Prisma } from '../../../../node_modules/@prisma/client/blog';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// JSON
//------------------------------------------------------

export type NullableJsonInput = Prisma.JsonValue | null | 'JsonNull' | 'DbNull' | Prisma.NullTypes.DbNull | Prisma.NullTypes.JsonNull;

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === 'DbNull') return Prisma.DbNull;
  if (v === 'JsonNull') return Prisma.JsonNull;
  return v;
};

export const JsonValue: z.ZodType<Prisma.JsonValue> = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => z.array(JsonValue)),
  z.lazy(() => z.record(JsonValue)),
]);

export type JsonValueType = z.infer<typeof JsonValue>;

export const NullableJsonValue = z
  .union([JsonValue, z.literal('DbNull'), z.literal('JsonNull')])
  .nullable()
  .transform((v) => transformJsonNull(v));

export type NullableJsonValueType = z.infer<typeof NullableJsonValue>;

export const InputJsonValue: z.ZodType<Prisma.InputJsonValue> = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.lazy(() => z.array(InputJsonValue.nullable())),
  z.lazy(() => z.record(InputJsonValue.nullable())),
]);

export type InputJsonValueType = z.infer<typeof InputJsonValue>;


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const UserScalarFieldEnumSchema = z.enum(['id','email','name','provider','activated','avatar','LikeCommentIDs','roleIDs','permissionIDs','likedPostIDs','createdAt','updatedAt']);

export const RoleScalarFieldEnumSchema = z.enum(['id','name','label','description','systemic','permissionIDs','userIDs','createdAt','updatedAt']);

export const PermissionScalarFieldEnumSchema = z.enum(['id','name','label','description','rule','roleIDs','userIDs','createdAt','updatedAt']);

export const PostScalarFieldEnumSchema = z.enum(['id','title','slug','content','meta','tags','thumbnailId','authorId','likedByUserIDs','createdAt','updatedAt']);

export const TranslationScalarFieldEnumSchema = z.enum(['id','language','title','content','meta','postId']);

export const MediaEntityScalarFieldEnumSchema = z.enum(['id','file','ext','createdAt']);

export const RefreshTokenScalarFieldEnumSchema = z.enum(['id','value','expired_at','createdAt','accessTokenId']);

export const AccessTokenScalarFieldEnumSchema = z.enum(['id','value','expired_at','createdAt','userId']);

export const CommentScalarFieldEnumSchema = z.enum(['id','belongsToId','ownerId','content','likedByUserIDs','repliedToID','chiefComment','createdAt','updatedAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  provider: z.string(),
  activated: z.boolean(),
  avatar: z.string().nullable(),
  LikeCommentIDs: z.string().array(),
  roleIDs: z.string().array(),
  permissionIDs: z.string().array(),
  likedPostIDs: z.string().array(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// USER PARTIAL SCHEMA
/////////////////////////////////////////

export const UserPartialSchema = UserSchema.partial()

export type UserPartial = z.infer<typeof UserPartialSchema>

// USER OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const UserOptionalDefaultsSchema = UserSchema.merge(z.object({
  id: z.string().optional(),
  activated: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type UserOptionalDefaults = z.infer<typeof UserOptionalDefaultsSchema>

// USER RELATION SCHEMA
//------------------------------------------------------

export type UserRelations = {
  posts: Post[];
  comments: Comment[];
  LikeComments: Comment[];
  roles: Role[];
  permissions: Permission[];
  likedPosts: Post[];
  accessTokens: AccessToken[];
};

export type UserWithRelations = z.infer<typeof UserSchema> & UserRelations

export const UserWithRelationsSchema: z.ZodType<UserWithRelations> = UserSchema.merge(z.object({
  posts: z.lazy(() => PostSchema).array(),
  comments: z.lazy(() => CommentSchema).array(),
  LikeComments: z.lazy(() => CommentSchema).array(),
  roles: z.lazy(() => RoleSchema).array(),
  permissions: z.lazy(() => PermissionSchema).array(),
  likedPosts: z.lazy(() => PostSchema).array(),
  accessTokens: z.lazy(() => AccessTokenSchema).array(),
}))

// USER OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type UserOptionalDefaultsRelations = {
  posts: Post[];
  comments: Comment[];
  LikeComments: Comment[];
  roles: Role[];
  permissions: Permission[];
  likedPosts: Post[];
  accessTokens: AccessToken[];
};

export type UserOptionalDefaultsWithRelations = z.infer<typeof UserOptionalDefaultsSchema> & UserOptionalDefaultsRelations

export const UserOptionalDefaultsWithRelationsSchema: z.ZodType<UserOptionalDefaultsWithRelations> = UserOptionalDefaultsSchema.merge(z.object({
  posts: z.lazy(() => PostSchema).array(),
  comments: z.lazy(() => CommentSchema).array(),
  LikeComments: z.lazy(() => CommentSchema).array(),
  roles: z.lazy(() => RoleSchema).array(),
  permissions: z.lazy(() => PermissionSchema).array(),
  likedPosts: z.lazy(() => PostSchema).array(),
  accessTokens: z.lazy(() => AccessTokenSchema).array(),
}))

// USER PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type UserPartialRelations = {
  posts?: Post[];
  comments?: Comment[];
  LikeComments?: Comment[];
  roles?: Role[];
  permissions?: Permission[];
  likedPosts?: Post[];
  accessTokens?: AccessToken[];
};

export type UserPartialWithRelations = z.infer<typeof UserPartialSchema> & UserPartialRelations

export const UserPartialWithRelationsSchema: z.ZodType<UserPartialWithRelations> = UserPartialSchema.merge(z.object({
  posts: z.lazy(() => PostSchema).array(),
  comments: z.lazy(() => CommentSchema).array(),
  LikeComments: z.lazy(() => CommentSchema).array(),
  roles: z.lazy(() => RoleSchema).array(),
  permissions: z.lazy(() => PermissionSchema).array(),
  likedPosts: z.lazy(() => PostSchema).array(),
  accessTokens: z.lazy(() => AccessTokenSchema).array(),
})).partial()

export type UserOptionalDefaultsWithPartialRelations = z.infer<typeof UserOptionalDefaultsSchema> & UserPartialRelations

export const UserOptionalDefaultsWithPartialRelationsSchema: z.ZodType<UserOptionalDefaultsWithPartialRelations> = UserOptionalDefaultsSchema.merge(z.object({
  posts: z.lazy(() => PostSchema).array(),
  comments: z.lazy(() => CommentSchema).array(),
  LikeComments: z.lazy(() => CommentSchema).array(),
  roles: z.lazy(() => RoleSchema).array(),
  permissions: z.lazy(() => PermissionSchema).array(),
  likedPosts: z.lazy(() => PostSchema).array(),
  accessTokens: z.lazy(() => AccessTokenSchema).array(),
}).partial())

export type UserWithPartialRelations = z.infer<typeof UserSchema> & UserPartialRelations

export const UserWithPartialRelationsSchema: z.ZodType<UserWithPartialRelations> = UserSchema.merge(z.object({
  posts: z.lazy(() => PostSchema).array(),
  comments: z.lazy(() => CommentSchema).array(),
  LikeComments: z.lazy(() => CommentSchema).array(),
  roles: z.lazy(() => RoleSchema).array(),
  permissions: z.lazy(() => PermissionSchema).array(),
  likedPosts: z.lazy(() => PostSchema).array(),
  accessTokens: z.lazy(() => AccessTokenSchema).array(),
}).partial())

/////////////////////////////////////////
// ROLE SCHEMA
/////////////////////////////////////////

export const RoleSchema = z.object({
  id: z.string(),
  name: z.string(),
  label: z.string().nullable(),
  description: z.string().nullable(),
  systemic: z.boolean(),
  permissionIDs: z.string().array(),
  userIDs: z.string().array(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Role = z.infer<typeof RoleSchema>

/////////////////////////////////////////
// ROLE PARTIAL SCHEMA
/////////////////////////////////////////

export const RolePartialSchema = RoleSchema.partial()

export type RolePartial = z.infer<typeof RolePartialSchema>

// ROLE OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const RoleOptionalDefaultsSchema = RoleSchema.merge(z.object({
  id: z.string().optional(),
  systemic: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type RoleOptionalDefaults = z.infer<typeof RoleOptionalDefaultsSchema>

// ROLE RELATION SCHEMA
//------------------------------------------------------

export type RoleRelations = {
  permissions: Permission[];
  users: User[];
};

export type RoleWithRelations = z.infer<typeof RoleSchema> & RoleRelations

export const RoleWithRelationsSchema: z.ZodType<RoleWithRelations> = RoleSchema.merge(z.object({
  permissions: z.lazy(() => PermissionSchema).array(),
  users: z.lazy(() => UserSchema).array(),
}))

// ROLE OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type RoleOptionalDefaultsRelations = {
  permissions: Permission[];
  users: User[];
};

export type RoleOptionalDefaultsWithRelations = z.infer<typeof RoleOptionalDefaultsSchema> & RoleOptionalDefaultsRelations

export const RoleOptionalDefaultsWithRelationsSchema: z.ZodType<RoleOptionalDefaultsWithRelations> = RoleOptionalDefaultsSchema.merge(z.object({
  permissions: z.lazy(() => PermissionSchema).array(),
  users: z.lazy(() => UserSchema).array(),
}))

// ROLE PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type RolePartialRelations = {
  permissions?: Permission[];
  users?: User[];
};

export type RolePartialWithRelations = z.infer<typeof RolePartialSchema> & RolePartialRelations

export const RolePartialWithRelationsSchema: z.ZodType<RolePartialWithRelations> = RolePartialSchema.merge(z.object({
  permissions: z.lazy(() => PermissionSchema).array(),
  users: z.lazy(() => UserSchema).array(),
})).partial()

export type RoleOptionalDefaultsWithPartialRelations = z.infer<typeof RoleOptionalDefaultsSchema> & RolePartialRelations

export const RoleOptionalDefaultsWithPartialRelationsSchema: z.ZodType<RoleOptionalDefaultsWithPartialRelations> = RoleOptionalDefaultsSchema.merge(z.object({
  permissions: z.lazy(() => PermissionSchema).array(),
  users: z.lazy(() => UserSchema).array(),
}).partial())

export type RoleWithPartialRelations = z.infer<typeof RoleSchema> & RolePartialRelations

export const RoleWithPartialRelationsSchema: z.ZodType<RoleWithPartialRelations> = RoleSchema.merge(z.object({
  permissions: z.lazy(() => PermissionSchema).array(),
  users: z.lazy(() => UserSchema).array(),
}).partial())

/////////////////////////////////////////
// PERMISSION SCHEMA
/////////////////////////////////////////

export const PermissionSchema = z.object({
  id: z.string(),
  name: z.string(),
  label: z.string().nullable(),
  description: z.string().nullable(),
  rule: InputJsonValue,
  roleIDs: z.string().array(),
  userIDs: z.string().array(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Permission = z.infer<typeof PermissionSchema>

/////////////////////////////////////////
// PERMISSION PARTIAL SCHEMA
/////////////////////////////////////////

export const PermissionPartialSchema = PermissionSchema.partial()

export type PermissionPartial = z.infer<typeof PermissionPartialSchema>

// PERMISSION OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const PermissionOptionalDefaultsSchema = PermissionSchema.merge(z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type PermissionOptionalDefaults = z.infer<typeof PermissionOptionalDefaultsSchema>

// PERMISSION RELATION SCHEMA
//------------------------------------------------------

export type PermissionRelations = {
  roles: Role[];
  users: User[];
};

export type PermissionWithRelations = z.infer<typeof PermissionSchema> & PermissionRelations

export const PermissionWithRelationsSchema: z.ZodType<PermissionWithRelations> = PermissionSchema.merge(z.object({
  roles: z.lazy(() => RoleSchema).array(),
  users: z.lazy(() => UserSchema).array(),
}))

// PERMISSION OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type PermissionOptionalDefaultsRelations = {
  roles: Role[];
  users: User[];
};

export type PermissionOptionalDefaultsWithRelations = z.infer<typeof PermissionOptionalDefaultsSchema> & PermissionOptionalDefaultsRelations

export const PermissionOptionalDefaultsWithRelationsSchema: z.ZodType<PermissionOptionalDefaultsWithRelations> = PermissionOptionalDefaultsSchema.merge(z.object({
  roles: z.lazy(() => RoleSchema).array(),
  users: z.lazy(() => UserSchema).array(),
}))

// PERMISSION PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type PermissionPartialRelations = {
  roles?: Role[];
  users?: User[];
};

export type PermissionPartialWithRelations = z.infer<typeof PermissionPartialSchema> & PermissionPartialRelations

export const PermissionPartialWithRelationsSchema: z.ZodType<PermissionPartialWithRelations> = PermissionPartialSchema.merge(z.object({
  roles: z.lazy(() => RoleSchema).array(),
  users: z.lazy(() => UserSchema).array(),
})).partial()

export type PermissionOptionalDefaultsWithPartialRelations = z.infer<typeof PermissionOptionalDefaultsSchema> & PermissionPartialRelations

export const PermissionOptionalDefaultsWithPartialRelationsSchema: z.ZodType<PermissionOptionalDefaultsWithPartialRelations> = PermissionOptionalDefaultsSchema.merge(z.object({
  roles: z.lazy(() => RoleSchema).array(),
  users: z.lazy(() => UserSchema).array(),
}).partial())

export type PermissionWithPartialRelations = z.infer<typeof PermissionSchema> & PermissionPartialRelations

export const PermissionWithPartialRelationsSchema: z.ZodType<PermissionWithPartialRelations> = PermissionSchema.merge(z.object({
  roles: z.lazy(() => RoleSchema).array(),
  users: z.lazy(() => UserSchema).array(),
}).partial())

/////////////////////////////////////////
// POST SCHEMA
/////////////////////////////////////////

export const PostSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  content: z.string().nullable(),
  meta: z.string(),
  tags: z.string().array(),
  thumbnailId: z.string().nullable(),
  authorId: z.string().nullable(),
  likedByUserIDs: z.string().array(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Post = z.infer<typeof PostSchema>

/////////////////////////////////////////
// POST PARTIAL SCHEMA
/////////////////////////////////////////

export const PostPartialSchema = PostSchema.partial()

export type PostPartial = z.infer<typeof PostPartialSchema>

// POST OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const PostOptionalDefaultsSchema = PostSchema.merge(z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type PostOptionalDefaults = z.infer<typeof PostOptionalDefaultsSchema>

// POST RELATION SCHEMA
//------------------------------------------------------

export type PostRelations = {
  thumbnail?: MediaEntity | null;
  author?: User | null;
  likedUsers: User[];
  comments: Comment[];
  translations: Translation[];
};

export type PostWithRelations = z.infer<typeof PostSchema> & PostRelations

export const PostWithRelationsSchema: z.ZodType<PostWithRelations> = PostSchema.merge(z.object({
  thumbnail: z.lazy(() => MediaEntitySchema).nullable(),
  author: z.lazy(() => UserSchema).nullable(),
  likedUsers: z.lazy(() => UserSchema).array(),
  comments: z.lazy(() => CommentSchema).array(),
  translations: z.lazy(() => TranslationSchema).array(),
}))

// POST OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type PostOptionalDefaultsRelations = {
  thumbnail?: MediaEntity | null;
  author?: User | null;
  likedUsers: User[];
  comments: Comment[];
  translations: Translation[];
};

export type PostOptionalDefaultsWithRelations = z.infer<typeof PostOptionalDefaultsSchema> & PostOptionalDefaultsRelations

export const PostOptionalDefaultsWithRelationsSchema: z.ZodType<PostOptionalDefaultsWithRelations> = PostOptionalDefaultsSchema.merge(z.object({
  thumbnail: z.lazy(() => MediaEntitySchema).nullable(),
  author: z.lazy(() => UserSchema).nullable(),
  likedUsers: z.lazy(() => UserSchema).array(),
  comments: z.lazy(() => CommentSchema).array(),
  translations: z.lazy(() => TranslationSchema).array(),
}))

// POST PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type PostPartialRelations = {
  thumbnail?: MediaEntity | null;
  author?: User | null;
  likedUsers?: User[];
  comments?: Comment[];
  translations?: Translation[];
};

export type PostPartialWithRelations = z.infer<typeof PostPartialSchema> & PostPartialRelations

export const PostPartialWithRelationsSchema: z.ZodType<PostPartialWithRelations> = PostPartialSchema.merge(z.object({
  thumbnail: z.lazy(() => MediaEntitySchema).nullable(),
  author: z.lazy(() => UserSchema).nullable(),
  likedUsers: z.lazy(() => UserSchema).array(),
  comments: z.lazy(() => CommentSchema).array(),
  translations: z.lazy(() => TranslationSchema).array(),
})).partial()

export type PostOptionalDefaultsWithPartialRelations = z.infer<typeof PostOptionalDefaultsSchema> & PostPartialRelations

export const PostOptionalDefaultsWithPartialRelationsSchema: z.ZodType<PostOptionalDefaultsWithPartialRelations> = PostOptionalDefaultsSchema.merge(z.object({
  thumbnail: z.lazy(() => MediaEntitySchema).nullable(),
  author: z.lazy(() => UserSchema).nullable(),
  likedUsers: z.lazy(() => UserSchema).array(),
  comments: z.lazy(() => CommentSchema).array(),
  translations: z.lazy(() => TranslationSchema).array(),
}).partial())

export type PostWithPartialRelations = z.infer<typeof PostSchema> & PostPartialRelations

export const PostWithPartialRelationsSchema: z.ZodType<PostWithPartialRelations> = PostSchema.merge(z.object({
  thumbnail: z.lazy(() => MediaEntitySchema).nullable(),
  author: z.lazy(() => UserSchema).nullable(),
  likedUsers: z.lazy(() => UserSchema).array(),
  comments: z.lazy(() => CommentSchema).array(),
  translations: z.lazy(() => TranslationSchema).array(),
}).partial())

/////////////////////////////////////////
// TRANSLATION SCHEMA
/////////////////////////////////////////

export const TranslationSchema = z.object({
  id: z.string(),
  language: z.string(),
  title: z.string(),
  content: z.string().nullable(),
  meta: z.string(),
  postId: z.string(),
})

export type Translation = z.infer<typeof TranslationSchema>

/////////////////////////////////////////
// TRANSLATION PARTIAL SCHEMA
/////////////////////////////////////////

export const TranslationPartialSchema = TranslationSchema.partial()

export type TranslationPartial = z.infer<typeof TranslationPartialSchema>

// TRANSLATION OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const TranslationOptionalDefaultsSchema = TranslationSchema.merge(z.object({
  id: z.string().optional(),
}))

export type TranslationOptionalDefaults = z.infer<typeof TranslationOptionalDefaultsSchema>

// TRANSLATION RELATION SCHEMA
//------------------------------------------------------

export type TranslationRelations = {
  post: Post;
};

export type TranslationWithRelations = z.infer<typeof TranslationSchema> & TranslationRelations

export const TranslationWithRelationsSchema: z.ZodType<TranslationWithRelations> = TranslationSchema.merge(z.object({
  post: z.lazy(() => PostSchema),
}))

// TRANSLATION OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type TranslationOptionalDefaultsRelations = {
  post: Post;
};

export type TranslationOptionalDefaultsWithRelations = z.infer<typeof TranslationOptionalDefaultsSchema> & TranslationOptionalDefaultsRelations

export const TranslationOptionalDefaultsWithRelationsSchema: z.ZodType<TranslationOptionalDefaultsWithRelations> = TranslationOptionalDefaultsSchema.merge(z.object({
  post: z.lazy(() => PostSchema),
}))

// TRANSLATION PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type TranslationPartialRelations = {
  post?: Post;
};

export type TranslationPartialWithRelations = z.infer<typeof TranslationPartialSchema> & TranslationPartialRelations

export const TranslationPartialWithRelationsSchema: z.ZodType<TranslationPartialWithRelations> = TranslationPartialSchema.merge(z.object({
  post: z.lazy(() => PostSchema),
})).partial()

export type TranslationOptionalDefaultsWithPartialRelations = z.infer<typeof TranslationOptionalDefaultsSchema> & TranslationPartialRelations

export const TranslationOptionalDefaultsWithPartialRelationsSchema: z.ZodType<TranslationOptionalDefaultsWithPartialRelations> = TranslationOptionalDefaultsSchema.merge(z.object({
  post: z.lazy(() => PostSchema),
}).partial())

export type TranslationWithPartialRelations = z.infer<typeof TranslationSchema> & TranslationPartialRelations

export const TranslationWithPartialRelationsSchema: z.ZodType<TranslationWithPartialRelations> = TranslationSchema.merge(z.object({
  post: z.lazy(() => PostSchema),
}).partial())

/////////////////////////////////////////
// MEDIA ENTITY SCHEMA
/////////////////////////////////////////

export const MediaEntitySchema = z.object({
  id: z.string(),
  file: z.string(),
  ext: z.string(),
  createdAt: z.coerce.date(),
})

export type MediaEntity = z.infer<typeof MediaEntitySchema>

/////////////////////////////////////////
// MEDIA ENTITY PARTIAL SCHEMA
/////////////////////////////////////////

export const MediaEntityPartialSchema = MediaEntitySchema.partial()

export type MediaEntityPartial = z.infer<typeof MediaEntityPartialSchema>

// MEDIA ENTITY OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const MediaEntityOptionalDefaultsSchema = MediaEntitySchema.merge(z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
}))

export type MediaEntityOptionalDefaults = z.infer<typeof MediaEntityOptionalDefaultsSchema>

// MEDIA ENTITY RELATION SCHEMA
//------------------------------------------------------

export type MediaEntityRelations = {
  post: Post[];
};

export type MediaEntityWithRelations = z.infer<typeof MediaEntitySchema> & MediaEntityRelations

export const MediaEntityWithRelationsSchema: z.ZodType<MediaEntityWithRelations> = MediaEntitySchema.merge(z.object({
  post: z.lazy(() => PostSchema).array(),
}))

// MEDIA ENTITY OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type MediaEntityOptionalDefaultsRelations = {
  post: Post[];
};

export type MediaEntityOptionalDefaultsWithRelations = z.infer<typeof MediaEntityOptionalDefaultsSchema> & MediaEntityOptionalDefaultsRelations

export const MediaEntityOptionalDefaultsWithRelationsSchema: z.ZodType<MediaEntityOptionalDefaultsWithRelations> = MediaEntityOptionalDefaultsSchema.merge(z.object({
  post: z.lazy(() => PostSchema).array(),
}))

// MEDIA ENTITY PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type MediaEntityPartialRelations = {
  post?: Post[];
};

export type MediaEntityPartialWithRelations = z.infer<typeof MediaEntityPartialSchema> & MediaEntityPartialRelations

export const MediaEntityPartialWithRelationsSchema: z.ZodType<MediaEntityPartialWithRelations> = MediaEntityPartialSchema.merge(z.object({
  post: z.lazy(() => PostSchema).array(),
})).partial()

export type MediaEntityOptionalDefaultsWithPartialRelations = z.infer<typeof MediaEntityOptionalDefaultsSchema> & MediaEntityPartialRelations

export const MediaEntityOptionalDefaultsWithPartialRelationsSchema: z.ZodType<MediaEntityOptionalDefaultsWithPartialRelations> = MediaEntityOptionalDefaultsSchema.merge(z.object({
  post: z.lazy(() => PostSchema).array(),
}).partial())

export type MediaEntityWithPartialRelations = z.infer<typeof MediaEntitySchema> & MediaEntityPartialRelations

export const MediaEntityWithPartialRelationsSchema: z.ZodType<MediaEntityWithPartialRelations> = MediaEntitySchema.merge(z.object({
  post: z.lazy(() => PostSchema).array(),
}).partial())

/////////////////////////////////////////
// REFRESH TOKEN SCHEMA
/////////////////////////////////////////

export const RefreshTokenSchema = z.object({
  id: z.string(),
  value: z.string(),
  expired_at: z.coerce.date(),
  createdAt: z.coerce.date(),
  accessTokenId: z.string(),
})

export type RefreshToken = z.infer<typeof RefreshTokenSchema>

/////////////////////////////////////////
// REFRESH TOKEN PARTIAL SCHEMA
/////////////////////////////////////////

export const RefreshTokenPartialSchema = RefreshTokenSchema.partial()

export type RefreshTokenPartial = z.infer<typeof RefreshTokenPartialSchema>

// REFRESH TOKEN OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const RefreshTokenOptionalDefaultsSchema = RefreshTokenSchema.merge(z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
}))

export type RefreshTokenOptionalDefaults = z.infer<typeof RefreshTokenOptionalDefaultsSchema>

// REFRESH TOKEN RELATION SCHEMA
//------------------------------------------------------

export type RefreshTokenRelations = {
  accessToken: AccessToken;
};

export type RefreshTokenWithRelations = z.infer<typeof RefreshTokenSchema> & RefreshTokenRelations

export const RefreshTokenWithRelationsSchema: z.ZodType<RefreshTokenWithRelations> = RefreshTokenSchema.merge(z.object({
  accessToken: z.lazy(() => AccessTokenSchema),
}))

// REFRESH TOKEN OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type RefreshTokenOptionalDefaultsRelations = {
  accessToken: AccessToken;
};

export type RefreshTokenOptionalDefaultsWithRelations = z.infer<typeof RefreshTokenOptionalDefaultsSchema> & RefreshTokenOptionalDefaultsRelations

export const RefreshTokenOptionalDefaultsWithRelationsSchema: z.ZodType<RefreshTokenOptionalDefaultsWithRelations> = RefreshTokenOptionalDefaultsSchema.merge(z.object({
  accessToken: z.lazy(() => AccessTokenSchema),
}))

// REFRESH TOKEN PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type RefreshTokenPartialRelations = {
  accessToken?: AccessToken;
};

export type RefreshTokenPartialWithRelations = z.infer<typeof RefreshTokenPartialSchema> & RefreshTokenPartialRelations

export const RefreshTokenPartialWithRelationsSchema: z.ZodType<RefreshTokenPartialWithRelations> = RefreshTokenPartialSchema.merge(z.object({
  accessToken: z.lazy(() => AccessTokenSchema),
})).partial()

export type RefreshTokenOptionalDefaultsWithPartialRelations = z.infer<typeof RefreshTokenOptionalDefaultsSchema> & RefreshTokenPartialRelations

export const RefreshTokenOptionalDefaultsWithPartialRelationsSchema: z.ZodType<RefreshTokenOptionalDefaultsWithPartialRelations> = RefreshTokenOptionalDefaultsSchema.merge(z.object({
  accessToken: z.lazy(() => AccessTokenSchema),
}).partial())

export type RefreshTokenWithPartialRelations = z.infer<typeof RefreshTokenSchema> & RefreshTokenPartialRelations

export const RefreshTokenWithPartialRelationsSchema: z.ZodType<RefreshTokenWithPartialRelations> = RefreshTokenSchema.merge(z.object({
  accessToken: z.lazy(() => AccessTokenSchema),
}).partial())

/////////////////////////////////////////
// ACCESS TOKEN SCHEMA
/////////////////////////////////////////

export const AccessTokenSchema = z.object({
  id: z.string(),
  value: z.string(),
  expired_at: z.coerce.date(),
  createdAt: z.coerce.date(),
  userId: z.string(),
})

export type AccessToken = z.infer<typeof AccessTokenSchema>

/////////////////////////////////////////
// ACCESS TOKEN PARTIAL SCHEMA
/////////////////////////////////////////

export const AccessTokenPartialSchema = AccessTokenSchema.partial()

export type AccessTokenPartial = z.infer<typeof AccessTokenPartialSchema>

// ACCESS TOKEN OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const AccessTokenOptionalDefaultsSchema = AccessTokenSchema.merge(z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
}))

export type AccessTokenOptionalDefaults = z.infer<typeof AccessTokenOptionalDefaultsSchema>

// ACCESS TOKEN RELATION SCHEMA
//------------------------------------------------------

export type AccessTokenRelations = {
  refreshToken?: RefreshToken | null;
  user: User;
};

export type AccessTokenWithRelations = z.infer<typeof AccessTokenSchema> & AccessTokenRelations

export const AccessTokenWithRelationsSchema: z.ZodType<AccessTokenWithRelations> = AccessTokenSchema.merge(z.object({
  refreshToken: z.lazy(() => RefreshTokenSchema).nullable(),
  user: z.lazy(() => UserSchema),
}))

// ACCESS TOKEN OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type AccessTokenOptionalDefaultsRelations = {
  refreshToken?: RefreshToken | null;
  user: User;
};

export type AccessTokenOptionalDefaultsWithRelations = z.infer<typeof AccessTokenOptionalDefaultsSchema> & AccessTokenOptionalDefaultsRelations

export const AccessTokenOptionalDefaultsWithRelationsSchema: z.ZodType<AccessTokenOptionalDefaultsWithRelations> = AccessTokenOptionalDefaultsSchema.merge(z.object({
  refreshToken: z.lazy(() => RefreshTokenSchema).nullable(),
  user: z.lazy(() => UserSchema),
}))

// ACCESS TOKEN PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type AccessTokenPartialRelations = {
  refreshToken?: RefreshToken | null;
  user?: User;
};

export type AccessTokenPartialWithRelations = z.infer<typeof AccessTokenPartialSchema> & AccessTokenPartialRelations

export const AccessTokenPartialWithRelationsSchema: z.ZodType<AccessTokenPartialWithRelations> = AccessTokenPartialSchema.merge(z.object({
  refreshToken: z.lazy(() => RefreshTokenSchema).nullable(),
  user: z.lazy(() => UserSchema),
})).partial()

export type AccessTokenOptionalDefaultsWithPartialRelations = z.infer<typeof AccessTokenOptionalDefaultsSchema> & AccessTokenPartialRelations

export const AccessTokenOptionalDefaultsWithPartialRelationsSchema: z.ZodType<AccessTokenOptionalDefaultsWithPartialRelations> = AccessTokenOptionalDefaultsSchema.merge(z.object({
  refreshToken: z.lazy(() => RefreshTokenSchema).nullable(),
  user: z.lazy(() => UserSchema),
}).partial())

export type AccessTokenWithPartialRelations = z.infer<typeof AccessTokenSchema> & AccessTokenPartialRelations

export const AccessTokenWithPartialRelationsSchema: z.ZodType<AccessTokenWithPartialRelations> = AccessTokenSchema.merge(z.object({
  refreshToken: z.lazy(() => RefreshTokenSchema).nullable(),
  user: z.lazy(() => UserSchema),
}).partial())

/////////////////////////////////////////
// COMMENT SCHEMA
/////////////////////////////////////////

export const CommentSchema = z.object({
  id: z.string(),
  belongsToId: z.string().nullable(),
  ownerId: z.string(),
  content: z.string(),
  likedByUserIDs: z.string().array(),
  repliedToID: z.string().nullable(),
  chiefComment: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Comment = z.infer<typeof CommentSchema>

/////////////////////////////////////////
// COMMENT PARTIAL SCHEMA
/////////////////////////////////////////

export const CommentPartialSchema = CommentSchema.partial()

export type CommentPartial = z.infer<typeof CommentPartialSchema>

// COMMENT OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const CommentOptionalDefaultsSchema = CommentSchema.merge(z.object({
  id: z.string().optional(),
  chiefComment: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type CommentOptionalDefaults = z.infer<typeof CommentOptionalDefaultsSchema>

// COMMENT RELATION SCHEMA
//------------------------------------------------------

export type CommentRelations = {
  belongsTo?: Post | null;
  owner: User;
  likes: User[];
  replyTo?: Comment | null;
  replies: Comment[];
};

export type CommentWithRelations = z.infer<typeof CommentSchema> & CommentRelations

export const CommentWithRelationsSchema: z.ZodType<CommentWithRelations> = CommentSchema.merge(z.object({
  belongsTo: z.lazy(() => PostSchema).nullable(),
  owner: z.lazy(() => UserSchema),
  likes: z.lazy(() => UserSchema).array(),
  replyTo: z.lazy(() => CommentSchema).nullable(),
  replies: z.lazy(() => CommentSchema).array(),
}))

// COMMENT OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type CommentOptionalDefaultsRelations = {
  belongsTo?: Post | null;
  owner: User;
  likes: User[];
  replyTo?: Comment | null;
  replies: Comment[];
};

export type CommentOptionalDefaultsWithRelations = z.infer<typeof CommentOptionalDefaultsSchema> & CommentOptionalDefaultsRelations

export const CommentOptionalDefaultsWithRelationsSchema: z.ZodType<CommentOptionalDefaultsWithRelations> = CommentOptionalDefaultsSchema.merge(z.object({
  belongsTo: z.lazy(() => PostSchema).nullable(),
  owner: z.lazy(() => UserSchema),
  likes: z.lazy(() => UserSchema).array(),
  replyTo: z.lazy(() => CommentSchema).nullable(),
  replies: z.lazy(() => CommentSchema).array(),
}))

// COMMENT PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type CommentPartialRelations = {
  belongsTo?: Post | null;
  owner?: User;
  likes?: User[];
  replyTo?: Comment | null;
  replies?: Comment[];
};

export type CommentPartialWithRelations = z.infer<typeof CommentPartialSchema> & CommentPartialRelations

export const CommentPartialWithRelationsSchema: z.ZodType<CommentPartialWithRelations> = CommentPartialSchema.merge(z.object({
  belongsTo: z.lazy(() => PostSchema).nullable(),
  owner: z.lazy(() => UserSchema),
  likes: z.lazy(() => UserSchema).array(),
  replyTo: z.lazy(() => CommentSchema).nullable(),
  replies: z.lazy(() => CommentSchema).array(),
})).partial()

export type CommentOptionalDefaultsWithPartialRelations = z.infer<typeof CommentOptionalDefaultsSchema> & CommentPartialRelations

export const CommentOptionalDefaultsWithPartialRelationsSchema: z.ZodType<CommentOptionalDefaultsWithPartialRelations> = CommentOptionalDefaultsSchema.merge(z.object({
  belongsTo: z.lazy(() => PostSchema).nullable(),
  owner: z.lazy(() => UserSchema),
  likes: z.lazy(() => UserSchema).array(),
  replyTo: z.lazy(() => CommentSchema).nullable(),
  replies: z.lazy(() => CommentSchema).array(),
}).partial())

export type CommentWithPartialRelations = z.infer<typeof CommentSchema> & CommentPartialRelations

export const CommentWithPartialRelationsSchema: z.ZodType<CommentWithPartialRelations> = CommentSchema.merge(z.object({
  belongsTo: z.lazy(() => PostSchema).nullable(),
  owner: z.lazy(() => UserSchema),
  likes: z.lazy(() => UserSchema).array(),
  replyTo: z.lazy(() => CommentSchema).nullable(),
  replies: z.lazy(() => CommentSchema).array(),
}).partial())

/////////////////////////////////////////
// MONGODB TYPES
/////////////////////////////////////////

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  posts: z.boolean().optional(),
  comments: z.boolean().optional(),
  LikeComments: z.boolean().optional(),
  roles: z.boolean().optional(),
  permissions: z.boolean().optional(),
  likedPosts: z.boolean().optional(),
  accessTokens: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  name: z.boolean().optional(),
  provider: z.boolean().optional(),
  activated: z.boolean().optional(),
  avatar: z.boolean().optional(),
  LikeCommentIDs: z.boolean().optional(),
  roleIDs: z.boolean().optional(),
  permissionIDs: z.boolean().optional(),
  likedPostIDs: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  posts: z.union([z.boolean(),z.lazy(() => PostArgsSchema)]).optional(),
  comments: z.union([z.boolean(),z.lazy(() => CommentArgsSchema)]).optional(),
  LikeComments: z.union([z.boolean(),z.lazy(() => CommentArgsSchema)]).optional(),
  roles: z.union([z.boolean(),z.lazy(() => RoleArgsSchema)]).optional(),
  permissions: z.union([z.boolean(),z.lazy(() => PermissionArgsSchema)]).optional(),
  likedPosts: z.union([z.boolean(),z.lazy(() => PostArgsSchema)]).optional(),
  accessTokens: z.union([z.boolean(),z.lazy(() => AccessTokenArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ROLE
//------------------------------------------------------

export const RoleIncludeSchema: z.ZodType<Prisma.RoleInclude> = z.object({
}).strict()

export const RoleArgsSchema: z.ZodType<Prisma.RoleDefaultArgs> = z.object({
  select: z.lazy(() => RoleSelectSchema).optional(),
  include: z.lazy(() => RoleIncludeSchema).optional(),
}).strict();

export const RoleCountOutputTypeArgsSchema: z.ZodType<Prisma.RoleCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => RoleCountOutputTypeSelectSchema).nullish(),
}).strict();

export const RoleCountOutputTypeSelectSchema: z.ZodType<Prisma.RoleCountOutputTypeSelect> = z.object({
  permissions: z.boolean().optional(),
  users: z.boolean().optional(),
}).strict();

export const RoleSelectSchema: z.ZodType<Prisma.RoleSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  label: z.boolean().optional(),
  description: z.boolean().optional(),
  systemic: z.boolean().optional(),
  permissionIDs: z.boolean().optional(),
  userIDs: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  permissions: z.union([z.boolean(),z.lazy(() => PermissionArgsSchema)]).optional(),
  users: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RoleCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PERMISSION
//------------------------------------------------------

export const PermissionIncludeSchema: z.ZodType<Prisma.PermissionInclude> = z.object({
}).strict()

export const PermissionArgsSchema: z.ZodType<Prisma.PermissionDefaultArgs> = z.object({
  select: z.lazy(() => PermissionSelectSchema).optional(),
  include: z.lazy(() => PermissionIncludeSchema).optional(),
}).strict();

export const PermissionCountOutputTypeArgsSchema: z.ZodType<Prisma.PermissionCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => PermissionCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PermissionCountOutputTypeSelectSchema: z.ZodType<Prisma.PermissionCountOutputTypeSelect> = z.object({
  roles: z.boolean().optional(),
  users: z.boolean().optional(),
}).strict();

export const PermissionSelectSchema: z.ZodType<Prisma.PermissionSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  label: z.boolean().optional(),
  description: z.boolean().optional(),
  rule: z.boolean().optional(),
  roleIDs: z.boolean().optional(),
  userIDs: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  roles: z.union([z.boolean(),z.lazy(() => RoleArgsSchema)]).optional(),
  users: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PermissionCountOutputTypeArgsSchema)]).optional(),
}).strict()

// POST
//------------------------------------------------------

export const PostIncludeSchema: z.ZodType<Prisma.PostInclude> = z.object({
}).strict()

export const PostArgsSchema: z.ZodType<Prisma.PostDefaultArgs> = z.object({
  select: z.lazy(() => PostSelectSchema).optional(),
  include: z.lazy(() => PostIncludeSchema).optional(),
}).strict();

export const PostCountOutputTypeArgsSchema: z.ZodType<Prisma.PostCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => PostCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PostCountOutputTypeSelectSchema: z.ZodType<Prisma.PostCountOutputTypeSelect> = z.object({
  likedUsers: z.boolean().optional(),
  comments: z.boolean().optional(),
  translations: z.boolean().optional(),
}).strict();

export const PostSelectSchema: z.ZodType<Prisma.PostSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  slug: z.boolean().optional(),
  content: z.boolean().optional(),
  meta: z.boolean().optional(),
  tags: z.boolean().optional(),
  thumbnailId: z.boolean().optional(),
  authorId: z.boolean().optional(),
  likedByUserIDs: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  thumbnail: z.union([z.boolean(),z.lazy(() => MediaEntityArgsSchema)]).optional(),
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  likedUsers: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  comments: z.union([z.boolean(),z.lazy(() => CommentArgsSchema)]).optional(),
  translations: z.union([z.boolean(),z.lazy(() => TranslationArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PostCountOutputTypeArgsSchema)]).optional(),
}).strict()

// TRANSLATION
//------------------------------------------------------

export const TranslationIncludeSchema: z.ZodType<Prisma.TranslationInclude> = z.object({
}).strict()

export const TranslationArgsSchema: z.ZodType<Prisma.TranslationDefaultArgs> = z.object({
  select: z.lazy(() => TranslationSelectSchema).optional(),
  include: z.lazy(() => TranslationIncludeSchema).optional(),
}).strict();

export const TranslationSelectSchema: z.ZodType<Prisma.TranslationSelect> = z.object({
  id: z.boolean().optional(),
  language: z.boolean().optional(),
  title: z.boolean().optional(),
  content: z.boolean().optional(),
  meta: z.boolean().optional(),
  postId: z.boolean().optional(),
  post: z.union([z.boolean(),z.lazy(() => PostArgsSchema)]).optional(),
}).strict()

// MEDIA ENTITY
//------------------------------------------------------

export const MediaEntityIncludeSchema: z.ZodType<Prisma.MediaEntityInclude> = z.object({
}).strict()

export const MediaEntityArgsSchema: z.ZodType<Prisma.MediaEntityDefaultArgs> = z.object({
  select: z.lazy(() => MediaEntitySelectSchema).optional(),
  include: z.lazy(() => MediaEntityIncludeSchema).optional(),
}).strict();

export const MediaEntityCountOutputTypeArgsSchema: z.ZodType<Prisma.MediaEntityCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => MediaEntityCountOutputTypeSelectSchema).nullish(),
}).strict();

export const MediaEntityCountOutputTypeSelectSchema: z.ZodType<Prisma.MediaEntityCountOutputTypeSelect> = z.object({
  post: z.boolean().optional(),
}).strict();

export const MediaEntitySelectSchema: z.ZodType<Prisma.MediaEntitySelect> = z.object({
  id: z.boolean().optional(),
  file: z.boolean().optional(),
  ext: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  post: z.union([z.boolean(),z.lazy(() => PostArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => MediaEntityCountOutputTypeArgsSchema)]).optional(),
}).strict()

// REFRESH TOKEN
//------------------------------------------------------

export const RefreshTokenIncludeSchema: z.ZodType<Prisma.RefreshTokenInclude> = z.object({
}).strict()

export const RefreshTokenArgsSchema: z.ZodType<Prisma.RefreshTokenDefaultArgs> = z.object({
  select: z.lazy(() => RefreshTokenSelectSchema).optional(),
  include: z.lazy(() => RefreshTokenIncludeSchema).optional(),
}).strict();

export const RefreshTokenSelectSchema: z.ZodType<Prisma.RefreshTokenSelect> = z.object({
  id: z.boolean().optional(),
  value: z.boolean().optional(),
  expired_at: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  accessTokenId: z.boolean().optional(),
  accessToken: z.union([z.boolean(),z.lazy(() => AccessTokenArgsSchema)]).optional(),
}).strict()

// ACCESS TOKEN
//------------------------------------------------------

export const AccessTokenIncludeSchema: z.ZodType<Prisma.AccessTokenInclude> = z.object({
}).strict()

export const AccessTokenArgsSchema: z.ZodType<Prisma.AccessTokenDefaultArgs> = z.object({
  select: z.lazy(() => AccessTokenSelectSchema).optional(),
  include: z.lazy(() => AccessTokenIncludeSchema).optional(),
}).strict();

export const AccessTokenSelectSchema: z.ZodType<Prisma.AccessTokenSelect> = z.object({
  id: z.boolean().optional(),
  value: z.boolean().optional(),
  expired_at: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  refreshToken: z.union([z.boolean(),z.lazy(() => RefreshTokenArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// COMMENT
//------------------------------------------------------

export const CommentIncludeSchema: z.ZodType<Prisma.CommentInclude> = z.object({
}).strict()

export const CommentArgsSchema: z.ZodType<Prisma.CommentDefaultArgs> = z.object({
  select: z.lazy(() => CommentSelectSchema).optional(),
  include: z.lazy(() => CommentIncludeSchema).optional(),
}).strict();

export const CommentCountOutputTypeArgsSchema: z.ZodType<Prisma.CommentCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CommentCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CommentCountOutputTypeSelectSchema: z.ZodType<Prisma.CommentCountOutputTypeSelect> = z.object({
  likes: z.boolean().optional(),
  replies: z.boolean().optional(),
}).strict();

export const CommentSelectSchema: z.ZodType<Prisma.CommentSelect> = z.object({
  id: z.boolean().optional(),
  belongsToId: z.boolean().optional(),
  ownerId: z.boolean().optional(),
  content: z.boolean().optional(),
  likedByUserIDs: z.boolean().optional(),
  repliedToID: z.boolean().optional(),
  chiefComment: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  belongsTo: z.union([z.boolean(),z.lazy(() => PostArgsSchema)]).optional(),
  owner: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  likes: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  replyTo: z.union([z.boolean(),z.lazy(() => CommentArgsSchema)]).optional(),
  replies: z.union([z.boolean(),z.lazy(() => CommentArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CommentCountOutputTypeArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  activated: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  avatar: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  LikeCommentIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  roleIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  permissionIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  likedPostIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  posts: z.lazy(() => PostListRelationFilterSchema).optional(),
  comments: z.lazy(() => CommentListRelationFilterSchema).optional(),
  LikeComments: z.lazy(() => CommentListRelationFilterSchema).optional(),
  roles: z.lazy(() => RoleListRelationFilterSchema).optional(),
  permissions: z.lazy(() => PermissionListRelationFilterSchema).optional(),
  likedPosts: z.lazy(() => PostListRelationFilterSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  activated: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.lazy(() => SortOrderSchema).optional(),
  LikeCommentIDs: z.lazy(() => SortOrderSchema).optional(),
  roleIDs: z.lazy(() => SortOrderSchema).optional(),
  permissionIDs: z.lazy(() => SortOrderSchema).optional(),
  likedPostIDs: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  posts: z.lazy(() => PostOrderByRelationAggregateInputSchema).optional(),
  comments: z.lazy(() => CommentOrderByRelationAggregateInputSchema).optional(),
  LikeComments: z.lazy(() => CommentOrderByRelationAggregateInputSchema).optional(),
  roles: z.lazy(() => RoleOrderByRelationAggregateInputSchema).optional(),
  permissions: z.lazy(() => PermissionOrderByRelationAggregateInputSchema).optional(),
  likedPosts: z.lazy(() => PostOrderByRelationAggregateInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    email: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  activated: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  avatar: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  LikeCommentIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  roleIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  permissionIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  likedPostIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  posts: z.lazy(() => PostListRelationFilterSchema).optional(),
  comments: z.lazy(() => CommentListRelationFilterSchema).optional(),
  LikeComments: z.lazy(() => CommentListRelationFilterSchema).optional(),
  roles: z.lazy(() => RoleListRelationFilterSchema).optional(),
  permissions: z.lazy(() => PermissionListRelationFilterSchema).optional(),
  likedPosts: z.lazy(() => PostListRelationFilterSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  activated: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.lazy(() => SortOrderSchema).optional(),
  LikeCommentIDs: z.lazy(() => SortOrderSchema).optional(),
  roleIDs: z.lazy(() => SortOrderSchema).optional(),
  permissionIDs: z.lazy(() => SortOrderSchema).optional(),
  likedPostIDs: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  activated: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  avatar: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  LikeCommentIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  roleIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  permissionIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  likedPostIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const RoleWhereInputSchema: z.ZodType<Prisma.RoleWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RoleWhereInputSchema),z.lazy(() => RoleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RoleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RoleWhereInputSchema),z.lazy(() => RoleWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  label: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  systemic: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  permissionIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  userIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  permissions: z.lazy(() => PermissionListRelationFilterSchema).optional(),
  users: z.lazy(() => UserListRelationFilterSchema).optional()
}).strict();

export const RoleOrderByWithRelationInputSchema: z.ZodType<Prisma.RoleOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  systemic: z.lazy(() => SortOrderSchema).optional(),
  permissionIDs: z.lazy(() => SortOrderSchema).optional(),
  userIDs: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  permissions: z.lazy(() => PermissionOrderByRelationAggregateInputSchema).optional(),
  users: z.lazy(() => UserOrderByRelationAggregateInputSchema).optional()
}).strict();

export const RoleWhereUniqueInputSchema: z.ZodType<Prisma.RoleWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => RoleWhereInputSchema),z.lazy(() => RoleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RoleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RoleWhereInputSchema),z.lazy(() => RoleWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  label: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  systemic: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  permissionIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  userIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  permissions: z.lazy(() => PermissionListRelationFilterSchema).optional(),
  users: z.lazy(() => UserListRelationFilterSchema).optional()
}).strict());

export const RoleOrderByWithAggregationInputSchema: z.ZodType<Prisma.RoleOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  systemic: z.lazy(() => SortOrderSchema).optional(),
  permissionIDs: z.lazy(() => SortOrderSchema).optional(),
  userIDs: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RoleCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RoleMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RoleMinOrderByAggregateInputSchema).optional()
}).strict();

export const RoleScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RoleScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RoleScalarWhereWithAggregatesInputSchema),z.lazy(() => RoleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RoleScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RoleScalarWhereWithAggregatesInputSchema),z.lazy(() => RoleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  label: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  systemic: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  permissionIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  userIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PermissionWhereInputSchema: z.ZodType<Prisma.PermissionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PermissionWhereInputSchema),z.lazy(() => PermissionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PermissionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PermissionWhereInputSchema),z.lazy(() => PermissionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  label: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  rule: z.lazy(() => JsonFilterSchema).optional(),
  roleIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  userIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  roles: z.lazy(() => RoleListRelationFilterSchema).optional(),
  users: z.lazy(() => UserListRelationFilterSchema).optional()
}).strict();

export const PermissionOrderByWithRelationInputSchema: z.ZodType<Prisma.PermissionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  rule: z.lazy(() => SortOrderSchema).optional(),
  roleIDs: z.lazy(() => SortOrderSchema).optional(),
  userIDs: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  roles: z.lazy(() => RoleOrderByRelationAggregateInputSchema).optional(),
  users: z.lazy(() => UserOrderByRelationAggregateInputSchema).optional()
}).strict();

export const PermissionWhereUniqueInputSchema: z.ZodType<Prisma.PermissionWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => PermissionWhereInputSchema),z.lazy(() => PermissionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PermissionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PermissionWhereInputSchema),z.lazy(() => PermissionWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  label: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  rule: z.lazy(() => JsonFilterSchema).optional(),
  roleIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  userIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  roles: z.lazy(() => RoleListRelationFilterSchema).optional(),
  users: z.lazy(() => UserListRelationFilterSchema).optional()
}).strict());

export const PermissionOrderByWithAggregationInputSchema: z.ZodType<Prisma.PermissionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  rule: z.lazy(() => SortOrderSchema).optional(),
  roleIDs: z.lazy(() => SortOrderSchema).optional(),
  userIDs: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PermissionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PermissionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PermissionMinOrderByAggregateInputSchema).optional()
}).strict();

export const PermissionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PermissionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PermissionScalarWhereWithAggregatesInputSchema),z.lazy(() => PermissionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PermissionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PermissionScalarWhereWithAggregatesInputSchema),z.lazy(() => PermissionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  label: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  rule: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  roleIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  userIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PostWhereInputSchema: z.ZodType<Prisma.PostWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PostWhereInputSchema),z.lazy(() => PostWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PostWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PostWhereInputSchema),z.lazy(() => PostWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  meta: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tags: z.lazy(() => StringNullableListFilterSchema).optional(),
  thumbnailId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  authorId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  likedByUserIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  thumbnail: z.union([ z.lazy(() => MediaEntityNullableRelationFilterSchema),z.lazy(() => MediaEntityWhereInputSchema) ]).optional().nullable(),
  author: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  likedUsers: z.lazy(() => UserListRelationFilterSchema).optional(),
  comments: z.lazy(() => CommentListRelationFilterSchema).optional(),
  translations: z.lazy(() => TranslationListRelationFilterSchema).optional()
}).strict();

export const PostOrderByWithRelationInputSchema: z.ZodType<Prisma.PostOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  meta: z.lazy(() => SortOrderSchema).optional(),
  tags: z.lazy(() => SortOrderSchema).optional(),
  thumbnailId: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  likedByUserIDs: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  thumbnail: z.lazy(() => MediaEntityOrderByWithRelationInputSchema).optional(),
  author: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  likedUsers: z.lazy(() => UserOrderByRelationAggregateInputSchema).optional(),
  comments: z.lazy(() => CommentOrderByRelationAggregateInputSchema).optional(),
  translations: z.lazy(() => TranslationOrderByRelationAggregateInputSchema).optional()
}).strict();

export const PostWhereUniqueInputSchema: z.ZodType<Prisma.PostWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    slug: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    slug: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  slug: z.string().optional(),
  AND: z.union([ z.lazy(() => PostWhereInputSchema),z.lazy(() => PostWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PostWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PostWhereInputSchema),z.lazy(() => PostWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  meta: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tags: z.lazy(() => StringNullableListFilterSchema).optional(),
  thumbnailId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  authorId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  likedByUserIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  thumbnail: z.union([ z.lazy(() => MediaEntityNullableRelationFilterSchema),z.lazy(() => MediaEntityWhereInputSchema) ]).optional().nullable(),
  author: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  likedUsers: z.lazy(() => UserListRelationFilterSchema).optional(),
  comments: z.lazy(() => CommentListRelationFilterSchema).optional(),
  translations: z.lazy(() => TranslationListRelationFilterSchema).optional()
}).strict());

export const PostOrderByWithAggregationInputSchema: z.ZodType<Prisma.PostOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  meta: z.lazy(() => SortOrderSchema).optional(),
  tags: z.lazy(() => SortOrderSchema).optional(),
  thumbnailId: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  likedByUserIDs: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PostCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PostMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PostMinOrderByAggregateInputSchema).optional()
}).strict();

export const PostScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PostScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PostScalarWhereWithAggregatesInputSchema),z.lazy(() => PostScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PostScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PostScalarWhereWithAggregatesInputSchema),z.lazy(() => PostScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  meta: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  tags: z.lazy(() => StringNullableListFilterSchema).optional(),
  thumbnailId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  authorId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  likedByUserIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const TranslationWhereInputSchema: z.ZodType<Prisma.TranslationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TranslationWhereInputSchema),z.lazy(() => TranslationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TranslationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TranslationWhereInputSchema),z.lazy(() => TranslationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  language: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  meta: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  postId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  post: z.union([ z.lazy(() => PostRelationFilterSchema),z.lazy(() => PostWhereInputSchema) ]).optional(),
}).strict();

export const TranslationOrderByWithRelationInputSchema: z.ZodType<Prisma.TranslationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  language: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  meta: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  post: z.lazy(() => PostOrderByWithRelationInputSchema).optional()
}).strict();

export const TranslationWhereUniqueInputSchema: z.ZodType<Prisma.TranslationWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => TranslationWhereInputSchema),z.lazy(() => TranslationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TranslationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TranslationWhereInputSchema),z.lazy(() => TranslationWhereInputSchema).array() ]).optional(),
  language: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  meta: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  postId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  post: z.union([ z.lazy(() => PostRelationFilterSchema),z.lazy(() => PostWhereInputSchema) ]).optional(),
}).strict());

export const TranslationOrderByWithAggregationInputSchema: z.ZodType<Prisma.TranslationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  language: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  meta: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TranslationCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TranslationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TranslationMinOrderByAggregateInputSchema).optional()
}).strict();

export const TranslationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TranslationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TranslationScalarWhereWithAggregatesInputSchema),z.lazy(() => TranslationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TranslationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TranslationScalarWhereWithAggregatesInputSchema),z.lazy(() => TranslationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  language: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  meta: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  postId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const MediaEntityWhereInputSchema: z.ZodType<Prisma.MediaEntityWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MediaEntityWhereInputSchema),z.lazy(() => MediaEntityWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MediaEntityWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MediaEntityWhereInputSchema),z.lazy(() => MediaEntityWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  file: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ext: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  post: z.lazy(() => PostListRelationFilterSchema).optional()
}).strict();

export const MediaEntityOrderByWithRelationInputSchema: z.ZodType<Prisma.MediaEntityOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  file: z.lazy(() => SortOrderSchema).optional(),
  ext: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  post: z.lazy(() => PostOrderByRelationAggregateInputSchema).optional()
}).strict();

export const MediaEntityWhereUniqueInputSchema: z.ZodType<Prisma.MediaEntityWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => MediaEntityWhereInputSchema),z.lazy(() => MediaEntityWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MediaEntityWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MediaEntityWhereInputSchema),z.lazy(() => MediaEntityWhereInputSchema).array() ]).optional(),
  file: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ext: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  post: z.lazy(() => PostListRelationFilterSchema).optional()
}).strict());

export const MediaEntityOrderByWithAggregationInputSchema: z.ZodType<Prisma.MediaEntityOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  file: z.lazy(() => SortOrderSchema).optional(),
  ext: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => MediaEntityCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MediaEntityMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MediaEntityMinOrderByAggregateInputSchema).optional()
}).strict();

export const MediaEntityScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MediaEntityScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => MediaEntityScalarWhereWithAggregatesInputSchema),z.lazy(() => MediaEntityScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => MediaEntityScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MediaEntityScalarWhereWithAggregatesInputSchema),z.lazy(() => MediaEntityScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  file: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  ext: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const RefreshTokenWhereInputSchema: z.ZodType<Prisma.RefreshTokenWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RefreshTokenWhereInputSchema),z.lazy(() => RefreshTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RefreshTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RefreshTokenWhereInputSchema),z.lazy(() => RefreshTokenWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expired_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  accessTokenId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  accessToken: z.union([ z.lazy(() => AccessTokenRelationFilterSchema),z.lazy(() => AccessTokenWhereInputSchema) ]).optional(),
}).strict();

export const RefreshTokenOrderByWithRelationInputSchema: z.ZodType<Prisma.RefreshTokenOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  expired_at: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  accessTokenId: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.lazy(() => AccessTokenOrderByWithRelationInputSchema).optional()
}).strict();

export const RefreshTokenWhereUniqueInputSchema: z.ZodType<Prisma.RefreshTokenWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    accessTokenId: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    accessTokenId: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  accessTokenId: z.string().optional(),
  AND: z.union([ z.lazy(() => RefreshTokenWhereInputSchema),z.lazy(() => RefreshTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RefreshTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RefreshTokenWhereInputSchema),z.lazy(() => RefreshTokenWhereInputSchema).array() ]).optional(),
  value: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expired_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  accessToken: z.union([ z.lazy(() => AccessTokenRelationFilterSchema),z.lazy(() => AccessTokenWhereInputSchema) ]).optional(),
}).strict());

export const RefreshTokenOrderByWithAggregationInputSchema: z.ZodType<Prisma.RefreshTokenOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  expired_at: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  accessTokenId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RefreshTokenCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RefreshTokenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RefreshTokenMinOrderByAggregateInputSchema).optional()
}).strict();

export const RefreshTokenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RefreshTokenScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RefreshTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => RefreshTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RefreshTokenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RefreshTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => RefreshTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expired_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  accessTokenId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const AccessTokenWhereInputSchema: z.ZodType<Prisma.AccessTokenWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccessTokenWhereInputSchema),z.lazy(() => AccessTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccessTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccessTokenWhereInputSchema),z.lazy(() => AccessTokenWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expired_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refreshToken: z.union([ z.lazy(() => RefreshTokenNullableRelationFilterSchema),z.lazy(() => RefreshTokenWhereInputSchema) ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const AccessTokenOrderByWithRelationInputSchema: z.ZodType<Prisma.AccessTokenOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  expired_at: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  refreshToken: z.lazy(() => RefreshTokenOrderByWithRelationInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const AccessTokenWhereUniqueInputSchema: z.ZodType<Prisma.AccessTokenWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => AccessTokenWhereInputSchema),z.lazy(() => AccessTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccessTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccessTokenWhereInputSchema),z.lazy(() => AccessTokenWhereInputSchema).array() ]).optional(),
  value: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expired_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refreshToken: z.union([ z.lazy(() => RefreshTokenNullableRelationFilterSchema),z.lazy(() => RefreshTokenWhereInputSchema) ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const AccessTokenOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccessTokenOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  expired_at: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AccessTokenCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AccessTokenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AccessTokenMinOrderByAggregateInputSchema).optional()
}).strict();

export const AccessTokenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccessTokenScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AccessTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => AccessTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccessTokenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccessTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => AccessTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expired_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const CommentWhereInputSchema: z.ZodType<Prisma.CommentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CommentWhereInputSchema),z.lazy(() => CommentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentWhereInputSchema),z.lazy(() => CommentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  belongsToId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  ownerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  likedByUserIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  repliedToID: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  chiefComment: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  belongsTo: z.union([ z.lazy(() => PostNullableRelationFilterSchema),z.lazy(() => PostWhereInputSchema) ]).optional().nullable(),
  owner: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  likes: z.lazy(() => UserListRelationFilterSchema).optional(),
  replyTo: z.union([ z.lazy(() => CommentNullableRelationFilterSchema),z.lazy(() => CommentWhereInputSchema) ]).optional().nullable(),
  replies: z.lazy(() => CommentListRelationFilterSchema).optional()
}).strict();

export const CommentOrderByWithRelationInputSchema: z.ZodType<Prisma.CommentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  belongsToId: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  likedByUserIDs: z.lazy(() => SortOrderSchema).optional(),
  repliedToID: z.lazy(() => SortOrderSchema).optional(),
  chiefComment: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  belongsTo: z.lazy(() => PostOrderByWithRelationInputSchema).optional(),
  owner: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  likes: z.lazy(() => UserOrderByRelationAggregateInputSchema).optional(),
  replyTo: z.lazy(() => CommentOrderByWithRelationInputSchema).optional(),
  replies: z.lazy(() => CommentOrderByRelationAggregateInputSchema).optional()
}).strict();

export const CommentWhereUniqueInputSchema: z.ZodType<Prisma.CommentWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => CommentWhereInputSchema),z.lazy(() => CommentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentWhereInputSchema),z.lazy(() => CommentWhereInputSchema).array() ]).optional(),
  belongsToId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  ownerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  likedByUserIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  repliedToID: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  chiefComment: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  belongsTo: z.union([ z.lazy(() => PostNullableRelationFilterSchema),z.lazy(() => PostWhereInputSchema) ]).optional().nullable(),
  owner: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  likes: z.lazy(() => UserListRelationFilterSchema).optional(),
  replyTo: z.union([ z.lazy(() => CommentNullableRelationFilterSchema),z.lazy(() => CommentWhereInputSchema) ]).optional().nullable(),
  replies: z.lazy(() => CommentListRelationFilterSchema).optional()
}).strict());

export const CommentOrderByWithAggregationInputSchema: z.ZodType<Prisma.CommentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  belongsToId: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  likedByUserIDs: z.lazy(() => SortOrderSchema).optional(),
  repliedToID: z.lazy(() => SortOrderSchema).optional(),
  chiefComment: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CommentCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CommentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CommentMinOrderByAggregateInputSchema).optional()
}).strict();

export const CommentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CommentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CommentScalarWhereWithAggregatesInputSchema),z.lazy(() => CommentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentScalarWhereWithAggregatesInputSchema),z.lazy(() => CommentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  belongsToId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  ownerId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  likedByUserIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  repliedToID: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  chiefComment: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string(),
  provider: z.string(),
  activated: z.boolean().optional(),
  avatar: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostCreateNestedManyWithoutAuthorInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutOwnerInputSchema).optional(),
  LikeComments: z.lazy(() => CommentCreateNestedManyWithoutLikesInputSchema).optional(),
  roles: z.lazy(() => RoleCreateNestedManyWithoutUsersInputSchema).optional(),
  permissions: z.lazy(() => PermissionCreateNestedManyWithoutUsersInputSchema).optional(),
  likedPosts: z.lazy(() => PostCreateNestedManyWithoutLikedUsersInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string(),
  provider: z.string(),
  activated: z.boolean().optional(),
  avatar: z.string().optional().nullable(),
  LikeCommentIDs: z.union([ z.lazy(() => UserCreateLikeCommentIDsInputSchema),z.string().array() ]).optional(),
  roleIDs: z.union([ z.lazy(() => UserCreateroleIDsInputSchema),z.string().array() ]).optional(),
  permissionIDs: z.union([ z.lazy(() => UserCreatepermissionIDsInputSchema),z.string().array() ]).optional(),
  likedPostIDs: z.union([ z.lazy(() => UserCreatelikedPostIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  LikeComments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutLikesInputSchema).optional(),
  roles: z.lazy(() => RoleUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  permissions: z.lazy(() => PermissionUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  likedPosts: z.lazy(() => PostUncheckedCreateNestedManyWithoutLikedUsersInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUpdateManyWithoutAuthorNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutOwnerNestedInputSchema).optional(),
  LikeComments: z.lazy(() => CommentUpdateManyWithoutLikesNestedInputSchema).optional(),
  roles: z.lazy(() => RoleUpdateManyWithoutUsersNestedInputSchema).optional(),
  permissions: z.lazy(() => PermissionUpdateManyWithoutUsersNestedInputSchema).optional(),
  likedPosts: z.lazy(() => PostUpdateManyWithoutLikedUsersNestedInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  LikeCommentIDs: z.union([ z.lazy(() => UserUpdateLikeCommentIDsInputSchema),z.string().array() ]).optional(),
  roleIDs: z.union([ z.lazy(() => UserUpdateroleIDsInputSchema),z.string().array() ]).optional(),
  permissionIDs: z.union([ z.lazy(() => UserUpdatepermissionIDsInputSchema),z.string().array() ]).optional(),
  likedPostIDs: z.union([ z.lazy(() => UserUpdatelikedPostIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  LikeComments: z.lazy(() => CommentUncheckedUpdateManyWithoutLikesNestedInputSchema).optional(),
  roles: z.lazy(() => RoleUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  permissions: z.lazy(() => PermissionUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  likedPosts: z.lazy(() => PostUncheckedUpdateManyWithoutLikedUsersNestedInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string(),
  provider: z.string(),
  activated: z.boolean().optional(),
  avatar: z.string().optional().nullable(),
  LikeCommentIDs: z.union([ z.lazy(() => UserCreateLikeCommentIDsInputSchema),z.string().array() ]).optional(),
  roleIDs: z.union([ z.lazy(() => UserCreateroleIDsInputSchema),z.string().array() ]).optional(),
  permissionIDs: z.union([ z.lazy(() => UserCreatepermissionIDsInputSchema),z.string().array() ]).optional(),
  likedPostIDs: z.union([ z.lazy(() => UserCreatelikedPostIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  LikeCommentIDs: z.union([ z.lazy(() => UserUpdateLikeCommentIDsInputSchema),z.string().array() ]).optional(),
  roleIDs: z.union([ z.lazy(() => UserUpdateroleIDsInputSchema),z.string().array() ]).optional(),
  permissionIDs: z.union([ z.lazy(() => UserUpdatepermissionIDsInputSchema),z.string().array() ]).optional(),
  likedPostIDs: z.union([ z.lazy(() => UserUpdatelikedPostIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RoleCreateInputSchema: z.ZodType<Prisma.RoleCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  label: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  systemic: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  permissions: z.lazy(() => PermissionCreateNestedManyWithoutRolesInputSchema).optional(),
  users: z.lazy(() => UserCreateNestedManyWithoutRolesInputSchema).optional()
}).strict();

export const RoleUncheckedCreateInputSchema: z.ZodType<Prisma.RoleUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  label: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  systemic: z.boolean().optional(),
  permissionIDs: z.union([ z.lazy(() => RoleCreatepermissionIDsInputSchema),z.string().array() ]).optional(),
  userIDs: z.union([ z.lazy(() => RoleCreateuserIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  permissions: z.lazy(() => PermissionUncheckedCreateNestedManyWithoutRolesInputSchema).optional(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutRolesInputSchema).optional()
}).strict();

export const RoleUpdateInputSchema: z.ZodType<Prisma.RoleUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  systemic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  permissions: z.lazy(() => PermissionUpdateManyWithoutRolesNestedInputSchema).optional(),
  users: z.lazy(() => UserUpdateManyWithoutRolesNestedInputSchema).optional()
}).strict();

export const RoleUncheckedUpdateInputSchema: z.ZodType<Prisma.RoleUncheckedUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  systemic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  permissionIDs: z.union([ z.lazy(() => RoleUpdatepermissionIDsInputSchema),z.string().array() ]).optional(),
  userIDs: z.union([ z.lazy(() => RoleUpdateuserIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  permissions: z.lazy(() => PermissionUncheckedUpdateManyWithoutRolesNestedInputSchema).optional(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutRolesNestedInputSchema).optional()
}).strict();

export const RoleCreateManyInputSchema: z.ZodType<Prisma.RoleCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  label: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  systemic: z.boolean().optional(),
  permissionIDs: z.union([ z.lazy(() => RoleCreatepermissionIDsInputSchema),z.string().array() ]).optional(),
  userIDs: z.union([ z.lazy(() => RoleCreateuserIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const RoleUpdateManyMutationInputSchema: z.ZodType<Prisma.RoleUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  systemic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RoleUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RoleUncheckedUpdateManyInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  systemic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  permissionIDs: z.union([ z.lazy(() => RoleUpdatepermissionIDsInputSchema),z.string().array() ]).optional(),
  userIDs: z.union([ z.lazy(() => RoleUpdateuserIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PermissionCreateInputSchema: z.ZodType<Prisma.PermissionCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  label: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  rule: InputJsonValue,
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  roles: z.lazy(() => RoleCreateNestedManyWithoutPermissionsInputSchema).optional(),
  users: z.lazy(() => UserCreateNestedManyWithoutPermissionsInputSchema).optional()
}).strict();

export const PermissionUncheckedCreateInputSchema: z.ZodType<Prisma.PermissionUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  label: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  rule: InputJsonValue,
  roleIDs: z.union([ z.lazy(() => PermissionCreateroleIDsInputSchema),z.string().array() ]).optional(),
  userIDs: z.union([ z.lazy(() => PermissionCreateuserIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  roles: z.lazy(() => RoleUncheckedCreateNestedManyWithoutPermissionsInputSchema).optional(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutPermissionsInputSchema).optional()
}).strict();

export const PermissionUpdateInputSchema: z.ZodType<Prisma.PermissionUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rule: z.union([ InputJsonValue,InputJsonValue ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  roles: z.lazy(() => RoleUpdateManyWithoutPermissionsNestedInputSchema).optional(),
  users: z.lazy(() => UserUpdateManyWithoutPermissionsNestedInputSchema).optional()
}).strict();

export const PermissionUncheckedUpdateInputSchema: z.ZodType<Prisma.PermissionUncheckedUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rule: z.union([ InputJsonValue,InputJsonValue ]).optional(),
  roleIDs: z.union([ z.lazy(() => PermissionUpdateroleIDsInputSchema),z.string().array() ]).optional(),
  userIDs: z.union([ z.lazy(() => PermissionUpdateuserIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  roles: z.lazy(() => RoleUncheckedUpdateManyWithoutPermissionsNestedInputSchema).optional(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutPermissionsNestedInputSchema).optional()
}).strict();

export const PermissionCreateManyInputSchema: z.ZodType<Prisma.PermissionCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  label: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  rule: InputJsonValue,
  roleIDs: z.union([ z.lazy(() => PermissionCreateroleIDsInputSchema),z.string().array() ]).optional(),
  userIDs: z.union([ z.lazy(() => PermissionCreateuserIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PermissionUpdateManyMutationInputSchema: z.ZodType<Prisma.PermissionUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rule: z.union([ InputJsonValue,InputJsonValue ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PermissionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PermissionUncheckedUpdateManyInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rule: z.union([ InputJsonValue,InputJsonValue ]).optional(),
  roleIDs: z.union([ z.lazy(() => PermissionUpdateroleIDsInputSchema),z.string().array() ]).optional(),
  userIDs: z.union([ z.lazy(() => PermissionUpdateuserIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PostCreateInputSchema: z.ZodType<Prisma.PostCreateInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string().optional().nullable(),
  meta: z.string(),
  tags: z.union([ z.lazy(() => PostCreatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  thumbnail: z.lazy(() => MediaEntityCreateNestedOneWithoutPostInputSchema).optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutPostsInputSchema).optional(),
  likedUsers: z.lazy(() => UserCreateNestedManyWithoutLikedPostsInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutBelongsToInputSchema).optional(),
  translations: z.lazy(() => TranslationCreateNestedManyWithoutPostInputSchema).optional()
}).strict();

export const PostUncheckedCreateInputSchema: z.ZodType<Prisma.PostUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string().optional().nullable(),
  meta: z.string(),
  tags: z.union([ z.lazy(() => PostCreatetagsInputSchema),z.string().array() ]).optional(),
  thumbnailId: z.string().optional().nullable(),
  authorId: z.string().optional().nullable(),
  likedByUserIDs: z.union([ z.lazy(() => PostCreatelikedByUserIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  likedUsers: z.lazy(() => UserUncheckedCreateNestedManyWithoutLikedPostsInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutBelongsToInputSchema).optional(),
  translations: z.lazy(() => TranslationUncheckedCreateNestedManyWithoutPostInputSchema).optional()
}).strict();

export const PostUpdateInputSchema: z.ZodType<Prisma.PostUpdateInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => PostUpdatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  thumbnail: z.lazy(() => MediaEntityUpdateOneWithoutPostNestedInputSchema).optional(),
  author: z.lazy(() => UserUpdateOneWithoutPostsNestedInputSchema).optional(),
  likedUsers: z.lazy(() => UserUpdateManyWithoutLikedPostsNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutBelongsToNestedInputSchema).optional(),
  translations: z.lazy(() => TranslationUpdateManyWithoutPostNestedInputSchema).optional()
}).strict();

export const PostUncheckedUpdateInputSchema: z.ZodType<Prisma.PostUncheckedUpdateInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => PostUpdatetagsInputSchema),z.string().array() ]).optional(),
  thumbnailId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  authorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  likedByUserIDs: z.union([ z.lazy(() => PostUpdatelikedByUserIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  likedUsers: z.lazy(() => UserUncheckedUpdateManyWithoutLikedPostsNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutBelongsToNestedInputSchema).optional(),
  translations: z.lazy(() => TranslationUncheckedUpdateManyWithoutPostNestedInputSchema).optional()
}).strict();

export const PostCreateManyInputSchema: z.ZodType<Prisma.PostCreateManyInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string().optional().nullable(),
  meta: z.string(),
  tags: z.union([ z.lazy(() => PostCreatetagsInputSchema),z.string().array() ]).optional(),
  thumbnailId: z.string().optional().nullable(),
  authorId: z.string().optional().nullable(),
  likedByUserIDs: z.union([ z.lazy(() => PostCreatelikedByUserIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PostUpdateManyMutationInputSchema: z.ZodType<Prisma.PostUpdateManyMutationInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => PostUpdatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PostUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => PostUpdatetagsInputSchema),z.string().array() ]).optional(),
  thumbnailId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  authorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  likedByUserIDs: z.union([ z.lazy(() => PostUpdatelikedByUserIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TranslationCreateInputSchema: z.ZodType<Prisma.TranslationCreateInput> = z.object({
  id: z.string().optional(),
  language: z.string(),
  title: z.string(),
  content: z.string().optional().nullable(),
  meta: z.string(),
  post: z.lazy(() => PostCreateNestedOneWithoutTranslationsInputSchema)
}).strict();

export const TranslationUncheckedCreateInputSchema: z.ZodType<Prisma.TranslationUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  language: z.string(),
  title: z.string(),
  content: z.string().optional().nullable(),
  meta: z.string(),
  postId: z.string()
}).strict();

export const TranslationUpdateInputSchema: z.ZodType<Prisma.TranslationUpdateInput> = z.object({
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  post: z.lazy(() => PostUpdateOneRequiredWithoutTranslationsNestedInputSchema).optional()
}).strict();

export const TranslationUncheckedUpdateInputSchema: z.ZodType<Prisma.TranslationUncheckedUpdateInput> = z.object({
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TranslationCreateManyInputSchema: z.ZodType<Prisma.TranslationCreateManyInput> = z.object({
  id: z.string().optional(),
  language: z.string(),
  title: z.string(),
  content: z.string().optional().nullable(),
  meta: z.string(),
  postId: z.string()
}).strict();

export const TranslationUpdateManyMutationInputSchema: z.ZodType<Prisma.TranslationUpdateManyMutationInput> = z.object({
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TranslationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TranslationUncheckedUpdateManyInput> = z.object({
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MediaEntityCreateInputSchema: z.ZodType<Prisma.MediaEntityCreateInput> = z.object({
  id: z.string().optional(),
  file: z.string(),
  ext: z.string(),
  createdAt: z.coerce.date().optional(),
  post: z.lazy(() => PostCreateNestedManyWithoutThumbnailInputSchema).optional()
}).strict();

export const MediaEntityUncheckedCreateInputSchema: z.ZodType<Prisma.MediaEntityUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  file: z.string(),
  ext: z.string(),
  createdAt: z.coerce.date().optional(),
  post: z.lazy(() => PostUncheckedCreateNestedManyWithoutThumbnailInputSchema).optional()
}).strict();

export const MediaEntityUpdateInputSchema: z.ZodType<Prisma.MediaEntityUpdateInput> = z.object({
  file: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ext: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  post: z.lazy(() => PostUpdateManyWithoutThumbnailNestedInputSchema).optional()
}).strict();

export const MediaEntityUncheckedUpdateInputSchema: z.ZodType<Prisma.MediaEntityUncheckedUpdateInput> = z.object({
  file: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ext: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  post: z.lazy(() => PostUncheckedUpdateManyWithoutThumbnailNestedInputSchema).optional()
}).strict();

export const MediaEntityCreateManyInputSchema: z.ZodType<Prisma.MediaEntityCreateManyInput> = z.object({
  id: z.string().optional(),
  file: z.string(),
  ext: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const MediaEntityUpdateManyMutationInputSchema: z.ZodType<Prisma.MediaEntityUpdateManyMutationInput> = z.object({
  file: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ext: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MediaEntityUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MediaEntityUncheckedUpdateManyInput> = z.object({
  file: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ext: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RefreshTokenCreateInputSchema: z.ZodType<Prisma.RefreshTokenCreateInput> = z.object({
  id: z.string().optional(),
  value: z.string(),
  expired_at: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  accessToken: z.lazy(() => AccessTokenCreateNestedOneWithoutRefreshTokenInputSchema)
}).strict();

export const RefreshTokenUncheckedCreateInputSchema: z.ZodType<Prisma.RefreshTokenUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  value: z.string(),
  expired_at: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  accessTokenId: z.string()
}).strict();

export const RefreshTokenUpdateInputSchema: z.ZodType<Prisma.RefreshTokenUpdateInput> = z.object({
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expired_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.lazy(() => AccessTokenUpdateOneRequiredWithoutRefreshTokenNestedInputSchema).optional()
}).strict();

export const RefreshTokenUncheckedUpdateInputSchema: z.ZodType<Prisma.RefreshTokenUncheckedUpdateInput> = z.object({
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expired_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accessTokenId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RefreshTokenCreateManyInputSchema: z.ZodType<Prisma.RefreshTokenCreateManyInput> = z.object({
  id: z.string().optional(),
  value: z.string(),
  expired_at: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  accessTokenId: z.string()
}).strict();

export const RefreshTokenUpdateManyMutationInputSchema: z.ZodType<Prisma.RefreshTokenUpdateManyMutationInput> = z.object({
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expired_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RefreshTokenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RefreshTokenUncheckedUpdateManyInput> = z.object({
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expired_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accessTokenId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccessTokenCreateInputSchema: z.ZodType<Prisma.AccessTokenCreateInput> = z.object({
  id: z.string().optional(),
  value: z.string(),
  expired_at: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  refreshToken: z.lazy(() => RefreshTokenCreateNestedOneWithoutAccessTokenInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutAccessTokensInputSchema)
}).strict();

export const AccessTokenUncheckedCreateInputSchema: z.ZodType<Prisma.AccessTokenUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  value: z.string(),
  expired_at: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  userId: z.string(),
  refreshToken: z.lazy(() => RefreshTokenUncheckedCreateNestedOneWithoutAccessTokenInputSchema).optional()
}).strict();

export const AccessTokenUpdateInputSchema: z.ZodType<Prisma.AccessTokenUpdateInput> = z.object({
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expired_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  refreshToken: z.lazy(() => RefreshTokenUpdateOneWithoutAccessTokenNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAccessTokensNestedInputSchema).optional()
}).strict();

export const AccessTokenUncheckedUpdateInputSchema: z.ZodType<Prisma.AccessTokenUncheckedUpdateInput> = z.object({
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expired_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refreshToken: z.lazy(() => RefreshTokenUncheckedUpdateOneWithoutAccessTokenNestedInputSchema).optional()
}).strict();

export const AccessTokenCreateManyInputSchema: z.ZodType<Prisma.AccessTokenCreateManyInput> = z.object({
  id: z.string().optional(),
  value: z.string(),
  expired_at: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  userId: z.string()
}).strict();

export const AccessTokenUpdateManyMutationInputSchema: z.ZodType<Prisma.AccessTokenUpdateManyMutationInput> = z.object({
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expired_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccessTokenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccessTokenUncheckedUpdateManyInput> = z.object({
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expired_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentCreateInputSchema: z.ZodType<Prisma.CommentCreateInput> = z.object({
  id: z.string().optional(),
  content: z.string(),
  chiefComment: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  belongsTo: z.lazy(() => PostCreateNestedOneWithoutCommentsInputSchema).optional(),
  owner: z.lazy(() => UserCreateNestedOneWithoutCommentsInputSchema),
  likes: z.lazy(() => UserCreateNestedManyWithoutLikeCommentsInputSchema).optional(),
  replyTo: z.lazy(() => CommentCreateNestedOneWithoutRepliesInputSchema).optional(),
  replies: z.lazy(() => CommentCreateNestedManyWithoutReplyToInputSchema).optional()
}).strict();

export const CommentUncheckedCreateInputSchema: z.ZodType<Prisma.CommentUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  belongsToId: z.string().optional().nullable(),
  ownerId: z.string(),
  content: z.string(),
  likedByUserIDs: z.union([ z.lazy(() => CommentCreatelikedByUserIDsInputSchema),z.string().array() ]).optional(),
  repliedToID: z.string().optional().nullable(),
  chiefComment: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  likes: z.lazy(() => UserUncheckedCreateNestedManyWithoutLikeCommentsInputSchema).optional(),
  replies: z.lazy(() => CommentUncheckedCreateNestedManyWithoutReplyToInputSchema).optional()
}).strict();

export const CommentUpdateInputSchema: z.ZodType<Prisma.CommentUpdateInput> = z.object({
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  chiefComment: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  belongsTo: z.lazy(() => PostUpdateOneWithoutCommentsNestedInputSchema).optional(),
  owner: z.lazy(() => UserUpdateOneRequiredWithoutCommentsNestedInputSchema).optional(),
  likes: z.lazy(() => UserUpdateManyWithoutLikeCommentsNestedInputSchema).optional(),
  replyTo: z.lazy(() => CommentUpdateOneWithoutRepliesNestedInputSchema).optional(),
  replies: z.lazy(() => CommentUpdateManyWithoutReplyToNestedInputSchema).optional()
}).strict();

export const CommentUncheckedUpdateInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateInput> = z.object({
  belongsToId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  likedByUserIDs: z.union([ z.lazy(() => CommentUpdatelikedByUserIDsInputSchema),z.string().array() ]).optional(),
  repliedToID: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chiefComment: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  likes: z.lazy(() => UserUncheckedUpdateManyWithoutLikeCommentsNestedInputSchema).optional(),
  replies: z.lazy(() => CommentUncheckedUpdateManyWithoutReplyToNestedInputSchema).optional()
}).strict();

export const CommentCreateManyInputSchema: z.ZodType<Prisma.CommentCreateManyInput> = z.object({
  id: z.string().optional(),
  belongsToId: z.string().optional().nullable(),
  ownerId: z.string(),
  content: z.string(),
  likedByUserIDs: z.union([ z.lazy(() => CommentCreatelikedByUserIDsInputSchema),z.string().array() ]).optional(),
  repliedToID: z.string().optional().nullable(),
  chiefComment: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const CommentUpdateManyMutationInputSchema: z.ZodType<Prisma.CommentUpdateManyMutationInput> = z.object({
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  chiefComment: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyInput> = z.object({
  belongsToId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  likedByUserIDs: z.union([ z.lazy(() => CommentUpdatelikedByUserIDsInputSchema),z.string().array() ]).optional(),
  repliedToID: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chiefComment: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const StringNullableListFilterSchema: z.ZodType<Prisma.StringNullableListFilter> = z.object({
  equals: z.string().array().optional().nullable(),
  has: z.string().optional().nullable(),
  hasEvery: z.string().array().optional(),
  hasSome: z.string().array().optional(),
  isEmpty: z.boolean().optional()
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const PostListRelationFilterSchema: z.ZodType<Prisma.PostListRelationFilter> = z.object({
  every: z.lazy(() => PostWhereInputSchema).optional(),
  some: z.lazy(() => PostWhereInputSchema).optional(),
  none: z.lazy(() => PostWhereInputSchema).optional()
}).strict();

export const CommentListRelationFilterSchema: z.ZodType<Prisma.CommentListRelationFilter> = z.object({
  every: z.lazy(() => CommentWhereInputSchema).optional(),
  some: z.lazy(() => CommentWhereInputSchema).optional(),
  none: z.lazy(() => CommentWhereInputSchema).optional()
}).strict();

export const RoleListRelationFilterSchema: z.ZodType<Prisma.RoleListRelationFilter> = z.object({
  every: z.lazy(() => RoleWhereInputSchema).optional(),
  some: z.lazy(() => RoleWhereInputSchema).optional(),
  none: z.lazy(() => RoleWhereInputSchema).optional()
}).strict();

export const PermissionListRelationFilterSchema: z.ZodType<Prisma.PermissionListRelationFilter> = z.object({
  every: z.lazy(() => PermissionWhereInputSchema).optional(),
  some: z.lazy(() => PermissionWhereInputSchema).optional(),
  none: z.lazy(() => PermissionWhereInputSchema).optional()
}).strict();

export const AccessTokenListRelationFilterSchema: z.ZodType<Prisma.AccessTokenListRelationFilter> = z.object({
  every: z.lazy(() => AccessTokenWhereInputSchema).optional(),
  some: z.lazy(() => AccessTokenWhereInputSchema).optional(),
  none: z.lazy(() => AccessTokenWhereInputSchema).optional()
}).strict();

export const PostOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PostOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CommentOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RoleOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RoleOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PermissionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PermissionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccessTokenOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AccessTokenOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  activated: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.lazy(() => SortOrderSchema).optional(),
  LikeCommentIDs: z.lazy(() => SortOrderSchema).optional(),
  roleIDs: z.lazy(() => SortOrderSchema).optional(),
  permissionIDs: z.lazy(() => SortOrderSchema).optional(),
  likedPostIDs: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  activated: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  activated: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const UserListRelationFilterSchema: z.ZodType<Prisma.UserListRelationFilter> = z.object({
  every: z.lazy(() => UserWhereInputSchema).optional(),
  some: z.lazy(() => UserWhereInputSchema).optional(),
  none: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RoleCountOrderByAggregateInputSchema: z.ZodType<Prisma.RoleCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  systemic: z.lazy(() => SortOrderSchema).optional(),
  permissionIDs: z.lazy(() => SortOrderSchema).optional(),
  userIDs: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RoleMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RoleMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  systemic: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RoleMinOrderByAggregateInputSchema: z.ZodType<Prisma.RoleMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  systemic: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JsonFilterSchema: z.ZodType<Prisma.JsonFilter> = z.object({
  equals: InputJsonValue.optional(),
  not: InputJsonValue.optional()
}).strict();

export const PermissionCountOrderByAggregateInputSchema: z.ZodType<Prisma.PermissionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  rule: z.lazy(() => SortOrderSchema).optional(),
  roleIDs: z.lazy(() => SortOrderSchema).optional(),
  userIDs: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PermissionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PermissionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PermissionMinOrderByAggregateInputSchema: z.ZodType<Prisma.PermissionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JsonWithAggregatesFilterSchema: z.ZodType<Prisma.JsonWithAggregatesFilter> = z.object({
  equals: InputJsonValue.optional(),
  not: InputJsonValue.optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedJsonFilterSchema).optional(),
  _max: z.lazy(() => NestedJsonFilterSchema).optional()
}).strict();

export const MediaEntityNullableRelationFilterSchema: z.ZodType<Prisma.MediaEntityNullableRelationFilter> = z.object({
  is: z.lazy(() => MediaEntityWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => MediaEntityWhereInputSchema).optional().nullable()
}).strict();

export const UserNullableRelationFilterSchema: z.ZodType<Prisma.UserNullableRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => UserWhereInputSchema).optional().nullable()
}).strict();

export const TranslationListRelationFilterSchema: z.ZodType<Prisma.TranslationListRelationFilter> = z.object({
  every: z.lazy(() => TranslationWhereInputSchema).optional(),
  some: z.lazy(() => TranslationWhereInputSchema).optional(),
  none: z.lazy(() => TranslationWhereInputSchema).optional()
}).strict();

export const TranslationOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TranslationOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PostCountOrderByAggregateInputSchema: z.ZodType<Prisma.PostCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  meta: z.lazy(() => SortOrderSchema).optional(),
  tags: z.lazy(() => SortOrderSchema).optional(),
  thumbnailId: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  likedByUserIDs: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PostMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PostMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  meta: z.lazy(() => SortOrderSchema).optional(),
  thumbnailId: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PostMinOrderByAggregateInputSchema: z.ZodType<Prisma.PostMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  meta: z.lazy(() => SortOrderSchema).optional(),
  thumbnailId: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PostRelationFilterSchema: z.ZodType<Prisma.PostRelationFilter> = z.object({
  is: z.lazy(() => PostWhereInputSchema).optional(),
  isNot: z.lazy(() => PostWhereInputSchema).optional()
}).strict();

export const TranslationCountOrderByAggregateInputSchema: z.ZodType<Prisma.TranslationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  language: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  meta: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TranslationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TranslationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  language: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  meta: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TranslationMinOrderByAggregateInputSchema: z.ZodType<Prisma.TranslationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  language: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  meta: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MediaEntityCountOrderByAggregateInputSchema: z.ZodType<Prisma.MediaEntityCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  file: z.lazy(() => SortOrderSchema).optional(),
  ext: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MediaEntityMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MediaEntityMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  file: z.lazy(() => SortOrderSchema).optional(),
  ext: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MediaEntityMinOrderByAggregateInputSchema: z.ZodType<Prisma.MediaEntityMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  file: z.lazy(() => SortOrderSchema).optional(),
  ext: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccessTokenRelationFilterSchema: z.ZodType<Prisma.AccessTokenRelationFilter> = z.object({
  is: z.lazy(() => AccessTokenWhereInputSchema).optional(),
  isNot: z.lazy(() => AccessTokenWhereInputSchema).optional()
}).strict();

export const RefreshTokenCountOrderByAggregateInputSchema: z.ZodType<Prisma.RefreshTokenCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  expired_at: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  accessTokenId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RefreshTokenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RefreshTokenMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  expired_at: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  accessTokenId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RefreshTokenMinOrderByAggregateInputSchema: z.ZodType<Prisma.RefreshTokenMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  expired_at: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  accessTokenId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RefreshTokenNullableRelationFilterSchema: z.ZodType<Prisma.RefreshTokenNullableRelationFilter> = z.object({
  is: z.lazy(() => RefreshTokenWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => RefreshTokenWhereInputSchema).optional().nullable()
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const AccessTokenCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccessTokenCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  expired_at: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccessTokenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccessTokenMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  expired_at: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccessTokenMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccessTokenMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  expired_at: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PostNullableRelationFilterSchema: z.ZodType<Prisma.PostNullableRelationFilter> = z.object({
  is: z.lazy(() => PostWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => PostWhereInputSchema).optional().nullable()
}).strict();

export const CommentNullableRelationFilterSchema: z.ZodType<Prisma.CommentNullableRelationFilter> = z.object({
  is: z.lazy(() => CommentWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => CommentWhereInputSchema).optional().nullable()
}).strict();

export const CommentCountOrderByAggregateInputSchema: z.ZodType<Prisma.CommentCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  belongsToId: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  likedByUserIDs: z.lazy(() => SortOrderSchema).optional(),
  repliedToID: z.lazy(() => SortOrderSchema).optional(),
  chiefComment: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CommentMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  belongsToId: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  repliedToID: z.lazy(() => SortOrderSchema).optional(),
  chiefComment: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentMinOrderByAggregateInputSchema: z.ZodType<Prisma.CommentMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  belongsToId: z.lazy(() => SortOrderSchema).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  repliedToID: z.lazy(() => SortOrderSchema).optional(),
  chiefComment: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PostCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.PostCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutAuthorInputSchema),z.lazy(() => PostCreateWithoutAuthorInputSchema).array(),z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommentCreateNestedManyWithoutOwnerInputSchema: z.ZodType<Prisma.CommentCreateNestedManyWithoutOwnerInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutOwnerInputSchema),z.lazy(() => CommentCreateWithoutOwnerInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => CommentUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => CommentCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyOwnerInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommentCreateNestedManyWithoutLikesInputSchema: z.ZodType<Prisma.CommentCreateNestedManyWithoutLikesInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutLikesInputSchema),z.lazy(() => CommentCreateWithoutLikesInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutLikesInputSchema),z.lazy(() => CommentUncheckedCreateWithoutLikesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutLikesInputSchema),z.lazy(() => CommentCreateOrConnectWithoutLikesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RoleCreateNestedManyWithoutUsersInputSchema: z.ZodType<Prisma.RoleCreateNestedManyWithoutUsersInput> = z.object({
  create: z.union([ z.lazy(() => RoleCreateWithoutUsersInputSchema),z.lazy(() => RoleCreateWithoutUsersInputSchema).array(),z.lazy(() => RoleUncheckedCreateWithoutUsersInputSchema),z.lazy(() => RoleUncheckedCreateWithoutUsersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RoleCreateOrConnectWithoutUsersInputSchema),z.lazy(() => RoleCreateOrConnectWithoutUsersInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RoleWhereUniqueInputSchema),z.lazy(() => RoleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PermissionCreateNestedManyWithoutUsersInputSchema: z.ZodType<Prisma.PermissionCreateNestedManyWithoutUsersInput> = z.object({
  create: z.union([ z.lazy(() => PermissionCreateWithoutUsersInputSchema),z.lazy(() => PermissionCreateWithoutUsersInputSchema).array(),z.lazy(() => PermissionUncheckedCreateWithoutUsersInputSchema),z.lazy(() => PermissionUncheckedCreateWithoutUsersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PermissionCreateOrConnectWithoutUsersInputSchema),z.lazy(() => PermissionCreateOrConnectWithoutUsersInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PermissionWhereUniqueInputSchema),z.lazy(() => PermissionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PostCreateNestedManyWithoutLikedUsersInputSchema: z.ZodType<Prisma.PostCreateNestedManyWithoutLikedUsersInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutLikedUsersInputSchema),z.lazy(() => PostCreateWithoutLikedUsersInputSchema).array(),z.lazy(() => PostUncheckedCreateWithoutLikedUsersInputSchema),z.lazy(() => PostUncheckedCreateWithoutLikedUsersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostCreateOrConnectWithoutLikedUsersInputSchema),z.lazy(() => PostCreateOrConnectWithoutLikedUsersInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AccessTokenCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccessTokenCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccessTokenCreateWithoutUserInputSchema),z.lazy(() => AccessTokenCreateWithoutUserInputSchema).array(),z.lazy(() => AccessTokenUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccessTokenUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccessTokenCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccessTokenCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccessTokenCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccessTokenWhereUniqueInputSchema),z.lazy(() => AccessTokenWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserCreateLikeCommentIDsInputSchema: z.ZodType<Prisma.UserCreateLikeCommentIDsInput> = z.object({
  set: z.string().array()
}).strict();

export const UserCreateroleIDsInputSchema: z.ZodType<Prisma.UserCreateroleIDsInput> = z.object({
  set: z.string().array()
}).strict();

export const UserCreatepermissionIDsInputSchema: z.ZodType<Prisma.UserCreatepermissionIDsInput> = z.object({
  set: z.string().array()
}).strict();

export const UserCreatelikedPostIDsInputSchema: z.ZodType<Prisma.UserCreatelikedPostIDsInput> = z.object({
  set: z.string().array()
}).strict();

export const PostUncheckedCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.PostUncheckedCreateNestedManyWithoutAuthorInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutAuthorInputSchema),z.lazy(() => PostCreateWithoutAuthorInputSchema).array(),z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostCreateManyAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommentUncheckedCreateNestedManyWithoutOwnerInputSchema: z.ZodType<Prisma.CommentUncheckedCreateNestedManyWithoutOwnerInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutOwnerInputSchema),z.lazy(() => CommentCreateWithoutOwnerInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => CommentUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => CommentCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyOwnerInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommentUncheckedCreateNestedManyWithoutLikesInputSchema: z.ZodType<Prisma.CommentUncheckedCreateNestedManyWithoutLikesInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutLikesInputSchema),z.lazy(() => CommentCreateWithoutLikesInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutLikesInputSchema),z.lazy(() => CommentUncheckedCreateWithoutLikesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutLikesInputSchema),z.lazy(() => CommentCreateOrConnectWithoutLikesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RoleUncheckedCreateNestedManyWithoutUsersInputSchema: z.ZodType<Prisma.RoleUncheckedCreateNestedManyWithoutUsersInput> = z.object({
  create: z.union([ z.lazy(() => RoleCreateWithoutUsersInputSchema),z.lazy(() => RoleCreateWithoutUsersInputSchema).array(),z.lazy(() => RoleUncheckedCreateWithoutUsersInputSchema),z.lazy(() => RoleUncheckedCreateWithoutUsersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RoleCreateOrConnectWithoutUsersInputSchema),z.lazy(() => RoleCreateOrConnectWithoutUsersInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RoleWhereUniqueInputSchema),z.lazy(() => RoleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PermissionUncheckedCreateNestedManyWithoutUsersInputSchema: z.ZodType<Prisma.PermissionUncheckedCreateNestedManyWithoutUsersInput> = z.object({
  create: z.union([ z.lazy(() => PermissionCreateWithoutUsersInputSchema),z.lazy(() => PermissionCreateWithoutUsersInputSchema).array(),z.lazy(() => PermissionUncheckedCreateWithoutUsersInputSchema),z.lazy(() => PermissionUncheckedCreateWithoutUsersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PermissionCreateOrConnectWithoutUsersInputSchema),z.lazy(() => PermissionCreateOrConnectWithoutUsersInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PermissionWhereUniqueInputSchema),z.lazy(() => PermissionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PostUncheckedCreateNestedManyWithoutLikedUsersInputSchema: z.ZodType<Prisma.PostUncheckedCreateNestedManyWithoutLikedUsersInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutLikedUsersInputSchema),z.lazy(() => PostCreateWithoutLikedUsersInputSchema).array(),z.lazy(() => PostUncheckedCreateWithoutLikedUsersInputSchema),z.lazy(() => PostUncheckedCreateWithoutLikedUsersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostCreateOrConnectWithoutLikedUsersInputSchema),z.lazy(() => PostCreateOrConnectWithoutLikedUsersInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AccessTokenUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccessTokenUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccessTokenCreateWithoutUserInputSchema),z.lazy(() => AccessTokenCreateWithoutUserInputSchema).array(),z.lazy(() => AccessTokenUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccessTokenUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccessTokenCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccessTokenCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccessTokenCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccessTokenWhereUniqueInputSchema),z.lazy(() => AccessTokenWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable(),
  unset: z.boolean().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const PostUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.PostUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutAuthorInputSchema),z.lazy(() => PostCreateWithoutAuthorInputSchema).array(),z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PostUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => PostUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PostUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => PostUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PostUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => PostUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PostScalarWhereInputSchema),z.lazy(() => PostScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommentUpdateManyWithoutOwnerNestedInputSchema: z.ZodType<Prisma.CommentUpdateManyWithoutOwnerNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutOwnerInputSchema),z.lazy(() => CommentCreateWithoutOwnerInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => CommentUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => CommentCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => CommentUpsertWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyOwnerInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => CommentUpdateWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutOwnerInputSchema),z.lazy(() => CommentUpdateManyWithWhereWithoutOwnerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommentUpdateManyWithoutLikesNestedInputSchema: z.ZodType<Prisma.CommentUpdateManyWithoutLikesNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutLikesInputSchema),z.lazy(() => CommentCreateWithoutLikesInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutLikesInputSchema),z.lazy(() => CommentUncheckedCreateWithoutLikesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutLikesInputSchema),z.lazy(() => CommentCreateOrConnectWithoutLikesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutLikesInputSchema),z.lazy(() => CommentUpsertWithWhereUniqueWithoutLikesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutLikesInputSchema),z.lazy(() => CommentUpdateWithWhereUniqueWithoutLikesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutLikesInputSchema),z.lazy(() => CommentUpdateManyWithWhereWithoutLikesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RoleUpdateManyWithoutUsersNestedInputSchema: z.ZodType<Prisma.RoleUpdateManyWithoutUsersNestedInput> = z.object({
  create: z.union([ z.lazy(() => RoleCreateWithoutUsersInputSchema),z.lazy(() => RoleCreateWithoutUsersInputSchema).array(),z.lazy(() => RoleUncheckedCreateWithoutUsersInputSchema),z.lazy(() => RoleUncheckedCreateWithoutUsersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RoleCreateOrConnectWithoutUsersInputSchema),z.lazy(() => RoleCreateOrConnectWithoutUsersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RoleUpsertWithWhereUniqueWithoutUsersInputSchema),z.lazy(() => RoleUpsertWithWhereUniqueWithoutUsersInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => RoleWhereUniqueInputSchema),z.lazy(() => RoleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RoleWhereUniqueInputSchema),z.lazy(() => RoleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RoleWhereUniqueInputSchema),z.lazy(() => RoleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RoleWhereUniqueInputSchema),z.lazy(() => RoleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RoleUpdateWithWhereUniqueWithoutUsersInputSchema),z.lazy(() => RoleUpdateWithWhereUniqueWithoutUsersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RoleUpdateManyWithWhereWithoutUsersInputSchema),z.lazy(() => RoleUpdateManyWithWhereWithoutUsersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RoleScalarWhereInputSchema),z.lazy(() => RoleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PermissionUpdateManyWithoutUsersNestedInputSchema: z.ZodType<Prisma.PermissionUpdateManyWithoutUsersNestedInput> = z.object({
  create: z.union([ z.lazy(() => PermissionCreateWithoutUsersInputSchema),z.lazy(() => PermissionCreateWithoutUsersInputSchema).array(),z.lazy(() => PermissionUncheckedCreateWithoutUsersInputSchema),z.lazy(() => PermissionUncheckedCreateWithoutUsersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PermissionCreateOrConnectWithoutUsersInputSchema),z.lazy(() => PermissionCreateOrConnectWithoutUsersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PermissionUpsertWithWhereUniqueWithoutUsersInputSchema),z.lazy(() => PermissionUpsertWithWhereUniqueWithoutUsersInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => PermissionWhereUniqueInputSchema),z.lazy(() => PermissionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PermissionWhereUniqueInputSchema),z.lazy(() => PermissionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PermissionWhereUniqueInputSchema),z.lazy(() => PermissionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PermissionWhereUniqueInputSchema),z.lazy(() => PermissionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PermissionUpdateWithWhereUniqueWithoutUsersInputSchema),z.lazy(() => PermissionUpdateWithWhereUniqueWithoutUsersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PermissionUpdateManyWithWhereWithoutUsersInputSchema),z.lazy(() => PermissionUpdateManyWithWhereWithoutUsersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PermissionScalarWhereInputSchema),z.lazy(() => PermissionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PostUpdateManyWithoutLikedUsersNestedInputSchema: z.ZodType<Prisma.PostUpdateManyWithoutLikedUsersNestedInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutLikedUsersInputSchema),z.lazy(() => PostCreateWithoutLikedUsersInputSchema).array(),z.lazy(() => PostUncheckedCreateWithoutLikedUsersInputSchema),z.lazy(() => PostUncheckedCreateWithoutLikedUsersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostCreateOrConnectWithoutLikedUsersInputSchema),z.lazy(() => PostCreateOrConnectWithoutLikedUsersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PostUpsertWithWhereUniqueWithoutLikedUsersInputSchema),z.lazy(() => PostUpsertWithWhereUniqueWithoutLikedUsersInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PostUpdateWithWhereUniqueWithoutLikedUsersInputSchema),z.lazy(() => PostUpdateWithWhereUniqueWithoutLikedUsersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PostUpdateManyWithWhereWithoutLikedUsersInputSchema),z.lazy(() => PostUpdateManyWithWhereWithoutLikedUsersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PostScalarWhereInputSchema),z.lazy(() => PostScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AccessTokenUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccessTokenUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccessTokenCreateWithoutUserInputSchema),z.lazy(() => AccessTokenCreateWithoutUserInputSchema).array(),z.lazy(() => AccessTokenUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccessTokenUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccessTokenCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccessTokenCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccessTokenUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccessTokenUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccessTokenCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccessTokenWhereUniqueInputSchema),z.lazy(() => AccessTokenWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccessTokenWhereUniqueInputSchema),z.lazy(() => AccessTokenWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccessTokenWhereUniqueInputSchema),z.lazy(() => AccessTokenWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccessTokenWhereUniqueInputSchema),z.lazy(() => AccessTokenWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccessTokenUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccessTokenUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccessTokenUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccessTokenUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccessTokenScalarWhereInputSchema),z.lazy(() => AccessTokenScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateLikeCommentIDsInputSchema: z.ZodType<Prisma.UserUpdateLikeCommentIDsInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const UserUpdateroleIDsInputSchema: z.ZodType<Prisma.UserUpdateroleIDsInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const UserUpdatepermissionIDsInputSchema: z.ZodType<Prisma.UserUpdatepermissionIDsInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const UserUpdatelikedPostIDsInputSchema: z.ZodType<Prisma.UserUpdatelikedPostIDsInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const PostUncheckedUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyWithoutAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutAuthorInputSchema),z.lazy(() => PostCreateWithoutAuthorInputSchema).array(),z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema),z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema),z.lazy(() => PostCreateOrConnectWithoutAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PostUpsertWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => PostUpsertWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostCreateManyAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PostUpdateWithWhereUniqueWithoutAuthorInputSchema),z.lazy(() => PostUpdateWithWhereUniqueWithoutAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PostUpdateManyWithWhereWithoutAuthorInputSchema),z.lazy(() => PostUpdateManyWithWhereWithoutAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PostScalarWhereInputSchema),z.lazy(() => PostScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommentUncheckedUpdateManyWithoutOwnerNestedInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutOwnerNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutOwnerInputSchema),z.lazy(() => CommentCreateWithoutOwnerInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutOwnerInputSchema),z.lazy(() => CommentUncheckedCreateWithoutOwnerInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutOwnerInputSchema),z.lazy(() => CommentCreateOrConnectWithoutOwnerInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => CommentUpsertWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyOwnerInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutOwnerInputSchema),z.lazy(() => CommentUpdateWithWhereUniqueWithoutOwnerInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutOwnerInputSchema),z.lazy(() => CommentUpdateManyWithWhereWithoutOwnerInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommentUncheckedUpdateManyWithoutLikesNestedInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutLikesNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutLikesInputSchema),z.lazy(() => CommentCreateWithoutLikesInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutLikesInputSchema),z.lazy(() => CommentUncheckedCreateWithoutLikesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutLikesInputSchema),z.lazy(() => CommentCreateOrConnectWithoutLikesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutLikesInputSchema),z.lazy(() => CommentUpsertWithWhereUniqueWithoutLikesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutLikesInputSchema),z.lazy(() => CommentUpdateWithWhereUniqueWithoutLikesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutLikesInputSchema),z.lazy(() => CommentUpdateManyWithWhereWithoutLikesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RoleUncheckedUpdateManyWithoutUsersNestedInputSchema: z.ZodType<Prisma.RoleUncheckedUpdateManyWithoutUsersNestedInput> = z.object({
  create: z.union([ z.lazy(() => RoleCreateWithoutUsersInputSchema),z.lazy(() => RoleCreateWithoutUsersInputSchema).array(),z.lazy(() => RoleUncheckedCreateWithoutUsersInputSchema),z.lazy(() => RoleUncheckedCreateWithoutUsersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RoleCreateOrConnectWithoutUsersInputSchema),z.lazy(() => RoleCreateOrConnectWithoutUsersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RoleUpsertWithWhereUniqueWithoutUsersInputSchema),z.lazy(() => RoleUpsertWithWhereUniqueWithoutUsersInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => RoleWhereUniqueInputSchema),z.lazy(() => RoleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RoleWhereUniqueInputSchema),z.lazy(() => RoleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RoleWhereUniqueInputSchema),z.lazy(() => RoleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RoleWhereUniqueInputSchema),z.lazy(() => RoleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RoleUpdateWithWhereUniqueWithoutUsersInputSchema),z.lazy(() => RoleUpdateWithWhereUniqueWithoutUsersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RoleUpdateManyWithWhereWithoutUsersInputSchema),z.lazy(() => RoleUpdateManyWithWhereWithoutUsersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RoleScalarWhereInputSchema),z.lazy(() => RoleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PermissionUncheckedUpdateManyWithoutUsersNestedInputSchema: z.ZodType<Prisma.PermissionUncheckedUpdateManyWithoutUsersNestedInput> = z.object({
  create: z.union([ z.lazy(() => PermissionCreateWithoutUsersInputSchema),z.lazy(() => PermissionCreateWithoutUsersInputSchema).array(),z.lazy(() => PermissionUncheckedCreateWithoutUsersInputSchema),z.lazy(() => PermissionUncheckedCreateWithoutUsersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PermissionCreateOrConnectWithoutUsersInputSchema),z.lazy(() => PermissionCreateOrConnectWithoutUsersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PermissionUpsertWithWhereUniqueWithoutUsersInputSchema),z.lazy(() => PermissionUpsertWithWhereUniqueWithoutUsersInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => PermissionWhereUniqueInputSchema),z.lazy(() => PermissionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PermissionWhereUniqueInputSchema),z.lazy(() => PermissionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PermissionWhereUniqueInputSchema),z.lazy(() => PermissionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PermissionWhereUniqueInputSchema),z.lazy(() => PermissionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PermissionUpdateWithWhereUniqueWithoutUsersInputSchema),z.lazy(() => PermissionUpdateWithWhereUniqueWithoutUsersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PermissionUpdateManyWithWhereWithoutUsersInputSchema),z.lazy(() => PermissionUpdateManyWithWhereWithoutUsersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PermissionScalarWhereInputSchema),z.lazy(() => PermissionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PostUncheckedUpdateManyWithoutLikedUsersNestedInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyWithoutLikedUsersNestedInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutLikedUsersInputSchema),z.lazy(() => PostCreateWithoutLikedUsersInputSchema).array(),z.lazy(() => PostUncheckedCreateWithoutLikedUsersInputSchema),z.lazy(() => PostUncheckedCreateWithoutLikedUsersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostCreateOrConnectWithoutLikedUsersInputSchema),z.lazy(() => PostCreateOrConnectWithoutLikedUsersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PostUpsertWithWhereUniqueWithoutLikedUsersInputSchema),z.lazy(() => PostUpsertWithWhereUniqueWithoutLikedUsersInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PostUpdateWithWhereUniqueWithoutLikedUsersInputSchema),z.lazy(() => PostUpdateWithWhereUniqueWithoutLikedUsersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PostUpdateManyWithWhereWithoutLikedUsersInputSchema),z.lazy(() => PostUpdateManyWithWhereWithoutLikedUsersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PostScalarWhereInputSchema),z.lazy(() => PostScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AccessTokenUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccessTokenUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccessTokenCreateWithoutUserInputSchema),z.lazy(() => AccessTokenCreateWithoutUserInputSchema).array(),z.lazy(() => AccessTokenUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccessTokenUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccessTokenCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccessTokenCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccessTokenUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccessTokenUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccessTokenCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccessTokenWhereUniqueInputSchema),z.lazy(() => AccessTokenWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccessTokenWhereUniqueInputSchema),z.lazy(() => AccessTokenWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccessTokenWhereUniqueInputSchema),z.lazy(() => AccessTokenWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccessTokenWhereUniqueInputSchema),z.lazy(() => AccessTokenWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccessTokenUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccessTokenUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccessTokenUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccessTokenUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccessTokenScalarWhereInputSchema),z.lazy(() => AccessTokenScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PermissionCreateNestedManyWithoutRolesInputSchema: z.ZodType<Prisma.PermissionCreateNestedManyWithoutRolesInput> = z.object({
  create: z.union([ z.lazy(() => PermissionCreateWithoutRolesInputSchema),z.lazy(() => PermissionCreateWithoutRolesInputSchema).array(),z.lazy(() => PermissionUncheckedCreateWithoutRolesInputSchema),z.lazy(() => PermissionUncheckedCreateWithoutRolesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PermissionCreateOrConnectWithoutRolesInputSchema),z.lazy(() => PermissionCreateOrConnectWithoutRolesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PermissionWhereUniqueInputSchema),z.lazy(() => PermissionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedManyWithoutRolesInputSchema: z.ZodType<Prisma.UserCreateNestedManyWithoutRolesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRolesInputSchema),z.lazy(() => UserCreateWithoutRolesInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutRolesInputSchema),z.lazy(() => UserUncheckedCreateWithoutRolesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutRolesInputSchema),z.lazy(() => UserCreateOrConnectWithoutRolesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RoleCreatepermissionIDsInputSchema: z.ZodType<Prisma.RoleCreatepermissionIDsInput> = z.object({
  set: z.string().array()
}).strict();

export const RoleCreateuserIDsInputSchema: z.ZodType<Prisma.RoleCreateuserIDsInput> = z.object({
  set: z.string().array()
}).strict();

export const PermissionUncheckedCreateNestedManyWithoutRolesInputSchema: z.ZodType<Prisma.PermissionUncheckedCreateNestedManyWithoutRolesInput> = z.object({
  create: z.union([ z.lazy(() => PermissionCreateWithoutRolesInputSchema),z.lazy(() => PermissionCreateWithoutRolesInputSchema).array(),z.lazy(() => PermissionUncheckedCreateWithoutRolesInputSchema),z.lazy(() => PermissionUncheckedCreateWithoutRolesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PermissionCreateOrConnectWithoutRolesInputSchema),z.lazy(() => PermissionCreateOrConnectWithoutRolesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PermissionWhereUniqueInputSchema),z.lazy(() => PermissionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedCreateNestedManyWithoutRolesInputSchema: z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutRolesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRolesInputSchema),z.lazy(() => UserCreateWithoutRolesInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutRolesInputSchema),z.lazy(() => UserUncheckedCreateWithoutRolesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutRolesInputSchema),z.lazy(() => UserCreateOrConnectWithoutRolesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PermissionUpdateManyWithoutRolesNestedInputSchema: z.ZodType<Prisma.PermissionUpdateManyWithoutRolesNestedInput> = z.object({
  create: z.union([ z.lazy(() => PermissionCreateWithoutRolesInputSchema),z.lazy(() => PermissionCreateWithoutRolesInputSchema).array(),z.lazy(() => PermissionUncheckedCreateWithoutRolesInputSchema),z.lazy(() => PermissionUncheckedCreateWithoutRolesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PermissionCreateOrConnectWithoutRolesInputSchema),z.lazy(() => PermissionCreateOrConnectWithoutRolesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PermissionUpsertWithWhereUniqueWithoutRolesInputSchema),z.lazy(() => PermissionUpsertWithWhereUniqueWithoutRolesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => PermissionWhereUniqueInputSchema),z.lazy(() => PermissionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PermissionWhereUniqueInputSchema),z.lazy(() => PermissionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PermissionWhereUniqueInputSchema),z.lazy(() => PermissionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PermissionWhereUniqueInputSchema),z.lazy(() => PermissionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PermissionUpdateWithWhereUniqueWithoutRolesInputSchema),z.lazy(() => PermissionUpdateWithWhereUniqueWithoutRolesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PermissionUpdateManyWithWhereWithoutRolesInputSchema),z.lazy(() => PermissionUpdateManyWithWhereWithoutRolesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PermissionScalarWhereInputSchema),z.lazy(() => PermissionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateManyWithoutRolesNestedInputSchema: z.ZodType<Prisma.UserUpdateManyWithoutRolesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRolesInputSchema),z.lazy(() => UserCreateWithoutRolesInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutRolesInputSchema),z.lazy(() => UserUncheckedCreateWithoutRolesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutRolesInputSchema),z.lazy(() => UserCreateOrConnectWithoutRolesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutRolesInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutRolesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutRolesInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutRolesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutRolesInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutRolesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RoleUpdatepermissionIDsInputSchema: z.ZodType<Prisma.RoleUpdatepermissionIDsInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const RoleUpdateuserIDsInputSchema: z.ZodType<Prisma.RoleUpdateuserIDsInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const PermissionUncheckedUpdateManyWithoutRolesNestedInputSchema: z.ZodType<Prisma.PermissionUncheckedUpdateManyWithoutRolesNestedInput> = z.object({
  create: z.union([ z.lazy(() => PermissionCreateWithoutRolesInputSchema),z.lazy(() => PermissionCreateWithoutRolesInputSchema).array(),z.lazy(() => PermissionUncheckedCreateWithoutRolesInputSchema),z.lazy(() => PermissionUncheckedCreateWithoutRolesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PermissionCreateOrConnectWithoutRolesInputSchema),z.lazy(() => PermissionCreateOrConnectWithoutRolesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PermissionUpsertWithWhereUniqueWithoutRolesInputSchema),z.lazy(() => PermissionUpsertWithWhereUniqueWithoutRolesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => PermissionWhereUniqueInputSchema),z.lazy(() => PermissionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PermissionWhereUniqueInputSchema),z.lazy(() => PermissionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PermissionWhereUniqueInputSchema),z.lazy(() => PermissionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PermissionWhereUniqueInputSchema),z.lazy(() => PermissionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PermissionUpdateWithWhereUniqueWithoutRolesInputSchema),z.lazy(() => PermissionUpdateWithWhereUniqueWithoutRolesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PermissionUpdateManyWithWhereWithoutRolesInputSchema),z.lazy(() => PermissionUpdateManyWithWhereWithoutRolesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PermissionScalarWhereInputSchema),z.lazy(() => PermissionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedUpdateManyWithoutRolesNestedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutRolesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRolesInputSchema),z.lazy(() => UserCreateWithoutRolesInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutRolesInputSchema),z.lazy(() => UserUncheckedCreateWithoutRolesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutRolesInputSchema),z.lazy(() => UserCreateOrConnectWithoutRolesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutRolesInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutRolesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutRolesInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutRolesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutRolesInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutRolesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RoleCreateNestedManyWithoutPermissionsInputSchema: z.ZodType<Prisma.RoleCreateNestedManyWithoutPermissionsInput> = z.object({
  create: z.union([ z.lazy(() => RoleCreateWithoutPermissionsInputSchema),z.lazy(() => RoleCreateWithoutPermissionsInputSchema).array(),z.lazy(() => RoleUncheckedCreateWithoutPermissionsInputSchema),z.lazy(() => RoleUncheckedCreateWithoutPermissionsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RoleCreateOrConnectWithoutPermissionsInputSchema),z.lazy(() => RoleCreateOrConnectWithoutPermissionsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RoleWhereUniqueInputSchema),z.lazy(() => RoleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedManyWithoutPermissionsInputSchema: z.ZodType<Prisma.UserCreateNestedManyWithoutPermissionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPermissionsInputSchema),z.lazy(() => UserCreateWithoutPermissionsInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutPermissionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPermissionsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutPermissionsInputSchema),z.lazy(() => UserCreateOrConnectWithoutPermissionsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PermissionCreateroleIDsInputSchema: z.ZodType<Prisma.PermissionCreateroleIDsInput> = z.object({
  set: z.string().array()
}).strict();

export const PermissionCreateuserIDsInputSchema: z.ZodType<Prisma.PermissionCreateuserIDsInput> = z.object({
  set: z.string().array()
}).strict();

export const RoleUncheckedCreateNestedManyWithoutPermissionsInputSchema: z.ZodType<Prisma.RoleUncheckedCreateNestedManyWithoutPermissionsInput> = z.object({
  create: z.union([ z.lazy(() => RoleCreateWithoutPermissionsInputSchema),z.lazy(() => RoleCreateWithoutPermissionsInputSchema).array(),z.lazy(() => RoleUncheckedCreateWithoutPermissionsInputSchema),z.lazy(() => RoleUncheckedCreateWithoutPermissionsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RoleCreateOrConnectWithoutPermissionsInputSchema),z.lazy(() => RoleCreateOrConnectWithoutPermissionsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RoleWhereUniqueInputSchema),z.lazy(() => RoleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedCreateNestedManyWithoutPermissionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutPermissionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPermissionsInputSchema),z.lazy(() => UserCreateWithoutPermissionsInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutPermissionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPermissionsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutPermissionsInputSchema),z.lazy(() => UserCreateOrConnectWithoutPermissionsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RoleUpdateManyWithoutPermissionsNestedInputSchema: z.ZodType<Prisma.RoleUpdateManyWithoutPermissionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => RoleCreateWithoutPermissionsInputSchema),z.lazy(() => RoleCreateWithoutPermissionsInputSchema).array(),z.lazy(() => RoleUncheckedCreateWithoutPermissionsInputSchema),z.lazy(() => RoleUncheckedCreateWithoutPermissionsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RoleCreateOrConnectWithoutPermissionsInputSchema),z.lazy(() => RoleCreateOrConnectWithoutPermissionsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RoleUpsertWithWhereUniqueWithoutPermissionsInputSchema),z.lazy(() => RoleUpsertWithWhereUniqueWithoutPermissionsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => RoleWhereUniqueInputSchema),z.lazy(() => RoleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RoleWhereUniqueInputSchema),z.lazy(() => RoleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RoleWhereUniqueInputSchema),z.lazy(() => RoleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RoleWhereUniqueInputSchema),z.lazy(() => RoleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RoleUpdateWithWhereUniqueWithoutPermissionsInputSchema),z.lazy(() => RoleUpdateWithWhereUniqueWithoutPermissionsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RoleUpdateManyWithWhereWithoutPermissionsInputSchema),z.lazy(() => RoleUpdateManyWithWhereWithoutPermissionsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RoleScalarWhereInputSchema),z.lazy(() => RoleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateManyWithoutPermissionsNestedInputSchema: z.ZodType<Prisma.UserUpdateManyWithoutPermissionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPermissionsInputSchema),z.lazy(() => UserCreateWithoutPermissionsInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutPermissionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPermissionsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutPermissionsInputSchema),z.lazy(() => UserCreateOrConnectWithoutPermissionsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutPermissionsInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutPermissionsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutPermissionsInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutPermissionsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutPermissionsInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutPermissionsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PermissionUpdateroleIDsInputSchema: z.ZodType<Prisma.PermissionUpdateroleIDsInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const PermissionUpdateuserIDsInputSchema: z.ZodType<Prisma.PermissionUpdateuserIDsInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const RoleUncheckedUpdateManyWithoutPermissionsNestedInputSchema: z.ZodType<Prisma.RoleUncheckedUpdateManyWithoutPermissionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => RoleCreateWithoutPermissionsInputSchema),z.lazy(() => RoleCreateWithoutPermissionsInputSchema).array(),z.lazy(() => RoleUncheckedCreateWithoutPermissionsInputSchema),z.lazy(() => RoleUncheckedCreateWithoutPermissionsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RoleCreateOrConnectWithoutPermissionsInputSchema),z.lazy(() => RoleCreateOrConnectWithoutPermissionsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RoleUpsertWithWhereUniqueWithoutPermissionsInputSchema),z.lazy(() => RoleUpsertWithWhereUniqueWithoutPermissionsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => RoleWhereUniqueInputSchema),z.lazy(() => RoleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RoleWhereUniqueInputSchema),z.lazy(() => RoleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RoleWhereUniqueInputSchema),z.lazy(() => RoleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RoleWhereUniqueInputSchema),z.lazy(() => RoleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RoleUpdateWithWhereUniqueWithoutPermissionsInputSchema),z.lazy(() => RoleUpdateWithWhereUniqueWithoutPermissionsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RoleUpdateManyWithWhereWithoutPermissionsInputSchema),z.lazy(() => RoleUpdateManyWithWhereWithoutPermissionsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RoleScalarWhereInputSchema),z.lazy(() => RoleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedUpdateManyWithoutPermissionsNestedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutPermissionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPermissionsInputSchema),z.lazy(() => UserCreateWithoutPermissionsInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutPermissionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPermissionsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutPermissionsInputSchema),z.lazy(() => UserCreateOrConnectWithoutPermissionsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutPermissionsInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutPermissionsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutPermissionsInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutPermissionsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutPermissionsInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutPermissionsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PostCreatetagsInputSchema: z.ZodType<Prisma.PostCreatetagsInput> = z.object({
  set: z.string().array()
}).strict();

export const MediaEntityCreateNestedOneWithoutPostInputSchema: z.ZodType<Prisma.MediaEntityCreateNestedOneWithoutPostInput> = z.object({
  create: z.union([ z.lazy(() => MediaEntityCreateWithoutPostInputSchema),z.lazy(() => MediaEntityUncheckedCreateWithoutPostInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MediaEntityCreateOrConnectWithoutPostInputSchema).optional(),
  connect: z.lazy(() => MediaEntityWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutPostsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutPostsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPostsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPostsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPostsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedManyWithoutLikedPostsInputSchema: z.ZodType<Prisma.UserCreateNestedManyWithoutLikedPostsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutLikedPostsInputSchema),z.lazy(() => UserCreateWithoutLikedPostsInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutLikedPostsInputSchema),z.lazy(() => UserUncheckedCreateWithoutLikedPostsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutLikedPostsInputSchema),z.lazy(() => UserCreateOrConnectWithoutLikedPostsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommentCreateNestedManyWithoutBelongsToInputSchema: z.ZodType<Prisma.CommentCreateNestedManyWithoutBelongsToInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutBelongsToInputSchema),z.lazy(() => CommentCreateWithoutBelongsToInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutBelongsToInputSchema),z.lazy(() => CommentUncheckedCreateWithoutBelongsToInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutBelongsToInputSchema),z.lazy(() => CommentCreateOrConnectWithoutBelongsToInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyBelongsToInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TranslationCreateNestedManyWithoutPostInputSchema: z.ZodType<Prisma.TranslationCreateNestedManyWithoutPostInput> = z.object({
  create: z.union([ z.lazy(() => TranslationCreateWithoutPostInputSchema),z.lazy(() => TranslationCreateWithoutPostInputSchema).array(),z.lazy(() => TranslationUncheckedCreateWithoutPostInputSchema),z.lazy(() => TranslationUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TranslationCreateOrConnectWithoutPostInputSchema),z.lazy(() => TranslationCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TranslationCreateManyPostInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TranslationWhereUniqueInputSchema),z.lazy(() => TranslationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PostCreatelikedByUserIDsInputSchema: z.ZodType<Prisma.PostCreatelikedByUserIDsInput> = z.object({
  set: z.string().array()
}).strict();

export const UserUncheckedCreateNestedManyWithoutLikedPostsInputSchema: z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutLikedPostsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutLikedPostsInputSchema),z.lazy(() => UserCreateWithoutLikedPostsInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutLikedPostsInputSchema),z.lazy(() => UserUncheckedCreateWithoutLikedPostsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutLikedPostsInputSchema),z.lazy(() => UserCreateOrConnectWithoutLikedPostsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommentUncheckedCreateNestedManyWithoutBelongsToInputSchema: z.ZodType<Prisma.CommentUncheckedCreateNestedManyWithoutBelongsToInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutBelongsToInputSchema),z.lazy(() => CommentCreateWithoutBelongsToInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutBelongsToInputSchema),z.lazy(() => CommentUncheckedCreateWithoutBelongsToInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutBelongsToInputSchema),z.lazy(() => CommentCreateOrConnectWithoutBelongsToInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyBelongsToInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TranslationUncheckedCreateNestedManyWithoutPostInputSchema: z.ZodType<Prisma.TranslationUncheckedCreateNestedManyWithoutPostInput> = z.object({
  create: z.union([ z.lazy(() => TranslationCreateWithoutPostInputSchema),z.lazy(() => TranslationCreateWithoutPostInputSchema).array(),z.lazy(() => TranslationUncheckedCreateWithoutPostInputSchema),z.lazy(() => TranslationUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TranslationCreateOrConnectWithoutPostInputSchema),z.lazy(() => TranslationCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TranslationCreateManyPostInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TranslationWhereUniqueInputSchema),z.lazy(() => TranslationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PostUpdatetagsInputSchema: z.ZodType<Prisma.PostUpdatetagsInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const MediaEntityUpdateOneWithoutPostNestedInputSchema: z.ZodType<Prisma.MediaEntityUpdateOneWithoutPostNestedInput> = z.object({
  create: z.union([ z.lazy(() => MediaEntityCreateWithoutPostInputSchema),z.lazy(() => MediaEntityUncheckedCreateWithoutPostInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MediaEntityCreateOrConnectWithoutPostInputSchema).optional(),
  upsert: z.lazy(() => MediaEntityUpsertWithoutPostInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.union([ z.boolean(),z.lazy(() => MediaEntityWhereInputSchema) ]).optional(),
  connect: z.lazy(() => MediaEntityWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => MediaEntityUpdateToOneWithWhereWithoutPostInputSchema),z.lazy(() => MediaEntityUpdateWithoutPostInputSchema),z.lazy(() => MediaEntityUncheckedUpdateWithoutPostInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneWithoutPostsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutPostsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPostsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPostsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPostsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutPostsInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutPostsInputSchema),z.lazy(() => UserUpdateWithoutPostsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPostsInputSchema) ]).optional(),
}).strict();

export const UserUpdateManyWithoutLikedPostsNestedInputSchema: z.ZodType<Prisma.UserUpdateManyWithoutLikedPostsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutLikedPostsInputSchema),z.lazy(() => UserCreateWithoutLikedPostsInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutLikedPostsInputSchema),z.lazy(() => UserUncheckedCreateWithoutLikedPostsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutLikedPostsInputSchema),z.lazy(() => UserCreateOrConnectWithoutLikedPostsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutLikedPostsInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutLikedPostsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutLikedPostsInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutLikedPostsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutLikedPostsInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutLikedPostsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommentUpdateManyWithoutBelongsToNestedInputSchema: z.ZodType<Prisma.CommentUpdateManyWithoutBelongsToNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutBelongsToInputSchema),z.lazy(() => CommentCreateWithoutBelongsToInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutBelongsToInputSchema),z.lazy(() => CommentUncheckedCreateWithoutBelongsToInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutBelongsToInputSchema),z.lazy(() => CommentCreateOrConnectWithoutBelongsToInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutBelongsToInputSchema),z.lazy(() => CommentUpsertWithWhereUniqueWithoutBelongsToInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyBelongsToInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutBelongsToInputSchema),z.lazy(() => CommentUpdateWithWhereUniqueWithoutBelongsToInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutBelongsToInputSchema),z.lazy(() => CommentUpdateManyWithWhereWithoutBelongsToInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TranslationUpdateManyWithoutPostNestedInputSchema: z.ZodType<Prisma.TranslationUpdateManyWithoutPostNestedInput> = z.object({
  create: z.union([ z.lazy(() => TranslationCreateWithoutPostInputSchema),z.lazy(() => TranslationCreateWithoutPostInputSchema).array(),z.lazy(() => TranslationUncheckedCreateWithoutPostInputSchema),z.lazy(() => TranslationUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TranslationCreateOrConnectWithoutPostInputSchema),z.lazy(() => TranslationCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TranslationUpsertWithWhereUniqueWithoutPostInputSchema),z.lazy(() => TranslationUpsertWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TranslationCreateManyPostInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TranslationWhereUniqueInputSchema),z.lazy(() => TranslationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TranslationWhereUniqueInputSchema),z.lazy(() => TranslationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TranslationWhereUniqueInputSchema),z.lazy(() => TranslationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TranslationWhereUniqueInputSchema),z.lazy(() => TranslationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TranslationUpdateWithWhereUniqueWithoutPostInputSchema),z.lazy(() => TranslationUpdateWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TranslationUpdateManyWithWhereWithoutPostInputSchema),z.lazy(() => TranslationUpdateManyWithWhereWithoutPostInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TranslationScalarWhereInputSchema),z.lazy(() => TranslationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PostUpdatelikedByUserIDsInputSchema: z.ZodType<Prisma.PostUpdatelikedByUserIDsInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const UserUncheckedUpdateManyWithoutLikedPostsNestedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutLikedPostsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutLikedPostsInputSchema),z.lazy(() => UserCreateWithoutLikedPostsInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutLikedPostsInputSchema),z.lazy(() => UserUncheckedCreateWithoutLikedPostsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutLikedPostsInputSchema),z.lazy(() => UserCreateOrConnectWithoutLikedPostsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutLikedPostsInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutLikedPostsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutLikedPostsInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutLikedPostsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutLikedPostsInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutLikedPostsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommentUncheckedUpdateManyWithoutBelongsToNestedInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutBelongsToNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutBelongsToInputSchema),z.lazy(() => CommentCreateWithoutBelongsToInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutBelongsToInputSchema),z.lazy(() => CommentUncheckedCreateWithoutBelongsToInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutBelongsToInputSchema),z.lazy(() => CommentCreateOrConnectWithoutBelongsToInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutBelongsToInputSchema),z.lazy(() => CommentUpsertWithWhereUniqueWithoutBelongsToInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyBelongsToInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutBelongsToInputSchema),z.lazy(() => CommentUpdateWithWhereUniqueWithoutBelongsToInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutBelongsToInputSchema),z.lazy(() => CommentUpdateManyWithWhereWithoutBelongsToInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TranslationUncheckedUpdateManyWithoutPostNestedInputSchema: z.ZodType<Prisma.TranslationUncheckedUpdateManyWithoutPostNestedInput> = z.object({
  create: z.union([ z.lazy(() => TranslationCreateWithoutPostInputSchema),z.lazy(() => TranslationCreateWithoutPostInputSchema).array(),z.lazy(() => TranslationUncheckedCreateWithoutPostInputSchema),z.lazy(() => TranslationUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TranslationCreateOrConnectWithoutPostInputSchema),z.lazy(() => TranslationCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TranslationUpsertWithWhereUniqueWithoutPostInputSchema),z.lazy(() => TranslationUpsertWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TranslationCreateManyPostInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TranslationWhereUniqueInputSchema),z.lazy(() => TranslationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TranslationWhereUniqueInputSchema),z.lazy(() => TranslationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TranslationWhereUniqueInputSchema),z.lazy(() => TranslationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TranslationWhereUniqueInputSchema),z.lazy(() => TranslationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TranslationUpdateWithWhereUniqueWithoutPostInputSchema),z.lazy(() => TranslationUpdateWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TranslationUpdateManyWithWhereWithoutPostInputSchema),z.lazy(() => TranslationUpdateManyWithWhereWithoutPostInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TranslationScalarWhereInputSchema),z.lazy(() => TranslationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PostCreateNestedOneWithoutTranslationsInputSchema: z.ZodType<Prisma.PostCreateNestedOneWithoutTranslationsInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutTranslationsInputSchema),z.lazy(() => PostUncheckedCreateWithoutTranslationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PostCreateOrConnectWithoutTranslationsInputSchema).optional(),
  connect: z.lazy(() => PostWhereUniqueInputSchema).optional()
}).strict();

export const PostUpdateOneRequiredWithoutTranslationsNestedInputSchema: z.ZodType<Prisma.PostUpdateOneRequiredWithoutTranslationsNestedInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutTranslationsInputSchema),z.lazy(() => PostUncheckedCreateWithoutTranslationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PostCreateOrConnectWithoutTranslationsInputSchema).optional(),
  upsert: z.lazy(() => PostUpsertWithoutTranslationsInputSchema).optional(),
  connect: z.lazy(() => PostWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PostUpdateToOneWithWhereWithoutTranslationsInputSchema),z.lazy(() => PostUpdateWithoutTranslationsInputSchema),z.lazy(() => PostUncheckedUpdateWithoutTranslationsInputSchema) ]).optional(),
}).strict();

export const PostCreateNestedManyWithoutThumbnailInputSchema: z.ZodType<Prisma.PostCreateNestedManyWithoutThumbnailInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutThumbnailInputSchema),z.lazy(() => PostCreateWithoutThumbnailInputSchema).array(),z.lazy(() => PostUncheckedCreateWithoutThumbnailInputSchema),z.lazy(() => PostUncheckedCreateWithoutThumbnailInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostCreateOrConnectWithoutThumbnailInputSchema),z.lazy(() => PostCreateOrConnectWithoutThumbnailInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostCreateManyThumbnailInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PostUncheckedCreateNestedManyWithoutThumbnailInputSchema: z.ZodType<Prisma.PostUncheckedCreateNestedManyWithoutThumbnailInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutThumbnailInputSchema),z.lazy(() => PostCreateWithoutThumbnailInputSchema).array(),z.lazy(() => PostUncheckedCreateWithoutThumbnailInputSchema),z.lazy(() => PostUncheckedCreateWithoutThumbnailInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostCreateOrConnectWithoutThumbnailInputSchema),z.lazy(() => PostCreateOrConnectWithoutThumbnailInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostCreateManyThumbnailInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PostUpdateManyWithoutThumbnailNestedInputSchema: z.ZodType<Prisma.PostUpdateManyWithoutThumbnailNestedInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutThumbnailInputSchema),z.lazy(() => PostCreateWithoutThumbnailInputSchema).array(),z.lazy(() => PostUncheckedCreateWithoutThumbnailInputSchema),z.lazy(() => PostUncheckedCreateWithoutThumbnailInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostCreateOrConnectWithoutThumbnailInputSchema),z.lazy(() => PostCreateOrConnectWithoutThumbnailInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PostUpsertWithWhereUniqueWithoutThumbnailInputSchema),z.lazy(() => PostUpsertWithWhereUniqueWithoutThumbnailInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostCreateManyThumbnailInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PostUpdateWithWhereUniqueWithoutThumbnailInputSchema),z.lazy(() => PostUpdateWithWhereUniqueWithoutThumbnailInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PostUpdateManyWithWhereWithoutThumbnailInputSchema),z.lazy(() => PostUpdateManyWithWhereWithoutThumbnailInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PostScalarWhereInputSchema),z.lazy(() => PostScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PostUncheckedUpdateManyWithoutThumbnailNestedInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyWithoutThumbnailNestedInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutThumbnailInputSchema),z.lazy(() => PostCreateWithoutThumbnailInputSchema).array(),z.lazy(() => PostUncheckedCreateWithoutThumbnailInputSchema),z.lazy(() => PostUncheckedCreateWithoutThumbnailInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostCreateOrConnectWithoutThumbnailInputSchema),z.lazy(() => PostCreateOrConnectWithoutThumbnailInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PostUpsertWithWhereUniqueWithoutThumbnailInputSchema),z.lazy(() => PostUpsertWithWhereUniqueWithoutThumbnailInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostCreateManyThumbnailInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PostUpdateWithWhereUniqueWithoutThumbnailInputSchema),z.lazy(() => PostUpdateWithWhereUniqueWithoutThumbnailInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PostUpdateManyWithWhereWithoutThumbnailInputSchema),z.lazy(() => PostUpdateManyWithWhereWithoutThumbnailInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PostScalarWhereInputSchema),z.lazy(() => PostScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AccessTokenCreateNestedOneWithoutRefreshTokenInputSchema: z.ZodType<Prisma.AccessTokenCreateNestedOneWithoutRefreshTokenInput> = z.object({
  create: z.union([ z.lazy(() => AccessTokenCreateWithoutRefreshTokenInputSchema),z.lazy(() => AccessTokenUncheckedCreateWithoutRefreshTokenInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AccessTokenCreateOrConnectWithoutRefreshTokenInputSchema).optional(),
  connect: z.lazy(() => AccessTokenWhereUniqueInputSchema).optional()
}).strict();

export const AccessTokenUpdateOneRequiredWithoutRefreshTokenNestedInputSchema: z.ZodType<Prisma.AccessTokenUpdateOneRequiredWithoutRefreshTokenNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccessTokenCreateWithoutRefreshTokenInputSchema),z.lazy(() => AccessTokenUncheckedCreateWithoutRefreshTokenInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AccessTokenCreateOrConnectWithoutRefreshTokenInputSchema).optional(),
  upsert: z.lazy(() => AccessTokenUpsertWithoutRefreshTokenInputSchema).optional(),
  connect: z.lazy(() => AccessTokenWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AccessTokenUpdateToOneWithWhereWithoutRefreshTokenInputSchema),z.lazy(() => AccessTokenUpdateWithoutRefreshTokenInputSchema),z.lazy(() => AccessTokenUncheckedUpdateWithoutRefreshTokenInputSchema) ]).optional(),
}).strict();

export const RefreshTokenCreateNestedOneWithoutAccessTokenInputSchema: z.ZodType<Prisma.RefreshTokenCreateNestedOneWithoutAccessTokenInput> = z.object({
  create: z.union([ z.lazy(() => RefreshTokenCreateWithoutAccessTokenInputSchema),z.lazy(() => RefreshTokenUncheckedCreateWithoutAccessTokenInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RefreshTokenCreateOrConnectWithoutAccessTokenInputSchema).optional(),
  connect: z.lazy(() => RefreshTokenWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutAccessTokensInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccessTokensInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccessTokensInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccessTokensInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccessTokensInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const RefreshTokenUncheckedCreateNestedOneWithoutAccessTokenInputSchema: z.ZodType<Prisma.RefreshTokenUncheckedCreateNestedOneWithoutAccessTokenInput> = z.object({
  create: z.union([ z.lazy(() => RefreshTokenCreateWithoutAccessTokenInputSchema),z.lazy(() => RefreshTokenUncheckedCreateWithoutAccessTokenInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RefreshTokenCreateOrConnectWithoutAccessTokenInputSchema).optional(),
  connect: z.lazy(() => RefreshTokenWhereUniqueInputSchema).optional()
}).strict();

export const RefreshTokenUpdateOneWithoutAccessTokenNestedInputSchema: z.ZodType<Prisma.RefreshTokenUpdateOneWithoutAccessTokenNestedInput> = z.object({
  create: z.union([ z.lazy(() => RefreshTokenCreateWithoutAccessTokenInputSchema),z.lazy(() => RefreshTokenUncheckedCreateWithoutAccessTokenInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RefreshTokenCreateOrConnectWithoutAccessTokenInputSchema).optional(),
  upsert: z.lazy(() => RefreshTokenUpsertWithoutAccessTokenInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => RefreshTokenWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => RefreshTokenWhereInputSchema) ]).optional(),
  connect: z.lazy(() => RefreshTokenWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RefreshTokenUpdateToOneWithWhereWithoutAccessTokenInputSchema),z.lazy(() => RefreshTokenUpdateWithoutAccessTokenInputSchema),z.lazy(() => RefreshTokenUncheckedUpdateWithoutAccessTokenInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutAccessTokensNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccessTokensNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccessTokensInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccessTokensInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccessTokensInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAccessTokensInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAccessTokensInputSchema),z.lazy(() => UserUpdateWithoutAccessTokensInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccessTokensInputSchema) ]).optional(),
}).strict();

export const RefreshTokenUncheckedUpdateOneWithoutAccessTokenNestedInputSchema: z.ZodType<Prisma.RefreshTokenUncheckedUpdateOneWithoutAccessTokenNestedInput> = z.object({
  create: z.union([ z.lazy(() => RefreshTokenCreateWithoutAccessTokenInputSchema),z.lazy(() => RefreshTokenUncheckedCreateWithoutAccessTokenInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RefreshTokenCreateOrConnectWithoutAccessTokenInputSchema).optional(),
  upsert: z.lazy(() => RefreshTokenUpsertWithoutAccessTokenInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => RefreshTokenWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => RefreshTokenWhereInputSchema) ]).optional(),
  connect: z.lazy(() => RefreshTokenWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RefreshTokenUpdateToOneWithWhereWithoutAccessTokenInputSchema),z.lazy(() => RefreshTokenUpdateWithoutAccessTokenInputSchema),z.lazy(() => RefreshTokenUncheckedUpdateWithoutAccessTokenInputSchema) ]).optional(),
}).strict();

export const PostCreateNestedOneWithoutCommentsInputSchema: z.ZodType<Prisma.PostCreateNestedOneWithoutCommentsInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutCommentsInputSchema),z.lazy(() => PostUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PostCreateOrConnectWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => PostWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutCommentsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCommentsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedManyWithoutLikeCommentsInputSchema: z.ZodType<Prisma.UserCreateNestedManyWithoutLikeCommentsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutLikeCommentsInputSchema),z.lazy(() => UserCreateWithoutLikeCommentsInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutLikeCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutLikeCommentsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutLikeCommentsInputSchema),z.lazy(() => UserCreateOrConnectWithoutLikeCommentsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommentCreateNestedOneWithoutRepliesInputSchema: z.ZodType<Prisma.CommentCreateNestedOneWithoutRepliesInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutRepliesInputSchema),z.lazy(() => CommentUncheckedCreateWithoutRepliesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CommentCreateOrConnectWithoutRepliesInputSchema).optional(),
  connect: z.lazy(() => CommentWhereUniqueInputSchema).optional()
}).strict();

export const CommentCreateNestedManyWithoutReplyToInputSchema: z.ZodType<Prisma.CommentCreateNestedManyWithoutReplyToInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutReplyToInputSchema),z.lazy(() => CommentCreateWithoutReplyToInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutReplyToInputSchema),z.lazy(() => CommentUncheckedCreateWithoutReplyToInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutReplyToInputSchema),z.lazy(() => CommentCreateOrConnectWithoutReplyToInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyReplyToInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommentCreatelikedByUserIDsInputSchema: z.ZodType<Prisma.CommentCreatelikedByUserIDsInput> = z.object({
  set: z.string().array()
}).strict();

export const UserUncheckedCreateNestedManyWithoutLikeCommentsInputSchema: z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutLikeCommentsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutLikeCommentsInputSchema),z.lazy(() => UserCreateWithoutLikeCommentsInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutLikeCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutLikeCommentsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutLikeCommentsInputSchema),z.lazy(() => UserCreateOrConnectWithoutLikeCommentsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommentUncheckedCreateNestedManyWithoutReplyToInputSchema: z.ZodType<Prisma.CommentUncheckedCreateNestedManyWithoutReplyToInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutReplyToInputSchema),z.lazy(() => CommentCreateWithoutReplyToInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutReplyToInputSchema),z.lazy(() => CommentUncheckedCreateWithoutReplyToInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutReplyToInputSchema),z.lazy(() => CommentCreateOrConnectWithoutReplyToInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyReplyToInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PostUpdateOneWithoutCommentsNestedInputSchema: z.ZodType<Prisma.PostUpdateOneWithoutCommentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutCommentsInputSchema),z.lazy(() => PostUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PostCreateOrConnectWithoutCommentsInputSchema).optional(),
  upsert: z.lazy(() => PostUpsertWithoutCommentsInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.union([ z.boolean(),z.lazy(() => PostWhereInputSchema) ]).optional(),
  connect: z.lazy(() => PostWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PostUpdateToOneWithWhereWithoutCommentsInputSchema),z.lazy(() => PostUpdateWithoutCommentsInputSchema),z.lazy(() => PostUncheckedUpdateWithoutCommentsInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutCommentsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutCommentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCommentsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCommentsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutCommentsInputSchema),z.lazy(() => UserUpdateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCommentsInputSchema) ]).optional(),
}).strict();

export const UserUpdateManyWithoutLikeCommentsNestedInputSchema: z.ZodType<Prisma.UserUpdateManyWithoutLikeCommentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutLikeCommentsInputSchema),z.lazy(() => UserCreateWithoutLikeCommentsInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutLikeCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutLikeCommentsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutLikeCommentsInputSchema),z.lazy(() => UserCreateOrConnectWithoutLikeCommentsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutLikeCommentsInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutLikeCommentsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutLikeCommentsInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutLikeCommentsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutLikeCommentsInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutLikeCommentsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommentUpdateOneWithoutRepliesNestedInputSchema: z.ZodType<Prisma.CommentUpdateOneWithoutRepliesNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutRepliesInputSchema),z.lazy(() => CommentUncheckedCreateWithoutRepliesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CommentCreateOrConnectWithoutRepliesInputSchema).optional(),
  upsert: z.lazy(() => CommentUpsertWithoutRepliesInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.union([ z.boolean(),z.lazy(() => CommentWhereInputSchema) ]).optional(),
  connect: z.lazy(() => CommentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CommentUpdateToOneWithWhereWithoutRepliesInputSchema),z.lazy(() => CommentUpdateWithoutRepliesInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutRepliesInputSchema) ]).optional(),
}).strict();

export const CommentUpdateManyWithoutReplyToNestedInputSchema: z.ZodType<Prisma.CommentUpdateManyWithoutReplyToNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutReplyToInputSchema),z.lazy(() => CommentCreateWithoutReplyToInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutReplyToInputSchema),z.lazy(() => CommentUncheckedCreateWithoutReplyToInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutReplyToInputSchema),z.lazy(() => CommentCreateOrConnectWithoutReplyToInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutReplyToInputSchema),z.lazy(() => CommentUpsertWithWhereUniqueWithoutReplyToInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyReplyToInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutReplyToInputSchema),z.lazy(() => CommentUpdateWithWhereUniqueWithoutReplyToInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutReplyToInputSchema),z.lazy(() => CommentUpdateManyWithWhereWithoutReplyToInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommentUpdatelikedByUserIDsInputSchema: z.ZodType<Prisma.CommentUpdatelikedByUserIDsInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const UserUncheckedUpdateManyWithoutLikeCommentsNestedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutLikeCommentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutLikeCommentsInputSchema),z.lazy(() => UserCreateWithoutLikeCommentsInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutLikeCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutLikeCommentsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutLikeCommentsInputSchema),z.lazy(() => UserCreateOrConnectWithoutLikeCommentsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutLikeCommentsInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutLikeCommentsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutLikeCommentsInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutLikeCommentsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutLikeCommentsInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutLikeCommentsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommentUncheckedUpdateManyWithoutReplyToNestedInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutReplyToNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutReplyToInputSchema),z.lazy(() => CommentCreateWithoutReplyToInputSchema).array(),z.lazy(() => CommentUncheckedCreateWithoutReplyToInputSchema),z.lazy(() => CommentUncheckedCreateWithoutReplyToInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommentCreateOrConnectWithoutReplyToInputSchema),z.lazy(() => CommentCreateOrConnectWithoutReplyToInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommentUpsertWithWhereUniqueWithoutReplyToInputSchema),z.lazy(() => CommentUpsertWithWhereUniqueWithoutReplyToInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommentCreateManyReplyToInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommentWhereUniqueInputSchema),z.lazy(() => CommentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommentUpdateWithWhereUniqueWithoutReplyToInputSchema),z.lazy(() => CommentUpdateWithWhereUniqueWithoutReplyToInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommentUpdateManyWithWhereWithoutReplyToInputSchema),z.lazy(() => CommentUpdateManyWithWhereWithoutReplyToInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedJsonFilterSchema: z.ZodType<Prisma.NestedJsonFilter> = z.object({
  equals: InputJsonValue.optional(),
  not: InputJsonValue.optional()
}).strict();

export const PostCreateWithoutAuthorInputSchema: z.ZodType<Prisma.PostCreateWithoutAuthorInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string().optional().nullable(),
  meta: z.string(),
  tags: z.union([ z.lazy(() => PostCreatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  thumbnail: z.lazy(() => MediaEntityCreateNestedOneWithoutPostInputSchema).optional(),
  likedUsers: z.lazy(() => UserCreateNestedManyWithoutLikedPostsInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutBelongsToInputSchema).optional(),
  translations: z.lazy(() => TranslationCreateNestedManyWithoutPostInputSchema).optional()
}).strict();

export const PostUncheckedCreateWithoutAuthorInputSchema: z.ZodType<Prisma.PostUncheckedCreateWithoutAuthorInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string().optional().nullable(),
  meta: z.string(),
  tags: z.union([ z.lazy(() => PostCreatetagsInputSchema),z.string().array() ]).optional(),
  thumbnailId: z.string().optional().nullable(),
  likedByUserIDs: z.union([ z.lazy(() => PostCreatelikedByUserIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  likedUsers: z.lazy(() => UserUncheckedCreateNestedManyWithoutLikedPostsInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutBelongsToInputSchema).optional(),
  translations: z.lazy(() => TranslationUncheckedCreateNestedManyWithoutPostInputSchema).optional()
}).strict();

export const PostCreateOrConnectWithoutAuthorInputSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutAuthorInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PostCreateWithoutAuthorInputSchema),z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export const PostCreateManyAuthorInputEnvelopeSchema: z.ZodType<Prisma.PostCreateManyAuthorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PostCreateManyAuthorInputSchema),z.lazy(() => PostCreateManyAuthorInputSchema).array() ]),
}).strict();

export const CommentCreateWithoutOwnerInputSchema: z.ZodType<Prisma.CommentCreateWithoutOwnerInput> = z.object({
  id: z.string().optional(),
  content: z.string(),
  chiefComment: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  belongsTo: z.lazy(() => PostCreateNestedOneWithoutCommentsInputSchema).optional(),
  likes: z.lazy(() => UserCreateNestedManyWithoutLikeCommentsInputSchema).optional(),
  replyTo: z.lazy(() => CommentCreateNestedOneWithoutRepliesInputSchema).optional(),
  replies: z.lazy(() => CommentCreateNestedManyWithoutReplyToInputSchema).optional()
}).strict();

export const CommentUncheckedCreateWithoutOwnerInputSchema: z.ZodType<Prisma.CommentUncheckedCreateWithoutOwnerInput> = z.object({
  id: z.string().optional(),
  belongsToId: z.string().optional().nullable(),
  content: z.string(),
  likedByUserIDs: z.union([ z.lazy(() => CommentCreatelikedByUserIDsInputSchema),z.string().array() ]).optional(),
  repliedToID: z.string().optional().nullable(),
  chiefComment: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  likes: z.lazy(() => UserUncheckedCreateNestedManyWithoutLikeCommentsInputSchema).optional(),
  replies: z.lazy(() => CommentUncheckedCreateNestedManyWithoutReplyToInputSchema).optional()
}).strict();

export const CommentCreateOrConnectWithoutOwnerInputSchema: z.ZodType<Prisma.CommentCreateOrConnectWithoutOwnerInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommentCreateWithoutOwnerInputSchema),z.lazy(() => CommentUncheckedCreateWithoutOwnerInputSchema) ]),
}).strict();

export const CommentCreateManyOwnerInputEnvelopeSchema: z.ZodType<Prisma.CommentCreateManyOwnerInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CommentCreateManyOwnerInputSchema),z.lazy(() => CommentCreateManyOwnerInputSchema).array() ]),
}).strict();

export const CommentCreateWithoutLikesInputSchema: z.ZodType<Prisma.CommentCreateWithoutLikesInput> = z.object({
  id: z.string().optional(),
  content: z.string(),
  chiefComment: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  belongsTo: z.lazy(() => PostCreateNestedOneWithoutCommentsInputSchema).optional(),
  owner: z.lazy(() => UserCreateNestedOneWithoutCommentsInputSchema),
  replyTo: z.lazy(() => CommentCreateNestedOneWithoutRepliesInputSchema).optional(),
  replies: z.lazy(() => CommentCreateNestedManyWithoutReplyToInputSchema).optional()
}).strict();

export const CommentUncheckedCreateWithoutLikesInputSchema: z.ZodType<Prisma.CommentUncheckedCreateWithoutLikesInput> = z.object({
  id: z.string().optional(),
  belongsToId: z.string().optional().nullable(),
  ownerId: z.string(),
  content: z.string(),
  likedByUserIDs: z.union([ z.lazy(() => CommentCreatelikedByUserIDsInputSchema),z.string().array() ]).optional(),
  repliedToID: z.string().optional().nullable(),
  chiefComment: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  replies: z.lazy(() => CommentUncheckedCreateNestedManyWithoutReplyToInputSchema).optional()
}).strict();

export const CommentCreateOrConnectWithoutLikesInputSchema: z.ZodType<Prisma.CommentCreateOrConnectWithoutLikesInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommentCreateWithoutLikesInputSchema),z.lazy(() => CommentUncheckedCreateWithoutLikesInputSchema) ]),
}).strict();

export const RoleCreateWithoutUsersInputSchema: z.ZodType<Prisma.RoleCreateWithoutUsersInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  label: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  systemic: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  permissions: z.lazy(() => PermissionCreateNestedManyWithoutRolesInputSchema).optional()
}).strict();

export const RoleUncheckedCreateWithoutUsersInputSchema: z.ZodType<Prisma.RoleUncheckedCreateWithoutUsersInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  label: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  systemic: z.boolean().optional(),
  permissionIDs: z.union([ z.lazy(() => RoleCreatepermissionIDsInputSchema),z.string().array() ]).optional(),
  userIDs: z.union([ z.lazy(() => RoleCreateuserIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  permissions: z.lazy(() => PermissionUncheckedCreateNestedManyWithoutRolesInputSchema).optional()
}).strict();

export const RoleCreateOrConnectWithoutUsersInputSchema: z.ZodType<Prisma.RoleCreateOrConnectWithoutUsersInput> = z.object({
  where: z.lazy(() => RoleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RoleCreateWithoutUsersInputSchema),z.lazy(() => RoleUncheckedCreateWithoutUsersInputSchema) ]),
}).strict();

export const PermissionCreateWithoutUsersInputSchema: z.ZodType<Prisma.PermissionCreateWithoutUsersInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  label: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  rule: InputJsonValue,
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  roles: z.lazy(() => RoleCreateNestedManyWithoutPermissionsInputSchema).optional()
}).strict();

export const PermissionUncheckedCreateWithoutUsersInputSchema: z.ZodType<Prisma.PermissionUncheckedCreateWithoutUsersInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  label: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  rule: InputJsonValue,
  roleIDs: z.union([ z.lazy(() => PermissionCreateroleIDsInputSchema),z.string().array() ]).optional(),
  userIDs: z.union([ z.lazy(() => PermissionCreateuserIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  roles: z.lazy(() => RoleUncheckedCreateNestedManyWithoutPermissionsInputSchema).optional()
}).strict();

export const PermissionCreateOrConnectWithoutUsersInputSchema: z.ZodType<Prisma.PermissionCreateOrConnectWithoutUsersInput> = z.object({
  where: z.lazy(() => PermissionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PermissionCreateWithoutUsersInputSchema),z.lazy(() => PermissionUncheckedCreateWithoutUsersInputSchema) ]),
}).strict();

export const PostCreateWithoutLikedUsersInputSchema: z.ZodType<Prisma.PostCreateWithoutLikedUsersInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string().optional().nullable(),
  meta: z.string(),
  tags: z.union([ z.lazy(() => PostCreatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  thumbnail: z.lazy(() => MediaEntityCreateNestedOneWithoutPostInputSchema).optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutPostsInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutBelongsToInputSchema).optional(),
  translations: z.lazy(() => TranslationCreateNestedManyWithoutPostInputSchema).optional()
}).strict();

export const PostUncheckedCreateWithoutLikedUsersInputSchema: z.ZodType<Prisma.PostUncheckedCreateWithoutLikedUsersInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string().optional().nullable(),
  meta: z.string(),
  tags: z.union([ z.lazy(() => PostCreatetagsInputSchema),z.string().array() ]).optional(),
  thumbnailId: z.string().optional().nullable(),
  authorId: z.string().optional().nullable(),
  likedByUserIDs: z.union([ z.lazy(() => PostCreatelikedByUserIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutBelongsToInputSchema).optional(),
  translations: z.lazy(() => TranslationUncheckedCreateNestedManyWithoutPostInputSchema).optional()
}).strict();

export const PostCreateOrConnectWithoutLikedUsersInputSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutLikedUsersInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PostCreateWithoutLikedUsersInputSchema),z.lazy(() => PostUncheckedCreateWithoutLikedUsersInputSchema) ]),
}).strict();

export const AccessTokenCreateWithoutUserInputSchema: z.ZodType<Prisma.AccessTokenCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  value: z.string(),
  expired_at: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  refreshToken: z.lazy(() => RefreshTokenCreateNestedOneWithoutAccessTokenInputSchema).optional()
}).strict();

export const AccessTokenUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AccessTokenUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  value: z.string(),
  expired_at: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  refreshToken: z.lazy(() => RefreshTokenUncheckedCreateNestedOneWithoutAccessTokenInputSchema).optional()
}).strict();

export const AccessTokenCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AccessTokenCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => AccessTokenWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccessTokenCreateWithoutUserInputSchema),z.lazy(() => AccessTokenUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccessTokenCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AccessTokenCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AccessTokenCreateManyUserInputSchema),z.lazy(() => AccessTokenCreateManyUserInputSchema).array() ]),
}).strict();

export const PostUpsertWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.PostUpsertWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PostUpdateWithoutAuthorInputSchema),z.lazy(() => PostUncheckedUpdateWithoutAuthorInputSchema) ]),
  create: z.union([ z.lazy(() => PostCreateWithoutAuthorInputSchema),z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export const PostUpdateWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.PostUpdateWithWhereUniqueWithoutAuthorInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PostUpdateWithoutAuthorInputSchema),z.lazy(() => PostUncheckedUpdateWithoutAuthorInputSchema) ]),
}).strict();

export const PostUpdateManyWithWhereWithoutAuthorInputSchema: z.ZodType<Prisma.PostUpdateManyWithWhereWithoutAuthorInput> = z.object({
  where: z.lazy(() => PostScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PostUpdateManyMutationInputSchema),z.lazy(() => PostUncheckedUpdateManyWithoutAuthorInputSchema) ]),
}).strict();

export const PostScalarWhereInputSchema: z.ZodType<Prisma.PostScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PostScalarWhereInputSchema),z.lazy(() => PostScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PostScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PostScalarWhereInputSchema),z.lazy(() => PostScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  meta: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tags: z.lazy(() => StringNullableListFilterSchema).optional(),
  thumbnailId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  authorId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  likedByUserIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const CommentUpsertWithWhereUniqueWithoutOwnerInputSchema: z.ZodType<Prisma.CommentUpsertWithWhereUniqueWithoutOwnerInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CommentUpdateWithoutOwnerInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutOwnerInputSchema) ]),
  create: z.union([ z.lazy(() => CommentCreateWithoutOwnerInputSchema),z.lazy(() => CommentUncheckedCreateWithoutOwnerInputSchema) ]),
}).strict();

export const CommentUpdateWithWhereUniqueWithoutOwnerInputSchema: z.ZodType<Prisma.CommentUpdateWithWhereUniqueWithoutOwnerInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateWithoutOwnerInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutOwnerInputSchema) ]),
}).strict();

export const CommentUpdateManyWithWhereWithoutOwnerInputSchema: z.ZodType<Prisma.CommentUpdateManyWithWhereWithoutOwnerInput> = z.object({
  where: z.lazy(() => CommentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateManyMutationInputSchema),z.lazy(() => CommentUncheckedUpdateManyWithoutOwnerInputSchema) ]),
}).strict();

export const CommentScalarWhereInputSchema: z.ZodType<Prisma.CommentScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentScalarWhereInputSchema),z.lazy(() => CommentScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  belongsToId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  ownerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  likedByUserIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  repliedToID: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  chiefComment: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const CommentUpsertWithWhereUniqueWithoutLikesInputSchema: z.ZodType<Prisma.CommentUpsertWithWhereUniqueWithoutLikesInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CommentUpdateWithoutLikesInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutLikesInputSchema) ]),
  create: z.union([ z.lazy(() => CommentCreateWithoutLikesInputSchema),z.lazy(() => CommentUncheckedCreateWithoutLikesInputSchema) ]),
}).strict();

export const CommentUpdateWithWhereUniqueWithoutLikesInputSchema: z.ZodType<Prisma.CommentUpdateWithWhereUniqueWithoutLikesInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateWithoutLikesInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutLikesInputSchema) ]),
}).strict();

export const CommentUpdateManyWithWhereWithoutLikesInputSchema: z.ZodType<Prisma.CommentUpdateManyWithWhereWithoutLikesInput> = z.object({
  where: z.lazy(() => CommentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateManyMutationInputSchema),z.lazy(() => CommentUncheckedUpdateManyWithoutLikesInputSchema) ]),
}).strict();

export const RoleUpsertWithWhereUniqueWithoutUsersInputSchema: z.ZodType<Prisma.RoleUpsertWithWhereUniqueWithoutUsersInput> = z.object({
  where: z.lazy(() => RoleWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RoleUpdateWithoutUsersInputSchema),z.lazy(() => RoleUncheckedUpdateWithoutUsersInputSchema) ]),
  create: z.union([ z.lazy(() => RoleCreateWithoutUsersInputSchema),z.lazy(() => RoleUncheckedCreateWithoutUsersInputSchema) ]),
}).strict();

export const RoleUpdateWithWhereUniqueWithoutUsersInputSchema: z.ZodType<Prisma.RoleUpdateWithWhereUniqueWithoutUsersInput> = z.object({
  where: z.lazy(() => RoleWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RoleUpdateWithoutUsersInputSchema),z.lazy(() => RoleUncheckedUpdateWithoutUsersInputSchema) ]),
}).strict();

export const RoleUpdateManyWithWhereWithoutUsersInputSchema: z.ZodType<Prisma.RoleUpdateManyWithWhereWithoutUsersInput> = z.object({
  where: z.lazy(() => RoleScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RoleUpdateManyMutationInputSchema),z.lazy(() => RoleUncheckedUpdateManyWithoutUsersInputSchema) ]),
}).strict();

export const RoleScalarWhereInputSchema: z.ZodType<Prisma.RoleScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RoleScalarWhereInputSchema),z.lazy(() => RoleScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RoleScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RoleScalarWhereInputSchema),z.lazy(() => RoleScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  label: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  systemic: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  permissionIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  userIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PermissionUpsertWithWhereUniqueWithoutUsersInputSchema: z.ZodType<Prisma.PermissionUpsertWithWhereUniqueWithoutUsersInput> = z.object({
  where: z.lazy(() => PermissionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PermissionUpdateWithoutUsersInputSchema),z.lazy(() => PermissionUncheckedUpdateWithoutUsersInputSchema) ]),
  create: z.union([ z.lazy(() => PermissionCreateWithoutUsersInputSchema),z.lazy(() => PermissionUncheckedCreateWithoutUsersInputSchema) ]),
}).strict();

export const PermissionUpdateWithWhereUniqueWithoutUsersInputSchema: z.ZodType<Prisma.PermissionUpdateWithWhereUniqueWithoutUsersInput> = z.object({
  where: z.lazy(() => PermissionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PermissionUpdateWithoutUsersInputSchema),z.lazy(() => PermissionUncheckedUpdateWithoutUsersInputSchema) ]),
}).strict();

export const PermissionUpdateManyWithWhereWithoutUsersInputSchema: z.ZodType<Prisma.PermissionUpdateManyWithWhereWithoutUsersInput> = z.object({
  where: z.lazy(() => PermissionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PermissionUpdateManyMutationInputSchema),z.lazy(() => PermissionUncheckedUpdateManyWithoutUsersInputSchema) ]),
}).strict();

export const PermissionScalarWhereInputSchema: z.ZodType<Prisma.PermissionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PermissionScalarWhereInputSchema),z.lazy(() => PermissionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PermissionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PermissionScalarWhereInputSchema),z.lazy(() => PermissionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  label: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  rule: z.lazy(() => JsonFilterSchema).optional(),
  roleIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  userIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PostUpsertWithWhereUniqueWithoutLikedUsersInputSchema: z.ZodType<Prisma.PostUpsertWithWhereUniqueWithoutLikedUsersInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PostUpdateWithoutLikedUsersInputSchema),z.lazy(() => PostUncheckedUpdateWithoutLikedUsersInputSchema) ]),
  create: z.union([ z.lazy(() => PostCreateWithoutLikedUsersInputSchema),z.lazy(() => PostUncheckedCreateWithoutLikedUsersInputSchema) ]),
}).strict();

export const PostUpdateWithWhereUniqueWithoutLikedUsersInputSchema: z.ZodType<Prisma.PostUpdateWithWhereUniqueWithoutLikedUsersInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PostUpdateWithoutLikedUsersInputSchema),z.lazy(() => PostUncheckedUpdateWithoutLikedUsersInputSchema) ]),
}).strict();

export const PostUpdateManyWithWhereWithoutLikedUsersInputSchema: z.ZodType<Prisma.PostUpdateManyWithWhereWithoutLikedUsersInput> = z.object({
  where: z.lazy(() => PostScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PostUpdateManyMutationInputSchema),z.lazy(() => PostUncheckedUpdateManyWithoutLikedUsersInputSchema) ]),
}).strict();

export const AccessTokenUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccessTokenUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccessTokenWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AccessTokenUpdateWithoutUserInputSchema),z.lazy(() => AccessTokenUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AccessTokenCreateWithoutUserInputSchema),z.lazy(() => AccessTokenUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccessTokenUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccessTokenUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccessTokenWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AccessTokenUpdateWithoutUserInputSchema),z.lazy(() => AccessTokenUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const AccessTokenUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AccessTokenUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => AccessTokenScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AccessTokenUpdateManyMutationInputSchema),z.lazy(() => AccessTokenUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const AccessTokenScalarWhereInputSchema: z.ZodType<Prisma.AccessTokenScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccessTokenScalarWhereInputSchema),z.lazy(() => AccessTokenScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccessTokenScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccessTokenScalarWhereInputSchema),z.lazy(() => AccessTokenScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expired_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const PermissionCreateWithoutRolesInputSchema: z.ZodType<Prisma.PermissionCreateWithoutRolesInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  label: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  rule: InputJsonValue,
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  users: z.lazy(() => UserCreateNestedManyWithoutPermissionsInputSchema).optional()
}).strict();

export const PermissionUncheckedCreateWithoutRolesInputSchema: z.ZodType<Prisma.PermissionUncheckedCreateWithoutRolesInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  label: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  rule: InputJsonValue,
  roleIDs: z.union([ z.lazy(() => PermissionCreateroleIDsInputSchema),z.string().array() ]).optional(),
  userIDs: z.union([ z.lazy(() => PermissionCreateuserIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutPermissionsInputSchema).optional()
}).strict();

export const PermissionCreateOrConnectWithoutRolesInputSchema: z.ZodType<Prisma.PermissionCreateOrConnectWithoutRolesInput> = z.object({
  where: z.lazy(() => PermissionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PermissionCreateWithoutRolesInputSchema),z.lazy(() => PermissionUncheckedCreateWithoutRolesInputSchema) ]),
}).strict();

export const UserCreateWithoutRolesInputSchema: z.ZodType<Prisma.UserCreateWithoutRolesInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string(),
  provider: z.string(),
  activated: z.boolean().optional(),
  avatar: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostCreateNestedManyWithoutAuthorInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutOwnerInputSchema).optional(),
  LikeComments: z.lazy(() => CommentCreateNestedManyWithoutLikesInputSchema).optional(),
  permissions: z.lazy(() => PermissionCreateNestedManyWithoutUsersInputSchema).optional(),
  likedPosts: z.lazy(() => PostCreateNestedManyWithoutLikedUsersInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutRolesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutRolesInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string(),
  provider: z.string(),
  activated: z.boolean().optional(),
  avatar: z.string().optional().nullable(),
  LikeCommentIDs: z.union([ z.lazy(() => UserCreateLikeCommentIDsInputSchema),z.string().array() ]).optional(),
  roleIDs: z.union([ z.lazy(() => UserCreateroleIDsInputSchema),z.string().array() ]).optional(),
  permissionIDs: z.union([ z.lazy(() => UserCreatepermissionIDsInputSchema),z.string().array() ]).optional(),
  likedPostIDs: z.union([ z.lazy(() => UserCreatelikedPostIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  LikeComments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutLikesInputSchema).optional(),
  permissions: z.lazy(() => PermissionUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  likedPosts: z.lazy(() => PostUncheckedCreateNestedManyWithoutLikedUsersInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutRolesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutRolesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutRolesInputSchema),z.lazy(() => UserUncheckedCreateWithoutRolesInputSchema) ]),
}).strict();

export const PermissionUpsertWithWhereUniqueWithoutRolesInputSchema: z.ZodType<Prisma.PermissionUpsertWithWhereUniqueWithoutRolesInput> = z.object({
  where: z.lazy(() => PermissionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PermissionUpdateWithoutRolesInputSchema),z.lazy(() => PermissionUncheckedUpdateWithoutRolesInputSchema) ]),
  create: z.union([ z.lazy(() => PermissionCreateWithoutRolesInputSchema),z.lazy(() => PermissionUncheckedCreateWithoutRolesInputSchema) ]),
}).strict();

export const PermissionUpdateWithWhereUniqueWithoutRolesInputSchema: z.ZodType<Prisma.PermissionUpdateWithWhereUniqueWithoutRolesInput> = z.object({
  where: z.lazy(() => PermissionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PermissionUpdateWithoutRolesInputSchema),z.lazy(() => PermissionUncheckedUpdateWithoutRolesInputSchema) ]),
}).strict();

export const PermissionUpdateManyWithWhereWithoutRolesInputSchema: z.ZodType<Prisma.PermissionUpdateManyWithWhereWithoutRolesInput> = z.object({
  where: z.lazy(() => PermissionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PermissionUpdateManyMutationInputSchema),z.lazy(() => PermissionUncheckedUpdateManyWithoutRolesInputSchema) ]),
}).strict();

export const UserUpsertWithWhereUniqueWithoutRolesInputSchema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutRolesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserUpdateWithoutRolesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRolesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutRolesInputSchema),z.lazy(() => UserUncheckedCreateWithoutRolesInputSchema) ]),
}).strict();

export const UserUpdateWithWhereUniqueWithoutRolesInputSchema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutRolesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserUpdateWithoutRolesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRolesInputSchema) ]),
}).strict();

export const UserUpdateManyWithWhereWithoutRolesInputSchema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutRolesInput> = z.object({
  where: z.lazy(() => UserScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserUpdateManyMutationInputSchema),z.lazy(() => UserUncheckedUpdateManyWithoutRolesInputSchema) ]),
}).strict();

export const UserScalarWhereInputSchema: z.ZodType<Prisma.UserScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  activated: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  avatar: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  LikeCommentIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  roleIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  permissionIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  likedPostIDs: z.lazy(() => StringNullableListFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const RoleCreateWithoutPermissionsInputSchema: z.ZodType<Prisma.RoleCreateWithoutPermissionsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  label: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  systemic: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  users: z.lazy(() => UserCreateNestedManyWithoutRolesInputSchema).optional()
}).strict();

export const RoleUncheckedCreateWithoutPermissionsInputSchema: z.ZodType<Prisma.RoleUncheckedCreateWithoutPermissionsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  label: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  systemic: z.boolean().optional(),
  permissionIDs: z.union([ z.lazy(() => RoleCreatepermissionIDsInputSchema),z.string().array() ]).optional(),
  userIDs: z.union([ z.lazy(() => RoleCreateuserIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutRolesInputSchema).optional()
}).strict();

export const RoleCreateOrConnectWithoutPermissionsInputSchema: z.ZodType<Prisma.RoleCreateOrConnectWithoutPermissionsInput> = z.object({
  where: z.lazy(() => RoleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RoleCreateWithoutPermissionsInputSchema),z.lazy(() => RoleUncheckedCreateWithoutPermissionsInputSchema) ]),
}).strict();

export const UserCreateWithoutPermissionsInputSchema: z.ZodType<Prisma.UserCreateWithoutPermissionsInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string(),
  provider: z.string(),
  activated: z.boolean().optional(),
  avatar: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostCreateNestedManyWithoutAuthorInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutOwnerInputSchema).optional(),
  LikeComments: z.lazy(() => CommentCreateNestedManyWithoutLikesInputSchema).optional(),
  roles: z.lazy(() => RoleCreateNestedManyWithoutUsersInputSchema).optional(),
  likedPosts: z.lazy(() => PostCreateNestedManyWithoutLikedUsersInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutPermissionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutPermissionsInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string(),
  provider: z.string(),
  activated: z.boolean().optional(),
  avatar: z.string().optional().nullable(),
  LikeCommentIDs: z.union([ z.lazy(() => UserCreateLikeCommentIDsInputSchema),z.string().array() ]).optional(),
  roleIDs: z.union([ z.lazy(() => UserCreateroleIDsInputSchema),z.string().array() ]).optional(),
  permissionIDs: z.union([ z.lazy(() => UserCreatepermissionIDsInputSchema),z.string().array() ]).optional(),
  likedPostIDs: z.union([ z.lazy(() => UserCreatelikedPostIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  LikeComments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutLikesInputSchema).optional(),
  roles: z.lazy(() => RoleUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  likedPosts: z.lazy(() => PostUncheckedCreateNestedManyWithoutLikedUsersInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutPermissionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPermissionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutPermissionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPermissionsInputSchema) ]),
}).strict();

export const RoleUpsertWithWhereUniqueWithoutPermissionsInputSchema: z.ZodType<Prisma.RoleUpsertWithWhereUniqueWithoutPermissionsInput> = z.object({
  where: z.lazy(() => RoleWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RoleUpdateWithoutPermissionsInputSchema),z.lazy(() => RoleUncheckedUpdateWithoutPermissionsInputSchema) ]),
  create: z.union([ z.lazy(() => RoleCreateWithoutPermissionsInputSchema),z.lazy(() => RoleUncheckedCreateWithoutPermissionsInputSchema) ]),
}).strict();

export const RoleUpdateWithWhereUniqueWithoutPermissionsInputSchema: z.ZodType<Prisma.RoleUpdateWithWhereUniqueWithoutPermissionsInput> = z.object({
  where: z.lazy(() => RoleWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RoleUpdateWithoutPermissionsInputSchema),z.lazy(() => RoleUncheckedUpdateWithoutPermissionsInputSchema) ]),
}).strict();

export const RoleUpdateManyWithWhereWithoutPermissionsInputSchema: z.ZodType<Prisma.RoleUpdateManyWithWhereWithoutPermissionsInput> = z.object({
  where: z.lazy(() => RoleScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RoleUpdateManyMutationInputSchema),z.lazy(() => RoleUncheckedUpdateManyWithoutPermissionsInputSchema) ]),
}).strict();

export const UserUpsertWithWhereUniqueWithoutPermissionsInputSchema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutPermissionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserUpdateWithoutPermissionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPermissionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutPermissionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPermissionsInputSchema) ]),
}).strict();

export const UserUpdateWithWhereUniqueWithoutPermissionsInputSchema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutPermissionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserUpdateWithoutPermissionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPermissionsInputSchema) ]),
}).strict();

export const UserUpdateManyWithWhereWithoutPermissionsInputSchema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutPermissionsInput> = z.object({
  where: z.lazy(() => UserScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserUpdateManyMutationInputSchema),z.lazy(() => UserUncheckedUpdateManyWithoutPermissionsInputSchema) ]),
}).strict();

export const MediaEntityCreateWithoutPostInputSchema: z.ZodType<Prisma.MediaEntityCreateWithoutPostInput> = z.object({
  id: z.string().optional(),
  file: z.string(),
  ext: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const MediaEntityUncheckedCreateWithoutPostInputSchema: z.ZodType<Prisma.MediaEntityUncheckedCreateWithoutPostInput> = z.object({
  id: z.string().optional(),
  file: z.string(),
  ext: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const MediaEntityCreateOrConnectWithoutPostInputSchema: z.ZodType<Prisma.MediaEntityCreateOrConnectWithoutPostInput> = z.object({
  where: z.lazy(() => MediaEntityWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MediaEntityCreateWithoutPostInputSchema),z.lazy(() => MediaEntityUncheckedCreateWithoutPostInputSchema) ]),
}).strict();

export const UserCreateWithoutPostsInputSchema: z.ZodType<Prisma.UserCreateWithoutPostsInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string(),
  provider: z.string(),
  activated: z.boolean().optional(),
  avatar: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutOwnerInputSchema).optional(),
  LikeComments: z.lazy(() => CommentCreateNestedManyWithoutLikesInputSchema).optional(),
  roles: z.lazy(() => RoleCreateNestedManyWithoutUsersInputSchema).optional(),
  permissions: z.lazy(() => PermissionCreateNestedManyWithoutUsersInputSchema).optional(),
  likedPosts: z.lazy(() => PostCreateNestedManyWithoutLikedUsersInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutPostsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutPostsInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string(),
  provider: z.string(),
  activated: z.boolean().optional(),
  avatar: z.string().optional().nullable(),
  LikeCommentIDs: z.union([ z.lazy(() => UserCreateLikeCommentIDsInputSchema),z.string().array() ]).optional(),
  roleIDs: z.union([ z.lazy(() => UserCreateroleIDsInputSchema),z.string().array() ]).optional(),
  permissionIDs: z.union([ z.lazy(() => UserCreatepermissionIDsInputSchema),z.string().array() ]).optional(),
  likedPostIDs: z.union([ z.lazy(() => UserCreatelikedPostIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  LikeComments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutLikesInputSchema).optional(),
  roles: z.lazy(() => RoleUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  permissions: z.lazy(() => PermissionUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  likedPosts: z.lazy(() => PostUncheckedCreateNestedManyWithoutLikedUsersInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutPostsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPostsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutPostsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPostsInputSchema) ]),
}).strict();

export const UserCreateWithoutLikedPostsInputSchema: z.ZodType<Prisma.UserCreateWithoutLikedPostsInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string(),
  provider: z.string(),
  activated: z.boolean().optional(),
  avatar: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostCreateNestedManyWithoutAuthorInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutOwnerInputSchema).optional(),
  LikeComments: z.lazy(() => CommentCreateNestedManyWithoutLikesInputSchema).optional(),
  roles: z.lazy(() => RoleCreateNestedManyWithoutUsersInputSchema).optional(),
  permissions: z.lazy(() => PermissionCreateNestedManyWithoutUsersInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutLikedPostsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutLikedPostsInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string(),
  provider: z.string(),
  activated: z.boolean().optional(),
  avatar: z.string().optional().nullable(),
  LikeCommentIDs: z.union([ z.lazy(() => UserCreateLikeCommentIDsInputSchema),z.string().array() ]).optional(),
  roleIDs: z.union([ z.lazy(() => UserCreateroleIDsInputSchema),z.string().array() ]).optional(),
  permissionIDs: z.union([ z.lazy(() => UserCreatepermissionIDsInputSchema),z.string().array() ]).optional(),
  likedPostIDs: z.union([ z.lazy(() => UserCreatelikedPostIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  LikeComments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutLikesInputSchema).optional(),
  roles: z.lazy(() => RoleUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  permissions: z.lazy(() => PermissionUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutLikedPostsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutLikedPostsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutLikedPostsInputSchema),z.lazy(() => UserUncheckedCreateWithoutLikedPostsInputSchema) ]),
}).strict();

export const CommentCreateWithoutBelongsToInputSchema: z.ZodType<Prisma.CommentCreateWithoutBelongsToInput> = z.object({
  id: z.string().optional(),
  content: z.string(),
  chiefComment: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  owner: z.lazy(() => UserCreateNestedOneWithoutCommentsInputSchema),
  likes: z.lazy(() => UserCreateNestedManyWithoutLikeCommentsInputSchema).optional(),
  replyTo: z.lazy(() => CommentCreateNestedOneWithoutRepliesInputSchema).optional(),
  replies: z.lazy(() => CommentCreateNestedManyWithoutReplyToInputSchema).optional()
}).strict();

export const CommentUncheckedCreateWithoutBelongsToInputSchema: z.ZodType<Prisma.CommentUncheckedCreateWithoutBelongsToInput> = z.object({
  id: z.string().optional(),
  ownerId: z.string(),
  content: z.string(),
  likedByUserIDs: z.union([ z.lazy(() => CommentCreatelikedByUserIDsInputSchema),z.string().array() ]).optional(),
  repliedToID: z.string().optional().nullable(),
  chiefComment: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  likes: z.lazy(() => UserUncheckedCreateNestedManyWithoutLikeCommentsInputSchema).optional(),
  replies: z.lazy(() => CommentUncheckedCreateNestedManyWithoutReplyToInputSchema).optional()
}).strict();

export const CommentCreateOrConnectWithoutBelongsToInputSchema: z.ZodType<Prisma.CommentCreateOrConnectWithoutBelongsToInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommentCreateWithoutBelongsToInputSchema),z.lazy(() => CommentUncheckedCreateWithoutBelongsToInputSchema) ]),
}).strict();

export const CommentCreateManyBelongsToInputEnvelopeSchema: z.ZodType<Prisma.CommentCreateManyBelongsToInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CommentCreateManyBelongsToInputSchema),z.lazy(() => CommentCreateManyBelongsToInputSchema).array() ]),
}).strict();

export const TranslationCreateWithoutPostInputSchema: z.ZodType<Prisma.TranslationCreateWithoutPostInput> = z.object({
  id: z.string().optional(),
  language: z.string(),
  title: z.string(),
  content: z.string().optional().nullable(),
  meta: z.string()
}).strict();

export const TranslationUncheckedCreateWithoutPostInputSchema: z.ZodType<Prisma.TranslationUncheckedCreateWithoutPostInput> = z.object({
  id: z.string().optional(),
  language: z.string(),
  title: z.string(),
  content: z.string().optional().nullable(),
  meta: z.string()
}).strict();

export const TranslationCreateOrConnectWithoutPostInputSchema: z.ZodType<Prisma.TranslationCreateOrConnectWithoutPostInput> = z.object({
  where: z.lazy(() => TranslationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TranslationCreateWithoutPostInputSchema),z.lazy(() => TranslationUncheckedCreateWithoutPostInputSchema) ]),
}).strict();

export const TranslationCreateManyPostInputEnvelopeSchema: z.ZodType<Prisma.TranslationCreateManyPostInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TranslationCreateManyPostInputSchema),z.lazy(() => TranslationCreateManyPostInputSchema).array() ]),
}).strict();

export const MediaEntityUpsertWithoutPostInputSchema: z.ZodType<Prisma.MediaEntityUpsertWithoutPostInput> = z.object({
  update: z.union([ z.lazy(() => MediaEntityUpdateWithoutPostInputSchema),z.lazy(() => MediaEntityUncheckedUpdateWithoutPostInputSchema) ]),
  create: z.union([ z.lazy(() => MediaEntityCreateWithoutPostInputSchema),z.lazy(() => MediaEntityUncheckedCreateWithoutPostInputSchema) ]),
  where: z.lazy(() => MediaEntityWhereInputSchema).optional()
}).strict();

export const MediaEntityUpdateToOneWithWhereWithoutPostInputSchema: z.ZodType<Prisma.MediaEntityUpdateToOneWithWhereWithoutPostInput> = z.object({
  where: z.lazy(() => MediaEntityWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => MediaEntityUpdateWithoutPostInputSchema),z.lazy(() => MediaEntityUncheckedUpdateWithoutPostInputSchema) ]),
}).strict();

export const MediaEntityUpdateWithoutPostInputSchema: z.ZodType<Prisma.MediaEntityUpdateWithoutPostInput> = z.object({
  file: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ext: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MediaEntityUncheckedUpdateWithoutPostInputSchema: z.ZodType<Prisma.MediaEntityUncheckedUpdateWithoutPostInput> = z.object({
  file: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ext: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUpsertWithoutPostsInputSchema: z.ZodType<Prisma.UserUpsertWithoutPostsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutPostsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPostsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutPostsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPostsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutPostsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPostsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutPostsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPostsInputSchema) ]),
}).strict();

export const UserUpdateWithoutPostsInputSchema: z.ZodType<Prisma.UserUpdateWithoutPostsInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutOwnerNestedInputSchema).optional(),
  LikeComments: z.lazy(() => CommentUpdateManyWithoutLikesNestedInputSchema).optional(),
  roles: z.lazy(() => RoleUpdateManyWithoutUsersNestedInputSchema).optional(),
  permissions: z.lazy(() => PermissionUpdateManyWithoutUsersNestedInputSchema).optional(),
  likedPosts: z.lazy(() => PostUpdateManyWithoutLikedUsersNestedInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutPostsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutPostsInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  LikeCommentIDs: z.union([ z.lazy(() => UserUpdateLikeCommentIDsInputSchema),z.string().array() ]).optional(),
  roleIDs: z.union([ z.lazy(() => UserUpdateroleIDsInputSchema),z.string().array() ]).optional(),
  permissionIDs: z.union([ z.lazy(() => UserUpdatepermissionIDsInputSchema),z.string().array() ]).optional(),
  likedPostIDs: z.union([ z.lazy(() => UserUpdatelikedPostIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  LikeComments: z.lazy(() => CommentUncheckedUpdateManyWithoutLikesNestedInputSchema).optional(),
  roles: z.lazy(() => RoleUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  permissions: z.lazy(() => PermissionUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  likedPosts: z.lazy(() => PostUncheckedUpdateManyWithoutLikedUsersNestedInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUpsertWithWhereUniqueWithoutLikedPostsInputSchema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutLikedPostsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserUpdateWithoutLikedPostsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutLikedPostsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutLikedPostsInputSchema),z.lazy(() => UserUncheckedCreateWithoutLikedPostsInputSchema) ]),
}).strict();

export const UserUpdateWithWhereUniqueWithoutLikedPostsInputSchema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutLikedPostsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserUpdateWithoutLikedPostsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutLikedPostsInputSchema) ]),
}).strict();

export const UserUpdateManyWithWhereWithoutLikedPostsInputSchema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutLikedPostsInput> = z.object({
  where: z.lazy(() => UserScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserUpdateManyMutationInputSchema),z.lazy(() => UserUncheckedUpdateManyWithoutLikedPostsInputSchema) ]),
}).strict();

export const CommentUpsertWithWhereUniqueWithoutBelongsToInputSchema: z.ZodType<Prisma.CommentUpsertWithWhereUniqueWithoutBelongsToInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CommentUpdateWithoutBelongsToInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutBelongsToInputSchema) ]),
  create: z.union([ z.lazy(() => CommentCreateWithoutBelongsToInputSchema),z.lazy(() => CommentUncheckedCreateWithoutBelongsToInputSchema) ]),
}).strict();

export const CommentUpdateWithWhereUniqueWithoutBelongsToInputSchema: z.ZodType<Prisma.CommentUpdateWithWhereUniqueWithoutBelongsToInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateWithoutBelongsToInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutBelongsToInputSchema) ]),
}).strict();

export const CommentUpdateManyWithWhereWithoutBelongsToInputSchema: z.ZodType<Prisma.CommentUpdateManyWithWhereWithoutBelongsToInput> = z.object({
  where: z.lazy(() => CommentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateManyMutationInputSchema),z.lazy(() => CommentUncheckedUpdateManyWithoutBelongsToInputSchema) ]),
}).strict();

export const TranslationUpsertWithWhereUniqueWithoutPostInputSchema: z.ZodType<Prisma.TranslationUpsertWithWhereUniqueWithoutPostInput> = z.object({
  where: z.lazy(() => TranslationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TranslationUpdateWithoutPostInputSchema),z.lazy(() => TranslationUncheckedUpdateWithoutPostInputSchema) ]),
  create: z.union([ z.lazy(() => TranslationCreateWithoutPostInputSchema),z.lazy(() => TranslationUncheckedCreateWithoutPostInputSchema) ]),
}).strict();

export const TranslationUpdateWithWhereUniqueWithoutPostInputSchema: z.ZodType<Prisma.TranslationUpdateWithWhereUniqueWithoutPostInput> = z.object({
  where: z.lazy(() => TranslationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TranslationUpdateWithoutPostInputSchema),z.lazy(() => TranslationUncheckedUpdateWithoutPostInputSchema) ]),
}).strict();

export const TranslationUpdateManyWithWhereWithoutPostInputSchema: z.ZodType<Prisma.TranslationUpdateManyWithWhereWithoutPostInput> = z.object({
  where: z.lazy(() => TranslationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TranslationUpdateManyMutationInputSchema),z.lazy(() => TranslationUncheckedUpdateManyWithoutPostInputSchema) ]),
}).strict();

export const TranslationScalarWhereInputSchema: z.ZodType<Prisma.TranslationScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TranslationScalarWhereInputSchema),z.lazy(() => TranslationScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TranslationScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TranslationScalarWhereInputSchema),z.lazy(() => TranslationScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  language: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  meta: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  postId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const PostCreateWithoutTranslationsInputSchema: z.ZodType<Prisma.PostCreateWithoutTranslationsInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string().optional().nullable(),
  meta: z.string(),
  tags: z.union([ z.lazy(() => PostCreatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  thumbnail: z.lazy(() => MediaEntityCreateNestedOneWithoutPostInputSchema).optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutPostsInputSchema).optional(),
  likedUsers: z.lazy(() => UserCreateNestedManyWithoutLikedPostsInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutBelongsToInputSchema).optional()
}).strict();

export const PostUncheckedCreateWithoutTranslationsInputSchema: z.ZodType<Prisma.PostUncheckedCreateWithoutTranslationsInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string().optional().nullable(),
  meta: z.string(),
  tags: z.union([ z.lazy(() => PostCreatetagsInputSchema),z.string().array() ]).optional(),
  thumbnailId: z.string().optional().nullable(),
  authorId: z.string().optional().nullable(),
  likedByUserIDs: z.union([ z.lazy(() => PostCreatelikedByUserIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  likedUsers: z.lazy(() => UserUncheckedCreateNestedManyWithoutLikedPostsInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutBelongsToInputSchema).optional()
}).strict();

export const PostCreateOrConnectWithoutTranslationsInputSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutTranslationsInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PostCreateWithoutTranslationsInputSchema),z.lazy(() => PostUncheckedCreateWithoutTranslationsInputSchema) ]),
}).strict();

export const PostUpsertWithoutTranslationsInputSchema: z.ZodType<Prisma.PostUpsertWithoutTranslationsInput> = z.object({
  update: z.union([ z.lazy(() => PostUpdateWithoutTranslationsInputSchema),z.lazy(() => PostUncheckedUpdateWithoutTranslationsInputSchema) ]),
  create: z.union([ z.lazy(() => PostCreateWithoutTranslationsInputSchema),z.lazy(() => PostUncheckedCreateWithoutTranslationsInputSchema) ]),
  where: z.lazy(() => PostWhereInputSchema).optional()
}).strict();

export const PostUpdateToOneWithWhereWithoutTranslationsInputSchema: z.ZodType<Prisma.PostUpdateToOneWithWhereWithoutTranslationsInput> = z.object({
  where: z.lazy(() => PostWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PostUpdateWithoutTranslationsInputSchema),z.lazy(() => PostUncheckedUpdateWithoutTranslationsInputSchema) ]),
}).strict();

export const PostUpdateWithoutTranslationsInputSchema: z.ZodType<Prisma.PostUpdateWithoutTranslationsInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => PostUpdatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  thumbnail: z.lazy(() => MediaEntityUpdateOneWithoutPostNestedInputSchema).optional(),
  author: z.lazy(() => UserUpdateOneWithoutPostsNestedInputSchema).optional(),
  likedUsers: z.lazy(() => UserUpdateManyWithoutLikedPostsNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutBelongsToNestedInputSchema).optional()
}).strict();

export const PostUncheckedUpdateWithoutTranslationsInputSchema: z.ZodType<Prisma.PostUncheckedUpdateWithoutTranslationsInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => PostUpdatetagsInputSchema),z.string().array() ]).optional(),
  thumbnailId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  authorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  likedByUserIDs: z.union([ z.lazy(() => PostUpdatelikedByUserIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  likedUsers: z.lazy(() => UserUncheckedUpdateManyWithoutLikedPostsNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutBelongsToNestedInputSchema).optional()
}).strict();

export const PostCreateWithoutThumbnailInputSchema: z.ZodType<Prisma.PostCreateWithoutThumbnailInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string().optional().nullable(),
  meta: z.string(),
  tags: z.union([ z.lazy(() => PostCreatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutPostsInputSchema).optional(),
  likedUsers: z.lazy(() => UserCreateNestedManyWithoutLikedPostsInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutBelongsToInputSchema).optional(),
  translations: z.lazy(() => TranslationCreateNestedManyWithoutPostInputSchema).optional()
}).strict();

export const PostUncheckedCreateWithoutThumbnailInputSchema: z.ZodType<Prisma.PostUncheckedCreateWithoutThumbnailInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string().optional().nullable(),
  meta: z.string(),
  tags: z.union([ z.lazy(() => PostCreatetagsInputSchema),z.string().array() ]).optional(),
  authorId: z.string().optional().nullable(),
  likedByUserIDs: z.union([ z.lazy(() => PostCreatelikedByUserIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  likedUsers: z.lazy(() => UserUncheckedCreateNestedManyWithoutLikedPostsInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutBelongsToInputSchema).optional(),
  translations: z.lazy(() => TranslationUncheckedCreateNestedManyWithoutPostInputSchema).optional()
}).strict();

export const PostCreateOrConnectWithoutThumbnailInputSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutThumbnailInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PostCreateWithoutThumbnailInputSchema),z.lazy(() => PostUncheckedCreateWithoutThumbnailInputSchema) ]),
}).strict();

export const PostCreateManyThumbnailInputEnvelopeSchema: z.ZodType<Prisma.PostCreateManyThumbnailInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PostCreateManyThumbnailInputSchema),z.lazy(() => PostCreateManyThumbnailInputSchema).array() ]),
}).strict();

export const PostUpsertWithWhereUniqueWithoutThumbnailInputSchema: z.ZodType<Prisma.PostUpsertWithWhereUniqueWithoutThumbnailInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PostUpdateWithoutThumbnailInputSchema),z.lazy(() => PostUncheckedUpdateWithoutThumbnailInputSchema) ]),
  create: z.union([ z.lazy(() => PostCreateWithoutThumbnailInputSchema),z.lazy(() => PostUncheckedCreateWithoutThumbnailInputSchema) ]),
}).strict();

export const PostUpdateWithWhereUniqueWithoutThumbnailInputSchema: z.ZodType<Prisma.PostUpdateWithWhereUniqueWithoutThumbnailInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PostUpdateWithoutThumbnailInputSchema),z.lazy(() => PostUncheckedUpdateWithoutThumbnailInputSchema) ]),
}).strict();

export const PostUpdateManyWithWhereWithoutThumbnailInputSchema: z.ZodType<Prisma.PostUpdateManyWithWhereWithoutThumbnailInput> = z.object({
  where: z.lazy(() => PostScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PostUpdateManyMutationInputSchema),z.lazy(() => PostUncheckedUpdateManyWithoutThumbnailInputSchema) ]),
}).strict();

export const AccessTokenCreateWithoutRefreshTokenInputSchema: z.ZodType<Prisma.AccessTokenCreateWithoutRefreshTokenInput> = z.object({
  id: z.string().optional(),
  value: z.string(),
  expired_at: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutAccessTokensInputSchema)
}).strict();

export const AccessTokenUncheckedCreateWithoutRefreshTokenInputSchema: z.ZodType<Prisma.AccessTokenUncheckedCreateWithoutRefreshTokenInput> = z.object({
  id: z.string().optional(),
  value: z.string(),
  expired_at: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  userId: z.string()
}).strict();

export const AccessTokenCreateOrConnectWithoutRefreshTokenInputSchema: z.ZodType<Prisma.AccessTokenCreateOrConnectWithoutRefreshTokenInput> = z.object({
  where: z.lazy(() => AccessTokenWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccessTokenCreateWithoutRefreshTokenInputSchema),z.lazy(() => AccessTokenUncheckedCreateWithoutRefreshTokenInputSchema) ]),
}).strict();

export const AccessTokenUpsertWithoutRefreshTokenInputSchema: z.ZodType<Prisma.AccessTokenUpsertWithoutRefreshTokenInput> = z.object({
  update: z.union([ z.lazy(() => AccessTokenUpdateWithoutRefreshTokenInputSchema),z.lazy(() => AccessTokenUncheckedUpdateWithoutRefreshTokenInputSchema) ]),
  create: z.union([ z.lazy(() => AccessTokenCreateWithoutRefreshTokenInputSchema),z.lazy(() => AccessTokenUncheckedCreateWithoutRefreshTokenInputSchema) ]),
  where: z.lazy(() => AccessTokenWhereInputSchema).optional()
}).strict();

export const AccessTokenUpdateToOneWithWhereWithoutRefreshTokenInputSchema: z.ZodType<Prisma.AccessTokenUpdateToOneWithWhereWithoutRefreshTokenInput> = z.object({
  where: z.lazy(() => AccessTokenWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AccessTokenUpdateWithoutRefreshTokenInputSchema),z.lazy(() => AccessTokenUncheckedUpdateWithoutRefreshTokenInputSchema) ]),
}).strict();

export const AccessTokenUpdateWithoutRefreshTokenInputSchema: z.ZodType<Prisma.AccessTokenUpdateWithoutRefreshTokenInput> = z.object({
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expired_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAccessTokensNestedInputSchema).optional()
}).strict();

export const AccessTokenUncheckedUpdateWithoutRefreshTokenInputSchema: z.ZodType<Prisma.AccessTokenUncheckedUpdateWithoutRefreshTokenInput> = z.object({
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expired_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RefreshTokenCreateWithoutAccessTokenInputSchema: z.ZodType<Prisma.RefreshTokenCreateWithoutAccessTokenInput> = z.object({
  id: z.string().optional(),
  value: z.string(),
  expired_at: z.coerce.date(),
  createdAt: z.coerce.date().optional()
}).strict();

export const RefreshTokenUncheckedCreateWithoutAccessTokenInputSchema: z.ZodType<Prisma.RefreshTokenUncheckedCreateWithoutAccessTokenInput> = z.object({
  id: z.string().optional(),
  value: z.string(),
  expired_at: z.coerce.date(),
  createdAt: z.coerce.date().optional()
}).strict();

export const RefreshTokenCreateOrConnectWithoutAccessTokenInputSchema: z.ZodType<Prisma.RefreshTokenCreateOrConnectWithoutAccessTokenInput> = z.object({
  where: z.lazy(() => RefreshTokenWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RefreshTokenCreateWithoutAccessTokenInputSchema),z.lazy(() => RefreshTokenUncheckedCreateWithoutAccessTokenInputSchema) ]),
}).strict();

export const UserCreateWithoutAccessTokensInputSchema: z.ZodType<Prisma.UserCreateWithoutAccessTokensInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string(),
  provider: z.string(),
  activated: z.boolean().optional(),
  avatar: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostCreateNestedManyWithoutAuthorInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutOwnerInputSchema).optional(),
  LikeComments: z.lazy(() => CommentCreateNestedManyWithoutLikesInputSchema).optional(),
  roles: z.lazy(() => RoleCreateNestedManyWithoutUsersInputSchema).optional(),
  permissions: z.lazy(() => PermissionCreateNestedManyWithoutUsersInputSchema).optional(),
  likedPosts: z.lazy(() => PostCreateNestedManyWithoutLikedUsersInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAccessTokensInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccessTokensInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string(),
  provider: z.string(),
  activated: z.boolean().optional(),
  avatar: z.string().optional().nullable(),
  LikeCommentIDs: z.union([ z.lazy(() => UserCreateLikeCommentIDsInputSchema),z.string().array() ]).optional(),
  roleIDs: z.union([ z.lazy(() => UserCreateroleIDsInputSchema),z.string().array() ]).optional(),
  permissionIDs: z.union([ z.lazy(() => UserCreatepermissionIDsInputSchema),z.string().array() ]).optional(),
  likedPostIDs: z.union([ z.lazy(() => UserCreatelikedPostIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  LikeComments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutLikesInputSchema).optional(),
  roles: z.lazy(() => RoleUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  permissions: z.lazy(() => PermissionUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  likedPosts: z.lazy(() => PostUncheckedCreateNestedManyWithoutLikedUsersInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutAccessTokensInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAccessTokensInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAccessTokensInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccessTokensInputSchema) ]),
}).strict();

export const RefreshTokenUpsertWithoutAccessTokenInputSchema: z.ZodType<Prisma.RefreshTokenUpsertWithoutAccessTokenInput> = z.object({
  update: z.union([ z.lazy(() => RefreshTokenUpdateWithoutAccessTokenInputSchema),z.lazy(() => RefreshTokenUncheckedUpdateWithoutAccessTokenInputSchema) ]),
  create: z.union([ z.lazy(() => RefreshTokenCreateWithoutAccessTokenInputSchema),z.lazy(() => RefreshTokenUncheckedCreateWithoutAccessTokenInputSchema) ]),
  where: z.lazy(() => RefreshTokenWhereInputSchema).optional()
}).strict();

export const RefreshTokenUpdateToOneWithWhereWithoutAccessTokenInputSchema: z.ZodType<Prisma.RefreshTokenUpdateToOneWithWhereWithoutAccessTokenInput> = z.object({
  where: z.lazy(() => RefreshTokenWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RefreshTokenUpdateWithoutAccessTokenInputSchema),z.lazy(() => RefreshTokenUncheckedUpdateWithoutAccessTokenInputSchema) ]),
}).strict();

export const RefreshTokenUpdateWithoutAccessTokenInputSchema: z.ZodType<Prisma.RefreshTokenUpdateWithoutAccessTokenInput> = z.object({
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expired_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RefreshTokenUncheckedUpdateWithoutAccessTokenInputSchema: z.ZodType<Prisma.RefreshTokenUncheckedUpdateWithoutAccessTokenInput> = z.object({
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expired_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUpsertWithoutAccessTokensInputSchema: z.ZodType<Prisma.UserUpsertWithoutAccessTokensInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAccessTokensInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccessTokensInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAccessTokensInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccessTokensInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutAccessTokensInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAccessTokensInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAccessTokensInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccessTokensInputSchema) ]),
}).strict();

export const UserUpdateWithoutAccessTokensInputSchema: z.ZodType<Prisma.UserUpdateWithoutAccessTokensInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUpdateManyWithoutAuthorNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutOwnerNestedInputSchema).optional(),
  LikeComments: z.lazy(() => CommentUpdateManyWithoutLikesNestedInputSchema).optional(),
  roles: z.lazy(() => RoleUpdateManyWithoutUsersNestedInputSchema).optional(),
  permissions: z.lazy(() => PermissionUpdateManyWithoutUsersNestedInputSchema).optional(),
  likedPosts: z.lazy(() => PostUpdateManyWithoutLikedUsersNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAccessTokensInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccessTokensInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  LikeCommentIDs: z.union([ z.lazy(() => UserUpdateLikeCommentIDsInputSchema),z.string().array() ]).optional(),
  roleIDs: z.union([ z.lazy(() => UserUpdateroleIDsInputSchema),z.string().array() ]).optional(),
  permissionIDs: z.union([ z.lazy(() => UserUpdatepermissionIDsInputSchema),z.string().array() ]).optional(),
  likedPostIDs: z.union([ z.lazy(() => UserUpdatelikedPostIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  LikeComments: z.lazy(() => CommentUncheckedUpdateManyWithoutLikesNestedInputSchema).optional(),
  roles: z.lazy(() => RoleUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  permissions: z.lazy(() => PermissionUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  likedPosts: z.lazy(() => PostUncheckedUpdateManyWithoutLikedUsersNestedInputSchema).optional()
}).strict();

export const PostCreateWithoutCommentsInputSchema: z.ZodType<Prisma.PostCreateWithoutCommentsInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string().optional().nullable(),
  meta: z.string(),
  tags: z.union([ z.lazy(() => PostCreatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  thumbnail: z.lazy(() => MediaEntityCreateNestedOneWithoutPostInputSchema).optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutPostsInputSchema).optional(),
  likedUsers: z.lazy(() => UserCreateNestedManyWithoutLikedPostsInputSchema).optional(),
  translations: z.lazy(() => TranslationCreateNestedManyWithoutPostInputSchema).optional()
}).strict();

export const PostUncheckedCreateWithoutCommentsInputSchema: z.ZodType<Prisma.PostUncheckedCreateWithoutCommentsInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string().optional().nullable(),
  meta: z.string(),
  tags: z.union([ z.lazy(() => PostCreatetagsInputSchema),z.string().array() ]).optional(),
  thumbnailId: z.string().optional().nullable(),
  authorId: z.string().optional().nullable(),
  likedByUserIDs: z.union([ z.lazy(() => PostCreatelikedByUserIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  likedUsers: z.lazy(() => UserUncheckedCreateNestedManyWithoutLikedPostsInputSchema).optional(),
  translations: z.lazy(() => TranslationUncheckedCreateNestedManyWithoutPostInputSchema).optional()
}).strict();

export const PostCreateOrConnectWithoutCommentsInputSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutCommentsInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PostCreateWithoutCommentsInputSchema),z.lazy(() => PostUncheckedCreateWithoutCommentsInputSchema) ]),
}).strict();

export const UserCreateWithoutCommentsInputSchema: z.ZodType<Prisma.UserCreateWithoutCommentsInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string(),
  provider: z.string(),
  activated: z.boolean().optional(),
  avatar: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostCreateNestedManyWithoutAuthorInputSchema).optional(),
  LikeComments: z.lazy(() => CommentCreateNestedManyWithoutLikesInputSchema).optional(),
  roles: z.lazy(() => RoleCreateNestedManyWithoutUsersInputSchema).optional(),
  permissions: z.lazy(() => PermissionCreateNestedManyWithoutUsersInputSchema).optional(),
  likedPosts: z.lazy(() => PostCreateNestedManyWithoutLikedUsersInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutCommentsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutCommentsInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string(),
  provider: z.string(),
  activated: z.boolean().optional(),
  avatar: z.string().optional().nullable(),
  LikeCommentIDs: z.union([ z.lazy(() => UserCreateLikeCommentIDsInputSchema),z.string().array() ]).optional(),
  roleIDs: z.union([ z.lazy(() => UserCreateroleIDsInputSchema),z.string().array() ]).optional(),
  permissionIDs: z.union([ z.lazy(() => UserCreatepermissionIDsInputSchema),z.string().array() ]).optional(),
  likedPostIDs: z.union([ z.lazy(() => UserCreatelikedPostIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  LikeComments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutLikesInputSchema).optional(),
  roles: z.lazy(() => RoleUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  permissions: z.lazy(() => PermissionUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  likedPosts: z.lazy(() => PostUncheckedCreateNestedManyWithoutLikedUsersInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutCommentsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCommentsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema) ]),
}).strict();

export const UserCreateWithoutLikeCommentsInputSchema: z.ZodType<Prisma.UserCreateWithoutLikeCommentsInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string(),
  provider: z.string(),
  activated: z.boolean().optional(),
  avatar: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostCreateNestedManyWithoutAuthorInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutOwnerInputSchema).optional(),
  roles: z.lazy(() => RoleCreateNestedManyWithoutUsersInputSchema).optional(),
  permissions: z.lazy(() => PermissionCreateNestedManyWithoutUsersInputSchema).optional(),
  likedPosts: z.lazy(() => PostCreateNestedManyWithoutLikedUsersInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutLikeCommentsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutLikeCommentsInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string(),
  provider: z.string(),
  activated: z.boolean().optional(),
  avatar: z.string().optional().nullable(),
  LikeCommentIDs: z.union([ z.lazy(() => UserCreateLikeCommentIDsInputSchema),z.string().array() ]).optional(),
  roleIDs: z.union([ z.lazy(() => UserCreateroleIDsInputSchema),z.string().array() ]).optional(),
  permissionIDs: z.union([ z.lazy(() => UserCreatepermissionIDsInputSchema),z.string().array() ]).optional(),
  likedPostIDs: z.union([ z.lazy(() => UserCreatelikedPostIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  roles: z.lazy(() => RoleUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  permissions: z.lazy(() => PermissionUncheckedCreateNestedManyWithoutUsersInputSchema).optional(),
  likedPosts: z.lazy(() => PostUncheckedCreateNestedManyWithoutLikedUsersInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutLikeCommentsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutLikeCommentsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutLikeCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutLikeCommentsInputSchema) ]),
}).strict();

export const CommentCreateWithoutRepliesInputSchema: z.ZodType<Prisma.CommentCreateWithoutRepliesInput> = z.object({
  id: z.string().optional(),
  content: z.string(),
  chiefComment: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  belongsTo: z.lazy(() => PostCreateNestedOneWithoutCommentsInputSchema).optional(),
  owner: z.lazy(() => UserCreateNestedOneWithoutCommentsInputSchema),
  likes: z.lazy(() => UserCreateNestedManyWithoutLikeCommentsInputSchema).optional(),
  replyTo: z.lazy(() => CommentCreateNestedOneWithoutRepliesInputSchema).optional()
}).strict();

export const CommentUncheckedCreateWithoutRepliesInputSchema: z.ZodType<Prisma.CommentUncheckedCreateWithoutRepliesInput> = z.object({
  id: z.string().optional(),
  belongsToId: z.string().optional().nullable(),
  ownerId: z.string(),
  content: z.string(),
  likedByUserIDs: z.union([ z.lazy(() => CommentCreatelikedByUserIDsInputSchema),z.string().array() ]).optional(),
  repliedToID: z.string().optional().nullable(),
  chiefComment: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  likes: z.lazy(() => UserUncheckedCreateNestedManyWithoutLikeCommentsInputSchema).optional()
}).strict();

export const CommentCreateOrConnectWithoutRepliesInputSchema: z.ZodType<Prisma.CommentCreateOrConnectWithoutRepliesInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommentCreateWithoutRepliesInputSchema),z.lazy(() => CommentUncheckedCreateWithoutRepliesInputSchema) ]),
}).strict();

export const CommentCreateWithoutReplyToInputSchema: z.ZodType<Prisma.CommentCreateWithoutReplyToInput> = z.object({
  id: z.string().optional(),
  content: z.string(),
  chiefComment: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  belongsTo: z.lazy(() => PostCreateNestedOneWithoutCommentsInputSchema).optional(),
  owner: z.lazy(() => UserCreateNestedOneWithoutCommentsInputSchema),
  likes: z.lazy(() => UserCreateNestedManyWithoutLikeCommentsInputSchema).optional(),
  replies: z.lazy(() => CommentCreateNestedManyWithoutReplyToInputSchema).optional()
}).strict();

export const CommentUncheckedCreateWithoutReplyToInputSchema: z.ZodType<Prisma.CommentUncheckedCreateWithoutReplyToInput> = z.object({
  id: z.string().optional(),
  belongsToId: z.string().optional().nullable(),
  ownerId: z.string(),
  content: z.string(),
  likedByUserIDs: z.union([ z.lazy(() => CommentCreatelikedByUserIDsInputSchema),z.string().array() ]).optional(),
  chiefComment: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  likes: z.lazy(() => UserUncheckedCreateNestedManyWithoutLikeCommentsInputSchema).optional(),
  replies: z.lazy(() => CommentUncheckedCreateNestedManyWithoutReplyToInputSchema).optional()
}).strict();

export const CommentCreateOrConnectWithoutReplyToInputSchema: z.ZodType<Prisma.CommentCreateOrConnectWithoutReplyToInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommentCreateWithoutReplyToInputSchema),z.lazy(() => CommentUncheckedCreateWithoutReplyToInputSchema) ]),
}).strict();

export const CommentCreateManyReplyToInputEnvelopeSchema: z.ZodType<Prisma.CommentCreateManyReplyToInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CommentCreateManyReplyToInputSchema),z.lazy(() => CommentCreateManyReplyToInputSchema).array() ]),
}).strict();

export const PostUpsertWithoutCommentsInputSchema: z.ZodType<Prisma.PostUpsertWithoutCommentsInput> = z.object({
  update: z.union([ z.lazy(() => PostUpdateWithoutCommentsInputSchema),z.lazy(() => PostUncheckedUpdateWithoutCommentsInputSchema) ]),
  create: z.union([ z.lazy(() => PostCreateWithoutCommentsInputSchema),z.lazy(() => PostUncheckedCreateWithoutCommentsInputSchema) ]),
  where: z.lazy(() => PostWhereInputSchema).optional()
}).strict();

export const PostUpdateToOneWithWhereWithoutCommentsInputSchema: z.ZodType<Prisma.PostUpdateToOneWithWhereWithoutCommentsInput> = z.object({
  where: z.lazy(() => PostWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PostUpdateWithoutCommentsInputSchema),z.lazy(() => PostUncheckedUpdateWithoutCommentsInputSchema) ]),
}).strict();

export const PostUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.PostUpdateWithoutCommentsInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => PostUpdatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  thumbnail: z.lazy(() => MediaEntityUpdateOneWithoutPostNestedInputSchema).optional(),
  author: z.lazy(() => UserUpdateOneWithoutPostsNestedInputSchema).optional(),
  likedUsers: z.lazy(() => UserUpdateManyWithoutLikedPostsNestedInputSchema).optional(),
  translations: z.lazy(() => TranslationUpdateManyWithoutPostNestedInputSchema).optional()
}).strict();

export const PostUncheckedUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.PostUncheckedUpdateWithoutCommentsInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => PostUpdatetagsInputSchema),z.string().array() ]).optional(),
  thumbnailId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  authorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  likedByUserIDs: z.union([ z.lazy(() => PostUpdatelikedByUserIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  likedUsers: z.lazy(() => UserUncheckedUpdateManyWithoutLikedPostsNestedInputSchema).optional(),
  translations: z.lazy(() => TranslationUncheckedUpdateManyWithoutPostNestedInputSchema).optional()
}).strict();

export const UserUpsertWithoutCommentsInputSchema: z.ZodType<Prisma.UserUpsertWithoutCommentsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCommentsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutCommentsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCommentsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCommentsInputSchema) ]),
}).strict();

export const UserUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.UserUpdateWithoutCommentsInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUpdateManyWithoutAuthorNestedInputSchema).optional(),
  LikeComments: z.lazy(() => CommentUpdateManyWithoutLikesNestedInputSchema).optional(),
  roles: z.lazy(() => RoleUpdateManyWithoutUsersNestedInputSchema).optional(),
  permissions: z.lazy(() => PermissionUpdateManyWithoutUsersNestedInputSchema).optional(),
  likedPosts: z.lazy(() => PostUpdateManyWithoutLikedUsersNestedInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutCommentsInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  LikeCommentIDs: z.union([ z.lazy(() => UserUpdateLikeCommentIDsInputSchema),z.string().array() ]).optional(),
  roleIDs: z.union([ z.lazy(() => UserUpdateroleIDsInputSchema),z.string().array() ]).optional(),
  permissionIDs: z.union([ z.lazy(() => UserUpdatepermissionIDsInputSchema),z.string().array() ]).optional(),
  likedPostIDs: z.union([ z.lazy(() => UserUpdatelikedPostIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  LikeComments: z.lazy(() => CommentUncheckedUpdateManyWithoutLikesNestedInputSchema).optional(),
  roles: z.lazy(() => RoleUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  permissions: z.lazy(() => PermissionUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  likedPosts: z.lazy(() => PostUncheckedUpdateManyWithoutLikedUsersNestedInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUpsertWithWhereUniqueWithoutLikeCommentsInputSchema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutLikeCommentsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserUpdateWithoutLikeCommentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutLikeCommentsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutLikeCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutLikeCommentsInputSchema) ]),
}).strict();

export const UserUpdateWithWhereUniqueWithoutLikeCommentsInputSchema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutLikeCommentsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserUpdateWithoutLikeCommentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutLikeCommentsInputSchema) ]),
}).strict();

export const UserUpdateManyWithWhereWithoutLikeCommentsInputSchema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutLikeCommentsInput> = z.object({
  where: z.lazy(() => UserScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserUpdateManyMutationInputSchema),z.lazy(() => UserUncheckedUpdateManyWithoutLikeCommentsInputSchema) ]),
}).strict();

export const CommentUpsertWithoutRepliesInputSchema: z.ZodType<Prisma.CommentUpsertWithoutRepliesInput> = z.object({
  update: z.union([ z.lazy(() => CommentUpdateWithoutRepliesInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutRepliesInputSchema) ]),
  create: z.union([ z.lazy(() => CommentCreateWithoutRepliesInputSchema),z.lazy(() => CommentUncheckedCreateWithoutRepliesInputSchema) ]),
  where: z.lazy(() => CommentWhereInputSchema).optional()
}).strict();

export const CommentUpdateToOneWithWhereWithoutRepliesInputSchema: z.ZodType<Prisma.CommentUpdateToOneWithWhereWithoutRepliesInput> = z.object({
  where: z.lazy(() => CommentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CommentUpdateWithoutRepliesInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutRepliesInputSchema) ]),
}).strict();

export const CommentUpdateWithoutRepliesInputSchema: z.ZodType<Prisma.CommentUpdateWithoutRepliesInput> = z.object({
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  chiefComment: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  belongsTo: z.lazy(() => PostUpdateOneWithoutCommentsNestedInputSchema).optional(),
  owner: z.lazy(() => UserUpdateOneRequiredWithoutCommentsNestedInputSchema).optional(),
  likes: z.lazy(() => UserUpdateManyWithoutLikeCommentsNestedInputSchema).optional(),
  replyTo: z.lazy(() => CommentUpdateOneWithoutRepliesNestedInputSchema).optional()
}).strict();

export const CommentUncheckedUpdateWithoutRepliesInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateWithoutRepliesInput> = z.object({
  belongsToId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  likedByUserIDs: z.union([ z.lazy(() => CommentUpdatelikedByUserIDsInputSchema),z.string().array() ]).optional(),
  repliedToID: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chiefComment: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  likes: z.lazy(() => UserUncheckedUpdateManyWithoutLikeCommentsNestedInputSchema).optional()
}).strict();

export const CommentUpsertWithWhereUniqueWithoutReplyToInputSchema: z.ZodType<Prisma.CommentUpsertWithWhereUniqueWithoutReplyToInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CommentUpdateWithoutReplyToInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutReplyToInputSchema) ]),
  create: z.union([ z.lazy(() => CommentCreateWithoutReplyToInputSchema),z.lazy(() => CommentUncheckedCreateWithoutReplyToInputSchema) ]),
}).strict();

export const CommentUpdateWithWhereUniqueWithoutReplyToInputSchema: z.ZodType<Prisma.CommentUpdateWithWhereUniqueWithoutReplyToInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateWithoutReplyToInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutReplyToInputSchema) ]),
}).strict();

export const CommentUpdateManyWithWhereWithoutReplyToInputSchema: z.ZodType<Prisma.CommentUpdateManyWithWhereWithoutReplyToInput> = z.object({
  where: z.lazy(() => CommentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CommentUpdateManyMutationInputSchema),z.lazy(() => CommentUncheckedUpdateManyWithoutReplyToInputSchema) ]),
}).strict();

export const PostCreateManyAuthorInputSchema: z.ZodType<Prisma.PostCreateManyAuthorInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string().optional().nullable(),
  meta: z.string(),
  tags: z.union([ z.lazy(() => PostCreatetagsInputSchema),z.string().array() ]).optional(),
  thumbnailId: z.string().optional().nullable(),
  likedByUserIDs: z.union([ z.lazy(() => PostCreatelikedByUserIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const CommentCreateManyOwnerInputSchema: z.ZodType<Prisma.CommentCreateManyOwnerInput> = z.object({
  id: z.string().optional(),
  belongsToId: z.string().optional().nullable(),
  content: z.string(),
  likedByUserIDs: z.union([ z.lazy(() => CommentCreatelikedByUserIDsInputSchema),z.string().array() ]).optional(),
  repliedToID: z.string().optional().nullable(),
  chiefComment: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const AccessTokenCreateManyUserInputSchema: z.ZodType<Prisma.AccessTokenCreateManyUserInput> = z.object({
  id: z.string().optional(),
  value: z.string(),
  expired_at: z.coerce.date(),
  createdAt: z.coerce.date().optional()
}).strict();

export const PostUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.PostUpdateWithoutAuthorInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => PostUpdatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  thumbnail: z.lazy(() => MediaEntityUpdateOneWithoutPostNestedInputSchema).optional(),
  likedUsers: z.lazy(() => UserUpdateManyWithoutLikedPostsNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutBelongsToNestedInputSchema).optional(),
  translations: z.lazy(() => TranslationUpdateManyWithoutPostNestedInputSchema).optional()
}).strict();

export const PostUncheckedUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.PostUncheckedUpdateWithoutAuthorInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => PostUpdatetagsInputSchema),z.string().array() ]).optional(),
  thumbnailId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  likedByUserIDs: z.union([ z.lazy(() => PostUpdatelikedByUserIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  likedUsers: z.lazy(() => UserUncheckedUpdateManyWithoutLikedPostsNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutBelongsToNestedInputSchema).optional(),
  translations: z.lazy(() => TranslationUncheckedUpdateManyWithoutPostNestedInputSchema).optional()
}).strict();

export const PostUncheckedUpdateManyWithoutAuthorInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyWithoutAuthorInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => PostUpdatetagsInputSchema),z.string().array() ]).optional(),
  thumbnailId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  likedByUserIDs: z.union([ z.lazy(() => PostUpdatelikedByUserIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentUpdateWithoutOwnerInputSchema: z.ZodType<Prisma.CommentUpdateWithoutOwnerInput> = z.object({
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  chiefComment: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  belongsTo: z.lazy(() => PostUpdateOneWithoutCommentsNestedInputSchema).optional(),
  likes: z.lazy(() => UserUpdateManyWithoutLikeCommentsNestedInputSchema).optional(),
  replyTo: z.lazy(() => CommentUpdateOneWithoutRepliesNestedInputSchema).optional(),
  replies: z.lazy(() => CommentUpdateManyWithoutReplyToNestedInputSchema).optional()
}).strict();

export const CommentUncheckedUpdateWithoutOwnerInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateWithoutOwnerInput> = z.object({
  belongsToId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  likedByUserIDs: z.union([ z.lazy(() => CommentUpdatelikedByUserIDsInputSchema),z.string().array() ]).optional(),
  repliedToID: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chiefComment: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  likes: z.lazy(() => UserUncheckedUpdateManyWithoutLikeCommentsNestedInputSchema).optional(),
  replies: z.lazy(() => CommentUncheckedUpdateManyWithoutReplyToNestedInputSchema).optional()
}).strict();

export const CommentUncheckedUpdateManyWithoutOwnerInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutOwnerInput> = z.object({
  belongsToId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  likedByUserIDs: z.union([ z.lazy(() => CommentUpdatelikedByUserIDsInputSchema),z.string().array() ]).optional(),
  repliedToID: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chiefComment: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentUpdateWithoutLikesInputSchema: z.ZodType<Prisma.CommentUpdateWithoutLikesInput> = z.object({
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  chiefComment: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  belongsTo: z.lazy(() => PostUpdateOneWithoutCommentsNestedInputSchema).optional(),
  owner: z.lazy(() => UserUpdateOneRequiredWithoutCommentsNestedInputSchema).optional(),
  replyTo: z.lazy(() => CommentUpdateOneWithoutRepliesNestedInputSchema).optional(),
  replies: z.lazy(() => CommentUpdateManyWithoutReplyToNestedInputSchema).optional()
}).strict();

export const CommentUncheckedUpdateWithoutLikesInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateWithoutLikesInput> = z.object({
  belongsToId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  likedByUserIDs: z.union([ z.lazy(() => CommentUpdatelikedByUserIDsInputSchema),z.string().array() ]).optional(),
  repliedToID: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chiefComment: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  replies: z.lazy(() => CommentUncheckedUpdateManyWithoutReplyToNestedInputSchema).optional()
}).strict();

export const CommentUncheckedUpdateManyWithoutLikesInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutLikesInput> = z.object({
  belongsToId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  likedByUserIDs: z.union([ z.lazy(() => CommentUpdatelikedByUserIDsInputSchema),z.string().array() ]).optional(),
  repliedToID: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chiefComment: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RoleUpdateWithoutUsersInputSchema: z.ZodType<Prisma.RoleUpdateWithoutUsersInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  systemic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  permissions: z.lazy(() => PermissionUpdateManyWithoutRolesNestedInputSchema).optional()
}).strict();

export const RoleUncheckedUpdateWithoutUsersInputSchema: z.ZodType<Prisma.RoleUncheckedUpdateWithoutUsersInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  systemic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  permissionIDs: z.union([ z.lazy(() => RoleUpdatepermissionIDsInputSchema),z.string().array() ]).optional(),
  userIDs: z.union([ z.lazy(() => RoleUpdateuserIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  permissions: z.lazy(() => PermissionUncheckedUpdateManyWithoutRolesNestedInputSchema).optional()
}).strict();

export const RoleUncheckedUpdateManyWithoutUsersInputSchema: z.ZodType<Prisma.RoleUncheckedUpdateManyWithoutUsersInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  systemic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  permissionIDs: z.union([ z.lazy(() => RoleUpdatepermissionIDsInputSchema),z.string().array() ]).optional(),
  userIDs: z.union([ z.lazy(() => RoleUpdateuserIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PermissionUpdateWithoutUsersInputSchema: z.ZodType<Prisma.PermissionUpdateWithoutUsersInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rule: z.union([ InputJsonValue,InputJsonValue ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  roles: z.lazy(() => RoleUpdateManyWithoutPermissionsNestedInputSchema).optional()
}).strict();

export const PermissionUncheckedUpdateWithoutUsersInputSchema: z.ZodType<Prisma.PermissionUncheckedUpdateWithoutUsersInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rule: z.union([ InputJsonValue,InputJsonValue ]).optional(),
  roleIDs: z.union([ z.lazy(() => PermissionUpdateroleIDsInputSchema),z.string().array() ]).optional(),
  userIDs: z.union([ z.lazy(() => PermissionUpdateuserIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  roles: z.lazy(() => RoleUncheckedUpdateManyWithoutPermissionsNestedInputSchema).optional()
}).strict();

export const PermissionUncheckedUpdateManyWithoutUsersInputSchema: z.ZodType<Prisma.PermissionUncheckedUpdateManyWithoutUsersInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rule: z.union([ InputJsonValue,InputJsonValue ]).optional(),
  roleIDs: z.union([ z.lazy(() => PermissionUpdateroleIDsInputSchema),z.string().array() ]).optional(),
  userIDs: z.union([ z.lazy(() => PermissionUpdateuserIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PostUpdateWithoutLikedUsersInputSchema: z.ZodType<Prisma.PostUpdateWithoutLikedUsersInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => PostUpdatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  thumbnail: z.lazy(() => MediaEntityUpdateOneWithoutPostNestedInputSchema).optional(),
  author: z.lazy(() => UserUpdateOneWithoutPostsNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutBelongsToNestedInputSchema).optional(),
  translations: z.lazy(() => TranslationUpdateManyWithoutPostNestedInputSchema).optional()
}).strict();

export const PostUncheckedUpdateWithoutLikedUsersInputSchema: z.ZodType<Prisma.PostUncheckedUpdateWithoutLikedUsersInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => PostUpdatetagsInputSchema),z.string().array() ]).optional(),
  thumbnailId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  authorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  likedByUserIDs: z.union([ z.lazy(() => PostUpdatelikedByUserIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutBelongsToNestedInputSchema).optional(),
  translations: z.lazy(() => TranslationUncheckedUpdateManyWithoutPostNestedInputSchema).optional()
}).strict();

export const PostUncheckedUpdateManyWithoutLikedUsersInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyWithoutLikedUsersInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => PostUpdatetagsInputSchema),z.string().array() ]).optional(),
  thumbnailId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  authorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  likedByUserIDs: z.union([ z.lazy(() => PostUpdatelikedByUserIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccessTokenUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccessTokenUpdateWithoutUserInput> = z.object({
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expired_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  refreshToken: z.lazy(() => RefreshTokenUpdateOneWithoutAccessTokenNestedInputSchema).optional()
}).strict();

export const AccessTokenUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccessTokenUncheckedUpdateWithoutUserInput> = z.object({
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expired_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  refreshToken: z.lazy(() => RefreshTokenUncheckedUpdateOneWithoutAccessTokenNestedInputSchema).optional()
}).strict();

export const AccessTokenUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.AccessTokenUncheckedUpdateManyWithoutUserInput> = z.object({
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expired_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PermissionUpdateWithoutRolesInputSchema: z.ZodType<Prisma.PermissionUpdateWithoutRolesInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rule: z.union([ InputJsonValue,InputJsonValue ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUpdateManyWithoutPermissionsNestedInputSchema).optional()
}).strict();

export const PermissionUncheckedUpdateWithoutRolesInputSchema: z.ZodType<Prisma.PermissionUncheckedUpdateWithoutRolesInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rule: z.union([ InputJsonValue,InputJsonValue ]).optional(),
  roleIDs: z.union([ z.lazy(() => PermissionUpdateroleIDsInputSchema),z.string().array() ]).optional(),
  userIDs: z.union([ z.lazy(() => PermissionUpdateuserIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutPermissionsNestedInputSchema).optional()
}).strict();

export const PermissionUncheckedUpdateManyWithoutRolesInputSchema: z.ZodType<Prisma.PermissionUncheckedUpdateManyWithoutRolesInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rule: z.union([ InputJsonValue,InputJsonValue ]).optional(),
  roleIDs: z.union([ z.lazy(() => PermissionUpdateroleIDsInputSchema),z.string().array() ]).optional(),
  userIDs: z.union([ z.lazy(() => PermissionUpdateuserIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUpdateWithoutRolesInputSchema: z.ZodType<Prisma.UserUpdateWithoutRolesInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUpdateManyWithoutAuthorNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutOwnerNestedInputSchema).optional(),
  LikeComments: z.lazy(() => CommentUpdateManyWithoutLikesNestedInputSchema).optional(),
  permissions: z.lazy(() => PermissionUpdateManyWithoutUsersNestedInputSchema).optional(),
  likedPosts: z.lazy(() => PostUpdateManyWithoutLikedUsersNestedInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutRolesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutRolesInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  LikeCommentIDs: z.union([ z.lazy(() => UserUpdateLikeCommentIDsInputSchema),z.string().array() ]).optional(),
  roleIDs: z.union([ z.lazy(() => UserUpdateroleIDsInputSchema),z.string().array() ]).optional(),
  permissionIDs: z.union([ z.lazy(() => UserUpdatepermissionIDsInputSchema),z.string().array() ]).optional(),
  likedPostIDs: z.union([ z.lazy(() => UserUpdatelikedPostIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  LikeComments: z.lazy(() => CommentUncheckedUpdateManyWithoutLikesNestedInputSchema).optional(),
  permissions: z.lazy(() => PermissionUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  likedPosts: z.lazy(() => PostUncheckedUpdateManyWithoutLikedUsersNestedInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateManyWithoutRolesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutRolesInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  LikeCommentIDs: z.union([ z.lazy(() => UserUpdateLikeCommentIDsInputSchema),z.string().array() ]).optional(),
  roleIDs: z.union([ z.lazy(() => UserUpdateroleIDsInputSchema),z.string().array() ]).optional(),
  permissionIDs: z.union([ z.lazy(() => UserUpdatepermissionIDsInputSchema),z.string().array() ]).optional(),
  likedPostIDs: z.union([ z.lazy(() => UserUpdatelikedPostIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RoleUpdateWithoutPermissionsInputSchema: z.ZodType<Prisma.RoleUpdateWithoutPermissionsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  systemic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUpdateManyWithoutRolesNestedInputSchema).optional()
}).strict();

export const RoleUncheckedUpdateWithoutPermissionsInputSchema: z.ZodType<Prisma.RoleUncheckedUpdateWithoutPermissionsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  systemic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  permissionIDs: z.union([ z.lazy(() => RoleUpdatepermissionIDsInputSchema),z.string().array() ]).optional(),
  userIDs: z.union([ z.lazy(() => RoleUpdateuserIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutRolesNestedInputSchema).optional()
}).strict();

export const RoleUncheckedUpdateManyWithoutPermissionsInputSchema: z.ZodType<Prisma.RoleUncheckedUpdateManyWithoutPermissionsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  systemic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  permissionIDs: z.union([ z.lazy(() => RoleUpdatepermissionIDsInputSchema),z.string().array() ]).optional(),
  userIDs: z.union([ z.lazy(() => RoleUpdateuserIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUpdateWithoutPermissionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutPermissionsInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUpdateManyWithoutAuthorNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutOwnerNestedInputSchema).optional(),
  LikeComments: z.lazy(() => CommentUpdateManyWithoutLikesNestedInputSchema).optional(),
  roles: z.lazy(() => RoleUpdateManyWithoutUsersNestedInputSchema).optional(),
  likedPosts: z.lazy(() => PostUpdateManyWithoutLikedUsersNestedInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutPermissionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutPermissionsInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  LikeCommentIDs: z.union([ z.lazy(() => UserUpdateLikeCommentIDsInputSchema),z.string().array() ]).optional(),
  roleIDs: z.union([ z.lazy(() => UserUpdateroleIDsInputSchema),z.string().array() ]).optional(),
  permissionIDs: z.union([ z.lazy(() => UserUpdatepermissionIDsInputSchema),z.string().array() ]).optional(),
  likedPostIDs: z.union([ z.lazy(() => UserUpdatelikedPostIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  LikeComments: z.lazy(() => CommentUncheckedUpdateManyWithoutLikesNestedInputSchema).optional(),
  roles: z.lazy(() => RoleUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  likedPosts: z.lazy(() => PostUncheckedUpdateManyWithoutLikedUsersNestedInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateManyWithoutPermissionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutPermissionsInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  LikeCommentIDs: z.union([ z.lazy(() => UserUpdateLikeCommentIDsInputSchema),z.string().array() ]).optional(),
  roleIDs: z.union([ z.lazy(() => UserUpdateroleIDsInputSchema),z.string().array() ]).optional(),
  permissionIDs: z.union([ z.lazy(() => UserUpdatepermissionIDsInputSchema),z.string().array() ]).optional(),
  likedPostIDs: z.union([ z.lazy(() => UserUpdatelikedPostIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentCreateManyBelongsToInputSchema: z.ZodType<Prisma.CommentCreateManyBelongsToInput> = z.object({
  id: z.string().optional(),
  ownerId: z.string(),
  content: z.string(),
  likedByUserIDs: z.union([ z.lazy(() => CommentCreatelikedByUserIDsInputSchema),z.string().array() ]).optional(),
  repliedToID: z.string().optional().nullable(),
  chiefComment: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TranslationCreateManyPostInputSchema: z.ZodType<Prisma.TranslationCreateManyPostInput> = z.object({
  id: z.string().optional(),
  language: z.string(),
  title: z.string(),
  content: z.string().optional().nullable(),
  meta: z.string()
}).strict();

export const UserUpdateWithoutLikedPostsInputSchema: z.ZodType<Prisma.UserUpdateWithoutLikedPostsInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUpdateManyWithoutAuthorNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutOwnerNestedInputSchema).optional(),
  LikeComments: z.lazy(() => CommentUpdateManyWithoutLikesNestedInputSchema).optional(),
  roles: z.lazy(() => RoleUpdateManyWithoutUsersNestedInputSchema).optional(),
  permissions: z.lazy(() => PermissionUpdateManyWithoutUsersNestedInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutLikedPostsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutLikedPostsInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  LikeCommentIDs: z.union([ z.lazy(() => UserUpdateLikeCommentIDsInputSchema),z.string().array() ]).optional(),
  roleIDs: z.union([ z.lazy(() => UserUpdateroleIDsInputSchema),z.string().array() ]).optional(),
  permissionIDs: z.union([ z.lazy(() => UserUpdatepermissionIDsInputSchema),z.string().array() ]).optional(),
  likedPostIDs: z.union([ z.lazy(() => UserUpdatelikedPostIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  LikeComments: z.lazy(() => CommentUncheckedUpdateManyWithoutLikesNestedInputSchema).optional(),
  roles: z.lazy(() => RoleUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  permissions: z.lazy(() => PermissionUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateManyWithoutLikedPostsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutLikedPostsInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  LikeCommentIDs: z.union([ z.lazy(() => UserUpdateLikeCommentIDsInputSchema),z.string().array() ]).optional(),
  roleIDs: z.union([ z.lazy(() => UserUpdateroleIDsInputSchema),z.string().array() ]).optional(),
  permissionIDs: z.union([ z.lazy(() => UserUpdatepermissionIDsInputSchema),z.string().array() ]).optional(),
  likedPostIDs: z.union([ z.lazy(() => UserUpdatelikedPostIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentUpdateWithoutBelongsToInputSchema: z.ZodType<Prisma.CommentUpdateWithoutBelongsToInput> = z.object({
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  chiefComment: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  owner: z.lazy(() => UserUpdateOneRequiredWithoutCommentsNestedInputSchema).optional(),
  likes: z.lazy(() => UserUpdateManyWithoutLikeCommentsNestedInputSchema).optional(),
  replyTo: z.lazy(() => CommentUpdateOneWithoutRepliesNestedInputSchema).optional(),
  replies: z.lazy(() => CommentUpdateManyWithoutReplyToNestedInputSchema).optional()
}).strict();

export const CommentUncheckedUpdateWithoutBelongsToInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateWithoutBelongsToInput> = z.object({
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  likedByUserIDs: z.union([ z.lazy(() => CommentUpdatelikedByUserIDsInputSchema),z.string().array() ]).optional(),
  repliedToID: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chiefComment: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  likes: z.lazy(() => UserUncheckedUpdateManyWithoutLikeCommentsNestedInputSchema).optional(),
  replies: z.lazy(() => CommentUncheckedUpdateManyWithoutReplyToNestedInputSchema).optional()
}).strict();

export const CommentUncheckedUpdateManyWithoutBelongsToInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutBelongsToInput> = z.object({
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  likedByUserIDs: z.union([ z.lazy(() => CommentUpdatelikedByUserIDsInputSchema),z.string().array() ]).optional(),
  repliedToID: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chiefComment: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TranslationUpdateWithoutPostInputSchema: z.ZodType<Prisma.TranslationUpdateWithoutPostInput> = z.object({
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TranslationUncheckedUpdateWithoutPostInputSchema: z.ZodType<Prisma.TranslationUncheckedUpdateWithoutPostInput> = z.object({
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TranslationUncheckedUpdateManyWithoutPostInputSchema: z.ZodType<Prisma.TranslationUncheckedUpdateManyWithoutPostInput> = z.object({
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PostCreateManyThumbnailInputSchema: z.ZodType<Prisma.PostCreateManyThumbnailInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string().optional().nullable(),
  meta: z.string(),
  tags: z.union([ z.lazy(() => PostCreatetagsInputSchema),z.string().array() ]).optional(),
  authorId: z.string().optional().nullable(),
  likedByUserIDs: z.union([ z.lazy(() => PostCreatelikedByUserIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PostUpdateWithoutThumbnailInputSchema: z.ZodType<Prisma.PostUpdateWithoutThumbnailInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => PostUpdatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.lazy(() => UserUpdateOneWithoutPostsNestedInputSchema).optional(),
  likedUsers: z.lazy(() => UserUpdateManyWithoutLikedPostsNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutBelongsToNestedInputSchema).optional(),
  translations: z.lazy(() => TranslationUpdateManyWithoutPostNestedInputSchema).optional()
}).strict();

export const PostUncheckedUpdateWithoutThumbnailInputSchema: z.ZodType<Prisma.PostUncheckedUpdateWithoutThumbnailInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => PostUpdatetagsInputSchema),z.string().array() ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  likedByUserIDs: z.union([ z.lazy(() => PostUpdatelikedByUserIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  likedUsers: z.lazy(() => UserUncheckedUpdateManyWithoutLikedPostsNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutBelongsToNestedInputSchema).optional(),
  translations: z.lazy(() => TranslationUncheckedUpdateManyWithoutPostNestedInputSchema).optional()
}).strict();

export const PostUncheckedUpdateManyWithoutThumbnailInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyWithoutThumbnailInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => PostUpdatetagsInputSchema),z.string().array() ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  likedByUserIDs: z.union([ z.lazy(() => PostUpdatelikedByUserIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentCreateManyReplyToInputSchema: z.ZodType<Prisma.CommentCreateManyReplyToInput> = z.object({
  id: z.string().optional(),
  belongsToId: z.string().optional().nullable(),
  ownerId: z.string(),
  content: z.string(),
  likedByUserIDs: z.union([ z.lazy(() => CommentCreatelikedByUserIDsInputSchema),z.string().array() ]).optional(),
  chiefComment: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUpdateWithoutLikeCommentsInputSchema: z.ZodType<Prisma.UserUpdateWithoutLikeCommentsInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUpdateManyWithoutAuthorNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutOwnerNestedInputSchema).optional(),
  roles: z.lazy(() => RoleUpdateManyWithoutUsersNestedInputSchema).optional(),
  permissions: z.lazy(() => PermissionUpdateManyWithoutUsersNestedInputSchema).optional(),
  likedPosts: z.lazy(() => PostUpdateManyWithoutLikedUsersNestedInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutLikeCommentsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutLikeCommentsInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  LikeCommentIDs: z.union([ z.lazy(() => UserUpdateLikeCommentIDsInputSchema),z.string().array() ]).optional(),
  roleIDs: z.union([ z.lazy(() => UserUpdateroleIDsInputSchema),z.string().array() ]).optional(),
  permissionIDs: z.union([ z.lazy(() => UserUpdatepermissionIDsInputSchema),z.string().array() ]).optional(),
  likedPostIDs: z.union([ z.lazy(() => UserUpdatelikedPostIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  roles: z.lazy(() => RoleUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  permissions: z.lazy(() => PermissionUncheckedUpdateManyWithoutUsersNestedInputSchema).optional(),
  likedPosts: z.lazy(() => PostUncheckedUpdateManyWithoutLikedUsersNestedInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateManyWithoutLikeCommentsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutLikeCommentsInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  LikeCommentIDs: z.union([ z.lazy(() => UserUpdateLikeCommentIDsInputSchema),z.string().array() ]).optional(),
  roleIDs: z.union([ z.lazy(() => UserUpdateroleIDsInputSchema),z.string().array() ]).optional(),
  permissionIDs: z.union([ z.lazy(() => UserUpdatepermissionIDsInputSchema),z.string().array() ]).optional(),
  likedPostIDs: z.union([ z.lazy(() => UserUpdatelikedPostIDsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentUpdateWithoutReplyToInputSchema: z.ZodType<Prisma.CommentUpdateWithoutReplyToInput> = z.object({
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  chiefComment: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  belongsTo: z.lazy(() => PostUpdateOneWithoutCommentsNestedInputSchema).optional(),
  owner: z.lazy(() => UserUpdateOneRequiredWithoutCommentsNestedInputSchema).optional(),
  likes: z.lazy(() => UserUpdateManyWithoutLikeCommentsNestedInputSchema).optional(),
  replies: z.lazy(() => CommentUpdateManyWithoutReplyToNestedInputSchema).optional()
}).strict();

export const CommentUncheckedUpdateWithoutReplyToInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateWithoutReplyToInput> = z.object({
  belongsToId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  likedByUserIDs: z.union([ z.lazy(() => CommentUpdatelikedByUserIDsInputSchema),z.string().array() ]).optional(),
  chiefComment: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  likes: z.lazy(() => UserUncheckedUpdateManyWithoutLikeCommentsNestedInputSchema).optional(),
  replies: z.lazy(() => CommentUncheckedUpdateManyWithoutReplyToNestedInputSchema).optional()
}).strict();

export const CommentUncheckedUpdateManyWithoutReplyToInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutReplyToInput> = z.object({
  belongsToId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  likedByUserIDs: z.union([ z.lazy(() => CommentUpdatelikedByUserIDsInputSchema),z.string().array() ]).optional(),
  chiefComment: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const RoleFindFirstArgsSchema: z.ZodType<Prisma.RoleFindFirstArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  where: RoleWhereInputSchema.optional(),
  orderBy: z.union([ RoleOrderByWithRelationInputSchema.array(),RoleOrderByWithRelationInputSchema ]).optional(),
  cursor: RoleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RoleScalarFieldEnumSchema,RoleScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const RoleFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RoleFindFirstOrThrowArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  where: RoleWhereInputSchema.optional(),
  orderBy: z.union([ RoleOrderByWithRelationInputSchema.array(),RoleOrderByWithRelationInputSchema ]).optional(),
  cursor: RoleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RoleScalarFieldEnumSchema,RoleScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const RoleFindManyArgsSchema: z.ZodType<Prisma.RoleFindManyArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  where: RoleWhereInputSchema.optional(),
  orderBy: z.union([ RoleOrderByWithRelationInputSchema.array(),RoleOrderByWithRelationInputSchema ]).optional(),
  cursor: RoleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RoleScalarFieldEnumSchema,RoleScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const RoleAggregateArgsSchema: z.ZodType<Prisma.RoleAggregateArgs> = z.object({
  where: RoleWhereInputSchema.optional(),
  orderBy: z.union([ RoleOrderByWithRelationInputSchema.array(),RoleOrderByWithRelationInputSchema ]).optional(),
  cursor: RoleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const RoleGroupByArgsSchema: z.ZodType<Prisma.RoleGroupByArgs> = z.object({
  where: RoleWhereInputSchema.optional(),
  orderBy: z.union([ RoleOrderByWithAggregationInputSchema.array(),RoleOrderByWithAggregationInputSchema ]).optional(),
  by: RoleScalarFieldEnumSchema.array(),
  having: RoleScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const RoleFindUniqueArgsSchema: z.ZodType<Prisma.RoleFindUniqueArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  where: RoleWhereUniqueInputSchema,
}).strict()

export const RoleFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RoleFindUniqueOrThrowArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  where: RoleWhereUniqueInputSchema,
}).strict()

export const PermissionFindFirstArgsSchema: z.ZodType<Prisma.PermissionFindFirstArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  where: PermissionWhereInputSchema.optional(),
  orderBy: z.union([ PermissionOrderByWithRelationInputSchema.array(),PermissionOrderByWithRelationInputSchema ]).optional(),
  cursor: PermissionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PermissionScalarFieldEnumSchema,PermissionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const PermissionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PermissionFindFirstOrThrowArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  where: PermissionWhereInputSchema.optional(),
  orderBy: z.union([ PermissionOrderByWithRelationInputSchema.array(),PermissionOrderByWithRelationInputSchema ]).optional(),
  cursor: PermissionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PermissionScalarFieldEnumSchema,PermissionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const PermissionFindManyArgsSchema: z.ZodType<Prisma.PermissionFindManyArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  where: PermissionWhereInputSchema.optional(),
  orderBy: z.union([ PermissionOrderByWithRelationInputSchema.array(),PermissionOrderByWithRelationInputSchema ]).optional(),
  cursor: PermissionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PermissionScalarFieldEnumSchema,PermissionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const PermissionAggregateArgsSchema: z.ZodType<Prisma.PermissionAggregateArgs> = z.object({
  where: PermissionWhereInputSchema.optional(),
  orderBy: z.union([ PermissionOrderByWithRelationInputSchema.array(),PermissionOrderByWithRelationInputSchema ]).optional(),
  cursor: PermissionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const PermissionGroupByArgsSchema: z.ZodType<Prisma.PermissionGroupByArgs> = z.object({
  where: PermissionWhereInputSchema.optional(),
  orderBy: z.union([ PermissionOrderByWithAggregationInputSchema.array(),PermissionOrderByWithAggregationInputSchema ]).optional(),
  by: PermissionScalarFieldEnumSchema.array(),
  having: PermissionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const PermissionFindUniqueArgsSchema: z.ZodType<Prisma.PermissionFindUniqueArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  where: PermissionWhereUniqueInputSchema,
}).strict()

export const PermissionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PermissionFindUniqueOrThrowArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  where: PermissionWhereUniqueInputSchema,
}).strict()

export const PostFindFirstArgsSchema: z.ZodType<Prisma.PostFindFirstArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([ PostOrderByWithRelationInputSchema.array(),PostOrderByWithRelationInputSchema ]).optional(),
  cursor: PostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PostScalarFieldEnumSchema,PostScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const PostFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PostFindFirstOrThrowArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([ PostOrderByWithRelationInputSchema.array(),PostOrderByWithRelationInputSchema ]).optional(),
  cursor: PostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PostScalarFieldEnumSchema,PostScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const PostFindManyArgsSchema: z.ZodType<Prisma.PostFindManyArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([ PostOrderByWithRelationInputSchema.array(),PostOrderByWithRelationInputSchema ]).optional(),
  cursor: PostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PostScalarFieldEnumSchema,PostScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const PostAggregateArgsSchema: z.ZodType<Prisma.PostAggregateArgs> = z.object({
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([ PostOrderByWithRelationInputSchema.array(),PostOrderByWithRelationInputSchema ]).optional(),
  cursor: PostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const PostGroupByArgsSchema: z.ZodType<Prisma.PostGroupByArgs> = z.object({
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([ PostOrderByWithAggregationInputSchema.array(),PostOrderByWithAggregationInputSchema ]).optional(),
  by: PostScalarFieldEnumSchema.array(),
  having: PostScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const PostFindUniqueArgsSchema: z.ZodType<Prisma.PostFindUniqueArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereUniqueInputSchema,
}).strict()

export const PostFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PostFindUniqueOrThrowArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereUniqueInputSchema,
}).strict()

export const TranslationFindFirstArgsSchema: z.ZodType<Prisma.TranslationFindFirstArgs> = z.object({
  select: TranslationSelectSchema.optional(),
  include: TranslationIncludeSchema.optional(),
  where: TranslationWhereInputSchema.optional(),
  orderBy: z.union([ TranslationOrderByWithRelationInputSchema.array(),TranslationOrderByWithRelationInputSchema ]).optional(),
  cursor: TranslationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TranslationScalarFieldEnumSchema,TranslationScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const TranslationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TranslationFindFirstOrThrowArgs> = z.object({
  select: TranslationSelectSchema.optional(),
  include: TranslationIncludeSchema.optional(),
  where: TranslationWhereInputSchema.optional(),
  orderBy: z.union([ TranslationOrderByWithRelationInputSchema.array(),TranslationOrderByWithRelationInputSchema ]).optional(),
  cursor: TranslationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TranslationScalarFieldEnumSchema,TranslationScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const TranslationFindManyArgsSchema: z.ZodType<Prisma.TranslationFindManyArgs> = z.object({
  select: TranslationSelectSchema.optional(),
  include: TranslationIncludeSchema.optional(),
  where: TranslationWhereInputSchema.optional(),
  orderBy: z.union([ TranslationOrderByWithRelationInputSchema.array(),TranslationOrderByWithRelationInputSchema ]).optional(),
  cursor: TranslationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TranslationScalarFieldEnumSchema,TranslationScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const TranslationAggregateArgsSchema: z.ZodType<Prisma.TranslationAggregateArgs> = z.object({
  where: TranslationWhereInputSchema.optional(),
  orderBy: z.union([ TranslationOrderByWithRelationInputSchema.array(),TranslationOrderByWithRelationInputSchema ]).optional(),
  cursor: TranslationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const TranslationGroupByArgsSchema: z.ZodType<Prisma.TranslationGroupByArgs> = z.object({
  where: TranslationWhereInputSchema.optional(),
  orderBy: z.union([ TranslationOrderByWithAggregationInputSchema.array(),TranslationOrderByWithAggregationInputSchema ]).optional(),
  by: TranslationScalarFieldEnumSchema.array(),
  having: TranslationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const TranslationFindUniqueArgsSchema: z.ZodType<Prisma.TranslationFindUniqueArgs> = z.object({
  select: TranslationSelectSchema.optional(),
  include: TranslationIncludeSchema.optional(),
  where: TranslationWhereUniqueInputSchema,
}).strict()

export const TranslationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TranslationFindUniqueOrThrowArgs> = z.object({
  select: TranslationSelectSchema.optional(),
  include: TranslationIncludeSchema.optional(),
  where: TranslationWhereUniqueInputSchema,
}).strict()

export const MediaEntityFindFirstArgsSchema: z.ZodType<Prisma.MediaEntityFindFirstArgs> = z.object({
  select: MediaEntitySelectSchema.optional(),
  include: MediaEntityIncludeSchema.optional(),
  where: MediaEntityWhereInputSchema.optional(),
  orderBy: z.union([ MediaEntityOrderByWithRelationInputSchema.array(),MediaEntityOrderByWithRelationInputSchema ]).optional(),
  cursor: MediaEntityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MediaEntityScalarFieldEnumSchema,MediaEntityScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const MediaEntityFindFirstOrThrowArgsSchema: z.ZodType<Prisma.MediaEntityFindFirstOrThrowArgs> = z.object({
  select: MediaEntitySelectSchema.optional(),
  include: MediaEntityIncludeSchema.optional(),
  where: MediaEntityWhereInputSchema.optional(),
  orderBy: z.union([ MediaEntityOrderByWithRelationInputSchema.array(),MediaEntityOrderByWithRelationInputSchema ]).optional(),
  cursor: MediaEntityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MediaEntityScalarFieldEnumSchema,MediaEntityScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const MediaEntityFindManyArgsSchema: z.ZodType<Prisma.MediaEntityFindManyArgs> = z.object({
  select: MediaEntitySelectSchema.optional(),
  include: MediaEntityIncludeSchema.optional(),
  where: MediaEntityWhereInputSchema.optional(),
  orderBy: z.union([ MediaEntityOrderByWithRelationInputSchema.array(),MediaEntityOrderByWithRelationInputSchema ]).optional(),
  cursor: MediaEntityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MediaEntityScalarFieldEnumSchema,MediaEntityScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const MediaEntityAggregateArgsSchema: z.ZodType<Prisma.MediaEntityAggregateArgs> = z.object({
  where: MediaEntityWhereInputSchema.optional(),
  orderBy: z.union([ MediaEntityOrderByWithRelationInputSchema.array(),MediaEntityOrderByWithRelationInputSchema ]).optional(),
  cursor: MediaEntityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const MediaEntityGroupByArgsSchema: z.ZodType<Prisma.MediaEntityGroupByArgs> = z.object({
  where: MediaEntityWhereInputSchema.optional(),
  orderBy: z.union([ MediaEntityOrderByWithAggregationInputSchema.array(),MediaEntityOrderByWithAggregationInputSchema ]).optional(),
  by: MediaEntityScalarFieldEnumSchema.array(),
  having: MediaEntityScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const MediaEntityFindUniqueArgsSchema: z.ZodType<Prisma.MediaEntityFindUniqueArgs> = z.object({
  select: MediaEntitySelectSchema.optional(),
  include: MediaEntityIncludeSchema.optional(),
  where: MediaEntityWhereUniqueInputSchema,
}).strict()

export const MediaEntityFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.MediaEntityFindUniqueOrThrowArgs> = z.object({
  select: MediaEntitySelectSchema.optional(),
  include: MediaEntityIncludeSchema.optional(),
  where: MediaEntityWhereUniqueInputSchema,
}).strict()

export const RefreshTokenFindFirstArgsSchema: z.ZodType<Prisma.RefreshTokenFindFirstArgs> = z.object({
  select: RefreshTokenSelectSchema.optional(),
  include: RefreshTokenIncludeSchema.optional(),
  where: RefreshTokenWhereInputSchema.optional(),
  orderBy: z.union([ RefreshTokenOrderByWithRelationInputSchema.array(),RefreshTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: RefreshTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RefreshTokenScalarFieldEnumSchema,RefreshTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const RefreshTokenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RefreshTokenFindFirstOrThrowArgs> = z.object({
  select: RefreshTokenSelectSchema.optional(),
  include: RefreshTokenIncludeSchema.optional(),
  where: RefreshTokenWhereInputSchema.optional(),
  orderBy: z.union([ RefreshTokenOrderByWithRelationInputSchema.array(),RefreshTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: RefreshTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RefreshTokenScalarFieldEnumSchema,RefreshTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const RefreshTokenFindManyArgsSchema: z.ZodType<Prisma.RefreshTokenFindManyArgs> = z.object({
  select: RefreshTokenSelectSchema.optional(),
  include: RefreshTokenIncludeSchema.optional(),
  where: RefreshTokenWhereInputSchema.optional(),
  orderBy: z.union([ RefreshTokenOrderByWithRelationInputSchema.array(),RefreshTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: RefreshTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RefreshTokenScalarFieldEnumSchema,RefreshTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const RefreshTokenAggregateArgsSchema: z.ZodType<Prisma.RefreshTokenAggregateArgs> = z.object({
  where: RefreshTokenWhereInputSchema.optional(),
  orderBy: z.union([ RefreshTokenOrderByWithRelationInputSchema.array(),RefreshTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: RefreshTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const RefreshTokenGroupByArgsSchema: z.ZodType<Prisma.RefreshTokenGroupByArgs> = z.object({
  where: RefreshTokenWhereInputSchema.optional(),
  orderBy: z.union([ RefreshTokenOrderByWithAggregationInputSchema.array(),RefreshTokenOrderByWithAggregationInputSchema ]).optional(),
  by: RefreshTokenScalarFieldEnumSchema.array(),
  having: RefreshTokenScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const RefreshTokenFindUniqueArgsSchema: z.ZodType<Prisma.RefreshTokenFindUniqueArgs> = z.object({
  select: RefreshTokenSelectSchema.optional(),
  include: RefreshTokenIncludeSchema.optional(),
  where: RefreshTokenWhereUniqueInputSchema,
}).strict()

export const RefreshTokenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RefreshTokenFindUniqueOrThrowArgs> = z.object({
  select: RefreshTokenSelectSchema.optional(),
  include: RefreshTokenIncludeSchema.optional(),
  where: RefreshTokenWhereUniqueInputSchema,
}).strict()

export const AccessTokenFindFirstArgsSchema: z.ZodType<Prisma.AccessTokenFindFirstArgs> = z.object({
  select: AccessTokenSelectSchema.optional(),
  include: AccessTokenIncludeSchema.optional(),
  where: AccessTokenWhereInputSchema.optional(),
  orderBy: z.union([ AccessTokenOrderByWithRelationInputSchema.array(),AccessTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: AccessTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccessTokenScalarFieldEnumSchema,AccessTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AccessTokenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccessTokenFindFirstOrThrowArgs> = z.object({
  select: AccessTokenSelectSchema.optional(),
  include: AccessTokenIncludeSchema.optional(),
  where: AccessTokenWhereInputSchema.optional(),
  orderBy: z.union([ AccessTokenOrderByWithRelationInputSchema.array(),AccessTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: AccessTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccessTokenScalarFieldEnumSchema,AccessTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AccessTokenFindManyArgsSchema: z.ZodType<Prisma.AccessTokenFindManyArgs> = z.object({
  select: AccessTokenSelectSchema.optional(),
  include: AccessTokenIncludeSchema.optional(),
  where: AccessTokenWhereInputSchema.optional(),
  orderBy: z.union([ AccessTokenOrderByWithRelationInputSchema.array(),AccessTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: AccessTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccessTokenScalarFieldEnumSchema,AccessTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AccessTokenAggregateArgsSchema: z.ZodType<Prisma.AccessTokenAggregateArgs> = z.object({
  where: AccessTokenWhereInputSchema.optional(),
  orderBy: z.union([ AccessTokenOrderByWithRelationInputSchema.array(),AccessTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: AccessTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AccessTokenGroupByArgsSchema: z.ZodType<Prisma.AccessTokenGroupByArgs> = z.object({
  where: AccessTokenWhereInputSchema.optional(),
  orderBy: z.union([ AccessTokenOrderByWithAggregationInputSchema.array(),AccessTokenOrderByWithAggregationInputSchema ]).optional(),
  by: AccessTokenScalarFieldEnumSchema.array(),
  having: AccessTokenScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AccessTokenFindUniqueArgsSchema: z.ZodType<Prisma.AccessTokenFindUniqueArgs> = z.object({
  select: AccessTokenSelectSchema.optional(),
  include: AccessTokenIncludeSchema.optional(),
  where: AccessTokenWhereUniqueInputSchema,
}).strict()

export const AccessTokenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccessTokenFindUniqueOrThrowArgs> = z.object({
  select: AccessTokenSelectSchema.optional(),
  include: AccessTokenIncludeSchema.optional(),
  where: AccessTokenWhereUniqueInputSchema,
}).strict()

export const CommentFindFirstArgsSchema: z.ZodType<Prisma.CommentFindFirstArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithRelationInputSchema.array(),CommentOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CommentScalarFieldEnumSchema,CommentScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const CommentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CommentFindFirstOrThrowArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithRelationInputSchema.array(),CommentOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CommentScalarFieldEnumSchema,CommentScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const CommentFindManyArgsSchema: z.ZodType<Prisma.CommentFindManyArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithRelationInputSchema.array(),CommentOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CommentScalarFieldEnumSchema,CommentScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const CommentAggregateArgsSchema: z.ZodType<Prisma.CommentAggregateArgs> = z.object({
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithRelationInputSchema.array(),CommentOrderByWithRelationInputSchema ]).optional(),
  cursor: CommentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const CommentGroupByArgsSchema: z.ZodType<Prisma.CommentGroupByArgs> = z.object({
  where: CommentWhereInputSchema.optional(),
  orderBy: z.union([ CommentOrderByWithAggregationInputSchema.array(),CommentOrderByWithAggregationInputSchema ]).optional(),
  by: CommentScalarFieldEnumSchema.array(),
  having: CommentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const CommentFindUniqueArgsSchema: z.ZodType<Prisma.CommentFindUniqueArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereUniqueInputSchema,
}).strict()

export const CommentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CommentFindUniqueOrThrowArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereUniqueInputSchema,
}).strict()

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict()

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict()

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
}).strict()

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict()

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict()

export const RoleCreateArgsSchema: z.ZodType<Prisma.RoleCreateArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  data: z.union([ RoleCreateInputSchema,RoleUncheckedCreateInputSchema ]),
}).strict()

export const RoleUpsertArgsSchema: z.ZodType<Prisma.RoleUpsertArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  where: RoleWhereUniqueInputSchema,
  create: z.union([ RoleCreateInputSchema,RoleUncheckedCreateInputSchema ]),
  update: z.union([ RoleUpdateInputSchema,RoleUncheckedUpdateInputSchema ]),
}).strict()

export const RoleCreateManyArgsSchema: z.ZodType<Prisma.RoleCreateManyArgs> = z.object({
  data: z.union([ RoleCreateManyInputSchema,RoleCreateManyInputSchema.array() ]),
}).strict()

export const RoleDeleteArgsSchema: z.ZodType<Prisma.RoleDeleteArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  where: RoleWhereUniqueInputSchema,
}).strict()

export const RoleUpdateArgsSchema: z.ZodType<Prisma.RoleUpdateArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  data: z.union([ RoleUpdateInputSchema,RoleUncheckedUpdateInputSchema ]),
  where: RoleWhereUniqueInputSchema,
}).strict()

export const RoleUpdateManyArgsSchema: z.ZodType<Prisma.RoleUpdateManyArgs> = z.object({
  data: z.union([ RoleUpdateManyMutationInputSchema,RoleUncheckedUpdateManyInputSchema ]),
  where: RoleWhereInputSchema.optional(),
}).strict()

export const RoleDeleteManyArgsSchema: z.ZodType<Prisma.RoleDeleteManyArgs> = z.object({
  where: RoleWhereInputSchema.optional(),
}).strict()

export const PermissionCreateArgsSchema: z.ZodType<Prisma.PermissionCreateArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  data: z.union([ PermissionCreateInputSchema,PermissionUncheckedCreateInputSchema ]),
}).strict()

export const PermissionUpsertArgsSchema: z.ZodType<Prisma.PermissionUpsertArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  where: PermissionWhereUniqueInputSchema,
  create: z.union([ PermissionCreateInputSchema,PermissionUncheckedCreateInputSchema ]),
  update: z.union([ PermissionUpdateInputSchema,PermissionUncheckedUpdateInputSchema ]),
}).strict()

export const PermissionCreateManyArgsSchema: z.ZodType<Prisma.PermissionCreateManyArgs> = z.object({
  data: z.union([ PermissionCreateManyInputSchema,PermissionCreateManyInputSchema.array() ]),
}).strict()

export const PermissionDeleteArgsSchema: z.ZodType<Prisma.PermissionDeleteArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  where: PermissionWhereUniqueInputSchema,
}).strict()

export const PermissionUpdateArgsSchema: z.ZodType<Prisma.PermissionUpdateArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  data: z.union([ PermissionUpdateInputSchema,PermissionUncheckedUpdateInputSchema ]),
  where: PermissionWhereUniqueInputSchema,
}).strict()

export const PermissionUpdateManyArgsSchema: z.ZodType<Prisma.PermissionUpdateManyArgs> = z.object({
  data: z.union([ PermissionUpdateManyMutationInputSchema,PermissionUncheckedUpdateManyInputSchema ]),
  where: PermissionWhereInputSchema.optional(),
}).strict()

export const PermissionDeleteManyArgsSchema: z.ZodType<Prisma.PermissionDeleteManyArgs> = z.object({
  where: PermissionWhereInputSchema.optional(),
}).strict()

export const PostCreateArgsSchema: z.ZodType<Prisma.PostCreateArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  data: z.union([ PostCreateInputSchema,PostUncheckedCreateInputSchema ]),
}).strict()

export const PostUpsertArgsSchema: z.ZodType<Prisma.PostUpsertArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereUniqueInputSchema,
  create: z.union([ PostCreateInputSchema,PostUncheckedCreateInputSchema ]),
  update: z.union([ PostUpdateInputSchema,PostUncheckedUpdateInputSchema ]),
}).strict()

export const PostCreateManyArgsSchema: z.ZodType<Prisma.PostCreateManyArgs> = z.object({
  data: z.union([ PostCreateManyInputSchema,PostCreateManyInputSchema.array() ]),
}).strict()

export const PostDeleteArgsSchema: z.ZodType<Prisma.PostDeleteArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereUniqueInputSchema,
}).strict()

export const PostUpdateArgsSchema: z.ZodType<Prisma.PostUpdateArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  data: z.union([ PostUpdateInputSchema,PostUncheckedUpdateInputSchema ]),
  where: PostWhereUniqueInputSchema,
}).strict()

export const PostUpdateManyArgsSchema: z.ZodType<Prisma.PostUpdateManyArgs> = z.object({
  data: z.union([ PostUpdateManyMutationInputSchema,PostUncheckedUpdateManyInputSchema ]),
  where: PostWhereInputSchema.optional(),
}).strict()

export const PostDeleteManyArgsSchema: z.ZodType<Prisma.PostDeleteManyArgs> = z.object({
  where: PostWhereInputSchema.optional(),
}).strict()

export const TranslationCreateArgsSchema: z.ZodType<Prisma.TranslationCreateArgs> = z.object({
  select: TranslationSelectSchema.optional(),
  include: TranslationIncludeSchema.optional(),
  data: z.union([ TranslationCreateInputSchema,TranslationUncheckedCreateInputSchema ]),
}).strict()

export const TranslationUpsertArgsSchema: z.ZodType<Prisma.TranslationUpsertArgs> = z.object({
  select: TranslationSelectSchema.optional(),
  include: TranslationIncludeSchema.optional(),
  where: TranslationWhereUniqueInputSchema,
  create: z.union([ TranslationCreateInputSchema,TranslationUncheckedCreateInputSchema ]),
  update: z.union([ TranslationUpdateInputSchema,TranslationUncheckedUpdateInputSchema ]),
}).strict()

export const TranslationCreateManyArgsSchema: z.ZodType<Prisma.TranslationCreateManyArgs> = z.object({
  data: z.union([ TranslationCreateManyInputSchema,TranslationCreateManyInputSchema.array() ]),
}).strict()

export const TranslationDeleteArgsSchema: z.ZodType<Prisma.TranslationDeleteArgs> = z.object({
  select: TranslationSelectSchema.optional(),
  include: TranslationIncludeSchema.optional(),
  where: TranslationWhereUniqueInputSchema,
}).strict()

export const TranslationUpdateArgsSchema: z.ZodType<Prisma.TranslationUpdateArgs> = z.object({
  select: TranslationSelectSchema.optional(),
  include: TranslationIncludeSchema.optional(),
  data: z.union([ TranslationUpdateInputSchema,TranslationUncheckedUpdateInputSchema ]),
  where: TranslationWhereUniqueInputSchema,
}).strict()

export const TranslationUpdateManyArgsSchema: z.ZodType<Prisma.TranslationUpdateManyArgs> = z.object({
  data: z.union([ TranslationUpdateManyMutationInputSchema,TranslationUncheckedUpdateManyInputSchema ]),
  where: TranslationWhereInputSchema.optional(),
}).strict()

export const TranslationDeleteManyArgsSchema: z.ZodType<Prisma.TranslationDeleteManyArgs> = z.object({
  where: TranslationWhereInputSchema.optional(),
}).strict()

export const MediaEntityCreateArgsSchema: z.ZodType<Prisma.MediaEntityCreateArgs> = z.object({
  select: MediaEntitySelectSchema.optional(),
  include: MediaEntityIncludeSchema.optional(),
  data: z.union([ MediaEntityCreateInputSchema,MediaEntityUncheckedCreateInputSchema ]),
}).strict()

export const MediaEntityUpsertArgsSchema: z.ZodType<Prisma.MediaEntityUpsertArgs> = z.object({
  select: MediaEntitySelectSchema.optional(),
  include: MediaEntityIncludeSchema.optional(),
  where: MediaEntityWhereUniqueInputSchema,
  create: z.union([ MediaEntityCreateInputSchema,MediaEntityUncheckedCreateInputSchema ]),
  update: z.union([ MediaEntityUpdateInputSchema,MediaEntityUncheckedUpdateInputSchema ]),
}).strict()

export const MediaEntityCreateManyArgsSchema: z.ZodType<Prisma.MediaEntityCreateManyArgs> = z.object({
  data: z.union([ MediaEntityCreateManyInputSchema,MediaEntityCreateManyInputSchema.array() ]),
}).strict()

export const MediaEntityDeleteArgsSchema: z.ZodType<Prisma.MediaEntityDeleteArgs> = z.object({
  select: MediaEntitySelectSchema.optional(),
  include: MediaEntityIncludeSchema.optional(),
  where: MediaEntityWhereUniqueInputSchema,
}).strict()

export const MediaEntityUpdateArgsSchema: z.ZodType<Prisma.MediaEntityUpdateArgs> = z.object({
  select: MediaEntitySelectSchema.optional(),
  include: MediaEntityIncludeSchema.optional(),
  data: z.union([ MediaEntityUpdateInputSchema,MediaEntityUncheckedUpdateInputSchema ]),
  where: MediaEntityWhereUniqueInputSchema,
}).strict()

export const MediaEntityUpdateManyArgsSchema: z.ZodType<Prisma.MediaEntityUpdateManyArgs> = z.object({
  data: z.union([ MediaEntityUpdateManyMutationInputSchema,MediaEntityUncheckedUpdateManyInputSchema ]),
  where: MediaEntityWhereInputSchema.optional(),
}).strict()

export const MediaEntityDeleteManyArgsSchema: z.ZodType<Prisma.MediaEntityDeleteManyArgs> = z.object({
  where: MediaEntityWhereInputSchema.optional(),
}).strict()

export const RefreshTokenCreateArgsSchema: z.ZodType<Prisma.RefreshTokenCreateArgs> = z.object({
  select: RefreshTokenSelectSchema.optional(),
  include: RefreshTokenIncludeSchema.optional(),
  data: z.union([ RefreshTokenCreateInputSchema,RefreshTokenUncheckedCreateInputSchema ]),
}).strict()

export const RefreshTokenUpsertArgsSchema: z.ZodType<Prisma.RefreshTokenUpsertArgs> = z.object({
  select: RefreshTokenSelectSchema.optional(),
  include: RefreshTokenIncludeSchema.optional(),
  where: RefreshTokenWhereUniqueInputSchema,
  create: z.union([ RefreshTokenCreateInputSchema,RefreshTokenUncheckedCreateInputSchema ]),
  update: z.union([ RefreshTokenUpdateInputSchema,RefreshTokenUncheckedUpdateInputSchema ]),
}).strict()

export const RefreshTokenCreateManyArgsSchema: z.ZodType<Prisma.RefreshTokenCreateManyArgs> = z.object({
  data: z.union([ RefreshTokenCreateManyInputSchema,RefreshTokenCreateManyInputSchema.array() ]),
}).strict()

export const RefreshTokenDeleteArgsSchema: z.ZodType<Prisma.RefreshTokenDeleteArgs> = z.object({
  select: RefreshTokenSelectSchema.optional(),
  include: RefreshTokenIncludeSchema.optional(),
  where: RefreshTokenWhereUniqueInputSchema,
}).strict()

export const RefreshTokenUpdateArgsSchema: z.ZodType<Prisma.RefreshTokenUpdateArgs> = z.object({
  select: RefreshTokenSelectSchema.optional(),
  include: RefreshTokenIncludeSchema.optional(),
  data: z.union([ RefreshTokenUpdateInputSchema,RefreshTokenUncheckedUpdateInputSchema ]),
  where: RefreshTokenWhereUniqueInputSchema,
}).strict()

export const RefreshTokenUpdateManyArgsSchema: z.ZodType<Prisma.RefreshTokenUpdateManyArgs> = z.object({
  data: z.union([ RefreshTokenUpdateManyMutationInputSchema,RefreshTokenUncheckedUpdateManyInputSchema ]),
  where: RefreshTokenWhereInputSchema.optional(),
}).strict()

export const RefreshTokenDeleteManyArgsSchema: z.ZodType<Prisma.RefreshTokenDeleteManyArgs> = z.object({
  where: RefreshTokenWhereInputSchema.optional(),
}).strict()

export const AccessTokenCreateArgsSchema: z.ZodType<Prisma.AccessTokenCreateArgs> = z.object({
  select: AccessTokenSelectSchema.optional(),
  include: AccessTokenIncludeSchema.optional(),
  data: z.union([ AccessTokenCreateInputSchema,AccessTokenUncheckedCreateInputSchema ]),
}).strict()

export const AccessTokenUpsertArgsSchema: z.ZodType<Prisma.AccessTokenUpsertArgs> = z.object({
  select: AccessTokenSelectSchema.optional(),
  include: AccessTokenIncludeSchema.optional(),
  where: AccessTokenWhereUniqueInputSchema,
  create: z.union([ AccessTokenCreateInputSchema,AccessTokenUncheckedCreateInputSchema ]),
  update: z.union([ AccessTokenUpdateInputSchema,AccessTokenUncheckedUpdateInputSchema ]),
}).strict()

export const AccessTokenCreateManyArgsSchema: z.ZodType<Prisma.AccessTokenCreateManyArgs> = z.object({
  data: z.union([ AccessTokenCreateManyInputSchema,AccessTokenCreateManyInputSchema.array() ]),
}).strict()

export const AccessTokenDeleteArgsSchema: z.ZodType<Prisma.AccessTokenDeleteArgs> = z.object({
  select: AccessTokenSelectSchema.optional(),
  include: AccessTokenIncludeSchema.optional(),
  where: AccessTokenWhereUniqueInputSchema,
}).strict()

export const AccessTokenUpdateArgsSchema: z.ZodType<Prisma.AccessTokenUpdateArgs> = z.object({
  select: AccessTokenSelectSchema.optional(),
  include: AccessTokenIncludeSchema.optional(),
  data: z.union([ AccessTokenUpdateInputSchema,AccessTokenUncheckedUpdateInputSchema ]),
  where: AccessTokenWhereUniqueInputSchema,
}).strict()

export const AccessTokenUpdateManyArgsSchema: z.ZodType<Prisma.AccessTokenUpdateManyArgs> = z.object({
  data: z.union([ AccessTokenUpdateManyMutationInputSchema,AccessTokenUncheckedUpdateManyInputSchema ]),
  where: AccessTokenWhereInputSchema.optional(),
}).strict()

export const AccessTokenDeleteManyArgsSchema: z.ZodType<Prisma.AccessTokenDeleteManyArgs> = z.object({
  where: AccessTokenWhereInputSchema.optional(),
}).strict()

export const CommentCreateArgsSchema: z.ZodType<Prisma.CommentCreateArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  data: z.union([ CommentCreateInputSchema,CommentUncheckedCreateInputSchema ]),
}).strict()

export const CommentUpsertArgsSchema: z.ZodType<Prisma.CommentUpsertArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereUniqueInputSchema,
  create: z.union([ CommentCreateInputSchema,CommentUncheckedCreateInputSchema ]),
  update: z.union([ CommentUpdateInputSchema,CommentUncheckedUpdateInputSchema ]),
}).strict()

export const CommentCreateManyArgsSchema: z.ZodType<Prisma.CommentCreateManyArgs> = z.object({
  data: z.union([ CommentCreateManyInputSchema,CommentCreateManyInputSchema.array() ]),
}).strict()

export const CommentDeleteArgsSchema: z.ZodType<Prisma.CommentDeleteArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  where: CommentWhereUniqueInputSchema,
}).strict()

export const CommentUpdateArgsSchema: z.ZodType<Prisma.CommentUpdateArgs> = z.object({
  select: CommentSelectSchema.optional(),
  include: CommentIncludeSchema.optional(),
  data: z.union([ CommentUpdateInputSchema,CommentUncheckedUpdateInputSchema ]),
  where: CommentWhereUniqueInputSchema,
}).strict()

export const CommentUpdateManyArgsSchema: z.ZodType<Prisma.CommentUpdateManyArgs> = z.object({
  data: z.union([ CommentUpdateManyMutationInputSchema,CommentUncheckedUpdateManyInputSchema ]),
  where: CommentWhereInputSchema.optional(),
}).strict()

export const CommentDeleteManyArgsSchema: z.ZodType<Prisma.CommentDeleteManyArgs> = z.object({
  where: CommentWhereInputSchema.optional(),
}).strict()