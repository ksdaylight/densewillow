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

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','name','provider','activated','avatar','createdAt','updatedAt']);

export const UserLikeCommentsScalarFieldEnumSchema = z.enum(['userId','commentId','assignedAt','assignedBy']);

export const UserLikedPostsScalarFieldEnumSchema = z.enum(['userId','postId','assignedAt','assignedBy']);

export const UsersRolesScalarFieldEnumSchema = z.enum(['userId','roleId','assignedAt','assignedBy']);

export const UsersPermissionsScalarFieldEnumSchema = z.enum(['userId','permissionId','assignedAt','assignedBy']);

export const RoleScalarFieldEnumSchema = z.enum(['id','name','label','description','systemic','createdAt','updatedAt']);

export const PermissionScalarFieldEnumSchema = z.enum(['id','name','label','description','rule','createdAt','updatedAt']);

export const RolesPermissionsScalarFieldEnumSchema = z.enum(['roleId','permissionId','assignedAt','assignedBy']);

export const PostScalarFieldEnumSchema = z.enum(['id','title','slug','content','meta','tags','thumbnailId','authorId','createdAt','updatedAt']);

export const TranslationScalarFieldEnumSchema = z.enum(['id','language','title','content','meta','postId']);

export const MediaEntityScalarFieldEnumSchema = z.enum(['id','file','ext','createdAt']);

export const RefreshTokenScalarFieldEnumSchema = z.enum(['id','value','expired_at','createdAt','accessTokenId']);

export const AccessTokenScalarFieldEnumSchema = z.enum(['id','value','expired_at','createdAt','userId']);

export const CommentScalarFieldEnumSchema = z.enum(['id','belongsToId','ownerId','content','repliedToID','chiefComment','createdAt','updatedAt']);

export const ContactMessageScalarFieldEnumSchema = z.enum(['id','name','email','subject','message','createdAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const JsonNullValueInputSchema = z.enum(['JsonNull',]);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const JsonNullValueFilterSchema = z.enum(['DbNull','JsonNull','AnyNull',]);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string(),
  name: z.string(),
  provider: z.string(),
  activated: z.boolean(),
  avatar: z.string().nullable(),
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
  id: z.string().uuid().optional(),
  activated: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type UserOptionalDefaults = z.infer<typeof UserOptionalDefaultsSchema>

// USER RELATION SCHEMA
//------------------------------------------------------

export type UserRelations = {
  posts: PostWithRelations[];
  comments: CommentWithRelations[];
  LikeComments: UserLikeCommentsWithRelations[];
  roles: UsersRolesWithRelations[];
  permissions: UsersPermissionsWithRelations[];
  likedPosts: UserLikedPostsWithRelations[];
  accessTokens: AccessTokenWithRelations[];
};

export type UserWithRelations = z.infer<typeof UserSchema> & UserRelations

export const UserWithRelationsSchema: z.ZodType<UserWithRelations> = UserSchema.merge(z.object({
  posts: z.lazy(() => PostWithRelationsSchema).array(),
  comments: z.lazy(() => CommentWithRelationsSchema).array(),
  LikeComments: z.lazy(() => UserLikeCommentsWithRelationsSchema).array(),
  roles: z.lazy(() => UsersRolesWithRelationsSchema).array(),
  permissions: z.lazy(() => UsersPermissionsWithRelationsSchema).array(),
  likedPosts: z.lazy(() => UserLikedPostsWithRelationsSchema).array(),
  accessTokens: z.lazy(() => AccessTokenWithRelationsSchema).array(),
}))

// USER OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type UserOptionalDefaultsRelations = {
  posts: PostOptionalDefaultsWithRelations[];
  comments: CommentOptionalDefaultsWithRelations[];
  LikeComments: UserLikeCommentsOptionalDefaultsWithRelations[];
  roles: UsersRolesOptionalDefaultsWithRelations[];
  permissions: UsersPermissionsOptionalDefaultsWithRelations[];
  likedPosts: UserLikedPostsOptionalDefaultsWithRelations[];
  accessTokens: AccessTokenOptionalDefaultsWithRelations[];
};

export type UserOptionalDefaultsWithRelations = z.infer<typeof UserOptionalDefaultsSchema> & UserOptionalDefaultsRelations

export const UserOptionalDefaultsWithRelationsSchema: z.ZodType<UserOptionalDefaultsWithRelations> = UserOptionalDefaultsSchema.merge(z.object({
  posts: z.lazy(() => PostOptionalDefaultsWithRelationsSchema).array(),
  comments: z.lazy(() => CommentOptionalDefaultsWithRelationsSchema).array(),
  LikeComments: z.lazy(() => UserLikeCommentsOptionalDefaultsWithRelationsSchema).array(),
  roles: z.lazy(() => UsersRolesOptionalDefaultsWithRelationsSchema).array(),
  permissions: z.lazy(() => UsersPermissionsOptionalDefaultsWithRelationsSchema).array(),
  likedPosts: z.lazy(() => UserLikedPostsOptionalDefaultsWithRelationsSchema).array(),
  accessTokens: z.lazy(() => AccessTokenOptionalDefaultsWithRelationsSchema).array(),
}))

// USER PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type UserPartialRelations = {
  posts?: PostPartialWithRelations[];
  comments?: CommentPartialWithRelations[];
  LikeComments?: UserLikeCommentsPartialWithRelations[];
  roles?: UsersRolesPartialWithRelations[];
  permissions?: UsersPermissionsPartialWithRelations[];
  likedPosts?: UserLikedPostsPartialWithRelations[];
  accessTokens?: AccessTokenPartialWithRelations[];
};

export type UserPartialWithRelations = z.infer<typeof UserPartialSchema> & UserPartialRelations

export const UserPartialWithRelationsSchema: z.ZodType<UserPartialWithRelations> = UserPartialSchema.merge(z.object({
  posts: z.lazy(() => PostPartialWithRelationsSchema).array(),
  comments: z.lazy(() => CommentPartialWithRelationsSchema).array(),
  LikeComments: z.lazy(() => UserLikeCommentsPartialWithRelationsSchema).array(),
  roles: z.lazy(() => UsersRolesPartialWithRelationsSchema).array(),
  permissions: z.lazy(() => UsersPermissionsPartialWithRelationsSchema).array(),
  likedPosts: z.lazy(() => UserLikedPostsPartialWithRelationsSchema).array(),
  accessTokens: z.lazy(() => AccessTokenPartialWithRelationsSchema).array(),
})).partial()

export type UserOptionalDefaultsWithPartialRelations = z.infer<typeof UserOptionalDefaultsSchema> & UserPartialRelations

export const UserOptionalDefaultsWithPartialRelationsSchema: z.ZodType<UserOptionalDefaultsWithPartialRelations> = UserOptionalDefaultsSchema.merge(z.object({
  posts: z.lazy(() => PostPartialWithRelationsSchema).array(),
  comments: z.lazy(() => CommentPartialWithRelationsSchema).array(),
  LikeComments: z.lazy(() => UserLikeCommentsPartialWithRelationsSchema).array(),
  roles: z.lazy(() => UsersRolesPartialWithRelationsSchema).array(),
  permissions: z.lazy(() => UsersPermissionsPartialWithRelationsSchema).array(),
  likedPosts: z.lazy(() => UserLikedPostsPartialWithRelationsSchema).array(),
  accessTokens: z.lazy(() => AccessTokenPartialWithRelationsSchema).array(),
}).partial())

export type UserWithPartialRelations = z.infer<typeof UserSchema> & UserPartialRelations

export const UserWithPartialRelationsSchema: z.ZodType<UserWithPartialRelations> = UserSchema.merge(z.object({
  posts: z.lazy(() => PostPartialWithRelationsSchema).array(),
  comments: z.lazy(() => CommentPartialWithRelationsSchema).array(),
  LikeComments: z.lazy(() => UserLikeCommentsPartialWithRelationsSchema).array(),
  roles: z.lazy(() => UsersRolesPartialWithRelationsSchema).array(),
  permissions: z.lazy(() => UsersPermissionsPartialWithRelationsSchema).array(),
  likedPosts: z.lazy(() => UserLikedPostsPartialWithRelationsSchema).array(),
  accessTokens: z.lazy(() => AccessTokenPartialWithRelationsSchema).array(),
}).partial())

/////////////////////////////////////////
// USER LIKE COMMENTS SCHEMA
/////////////////////////////////////////

export const UserLikeCommentsSchema = z.object({
  userId: z.string(),
  commentId: z.string(),
  assignedAt: z.coerce.date(),
  assignedBy: z.string(),
})

export type UserLikeComments = z.infer<typeof UserLikeCommentsSchema>

/////////////////////////////////////////
// USER LIKE COMMENTS PARTIAL SCHEMA
/////////////////////////////////////////

export const UserLikeCommentsPartialSchema = UserLikeCommentsSchema.partial()

export type UserLikeCommentsPartial = z.infer<typeof UserLikeCommentsPartialSchema>

// USER LIKE COMMENTS OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const UserLikeCommentsOptionalDefaultsSchema = UserLikeCommentsSchema.merge(z.object({
  assignedAt: z.coerce.date().optional(),
}))

export type UserLikeCommentsOptionalDefaults = z.infer<typeof UserLikeCommentsOptionalDefaultsSchema>

// USER LIKE COMMENTS RELATION SCHEMA
//------------------------------------------------------

export type UserLikeCommentsRelations = {
  user: UserWithRelations;
  comment: CommentWithRelations;
};

export type UserLikeCommentsWithRelations = z.infer<typeof UserLikeCommentsSchema> & UserLikeCommentsRelations

export const UserLikeCommentsWithRelationsSchema: z.ZodType<UserLikeCommentsWithRelations> = UserLikeCommentsSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
  comment: z.lazy(() => CommentWithRelationsSchema),
}))

// USER LIKE COMMENTS OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type UserLikeCommentsOptionalDefaultsRelations = {
  user: UserOptionalDefaultsWithRelations;
  comment: CommentOptionalDefaultsWithRelations;
};

export type UserLikeCommentsOptionalDefaultsWithRelations = z.infer<typeof UserLikeCommentsOptionalDefaultsSchema> & UserLikeCommentsOptionalDefaultsRelations

export const UserLikeCommentsOptionalDefaultsWithRelationsSchema: z.ZodType<UserLikeCommentsOptionalDefaultsWithRelations> = UserLikeCommentsOptionalDefaultsSchema.merge(z.object({
  user: z.lazy(() => UserOptionalDefaultsWithRelationsSchema),
  comment: z.lazy(() => CommentOptionalDefaultsWithRelationsSchema),
}))

// USER LIKE COMMENTS PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type UserLikeCommentsPartialRelations = {
  user?: UserPartialWithRelations;
  comment?: CommentPartialWithRelations;
};

export type UserLikeCommentsPartialWithRelations = z.infer<typeof UserLikeCommentsPartialSchema> & UserLikeCommentsPartialRelations

export const UserLikeCommentsPartialWithRelationsSchema: z.ZodType<UserLikeCommentsPartialWithRelations> = UserLikeCommentsPartialSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
  comment: z.lazy(() => CommentPartialWithRelationsSchema),
})).partial()

export type UserLikeCommentsOptionalDefaultsWithPartialRelations = z.infer<typeof UserLikeCommentsOptionalDefaultsSchema> & UserLikeCommentsPartialRelations

export const UserLikeCommentsOptionalDefaultsWithPartialRelationsSchema: z.ZodType<UserLikeCommentsOptionalDefaultsWithPartialRelations> = UserLikeCommentsOptionalDefaultsSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
  comment: z.lazy(() => CommentPartialWithRelationsSchema),
}).partial())

export type UserLikeCommentsWithPartialRelations = z.infer<typeof UserLikeCommentsSchema> & UserLikeCommentsPartialRelations

export const UserLikeCommentsWithPartialRelationsSchema: z.ZodType<UserLikeCommentsWithPartialRelations> = UserLikeCommentsSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
  comment: z.lazy(() => CommentPartialWithRelationsSchema),
}).partial())

/////////////////////////////////////////
// USER LIKED POSTS SCHEMA
/////////////////////////////////////////

export const UserLikedPostsSchema = z.object({
  userId: z.string(),
  postId: z.string(),
  assignedAt: z.coerce.date(),
  assignedBy: z.string(),
})

export type UserLikedPosts = z.infer<typeof UserLikedPostsSchema>

/////////////////////////////////////////
// USER LIKED POSTS PARTIAL SCHEMA
/////////////////////////////////////////

export const UserLikedPostsPartialSchema = UserLikedPostsSchema.partial()

export type UserLikedPostsPartial = z.infer<typeof UserLikedPostsPartialSchema>

// USER LIKED POSTS OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const UserLikedPostsOptionalDefaultsSchema = UserLikedPostsSchema.merge(z.object({
  assignedAt: z.coerce.date().optional(),
}))

export type UserLikedPostsOptionalDefaults = z.infer<typeof UserLikedPostsOptionalDefaultsSchema>

// USER LIKED POSTS RELATION SCHEMA
//------------------------------------------------------

export type UserLikedPostsRelations = {
  user: UserWithRelations;
  post: PostWithRelations;
};

export type UserLikedPostsWithRelations = z.infer<typeof UserLikedPostsSchema> & UserLikedPostsRelations

export const UserLikedPostsWithRelationsSchema: z.ZodType<UserLikedPostsWithRelations> = UserLikedPostsSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
  post: z.lazy(() => PostWithRelationsSchema),
}))

// USER LIKED POSTS OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type UserLikedPostsOptionalDefaultsRelations = {
  user: UserOptionalDefaultsWithRelations;
  post: PostOptionalDefaultsWithRelations;
};

export type UserLikedPostsOptionalDefaultsWithRelations = z.infer<typeof UserLikedPostsOptionalDefaultsSchema> & UserLikedPostsOptionalDefaultsRelations

export const UserLikedPostsOptionalDefaultsWithRelationsSchema: z.ZodType<UserLikedPostsOptionalDefaultsWithRelations> = UserLikedPostsOptionalDefaultsSchema.merge(z.object({
  user: z.lazy(() => UserOptionalDefaultsWithRelationsSchema),
  post: z.lazy(() => PostOptionalDefaultsWithRelationsSchema),
}))

// USER LIKED POSTS PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type UserLikedPostsPartialRelations = {
  user?: UserPartialWithRelations;
  post?: PostPartialWithRelations;
};

export type UserLikedPostsPartialWithRelations = z.infer<typeof UserLikedPostsPartialSchema> & UserLikedPostsPartialRelations

export const UserLikedPostsPartialWithRelationsSchema: z.ZodType<UserLikedPostsPartialWithRelations> = UserLikedPostsPartialSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
  post: z.lazy(() => PostPartialWithRelationsSchema),
})).partial()

export type UserLikedPostsOptionalDefaultsWithPartialRelations = z.infer<typeof UserLikedPostsOptionalDefaultsSchema> & UserLikedPostsPartialRelations

export const UserLikedPostsOptionalDefaultsWithPartialRelationsSchema: z.ZodType<UserLikedPostsOptionalDefaultsWithPartialRelations> = UserLikedPostsOptionalDefaultsSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
  post: z.lazy(() => PostPartialWithRelationsSchema),
}).partial())

export type UserLikedPostsWithPartialRelations = z.infer<typeof UserLikedPostsSchema> & UserLikedPostsPartialRelations

export const UserLikedPostsWithPartialRelationsSchema: z.ZodType<UserLikedPostsWithPartialRelations> = UserLikedPostsSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
  post: z.lazy(() => PostPartialWithRelationsSchema),
}).partial())

/////////////////////////////////////////
// USERS ROLES SCHEMA
/////////////////////////////////////////

export const UsersRolesSchema = z.object({
  userId: z.string(),
  roleId: z.string(),
  assignedAt: z.coerce.date(),
  assignedBy: z.string(),
})

export type UsersRoles = z.infer<typeof UsersRolesSchema>

/////////////////////////////////////////
// USERS ROLES PARTIAL SCHEMA
/////////////////////////////////////////

export const UsersRolesPartialSchema = UsersRolesSchema.partial()

export type UsersRolesPartial = z.infer<typeof UsersRolesPartialSchema>

// USERS ROLES OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const UsersRolesOptionalDefaultsSchema = UsersRolesSchema.merge(z.object({
  assignedAt: z.coerce.date().optional(),
}))

export type UsersRolesOptionalDefaults = z.infer<typeof UsersRolesOptionalDefaultsSchema>

// USERS ROLES RELATION SCHEMA
//------------------------------------------------------

export type UsersRolesRelations = {
  user: UserWithRelations;
  role: RoleWithRelations;
};

export type UsersRolesWithRelations = z.infer<typeof UsersRolesSchema> & UsersRolesRelations

export const UsersRolesWithRelationsSchema: z.ZodType<UsersRolesWithRelations> = UsersRolesSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
  role: z.lazy(() => RoleWithRelationsSchema),
}))

// USERS ROLES OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type UsersRolesOptionalDefaultsRelations = {
  user: UserOptionalDefaultsWithRelations;
  role: RoleOptionalDefaultsWithRelations;
};

export type UsersRolesOptionalDefaultsWithRelations = z.infer<typeof UsersRolesOptionalDefaultsSchema> & UsersRolesOptionalDefaultsRelations

export const UsersRolesOptionalDefaultsWithRelationsSchema: z.ZodType<UsersRolesOptionalDefaultsWithRelations> = UsersRolesOptionalDefaultsSchema.merge(z.object({
  user: z.lazy(() => UserOptionalDefaultsWithRelationsSchema),
  role: z.lazy(() => RoleOptionalDefaultsWithRelationsSchema),
}))

// USERS ROLES PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type UsersRolesPartialRelations = {
  user?: UserPartialWithRelations;
  role?: RolePartialWithRelations;
};

export type UsersRolesPartialWithRelations = z.infer<typeof UsersRolesPartialSchema> & UsersRolesPartialRelations

export const UsersRolesPartialWithRelationsSchema: z.ZodType<UsersRolesPartialWithRelations> = UsersRolesPartialSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
  role: z.lazy(() => RolePartialWithRelationsSchema),
})).partial()

export type UsersRolesOptionalDefaultsWithPartialRelations = z.infer<typeof UsersRolesOptionalDefaultsSchema> & UsersRolesPartialRelations

export const UsersRolesOptionalDefaultsWithPartialRelationsSchema: z.ZodType<UsersRolesOptionalDefaultsWithPartialRelations> = UsersRolesOptionalDefaultsSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
  role: z.lazy(() => RolePartialWithRelationsSchema),
}).partial())

export type UsersRolesWithPartialRelations = z.infer<typeof UsersRolesSchema> & UsersRolesPartialRelations

export const UsersRolesWithPartialRelationsSchema: z.ZodType<UsersRolesWithPartialRelations> = UsersRolesSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
  role: z.lazy(() => RolePartialWithRelationsSchema),
}).partial())

/////////////////////////////////////////
// USERS PERMISSIONS SCHEMA
/////////////////////////////////////////

export const UsersPermissionsSchema = z.object({
  userId: z.string(),
  permissionId: z.string(),
  assignedAt: z.coerce.date(),
  assignedBy: z.string(),
})

export type UsersPermissions = z.infer<typeof UsersPermissionsSchema>

/////////////////////////////////////////
// USERS PERMISSIONS PARTIAL SCHEMA
/////////////////////////////////////////

export const UsersPermissionsPartialSchema = UsersPermissionsSchema.partial()

export type UsersPermissionsPartial = z.infer<typeof UsersPermissionsPartialSchema>

// USERS PERMISSIONS OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const UsersPermissionsOptionalDefaultsSchema = UsersPermissionsSchema.merge(z.object({
  assignedAt: z.coerce.date().optional(),
}))

export type UsersPermissionsOptionalDefaults = z.infer<typeof UsersPermissionsOptionalDefaultsSchema>

// USERS PERMISSIONS RELATION SCHEMA
//------------------------------------------------------

export type UsersPermissionsRelations = {
  user: UserWithRelations;
  permission: PermissionWithRelations;
};

export type UsersPermissionsWithRelations = z.infer<typeof UsersPermissionsSchema> & UsersPermissionsRelations

export const UsersPermissionsWithRelationsSchema: z.ZodType<UsersPermissionsWithRelations> = UsersPermissionsSchema.merge(z.object({
  user: z.lazy(() => UserWithRelationsSchema),
  permission: z.lazy(() => PermissionWithRelationsSchema),
}))

// USERS PERMISSIONS OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type UsersPermissionsOptionalDefaultsRelations = {
  user: UserOptionalDefaultsWithRelations;
  permission: PermissionOptionalDefaultsWithRelations;
};

export type UsersPermissionsOptionalDefaultsWithRelations = z.infer<typeof UsersPermissionsOptionalDefaultsSchema> & UsersPermissionsOptionalDefaultsRelations

export const UsersPermissionsOptionalDefaultsWithRelationsSchema: z.ZodType<UsersPermissionsOptionalDefaultsWithRelations> = UsersPermissionsOptionalDefaultsSchema.merge(z.object({
  user: z.lazy(() => UserOptionalDefaultsWithRelationsSchema),
  permission: z.lazy(() => PermissionOptionalDefaultsWithRelationsSchema),
}))

// USERS PERMISSIONS PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type UsersPermissionsPartialRelations = {
  user?: UserPartialWithRelations;
  permission?: PermissionPartialWithRelations;
};

export type UsersPermissionsPartialWithRelations = z.infer<typeof UsersPermissionsPartialSchema> & UsersPermissionsPartialRelations

export const UsersPermissionsPartialWithRelationsSchema: z.ZodType<UsersPermissionsPartialWithRelations> = UsersPermissionsPartialSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
  permission: z.lazy(() => PermissionPartialWithRelationsSchema),
})).partial()

export type UsersPermissionsOptionalDefaultsWithPartialRelations = z.infer<typeof UsersPermissionsOptionalDefaultsSchema> & UsersPermissionsPartialRelations

export const UsersPermissionsOptionalDefaultsWithPartialRelationsSchema: z.ZodType<UsersPermissionsOptionalDefaultsWithPartialRelations> = UsersPermissionsOptionalDefaultsSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
  permission: z.lazy(() => PermissionPartialWithRelationsSchema),
}).partial())

export type UsersPermissionsWithPartialRelations = z.infer<typeof UsersPermissionsSchema> & UsersPermissionsPartialRelations

export const UsersPermissionsWithPartialRelationsSchema: z.ZodType<UsersPermissionsWithPartialRelations> = UsersPermissionsSchema.merge(z.object({
  user: z.lazy(() => UserPartialWithRelationsSchema),
  permission: z.lazy(() => PermissionPartialWithRelationsSchema),
}).partial())

/////////////////////////////////////////
// ROLE SCHEMA
/////////////////////////////////////////

export const RoleSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  label: z.string().nullable(),
  description: z.string().nullable(),
  systemic: z.boolean(),
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
  id: z.string().uuid().optional(),
  systemic: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type RoleOptionalDefaults = z.infer<typeof RoleOptionalDefaultsSchema>

// ROLE RELATION SCHEMA
//------------------------------------------------------

export type RoleRelations = {
  permissions: RolesPermissionsWithRelations[];
  users: UsersRolesWithRelations[];
};

export type RoleWithRelations = z.infer<typeof RoleSchema> & RoleRelations

export const RoleWithRelationsSchema: z.ZodType<RoleWithRelations> = RoleSchema.merge(z.object({
  permissions: z.lazy(() => RolesPermissionsWithRelationsSchema).array(),
  users: z.lazy(() => UsersRolesWithRelationsSchema).array(),
}))

// ROLE OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type RoleOptionalDefaultsRelations = {
  permissions: RolesPermissionsOptionalDefaultsWithRelations[];
  users: UsersRolesOptionalDefaultsWithRelations[];
};

export type RoleOptionalDefaultsWithRelations = z.infer<typeof RoleOptionalDefaultsSchema> & RoleOptionalDefaultsRelations

export const RoleOptionalDefaultsWithRelationsSchema: z.ZodType<RoleOptionalDefaultsWithRelations> = RoleOptionalDefaultsSchema.merge(z.object({
  permissions: z.lazy(() => RolesPermissionsOptionalDefaultsWithRelationsSchema).array(),
  users: z.lazy(() => UsersRolesOptionalDefaultsWithRelationsSchema).array(),
}))

// ROLE PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type RolePartialRelations = {
  permissions?: RolesPermissionsPartialWithRelations[];
  users?: UsersRolesPartialWithRelations[];
};

export type RolePartialWithRelations = z.infer<typeof RolePartialSchema> & RolePartialRelations

export const RolePartialWithRelationsSchema: z.ZodType<RolePartialWithRelations> = RolePartialSchema.merge(z.object({
  permissions: z.lazy(() => RolesPermissionsPartialWithRelationsSchema).array(),
  users: z.lazy(() => UsersRolesPartialWithRelationsSchema).array(),
})).partial()

export type RoleOptionalDefaultsWithPartialRelations = z.infer<typeof RoleOptionalDefaultsSchema> & RolePartialRelations

export const RoleOptionalDefaultsWithPartialRelationsSchema: z.ZodType<RoleOptionalDefaultsWithPartialRelations> = RoleOptionalDefaultsSchema.merge(z.object({
  permissions: z.lazy(() => RolesPermissionsPartialWithRelationsSchema).array(),
  users: z.lazy(() => UsersRolesPartialWithRelationsSchema).array(),
}).partial())

export type RoleWithPartialRelations = z.infer<typeof RoleSchema> & RolePartialRelations

export const RoleWithPartialRelationsSchema: z.ZodType<RoleWithPartialRelations> = RoleSchema.merge(z.object({
  permissions: z.lazy(() => RolesPermissionsPartialWithRelationsSchema).array(),
  users: z.lazy(() => UsersRolesPartialWithRelationsSchema).array(),
}).partial())

/////////////////////////////////////////
// PERMISSION SCHEMA
/////////////////////////////////////////

export const PermissionSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  label: z.string().nullable(),
  description: z.string().nullable(),
  rule: InputJsonValue,
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
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type PermissionOptionalDefaults = z.infer<typeof PermissionOptionalDefaultsSchema>

// PERMISSION RELATION SCHEMA
//------------------------------------------------------

export type PermissionRelations = {
  roles: RolesPermissionsWithRelations[];
  users: UsersPermissionsWithRelations[];
};

export type PermissionWithRelations = z.infer<typeof PermissionSchema> & PermissionRelations

export const PermissionWithRelationsSchema: z.ZodType<PermissionWithRelations> = PermissionSchema.merge(z.object({
  roles: z.lazy(() => RolesPermissionsWithRelationsSchema).array(),
  users: z.lazy(() => UsersPermissionsWithRelationsSchema).array(),
}))

// PERMISSION OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type PermissionOptionalDefaultsRelations = {
  roles: RolesPermissionsOptionalDefaultsWithRelations[];
  users: UsersPermissionsOptionalDefaultsWithRelations[];
};

export type PermissionOptionalDefaultsWithRelations = z.infer<typeof PermissionOptionalDefaultsSchema> & PermissionOptionalDefaultsRelations

export const PermissionOptionalDefaultsWithRelationsSchema: z.ZodType<PermissionOptionalDefaultsWithRelations> = PermissionOptionalDefaultsSchema.merge(z.object({
  roles: z.lazy(() => RolesPermissionsOptionalDefaultsWithRelationsSchema).array(),
  users: z.lazy(() => UsersPermissionsOptionalDefaultsWithRelationsSchema).array(),
}))

// PERMISSION PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type PermissionPartialRelations = {
  roles?: RolesPermissionsPartialWithRelations[];
  users?: UsersPermissionsPartialWithRelations[];
};

export type PermissionPartialWithRelations = z.infer<typeof PermissionPartialSchema> & PermissionPartialRelations

export const PermissionPartialWithRelationsSchema: z.ZodType<PermissionPartialWithRelations> = PermissionPartialSchema.merge(z.object({
  roles: z.lazy(() => RolesPermissionsPartialWithRelationsSchema).array(),
  users: z.lazy(() => UsersPermissionsPartialWithRelationsSchema).array(),
})).partial()

export type PermissionOptionalDefaultsWithPartialRelations = z.infer<typeof PermissionOptionalDefaultsSchema> & PermissionPartialRelations

export const PermissionOptionalDefaultsWithPartialRelationsSchema: z.ZodType<PermissionOptionalDefaultsWithPartialRelations> = PermissionOptionalDefaultsSchema.merge(z.object({
  roles: z.lazy(() => RolesPermissionsPartialWithRelationsSchema).array(),
  users: z.lazy(() => UsersPermissionsPartialWithRelationsSchema).array(),
}).partial())

export type PermissionWithPartialRelations = z.infer<typeof PermissionSchema> & PermissionPartialRelations

export const PermissionWithPartialRelationsSchema: z.ZodType<PermissionWithPartialRelations> = PermissionSchema.merge(z.object({
  roles: z.lazy(() => RolesPermissionsPartialWithRelationsSchema).array(),
  users: z.lazy(() => UsersPermissionsPartialWithRelationsSchema).array(),
}).partial())

/////////////////////////////////////////
// ROLES PERMISSIONS SCHEMA
/////////////////////////////////////////

export const RolesPermissionsSchema = z.object({
  roleId: z.string(),
  permissionId: z.string(),
  assignedAt: z.coerce.date(),
  assignedBy: z.string(),
})

export type RolesPermissions = z.infer<typeof RolesPermissionsSchema>

/////////////////////////////////////////
// ROLES PERMISSIONS PARTIAL SCHEMA
/////////////////////////////////////////

export const RolesPermissionsPartialSchema = RolesPermissionsSchema.partial()

export type RolesPermissionsPartial = z.infer<typeof RolesPermissionsPartialSchema>

// ROLES PERMISSIONS OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const RolesPermissionsOptionalDefaultsSchema = RolesPermissionsSchema.merge(z.object({
  assignedAt: z.coerce.date().optional(),
}))

export type RolesPermissionsOptionalDefaults = z.infer<typeof RolesPermissionsOptionalDefaultsSchema>

// ROLES PERMISSIONS RELATION SCHEMA
//------------------------------------------------------

export type RolesPermissionsRelations = {
  role: RoleWithRelations;
  permission: PermissionWithRelations;
};

export type RolesPermissionsWithRelations = z.infer<typeof RolesPermissionsSchema> & RolesPermissionsRelations

export const RolesPermissionsWithRelationsSchema: z.ZodType<RolesPermissionsWithRelations> = RolesPermissionsSchema.merge(z.object({
  role: z.lazy(() => RoleWithRelationsSchema),
  permission: z.lazy(() => PermissionWithRelationsSchema),
}))

// ROLES PERMISSIONS OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type RolesPermissionsOptionalDefaultsRelations = {
  role: RoleOptionalDefaultsWithRelations;
  permission: PermissionOptionalDefaultsWithRelations;
};

export type RolesPermissionsOptionalDefaultsWithRelations = z.infer<typeof RolesPermissionsOptionalDefaultsSchema> & RolesPermissionsOptionalDefaultsRelations

export const RolesPermissionsOptionalDefaultsWithRelationsSchema: z.ZodType<RolesPermissionsOptionalDefaultsWithRelations> = RolesPermissionsOptionalDefaultsSchema.merge(z.object({
  role: z.lazy(() => RoleOptionalDefaultsWithRelationsSchema),
  permission: z.lazy(() => PermissionOptionalDefaultsWithRelationsSchema),
}))

// ROLES PERMISSIONS PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type RolesPermissionsPartialRelations = {
  role?: RolePartialWithRelations;
  permission?: PermissionPartialWithRelations;
};

export type RolesPermissionsPartialWithRelations = z.infer<typeof RolesPermissionsPartialSchema> & RolesPermissionsPartialRelations

export const RolesPermissionsPartialWithRelationsSchema: z.ZodType<RolesPermissionsPartialWithRelations> = RolesPermissionsPartialSchema.merge(z.object({
  role: z.lazy(() => RolePartialWithRelationsSchema),
  permission: z.lazy(() => PermissionPartialWithRelationsSchema),
})).partial()

export type RolesPermissionsOptionalDefaultsWithPartialRelations = z.infer<typeof RolesPermissionsOptionalDefaultsSchema> & RolesPermissionsPartialRelations

export const RolesPermissionsOptionalDefaultsWithPartialRelationsSchema: z.ZodType<RolesPermissionsOptionalDefaultsWithPartialRelations> = RolesPermissionsOptionalDefaultsSchema.merge(z.object({
  role: z.lazy(() => RolePartialWithRelationsSchema),
  permission: z.lazy(() => PermissionPartialWithRelationsSchema),
}).partial())

export type RolesPermissionsWithPartialRelations = z.infer<typeof RolesPermissionsSchema> & RolesPermissionsPartialRelations

export const RolesPermissionsWithPartialRelationsSchema: z.ZodType<RolesPermissionsWithPartialRelations> = RolesPermissionsSchema.merge(z.object({
  role: z.lazy(() => RolePartialWithRelationsSchema),
  permission: z.lazy(() => PermissionPartialWithRelationsSchema),
}).partial())

/////////////////////////////////////////
// POST SCHEMA
/////////////////////////////////////////

export const PostSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  slug: z.string(),
  content: z.string().nullable(),
  meta: z.string(),
  tags: z.string().array(),
  thumbnailId: z.string().nullable(),
  authorId: z.string().nullable(),
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
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type PostOptionalDefaults = z.infer<typeof PostOptionalDefaultsSchema>

// POST RELATION SCHEMA
//------------------------------------------------------

export type PostRelations = {
  thumbnail?: MediaEntityWithRelations | null;
  author?: UserWithRelations | null;
  likedUsers: UserLikedPostsWithRelations[];
  comments: CommentWithRelations[];
  translations: TranslationWithRelations[];
};

export type PostWithRelations = z.infer<typeof PostSchema> & PostRelations

export const PostWithRelationsSchema: z.ZodType<PostWithRelations> = PostSchema.merge(z.object({
  thumbnail: z.lazy(() => MediaEntityWithRelationsSchema).nullable(),
  author: z.lazy(() => UserWithRelationsSchema).nullable(),
  likedUsers: z.lazy(() => UserLikedPostsWithRelationsSchema).array(),
  comments: z.lazy(() => CommentWithRelationsSchema).array(),
  translations: z.lazy(() => TranslationWithRelationsSchema).array(),
}))

// POST OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type PostOptionalDefaultsRelations = {
  thumbnail?: MediaEntityOptionalDefaultsWithRelations | null;
  author?: UserOptionalDefaultsWithRelations | null;
  likedUsers: UserLikedPostsOptionalDefaultsWithRelations[];
  comments: CommentOptionalDefaultsWithRelations[];
  translations: TranslationOptionalDefaultsWithRelations[];
};

export type PostOptionalDefaultsWithRelations = z.infer<typeof PostOptionalDefaultsSchema> & PostOptionalDefaultsRelations

export const PostOptionalDefaultsWithRelationsSchema: z.ZodType<PostOptionalDefaultsWithRelations> = PostOptionalDefaultsSchema.merge(z.object({
  thumbnail: z.lazy(() => MediaEntityOptionalDefaultsWithRelationsSchema).nullable(),
  author: z.lazy(() => UserOptionalDefaultsWithRelationsSchema).nullable(),
  likedUsers: z.lazy(() => UserLikedPostsOptionalDefaultsWithRelationsSchema).array(),
  comments: z.lazy(() => CommentOptionalDefaultsWithRelationsSchema).array(),
  translations: z.lazy(() => TranslationOptionalDefaultsWithRelationsSchema).array(),
}))

// POST PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type PostPartialRelations = {
  thumbnail?: MediaEntityPartialWithRelations | null;
  author?: UserPartialWithRelations | null;
  likedUsers?: UserLikedPostsPartialWithRelations[];
  comments?: CommentPartialWithRelations[];
  translations?: TranslationPartialWithRelations[];
};

export type PostPartialWithRelations = z.infer<typeof PostPartialSchema> & PostPartialRelations

export const PostPartialWithRelationsSchema: z.ZodType<PostPartialWithRelations> = PostPartialSchema.merge(z.object({
  thumbnail: z.lazy(() => MediaEntityPartialWithRelationsSchema).nullable(),
  author: z.lazy(() => UserPartialWithRelationsSchema).nullable(),
  likedUsers: z.lazy(() => UserLikedPostsPartialWithRelationsSchema).array(),
  comments: z.lazy(() => CommentPartialWithRelationsSchema).array(),
  translations: z.lazy(() => TranslationPartialWithRelationsSchema).array(),
})).partial()

export type PostOptionalDefaultsWithPartialRelations = z.infer<typeof PostOptionalDefaultsSchema> & PostPartialRelations

export const PostOptionalDefaultsWithPartialRelationsSchema: z.ZodType<PostOptionalDefaultsWithPartialRelations> = PostOptionalDefaultsSchema.merge(z.object({
  thumbnail: z.lazy(() => MediaEntityPartialWithRelationsSchema).nullable(),
  author: z.lazy(() => UserPartialWithRelationsSchema).nullable(),
  likedUsers: z.lazy(() => UserLikedPostsPartialWithRelationsSchema).array(),
  comments: z.lazy(() => CommentPartialWithRelationsSchema).array(),
  translations: z.lazy(() => TranslationPartialWithRelationsSchema).array(),
}).partial())

export type PostWithPartialRelations = z.infer<typeof PostSchema> & PostPartialRelations

export const PostWithPartialRelationsSchema: z.ZodType<PostWithPartialRelations> = PostSchema.merge(z.object({
  thumbnail: z.lazy(() => MediaEntityPartialWithRelationsSchema).nullable(),
  author: z.lazy(() => UserPartialWithRelationsSchema).nullable(),
  likedUsers: z.lazy(() => UserLikedPostsPartialWithRelationsSchema).array(),
  comments: z.lazy(() => CommentPartialWithRelationsSchema).array(),
  translations: z.lazy(() => TranslationPartialWithRelationsSchema).array(),
}).partial())

/////////////////////////////////////////
// TRANSLATION SCHEMA
/////////////////////////////////////////

export const TranslationSchema = z.object({
  id: z.string().uuid(),
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
  id: z.string().uuid().optional(),
}))

export type TranslationOptionalDefaults = z.infer<typeof TranslationOptionalDefaultsSchema>

// TRANSLATION RELATION SCHEMA
//------------------------------------------------------

export type TranslationRelations = {
  post: PostWithRelations;
};

export type TranslationWithRelations = z.infer<typeof TranslationSchema> & TranslationRelations

export const TranslationWithRelationsSchema: z.ZodType<TranslationWithRelations> = TranslationSchema.merge(z.object({
  post: z.lazy(() => PostWithRelationsSchema),
}))

// TRANSLATION OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type TranslationOptionalDefaultsRelations = {
  post: PostOptionalDefaultsWithRelations;
};

export type TranslationOptionalDefaultsWithRelations = z.infer<typeof TranslationOptionalDefaultsSchema> & TranslationOptionalDefaultsRelations

export const TranslationOptionalDefaultsWithRelationsSchema: z.ZodType<TranslationOptionalDefaultsWithRelations> = TranslationOptionalDefaultsSchema.merge(z.object({
  post: z.lazy(() => PostOptionalDefaultsWithRelationsSchema),
}))

// TRANSLATION PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type TranslationPartialRelations = {
  post?: PostPartialWithRelations;
};

export type TranslationPartialWithRelations = z.infer<typeof TranslationPartialSchema> & TranslationPartialRelations

export const TranslationPartialWithRelationsSchema: z.ZodType<TranslationPartialWithRelations> = TranslationPartialSchema.merge(z.object({
  post: z.lazy(() => PostPartialWithRelationsSchema),
})).partial()

export type TranslationOptionalDefaultsWithPartialRelations = z.infer<typeof TranslationOptionalDefaultsSchema> & TranslationPartialRelations

export const TranslationOptionalDefaultsWithPartialRelationsSchema: z.ZodType<TranslationOptionalDefaultsWithPartialRelations> = TranslationOptionalDefaultsSchema.merge(z.object({
  post: z.lazy(() => PostPartialWithRelationsSchema),
}).partial())

export type TranslationWithPartialRelations = z.infer<typeof TranslationSchema> & TranslationPartialRelations

export const TranslationWithPartialRelationsSchema: z.ZodType<TranslationWithPartialRelations> = TranslationSchema.merge(z.object({
  post: z.lazy(() => PostPartialWithRelationsSchema),
}).partial())

/////////////////////////////////////////
// MEDIA ENTITY SCHEMA
/////////////////////////////////////////

export const MediaEntitySchema = z.object({
  id: z.string().uuid(),
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
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
}))

export type MediaEntityOptionalDefaults = z.infer<typeof MediaEntityOptionalDefaultsSchema>

// MEDIA ENTITY RELATION SCHEMA
//------------------------------------------------------

export type MediaEntityRelations = {
  post: PostWithRelations[];
};

export type MediaEntityWithRelations = z.infer<typeof MediaEntitySchema> & MediaEntityRelations

export const MediaEntityWithRelationsSchema: z.ZodType<MediaEntityWithRelations> = MediaEntitySchema.merge(z.object({
  post: z.lazy(() => PostWithRelationsSchema).array(),
}))

// MEDIA ENTITY OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type MediaEntityOptionalDefaultsRelations = {
  post: PostOptionalDefaultsWithRelations[];
};

export type MediaEntityOptionalDefaultsWithRelations = z.infer<typeof MediaEntityOptionalDefaultsSchema> & MediaEntityOptionalDefaultsRelations

export const MediaEntityOptionalDefaultsWithRelationsSchema: z.ZodType<MediaEntityOptionalDefaultsWithRelations> = MediaEntityOptionalDefaultsSchema.merge(z.object({
  post: z.lazy(() => PostOptionalDefaultsWithRelationsSchema).array(),
}))

// MEDIA ENTITY PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type MediaEntityPartialRelations = {
  post?: PostPartialWithRelations[];
};

export type MediaEntityPartialWithRelations = z.infer<typeof MediaEntityPartialSchema> & MediaEntityPartialRelations

export const MediaEntityPartialWithRelationsSchema: z.ZodType<MediaEntityPartialWithRelations> = MediaEntityPartialSchema.merge(z.object({
  post: z.lazy(() => PostPartialWithRelationsSchema).array(),
})).partial()

export type MediaEntityOptionalDefaultsWithPartialRelations = z.infer<typeof MediaEntityOptionalDefaultsSchema> & MediaEntityPartialRelations

export const MediaEntityOptionalDefaultsWithPartialRelationsSchema: z.ZodType<MediaEntityOptionalDefaultsWithPartialRelations> = MediaEntityOptionalDefaultsSchema.merge(z.object({
  post: z.lazy(() => PostPartialWithRelationsSchema).array(),
}).partial())

export type MediaEntityWithPartialRelations = z.infer<typeof MediaEntitySchema> & MediaEntityPartialRelations

export const MediaEntityWithPartialRelationsSchema: z.ZodType<MediaEntityWithPartialRelations> = MediaEntitySchema.merge(z.object({
  post: z.lazy(() => PostPartialWithRelationsSchema).array(),
}).partial())

/////////////////////////////////////////
// REFRESH TOKEN SCHEMA
/////////////////////////////////////////

export const RefreshTokenSchema = z.object({
  id: z.string().uuid(),
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
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
}))

export type RefreshTokenOptionalDefaults = z.infer<typeof RefreshTokenOptionalDefaultsSchema>

// REFRESH TOKEN RELATION SCHEMA
//------------------------------------------------------

export type RefreshTokenRelations = {
  accessToken: AccessTokenWithRelations;
};

export type RefreshTokenWithRelations = z.infer<typeof RefreshTokenSchema> & RefreshTokenRelations

export const RefreshTokenWithRelationsSchema: z.ZodType<RefreshTokenWithRelations> = RefreshTokenSchema.merge(z.object({
  accessToken: z.lazy(() => AccessTokenWithRelationsSchema),
}))

// REFRESH TOKEN OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type RefreshTokenOptionalDefaultsRelations = {
  accessToken: AccessTokenOptionalDefaultsWithRelations;
};

export type RefreshTokenOptionalDefaultsWithRelations = z.infer<typeof RefreshTokenOptionalDefaultsSchema> & RefreshTokenOptionalDefaultsRelations

export const RefreshTokenOptionalDefaultsWithRelationsSchema: z.ZodType<RefreshTokenOptionalDefaultsWithRelations> = RefreshTokenOptionalDefaultsSchema.merge(z.object({
  accessToken: z.lazy(() => AccessTokenOptionalDefaultsWithRelationsSchema),
}))

// REFRESH TOKEN PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type RefreshTokenPartialRelations = {
  accessToken?: AccessTokenPartialWithRelations;
};

export type RefreshTokenPartialWithRelations = z.infer<typeof RefreshTokenPartialSchema> & RefreshTokenPartialRelations

export const RefreshTokenPartialWithRelationsSchema: z.ZodType<RefreshTokenPartialWithRelations> = RefreshTokenPartialSchema.merge(z.object({
  accessToken: z.lazy(() => AccessTokenPartialWithRelationsSchema),
})).partial()

export type RefreshTokenOptionalDefaultsWithPartialRelations = z.infer<typeof RefreshTokenOptionalDefaultsSchema> & RefreshTokenPartialRelations

export const RefreshTokenOptionalDefaultsWithPartialRelationsSchema: z.ZodType<RefreshTokenOptionalDefaultsWithPartialRelations> = RefreshTokenOptionalDefaultsSchema.merge(z.object({
  accessToken: z.lazy(() => AccessTokenPartialWithRelationsSchema),
}).partial())

export type RefreshTokenWithPartialRelations = z.infer<typeof RefreshTokenSchema> & RefreshTokenPartialRelations

export const RefreshTokenWithPartialRelationsSchema: z.ZodType<RefreshTokenWithPartialRelations> = RefreshTokenSchema.merge(z.object({
  accessToken: z.lazy(() => AccessTokenPartialWithRelationsSchema),
}).partial())

/////////////////////////////////////////
// ACCESS TOKEN SCHEMA
/////////////////////////////////////////

export const AccessTokenSchema = z.object({
  id: z.string().uuid(),
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
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
}))

export type AccessTokenOptionalDefaults = z.infer<typeof AccessTokenOptionalDefaultsSchema>

// ACCESS TOKEN RELATION SCHEMA
//------------------------------------------------------

export type AccessTokenRelations = {
  refreshToken?: RefreshTokenWithRelations | null;
  user: UserWithRelations;
};

export type AccessTokenWithRelations = z.infer<typeof AccessTokenSchema> & AccessTokenRelations

export const AccessTokenWithRelationsSchema: z.ZodType<AccessTokenWithRelations> = AccessTokenSchema.merge(z.object({
  refreshToken: z.lazy(() => RefreshTokenWithRelationsSchema).nullable(),
  user: z.lazy(() => UserWithRelationsSchema),
}))

// ACCESS TOKEN OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type AccessTokenOptionalDefaultsRelations = {
  refreshToken?: RefreshTokenOptionalDefaultsWithRelations | null;
  user: UserOptionalDefaultsWithRelations;
};

export type AccessTokenOptionalDefaultsWithRelations = z.infer<typeof AccessTokenOptionalDefaultsSchema> & AccessTokenOptionalDefaultsRelations

export const AccessTokenOptionalDefaultsWithRelationsSchema: z.ZodType<AccessTokenOptionalDefaultsWithRelations> = AccessTokenOptionalDefaultsSchema.merge(z.object({
  refreshToken: z.lazy(() => RefreshTokenOptionalDefaultsWithRelationsSchema).nullable(),
  user: z.lazy(() => UserOptionalDefaultsWithRelationsSchema),
}))

// ACCESS TOKEN PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type AccessTokenPartialRelations = {
  refreshToken?: RefreshTokenPartialWithRelations | null;
  user?: UserPartialWithRelations;
};

export type AccessTokenPartialWithRelations = z.infer<typeof AccessTokenPartialSchema> & AccessTokenPartialRelations

export const AccessTokenPartialWithRelationsSchema: z.ZodType<AccessTokenPartialWithRelations> = AccessTokenPartialSchema.merge(z.object({
  refreshToken: z.lazy(() => RefreshTokenPartialWithRelationsSchema).nullable(),
  user: z.lazy(() => UserPartialWithRelationsSchema),
})).partial()

export type AccessTokenOptionalDefaultsWithPartialRelations = z.infer<typeof AccessTokenOptionalDefaultsSchema> & AccessTokenPartialRelations

export const AccessTokenOptionalDefaultsWithPartialRelationsSchema: z.ZodType<AccessTokenOptionalDefaultsWithPartialRelations> = AccessTokenOptionalDefaultsSchema.merge(z.object({
  refreshToken: z.lazy(() => RefreshTokenPartialWithRelationsSchema).nullable(),
  user: z.lazy(() => UserPartialWithRelationsSchema),
}).partial())

export type AccessTokenWithPartialRelations = z.infer<typeof AccessTokenSchema> & AccessTokenPartialRelations

export const AccessTokenWithPartialRelationsSchema: z.ZodType<AccessTokenWithPartialRelations> = AccessTokenSchema.merge(z.object({
  refreshToken: z.lazy(() => RefreshTokenPartialWithRelationsSchema).nullable(),
  user: z.lazy(() => UserPartialWithRelationsSchema),
}).partial())

/////////////////////////////////////////
// COMMENT SCHEMA
/////////////////////////////////////////

export const CommentSchema = z.object({
  id: z.string().uuid(),
  belongsToId: z.string().nullable(),
  ownerId: z.string(),
  content: z.string(),
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
  id: z.string().uuid().optional(),
  chiefComment: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type CommentOptionalDefaults = z.infer<typeof CommentOptionalDefaultsSchema>

// COMMENT RELATION SCHEMA
//------------------------------------------------------

export type CommentRelations = {
  belongsTo?: PostWithRelations | null;
  owner: UserWithRelations;
  likes: UserLikeCommentsWithRelations[];
  replyTo?: CommentWithRelations | null;
  replies: CommentWithRelations[];
};

export type CommentWithRelations = z.infer<typeof CommentSchema> & CommentRelations

export const CommentWithRelationsSchema: z.ZodType<CommentWithRelations> = CommentSchema.merge(z.object({
  belongsTo: z.lazy(() => PostWithRelationsSchema).nullable(),
  owner: z.lazy(() => UserWithRelationsSchema),
  likes: z.lazy(() => UserLikeCommentsWithRelationsSchema).array(),
  replyTo: z.lazy(() => CommentWithRelationsSchema).nullable(),
  replies: z.lazy(() => CommentWithRelationsSchema).array(),
}))

// COMMENT OPTIONAL DEFAULTS RELATION SCHEMA
//------------------------------------------------------

export type CommentOptionalDefaultsRelations = {
  belongsTo?: PostOptionalDefaultsWithRelations | null;
  owner: UserOptionalDefaultsWithRelations;
  likes: UserLikeCommentsOptionalDefaultsWithRelations[];
  replyTo?: CommentOptionalDefaultsWithRelations | null;
  replies: CommentOptionalDefaultsWithRelations[];
};

export type CommentOptionalDefaultsWithRelations = z.infer<typeof CommentOptionalDefaultsSchema> & CommentOptionalDefaultsRelations

export const CommentOptionalDefaultsWithRelationsSchema: z.ZodType<CommentOptionalDefaultsWithRelations> = CommentOptionalDefaultsSchema.merge(z.object({
  belongsTo: z.lazy(() => PostOptionalDefaultsWithRelationsSchema).nullable(),
  owner: z.lazy(() => UserOptionalDefaultsWithRelationsSchema),
  likes: z.lazy(() => UserLikeCommentsOptionalDefaultsWithRelationsSchema).array(),
  replyTo: z.lazy(() => CommentOptionalDefaultsWithRelationsSchema).nullable(),
  replies: z.lazy(() => CommentOptionalDefaultsWithRelationsSchema).array(),
}))

// COMMENT PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type CommentPartialRelations = {
  belongsTo?: PostPartialWithRelations | null;
  owner?: UserPartialWithRelations;
  likes?: UserLikeCommentsPartialWithRelations[];
  replyTo?: CommentPartialWithRelations | null;
  replies?: CommentPartialWithRelations[];
};

export type CommentPartialWithRelations = z.infer<typeof CommentPartialSchema> & CommentPartialRelations

export const CommentPartialWithRelationsSchema: z.ZodType<CommentPartialWithRelations> = CommentPartialSchema.merge(z.object({
  belongsTo: z.lazy(() => PostPartialWithRelationsSchema).nullable(),
  owner: z.lazy(() => UserPartialWithRelationsSchema),
  likes: z.lazy(() => UserLikeCommentsPartialWithRelationsSchema).array(),
  replyTo: z.lazy(() => CommentPartialWithRelationsSchema).nullable(),
  replies: z.lazy(() => CommentPartialWithRelationsSchema).array(),
})).partial()

export type CommentOptionalDefaultsWithPartialRelations = z.infer<typeof CommentOptionalDefaultsSchema> & CommentPartialRelations

export const CommentOptionalDefaultsWithPartialRelationsSchema: z.ZodType<CommentOptionalDefaultsWithPartialRelations> = CommentOptionalDefaultsSchema.merge(z.object({
  belongsTo: z.lazy(() => PostPartialWithRelationsSchema).nullable(),
  owner: z.lazy(() => UserPartialWithRelationsSchema),
  likes: z.lazy(() => UserLikeCommentsPartialWithRelationsSchema).array(),
  replyTo: z.lazy(() => CommentPartialWithRelationsSchema).nullable(),
  replies: z.lazy(() => CommentPartialWithRelationsSchema).array(),
}).partial())

export type CommentWithPartialRelations = z.infer<typeof CommentSchema> & CommentPartialRelations

export const CommentWithPartialRelationsSchema: z.ZodType<CommentWithPartialRelations> = CommentSchema.merge(z.object({
  belongsTo: z.lazy(() => PostPartialWithRelationsSchema).nullable(),
  owner: z.lazy(() => UserPartialWithRelationsSchema),
  likes: z.lazy(() => UserLikeCommentsPartialWithRelationsSchema).array(),
  replyTo: z.lazy(() => CommentPartialWithRelationsSchema).nullable(),
  replies: z.lazy(() => CommentPartialWithRelationsSchema).array(),
}).partial())

/////////////////////////////////////////
// CONTACT MESSAGE SCHEMA
/////////////////////////////////////////

export const ContactMessageSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string(),
  subject: z.string(),
  message: z.string(),
  createdAt: z.coerce.date(),
})

export type ContactMessage = z.infer<typeof ContactMessageSchema>

/////////////////////////////////////////
// CONTACT MESSAGE PARTIAL SCHEMA
/////////////////////////////////////////

export const ContactMessagePartialSchema = ContactMessageSchema.partial()

export type ContactMessagePartial = z.infer<typeof ContactMessagePartialSchema>

// CONTACT MESSAGE OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const ContactMessageOptionalDefaultsSchema = ContactMessageSchema.merge(z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
}))

export type ContactMessageOptionalDefaults = z.infer<typeof ContactMessageOptionalDefaultsSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  posts: z.union([z.boolean(),z.lazy(() => PostFindManyArgsSchema)]).optional(),
  comments: z.union([z.boolean(),z.lazy(() => CommentFindManyArgsSchema)]).optional(),
  LikeComments: z.union([z.boolean(),z.lazy(() => UserLikeCommentsFindManyArgsSchema)]).optional(),
  roles: z.union([z.boolean(),z.lazy(() => UsersRolesFindManyArgsSchema)]).optional(),
  permissions: z.union([z.boolean(),z.lazy(() => UsersPermissionsFindManyArgsSchema)]).optional(),
  likedPosts: z.union([z.boolean(),z.lazy(() => UserLikedPostsFindManyArgsSchema)]).optional(),
  accessTokens: z.union([z.boolean(),z.lazy(() => AccessTokenFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
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
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  posts: z.union([z.boolean(),z.lazy(() => PostFindManyArgsSchema)]).optional(),
  comments: z.union([z.boolean(),z.lazy(() => CommentFindManyArgsSchema)]).optional(),
  LikeComments: z.union([z.boolean(),z.lazy(() => UserLikeCommentsFindManyArgsSchema)]).optional(),
  roles: z.union([z.boolean(),z.lazy(() => UsersRolesFindManyArgsSchema)]).optional(),
  permissions: z.union([z.boolean(),z.lazy(() => UsersPermissionsFindManyArgsSchema)]).optional(),
  likedPosts: z.union([z.boolean(),z.lazy(() => UserLikedPostsFindManyArgsSchema)]).optional(),
  accessTokens: z.union([z.boolean(),z.lazy(() => AccessTokenFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// USER LIKE COMMENTS
//------------------------------------------------------

export const UserLikeCommentsIncludeSchema: z.ZodType<Prisma.UserLikeCommentsInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  comment: z.union([z.boolean(),z.lazy(() => CommentArgsSchema)]).optional(),
}).strict()

export const UserLikeCommentsArgsSchema: z.ZodType<Prisma.UserLikeCommentsDefaultArgs> = z.object({
  select: z.lazy(() => UserLikeCommentsSelectSchema).optional(),
  include: z.lazy(() => UserLikeCommentsIncludeSchema).optional(),
}).strict();

export const UserLikeCommentsSelectSchema: z.ZodType<Prisma.UserLikeCommentsSelect> = z.object({
  userId: z.boolean().optional(),
  commentId: z.boolean().optional(),
  assignedAt: z.boolean().optional(),
  assignedBy: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  comment: z.union([z.boolean(),z.lazy(() => CommentArgsSchema)]).optional(),
}).strict()

// USER LIKED POSTS
//------------------------------------------------------

export const UserLikedPostsIncludeSchema: z.ZodType<Prisma.UserLikedPostsInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  post: z.union([z.boolean(),z.lazy(() => PostArgsSchema)]).optional(),
}).strict()

export const UserLikedPostsArgsSchema: z.ZodType<Prisma.UserLikedPostsDefaultArgs> = z.object({
  select: z.lazy(() => UserLikedPostsSelectSchema).optional(),
  include: z.lazy(() => UserLikedPostsIncludeSchema).optional(),
}).strict();

export const UserLikedPostsSelectSchema: z.ZodType<Prisma.UserLikedPostsSelect> = z.object({
  userId: z.boolean().optional(),
  postId: z.boolean().optional(),
  assignedAt: z.boolean().optional(),
  assignedBy: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  post: z.union([z.boolean(),z.lazy(() => PostArgsSchema)]).optional(),
}).strict()

// USERS ROLES
//------------------------------------------------------

export const UsersRolesIncludeSchema: z.ZodType<Prisma.UsersRolesInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  role: z.union([z.boolean(),z.lazy(() => RoleArgsSchema)]).optional(),
}).strict()

export const UsersRolesArgsSchema: z.ZodType<Prisma.UsersRolesDefaultArgs> = z.object({
  select: z.lazy(() => UsersRolesSelectSchema).optional(),
  include: z.lazy(() => UsersRolesIncludeSchema).optional(),
}).strict();

export const UsersRolesSelectSchema: z.ZodType<Prisma.UsersRolesSelect> = z.object({
  userId: z.boolean().optional(),
  roleId: z.boolean().optional(),
  assignedAt: z.boolean().optional(),
  assignedBy: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  role: z.union([z.boolean(),z.lazy(() => RoleArgsSchema)]).optional(),
}).strict()

// USERS PERMISSIONS
//------------------------------------------------------

export const UsersPermissionsIncludeSchema: z.ZodType<Prisma.UsersPermissionsInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  permission: z.union([z.boolean(),z.lazy(() => PermissionArgsSchema)]).optional(),
}).strict()

export const UsersPermissionsArgsSchema: z.ZodType<Prisma.UsersPermissionsDefaultArgs> = z.object({
  select: z.lazy(() => UsersPermissionsSelectSchema).optional(),
  include: z.lazy(() => UsersPermissionsIncludeSchema).optional(),
}).strict();

export const UsersPermissionsSelectSchema: z.ZodType<Prisma.UsersPermissionsSelect> = z.object({
  userId: z.boolean().optional(),
  permissionId: z.boolean().optional(),
  assignedAt: z.boolean().optional(),
  assignedBy: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  permission: z.union([z.boolean(),z.lazy(() => PermissionArgsSchema)]).optional(),
}).strict()

// ROLE
//------------------------------------------------------

export const RoleIncludeSchema: z.ZodType<Prisma.RoleInclude> = z.object({
  permissions: z.union([z.boolean(),z.lazy(() => RolesPermissionsFindManyArgsSchema)]).optional(),
  users: z.union([z.boolean(),z.lazy(() => UsersRolesFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RoleCountOutputTypeArgsSchema)]).optional(),
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
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  permissions: z.union([z.boolean(),z.lazy(() => RolesPermissionsFindManyArgsSchema)]).optional(),
  users: z.union([z.boolean(),z.lazy(() => UsersRolesFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RoleCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PERMISSION
//------------------------------------------------------

export const PermissionIncludeSchema: z.ZodType<Prisma.PermissionInclude> = z.object({
  roles: z.union([z.boolean(),z.lazy(() => RolesPermissionsFindManyArgsSchema)]).optional(),
  users: z.union([z.boolean(),z.lazy(() => UsersPermissionsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PermissionCountOutputTypeArgsSchema)]).optional(),
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
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  roles: z.union([z.boolean(),z.lazy(() => RolesPermissionsFindManyArgsSchema)]).optional(),
  users: z.union([z.boolean(),z.lazy(() => UsersPermissionsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PermissionCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ROLES PERMISSIONS
//------------------------------------------------------

export const RolesPermissionsIncludeSchema: z.ZodType<Prisma.RolesPermissionsInclude> = z.object({
  role: z.union([z.boolean(),z.lazy(() => RoleArgsSchema)]).optional(),
  permission: z.union([z.boolean(),z.lazy(() => PermissionArgsSchema)]).optional(),
}).strict()

export const RolesPermissionsArgsSchema: z.ZodType<Prisma.RolesPermissionsDefaultArgs> = z.object({
  select: z.lazy(() => RolesPermissionsSelectSchema).optional(),
  include: z.lazy(() => RolesPermissionsIncludeSchema).optional(),
}).strict();

export const RolesPermissionsSelectSchema: z.ZodType<Prisma.RolesPermissionsSelect> = z.object({
  roleId: z.boolean().optional(),
  permissionId: z.boolean().optional(),
  assignedAt: z.boolean().optional(),
  assignedBy: z.boolean().optional(),
  role: z.union([z.boolean(),z.lazy(() => RoleArgsSchema)]).optional(),
  permission: z.union([z.boolean(),z.lazy(() => PermissionArgsSchema)]).optional(),
}).strict()

// POST
//------------------------------------------------------

export const PostIncludeSchema: z.ZodType<Prisma.PostInclude> = z.object({
  thumbnail: z.union([z.boolean(),z.lazy(() => MediaEntityArgsSchema)]).optional(),
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  likedUsers: z.union([z.boolean(),z.lazy(() => UserLikedPostsFindManyArgsSchema)]).optional(),
  comments: z.union([z.boolean(),z.lazy(() => CommentFindManyArgsSchema)]).optional(),
  translations: z.union([z.boolean(),z.lazy(() => TranslationFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PostCountOutputTypeArgsSchema)]).optional(),
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
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  thumbnail: z.union([z.boolean(),z.lazy(() => MediaEntityArgsSchema)]).optional(),
  author: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  likedUsers: z.union([z.boolean(),z.lazy(() => UserLikedPostsFindManyArgsSchema)]).optional(),
  comments: z.union([z.boolean(),z.lazy(() => CommentFindManyArgsSchema)]).optional(),
  translations: z.union([z.boolean(),z.lazy(() => TranslationFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PostCountOutputTypeArgsSchema)]).optional(),
}).strict()

// TRANSLATION
//------------------------------------------------------

export const TranslationIncludeSchema: z.ZodType<Prisma.TranslationInclude> = z.object({
  post: z.union([z.boolean(),z.lazy(() => PostArgsSchema)]).optional(),
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
  post: z.union([z.boolean(),z.lazy(() => PostFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => MediaEntityCountOutputTypeArgsSchema)]).optional(),
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
  post: z.union([z.boolean(),z.lazy(() => PostFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => MediaEntityCountOutputTypeArgsSchema)]).optional(),
}).strict()

// REFRESH TOKEN
//------------------------------------------------------

export const RefreshTokenIncludeSchema: z.ZodType<Prisma.RefreshTokenInclude> = z.object({
  accessToken: z.union([z.boolean(),z.lazy(() => AccessTokenArgsSchema)]).optional(),
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
  refreshToken: z.union([z.boolean(),z.lazy(() => RefreshTokenArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
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
  belongsTo: z.union([z.boolean(),z.lazy(() => PostArgsSchema)]).optional(),
  owner: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  likes: z.union([z.boolean(),z.lazy(() => UserLikeCommentsFindManyArgsSchema)]).optional(),
  replyTo: z.union([z.boolean(),z.lazy(() => CommentArgsSchema)]).optional(),
  replies: z.union([z.boolean(),z.lazy(() => CommentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CommentCountOutputTypeArgsSchema)]).optional(),
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
  repliedToID: z.boolean().optional(),
  chiefComment: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  belongsTo: z.union([z.boolean(),z.lazy(() => PostArgsSchema)]).optional(),
  owner: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  likes: z.union([z.boolean(),z.lazy(() => UserLikeCommentsFindManyArgsSchema)]).optional(),
  replyTo: z.union([z.boolean(),z.lazy(() => CommentArgsSchema)]).optional(),
  replies: z.union([z.boolean(),z.lazy(() => CommentFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CommentCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CONTACT MESSAGE
//------------------------------------------------------

export const ContactMessageSelectSchema: z.ZodType<Prisma.ContactMessageSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  subject: z.boolean().optional(),
  message: z.boolean().optional(),
  createdAt: z.boolean().optional(),
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
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  posts: z.lazy(() => PostListRelationFilterSchema).optional(),
  comments: z.lazy(() => CommentListRelationFilterSchema).optional(),
  LikeComments: z.lazy(() => UserLikeCommentsListRelationFilterSchema).optional(),
  roles: z.lazy(() => UsersRolesListRelationFilterSchema).optional(),
  permissions: z.lazy(() => UsersPermissionsListRelationFilterSchema).optional(),
  likedPosts: z.lazy(() => UserLikedPostsListRelationFilterSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  activated: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  posts: z.lazy(() => PostOrderByRelationAggregateInputSchema).optional(),
  comments: z.lazy(() => CommentOrderByRelationAggregateInputSchema).optional(),
  LikeComments: z.lazy(() => UserLikeCommentsOrderByRelationAggregateInputSchema).optional(),
  roles: z.lazy(() => UsersRolesOrderByRelationAggregateInputSchema).optional(),
  permissions: z.lazy(() => UsersPermissionsOrderByRelationAggregateInputSchema).optional(),
  likedPosts: z.lazy(() => UserLikedPostsOrderByRelationAggregateInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    email: z.string()
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  activated: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  avatar: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  posts: z.lazy(() => PostListRelationFilterSchema).optional(),
  comments: z.lazy(() => CommentListRelationFilterSchema).optional(),
  LikeComments: z.lazy(() => UserLikeCommentsListRelationFilterSchema).optional(),
  roles: z.lazy(() => UsersRolesListRelationFilterSchema).optional(),
  permissions: z.lazy(() => UsersPermissionsListRelationFilterSchema).optional(),
  likedPosts: z.lazy(() => UserLikedPostsListRelationFilterSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  activated: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
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
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserLikeCommentsWhereInputSchema: z.ZodType<Prisma.UserLikeCommentsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserLikeCommentsWhereInputSchema),z.lazy(() => UserLikeCommentsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserLikeCommentsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserLikeCommentsWhereInputSchema),z.lazy(() => UserLikeCommentsWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  commentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  assignedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  assignedBy: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  comment: z.union([ z.lazy(() => CommentRelationFilterSchema),z.lazy(() => CommentWhereInputSchema) ]).optional(),
}).strict();

export const UserLikeCommentsOrderByWithRelationInputSchema: z.ZodType<Prisma.UserLikeCommentsOrderByWithRelationInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  commentId: z.lazy(() => SortOrderSchema).optional(),
  assignedAt: z.lazy(() => SortOrderSchema).optional(),
  assignedBy: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  comment: z.lazy(() => CommentOrderByWithRelationInputSchema).optional()
}).strict();

export const UserLikeCommentsWhereUniqueInputSchema: z.ZodType<Prisma.UserLikeCommentsWhereUniqueInput> = z.object({
  userId_commentId: z.lazy(() => UserLikeCommentsUserIdCommentIdCompoundUniqueInputSchema)
})
.and(z.object({
  userId_commentId: z.lazy(() => UserLikeCommentsUserIdCommentIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => UserLikeCommentsWhereInputSchema),z.lazy(() => UserLikeCommentsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserLikeCommentsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserLikeCommentsWhereInputSchema),z.lazy(() => UserLikeCommentsWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  commentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  assignedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  assignedBy: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  comment: z.union([ z.lazy(() => CommentRelationFilterSchema),z.lazy(() => CommentWhereInputSchema) ]).optional(),
}).strict());

export const UserLikeCommentsOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserLikeCommentsOrderByWithAggregationInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  commentId: z.lazy(() => SortOrderSchema).optional(),
  assignedAt: z.lazy(() => SortOrderSchema).optional(),
  assignedBy: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserLikeCommentsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserLikeCommentsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserLikeCommentsMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserLikeCommentsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserLikeCommentsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserLikeCommentsScalarWhereWithAggregatesInputSchema),z.lazy(() => UserLikeCommentsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserLikeCommentsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserLikeCommentsScalarWhereWithAggregatesInputSchema),z.lazy(() => UserLikeCommentsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  commentId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  assignedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  assignedBy: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const UserLikedPostsWhereInputSchema: z.ZodType<Prisma.UserLikedPostsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserLikedPostsWhereInputSchema),z.lazy(() => UserLikedPostsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserLikedPostsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserLikedPostsWhereInputSchema),z.lazy(() => UserLikedPostsWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  postId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  assignedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  assignedBy: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  post: z.union([ z.lazy(() => PostRelationFilterSchema),z.lazy(() => PostWhereInputSchema) ]).optional(),
}).strict();

export const UserLikedPostsOrderByWithRelationInputSchema: z.ZodType<Prisma.UserLikedPostsOrderByWithRelationInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  assignedAt: z.lazy(() => SortOrderSchema).optional(),
  assignedBy: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  post: z.lazy(() => PostOrderByWithRelationInputSchema).optional()
}).strict();

export const UserLikedPostsWhereUniqueInputSchema: z.ZodType<Prisma.UserLikedPostsWhereUniqueInput> = z.object({
  userId_postId: z.lazy(() => UserLikedPostsUserIdPostIdCompoundUniqueInputSchema)
})
.and(z.object({
  userId_postId: z.lazy(() => UserLikedPostsUserIdPostIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => UserLikedPostsWhereInputSchema),z.lazy(() => UserLikedPostsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserLikedPostsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserLikedPostsWhereInputSchema),z.lazy(() => UserLikedPostsWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  postId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  assignedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  assignedBy: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  post: z.union([ z.lazy(() => PostRelationFilterSchema),z.lazy(() => PostWhereInputSchema) ]).optional(),
}).strict());

export const UserLikedPostsOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserLikedPostsOrderByWithAggregationInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  assignedAt: z.lazy(() => SortOrderSchema).optional(),
  assignedBy: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserLikedPostsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserLikedPostsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserLikedPostsMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserLikedPostsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserLikedPostsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserLikedPostsScalarWhereWithAggregatesInputSchema),z.lazy(() => UserLikedPostsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserLikedPostsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserLikedPostsScalarWhereWithAggregatesInputSchema),z.lazy(() => UserLikedPostsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  postId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  assignedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  assignedBy: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const UsersRolesWhereInputSchema: z.ZodType<Prisma.UsersRolesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UsersRolesWhereInputSchema),z.lazy(() => UsersRolesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UsersRolesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UsersRolesWhereInputSchema),z.lazy(() => UsersRolesWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  roleId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  assignedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  assignedBy: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleRelationFilterSchema),z.lazy(() => RoleWhereInputSchema) ]).optional(),
}).strict();

export const UsersRolesOrderByWithRelationInputSchema: z.ZodType<Prisma.UsersRolesOrderByWithRelationInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  roleId: z.lazy(() => SortOrderSchema).optional(),
  assignedAt: z.lazy(() => SortOrderSchema).optional(),
  assignedBy: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  role: z.lazy(() => RoleOrderByWithRelationInputSchema).optional()
}).strict();

export const UsersRolesWhereUniqueInputSchema: z.ZodType<Prisma.UsersRolesWhereUniqueInput> = z.object({
  userId_roleId: z.lazy(() => UsersRolesUserIdRoleIdCompoundUniqueInputSchema)
})
.and(z.object({
  userId_roleId: z.lazy(() => UsersRolesUserIdRoleIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => UsersRolesWhereInputSchema),z.lazy(() => UsersRolesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UsersRolesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UsersRolesWhereInputSchema),z.lazy(() => UsersRolesWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  roleId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  assignedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  assignedBy: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleRelationFilterSchema),z.lazy(() => RoleWhereInputSchema) ]).optional(),
}).strict());

export const UsersRolesOrderByWithAggregationInputSchema: z.ZodType<Prisma.UsersRolesOrderByWithAggregationInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  roleId: z.lazy(() => SortOrderSchema).optional(),
  assignedAt: z.lazy(() => SortOrderSchema).optional(),
  assignedBy: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UsersRolesCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UsersRolesMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UsersRolesMinOrderByAggregateInputSchema).optional()
}).strict();

export const UsersRolesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UsersRolesScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UsersRolesScalarWhereWithAggregatesInputSchema),z.lazy(() => UsersRolesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UsersRolesScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UsersRolesScalarWhereWithAggregatesInputSchema),z.lazy(() => UsersRolesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  roleId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  assignedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  assignedBy: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const UsersPermissionsWhereInputSchema: z.ZodType<Prisma.UsersPermissionsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UsersPermissionsWhereInputSchema),z.lazy(() => UsersPermissionsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UsersPermissionsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UsersPermissionsWhereInputSchema),z.lazy(() => UsersPermissionsWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  permissionId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  assignedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  assignedBy: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  permission: z.union([ z.lazy(() => PermissionRelationFilterSchema),z.lazy(() => PermissionWhereInputSchema) ]).optional(),
}).strict();

export const UsersPermissionsOrderByWithRelationInputSchema: z.ZodType<Prisma.UsersPermissionsOrderByWithRelationInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  permissionId: z.lazy(() => SortOrderSchema).optional(),
  assignedAt: z.lazy(() => SortOrderSchema).optional(),
  assignedBy: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  permission: z.lazy(() => PermissionOrderByWithRelationInputSchema).optional()
}).strict();

export const UsersPermissionsWhereUniqueInputSchema: z.ZodType<Prisma.UsersPermissionsWhereUniqueInput> = z.object({
  userId_permissionId: z.lazy(() => UsersPermissionsUserIdPermissionIdCompoundUniqueInputSchema)
})
.and(z.object({
  userId_permissionId: z.lazy(() => UsersPermissionsUserIdPermissionIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => UsersPermissionsWhereInputSchema),z.lazy(() => UsersPermissionsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UsersPermissionsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UsersPermissionsWhereInputSchema),z.lazy(() => UsersPermissionsWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  permissionId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  assignedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  assignedBy: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  permission: z.union([ z.lazy(() => PermissionRelationFilterSchema),z.lazy(() => PermissionWhereInputSchema) ]).optional(),
}).strict());

export const UsersPermissionsOrderByWithAggregationInputSchema: z.ZodType<Prisma.UsersPermissionsOrderByWithAggregationInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  permissionId: z.lazy(() => SortOrderSchema).optional(),
  assignedAt: z.lazy(() => SortOrderSchema).optional(),
  assignedBy: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UsersPermissionsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UsersPermissionsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UsersPermissionsMinOrderByAggregateInputSchema).optional()
}).strict();

export const UsersPermissionsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UsersPermissionsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UsersPermissionsScalarWhereWithAggregatesInputSchema),z.lazy(() => UsersPermissionsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UsersPermissionsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UsersPermissionsScalarWhereWithAggregatesInputSchema),z.lazy(() => UsersPermissionsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  permissionId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  assignedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  assignedBy: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
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
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  permissions: z.lazy(() => RolesPermissionsListRelationFilterSchema).optional(),
  users: z.lazy(() => UsersRolesListRelationFilterSchema).optional()
}).strict();

export const RoleOrderByWithRelationInputSchema: z.ZodType<Prisma.RoleOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  label: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  systemic: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  permissions: z.lazy(() => RolesPermissionsOrderByRelationAggregateInputSchema).optional(),
  users: z.lazy(() => UsersRolesOrderByRelationAggregateInputSchema).optional()
}).strict();

export const RoleWhereUniqueInputSchema: z.ZodType<Prisma.RoleWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => RoleWhereInputSchema),z.lazy(() => RoleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RoleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RoleWhereInputSchema),z.lazy(() => RoleWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  label: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  systemic: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  permissions: z.lazy(() => RolesPermissionsListRelationFilterSchema).optional(),
  users: z.lazy(() => UsersRolesListRelationFilterSchema).optional()
}).strict());

export const RoleOrderByWithAggregationInputSchema: z.ZodType<Prisma.RoleOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  label: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  systemic: z.lazy(() => SortOrderSchema).optional(),
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
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  roles: z.lazy(() => RolesPermissionsListRelationFilterSchema).optional(),
  users: z.lazy(() => UsersPermissionsListRelationFilterSchema).optional()
}).strict();

export const PermissionOrderByWithRelationInputSchema: z.ZodType<Prisma.PermissionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  label: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  rule: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  roles: z.lazy(() => RolesPermissionsOrderByRelationAggregateInputSchema).optional(),
  users: z.lazy(() => UsersPermissionsOrderByRelationAggregateInputSchema).optional()
}).strict();

export const PermissionWhereUniqueInputSchema: z.ZodType<Prisma.PermissionWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => PermissionWhereInputSchema),z.lazy(() => PermissionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PermissionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PermissionWhereInputSchema),z.lazy(() => PermissionWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  label: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  rule: z.lazy(() => JsonFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  roles: z.lazy(() => RolesPermissionsListRelationFilterSchema).optional(),
  users: z.lazy(() => UsersPermissionsListRelationFilterSchema).optional()
}).strict());

export const PermissionOrderByWithAggregationInputSchema: z.ZodType<Prisma.PermissionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  label: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  rule: z.lazy(() => SortOrderSchema).optional(),
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
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const RolesPermissionsWhereInputSchema: z.ZodType<Prisma.RolesPermissionsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RolesPermissionsWhereInputSchema),z.lazy(() => RolesPermissionsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RolesPermissionsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RolesPermissionsWhereInputSchema),z.lazy(() => RolesPermissionsWhereInputSchema).array() ]).optional(),
  roleId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  permissionId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  assignedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  assignedBy: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => RoleRelationFilterSchema),z.lazy(() => RoleWhereInputSchema) ]).optional(),
  permission: z.union([ z.lazy(() => PermissionRelationFilterSchema),z.lazy(() => PermissionWhereInputSchema) ]).optional(),
}).strict();

export const RolesPermissionsOrderByWithRelationInputSchema: z.ZodType<Prisma.RolesPermissionsOrderByWithRelationInput> = z.object({
  roleId: z.lazy(() => SortOrderSchema).optional(),
  permissionId: z.lazy(() => SortOrderSchema).optional(),
  assignedAt: z.lazy(() => SortOrderSchema).optional(),
  assignedBy: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => RoleOrderByWithRelationInputSchema).optional(),
  permission: z.lazy(() => PermissionOrderByWithRelationInputSchema).optional()
}).strict();

export const RolesPermissionsWhereUniqueInputSchema: z.ZodType<Prisma.RolesPermissionsWhereUniqueInput> = z.object({
  roleId_permissionId: z.lazy(() => RolesPermissionsRoleIdPermissionIdCompoundUniqueInputSchema)
})
.and(z.object({
  roleId_permissionId: z.lazy(() => RolesPermissionsRoleIdPermissionIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => RolesPermissionsWhereInputSchema),z.lazy(() => RolesPermissionsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RolesPermissionsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RolesPermissionsWhereInputSchema),z.lazy(() => RolesPermissionsWhereInputSchema).array() ]).optional(),
  roleId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  permissionId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  assignedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  assignedBy: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => RoleRelationFilterSchema),z.lazy(() => RoleWhereInputSchema) ]).optional(),
  permission: z.union([ z.lazy(() => PermissionRelationFilterSchema),z.lazy(() => PermissionWhereInputSchema) ]).optional(),
}).strict());

export const RolesPermissionsOrderByWithAggregationInputSchema: z.ZodType<Prisma.RolesPermissionsOrderByWithAggregationInput> = z.object({
  roleId: z.lazy(() => SortOrderSchema).optional(),
  permissionId: z.lazy(() => SortOrderSchema).optional(),
  assignedAt: z.lazy(() => SortOrderSchema).optional(),
  assignedBy: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RolesPermissionsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RolesPermissionsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RolesPermissionsMinOrderByAggregateInputSchema).optional()
}).strict();

export const RolesPermissionsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RolesPermissionsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RolesPermissionsScalarWhereWithAggregatesInputSchema),z.lazy(() => RolesPermissionsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RolesPermissionsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RolesPermissionsScalarWhereWithAggregatesInputSchema),z.lazy(() => RolesPermissionsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  roleId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  permissionId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  assignedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  assignedBy: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
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
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  thumbnail: z.union([ z.lazy(() => MediaEntityNullableRelationFilterSchema),z.lazy(() => MediaEntityWhereInputSchema) ]).optional().nullable(),
  author: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  likedUsers: z.lazy(() => UserLikedPostsListRelationFilterSchema).optional(),
  comments: z.lazy(() => CommentListRelationFilterSchema).optional(),
  translations: z.lazy(() => TranslationListRelationFilterSchema).optional()
}).strict();

export const PostOrderByWithRelationInputSchema: z.ZodType<Prisma.PostOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  content: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  meta: z.lazy(() => SortOrderSchema).optional(),
  tags: z.lazy(() => SortOrderSchema).optional(),
  thumbnailId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  authorId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  thumbnail: z.lazy(() => MediaEntityOrderByWithRelationInputSchema).optional(),
  author: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  likedUsers: z.lazy(() => UserLikedPostsOrderByRelationAggregateInputSchema).optional(),
  comments: z.lazy(() => CommentOrderByRelationAggregateInputSchema).optional(),
  translations: z.lazy(() => TranslationOrderByRelationAggregateInputSchema).optional()
}).strict();

export const PostWhereUniqueInputSchema: z.ZodType<Prisma.PostWhereUniqueInput> = z.union([
  z.object({
    id: z.string().uuid(),
    slug: z.string()
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    slug: z.string(),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
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
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  thumbnail: z.union([ z.lazy(() => MediaEntityNullableRelationFilterSchema),z.lazy(() => MediaEntityWhereInputSchema) ]).optional().nullable(),
  author: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
  likedUsers: z.lazy(() => UserLikedPostsListRelationFilterSchema).optional(),
  comments: z.lazy(() => CommentListRelationFilterSchema).optional(),
  translations: z.lazy(() => TranslationListRelationFilterSchema).optional()
}).strict());

export const PostOrderByWithAggregationInputSchema: z.ZodType<Prisma.PostOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  content: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  meta: z.lazy(() => SortOrderSchema).optional(),
  tags: z.lazy(() => SortOrderSchema).optional(),
  thumbnailId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  authorId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
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
  content: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  meta: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  post: z.lazy(() => PostOrderByWithRelationInputSchema).optional()
}).strict();

export const TranslationWhereUniqueInputSchema: z.ZodType<Prisma.TranslationWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
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
  content: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
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
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
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
    id: z.string().uuid(),
    accessTokenId: z.string()
  }),
  z.object({
    id: z.string().uuid(),
  }),
  z.object({
    accessTokenId: z.string(),
  }),
])
.and(z.object({
  id: z.string().uuid().optional(),
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
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
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
  repliedToID: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  chiefComment: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  belongsTo: z.union([ z.lazy(() => PostNullableRelationFilterSchema),z.lazy(() => PostWhereInputSchema) ]).optional().nullable(),
  owner: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  likes: z.lazy(() => UserLikeCommentsListRelationFilterSchema).optional(),
  replyTo: z.union([ z.lazy(() => CommentNullableRelationFilterSchema),z.lazy(() => CommentWhereInputSchema) ]).optional().nullable(),
  replies: z.lazy(() => CommentListRelationFilterSchema).optional()
}).strict();

export const CommentOrderByWithRelationInputSchema: z.ZodType<Prisma.CommentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  belongsToId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  repliedToID: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  chiefComment: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  belongsTo: z.lazy(() => PostOrderByWithRelationInputSchema).optional(),
  owner: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  likes: z.lazy(() => UserLikeCommentsOrderByRelationAggregateInputSchema).optional(),
  replyTo: z.lazy(() => CommentOrderByWithRelationInputSchema).optional(),
  replies: z.lazy(() => CommentOrderByRelationAggregateInputSchema).optional()
}).strict();

export const CommentWhereUniqueInputSchema: z.ZodType<Prisma.CommentWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => CommentWhereInputSchema),z.lazy(() => CommentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommentWhereInputSchema),z.lazy(() => CommentWhereInputSchema).array() ]).optional(),
  belongsToId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  ownerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  repliedToID: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  chiefComment: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  belongsTo: z.union([ z.lazy(() => PostNullableRelationFilterSchema),z.lazy(() => PostWhereInputSchema) ]).optional().nullable(),
  owner: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  likes: z.lazy(() => UserLikeCommentsListRelationFilterSchema).optional(),
  replyTo: z.union([ z.lazy(() => CommentNullableRelationFilterSchema),z.lazy(() => CommentWhereInputSchema) ]).optional().nullable(),
  replies: z.lazy(() => CommentListRelationFilterSchema).optional()
}).strict());

export const CommentOrderByWithAggregationInputSchema: z.ZodType<Prisma.CommentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  belongsToId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ownerId: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  repliedToID: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
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
  repliedToID: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  chiefComment: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ContactMessageWhereInputSchema: z.ZodType<Prisma.ContactMessageWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ContactMessageWhereInputSchema),z.lazy(() => ContactMessageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ContactMessageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ContactMessageWhereInputSchema),z.lazy(() => ContactMessageWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  subject: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  message: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ContactMessageOrderByWithRelationInputSchema: z.ZodType<Prisma.ContactMessageOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  subject: z.lazy(() => SortOrderSchema).optional(),
  message: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ContactMessageWhereUniqueInputSchema: z.ZodType<Prisma.ContactMessageWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => ContactMessageWhereInputSchema),z.lazy(() => ContactMessageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ContactMessageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ContactMessageWhereInputSchema),z.lazy(() => ContactMessageWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  subject: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  message: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const ContactMessageOrderByWithAggregationInputSchema: z.ZodType<Prisma.ContactMessageOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  subject: z.lazy(() => SortOrderSchema).optional(),
  message: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ContactMessageCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ContactMessageMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ContactMessageMinOrderByAggregateInputSchema).optional()
}).strict();

export const ContactMessageScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ContactMessageScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ContactMessageScalarWhereWithAggregatesInputSchema),z.lazy(() => ContactMessageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ContactMessageScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ContactMessageScalarWhereWithAggregatesInputSchema),z.lazy(() => ContactMessageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  subject: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  message: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  name: z.string(),
  provider: z.string(),
  activated: z.boolean().optional(),
  avatar: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostCreateNestedManyWithoutAuthorInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutOwnerInputSchema).optional(),
  LikeComments: z.lazy(() => UserLikeCommentsCreateNestedManyWithoutUserInputSchema).optional(),
  roles: z.lazy(() => UsersRolesCreateNestedManyWithoutUserInputSchema).optional(),
  permissions: z.lazy(() => UsersPermissionsCreateNestedManyWithoutUserInputSchema).optional(),
  likedPosts: z.lazy(() => UserLikedPostsCreateNestedManyWithoutUserInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  name: z.string(),
  provider: z.string(),
  activated: z.boolean().optional(),
  avatar: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  LikeComments: z.lazy(() => UserLikeCommentsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  roles: z.lazy(() => UsersRolesUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  permissions: z.lazy(() => UsersPermissionsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  likedPosts: z.lazy(() => UserLikedPostsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUpdateManyWithoutAuthorNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutOwnerNestedInputSchema).optional(),
  LikeComments: z.lazy(() => UserLikeCommentsUpdateManyWithoutUserNestedInputSchema).optional(),
  roles: z.lazy(() => UsersRolesUpdateManyWithoutUserNestedInputSchema).optional(),
  permissions: z.lazy(() => UsersPermissionsUpdateManyWithoutUserNestedInputSchema).optional(),
  likedPosts: z.lazy(() => UserLikedPostsUpdateManyWithoutUserNestedInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  LikeComments: z.lazy(() => UserLikeCommentsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  roles: z.lazy(() => UsersRolesUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  permissions: z.lazy(() => UsersPermissionsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  likedPosts: z.lazy(() => UserLikedPostsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  name: z.string(),
  provider: z.string(),
  activated: z.boolean().optional(),
  avatar: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserLikeCommentsCreateInputSchema: z.ZodType<Prisma.UserLikeCommentsCreateInput> = z.object({
  assignedAt: z.coerce.date().optional(),
  assignedBy: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutLikeCommentsInputSchema),
  comment: z.lazy(() => CommentCreateNestedOneWithoutLikesInputSchema)
}).strict();

export const UserLikeCommentsUncheckedCreateInputSchema: z.ZodType<Prisma.UserLikeCommentsUncheckedCreateInput> = z.object({
  userId: z.string(),
  commentId: z.string(),
  assignedAt: z.coerce.date().optional(),
  assignedBy: z.string()
}).strict();

export const UserLikeCommentsUpdateInputSchema: z.ZodType<Prisma.UserLikeCommentsUpdateInput> = z.object({
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assignedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutLikeCommentsNestedInputSchema).optional(),
  comment: z.lazy(() => CommentUpdateOneRequiredWithoutLikesNestedInputSchema).optional()
}).strict();

export const UserLikeCommentsUncheckedUpdateInputSchema: z.ZodType<Prisma.UserLikeCommentsUncheckedUpdateInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  commentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assignedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserLikeCommentsCreateManyInputSchema: z.ZodType<Prisma.UserLikeCommentsCreateManyInput> = z.object({
  userId: z.string(),
  commentId: z.string(),
  assignedAt: z.coerce.date().optional(),
  assignedBy: z.string()
}).strict();

export const UserLikeCommentsUpdateManyMutationInputSchema: z.ZodType<Prisma.UserLikeCommentsUpdateManyMutationInput> = z.object({
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assignedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserLikeCommentsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserLikeCommentsUncheckedUpdateManyInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  commentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assignedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserLikedPostsCreateInputSchema: z.ZodType<Prisma.UserLikedPostsCreateInput> = z.object({
  assignedAt: z.coerce.date().optional(),
  assignedBy: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutLikedPostsInputSchema),
  post: z.lazy(() => PostCreateNestedOneWithoutLikedUsersInputSchema)
}).strict();

export const UserLikedPostsUncheckedCreateInputSchema: z.ZodType<Prisma.UserLikedPostsUncheckedCreateInput> = z.object({
  userId: z.string(),
  postId: z.string(),
  assignedAt: z.coerce.date().optional(),
  assignedBy: z.string()
}).strict();

export const UserLikedPostsUpdateInputSchema: z.ZodType<Prisma.UserLikedPostsUpdateInput> = z.object({
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assignedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutLikedPostsNestedInputSchema).optional(),
  post: z.lazy(() => PostUpdateOneRequiredWithoutLikedUsersNestedInputSchema).optional()
}).strict();

export const UserLikedPostsUncheckedUpdateInputSchema: z.ZodType<Prisma.UserLikedPostsUncheckedUpdateInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assignedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserLikedPostsCreateManyInputSchema: z.ZodType<Prisma.UserLikedPostsCreateManyInput> = z.object({
  userId: z.string(),
  postId: z.string(),
  assignedAt: z.coerce.date().optional(),
  assignedBy: z.string()
}).strict();

export const UserLikedPostsUpdateManyMutationInputSchema: z.ZodType<Prisma.UserLikedPostsUpdateManyMutationInput> = z.object({
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assignedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserLikedPostsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserLikedPostsUncheckedUpdateManyInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assignedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UsersRolesCreateInputSchema: z.ZodType<Prisma.UsersRolesCreateInput> = z.object({
  assignedAt: z.coerce.date().optional(),
  assignedBy: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutRolesInputSchema),
  role: z.lazy(() => RoleCreateNestedOneWithoutUsersInputSchema)
}).strict();

export const UsersRolesUncheckedCreateInputSchema: z.ZodType<Prisma.UsersRolesUncheckedCreateInput> = z.object({
  userId: z.string(),
  roleId: z.string(),
  assignedAt: z.coerce.date().optional(),
  assignedBy: z.string()
}).strict();

export const UsersRolesUpdateInputSchema: z.ZodType<Prisma.UsersRolesUpdateInput> = z.object({
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assignedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutRolesNestedInputSchema).optional(),
  role: z.lazy(() => RoleUpdateOneRequiredWithoutUsersNestedInputSchema).optional()
}).strict();

export const UsersRolesUncheckedUpdateInputSchema: z.ZodType<Prisma.UsersRolesUncheckedUpdateInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  roleId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assignedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UsersRolesCreateManyInputSchema: z.ZodType<Prisma.UsersRolesCreateManyInput> = z.object({
  userId: z.string(),
  roleId: z.string(),
  assignedAt: z.coerce.date().optional(),
  assignedBy: z.string()
}).strict();

export const UsersRolesUpdateManyMutationInputSchema: z.ZodType<Prisma.UsersRolesUpdateManyMutationInput> = z.object({
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assignedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UsersRolesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UsersRolesUncheckedUpdateManyInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  roleId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assignedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UsersPermissionsCreateInputSchema: z.ZodType<Prisma.UsersPermissionsCreateInput> = z.object({
  assignedAt: z.coerce.date().optional(),
  assignedBy: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutPermissionsInputSchema),
  permission: z.lazy(() => PermissionCreateNestedOneWithoutUsersInputSchema)
}).strict();

export const UsersPermissionsUncheckedCreateInputSchema: z.ZodType<Prisma.UsersPermissionsUncheckedCreateInput> = z.object({
  userId: z.string(),
  permissionId: z.string(),
  assignedAt: z.coerce.date().optional(),
  assignedBy: z.string()
}).strict();

export const UsersPermissionsUpdateInputSchema: z.ZodType<Prisma.UsersPermissionsUpdateInput> = z.object({
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assignedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutPermissionsNestedInputSchema).optional(),
  permission: z.lazy(() => PermissionUpdateOneRequiredWithoutUsersNestedInputSchema).optional()
}).strict();

export const UsersPermissionsUncheckedUpdateInputSchema: z.ZodType<Prisma.UsersPermissionsUncheckedUpdateInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  permissionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assignedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UsersPermissionsCreateManyInputSchema: z.ZodType<Prisma.UsersPermissionsCreateManyInput> = z.object({
  userId: z.string(),
  permissionId: z.string(),
  assignedAt: z.coerce.date().optional(),
  assignedBy: z.string()
}).strict();

export const UsersPermissionsUpdateManyMutationInputSchema: z.ZodType<Prisma.UsersPermissionsUpdateManyMutationInput> = z.object({
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assignedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UsersPermissionsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UsersPermissionsUncheckedUpdateManyInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  permissionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assignedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RoleCreateInputSchema: z.ZodType<Prisma.RoleCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  label: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  systemic: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  permissions: z.lazy(() => RolesPermissionsCreateNestedManyWithoutRoleInputSchema).optional(),
  users: z.lazy(() => UsersRolesCreateNestedManyWithoutRoleInputSchema).optional()
}).strict();

export const RoleUncheckedCreateInputSchema: z.ZodType<Prisma.RoleUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  label: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  systemic: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  permissions: z.lazy(() => RolesPermissionsUncheckedCreateNestedManyWithoutRoleInputSchema).optional(),
  users: z.lazy(() => UsersRolesUncheckedCreateNestedManyWithoutRoleInputSchema).optional()
}).strict();

export const RoleUpdateInputSchema: z.ZodType<Prisma.RoleUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  systemic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  permissions: z.lazy(() => RolesPermissionsUpdateManyWithoutRoleNestedInputSchema).optional(),
  users: z.lazy(() => UsersRolesUpdateManyWithoutRoleNestedInputSchema).optional()
}).strict();

export const RoleUncheckedUpdateInputSchema: z.ZodType<Prisma.RoleUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  systemic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  permissions: z.lazy(() => RolesPermissionsUncheckedUpdateManyWithoutRoleNestedInputSchema).optional(),
  users: z.lazy(() => UsersRolesUncheckedUpdateManyWithoutRoleNestedInputSchema).optional()
}).strict();

export const RoleCreateManyInputSchema: z.ZodType<Prisma.RoleCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  label: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  systemic: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const RoleUpdateManyMutationInputSchema: z.ZodType<Prisma.RoleUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  systemic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RoleUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RoleUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  systemic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PermissionCreateInputSchema: z.ZodType<Prisma.PermissionCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  label: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  rule: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  roles: z.lazy(() => RolesPermissionsCreateNestedManyWithoutPermissionInputSchema).optional(),
  users: z.lazy(() => UsersPermissionsCreateNestedManyWithoutPermissionInputSchema).optional()
}).strict();

export const PermissionUncheckedCreateInputSchema: z.ZodType<Prisma.PermissionUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  label: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  rule: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  roles: z.lazy(() => RolesPermissionsUncheckedCreateNestedManyWithoutPermissionInputSchema).optional(),
  users: z.lazy(() => UsersPermissionsUncheckedCreateNestedManyWithoutPermissionInputSchema).optional()
}).strict();

export const PermissionUpdateInputSchema: z.ZodType<Prisma.PermissionUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rule: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  roles: z.lazy(() => RolesPermissionsUpdateManyWithoutPermissionNestedInputSchema).optional(),
  users: z.lazy(() => UsersPermissionsUpdateManyWithoutPermissionNestedInputSchema).optional()
}).strict();

export const PermissionUncheckedUpdateInputSchema: z.ZodType<Prisma.PermissionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rule: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  roles: z.lazy(() => RolesPermissionsUncheckedUpdateManyWithoutPermissionNestedInputSchema).optional(),
  users: z.lazy(() => UsersPermissionsUncheckedUpdateManyWithoutPermissionNestedInputSchema).optional()
}).strict();

export const PermissionCreateManyInputSchema: z.ZodType<Prisma.PermissionCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  label: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  rule: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PermissionUpdateManyMutationInputSchema: z.ZodType<Prisma.PermissionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rule: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PermissionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PermissionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rule: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RolesPermissionsCreateInputSchema: z.ZodType<Prisma.RolesPermissionsCreateInput> = z.object({
  assignedAt: z.coerce.date().optional(),
  assignedBy: z.string(),
  role: z.lazy(() => RoleCreateNestedOneWithoutPermissionsInputSchema),
  permission: z.lazy(() => PermissionCreateNestedOneWithoutRolesInputSchema)
}).strict();

export const RolesPermissionsUncheckedCreateInputSchema: z.ZodType<Prisma.RolesPermissionsUncheckedCreateInput> = z.object({
  roleId: z.string(),
  permissionId: z.string(),
  assignedAt: z.coerce.date().optional(),
  assignedBy: z.string()
}).strict();

export const RolesPermissionsUpdateInputSchema: z.ZodType<Prisma.RolesPermissionsUpdateInput> = z.object({
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assignedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.lazy(() => RoleUpdateOneRequiredWithoutPermissionsNestedInputSchema).optional(),
  permission: z.lazy(() => PermissionUpdateOneRequiredWithoutRolesNestedInputSchema).optional()
}).strict();

export const RolesPermissionsUncheckedUpdateInputSchema: z.ZodType<Prisma.RolesPermissionsUncheckedUpdateInput> = z.object({
  roleId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  permissionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assignedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RolesPermissionsCreateManyInputSchema: z.ZodType<Prisma.RolesPermissionsCreateManyInput> = z.object({
  roleId: z.string(),
  permissionId: z.string(),
  assignedAt: z.coerce.date().optional(),
  assignedBy: z.string()
}).strict();

export const RolesPermissionsUpdateManyMutationInputSchema: z.ZodType<Prisma.RolesPermissionsUpdateManyMutationInput> = z.object({
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assignedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RolesPermissionsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RolesPermissionsUncheckedUpdateManyInput> = z.object({
  roleId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  permissionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assignedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PostCreateInputSchema: z.ZodType<Prisma.PostCreateInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string().optional().nullable(),
  meta: z.string(),
  tags: z.union([ z.lazy(() => PostCreatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  thumbnail: z.lazy(() => MediaEntityCreateNestedOneWithoutPostInputSchema).optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutPostsInputSchema).optional(),
  likedUsers: z.lazy(() => UserLikedPostsCreateNestedManyWithoutPostInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutBelongsToInputSchema).optional(),
  translations: z.lazy(() => TranslationCreateNestedManyWithoutPostInputSchema).optional()
}).strict();

export const PostUncheckedCreateInputSchema: z.ZodType<Prisma.PostUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string().optional().nullable(),
  meta: z.string(),
  tags: z.union([ z.lazy(() => PostCreatetagsInputSchema),z.string().array() ]).optional(),
  thumbnailId: z.string().optional().nullable(),
  authorId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  likedUsers: z.lazy(() => UserLikedPostsUncheckedCreateNestedManyWithoutPostInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutBelongsToInputSchema).optional(),
  translations: z.lazy(() => TranslationUncheckedCreateNestedManyWithoutPostInputSchema).optional()
}).strict();

export const PostUpdateInputSchema: z.ZodType<Prisma.PostUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => PostUpdatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  thumbnail: z.lazy(() => MediaEntityUpdateOneWithoutPostNestedInputSchema).optional(),
  author: z.lazy(() => UserUpdateOneWithoutPostsNestedInputSchema).optional(),
  likedUsers: z.lazy(() => UserLikedPostsUpdateManyWithoutPostNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutBelongsToNestedInputSchema).optional(),
  translations: z.lazy(() => TranslationUpdateManyWithoutPostNestedInputSchema).optional()
}).strict();

export const PostUncheckedUpdateInputSchema: z.ZodType<Prisma.PostUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => PostUpdatetagsInputSchema),z.string().array() ]).optional(),
  thumbnailId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  authorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  likedUsers: z.lazy(() => UserLikedPostsUncheckedUpdateManyWithoutPostNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutBelongsToNestedInputSchema).optional(),
  translations: z.lazy(() => TranslationUncheckedUpdateManyWithoutPostNestedInputSchema).optional()
}).strict();

export const PostCreateManyInputSchema: z.ZodType<Prisma.PostCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string().optional().nullable(),
  meta: z.string(),
  tags: z.union([ z.lazy(() => PostCreatetagsInputSchema),z.string().array() ]).optional(),
  thumbnailId: z.string().optional().nullable(),
  authorId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PostUpdateManyMutationInputSchema: z.ZodType<Prisma.PostUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => PostUpdatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PostUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => PostUpdatetagsInputSchema),z.string().array() ]).optional(),
  thumbnailId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  authorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TranslationCreateInputSchema: z.ZodType<Prisma.TranslationCreateInput> = z.object({
  id: z.string().uuid().optional(),
  language: z.string(),
  title: z.string(),
  content: z.string().optional().nullable(),
  meta: z.string(),
  post: z.lazy(() => PostCreateNestedOneWithoutTranslationsInputSchema)
}).strict();

export const TranslationUncheckedCreateInputSchema: z.ZodType<Prisma.TranslationUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  language: z.string(),
  title: z.string(),
  content: z.string().optional().nullable(),
  meta: z.string(),
  postId: z.string()
}).strict();

export const TranslationUpdateInputSchema: z.ZodType<Prisma.TranslationUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  post: z.lazy(() => PostUpdateOneRequiredWithoutTranslationsNestedInputSchema).optional()
}).strict();

export const TranslationUncheckedUpdateInputSchema: z.ZodType<Prisma.TranslationUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TranslationCreateManyInputSchema: z.ZodType<Prisma.TranslationCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  language: z.string(),
  title: z.string(),
  content: z.string().optional().nullable(),
  meta: z.string(),
  postId: z.string()
}).strict();

export const TranslationUpdateManyMutationInputSchema: z.ZodType<Prisma.TranslationUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TranslationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TranslationUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MediaEntityCreateInputSchema: z.ZodType<Prisma.MediaEntityCreateInput> = z.object({
  id: z.string().uuid().optional(),
  file: z.string(),
  ext: z.string(),
  createdAt: z.coerce.date().optional(),
  post: z.lazy(() => PostCreateNestedManyWithoutThumbnailInputSchema).optional()
}).strict();

export const MediaEntityUncheckedCreateInputSchema: z.ZodType<Prisma.MediaEntityUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  file: z.string(),
  ext: z.string(),
  createdAt: z.coerce.date().optional(),
  post: z.lazy(() => PostUncheckedCreateNestedManyWithoutThumbnailInputSchema).optional()
}).strict();

export const MediaEntityUpdateInputSchema: z.ZodType<Prisma.MediaEntityUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  file: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ext: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  post: z.lazy(() => PostUpdateManyWithoutThumbnailNestedInputSchema).optional()
}).strict();

export const MediaEntityUncheckedUpdateInputSchema: z.ZodType<Prisma.MediaEntityUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  file: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ext: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  post: z.lazy(() => PostUncheckedUpdateManyWithoutThumbnailNestedInputSchema).optional()
}).strict();

export const MediaEntityCreateManyInputSchema: z.ZodType<Prisma.MediaEntityCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  file: z.string(),
  ext: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const MediaEntityUpdateManyMutationInputSchema: z.ZodType<Prisma.MediaEntityUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  file: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ext: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MediaEntityUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MediaEntityUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  file: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ext: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RefreshTokenCreateInputSchema: z.ZodType<Prisma.RefreshTokenCreateInput> = z.object({
  id: z.string().uuid().optional(),
  value: z.string(),
  expired_at: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  accessToken: z.lazy(() => AccessTokenCreateNestedOneWithoutRefreshTokenInputSchema)
}).strict();

export const RefreshTokenUncheckedCreateInputSchema: z.ZodType<Prisma.RefreshTokenUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  value: z.string(),
  expired_at: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  accessTokenId: z.string()
}).strict();

export const RefreshTokenUpdateInputSchema: z.ZodType<Prisma.RefreshTokenUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expired_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.lazy(() => AccessTokenUpdateOneRequiredWithoutRefreshTokenNestedInputSchema).optional()
}).strict();

export const RefreshTokenUncheckedUpdateInputSchema: z.ZodType<Prisma.RefreshTokenUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expired_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accessTokenId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RefreshTokenCreateManyInputSchema: z.ZodType<Prisma.RefreshTokenCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  value: z.string(),
  expired_at: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  accessTokenId: z.string()
}).strict();

export const RefreshTokenUpdateManyMutationInputSchema: z.ZodType<Prisma.RefreshTokenUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expired_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RefreshTokenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RefreshTokenUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expired_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accessTokenId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccessTokenCreateInputSchema: z.ZodType<Prisma.AccessTokenCreateInput> = z.object({
  id: z.string().uuid().optional(),
  value: z.string(),
  expired_at: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  refreshToken: z.lazy(() => RefreshTokenCreateNestedOneWithoutAccessTokenInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutAccessTokensInputSchema)
}).strict();

export const AccessTokenUncheckedCreateInputSchema: z.ZodType<Prisma.AccessTokenUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  value: z.string(),
  expired_at: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  userId: z.string(),
  refreshToken: z.lazy(() => RefreshTokenUncheckedCreateNestedOneWithoutAccessTokenInputSchema).optional()
}).strict();

export const AccessTokenUpdateInputSchema: z.ZodType<Prisma.AccessTokenUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expired_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  refreshToken: z.lazy(() => RefreshTokenUpdateOneWithoutAccessTokenNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAccessTokensNestedInputSchema).optional()
}).strict();

export const AccessTokenUncheckedUpdateInputSchema: z.ZodType<Prisma.AccessTokenUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expired_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refreshToken: z.lazy(() => RefreshTokenUncheckedUpdateOneWithoutAccessTokenNestedInputSchema).optional()
}).strict();

export const AccessTokenCreateManyInputSchema: z.ZodType<Prisma.AccessTokenCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  value: z.string(),
  expired_at: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  userId: z.string()
}).strict();

export const AccessTokenUpdateManyMutationInputSchema: z.ZodType<Prisma.AccessTokenUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expired_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccessTokenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccessTokenUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expired_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentCreateInputSchema: z.ZodType<Prisma.CommentCreateInput> = z.object({
  id: z.string().uuid().optional(),
  content: z.string(),
  chiefComment: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  belongsTo: z.lazy(() => PostCreateNestedOneWithoutCommentsInputSchema).optional(),
  owner: z.lazy(() => UserCreateNestedOneWithoutCommentsInputSchema),
  likes: z.lazy(() => UserLikeCommentsCreateNestedManyWithoutCommentInputSchema).optional(),
  replyTo: z.lazy(() => CommentCreateNestedOneWithoutRepliesInputSchema).optional(),
  replies: z.lazy(() => CommentCreateNestedManyWithoutReplyToInputSchema).optional()
}).strict();

export const CommentUncheckedCreateInputSchema: z.ZodType<Prisma.CommentUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  belongsToId: z.string().optional().nullable(),
  ownerId: z.string(),
  content: z.string(),
  repliedToID: z.string().optional().nullable(),
  chiefComment: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  likes: z.lazy(() => UserLikeCommentsUncheckedCreateNestedManyWithoutCommentInputSchema).optional(),
  replies: z.lazy(() => CommentUncheckedCreateNestedManyWithoutReplyToInputSchema).optional()
}).strict();

export const CommentUpdateInputSchema: z.ZodType<Prisma.CommentUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  chiefComment: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  belongsTo: z.lazy(() => PostUpdateOneWithoutCommentsNestedInputSchema).optional(),
  owner: z.lazy(() => UserUpdateOneRequiredWithoutCommentsNestedInputSchema).optional(),
  likes: z.lazy(() => UserLikeCommentsUpdateManyWithoutCommentNestedInputSchema).optional(),
  replyTo: z.lazy(() => CommentUpdateOneWithoutRepliesNestedInputSchema).optional(),
  replies: z.lazy(() => CommentUpdateManyWithoutReplyToNestedInputSchema).optional()
}).strict();

export const CommentUncheckedUpdateInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  belongsToId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  repliedToID: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chiefComment: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  likes: z.lazy(() => UserLikeCommentsUncheckedUpdateManyWithoutCommentNestedInputSchema).optional(),
  replies: z.lazy(() => CommentUncheckedUpdateManyWithoutReplyToNestedInputSchema).optional()
}).strict();

export const CommentCreateManyInputSchema: z.ZodType<Prisma.CommentCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  belongsToId: z.string().optional().nullable(),
  ownerId: z.string(),
  content: z.string(),
  repliedToID: z.string().optional().nullable(),
  chiefComment: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const CommentUpdateManyMutationInputSchema: z.ZodType<Prisma.CommentUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  chiefComment: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  belongsToId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  repliedToID: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chiefComment: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ContactMessageCreateInputSchema: z.ZodType<Prisma.ContactMessageCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  email: z.string(),
  subject: z.string(),
  message: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const ContactMessageUncheckedCreateInputSchema: z.ZodType<Prisma.ContactMessageUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  email: z.string(),
  subject: z.string(),
  message: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const ContactMessageUpdateInputSchema: z.ZodType<Prisma.ContactMessageUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subject: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ContactMessageUncheckedUpdateInputSchema: z.ZodType<Prisma.ContactMessageUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subject: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ContactMessageCreateManyInputSchema: z.ZodType<Prisma.ContactMessageCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  email: z.string(),
  subject: z.string(),
  message: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const ContactMessageUpdateManyMutationInputSchema: z.ZodType<Prisma.ContactMessageUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subject: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ContactMessageUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ContactMessageUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  subject: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  message: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
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

export const UserLikeCommentsListRelationFilterSchema: z.ZodType<Prisma.UserLikeCommentsListRelationFilter> = z.object({
  every: z.lazy(() => UserLikeCommentsWhereInputSchema).optional(),
  some: z.lazy(() => UserLikeCommentsWhereInputSchema).optional(),
  none: z.lazy(() => UserLikeCommentsWhereInputSchema).optional()
}).strict();

export const UsersRolesListRelationFilterSchema: z.ZodType<Prisma.UsersRolesListRelationFilter> = z.object({
  every: z.lazy(() => UsersRolesWhereInputSchema).optional(),
  some: z.lazy(() => UsersRolesWhereInputSchema).optional(),
  none: z.lazy(() => UsersRolesWhereInputSchema).optional()
}).strict();

export const UsersPermissionsListRelationFilterSchema: z.ZodType<Prisma.UsersPermissionsListRelationFilter> = z.object({
  every: z.lazy(() => UsersPermissionsWhereInputSchema).optional(),
  some: z.lazy(() => UsersPermissionsWhereInputSchema).optional(),
  none: z.lazy(() => UsersPermissionsWhereInputSchema).optional()
}).strict();

export const UserLikedPostsListRelationFilterSchema: z.ZodType<Prisma.UserLikedPostsListRelationFilter> = z.object({
  every: z.lazy(() => UserLikedPostsWhereInputSchema).optional(),
  some: z.lazy(() => UserLikedPostsWhereInputSchema).optional(),
  none: z.lazy(() => UserLikedPostsWhereInputSchema).optional()
}).strict();

export const AccessTokenListRelationFilterSchema: z.ZodType<Prisma.AccessTokenListRelationFilter> = z.object({
  every: z.lazy(() => AccessTokenWhereInputSchema).optional(),
  some: z.lazy(() => AccessTokenWhereInputSchema).optional(),
  none: z.lazy(() => AccessTokenWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const PostOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PostOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CommentOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserLikeCommentsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserLikeCommentsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UsersRolesOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UsersRolesOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UsersPermissionsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UsersPermissionsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserLikedPostsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserLikedPostsOrderByRelationAggregateInput> = z.object({
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
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
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

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const CommentRelationFilterSchema: z.ZodType<Prisma.CommentRelationFilter> = z.object({
  is: z.lazy(() => CommentWhereInputSchema).optional(),
  isNot: z.lazy(() => CommentWhereInputSchema).optional()
}).strict();

export const UserLikeCommentsUserIdCommentIdCompoundUniqueInputSchema: z.ZodType<Prisma.UserLikeCommentsUserIdCommentIdCompoundUniqueInput> = z.object({
  userId: z.string(),
  commentId: z.string()
}).strict();

export const UserLikeCommentsCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserLikeCommentsCountOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  commentId: z.lazy(() => SortOrderSchema).optional(),
  assignedAt: z.lazy(() => SortOrderSchema).optional(),
  assignedBy: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserLikeCommentsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserLikeCommentsMaxOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  commentId: z.lazy(() => SortOrderSchema).optional(),
  assignedAt: z.lazy(() => SortOrderSchema).optional(),
  assignedBy: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserLikeCommentsMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserLikeCommentsMinOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  commentId: z.lazy(() => SortOrderSchema).optional(),
  assignedAt: z.lazy(() => SortOrderSchema).optional(),
  assignedBy: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PostRelationFilterSchema: z.ZodType<Prisma.PostRelationFilter> = z.object({
  is: z.lazy(() => PostWhereInputSchema).optional(),
  isNot: z.lazy(() => PostWhereInputSchema).optional()
}).strict();

export const UserLikedPostsUserIdPostIdCompoundUniqueInputSchema: z.ZodType<Prisma.UserLikedPostsUserIdPostIdCompoundUniqueInput> = z.object({
  userId: z.string(),
  postId: z.string()
}).strict();

export const UserLikedPostsCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserLikedPostsCountOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  assignedAt: z.lazy(() => SortOrderSchema).optional(),
  assignedBy: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserLikedPostsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserLikedPostsMaxOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  assignedAt: z.lazy(() => SortOrderSchema).optional(),
  assignedBy: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserLikedPostsMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserLikedPostsMinOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  postId: z.lazy(() => SortOrderSchema).optional(),
  assignedAt: z.lazy(() => SortOrderSchema).optional(),
  assignedBy: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RoleRelationFilterSchema: z.ZodType<Prisma.RoleRelationFilter> = z.object({
  is: z.lazy(() => RoleWhereInputSchema).optional(),
  isNot: z.lazy(() => RoleWhereInputSchema).optional()
}).strict();

export const UsersRolesUserIdRoleIdCompoundUniqueInputSchema: z.ZodType<Prisma.UsersRolesUserIdRoleIdCompoundUniqueInput> = z.object({
  userId: z.string(),
  roleId: z.string()
}).strict();

export const UsersRolesCountOrderByAggregateInputSchema: z.ZodType<Prisma.UsersRolesCountOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  roleId: z.lazy(() => SortOrderSchema).optional(),
  assignedAt: z.lazy(() => SortOrderSchema).optional(),
  assignedBy: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UsersRolesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UsersRolesMaxOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  roleId: z.lazy(() => SortOrderSchema).optional(),
  assignedAt: z.lazy(() => SortOrderSchema).optional(),
  assignedBy: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UsersRolesMinOrderByAggregateInputSchema: z.ZodType<Prisma.UsersRolesMinOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  roleId: z.lazy(() => SortOrderSchema).optional(),
  assignedAt: z.lazy(() => SortOrderSchema).optional(),
  assignedBy: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PermissionRelationFilterSchema: z.ZodType<Prisma.PermissionRelationFilter> = z.object({
  is: z.lazy(() => PermissionWhereInputSchema).optional(),
  isNot: z.lazy(() => PermissionWhereInputSchema).optional()
}).strict();

export const UsersPermissionsUserIdPermissionIdCompoundUniqueInputSchema: z.ZodType<Prisma.UsersPermissionsUserIdPermissionIdCompoundUniqueInput> = z.object({
  userId: z.string(),
  permissionId: z.string()
}).strict();

export const UsersPermissionsCountOrderByAggregateInputSchema: z.ZodType<Prisma.UsersPermissionsCountOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  permissionId: z.lazy(() => SortOrderSchema).optional(),
  assignedAt: z.lazy(() => SortOrderSchema).optional(),
  assignedBy: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UsersPermissionsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UsersPermissionsMaxOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  permissionId: z.lazy(() => SortOrderSchema).optional(),
  assignedAt: z.lazy(() => SortOrderSchema).optional(),
  assignedBy: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UsersPermissionsMinOrderByAggregateInputSchema: z.ZodType<Prisma.UsersPermissionsMinOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  permissionId: z.lazy(() => SortOrderSchema).optional(),
  assignedAt: z.lazy(() => SortOrderSchema).optional(),
  assignedBy: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RolesPermissionsListRelationFilterSchema: z.ZodType<Prisma.RolesPermissionsListRelationFilter> = z.object({
  every: z.lazy(() => RolesPermissionsWhereInputSchema).optional(),
  some: z.lazy(() => RolesPermissionsWhereInputSchema).optional(),
  none: z.lazy(() => RolesPermissionsWhereInputSchema).optional()
}).strict();

export const RolesPermissionsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RolesPermissionsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RoleCountOrderByAggregateInputSchema: z.ZodType<Prisma.RoleCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  systemic: z.lazy(() => SortOrderSchema).optional(),
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
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: InputJsonValue.optional()
}).strict();

export const PermissionCountOrderByAggregateInputSchema: z.ZodType<Prisma.PermissionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  rule: z.lazy(() => SortOrderSchema).optional(),
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
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: InputJsonValue.optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedJsonFilterSchema).optional(),
  _max: z.lazy(() => NestedJsonFilterSchema).optional()
}).strict();

export const RolesPermissionsRoleIdPermissionIdCompoundUniqueInputSchema: z.ZodType<Prisma.RolesPermissionsRoleIdPermissionIdCompoundUniqueInput> = z.object({
  roleId: z.string(),
  permissionId: z.string()
}).strict();

export const RolesPermissionsCountOrderByAggregateInputSchema: z.ZodType<Prisma.RolesPermissionsCountOrderByAggregateInput> = z.object({
  roleId: z.lazy(() => SortOrderSchema).optional(),
  permissionId: z.lazy(() => SortOrderSchema).optional(),
  assignedAt: z.lazy(() => SortOrderSchema).optional(),
  assignedBy: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RolesPermissionsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RolesPermissionsMaxOrderByAggregateInput> = z.object({
  roleId: z.lazy(() => SortOrderSchema).optional(),
  permissionId: z.lazy(() => SortOrderSchema).optional(),
  assignedAt: z.lazy(() => SortOrderSchema).optional(),
  assignedBy: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RolesPermissionsMinOrderByAggregateInputSchema: z.ZodType<Prisma.RolesPermissionsMinOrderByAggregateInput> = z.object({
  roleId: z.lazy(() => SortOrderSchema).optional(),
  permissionId: z.lazy(() => SortOrderSchema).optional(),
  assignedAt: z.lazy(() => SortOrderSchema).optional(),
  assignedBy: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableListFilterSchema: z.ZodType<Prisma.StringNullableListFilter> = z.object({
  equals: z.string().array().optional().nullable(),
  has: z.string().optional().nullable(),
  hasEvery: z.string().array().optional(),
  hasSome: z.string().array().optional(),
  isEmpty: z.boolean().optional()
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

export const ContactMessageCountOrderByAggregateInputSchema: z.ZodType<Prisma.ContactMessageCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  subject: z.lazy(() => SortOrderSchema).optional(),
  message: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ContactMessageMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ContactMessageMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  subject: z.lazy(() => SortOrderSchema).optional(),
  message: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ContactMessageMinOrderByAggregateInputSchema: z.ZodType<Prisma.ContactMessageMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  subject: z.lazy(() => SortOrderSchema).optional(),
  message: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
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

export const UserLikeCommentsCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserLikeCommentsCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserLikeCommentsCreateWithoutUserInputSchema),z.lazy(() => UserLikeCommentsCreateWithoutUserInputSchema).array(),z.lazy(() => UserLikeCommentsUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserLikeCommentsUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserLikeCommentsCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserLikeCommentsCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserLikeCommentsCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserLikeCommentsWhereUniqueInputSchema),z.lazy(() => UserLikeCommentsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UsersRolesCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UsersRolesCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UsersRolesCreateWithoutUserInputSchema),z.lazy(() => UsersRolesCreateWithoutUserInputSchema).array(),z.lazy(() => UsersRolesUncheckedCreateWithoutUserInputSchema),z.lazy(() => UsersRolesUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UsersRolesCreateOrConnectWithoutUserInputSchema),z.lazy(() => UsersRolesCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UsersRolesCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UsersRolesWhereUniqueInputSchema),z.lazy(() => UsersRolesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UsersPermissionsCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UsersPermissionsCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UsersPermissionsCreateWithoutUserInputSchema),z.lazy(() => UsersPermissionsCreateWithoutUserInputSchema).array(),z.lazy(() => UsersPermissionsUncheckedCreateWithoutUserInputSchema),z.lazy(() => UsersPermissionsUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UsersPermissionsCreateOrConnectWithoutUserInputSchema),z.lazy(() => UsersPermissionsCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UsersPermissionsCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UsersPermissionsWhereUniqueInputSchema),z.lazy(() => UsersPermissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserLikedPostsCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserLikedPostsCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserLikedPostsCreateWithoutUserInputSchema),z.lazy(() => UserLikedPostsCreateWithoutUserInputSchema).array(),z.lazy(() => UserLikedPostsUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserLikedPostsUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserLikedPostsCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserLikedPostsCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserLikedPostsCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserLikedPostsWhereUniqueInputSchema),z.lazy(() => UserLikedPostsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AccessTokenCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccessTokenCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccessTokenCreateWithoutUserInputSchema),z.lazy(() => AccessTokenCreateWithoutUserInputSchema).array(),z.lazy(() => AccessTokenUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccessTokenUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccessTokenCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccessTokenCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccessTokenCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccessTokenWhereUniqueInputSchema),z.lazy(() => AccessTokenWhereUniqueInputSchema).array() ]).optional(),
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

export const UserLikeCommentsUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserLikeCommentsUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserLikeCommentsCreateWithoutUserInputSchema),z.lazy(() => UserLikeCommentsCreateWithoutUserInputSchema).array(),z.lazy(() => UserLikeCommentsUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserLikeCommentsUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserLikeCommentsCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserLikeCommentsCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserLikeCommentsCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserLikeCommentsWhereUniqueInputSchema),z.lazy(() => UserLikeCommentsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UsersRolesUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UsersRolesUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UsersRolesCreateWithoutUserInputSchema),z.lazy(() => UsersRolesCreateWithoutUserInputSchema).array(),z.lazy(() => UsersRolesUncheckedCreateWithoutUserInputSchema),z.lazy(() => UsersRolesUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UsersRolesCreateOrConnectWithoutUserInputSchema),z.lazy(() => UsersRolesCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UsersRolesCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UsersRolesWhereUniqueInputSchema),z.lazy(() => UsersRolesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UsersPermissionsUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UsersPermissionsUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UsersPermissionsCreateWithoutUserInputSchema),z.lazy(() => UsersPermissionsCreateWithoutUserInputSchema).array(),z.lazy(() => UsersPermissionsUncheckedCreateWithoutUserInputSchema),z.lazy(() => UsersPermissionsUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UsersPermissionsCreateOrConnectWithoutUserInputSchema),z.lazy(() => UsersPermissionsCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UsersPermissionsCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UsersPermissionsWhereUniqueInputSchema),z.lazy(() => UsersPermissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserLikedPostsUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserLikedPostsUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserLikedPostsCreateWithoutUserInputSchema),z.lazy(() => UserLikedPostsCreateWithoutUserInputSchema).array(),z.lazy(() => UserLikedPostsUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserLikedPostsUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserLikedPostsCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserLikedPostsCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserLikedPostsCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserLikedPostsWhereUniqueInputSchema),z.lazy(() => UserLikedPostsWhereUniqueInputSchema).array() ]).optional(),
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
  set: z.string().optional().nullable()
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

export const UserLikeCommentsUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserLikeCommentsUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserLikeCommentsCreateWithoutUserInputSchema),z.lazy(() => UserLikeCommentsCreateWithoutUserInputSchema).array(),z.lazy(() => UserLikeCommentsUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserLikeCommentsUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserLikeCommentsCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserLikeCommentsCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserLikeCommentsUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserLikeCommentsUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserLikeCommentsCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserLikeCommentsWhereUniqueInputSchema),z.lazy(() => UserLikeCommentsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserLikeCommentsWhereUniqueInputSchema),z.lazy(() => UserLikeCommentsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserLikeCommentsWhereUniqueInputSchema),z.lazy(() => UserLikeCommentsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserLikeCommentsWhereUniqueInputSchema),z.lazy(() => UserLikeCommentsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserLikeCommentsUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserLikeCommentsUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserLikeCommentsUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserLikeCommentsUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserLikeCommentsScalarWhereInputSchema),z.lazy(() => UserLikeCommentsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UsersRolesUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UsersRolesUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UsersRolesCreateWithoutUserInputSchema),z.lazy(() => UsersRolesCreateWithoutUserInputSchema).array(),z.lazy(() => UsersRolesUncheckedCreateWithoutUserInputSchema),z.lazy(() => UsersRolesUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UsersRolesCreateOrConnectWithoutUserInputSchema),z.lazy(() => UsersRolesCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UsersRolesUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UsersRolesUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UsersRolesCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UsersRolesWhereUniqueInputSchema),z.lazy(() => UsersRolesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UsersRolesWhereUniqueInputSchema),z.lazy(() => UsersRolesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UsersRolesWhereUniqueInputSchema),z.lazy(() => UsersRolesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UsersRolesWhereUniqueInputSchema),z.lazy(() => UsersRolesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UsersRolesUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UsersRolesUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UsersRolesUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UsersRolesUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UsersRolesScalarWhereInputSchema),z.lazy(() => UsersRolesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UsersPermissionsUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UsersPermissionsUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UsersPermissionsCreateWithoutUserInputSchema),z.lazy(() => UsersPermissionsCreateWithoutUserInputSchema).array(),z.lazy(() => UsersPermissionsUncheckedCreateWithoutUserInputSchema),z.lazy(() => UsersPermissionsUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UsersPermissionsCreateOrConnectWithoutUserInputSchema),z.lazy(() => UsersPermissionsCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UsersPermissionsUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UsersPermissionsUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UsersPermissionsCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UsersPermissionsWhereUniqueInputSchema),z.lazy(() => UsersPermissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UsersPermissionsWhereUniqueInputSchema),z.lazy(() => UsersPermissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UsersPermissionsWhereUniqueInputSchema),z.lazy(() => UsersPermissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UsersPermissionsWhereUniqueInputSchema),z.lazy(() => UsersPermissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UsersPermissionsUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UsersPermissionsUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UsersPermissionsUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UsersPermissionsUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UsersPermissionsScalarWhereInputSchema),z.lazy(() => UsersPermissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserLikedPostsUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserLikedPostsUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserLikedPostsCreateWithoutUserInputSchema),z.lazy(() => UserLikedPostsCreateWithoutUserInputSchema).array(),z.lazy(() => UserLikedPostsUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserLikedPostsUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserLikedPostsCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserLikedPostsCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserLikedPostsUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserLikedPostsUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserLikedPostsCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserLikedPostsWhereUniqueInputSchema),z.lazy(() => UserLikedPostsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserLikedPostsWhereUniqueInputSchema),z.lazy(() => UserLikedPostsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserLikedPostsWhereUniqueInputSchema),z.lazy(() => UserLikedPostsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserLikedPostsWhereUniqueInputSchema),z.lazy(() => UserLikedPostsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserLikedPostsUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserLikedPostsUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserLikedPostsUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserLikedPostsUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserLikedPostsScalarWhereInputSchema),z.lazy(() => UserLikedPostsScalarWhereInputSchema).array() ]).optional(),
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

export const UserLikeCommentsUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserLikeCommentsUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserLikeCommentsCreateWithoutUserInputSchema),z.lazy(() => UserLikeCommentsCreateWithoutUserInputSchema).array(),z.lazy(() => UserLikeCommentsUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserLikeCommentsUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserLikeCommentsCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserLikeCommentsCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserLikeCommentsUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserLikeCommentsUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserLikeCommentsCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserLikeCommentsWhereUniqueInputSchema),z.lazy(() => UserLikeCommentsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserLikeCommentsWhereUniqueInputSchema),z.lazy(() => UserLikeCommentsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserLikeCommentsWhereUniqueInputSchema),z.lazy(() => UserLikeCommentsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserLikeCommentsWhereUniqueInputSchema),z.lazy(() => UserLikeCommentsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserLikeCommentsUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserLikeCommentsUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserLikeCommentsUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserLikeCommentsUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserLikeCommentsScalarWhereInputSchema),z.lazy(() => UserLikeCommentsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UsersRolesUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UsersRolesUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UsersRolesCreateWithoutUserInputSchema),z.lazy(() => UsersRolesCreateWithoutUserInputSchema).array(),z.lazy(() => UsersRolesUncheckedCreateWithoutUserInputSchema),z.lazy(() => UsersRolesUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UsersRolesCreateOrConnectWithoutUserInputSchema),z.lazy(() => UsersRolesCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UsersRolesUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UsersRolesUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UsersRolesCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UsersRolesWhereUniqueInputSchema),z.lazy(() => UsersRolesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UsersRolesWhereUniqueInputSchema),z.lazy(() => UsersRolesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UsersRolesWhereUniqueInputSchema),z.lazy(() => UsersRolesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UsersRolesWhereUniqueInputSchema),z.lazy(() => UsersRolesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UsersRolesUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UsersRolesUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UsersRolesUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UsersRolesUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UsersRolesScalarWhereInputSchema),z.lazy(() => UsersRolesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UsersPermissionsUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UsersPermissionsUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UsersPermissionsCreateWithoutUserInputSchema),z.lazy(() => UsersPermissionsCreateWithoutUserInputSchema).array(),z.lazy(() => UsersPermissionsUncheckedCreateWithoutUserInputSchema),z.lazy(() => UsersPermissionsUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UsersPermissionsCreateOrConnectWithoutUserInputSchema),z.lazy(() => UsersPermissionsCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UsersPermissionsUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UsersPermissionsUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UsersPermissionsCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UsersPermissionsWhereUniqueInputSchema),z.lazy(() => UsersPermissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UsersPermissionsWhereUniqueInputSchema),z.lazy(() => UsersPermissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UsersPermissionsWhereUniqueInputSchema),z.lazy(() => UsersPermissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UsersPermissionsWhereUniqueInputSchema),z.lazy(() => UsersPermissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UsersPermissionsUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UsersPermissionsUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UsersPermissionsUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UsersPermissionsUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UsersPermissionsScalarWhereInputSchema),z.lazy(() => UsersPermissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserLikedPostsUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserLikedPostsUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserLikedPostsCreateWithoutUserInputSchema),z.lazy(() => UserLikedPostsCreateWithoutUserInputSchema).array(),z.lazy(() => UserLikedPostsUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserLikedPostsUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserLikedPostsCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserLikedPostsCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserLikedPostsUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserLikedPostsUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserLikedPostsCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserLikedPostsWhereUniqueInputSchema),z.lazy(() => UserLikedPostsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserLikedPostsWhereUniqueInputSchema),z.lazy(() => UserLikedPostsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserLikedPostsWhereUniqueInputSchema),z.lazy(() => UserLikedPostsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserLikedPostsWhereUniqueInputSchema),z.lazy(() => UserLikedPostsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserLikedPostsUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserLikedPostsUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserLikedPostsUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserLikedPostsUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserLikedPostsScalarWhereInputSchema),z.lazy(() => UserLikedPostsScalarWhereInputSchema).array() ]).optional(),
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

export const UserCreateNestedOneWithoutLikeCommentsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutLikeCommentsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutLikeCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutLikeCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutLikeCommentsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const CommentCreateNestedOneWithoutLikesInputSchema: z.ZodType<Prisma.CommentCreateNestedOneWithoutLikesInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutLikesInputSchema),z.lazy(() => CommentUncheckedCreateWithoutLikesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CommentCreateOrConnectWithoutLikesInputSchema).optional(),
  connect: z.lazy(() => CommentWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutLikeCommentsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutLikeCommentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutLikeCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutLikeCommentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutLikeCommentsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutLikeCommentsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutLikeCommentsInputSchema),z.lazy(() => UserUpdateWithoutLikeCommentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutLikeCommentsInputSchema) ]).optional(),
}).strict();

export const CommentUpdateOneRequiredWithoutLikesNestedInputSchema: z.ZodType<Prisma.CommentUpdateOneRequiredWithoutLikesNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutLikesInputSchema),z.lazy(() => CommentUncheckedCreateWithoutLikesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CommentCreateOrConnectWithoutLikesInputSchema).optional(),
  upsert: z.lazy(() => CommentUpsertWithoutLikesInputSchema).optional(),
  connect: z.lazy(() => CommentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CommentUpdateToOneWithWhereWithoutLikesInputSchema),z.lazy(() => CommentUpdateWithoutLikesInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutLikesInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutLikedPostsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutLikedPostsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutLikedPostsInputSchema),z.lazy(() => UserUncheckedCreateWithoutLikedPostsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutLikedPostsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const PostCreateNestedOneWithoutLikedUsersInputSchema: z.ZodType<Prisma.PostCreateNestedOneWithoutLikedUsersInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutLikedUsersInputSchema),z.lazy(() => PostUncheckedCreateWithoutLikedUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PostCreateOrConnectWithoutLikedUsersInputSchema).optional(),
  connect: z.lazy(() => PostWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutLikedPostsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutLikedPostsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutLikedPostsInputSchema),z.lazy(() => UserUncheckedCreateWithoutLikedPostsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutLikedPostsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutLikedPostsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutLikedPostsInputSchema),z.lazy(() => UserUpdateWithoutLikedPostsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutLikedPostsInputSchema) ]).optional(),
}).strict();

export const PostUpdateOneRequiredWithoutLikedUsersNestedInputSchema: z.ZodType<Prisma.PostUpdateOneRequiredWithoutLikedUsersNestedInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutLikedUsersInputSchema),z.lazy(() => PostUncheckedCreateWithoutLikedUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PostCreateOrConnectWithoutLikedUsersInputSchema).optional(),
  upsert: z.lazy(() => PostUpsertWithoutLikedUsersInputSchema).optional(),
  connect: z.lazy(() => PostWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PostUpdateToOneWithWhereWithoutLikedUsersInputSchema),z.lazy(() => PostUpdateWithoutLikedUsersInputSchema),z.lazy(() => PostUncheckedUpdateWithoutLikedUsersInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutRolesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutRolesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRolesInputSchema),z.lazy(() => UserUncheckedCreateWithoutRolesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRolesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const RoleCreateNestedOneWithoutUsersInputSchema: z.ZodType<Prisma.RoleCreateNestedOneWithoutUsersInput> = z.object({
  create: z.union([ z.lazy(() => RoleCreateWithoutUsersInputSchema),z.lazy(() => RoleUncheckedCreateWithoutUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RoleCreateOrConnectWithoutUsersInputSchema).optional(),
  connect: z.lazy(() => RoleWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutRolesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutRolesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRolesInputSchema),z.lazy(() => UserUncheckedCreateWithoutRolesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRolesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutRolesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutRolesInputSchema),z.lazy(() => UserUpdateWithoutRolesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRolesInputSchema) ]).optional(),
}).strict();

export const RoleUpdateOneRequiredWithoutUsersNestedInputSchema: z.ZodType<Prisma.RoleUpdateOneRequiredWithoutUsersNestedInput> = z.object({
  create: z.union([ z.lazy(() => RoleCreateWithoutUsersInputSchema),z.lazy(() => RoleUncheckedCreateWithoutUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RoleCreateOrConnectWithoutUsersInputSchema).optional(),
  upsert: z.lazy(() => RoleUpsertWithoutUsersInputSchema).optional(),
  connect: z.lazy(() => RoleWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RoleUpdateToOneWithWhereWithoutUsersInputSchema),z.lazy(() => RoleUpdateWithoutUsersInputSchema),z.lazy(() => RoleUncheckedUpdateWithoutUsersInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutPermissionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutPermissionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPermissionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPermissionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPermissionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const PermissionCreateNestedOneWithoutUsersInputSchema: z.ZodType<Prisma.PermissionCreateNestedOneWithoutUsersInput> = z.object({
  create: z.union([ z.lazy(() => PermissionCreateWithoutUsersInputSchema),z.lazy(() => PermissionUncheckedCreateWithoutUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PermissionCreateOrConnectWithoutUsersInputSchema).optional(),
  connect: z.lazy(() => PermissionWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutPermissionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutPermissionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPermissionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPermissionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPermissionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutPermissionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutPermissionsInputSchema),z.lazy(() => UserUpdateWithoutPermissionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPermissionsInputSchema) ]).optional(),
}).strict();

export const PermissionUpdateOneRequiredWithoutUsersNestedInputSchema: z.ZodType<Prisma.PermissionUpdateOneRequiredWithoutUsersNestedInput> = z.object({
  create: z.union([ z.lazy(() => PermissionCreateWithoutUsersInputSchema),z.lazy(() => PermissionUncheckedCreateWithoutUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PermissionCreateOrConnectWithoutUsersInputSchema).optional(),
  upsert: z.lazy(() => PermissionUpsertWithoutUsersInputSchema).optional(),
  connect: z.lazy(() => PermissionWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PermissionUpdateToOneWithWhereWithoutUsersInputSchema),z.lazy(() => PermissionUpdateWithoutUsersInputSchema),z.lazy(() => PermissionUncheckedUpdateWithoutUsersInputSchema) ]).optional(),
}).strict();

export const RolesPermissionsCreateNestedManyWithoutRoleInputSchema: z.ZodType<Prisma.RolesPermissionsCreateNestedManyWithoutRoleInput> = z.object({
  create: z.union([ z.lazy(() => RolesPermissionsCreateWithoutRoleInputSchema),z.lazy(() => RolesPermissionsCreateWithoutRoleInputSchema).array(),z.lazy(() => RolesPermissionsUncheckedCreateWithoutRoleInputSchema),z.lazy(() => RolesPermissionsUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RolesPermissionsCreateOrConnectWithoutRoleInputSchema),z.lazy(() => RolesPermissionsCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RolesPermissionsCreateManyRoleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RolesPermissionsWhereUniqueInputSchema),z.lazy(() => RolesPermissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UsersRolesCreateNestedManyWithoutRoleInputSchema: z.ZodType<Prisma.UsersRolesCreateNestedManyWithoutRoleInput> = z.object({
  create: z.union([ z.lazy(() => UsersRolesCreateWithoutRoleInputSchema),z.lazy(() => UsersRolesCreateWithoutRoleInputSchema).array(),z.lazy(() => UsersRolesUncheckedCreateWithoutRoleInputSchema),z.lazy(() => UsersRolesUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UsersRolesCreateOrConnectWithoutRoleInputSchema),z.lazy(() => UsersRolesCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UsersRolesCreateManyRoleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UsersRolesWhereUniqueInputSchema),z.lazy(() => UsersRolesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RolesPermissionsUncheckedCreateNestedManyWithoutRoleInputSchema: z.ZodType<Prisma.RolesPermissionsUncheckedCreateNestedManyWithoutRoleInput> = z.object({
  create: z.union([ z.lazy(() => RolesPermissionsCreateWithoutRoleInputSchema),z.lazy(() => RolesPermissionsCreateWithoutRoleInputSchema).array(),z.lazy(() => RolesPermissionsUncheckedCreateWithoutRoleInputSchema),z.lazy(() => RolesPermissionsUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RolesPermissionsCreateOrConnectWithoutRoleInputSchema),z.lazy(() => RolesPermissionsCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RolesPermissionsCreateManyRoleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RolesPermissionsWhereUniqueInputSchema),z.lazy(() => RolesPermissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UsersRolesUncheckedCreateNestedManyWithoutRoleInputSchema: z.ZodType<Prisma.UsersRolesUncheckedCreateNestedManyWithoutRoleInput> = z.object({
  create: z.union([ z.lazy(() => UsersRolesCreateWithoutRoleInputSchema),z.lazy(() => UsersRolesCreateWithoutRoleInputSchema).array(),z.lazy(() => UsersRolesUncheckedCreateWithoutRoleInputSchema),z.lazy(() => UsersRolesUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UsersRolesCreateOrConnectWithoutRoleInputSchema),z.lazy(() => UsersRolesCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UsersRolesCreateManyRoleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UsersRolesWhereUniqueInputSchema),z.lazy(() => UsersRolesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RolesPermissionsUpdateManyWithoutRoleNestedInputSchema: z.ZodType<Prisma.RolesPermissionsUpdateManyWithoutRoleNestedInput> = z.object({
  create: z.union([ z.lazy(() => RolesPermissionsCreateWithoutRoleInputSchema),z.lazy(() => RolesPermissionsCreateWithoutRoleInputSchema).array(),z.lazy(() => RolesPermissionsUncheckedCreateWithoutRoleInputSchema),z.lazy(() => RolesPermissionsUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RolesPermissionsCreateOrConnectWithoutRoleInputSchema),z.lazy(() => RolesPermissionsCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RolesPermissionsUpsertWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => RolesPermissionsUpsertWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RolesPermissionsCreateManyRoleInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RolesPermissionsWhereUniqueInputSchema),z.lazy(() => RolesPermissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RolesPermissionsWhereUniqueInputSchema),z.lazy(() => RolesPermissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RolesPermissionsWhereUniqueInputSchema),z.lazy(() => RolesPermissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RolesPermissionsWhereUniqueInputSchema),z.lazy(() => RolesPermissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RolesPermissionsUpdateWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => RolesPermissionsUpdateWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RolesPermissionsUpdateManyWithWhereWithoutRoleInputSchema),z.lazy(() => RolesPermissionsUpdateManyWithWhereWithoutRoleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RolesPermissionsScalarWhereInputSchema),z.lazy(() => RolesPermissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UsersRolesUpdateManyWithoutRoleNestedInputSchema: z.ZodType<Prisma.UsersRolesUpdateManyWithoutRoleNestedInput> = z.object({
  create: z.union([ z.lazy(() => UsersRolesCreateWithoutRoleInputSchema),z.lazy(() => UsersRolesCreateWithoutRoleInputSchema).array(),z.lazy(() => UsersRolesUncheckedCreateWithoutRoleInputSchema),z.lazy(() => UsersRolesUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UsersRolesCreateOrConnectWithoutRoleInputSchema),z.lazy(() => UsersRolesCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UsersRolesUpsertWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => UsersRolesUpsertWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UsersRolesCreateManyRoleInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UsersRolesWhereUniqueInputSchema),z.lazy(() => UsersRolesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UsersRolesWhereUniqueInputSchema),z.lazy(() => UsersRolesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UsersRolesWhereUniqueInputSchema),z.lazy(() => UsersRolesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UsersRolesWhereUniqueInputSchema),z.lazy(() => UsersRolesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UsersRolesUpdateWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => UsersRolesUpdateWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UsersRolesUpdateManyWithWhereWithoutRoleInputSchema),z.lazy(() => UsersRolesUpdateManyWithWhereWithoutRoleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UsersRolesScalarWhereInputSchema),z.lazy(() => UsersRolesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RolesPermissionsUncheckedUpdateManyWithoutRoleNestedInputSchema: z.ZodType<Prisma.RolesPermissionsUncheckedUpdateManyWithoutRoleNestedInput> = z.object({
  create: z.union([ z.lazy(() => RolesPermissionsCreateWithoutRoleInputSchema),z.lazy(() => RolesPermissionsCreateWithoutRoleInputSchema).array(),z.lazy(() => RolesPermissionsUncheckedCreateWithoutRoleInputSchema),z.lazy(() => RolesPermissionsUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RolesPermissionsCreateOrConnectWithoutRoleInputSchema),z.lazy(() => RolesPermissionsCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RolesPermissionsUpsertWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => RolesPermissionsUpsertWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RolesPermissionsCreateManyRoleInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RolesPermissionsWhereUniqueInputSchema),z.lazy(() => RolesPermissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RolesPermissionsWhereUniqueInputSchema),z.lazy(() => RolesPermissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RolesPermissionsWhereUniqueInputSchema),z.lazy(() => RolesPermissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RolesPermissionsWhereUniqueInputSchema),z.lazy(() => RolesPermissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RolesPermissionsUpdateWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => RolesPermissionsUpdateWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RolesPermissionsUpdateManyWithWhereWithoutRoleInputSchema),z.lazy(() => RolesPermissionsUpdateManyWithWhereWithoutRoleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RolesPermissionsScalarWhereInputSchema),z.lazy(() => RolesPermissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UsersRolesUncheckedUpdateManyWithoutRoleNestedInputSchema: z.ZodType<Prisma.UsersRolesUncheckedUpdateManyWithoutRoleNestedInput> = z.object({
  create: z.union([ z.lazy(() => UsersRolesCreateWithoutRoleInputSchema),z.lazy(() => UsersRolesCreateWithoutRoleInputSchema).array(),z.lazy(() => UsersRolesUncheckedCreateWithoutRoleInputSchema),z.lazy(() => UsersRolesUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UsersRolesCreateOrConnectWithoutRoleInputSchema),z.lazy(() => UsersRolesCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UsersRolesUpsertWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => UsersRolesUpsertWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UsersRolesCreateManyRoleInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UsersRolesWhereUniqueInputSchema),z.lazy(() => UsersRolesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UsersRolesWhereUniqueInputSchema),z.lazy(() => UsersRolesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UsersRolesWhereUniqueInputSchema),z.lazy(() => UsersRolesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UsersRolesWhereUniqueInputSchema),z.lazy(() => UsersRolesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UsersRolesUpdateWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => UsersRolesUpdateWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UsersRolesUpdateManyWithWhereWithoutRoleInputSchema),z.lazy(() => UsersRolesUpdateManyWithWhereWithoutRoleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UsersRolesScalarWhereInputSchema),z.lazy(() => UsersRolesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RolesPermissionsCreateNestedManyWithoutPermissionInputSchema: z.ZodType<Prisma.RolesPermissionsCreateNestedManyWithoutPermissionInput> = z.object({
  create: z.union([ z.lazy(() => RolesPermissionsCreateWithoutPermissionInputSchema),z.lazy(() => RolesPermissionsCreateWithoutPermissionInputSchema).array(),z.lazy(() => RolesPermissionsUncheckedCreateWithoutPermissionInputSchema),z.lazy(() => RolesPermissionsUncheckedCreateWithoutPermissionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RolesPermissionsCreateOrConnectWithoutPermissionInputSchema),z.lazy(() => RolesPermissionsCreateOrConnectWithoutPermissionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RolesPermissionsCreateManyPermissionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RolesPermissionsWhereUniqueInputSchema),z.lazy(() => RolesPermissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UsersPermissionsCreateNestedManyWithoutPermissionInputSchema: z.ZodType<Prisma.UsersPermissionsCreateNestedManyWithoutPermissionInput> = z.object({
  create: z.union([ z.lazy(() => UsersPermissionsCreateWithoutPermissionInputSchema),z.lazy(() => UsersPermissionsCreateWithoutPermissionInputSchema).array(),z.lazy(() => UsersPermissionsUncheckedCreateWithoutPermissionInputSchema),z.lazy(() => UsersPermissionsUncheckedCreateWithoutPermissionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UsersPermissionsCreateOrConnectWithoutPermissionInputSchema),z.lazy(() => UsersPermissionsCreateOrConnectWithoutPermissionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UsersPermissionsCreateManyPermissionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UsersPermissionsWhereUniqueInputSchema),z.lazy(() => UsersPermissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RolesPermissionsUncheckedCreateNestedManyWithoutPermissionInputSchema: z.ZodType<Prisma.RolesPermissionsUncheckedCreateNestedManyWithoutPermissionInput> = z.object({
  create: z.union([ z.lazy(() => RolesPermissionsCreateWithoutPermissionInputSchema),z.lazy(() => RolesPermissionsCreateWithoutPermissionInputSchema).array(),z.lazy(() => RolesPermissionsUncheckedCreateWithoutPermissionInputSchema),z.lazy(() => RolesPermissionsUncheckedCreateWithoutPermissionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RolesPermissionsCreateOrConnectWithoutPermissionInputSchema),z.lazy(() => RolesPermissionsCreateOrConnectWithoutPermissionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RolesPermissionsCreateManyPermissionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RolesPermissionsWhereUniqueInputSchema),z.lazy(() => RolesPermissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UsersPermissionsUncheckedCreateNestedManyWithoutPermissionInputSchema: z.ZodType<Prisma.UsersPermissionsUncheckedCreateNestedManyWithoutPermissionInput> = z.object({
  create: z.union([ z.lazy(() => UsersPermissionsCreateWithoutPermissionInputSchema),z.lazy(() => UsersPermissionsCreateWithoutPermissionInputSchema).array(),z.lazy(() => UsersPermissionsUncheckedCreateWithoutPermissionInputSchema),z.lazy(() => UsersPermissionsUncheckedCreateWithoutPermissionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UsersPermissionsCreateOrConnectWithoutPermissionInputSchema),z.lazy(() => UsersPermissionsCreateOrConnectWithoutPermissionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UsersPermissionsCreateManyPermissionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UsersPermissionsWhereUniqueInputSchema),z.lazy(() => UsersPermissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RolesPermissionsUpdateManyWithoutPermissionNestedInputSchema: z.ZodType<Prisma.RolesPermissionsUpdateManyWithoutPermissionNestedInput> = z.object({
  create: z.union([ z.lazy(() => RolesPermissionsCreateWithoutPermissionInputSchema),z.lazy(() => RolesPermissionsCreateWithoutPermissionInputSchema).array(),z.lazy(() => RolesPermissionsUncheckedCreateWithoutPermissionInputSchema),z.lazy(() => RolesPermissionsUncheckedCreateWithoutPermissionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RolesPermissionsCreateOrConnectWithoutPermissionInputSchema),z.lazy(() => RolesPermissionsCreateOrConnectWithoutPermissionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RolesPermissionsUpsertWithWhereUniqueWithoutPermissionInputSchema),z.lazy(() => RolesPermissionsUpsertWithWhereUniqueWithoutPermissionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RolesPermissionsCreateManyPermissionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RolesPermissionsWhereUniqueInputSchema),z.lazy(() => RolesPermissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RolesPermissionsWhereUniqueInputSchema),z.lazy(() => RolesPermissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RolesPermissionsWhereUniqueInputSchema),z.lazy(() => RolesPermissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RolesPermissionsWhereUniqueInputSchema),z.lazy(() => RolesPermissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RolesPermissionsUpdateWithWhereUniqueWithoutPermissionInputSchema),z.lazy(() => RolesPermissionsUpdateWithWhereUniqueWithoutPermissionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RolesPermissionsUpdateManyWithWhereWithoutPermissionInputSchema),z.lazy(() => RolesPermissionsUpdateManyWithWhereWithoutPermissionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RolesPermissionsScalarWhereInputSchema),z.lazy(() => RolesPermissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UsersPermissionsUpdateManyWithoutPermissionNestedInputSchema: z.ZodType<Prisma.UsersPermissionsUpdateManyWithoutPermissionNestedInput> = z.object({
  create: z.union([ z.lazy(() => UsersPermissionsCreateWithoutPermissionInputSchema),z.lazy(() => UsersPermissionsCreateWithoutPermissionInputSchema).array(),z.lazy(() => UsersPermissionsUncheckedCreateWithoutPermissionInputSchema),z.lazy(() => UsersPermissionsUncheckedCreateWithoutPermissionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UsersPermissionsCreateOrConnectWithoutPermissionInputSchema),z.lazy(() => UsersPermissionsCreateOrConnectWithoutPermissionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UsersPermissionsUpsertWithWhereUniqueWithoutPermissionInputSchema),z.lazy(() => UsersPermissionsUpsertWithWhereUniqueWithoutPermissionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UsersPermissionsCreateManyPermissionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UsersPermissionsWhereUniqueInputSchema),z.lazy(() => UsersPermissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UsersPermissionsWhereUniqueInputSchema),z.lazy(() => UsersPermissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UsersPermissionsWhereUniqueInputSchema),z.lazy(() => UsersPermissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UsersPermissionsWhereUniqueInputSchema),z.lazy(() => UsersPermissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UsersPermissionsUpdateWithWhereUniqueWithoutPermissionInputSchema),z.lazy(() => UsersPermissionsUpdateWithWhereUniqueWithoutPermissionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UsersPermissionsUpdateManyWithWhereWithoutPermissionInputSchema),z.lazy(() => UsersPermissionsUpdateManyWithWhereWithoutPermissionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UsersPermissionsScalarWhereInputSchema),z.lazy(() => UsersPermissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RolesPermissionsUncheckedUpdateManyWithoutPermissionNestedInputSchema: z.ZodType<Prisma.RolesPermissionsUncheckedUpdateManyWithoutPermissionNestedInput> = z.object({
  create: z.union([ z.lazy(() => RolesPermissionsCreateWithoutPermissionInputSchema),z.lazy(() => RolesPermissionsCreateWithoutPermissionInputSchema).array(),z.lazy(() => RolesPermissionsUncheckedCreateWithoutPermissionInputSchema),z.lazy(() => RolesPermissionsUncheckedCreateWithoutPermissionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RolesPermissionsCreateOrConnectWithoutPermissionInputSchema),z.lazy(() => RolesPermissionsCreateOrConnectWithoutPermissionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RolesPermissionsUpsertWithWhereUniqueWithoutPermissionInputSchema),z.lazy(() => RolesPermissionsUpsertWithWhereUniqueWithoutPermissionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RolesPermissionsCreateManyPermissionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RolesPermissionsWhereUniqueInputSchema),z.lazy(() => RolesPermissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RolesPermissionsWhereUniqueInputSchema),z.lazy(() => RolesPermissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RolesPermissionsWhereUniqueInputSchema),z.lazy(() => RolesPermissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RolesPermissionsWhereUniqueInputSchema),z.lazy(() => RolesPermissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RolesPermissionsUpdateWithWhereUniqueWithoutPermissionInputSchema),z.lazy(() => RolesPermissionsUpdateWithWhereUniqueWithoutPermissionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RolesPermissionsUpdateManyWithWhereWithoutPermissionInputSchema),z.lazy(() => RolesPermissionsUpdateManyWithWhereWithoutPermissionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RolesPermissionsScalarWhereInputSchema),z.lazy(() => RolesPermissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UsersPermissionsUncheckedUpdateManyWithoutPermissionNestedInputSchema: z.ZodType<Prisma.UsersPermissionsUncheckedUpdateManyWithoutPermissionNestedInput> = z.object({
  create: z.union([ z.lazy(() => UsersPermissionsCreateWithoutPermissionInputSchema),z.lazy(() => UsersPermissionsCreateWithoutPermissionInputSchema).array(),z.lazy(() => UsersPermissionsUncheckedCreateWithoutPermissionInputSchema),z.lazy(() => UsersPermissionsUncheckedCreateWithoutPermissionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UsersPermissionsCreateOrConnectWithoutPermissionInputSchema),z.lazy(() => UsersPermissionsCreateOrConnectWithoutPermissionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UsersPermissionsUpsertWithWhereUniqueWithoutPermissionInputSchema),z.lazy(() => UsersPermissionsUpsertWithWhereUniqueWithoutPermissionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UsersPermissionsCreateManyPermissionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UsersPermissionsWhereUniqueInputSchema),z.lazy(() => UsersPermissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UsersPermissionsWhereUniqueInputSchema),z.lazy(() => UsersPermissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UsersPermissionsWhereUniqueInputSchema),z.lazy(() => UsersPermissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UsersPermissionsWhereUniqueInputSchema),z.lazy(() => UsersPermissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UsersPermissionsUpdateWithWhereUniqueWithoutPermissionInputSchema),z.lazy(() => UsersPermissionsUpdateWithWhereUniqueWithoutPermissionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UsersPermissionsUpdateManyWithWhereWithoutPermissionInputSchema),z.lazy(() => UsersPermissionsUpdateManyWithWhereWithoutPermissionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UsersPermissionsScalarWhereInputSchema),z.lazy(() => UsersPermissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RoleCreateNestedOneWithoutPermissionsInputSchema: z.ZodType<Prisma.RoleCreateNestedOneWithoutPermissionsInput> = z.object({
  create: z.union([ z.lazy(() => RoleCreateWithoutPermissionsInputSchema),z.lazy(() => RoleUncheckedCreateWithoutPermissionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RoleCreateOrConnectWithoutPermissionsInputSchema).optional(),
  connect: z.lazy(() => RoleWhereUniqueInputSchema).optional()
}).strict();

export const PermissionCreateNestedOneWithoutRolesInputSchema: z.ZodType<Prisma.PermissionCreateNestedOneWithoutRolesInput> = z.object({
  create: z.union([ z.lazy(() => PermissionCreateWithoutRolesInputSchema),z.lazy(() => PermissionUncheckedCreateWithoutRolesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PermissionCreateOrConnectWithoutRolesInputSchema).optional(),
  connect: z.lazy(() => PermissionWhereUniqueInputSchema).optional()
}).strict();

export const RoleUpdateOneRequiredWithoutPermissionsNestedInputSchema: z.ZodType<Prisma.RoleUpdateOneRequiredWithoutPermissionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => RoleCreateWithoutPermissionsInputSchema),z.lazy(() => RoleUncheckedCreateWithoutPermissionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RoleCreateOrConnectWithoutPermissionsInputSchema).optional(),
  upsert: z.lazy(() => RoleUpsertWithoutPermissionsInputSchema).optional(),
  connect: z.lazy(() => RoleWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RoleUpdateToOneWithWhereWithoutPermissionsInputSchema),z.lazy(() => RoleUpdateWithoutPermissionsInputSchema),z.lazy(() => RoleUncheckedUpdateWithoutPermissionsInputSchema) ]).optional(),
}).strict();

export const PermissionUpdateOneRequiredWithoutRolesNestedInputSchema: z.ZodType<Prisma.PermissionUpdateOneRequiredWithoutRolesNestedInput> = z.object({
  create: z.union([ z.lazy(() => PermissionCreateWithoutRolesInputSchema),z.lazy(() => PermissionUncheckedCreateWithoutRolesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PermissionCreateOrConnectWithoutRolesInputSchema).optional(),
  upsert: z.lazy(() => PermissionUpsertWithoutRolesInputSchema).optional(),
  connect: z.lazy(() => PermissionWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PermissionUpdateToOneWithWhereWithoutRolesInputSchema),z.lazy(() => PermissionUpdateWithoutRolesInputSchema),z.lazy(() => PermissionUncheckedUpdateWithoutRolesInputSchema) ]).optional(),
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

export const UserLikedPostsCreateNestedManyWithoutPostInputSchema: z.ZodType<Prisma.UserLikedPostsCreateNestedManyWithoutPostInput> = z.object({
  create: z.union([ z.lazy(() => UserLikedPostsCreateWithoutPostInputSchema),z.lazy(() => UserLikedPostsCreateWithoutPostInputSchema).array(),z.lazy(() => UserLikedPostsUncheckedCreateWithoutPostInputSchema),z.lazy(() => UserLikedPostsUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserLikedPostsCreateOrConnectWithoutPostInputSchema),z.lazy(() => UserLikedPostsCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserLikedPostsCreateManyPostInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserLikedPostsWhereUniqueInputSchema),z.lazy(() => UserLikedPostsWhereUniqueInputSchema).array() ]).optional(),
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

export const UserLikedPostsUncheckedCreateNestedManyWithoutPostInputSchema: z.ZodType<Prisma.UserLikedPostsUncheckedCreateNestedManyWithoutPostInput> = z.object({
  create: z.union([ z.lazy(() => UserLikedPostsCreateWithoutPostInputSchema),z.lazy(() => UserLikedPostsCreateWithoutPostInputSchema).array(),z.lazy(() => UserLikedPostsUncheckedCreateWithoutPostInputSchema),z.lazy(() => UserLikedPostsUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserLikedPostsCreateOrConnectWithoutPostInputSchema),z.lazy(() => UserLikedPostsCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserLikedPostsCreateManyPostInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserLikedPostsWhereUniqueInputSchema),z.lazy(() => UserLikedPostsWhereUniqueInputSchema).array() ]).optional(),
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
  disconnect: z.union([ z.boolean(),z.lazy(() => MediaEntityWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => MediaEntityWhereInputSchema) ]).optional(),
  connect: z.lazy(() => MediaEntityWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => MediaEntityUpdateToOneWithWhereWithoutPostInputSchema),z.lazy(() => MediaEntityUpdateWithoutPostInputSchema),z.lazy(() => MediaEntityUncheckedUpdateWithoutPostInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneWithoutPostsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutPostsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPostsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPostsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPostsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutPostsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutPostsInputSchema),z.lazy(() => UserUpdateWithoutPostsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPostsInputSchema) ]).optional(),
}).strict();

export const UserLikedPostsUpdateManyWithoutPostNestedInputSchema: z.ZodType<Prisma.UserLikedPostsUpdateManyWithoutPostNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserLikedPostsCreateWithoutPostInputSchema),z.lazy(() => UserLikedPostsCreateWithoutPostInputSchema).array(),z.lazy(() => UserLikedPostsUncheckedCreateWithoutPostInputSchema),z.lazy(() => UserLikedPostsUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserLikedPostsCreateOrConnectWithoutPostInputSchema),z.lazy(() => UserLikedPostsCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserLikedPostsUpsertWithWhereUniqueWithoutPostInputSchema),z.lazy(() => UserLikedPostsUpsertWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserLikedPostsCreateManyPostInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserLikedPostsWhereUniqueInputSchema),z.lazy(() => UserLikedPostsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserLikedPostsWhereUniqueInputSchema),z.lazy(() => UserLikedPostsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserLikedPostsWhereUniqueInputSchema),z.lazy(() => UserLikedPostsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserLikedPostsWhereUniqueInputSchema),z.lazy(() => UserLikedPostsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserLikedPostsUpdateWithWhereUniqueWithoutPostInputSchema),z.lazy(() => UserLikedPostsUpdateWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserLikedPostsUpdateManyWithWhereWithoutPostInputSchema),z.lazy(() => UserLikedPostsUpdateManyWithWhereWithoutPostInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserLikedPostsScalarWhereInputSchema),z.lazy(() => UserLikedPostsScalarWhereInputSchema).array() ]).optional(),
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

export const UserLikedPostsUncheckedUpdateManyWithoutPostNestedInputSchema: z.ZodType<Prisma.UserLikedPostsUncheckedUpdateManyWithoutPostNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserLikedPostsCreateWithoutPostInputSchema),z.lazy(() => UserLikedPostsCreateWithoutPostInputSchema).array(),z.lazy(() => UserLikedPostsUncheckedCreateWithoutPostInputSchema),z.lazy(() => UserLikedPostsUncheckedCreateWithoutPostInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserLikedPostsCreateOrConnectWithoutPostInputSchema),z.lazy(() => UserLikedPostsCreateOrConnectWithoutPostInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserLikedPostsUpsertWithWhereUniqueWithoutPostInputSchema),z.lazy(() => UserLikedPostsUpsertWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserLikedPostsCreateManyPostInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserLikedPostsWhereUniqueInputSchema),z.lazy(() => UserLikedPostsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserLikedPostsWhereUniqueInputSchema),z.lazy(() => UserLikedPostsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserLikedPostsWhereUniqueInputSchema),z.lazy(() => UserLikedPostsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserLikedPostsWhereUniqueInputSchema),z.lazy(() => UserLikedPostsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserLikedPostsUpdateWithWhereUniqueWithoutPostInputSchema),z.lazy(() => UserLikedPostsUpdateWithWhereUniqueWithoutPostInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserLikedPostsUpdateManyWithWhereWithoutPostInputSchema),z.lazy(() => UserLikedPostsUpdateManyWithWhereWithoutPostInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserLikedPostsScalarWhereInputSchema),z.lazy(() => UserLikedPostsScalarWhereInputSchema).array() ]).optional(),
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

export const UserLikeCommentsCreateNestedManyWithoutCommentInputSchema: z.ZodType<Prisma.UserLikeCommentsCreateNestedManyWithoutCommentInput> = z.object({
  create: z.union([ z.lazy(() => UserLikeCommentsCreateWithoutCommentInputSchema),z.lazy(() => UserLikeCommentsCreateWithoutCommentInputSchema).array(),z.lazy(() => UserLikeCommentsUncheckedCreateWithoutCommentInputSchema),z.lazy(() => UserLikeCommentsUncheckedCreateWithoutCommentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserLikeCommentsCreateOrConnectWithoutCommentInputSchema),z.lazy(() => UserLikeCommentsCreateOrConnectWithoutCommentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserLikeCommentsCreateManyCommentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserLikeCommentsWhereUniqueInputSchema),z.lazy(() => UserLikeCommentsWhereUniqueInputSchema).array() ]).optional(),
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

export const UserLikeCommentsUncheckedCreateNestedManyWithoutCommentInputSchema: z.ZodType<Prisma.UserLikeCommentsUncheckedCreateNestedManyWithoutCommentInput> = z.object({
  create: z.union([ z.lazy(() => UserLikeCommentsCreateWithoutCommentInputSchema),z.lazy(() => UserLikeCommentsCreateWithoutCommentInputSchema).array(),z.lazy(() => UserLikeCommentsUncheckedCreateWithoutCommentInputSchema),z.lazy(() => UserLikeCommentsUncheckedCreateWithoutCommentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserLikeCommentsCreateOrConnectWithoutCommentInputSchema),z.lazy(() => UserLikeCommentsCreateOrConnectWithoutCommentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserLikeCommentsCreateManyCommentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserLikeCommentsWhereUniqueInputSchema),z.lazy(() => UserLikeCommentsWhereUniqueInputSchema).array() ]).optional(),
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
  disconnect: z.union([ z.boolean(),z.lazy(() => PostWhereInputSchema) ]).optional(),
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

export const UserLikeCommentsUpdateManyWithoutCommentNestedInputSchema: z.ZodType<Prisma.UserLikeCommentsUpdateManyWithoutCommentNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserLikeCommentsCreateWithoutCommentInputSchema),z.lazy(() => UserLikeCommentsCreateWithoutCommentInputSchema).array(),z.lazy(() => UserLikeCommentsUncheckedCreateWithoutCommentInputSchema),z.lazy(() => UserLikeCommentsUncheckedCreateWithoutCommentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserLikeCommentsCreateOrConnectWithoutCommentInputSchema),z.lazy(() => UserLikeCommentsCreateOrConnectWithoutCommentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserLikeCommentsUpsertWithWhereUniqueWithoutCommentInputSchema),z.lazy(() => UserLikeCommentsUpsertWithWhereUniqueWithoutCommentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserLikeCommentsCreateManyCommentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserLikeCommentsWhereUniqueInputSchema),z.lazy(() => UserLikeCommentsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserLikeCommentsWhereUniqueInputSchema),z.lazy(() => UserLikeCommentsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserLikeCommentsWhereUniqueInputSchema),z.lazy(() => UserLikeCommentsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserLikeCommentsWhereUniqueInputSchema),z.lazy(() => UserLikeCommentsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserLikeCommentsUpdateWithWhereUniqueWithoutCommentInputSchema),z.lazy(() => UserLikeCommentsUpdateWithWhereUniqueWithoutCommentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserLikeCommentsUpdateManyWithWhereWithoutCommentInputSchema),z.lazy(() => UserLikeCommentsUpdateManyWithWhereWithoutCommentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserLikeCommentsScalarWhereInputSchema),z.lazy(() => UserLikeCommentsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommentUpdateOneWithoutRepliesNestedInputSchema: z.ZodType<Prisma.CommentUpdateOneWithoutRepliesNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommentCreateWithoutRepliesInputSchema),z.lazy(() => CommentUncheckedCreateWithoutRepliesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CommentCreateOrConnectWithoutRepliesInputSchema).optional(),
  upsert: z.lazy(() => CommentUpsertWithoutRepliesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => CommentWhereInputSchema) ]).optional(),
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

export const UserLikeCommentsUncheckedUpdateManyWithoutCommentNestedInputSchema: z.ZodType<Prisma.UserLikeCommentsUncheckedUpdateManyWithoutCommentNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserLikeCommentsCreateWithoutCommentInputSchema),z.lazy(() => UserLikeCommentsCreateWithoutCommentInputSchema).array(),z.lazy(() => UserLikeCommentsUncheckedCreateWithoutCommentInputSchema),z.lazy(() => UserLikeCommentsUncheckedCreateWithoutCommentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserLikeCommentsCreateOrConnectWithoutCommentInputSchema),z.lazy(() => UserLikeCommentsCreateOrConnectWithoutCommentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserLikeCommentsUpsertWithWhereUniqueWithoutCommentInputSchema),z.lazy(() => UserLikeCommentsUpsertWithWhereUniqueWithoutCommentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserLikeCommentsCreateManyCommentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserLikeCommentsWhereUniqueInputSchema),z.lazy(() => UserLikeCommentsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserLikeCommentsWhereUniqueInputSchema),z.lazy(() => UserLikeCommentsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserLikeCommentsWhereUniqueInputSchema),z.lazy(() => UserLikeCommentsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserLikeCommentsWhereUniqueInputSchema),z.lazy(() => UserLikeCommentsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserLikeCommentsUpdateWithWhereUniqueWithoutCommentInputSchema),z.lazy(() => UserLikeCommentsUpdateWithWhereUniqueWithoutCommentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserLikeCommentsUpdateManyWithWhereWithoutCommentInputSchema),z.lazy(() => UserLikeCommentsUpdateManyWithWhereWithoutCommentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserLikeCommentsScalarWhereInputSchema),z.lazy(() => UserLikeCommentsScalarWhereInputSchema).array() ]).optional(),
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
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
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
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValue.optional().nullable(),
  array_starts_with: InputJsonValue.optional().nullable(),
  array_ends_with: InputJsonValue.optional().nullable(),
  lt: InputJsonValue.optional(),
  lte: InputJsonValue.optional(),
  gt: InputJsonValue.optional(),
  gte: InputJsonValue.optional(),
  not: InputJsonValue.optional()
}).strict();

export const PostCreateWithoutAuthorInputSchema: z.ZodType<Prisma.PostCreateWithoutAuthorInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string().optional().nullable(),
  meta: z.string(),
  tags: z.union([ z.lazy(() => PostCreatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  thumbnail: z.lazy(() => MediaEntityCreateNestedOneWithoutPostInputSchema).optional(),
  likedUsers: z.lazy(() => UserLikedPostsCreateNestedManyWithoutPostInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutBelongsToInputSchema).optional(),
  translations: z.lazy(() => TranslationCreateNestedManyWithoutPostInputSchema).optional()
}).strict();

export const PostUncheckedCreateWithoutAuthorInputSchema: z.ZodType<Prisma.PostUncheckedCreateWithoutAuthorInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string().optional().nullable(),
  meta: z.string(),
  tags: z.union([ z.lazy(() => PostCreatetagsInputSchema),z.string().array() ]).optional(),
  thumbnailId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  likedUsers: z.lazy(() => UserLikedPostsUncheckedCreateNestedManyWithoutPostInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutBelongsToInputSchema).optional(),
  translations: z.lazy(() => TranslationUncheckedCreateNestedManyWithoutPostInputSchema).optional()
}).strict();

export const PostCreateOrConnectWithoutAuthorInputSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutAuthorInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PostCreateWithoutAuthorInputSchema),z.lazy(() => PostUncheckedCreateWithoutAuthorInputSchema) ]),
}).strict();

export const PostCreateManyAuthorInputEnvelopeSchema: z.ZodType<Prisma.PostCreateManyAuthorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PostCreateManyAuthorInputSchema),z.lazy(() => PostCreateManyAuthorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CommentCreateWithoutOwnerInputSchema: z.ZodType<Prisma.CommentCreateWithoutOwnerInput> = z.object({
  id: z.string().uuid().optional(),
  content: z.string(),
  chiefComment: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  belongsTo: z.lazy(() => PostCreateNestedOneWithoutCommentsInputSchema).optional(),
  likes: z.lazy(() => UserLikeCommentsCreateNestedManyWithoutCommentInputSchema).optional(),
  replyTo: z.lazy(() => CommentCreateNestedOneWithoutRepliesInputSchema).optional(),
  replies: z.lazy(() => CommentCreateNestedManyWithoutReplyToInputSchema).optional()
}).strict();

export const CommentUncheckedCreateWithoutOwnerInputSchema: z.ZodType<Prisma.CommentUncheckedCreateWithoutOwnerInput> = z.object({
  id: z.string().uuid().optional(),
  belongsToId: z.string().optional().nullable(),
  content: z.string(),
  repliedToID: z.string().optional().nullable(),
  chiefComment: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  likes: z.lazy(() => UserLikeCommentsUncheckedCreateNestedManyWithoutCommentInputSchema).optional(),
  replies: z.lazy(() => CommentUncheckedCreateNestedManyWithoutReplyToInputSchema).optional()
}).strict();

export const CommentCreateOrConnectWithoutOwnerInputSchema: z.ZodType<Prisma.CommentCreateOrConnectWithoutOwnerInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommentCreateWithoutOwnerInputSchema),z.lazy(() => CommentUncheckedCreateWithoutOwnerInputSchema) ]),
}).strict();

export const CommentCreateManyOwnerInputEnvelopeSchema: z.ZodType<Prisma.CommentCreateManyOwnerInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CommentCreateManyOwnerInputSchema),z.lazy(() => CommentCreateManyOwnerInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserLikeCommentsCreateWithoutUserInputSchema: z.ZodType<Prisma.UserLikeCommentsCreateWithoutUserInput> = z.object({
  assignedAt: z.coerce.date().optional(),
  assignedBy: z.string(),
  comment: z.lazy(() => CommentCreateNestedOneWithoutLikesInputSchema)
}).strict();

export const UserLikeCommentsUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.UserLikeCommentsUncheckedCreateWithoutUserInput> = z.object({
  commentId: z.string(),
  assignedAt: z.coerce.date().optional(),
  assignedBy: z.string()
}).strict();

export const UserLikeCommentsCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.UserLikeCommentsCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => UserLikeCommentsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserLikeCommentsCreateWithoutUserInputSchema),z.lazy(() => UserLikeCommentsUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserLikeCommentsCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.UserLikeCommentsCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserLikeCommentsCreateManyUserInputSchema),z.lazy(() => UserLikeCommentsCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UsersRolesCreateWithoutUserInputSchema: z.ZodType<Prisma.UsersRolesCreateWithoutUserInput> = z.object({
  assignedAt: z.coerce.date().optional(),
  assignedBy: z.string(),
  role: z.lazy(() => RoleCreateNestedOneWithoutUsersInputSchema)
}).strict();

export const UsersRolesUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.UsersRolesUncheckedCreateWithoutUserInput> = z.object({
  roleId: z.string(),
  assignedAt: z.coerce.date().optional(),
  assignedBy: z.string()
}).strict();

export const UsersRolesCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.UsersRolesCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => UsersRolesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UsersRolesCreateWithoutUserInputSchema),z.lazy(() => UsersRolesUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UsersRolesCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.UsersRolesCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UsersRolesCreateManyUserInputSchema),z.lazy(() => UsersRolesCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UsersPermissionsCreateWithoutUserInputSchema: z.ZodType<Prisma.UsersPermissionsCreateWithoutUserInput> = z.object({
  assignedAt: z.coerce.date().optional(),
  assignedBy: z.string(),
  permission: z.lazy(() => PermissionCreateNestedOneWithoutUsersInputSchema)
}).strict();

export const UsersPermissionsUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.UsersPermissionsUncheckedCreateWithoutUserInput> = z.object({
  permissionId: z.string(),
  assignedAt: z.coerce.date().optional(),
  assignedBy: z.string()
}).strict();

export const UsersPermissionsCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.UsersPermissionsCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => UsersPermissionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UsersPermissionsCreateWithoutUserInputSchema),z.lazy(() => UsersPermissionsUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UsersPermissionsCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.UsersPermissionsCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UsersPermissionsCreateManyUserInputSchema),z.lazy(() => UsersPermissionsCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserLikedPostsCreateWithoutUserInputSchema: z.ZodType<Prisma.UserLikedPostsCreateWithoutUserInput> = z.object({
  assignedAt: z.coerce.date().optional(),
  assignedBy: z.string(),
  post: z.lazy(() => PostCreateNestedOneWithoutLikedUsersInputSchema)
}).strict();

export const UserLikedPostsUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.UserLikedPostsUncheckedCreateWithoutUserInput> = z.object({
  postId: z.string(),
  assignedAt: z.coerce.date().optional(),
  assignedBy: z.string()
}).strict();

export const UserLikedPostsCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.UserLikedPostsCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => UserLikedPostsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserLikedPostsCreateWithoutUserInputSchema),z.lazy(() => UserLikedPostsUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserLikedPostsCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.UserLikedPostsCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserLikedPostsCreateManyUserInputSchema),z.lazy(() => UserLikedPostsCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AccessTokenCreateWithoutUserInputSchema: z.ZodType<Prisma.AccessTokenCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  value: z.string(),
  expired_at: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  refreshToken: z.lazy(() => RefreshTokenCreateNestedOneWithoutAccessTokenInputSchema).optional()
}).strict();

export const AccessTokenUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AccessTokenUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
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
  skipDuplicates: z.boolean().optional()
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
  repliedToID: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  chiefComment: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserLikeCommentsUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserLikeCommentsUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserLikeCommentsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserLikeCommentsUpdateWithoutUserInputSchema),z.lazy(() => UserLikeCommentsUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => UserLikeCommentsCreateWithoutUserInputSchema),z.lazy(() => UserLikeCommentsUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserLikeCommentsUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserLikeCommentsUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserLikeCommentsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserLikeCommentsUpdateWithoutUserInputSchema),z.lazy(() => UserLikeCommentsUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const UserLikeCommentsUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.UserLikeCommentsUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => UserLikeCommentsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserLikeCommentsUpdateManyMutationInputSchema),z.lazy(() => UserLikeCommentsUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const UserLikeCommentsScalarWhereInputSchema: z.ZodType<Prisma.UserLikeCommentsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserLikeCommentsScalarWhereInputSchema),z.lazy(() => UserLikeCommentsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserLikeCommentsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserLikeCommentsScalarWhereInputSchema),z.lazy(() => UserLikeCommentsScalarWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  commentId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  assignedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  assignedBy: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const UsersRolesUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UsersRolesUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UsersRolesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UsersRolesUpdateWithoutUserInputSchema),z.lazy(() => UsersRolesUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => UsersRolesCreateWithoutUserInputSchema),z.lazy(() => UsersRolesUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UsersRolesUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UsersRolesUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UsersRolesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UsersRolesUpdateWithoutUserInputSchema),z.lazy(() => UsersRolesUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const UsersRolesUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.UsersRolesUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => UsersRolesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UsersRolesUpdateManyMutationInputSchema),z.lazy(() => UsersRolesUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const UsersRolesScalarWhereInputSchema: z.ZodType<Prisma.UsersRolesScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UsersRolesScalarWhereInputSchema),z.lazy(() => UsersRolesScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UsersRolesScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UsersRolesScalarWhereInputSchema),z.lazy(() => UsersRolesScalarWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  roleId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  assignedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  assignedBy: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const UsersPermissionsUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UsersPermissionsUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UsersPermissionsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UsersPermissionsUpdateWithoutUserInputSchema),z.lazy(() => UsersPermissionsUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => UsersPermissionsCreateWithoutUserInputSchema),z.lazy(() => UsersPermissionsUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UsersPermissionsUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UsersPermissionsUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UsersPermissionsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UsersPermissionsUpdateWithoutUserInputSchema),z.lazy(() => UsersPermissionsUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const UsersPermissionsUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.UsersPermissionsUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => UsersPermissionsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UsersPermissionsUpdateManyMutationInputSchema),z.lazy(() => UsersPermissionsUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const UsersPermissionsScalarWhereInputSchema: z.ZodType<Prisma.UsersPermissionsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UsersPermissionsScalarWhereInputSchema),z.lazy(() => UsersPermissionsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UsersPermissionsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UsersPermissionsScalarWhereInputSchema),z.lazy(() => UsersPermissionsScalarWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  permissionId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  assignedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  assignedBy: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const UserLikedPostsUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserLikedPostsUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserLikedPostsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserLikedPostsUpdateWithoutUserInputSchema),z.lazy(() => UserLikedPostsUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => UserLikedPostsCreateWithoutUserInputSchema),z.lazy(() => UserLikedPostsUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserLikedPostsUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserLikedPostsUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserLikedPostsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserLikedPostsUpdateWithoutUserInputSchema),z.lazy(() => UserLikedPostsUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const UserLikedPostsUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.UserLikedPostsUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => UserLikedPostsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserLikedPostsUpdateManyMutationInputSchema),z.lazy(() => UserLikedPostsUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const UserLikedPostsScalarWhereInputSchema: z.ZodType<Prisma.UserLikedPostsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserLikedPostsScalarWhereInputSchema),z.lazy(() => UserLikedPostsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserLikedPostsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserLikedPostsScalarWhereInputSchema),z.lazy(() => UserLikedPostsScalarWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  postId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  assignedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  assignedBy: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
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

export const UserCreateWithoutLikeCommentsInputSchema: z.ZodType<Prisma.UserCreateWithoutLikeCommentsInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  name: z.string(),
  provider: z.string(),
  activated: z.boolean().optional(),
  avatar: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostCreateNestedManyWithoutAuthorInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutOwnerInputSchema).optional(),
  roles: z.lazy(() => UsersRolesCreateNestedManyWithoutUserInputSchema).optional(),
  permissions: z.lazy(() => UsersPermissionsCreateNestedManyWithoutUserInputSchema).optional(),
  likedPosts: z.lazy(() => UserLikedPostsCreateNestedManyWithoutUserInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutLikeCommentsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutLikeCommentsInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  name: z.string(),
  provider: z.string(),
  activated: z.boolean().optional(),
  avatar: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  roles: z.lazy(() => UsersRolesUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  permissions: z.lazy(() => UsersPermissionsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  likedPosts: z.lazy(() => UserLikedPostsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutLikeCommentsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutLikeCommentsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutLikeCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutLikeCommentsInputSchema) ]),
}).strict();

export const CommentCreateWithoutLikesInputSchema: z.ZodType<Prisma.CommentCreateWithoutLikesInput> = z.object({
  id: z.string().uuid().optional(),
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
  id: z.string().uuid().optional(),
  belongsToId: z.string().optional().nullable(),
  ownerId: z.string(),
  content: z.string(),
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

export const UserUpsertWithoutLikeCommentsInputSchema: z.ZodType<Prisma.UserUpsertWithoutLikeCommentsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutLikeCommentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutLikeCommentsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutLikeCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutLikeCommentsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutLikeCommentsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutLikeCommentsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutLikeCommentsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutLikeCommentsInputSchema) ]),
}).strict();

export const UserUpdateWithoutLikeCommentsInputSchema: z.ZodType<Prisma.UserUpdateWithoutLikeCommentsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUpdateManyWithoutAuthorNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutOwnerNestedInputSchema).optional(),
  roles: z.lazy(() => UsersRolesUpdateManyWithoutUserNestedInputSchema).optional(),
  permissions: z.lazy(() => UsersPermissionsUpdateManyWithoutUserNestedInputSchema).optional(),
  likedPosts: z.lazy(() => UserLikedPostsUpdateManyWithoutUserNestedInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutLikeCommentsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutLikeCommentsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  roles: z.lazy(() => UsersRolesUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  permissions: z.lazy(() => UsersPermissionsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  likedPosts: z.lazy(() => UserLikedPostsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const CommentUpsertWithoutLikesInputSchema: z.ZodType<Prisma.CommentUpsertWithoutLikesInput> = z.object({
  update: z.union([ z.lazy(() => CommentUpdateWithoutLikesInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutLikesInputSchema) ]),
  create: z.union([ z.lazy(() => CommentCreateWithoutLikesInputSchema),z.lazy(() => CommentUncheckedCreateWithoutLikesInputSchema) ]),
  where: z.lazy(() => CommentWhereInputSchema).optional()
}).strict();

export const CommentUpdateToOneWithWhereWithoutLikesInputSchema: z.ZodType<Prisma.CommentUpdateToOneWithWhereWithoutLikesInput> = z.object({
  where: z.lazy(() => CommentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CommentUpdateWithoutLikesInputSchema),z.lazy(() => CommentUncheckedUpdateWithoutLikesInputSchema) ]),
}).strict();

export const CommentUpdateWithoutLikesInputSchema: z.ZodType<Prisma.CommentUpdateWithoutLikesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  belongsToId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  repliedToID: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chiefComment: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  replies: z.lazy(() => CommentUncheckedUpdateManyWithoutReplyToNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutLikedPostsInputSchema: z.ZodType<Prisma.UserCreateWithoutLikedPostsInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  name: z.string(),
  provider: z.string(),
  activated: z.boolean().optional(),
  avatar: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostCreateNestedManyWithoutAuthorInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutOwnerInputSchema).optional(),
  LikeComments: z.lazy(() => UserLikeCommentsCreateNestedManyWithoutUserInputSchema).optional(),
  roles: z.lazy(() => UsersRolesCreateNestedManyWithoutUserInputSchema).optional(),
  permissions: z.lazy(() => UsersPermissionsCreateNestedManyWithoutUserInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutLikedPostsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutLikedPostsInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  name: z.string(),
  provider: z.string(),
  activated: z.boolean().optional(),
  avatar: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  LikeComments: z.lazy(() => UserLikeCommentsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  roles: z.lazy(() => UsersRolesUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  permissions: z.lazy(() => UsersPermissionsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutLikedPostsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutLikedPostsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutLikedPostsInputSchema),z.lazy(() => UserUncheckedCreateWithoutLikedPostsInputSchema) ]),
}).strict();

export const PostCreateWithoutLikedUsersInputSchema: z.ZodType<Prisma.PostCreateWithoutLikedUsersInput> = z.object({
  id: z.string().uuid().optional(),
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
  id: z.string().uuid().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string().optional().nullable(),
  meta: z.string(),
  tags: z.union([ z.lazy(() => PostCreatetagsInputSchema),z.string().array() ]).optional(),
  thumbnailId: z.string().optional().nullable(),
  authorId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutBelongsToInputSchema).optional(),
  translations: z.lazy(() => TranslationUncheckedCreateNestedManyWithoutPostInputSchema).optional()
}).strict();

export const PostCreateOrConnectWithoutLikedUsersInputSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutLikedUsersInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PostCreateWithoutLikedUsersInputSchema),z.lazy(() => PostUncheckedCreateWithoutLikedUsersInputSchema) ]),
}).strict();

export const UserUpsertWithoutLikedPostsInputSchema: z.ZodType<Prisma.UserUpsertWithoutLikedPostsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutLikedPostsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutLikedPostsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutLikedPostsInputSchema),z.lazy(() => UserUncheckedCreateWithoutLikedPostsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutLikedPostsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutLikedPostsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutLikedPostsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutLikedPostsInputSchema) ]),
}).strict();

export const UserUpdateWithoutLikedPostsInputSchema: z.ZodType<Prisma.UserUpdateWithoutLikedPostsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUpdateManyWithoutAuthorNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutOwnerNestedInputSchema).optional(),
  LikeComments: z.lazy(() => UserLikeCommentsUpdateManyWithoutUserNestedInputSchema).optional(),
  roles: z.lazy(() => UsersRolesUpdateManyWithoutUserNestedInputSchema).optional(),
  permissions: z.lazy(() => UsersPermissionsUpdateManyWithoutUserNestedInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutLikedPostsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutLikedPostsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  LikeComments: z.lazy(() => UserLikeCommentsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  roles: z.lazy(() => UsersRolesUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  permissions: z.lazy(() => UsersPermissionsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const PostUpsertWithoutLikedUsersInputSchema: z.ZodType<Prisma.PostUpsertWithoutLikedUsersInput> = z.object({
  update: z.union([ z.lazy(() => PostUpdateWithoutLikedUsersInputSchema),z.lazy(() => PostUncheckedUpdateWithoutLikedUsersInputSchema) ]),
  create: z.union([ z.lazy(() => PostCreateWithoutLikedUsersInputSchema),z.lazy(() => PostUncheckedCreateWithoutLikedUsersInputSchema) ]),
  where: z.lazy(() => PostWhereInputSchema).optional()
}).strict();

export const PostUpdateToOneWithWhereWithoutLikedUsersInputSchema: z.ZodType<Prisma.PostUpdateToOneWithWhereWithoutLikedUsersInput> = z.object({
  where: z.lazy(() => PostWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PostUpdateWithoutLikedUsersInputSchema),z.lazy(() => PostUncheckedUpdateWithoutLikedUsersInputSchema) ]),
}).strict();

export const PostUpdateWithoutLikedUsersInputSchema: z.ZodType<Prisma.PostUpdateWithoutLikedUsersInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => PostUpdatetagsInputSchema),z.string().array() ]).optional(),
  thumbnailId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  authorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutBelongsToNestedInputSchema).optional(),
  translations: z.lazy(() => TranslationUncheckedUpdateManyWithoutPostNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutRolesInputSchema: z.ZodType<Prisma.UserCreateWithoutRolesInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  name: z.string(),
  provider: z.string(),
  activated: z.boolean().optional(),
  avatar: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostCreateNestedManyWithoutAuthorInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutOwnerInputSchema).optional(),
  LikeComments: z.lazy(() => UserLikeCommentsCreateNestedManyWithoutUserInputSchema).optional(),
  permissions: z.lazy(() => UsersPermissionsCreateNestedManyWithoutUserInputSchema).optional(),
  likedPosts: z.lazy(() => UserLikedPostsCreateNestedManyWithoutUserInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutRolesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutRolesInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  name: z.string(),
  provider: z.string(),
  activated: z.boolean().optional(),
  avatar: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  LikeComments: z.lazy(() => UserLikeCommentsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  permissions: z.lazy(() => UsersPermissionsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  likedPosts: z.lazy(() => UserLikedPostsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutRolesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutRolesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutRolesInputSchema),z.lazy(() => UserUncheckedCreateWithoutRolesInputSchema) ]),
}).strict();

export const RoleCreateWithoutUsersInputSchema: z.ZodType<Prisma.RoleCreateWithoutUsersInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  label: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  systemic: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  permissions: z.lazy(() => RolesPermissionsCreateNestedManyWithoutRoleInputSchema).optional()
}).strict();

export const RoleUncheckedCreateWithoutUsersInputSchema: z.ZodType<Prisma.RoleUncheckedCreateWithoutUsersInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  label: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  systemic: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  permissions: z.lazy(() => RolesPermissionsUncheckedCreateNestedManyWithoutRoleInputSchema).optional()
}).strict();

export const RoleCreateOrConnectWithoutUsersInputSchema: z.ZodType<Prisma.RoleCreateOrConnectWithoutUsersInput> = z.object({
  where: z.lazy(() => RoleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RoleCreateWithoutUsersInputSchema),z.lazy(() => RoleUncheckedCreateWithoutUsersInputSchema) ]),
}).strict();

export const UserUpsertWithoutRolesInputSchema: z.ZodType<Prisma.UserUpsertWithoutRolesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutRolesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRolesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutRolesInputSchema),z.lazy(() => UserUncheckedCreateWithoutRolesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutRolesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutRolesInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutRolesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRolesInputSchema) ]),
}).strict();

export const UserUpdateWithoutRolesInputSchema: z.ZodType<Prisma.UserUpdateWithoutRolesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUpdateManyWithoutAuthorNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutOwnerNestedInputSchema).optional(),
  LikeComments: z.lazy(() => UserLikeCommentsUpdateManyWithoutUserNestedInputSchema).optional(),
  permissions: z.lazy(() => UsersPermissionsUpdateManyWithoutUserNestedInputSchema).optional(),
  likedPosts: z.lazy(() => UserLikedPostsUpdateManyWithoutUserNestedInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutRolesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutRolesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  LikeComments: z.lazy(() => UserLikeCommentsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  permissions: z.lazy(() => UsersPermissionsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  likedPosts: z.lazy(() => UserLikedPostsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const RoleUpsertWithoutUsersInputSchema: z.ZodType<Prisma.RoleUpsertWithoutUsersInput> = z.object({
  update: z.union([ z.lazy(() => RoleUpdateWithoutUsersInputSchema),z.lazy(() => RoleUncheckedUpdateWithoutUsersInputSchema) ]),
  create: z.union([ z.lazy(() => RoleCreateWithoutUsersInputSchema),z.lazy(() => RoleUncheckedCreateWithoutUsersInputSchema) ]),
  where: z.lazy(() => RoleWhereInputSchema).optional()
}).strict();

export const RoleUpdateToOneWithWhereWithoutUsersInputSchema: z.ZodType<Prisma.RoleUpdateToOneWithWhereWithoutUsersInput> = z.object({
  where: z.lazy(() => RoleWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RoleUpdateWithoutUsersInputSchema),z.lazy(() => RoleUncheckedUpdateWithoutUsersInputSchema) ]),
}).strict();

export const RoleUpdateWithoutUsersInputSchema: z.ZodType<Prisma.RoleUpdateWithoutUsersInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  systemic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  permissions: z.lazy(() => RolesPermissionsUpdateManyWithoutRoleNestedInputSchema).optional()
}).strict();

export const RoleUncheckedUpdateWithoutUsersInputSchema: z.ZodType<Prisma.RoleUncheckedUpdateWithoutUsersInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  systemic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  permissions: z.lazy(() => RolesPermissionsUncheckedUpdateManyWithoutRoleNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutPermissionsInputSchema: z.ZodType<Prisma.UserCreateWithoutPermissionsInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  name: z.string(),
  provider: z.string(),
  activated: z.boolean().optional(),
  avatar: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostCreateNestedManyWithoutAuthorInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutOwnerInputSchema).optional(),
  LikeComments: z.lazy(() => UserLikeCommentsCreateNestedManyWithoutUserInputSchema).optional(),
  roles: z.lazy(() => UsersRolesCreateNestedManyWithoutUserInputSchema).optional(),
  likedPosts: z.lazy(() => UserLikedPostsCreateNestedManyWithoutUserInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutPermissionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutPermissionsInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  name: z.string(),
  provider: z.string(),
  activated: z.boolean().optional(),
  avatar: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  LikeComments: z.lazy(() => UserLikeCommentsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  roles: z.lazy(() => UsersRolesUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  likedPosts: z.lazy(() => UserLikedPostsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutPermissionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPermissionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutPermissionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPermissionsInputSchema) ]),
}).strict();

export const PermissionCreateWithoutUsersInputSchema: z.ZodType<Prisma.PermissionCreateWithoutUsersInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  label: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  rule: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  roles: z.lazy(() => RolesPermissionsCreateNestedManyWithoutPermissionInputSchema).optional()
}).strict();

export const PermissionUncheckedCreateWithoutUsersInputSchema: z.ZodType<Prisma.PermissionUncheckedCreateWithoutUsersInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  label: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  rule: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  roles: z.lazy(() => RolesPermissionsUncheckedCreateNestedManyWithoutPermissionInputSchema).optional()
}).strict();

export const PermissionCreateOrConnectWithoutUsersInputSchema: z.ZodType<Prisma.PermissionCreateOrConnectWithoutUsersInput> = z.object({
  where: z.lazy(() => PermissionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PermissionCreateWithoutUsersInputSchema),z.lazy(() => PermissionUncheckedCreateWithoutUsersInputSchema) ]),
}).strict();

export const UserUpsertWithoutPermissionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutPermissionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutPermissionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPermissionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutPermissionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPermissionsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutPermissionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPermissionsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutPermissionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPermissionsInputSchema) ]),
}).strict();

export const UserUpdateWithoutPermissionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutPermissionsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUpdateManyWithoutAuthorNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutOwnerNestedInputSchema).optional(),
  LikeComments: z.lazy(() => UserLikeCommentsUpdateManyWithoutUserNestedInputSchema).optional(),
  roles: z.lazy(() => UsersRolesUpdateManyWithoutUserNestedInputSchema).optional(),
  likedPosts: z.lazy(() => UserLikedPostsUpdateManyWithoutUserNestedInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutPermissionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutPermissionsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  LikeComments: z.lazy(() => UserLikeCommentsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  roles: z.lazy(() => UsersRolesUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  likedPosts: z.lazy(() => UserLikedPostsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const PermissionUpsertWithoutUsersInputSchema: z.ZodType<Prisma.PermissionUpsertWithoutUsersInput> = z.object({
  update: z.union([ z.lazy(() => PermissionUpdateWithoutUsersInputSchema),z.lazy(() => PermissionUncheckedUpdateWithoutUsersInputSchema) ]),
  create: z.union([ z.lazy(() => PermissionCreateWithoutUsersInputSchema),z.lazy(() => PermissionUncheckedCreateWithoutUsersInputSchema) ]),
  where: z.lazy(() => PermissionWhereInputSchema).optional()
}).strict();

export const PermissionUpdateToOneWithWhereWithoutUsersInputSchema: z.ZodType<Prisma.PermissionUpdateToOneWithWhereWithoutUsersInput> = z.object({
  where: z.lazy(() => PermissionWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PermissionUpdateWithoutUsersInputSchema),z.lazy(() => PermissionUncheckedUpdateWithoutUsersInputSchema) ]),
}).strict();

export const PermissionUpdateWithoutUsersInputSchema: z.ZodType<Prisma.PermissionUpdateWithoutUsersInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rule: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  roles: z.lazy(() => RolesPermissionsUpdateManyWithoutPermissionNestedInputSchema).optional()
}).strict();

export const PermissionUncheckedUpdateWithoutUsersInputSchema: z.ZodType<Prisma.PermissionUncheckedUpdateWithoutUsersInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rule: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  roles: z.lazy(() => RolesPermissionsUncheckedUpdateManyWithoutPermissionNestedInputSchema).optional()
}).strict();

export const RolesPermissionsCreateWithoutRoleInputSchema: z.ZodType<Prisma.RolesPermissionsCreateWithoutRoleInput> = z.object({
  assignedAt: z.coerce.date().optional(),
  assignedBy: z.string(),
  permission: z.lazy(() => PermissionCreateNestedOneWithoutRolesInputSchema)
}).strict();

export const RolesPermissionsUncheckedCreateWithoutRoleInputSchema: z.ZodType<Prisma.RolesPermissionsUncheckedCreateWithoutRoleInput> = z.object({
  permissionId: z.string(),
  assignedAt: z.coerce.date().optional(),
  assignedBy: z.string()
}).strict();

export const RolesPermissionsCreateOrConnectWithoutRoleInputSchema: z.ZodType<Prisma.RolesPermissionsCreateOrConnectWithoutRoleInput> = z.object({
  where: z.lazy(() => RolesPermissionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RolesPermissionsCreateWithoutRoleInputSchema),z.lazy(() => RolesPermissionsUncheckedCreateWithoutRoleInputSchema) ]),
}).strict();

export const RolesPermissionsCreateManyRoleInputEnvelopeSchema: z.ZodType<Prisma.RolesPermissionsCreateManyRoleInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RolesPermissionsCreateManyRoleInputSchema),z.lazy(() => RolesPermissionsCreateManyRoleInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UsersRolesCreateWithoutRoleInputSchema: z.ZodType<Prisma.UsersRolesCreateWithoutRoleInput> = z.object({
  assignedAt: z.coerce.date().optional(),
  assignedBy: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutRolesInputSchema)
}).strict();

export const UsersRolesUncheckedCreateWithoutRoleInputSchema: z.ZodType<Prisma.UsersRolesUncheckedCreateWithoutRoleInput> = z.object({
  userId: z.string(),
  assignedAt: z.coerce.date().optional(),
  assignedBy: z.string()
}).strict();

export const UsersRolesCreateOrConnectWithoutRoleInputSchema: z.ZodType<Prisma.UsersRolesCreateOrConnectWithoutRoleInput> = z.object({
  where: z.lazy(() => UsersRolesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UsersRolesCreateWithoutRoleInputSchema),z.lazy(() => UsersRolesUncheckedCreateWithoutRoleInputSchema) ]),
}).strict();

export const UsersRolesCreateManyRoleInputEnvelopeSchema: z.ZodType<Prisma.UsersRolesCreateManyRoleInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UsersRolesCreateManyRoleInputSchema),z.lazy(() => UsersRolesCreateManyRoleInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const RolesPermissionsUpsertWithWhereUniqueWithoutRoleInputSchema: z.ZodType<Prisma.RolesPermissionsUpsertWithWhereUniqueWithoutRoleInput> = z.object({
  where: z.lazy(() => RolesPermissionsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RolesPermissionsUpdateWithoutRoleInputSchema),z.lazy(() => RolesPermissionsUncheckedUpdateWithoutRoleInputSchema) ]),
  create: z.union([ z.lazy(() => RolesPermissionsCreateWithoutRoleInputSchema),z.lazy(() => RolesPermissionsUncheckedCreateWithoutRoleInputSchema) ]),
}).strict();

export const RolesPermissionsUpdateWithWhereUniqueWithoutRoleInputSchema: z.ZodType<Prisma.RolesPermissionsUpdateWithWhereUniqueWithoutRoleInput> = z.object({
  where: z.lazy(() => RolesPermissionsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RolesPermissionsUpdateWithoutRoleInputSchema),z.lazy(() => RolesPermissionsUncheckedUpdateWithoutRoleInputSchema) ]),
}).strict();

export const RolesPermissionsUpdateManyWithWhereWithoutRoleInputSchema: z.ZodType<Prisma.RolesPermissionsUpdateManyWithWhereWithoutRoleInput> = z.object({
  where: z.lazy(() => RolesPermissionsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RolesPermissionsUpdateManyMutationInputSchema),z.lazy(() => RolesPermissionsUncheckedUpdateManyWithoutRoleInputSchema) ]),
}).strict();

export const RolesPermissionsScalarWhereInputSchema: z.ZodType<Prisma.RolesPermissionsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RolesPermissionsScalarWhereInputSchema),z.lazy(() => RolesPermissionsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RolesPermissionsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RolesPermissionsScalarWhereInputSchema),z.lazy(() => RolesPermissionsScalarWhereInputSchema).array() ]).optional(),
  roleId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  permissionId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  assignedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  assignedBy: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const UsersRolesUpsertWithWhereUniqueWithoutRoleInputSchema: z.ZodType<Prisma.UsersRolesUpsertWithWhereUniqueWithoutRoleInput> = z.object({
  where: z.lazy(() => UsersRolesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UsersRolesUpdateWithoutRoleInputSchema),z.lazy(() => UsersRolesUncheckedUpdateWithoutRoleInputSchema) ]),
  create: z.union([ z.lazy(() => UsersRolesCreateWithoutRoleInputSchema),z.lazy(() => UsersRolesUncheckedCreateWithoutRoleInputSchema) ]),
}).strict();

export const UsersRolesUpdateWithWhereUniqueWithoutRoleInputSchema: z.ZodType<Prisma.UsersRolesUpdateWithWhereUniqueWithoutRoleInput> = z.object({
  where: z.lazy(() => UsersRolesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UsersRolesUpdateWithoutRoleInputSchema),z.lazy(() => UsersRolesUncheckedUpdateWithoutRoleInputSchema) ]),
}).strict();

export const UsersRolesUpdateManyWithWhereWithoutRoleInputSchema: z.ZodType<Prisma.UsersRolesUpdateManyWithWhereWithoutRoleInput> = z.object({
  where: z.lazy(() => UsersRolesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UsersRolesUpdateManyMutationInputSchema),z.lazy(() => UsersRolesUncheckedUpdateManyWithoutRoleInputSchema) ]),
}).strict();

export const RolesPermissionsCreateWithoutPermissionInputSchema: z.ZodType<Prisma.RolesPermissionsCreateWithoutPermissionInput> = z.object({
  assignedAt: z.coerce.date().optional(),
  assignedBy: z.string(),
  role: z.lazy(() => RoleCreateNestedOneWithoutPermissionsInputSchema)
}).strict();

export const RolesPermissionsUncheckedCreateWithoutPermissionInputSchema: z.ZodType<Prisma.RolesPermissionsUncheckedCreateWithoutPermissionInput> = z.object({
  roleId: z.string(),
  assignedAt: z.coerce.date().optional(),
  assignedBy: z.string()
}).strict();

export const RolesPermissionsCreateOrConnectWithoutPermissionInputSchema: z.ZodType<Prisma.RolesPermissionsCreateOrConnectWithoutPermissionInput> = z.object({
  where: z.lazy(() => RolesPermissionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RolesPermissionsCreateWithoutPermissionInputSchema),z.lazy(() => RolesPermissionsUncheckedCreateWithoutPermissionInputSchema) ]),
}).strict();

export const RolesPermissionsCreateManyPermissionInputEnvelopeSchema: z.ZodType<Prisma.RolesPermissionsCreateManyPermissionInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RolesPermissionsCreateManyPermissionInputSchema),z.lazy(() => RolesPermissionsCreateManyPermissionInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UsersPermissionsCreateWithoutPermissionInputSchema: z.ZodType<Prisma.UsersPermissionsCreateWithoutPermissionInput> = z.object({
  assignedAt: z.coerce.date().optional(),
  assignedBy: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutPermissionsInputSchema)
}).strict();

export const UsersPermissionsUncheckedCreateWithoutPermissionInputSchema: z.ZodType<Prisma.UsersPermissionsUncheckedCreateWithoutPermissionInput> = z.object({
  userId: z.string(),
  assignedAt: z.coerce.date().optional(),
  assignedBy: z.string()
}).strict();

export const UsersPermissionsCreateOrConnectWithoutPermissionInputSchema: z.ZodType<Prisma.UsersPermissionsCreateOrConnectWithoutPermissionInput> = z.object({
  where: z.lazy(() => UsersPermissionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UsersPermissionsCreateWithoutPermissionInputSchema),z.lazy(() => UsersPermissionsUncheckedCreateWithoutPermissionInputSchema) ]),
}).strict();

export const UsersPermissionsCreateManyPermissionInputEnvelopeSchema: z.ZodType<Prisma.UsersPermissionsCreateManyPermissionInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UsersPermissionsCreateManyPermissionInputSchema),z.lazy(() => UsersPermissionsCreateManyPermissionInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const RolesPermissionsUpsertWithWhereUniqueWithoutPermissionInputSchema: z.ZodType<Prisma.RolesPermissionsUpsertWithWhereUniqueWithoutPermissionInput> = z.object({
  where: z.lazy(() => RolesPermissionsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RolesPermissionsUpdateWithoutPermissionInputSchema),z.lazy(() => RolesPermissionsUncheckedUpdateWithoutPermissionInputSchema) ]),
  create: z.union([ z.lazy(() => RolesPermissionsCreateWithoutPermissionInputSchema),z.lazy(() => RolesPermissionsUncheckedCreateWithoutPermissionInputSchema) ]),
}).strict();

export const RolesPermissionsUpdateWithWhereUniqueWithoutPermissionInputSchema: z.ZodType<Prisma.RolesPermissionsUpdateWithWhereUniqueWithoutPermissionInput> = z.object({
  where: z.lazy(() => RolesPermissionsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RolesPermissionsUpdateWithoutPermissionInputSchema),z.lazy(() => RolesPermissionsUncheckedUpdateWithoutPermissionInputSchema) ]),
}).strict();

export const RolesPermissionsUpdateManyWithWhereWithoutPermissionInputSchema: z.ZodType<Prisma.RolesPermissionsUpdateManyWithWhereWithoutPermissionInput> = z.object({
  where: z.lazy(() => RolesPermissionsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RolesPermissionsUpdateManyMutationInputSchema),z.lazy(() => RolesPermissionsUncheckedUpdateManyWithoutPermissionInputSchema) ]),
}).strict();

export const UsersPermissionsUpsertWithWhereUniqueWithoutPermissionInputSchema: z.ZodType<Prisma.UsersPermissionsUpsertWithWhereUniqueWithoutPermissionInput> = z.object({
  where: z.lazy(() => UsersPermissionsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UsersPermissionsUpdateWithoutPermissionInputSchema),z.lazy(() => UsersPermissionsUncheckedUpdateWithoutPermissionInputSchema) ]),
  create: z.union([ z.lazy(() => UsersPermissionsCreateWithoutPermissionInputSchema),z.lazy(() => UsersPermissionsUncheckedCreateWithoutPermissionInputSchema) ]),
}).strict();

export const UsersPermissionsUpdateWithWhereUniqueWithoutPermissionInputSchema: z.ZodType<Prisma.UsersPermissionsUpdateWithWhereUniqueWithoutPermissionInput> = z.object({
  where: z.lazy(() => UsersPermissionsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UsersPermissionsUpdateWithoutPermissionInputSchema),z.lazy(() => UsersPermissionsUncheckedUpdateWithoutPermissionInputSchema) ]),
}).strict();

export const UsersPermissionsUpdateManyWithWhereWithoutPermissionInputSchema: z.ZodType<Prisma.UsersPermissionsUpdateManyWithWhereWithoutPermissionInput> = z.object({
  where: z.lazy(() => UsersPermissionsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UsersPermissionsUpdateManyMutationInputSchema),z.lazy(() => UsersPermissionsUncheckedUpdateManyWithoutPermissionInputSchema) ]),
}).strict();

export const RoleCreateWithoutPermissionsInputSchema: z.ZodType<Prisma.RoleCreateWithoutPermissionsInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  label: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  systemic: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  users: z.lazy(() => UsersRolesCreateNestedManyWithoutRoleInputSchema).optional()
}).strict();

export const RoleUncheckedCreateWithoutPermissionsInputSchema: z.ZodType<Prisma.RoleUncheckedCreateWithoutPermissionsInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  label: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  systemic: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  users: z.lazy(() => UsersRolesUncheckedCreateNestedManyWithoutRoleInputSchema).optional()
}).strict();

export const RoleCreateOrConnectWithoutPermissionsInputSchema: z.ZodType<Prisma.RoleCreateOrConnectWithoutPermissionsInput> = z.object({
  where: z.lazy(() => RoleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RoleCreateWithoutPermissionsInputSchema),z.lazy(() => RoleUncheckedCreateWithoutPermissionsInputSchema) ]),
}).strict();

export const PermissionCreateWithoutRolesInputSchema: z.ZodType<Prisma.PermissionCreateWithoutRolesInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  label: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  rule: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  users: z.lazy(() => UsersPermissionsCreateNestedManyWithoutPermissionInputSchema).optional()
}).strict();

export const PermissionUncheckedCreateWithoutRolesInputSchema: z.ZodType<Prisma.PermissionUncheckedCreateWithoutRolesInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  label: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  rule: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  users: z.lazy(() => UsersPermissionsUncheckedCreateNestedManyWithoutPermissionInputSchema).optional()
}).strict();

export const PermissionCreateOrConnectWithoutRolesInputSchema: z.ZodType<Prisma.PermissionCreateOrConnectWithoutRolesInput> = z.object({
  where: z.lazy(() => PermissionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PermissionCreateWithoutRolesInputSchema),z.lazy(() => PermissionUncheckedCreateWithoutRolesInputSchema) ]),
}).strict();

export const RoleUpsertWithoutPermissionsInputSchema: z.ZodType<Prisma.RoleUpsertWithoutPermissionsInput> = z.object({
  update: z.union([ z.lazy(() => RoleUpdateWithoutPermissionsInputSchema),z.lazy(() => RoleUncheckedUpdateWithoutPermissionsInputSchema) ]),
  create: z.union([ z.lazy(() => RoleCreateWithoutPermissionsInputSchema),z.lazy(() => RoleUncheckedCreateWithoutPermissionsInputSchema) ]),
  where: z.lazy(() => RoleWhereInputSchema).optional()
}).strict();

export const RoleUpdateToOneWithWhereWithoutPermissionsInputSchema: z.ZodType<Prisma.RoleUpdateToOneWithWhereWithoutPermissionsInput> = z.object({
  where: z.lazy(() => RoleWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RoleUpdateWithoutPermissionsInputSchema),z.lazy(() => RoleUncheckedUpdateWithoutPermissionsInputSchema) ]),
}).strict();

export const RoleUpdateWithoutPermissionsInputSchema: z.ZodType<Prisma.RoleUpdateWithoutPermissionsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  systemic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UsersRolesUpdateManyWithoutRoleNestedInputSchema).optional()
}).strict();

export const RoleUncheckedUpdateWithoutPermissionsInputSchema: z.ZodType<Prisma.RoleUncheckedUpdateWithoutPermissionsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  systemic: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UsersRolesUncheckedUpdateManyWithoutRoleNestedInputSchema).optional()
}).strict();

export const PermissionUpsertWithoutRolesInputSchema: z.ZodType<Prisma.PermissionUpsertWithoutRolesInput> = z.object({
  update: z.union([ z.lazy(() => PermissionUpdateWithoutRolesInputSchema),z.lazy(() => PermissionUncheckedUpdateWithoutRolesInputSchema) ]),
  create: z.union([ z.lazy(() => PermissionCreateWithoutRolesInputSchema),z.lazy(() => PermissionUncheckedCreateWithoutRolesInputSchema) ]),
  where: z.lazy(() => PermissionWhereInputSchema).optional()
}).strict();

export const PermissionUpdateToOneWithWhereWithoutRolesInputSchema: z.ZodType<Prisma.PermissionUpdateToOneWithWhereWithoutRolesInput> = z.object({
  where: z.lazy(() => PermissionWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PermissionUpdateWithoutRolesInputSchema),z.lazy(() => PermissionUncheckedUpdateWithoutRolesInputSchema) ]),
}).strict();

export const PermissionUpdateWithoutRolesInputSchema: z.ZodType<Prisma.PermissionUpdateWithoutRolesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rule: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UsersPermissionsUpdateManyWithoutPermissionNestedInputSchema).optional()
}).strict();

export const PermissionUncheckedUpdateWithoutRolesInputSchema: z.ZodType<Prisma.PermissionUncheckedUpdateWithoutRolesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rule: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValue ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UsersPermissionsUncheckedUpdateManyWithoutPermissionNestedInputSchema).optional()
}).strict();

export const MediaEntityCreateWithoutPostInputSchema: z.ZodType<Prisma.MediaEntityCreateWithoutPostInput> = z.object({
  id: z.string().uuid().optional(),
  file: z.string(),
  ext: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const MediaEntityUncheckedCreateWithoutPostInputSchema: z.ZodType<Prisma.MediaEntityUncheckedCreateWithoutPostInput> = z.object({
  id: z.string().uuid().optional(),
  file: z.string(),
  ext: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const MediaEntityCreateOrConnectWithoutPostInputSchema: z.ZodType<Prisma.MediaEntityCreateOrConnectWithoutPostInput> = z.object({
  where: z.lazy(() => MediaEntityWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MediaEntityCreateWithoutPostInputSchema),z.lazy(() => MediaEntityUncheckedCreateWithoutPostInputSchema) ]),
}).strict();

export const UserCreateWithoutPostsInputSchema: z.ZodType<Prisma.UserCreateWithoutPostsInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  name: z.string(),
  provider: z.string(),
  activated: z.boolean().optional(),
  avatar: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutOwnerInputSchema).optional(),
  LikeComments: z.lazy(() => UserLikeCommentsCreateNestedManyWithoutUserInputSchema).optional(),
  roles: z.lazy(() => UsersRolesCreateNestedManyWithoutUserInputSchema).optional(),
  permissions: z.lazy(() => UsersPermissionsCreateNestedManyWithoutUserInputSchema).optional(),
  likedPosts: z.lazy(() => UserLikedPostsCreateNestedManyWithoutUserInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutPostsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutPostsInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  name: z.string(),
  provider: z.string(),
  activated: z.boolean().optional(),
  avatar: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  LikeComments: z.lazy(() => UserLikeCommentsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  roles: z.lazy(() => UsersRolesUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  permissions: z.lazy(() => UsersPermissionsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  likedPosts: z.lazy(() => UserLikedPostsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutPostsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPostsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutPostsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPostsInputSchema) ]),
}).strict();

export const UserLikedPostsCreateWithoutPostInputSchema: z.ZodType<Prisma.UserLikedPostsCreateWithoutPostInput> = z.object({
  assignedAt: z.coerce.date().optional(),
  assignedBy: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutLikedPostsInputSchema)
}).strict();

export const UserLikedPostsUncheckedCreateWithoutPostInputSchema: z.ZodType<Prisma.UserLikedPostsUncheckedCreateWithoutPostInput> = z.object({
  userId: z.string(),
  assignedAt: z.coerce.date().optional(),
  assignedBy: z.string()
}).strict();

export const UserLikedPostsCreateOrConnectWithoutPostInputSchema: z.ZodType<Prisma.UserLikedPostsCreateOrConnectWithoutPostInput> = z.object({
  where: z.lazy(() => UserLikedPostsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserLikedPostsCreateWithoutPostInputSchema),z.lazy(() => UserLikedPostsUncheckedCreateWithoutPostInputSchema) ]),
}).strict();

export const UserLikedPostsCreateManyPostInputEnvelopeSchema: z.ZodType<Prisma.UserLikedPostsCreateManyPostInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserLikedPostsCreateManyPostInputSchema),z.lazy(() => UserLikedPostsCreateManyPostInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CommentCreateWithoutBelongsToInputSchema: z.ZodType<Prisma.CommentCreateWithoutBelongsToInput> = z.object({
  id: z.string().uuid().optional(),
  content: z.string(),
  chiefComment: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  owner: z.lazy(() => UserCreateNestedOneWithoutCommentsInputSchema),
  likes: z.lazy(() => UserLikeCommentsCreateNestedManyWithoutCommentInputSchema).optional(),
  replyTo: z.lazy(() => CommentCreateNestedOneWithoutRepliesInputSchema).optional(),
  replies: z.lazy(() => CommentCreateNestedManyWithoutReplyToInputSchema).optional()
}).strict();

export const CommentUncheckedCreateWithoutBelongsToInputSchema: z.ZodType<Prisma.CommentUncheckedCreateWithoutBelongsToInput> = z.object({
  id: z.string().uuid().optional(),
  ownerId: z.string(),
  content: z.string(),
  repliedToID: z.string().optional().nullable(),
  chiefComment: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  likes: z.lazy(() => UserLikeCommentsUncheckedCreateNestedManyWithoutCommentInputSchema).optional(),
  replies: z.lazy(() => CommentUncheckedCreateNestedManyWithoutReplyToInputSchema).optional()
}).strict();

export const CommentCreateOrConnectWithoutBelongsToInputSchema: z.ZodType<Prisma.CommentCreateOrConnectWithoutBelongsToInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommentCreateWithoutBelongsToInputSchema),z.lazy(() => CommentUncheckedCreateWithoutBelongsToInputSchema) ]),
}).strict();

export const CommentCreateManyBelongsToInputEnvelopeSchema: z.ZodType<Prisma.CommentCreateManyBelongsToInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CommentCreateManyBelongsToInputSchema),z.lazy(() => CommentCreateManyBelongsToInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const TranslationCreateWithoutPostInputSchema: z.ZodType<Prisma.TranslationCreateWithoutPostInput> = z.object({
  id: z.string().uuid().optional(),
  language: z.string(),
  title: z.string(),
  content: z.string().optional().nullable(),
  meta: z.string()
}).strict();

export const TranslationUncheckedCreateWithoutPostInputSchema: z.ZodType<Prisma.TranslationUncheckedCreateWithoutPostInput> = z.object({
  id: z.string().uuid().optional(),
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
  skipDuplicates: z.boolean().optional()
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
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  file: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ext: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MediaEntityUncheckedUpdateWithoutPostInputSchema: z.ZodType<Prisma.MediaEntityUncheckedUpdateWithoutPostInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutOwnerNestedInputSchema).optional(),
  LikeComments: z.lazy(() => UserLikeCommentsUpdateManyWithoutUserNestedInputSchema).optional(),
  roles: z.lazy(() => UsersRolesUpdateManyWithoutUserNestedInputSchema).optional(),
  permissions: z.lazy(() => UsersPermissionsUpdateManyWithoutUserNestedInputSchema).optional(),
  likedPosts: z.lazy(() => UserLikedPostsUpdateManyWithoutUserNestedInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutPostsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutPostsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  LikeComments: z.lazy(() => UserLikeCommentsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  roles: z.lazy(() => UsersRolesUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  permissions: z.lazy(() => UsersPermissionsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  likedPosts: z.lazy(() => UserLikedPostsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserLikedPostsUpsertWithWhereUniqueWithoutPostInputSchema: z.ZodType<Prisma.UserLikedPostsUpsertWithWhereUniqueWithoutPostInput> = z.object({
  where: z.lazy(() => UserLikedPostsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserLikedPostsUpdateWithoutPostInputSchema),z.lazy(() => UserLikedPostsUncheckedUpdateWithoutPostInputSchema) ]),
  create: z.union([ z.lazy(() => UserLikedPostsCreateWithoutPostInputSchema),z.lazy(() => UserLikedPostsUncheckedCreateWithoutPostInputSchema) ]),
}).strict();

export const UserLikedPostsUpdateWithWhereUniqueWithoutPostInputSchema: z.ZodType<Prisma.UserLikedPostsUpdateWithWhereUniqueWithoutPostInput> = z.object({
  where: z.lazy(() => UserLikedPostsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserLikedPostsUpdateWithoutPostInputSchema),z.lazy(() => UserLikedPostsUncheckedUpdateWithoutPostInputSchema) ]),
}).strict();

export const UserLikedPostsUpdateManyWithWhereWithoutPostInputSchema: z.ZodType<Prisma.UserLikedPostsUpdateManyWithWhereWithoutPostInput> = z.object({
  where: z.lazy(() => UserLikedPostsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserLikedPostsUpdateManyMutationInputSchema),z.lazy(() => UserLikedPostsUncheckedUpdateManyWithoutPostInputSchema) ]),
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
  id: z.string().uuid().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string().optional().nullable(),
  meta: z.string(),
  tags: z.union([ z.lazy(() => PostCreatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  thumbnail: z.lazy(() => MediaEntityCreateNestedOneWithoutPostInputSchema).optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutPostsInputSchema).optional(),
  likedUsers: z.lazy(() => UserLikedPostsCreateNestedManyWithoutPostInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutBelongsToInputSchema).optional()
}).strict();

export const PostUncheckedCreateWithoutTranslationsInputSchema: z.ZodType<Prisma.PostUncheckedCreateWithoutTranslationsInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string().optional().nullable(),
  meta: z.string(),
  tags: z.union([ z.lazy(() => PostCreatetagsInputSchema),z.string().array() ]).optional(),
  thumbnailId: z.string().optional().nullable(),
  authorId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  likedUsers: z.lazy(() => UserLikedPostsUncheckedCreateNestedManyWithoutPostInputSchema).optional(),
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
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => PostUpdatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  thumbnail: z.lazy(() => MediaEntityUpdateOneWithoutPostNestedInputSchema).optional(),
  author: z.lazy(() => UserUpdateOneWithoutPostsNestedInputSchema).optional(),
  likedUsers: z.lazy(() => UserLikedPostsUpdateManyWithoutPostNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutBelongsToNestedInputSchema).optional()
}).strict();

export const PostUncheckedUpdateWithoutTranslationsInputSchema: z.ZodType<Prisma.PostUncheckedUpdateWithoutTranslationsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => PostUpdatetagsInputSchema),z.string().array() ]).optional(),
  thumbnailId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  authorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  likedUsers: z.lazy(() => UserLikedPostsUncheckedUpdateManyWithoutPostNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutBelongsToNestedInputSchema).optional()
}).strict();

export const PostCreateWithoutThumbnailInputSchema: z.ZodType<Prisma.PostCreateWithoutThumbnailInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string().optional().nullable(),
  meta: z.string(),
  tags: z.union([ z.lazy(() => PostCreatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutPostsInputSchema).optional(),
  likedUsers: z.lazy(() => UserLikedPostsCreateNestedManyWithoutPostInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutBelongsToInputSchema).optional(),
  translations: z.lazy(() => TranslationCreateNestedManyWithoutPostInputSchema).optional()
}).strict();

export const PostUncheckedCreateWithoutThumbnailInputSchema: z.ZodType<Prisma.PostUncheckedCreateWithoutThumbnailInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string().optional().nullable(),
  meta: z.string(),
  tags: z.union([ z.lazy(() => PostCreatetagsInputSchema),z.string().array() ]).optional(),
  authorId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  likedUsers: z.lazy(() => UserLikedPostsUncheckedCreateNestedManyWithoutPostInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutBelongsToInputSchema).optional(),
  translations: z.lazy(() => TranslationUncheckedCreateNestedManyWithoutPostInputSchema).optional()
}).strict();

export const PostCreateOrConnectWithoutThumbnailInputSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutThumbnailInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PostCreateWithoutThumbnailInputSchema),z.lazy(() => PostUncheckedCreateWithoutThumbnailInputSchema) ]),
}).strict();

export const PostCreateManyThumbnailInputEnvelopeSchema: z.ZodType<Prisma.PostCreateManyThumbnailInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PostCreateManyThumbnailInputSchema),z.lazy(() => PostCreateManyThumbnailInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
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
  id: z.string().uuid().optional(),
  value: z.string(),
  expired_at: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutAccessTokensInputSchema)
}).strict();

export const AccessTokenUncheckedCreateWithoutRefreshTokenInputSchema: z.ZodType<Prisma.AccessTokenUncheckedCreateWithoutRefreshTokenInput> = z.object({
  id: z.string().uuid().optional(),
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
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expired_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAccessTokensNestedInputSchema).optional()
}).strict();

export const AccessTokenUncheckedUpdateWithoutRefreshTokenInputSchema: z.ZodType<Prisma.AccessTokenUncheckedUpdateWithoutRefreshTokenInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expired_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RefreshTokenCreateWithoutAccessTokenInputSchema: z.ZodType<Prisma.RefreshTokenCreateWithoutAccessTokenInput> = z.object({
  id: z.string().uuid().optional(),
  value: z.string(),
  expired_at: z.coerce.date(),
  createdAt: z.coerce.date().optional()
}).strict();

export const RefreshTokenUncheckedCreateWithoutAccessTokenInputSchema: z.ZodType<Prisma.RefreshTokenUncheckedCreateWithoutAccessTokenInput> = z.object({
  id: z.string().uuid().optional(),
  value: z.string(),
  expired_at: z.coerce.date(),
  createdAt: z.coerce.date().optional()
}).strict();

export const RefreshTokenCreateOrConnectWithoutAccessTokenInputSchema: z.ZodType<Prisma.RefreshTokenCreateOrConnectWithoutAccessTokenInput> = z.object({
  where: z.lazy(() => RefreshTokenWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RefreshTokenCreateWithoutAccessTokenInputSchema),z.lazy(() => RefreshTokenUncheckedCreateWithoutAccessTokenInputSchema) ]),
}).strict();

export const UserCreateWithoutAccessTokensInputSchema: z.ZodType<Prisma.UserCreateWithoutAccessTokensInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  name: z.string(),
  provider: z.string(),
  activated: z.boolean().optional(),
  avatar: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostCreateNestedManyWithoutAuthorInputSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutOwnerInputSchema).optional(),
  LikeComments: z.lazy(() => UserLikeCommentsCreateNestedManyWithoutUserInputSchema).optional(),
  roles: z.lazy(() => UsersRolesCreateNestedManyWithoutUserInputSchema).optional(),
  permissions: z.lazy(() => UsersPermissionsCreateNestedManyWithoutUserInputSchema).optional(),
  likedPosts: z.lazy(() => UserLikedPostsCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAccessTokensInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccessTokensInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  name: z.string(),
  provider: z.string(),
  activated: z.boolean().optional(),
  avatar: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutOwnerInputSchema).optional(),
  LikeComments: z.lazy(() => UserLikeCommentsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  roles: z.lazy(() => UsersRolesUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  permissions: z.lazy(() => UsersPermissionsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  likedPosts: z.lazy(() => UserLikedPostsUncheckedCreateNestedManyWithoutUserInputSchema).optional()
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
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expired_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RefreshTokenUncheckedUpdateWithoutAccessTokenInputSchema: z.ZodType<Prisma.RefreshTokenUncheckedUpdateWithoutAccessTokenInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUpdateManyWithoutAuthorNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutOwnerNestedInputSchema).optional(),
  LikeComments: z.lazy(() => UserLikeCommentsUpdateManyWithoutUserNestedInputSchema).optional(),
  roles: z.lazy(() => UsersRolesUpdateManyWithoutUserNestedInputSchema).optional(),
  permissions: z.lazy(() => UsersPermissionsUpdateManyWithoutUserNestedInputSchema).optional(),
  likedPosts: z.lazy(() => UserLikedPostsUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAccessTokensInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccessTokensInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutOwnerNestedInputSchema).optional(),
  LikeComments: z.lazy(() => UserLikeCommentsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  roles: z.lazy(() => UsersRolesUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  permissions: z.lazy(() => UsersPermissionsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  likedPosts: z.lazy(() => UserLikedPostsUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const PostCreateWithoutCommentsInputSchema: z.ZodType<Prisma.PostCreateWithoutCommentsInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string().optional().nullable(),
  meta: z.string(),
  tags: z.union([ z.lazy(() => PostCreatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  thumbnail: z.lazy(() => MediaEntityCreateNestedOneWithoutPostInputSchema).optional(),
  author: z.lazy(() => UserCreateNestedOneWithoutPostsInputSchema).optional(),
  likedUsers: z.lazy(() => UserLikedPostsCreateNestedManyWithoutPostInputSchema).optional(),
  translations: z.lazy(() => TranslationCreateNestedManyWithoutPostInputSchema).optional()
}).strict();

export const PostUncheckedCreateWithoutCommentsInputSchema: z.ZodType<Prisma.PostUncheckedCreateWithoutCommentsInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string().optional().nullable(),
  meta: z.string(),
  tags: z.union([ z.lazy(() => PostCreatetagsInputSchema),z.string().array() ]).optional(),
  thumbnailId: z.string().optional().nullable(),
  authorId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  likedUsers: z.lazy(() => UserLikedPostsUncheckedCreateNestedManyWithoutPostInputSchema).optional(),
  translations: z.lazy(() => TranslationUncheckedCreateNestedManyWithoutPostInputSchema).optional()
}).strict();

export const PostCreateOrConnectWithoutCommentsInputSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutCommentsInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PostCreateWithoutCommentsInputSchema),z.lazy(() => PostUncheckedCreateWithoutCommentsInputSchema) ]),
}).strict();

export const UserCreateWithoutCommentsInputSchema: z.ZodType<Prisma.UserCreateWithoutCommentsInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  name: z.string(),
  provider: z.string(),
  activated: z.boolean().optional(),
  avatar: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostCreateNestedManyWithoutAuthorInputSchema).optional(),
  LikeComments: z.lazy(() => UserLikeCommentsCreateNestedManyWithoutUserInputSchema).optional(),
  roles: z.lazy(() => UsersRolesCreateNestedManyWithoutUserInputSchema).optional(),
  permissions: z.lazy(() => UsersPermissionsCreateNestedManyWithoutUserInputSchema).optional(),
  likedPosts: z.lazy(() => UserLikedPostsCreateNestedManyWithoutUserInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutCommentsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutCommentsInput> = z.object({
  id: z.string().uuid().optional(),
  email: z.string(),
  name: z.string(),
  provider: z.string(),
  activated: z.boolean().optional(),
  avatar: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
  LikeComments: z.lazy(() => UserLikeCommentsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  roles: z.lazy(() => UsersRolesUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  permissions: z.lazy(() => UsersPermissionsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  likedPosts: z.lazy(() => UserLikedPostsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutCommentsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCommentsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutCommentsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema) ]),
}).strict();

export const UserLikeCommentsCreateWithoutCommentInputSchema: z.ZodType<Prisma.UserLikeCommentsCreateWithoutCommentInput> = z.object({
  assignedAt: z.coerce.date().optional(),
  assignedBy: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutLikeCommentsInputSchema)
}).strict();

export const UserLikeCommentsUncheckedCreateWithoutCommentInputSchema: z.ZodType<Prisma.UserLikeCommentsUncheckedCreateWithoutCommentInput> = z.object({
  userId: z.string(),
  assignedAt: z.coerce.date().optional(),
  assignedBy: z.string()
}).strict();

export const UserLikeCommentsCreateOrConnectWithoutCommentInputSchema: z.ZodType<Prisma.UserLikeCommentsCreateOrConnectWithoutCommentInput> = z.object({
  where: z.lazy(() => UserLikeCommentsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserLikeCommentsCreateWithoutCommentInputSchema),z.lazy(() => UserLikeCommentsUncheckedCreateWithoutCommentInputSchema) ]),
}).strict();

export const UserLikeCommentsCreateManyCommentInputEnvelopeSchema: z.ZodType<Prisma.UserLikeCommentsCreateManyCommentInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserLikeCommentsCreateManyCommentInputSchema),z.lazy(() => UserLikeCommentsCreateManyCommentInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CommentCreateWithoutRepliesInputSchema: z.ZodType<Prisma.CommentCreateWithoutRepliesInput> = z.object({
  id: z.string().uuid().optional(),
  content: z.string(),
  chiefComment: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  belongsTo: z.lazy(() => PostCreateNestedOneWithoutCommentsInputSchema).optional(),
  owner: z.lazy(() => UserCreateNestedOneWithoutCommentsInputSchema),
  likes: z.lazy(() => UserLikeCommentsCreateNestedManyWithoutCommentInputSchema).optional(),
  replyTo: z.lazy(() => CommentCreateNestedOneWithoutRepliesInputSchema).optional()
}).strict();

export const CommentUncheckedCreateWithoutRepliesInputSchema: z.ZodType<Prisma.CommentUncheckedCreateWithoutRepliesInput> = z.object({
  id: z.string().uuid().optional(),
  belongsToId: z.string().optional().nullable(),
  ownerId: z.string(),
  content: z.string(),
  repliedToID: z.string().optional().nullable(),
  chiefComment: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  likes: z.lazy(() => UserLikeCommentsUncheckedCreateNestedManyWithoutCommentInputSchema).optional()
}).strict();

export const CommentCreateOrConnectWithoutRepliesInputSchema: z.ZodType<Prisma.CommentCreateOrConnectWithoutRepliesInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommentCreateWithoutRepliesInputSchema),z.lazy(() => CommentUncheckedCreateWithoutRepliesInputSchema) ]),
}).strict();

export const CommentCreateWithoutReplyToInputSchema: z.ZodType<Prisma.CommentCreateWithoutReplyToInput> = z.object({
  id: z.string().uuid().optional(),
  content: z.string(),
  chiefComment: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  belongsTo: z.lazy(() => PostCreateNestedOneWithoutCommentsInputSchema).optional(),
  owner: z.lazy(() => UserCreateNestedOneWithoutCommentsInputSchema),
  likes: z.lazy(() => UserLikeCommentsCreateNestedManyWithoutCommentInputSchema).optional(),
  replies: z.lazy(() => CommentCreateNestedManyWithoutReplyToInputSchema).optional()
}).strict();

export const CommentUncheckedCreateWithoutReplyToInputSchema: z.ZodType<Prisma.CommentUncheckedCreateWithoutReplyToInput> = z.object({
  id: z.string().uuid().optional(),
  belongsToId: z.string().optional().nullable(),
  ownerId: z.string(),
  content: z.string(),
  chiefComment: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  likes: z.lazy(() => UserLikeCommentsUncheckedCreateNestedManyWithoutCommentInputSchema).optional(),
  replies: z.lazy(() => CommentUncheckedCreateNestedManyWithoutReplyToInputSchema).optional()
}).strict();

export const CommentCreateOrConnectWithoutReplyToInputSchema: z.ZodType<Prisma.CommentCreateOrConnectWithoutReplyToInput> = z.object({
  where: z.lazy(() => CommentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommentCreateWithoutReplyToInputSchema),z.lazy(() => CommentUncheckedCreateWithoutReplyToInputSchema) ]),
}).strict();

export const CommentCreateManyReplyToInputEnvelopeSchema: z.ZodType<Prisma.CommentCreateManyReplyToInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CommentCreateManyReplyToInputSchema),z.lazy(() => CommentCreateManyReplyToInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
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
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => PostUpdatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  thumbnail: z.lazy(() => MediaEntityUpdateOneWithoutPostNestedInputSchema).optional(),
  author: z.lazy(() => UserUpdateOneWithoutPostsNestedInputSchema).optional(),
  likedUsers: z.lazy(() => UserLikedPostsUpdateManyWithoutPostNestedInputSchema).optional(),
  translations: z.lazy(() => TranslationUpdateManyWithoutPostNestedInputSchema).optional()
}).strict();

export const PostUncheckedUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.PostUncheckedUpdateWithoutCommentsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => PostUpdatetagsInputSchema),z.string().array() ]).optional(),
  thumbnailId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  authorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  likedUsers: z.lazy(() => UserLikedPostsUncheckedUpdateManyWithoutPostNestedInputSchema).optional(),
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
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUpdateManyWithoutAuthorNestedInputSchema).optional(),
  LikeComments: z.lazy(() => UserLikeCommentsUpdateManyWithoutUserNestedInputSchema).optional(),
  roles: z.lazy(() => UsersRolesUpdateManyWithoutUserNestedInputSchema).optional(),
  permissions: z.lazy(() => UsersPermissionsUpdateManyWithoutUserNestedInputSchema).optional(),
  likedPosts: z.lazy(() => UserLikedPostsUpdateManyWithoutUserNestedInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutCommentsInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activated: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
  LikeComments: z.lazy(() => UserLikeCommentsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  roles: z.lazy(() => UsersRolesUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  permissions: z.lazy(() => UsersPermissionsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  likedPosts: z.lazy(() => UserLikedPostsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  accessTokens: z.lazy(() => AccessTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserLikeCommentsUpsertWithWhereUniqueWithoutCommentInputSchema: z.ZodType<Prisma.UserLikeCommentsUpsertWithWhereUniqueWithoutCommentInput> = z.object({
  where: z.lazy(() => UserLikeCommentsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserLikeCommentsUpdateWithoutCommentInputSchema),z.lazy(() => UserLikeCommentsUncheckedUpdateWithoutCommentInputSchema) ]),
  create: z.union([ z.lazy(() => UserLikeCommentsCreateWithoutCommentInputSchema),z.lazy(() => UserLikeCommentsUncheckedCreateWithoutCommentInputSchema) ]),
}).strict();

export const UserLikeCommentsUpdateWithWhereUniqueWithoutCommentInputSchema: z.ZodType<Prisma.UserLikeCommentsUpdateWithWhereUniqueWithoutCommentInput> = z.object({
  where: z.lazy(() => UserLikeCommentsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserLikeCommentsUpdateWithoutCommentInputSchema),z.lazy(() => UserLikeCommentsUncheckedUpdateWithoutCommentInputSchema) ]),
}).strict();

export const UserLikeCommentsUpdateManyWithWhereWithoutCommentInputSchema: z.ZodType<Prisma.UserLikeCommentsUpdateManyWithWhereWithoutCommentInput> = z.object({
  where: z.lazy(() => UserLikeCommentsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserLikeCommentsUpdateManyMutationInputSchema),z.lazy(() => UserLikeCommentsUncheckedUpdateManyWithoutCommentInputSchema) ]),
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
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  chiefComment: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  belongsTo: z.lazy(() => PostUpdateOneWithoutCommentsNestedInputSchema).optional(),
  owner: z.lazy(() => UserUpdateOneRequiredWithoutCommentsNestedInputSchema).optional(),
  likes: z.lazy(() => UserLikeCommentsUpdateManyWithoutCommentNestedInputSchema).optional(),
  replyTo: z.lazy(() => CommentUpdateOneWithoutRepliesNestedInputSchema).optional()
}).strict();

export const CommentUncheckedUpdateWithoutRepliesInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateWithoutRepliesInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  belongsToId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  repliedToID: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chiefComment: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  likes: z.lazy(() => UserLikeCommentsUncheckedUpdateManyWithoutCommentNestedInputSchema).optional()
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
  id: z.string().uuid().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string().optional().nullable(),
  meta: z.string(),
  tags: z.union([ z.lazy(() => PostCreatetagsInputSchema),z.string().array() ]).optional(),
  thumbnailId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const CommentCreateManyOwnerInputSchema: z.ZodType<Prisma.CommentCreateManyOwnerInput> = z.object({
  id: z.string().uuid().optional(),
  belongsToId: z.string().optional().nullable(),
  content: z.string(),
  repliedToID: z.string().optional().nullable(),
  chiefComment: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserLikeCommentsCreateManyUserInputSchema: z.ZodType<Prisma.UserLikeCommentsCreateManyUserInput> = z.object({
  commentId: z.string(),
  assignedAt: z.coerce.date().optional(),
  assignedBy: z.string()
}).strict();

export const UsersRolesCreateManyUserInputSchema: z.ZodType<Prisma.UsersRolesCreateManyUserInput> = z.object({
  roleId: z.string(),
  assignedAt: z.coerce.date().optional(),
  assignedBy: z.string()
}).strict();

export const UsersPermissionsCreateManyUserInputSchema: z.ZodType<Prisma.UsersPermissionsCreateManyUserInput> = z.object({
  permissionId: z.string(),
  assignedAt: z.coerce.date().optional(),
  assignedBy: z.string()
}).strict();

export const UserLikedPostsCreateManyUserInputSchema: z.ZodType<Prisma.UserLikedPostsCreateManyUserInput> = z.object({
  postId: z.string(),
  assignedAt: z.coerce.date().optional(),
  assignedBy: z.string()
}).strict();

export const AccessTokenCreateManyUserInputSchema: z.ZodType<Prisma.AccessTokenCreateManyUserInput> = z.object({
  id: z.string().uuid().optional(),
  value: z.string(),
  expired_at: z.coerce.date(),
  createdAt: z.coerce.date().optional()
}).strict();

export const PostUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.PostUpdateWithoutAuthorInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => PostUpdatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  thumbnail: z.lazy(() => MediaEntityUpdateOneWithoutPostNestedInputSchema).optional(),
  likedUsers: z.lazy(() => UserLikedPostsUpdateManyWithoutPostNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutBelongsToNestedInputSchema).optional(),
  translations: z.lazy(() => TranslationUpdateManyWithoutPostNestedInputSchema).optional()
}).strict();

export const PostUncheckedUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.PostUncheckedUpdateWithoutAuthorInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => PostUpdatetagsInputSchema),z.string().array() ]).optional(),
  thumbnailId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  likedUsers: z.lazy(() => UserLikedPostsUncheckedUpdateManyWithoutPostNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutBelongsToNestedInputSchema).optional(),
  translations: z.lazy(() => TranslationUncheckedUpdateManyWithoutPostNestedInputSchema).optional()
}).strict();

export const PostUncheckedUpdateManyWithoutAuthorInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyWithoutAuthorInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => PostUpdatetagsInputSchema),z.string().array() ]).optional(),
  thumbnailId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentUpdateWithoutOwnerInputSchema: z.ZodType<Prisma.CommentUpdateWithoutOwnerInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  chiefComment: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  belongsTo: z.lazy(() => PostUpdateOneWithoutCommentsNestedInputSchema).optional(),
  likes: z.lazy(() => UserLikeCommentsUpdateManyWithoutCommentNestedInputSchema).optional(),
  replyTo: z.lazy(() => CommentUpdateOneWithoutRepliesNestedInputSchema).optional(),
  replies: z.lazy(() => CommentUpdateManyWithoutReplyToNestedInputSchema).optional()
}).strict();

export const CommentUncheckedUpdateWithoutOwnerInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateWithoutOwnerInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  belongsToId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  repliedToID: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chiefComment: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  likes: z.lazy(() => UserLikeCommentsUncheckedUpdateManyWithoutCommentNestedInputSchema).optional(),
  replies: z.lazy(() => CommentUncheckedUpdateManyWithoutReplyToNestedInputSchema).optional()
}).strict();

export const CommentUncheckedUpdateManyWithoutOwnerInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutOwnerInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  belongsToId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  repliedToID: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chiefComment: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserLikeCommentsUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserLikeCommentsUpdateWithoutUserInput> = z.object({
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assignedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  comment: z.lazy(() => CommentUpdateOneRequiredWithoutLikesNestedInputSchema).optional()
}).strict();

export const UserLikeCommentsUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserLikeCommentsUncheckedUpdateWithoutUserInput> = z.object({
  commentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assignedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserLikeCommentsUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.UserLikeCommentsUncheckedUpdateManyWithoutUserInput> = z.object({
  commentId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assignedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UsersRolesUpdateWithoutUserInputSchema: z.ZodType<Prisma.UsersRolesUpdateWithoutUserInput> = z.object({
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assignedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.lazy(() => RoleUpdateOneRequiredWithoutUsersNestedInputSchema).optional()
}).strict();

export const UsersRolesUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.UsersRolesUncheckedUpdateWithoutUserInput> = z.object({
  roleId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assignedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UsersRolesUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.UsersRolesUncheckedUpdateManyWithoutUserInput> = z.object({
  roleId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assignedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UsersPermissionsUpdateWithoutUserInputSchema: z.ZodType<Prisma.UsersPermissionsUpdateWithoutUserInput> = z.object({
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assignedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  permission: z.lazy(() => PermissionUpdateOneRequiredWithoutUsersNestedInputSchema).optional()
}).strict();

export const UsersPermissionsUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.UsersPermissionsUncheckedUpdateWithoutUserInput> = z.object({
  permissionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assignedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UsersPermissionsUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.UsersPermissionsUncheckedUpdateManyWithoutUserInput> = z.object({
  permissionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assignedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserLikedPostsUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserLikedPostsUpdateWithoutUserInput> = z.object({
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assignedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  post: z.lazy(() => PostUpdateOneRequiredWithoutLikedUsersNestedInputSchema).optional()
}).strict();

export const UserLikedPostsUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserLikedPostsUncheckedUpdateWithoutUserInput> = z.object({
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assignedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserLikedPostsUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.UserLikedPostsUncheckedUpdateManyWithoutUserInput> = z.object({
  postId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assignedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccessTokenUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccessTokenUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expired_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  refreshToken: z.lazy(() => RefreshTokenUpdateOneWithoutAccessTokenNestedInputSchema).optional()
}).strict();

export const AccessTokenUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccessTokenUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expired_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  refreshToken: z.lazy(() => RefreshTokenUncheckedUpdateOneWithoutAccessTokenNestedInputSchema).optional()
}).strict();

export const AccessTokenUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.AccessTokenUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expired_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RolesPermissionsCreateManyRoleInputSchema: z.ZodType<Prisma.RolesPermissionsCreateManyRoleInput> = z.object({
  permissionId: z.string(),
  assignedAt: z.coerce.date().optional(),
  assignedBy: z.string()
}).strict();

export const UsersRolesCreateManyRoleInputSchema: z.ZodType<Prisma.UsersRolesCreateManyRoleInput> = z.object({
  userId: z.string(),
  assignedAt: z.coerce.date().optional(),
  assignedBy: z.string()
}).strict();

export const RolesPermissionsUpdateWithoutRoleInputSchema: z.ZodType<Prisma.RolesPermissionsUpdateWithoutRoleInput> = z.object({
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assignedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  permission: z.lazy(() => PermissionUpdateOneRequiredWithoutRolesNestedInputSchema).optional()
}).strict();

export const RolesPermissionsUncheckedUpdateWithoutRoleInputSchema: z.ZodType<Prisma.RolesPermissionsUncheckedUpdateWithoutRoleInput> = z.object({
  permissionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assignedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RolesPermissionsUncheckedUpdateManyWithoutRoleInputSchema: z.ZodType<Prisma.RolesPermissionsUncheckedUpdateManyWithoutRoleInput> = z.object({
  permissionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assignedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UsersRolesUpdateWithoutRoleInputSchema: z.ZodType<Prisma.UsersRolesUpdateWithoutRoleInput> = z.object({
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assignedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutRolesNestedInputSchema).optional()
}).strict();

export const UsersRolesUncheckedUpdateWithoutRoleInputSchema: z.ZodType<Prisma.UsersRolesUncheckedUpdateWithoutRoleInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assignedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UsersRolesUncheckedUpdateManyWithoutRoleInputSchema: z.ZodType<Prisma.UsersRolesUncheckedUpdateManyWithoutRoleInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assignedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RolesPermissionsCreateManyPermissionInputSchema: z.ZodType<Prisma.RolesPermissionsCreateManyPermissionInput> = z.object({
  roleId: z.string(),
  assignedAt: z.coerce.date().optional(),
  assignedBy: z.string()
}).strict();

export const UsersPermissionsCreateManyPermissionInputSchema: z.ZodType<Prisma.UsersPermissionsCreateManyPermissionInput> = z.object({
  userId: z.string(),
  assignedAt: z.coerce.date().optional(),
  assignedBy: z.string()
}).strict();

export const RolesPermissionsUpdateWithoutPermissionInputSchema: z.ZodType<Prisma.RolesPermissionsUpdateWithoutPermissionInput> = z.object({
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assignedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.lazy(() => RoleUpdateOneRequiredWithoutPermissionsNestedInputSchema).optional()
}).strict();

export const RolesPermissionsUncheckedUpdateWithoutPermissionInputSchema: z.ZodType<Prisma.RolesPermissionsUncheckedUpdateWithoutPermissionInput> = z.object({
  roleId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assignedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RolesPermissionsUncheckedUpdateManyWithoutPermissionInputSchema: z.ZodType<Prisma.RolesPermissionsUncheckedUpdateManyWithoutPermissionInput> = z.object({
  roleId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assignedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UsersPermissionsUpdateWithoutPermissionInputSchema: z.ZodType<Prisma.UsersPermissionsUpdateWithoutPermissionInput> = z.object({
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assignedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutPermissionsNestedInputSchema).optional()
}).strict();

export const UsersPermissionsUncheckedUpdateWithoutPermissionInputSchema: z.ZodType<Prisma.UsersPermissionsUncheckedUpdateWithoutPermissionInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assignedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UsersPermissionsUncheckedUpdateManyWithoutPermissionInputSchema: z.ZodType<Prisma.UsersPermissionsUncheckedUpdateManyWithoutPermissionInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assignedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserLikedPostsCreateManyPostInputSchema: z.ZodType<Prisma.UserLikedPostsCreateManyPostInput> = z.object({
  userId: z.string(),
  assignedAt: z.coerce.date().optional(),
  assignedBy: z.string()
}).strict();

export const CommentCreateManyBelongsToInputSchema: z.ZodType<Prisma.CommentCreateManyBelongsToInput> = z.object({
  id: z.string().uuid().optional(),
  ownerId: z.string(),
  content: z.string(),
  repliedToID: z.string().optional().nullable(),
  chiefComment: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TranslationCreateManyPostInputSchema: z.ZodType<Prisma.TranslationCreateManyPostInput> = z.object({
  id: z.string().uuid().optional(),
  language: z.string(),
  title: z.string(),
  content: z.string().optional().nullable(),
  meta: z.string()
}).strict();

export const UserLikedPostsUpdateWithoutPostInputSchema: z.ZodType<Prisma.UserLikedPostsUpdateWithoutPostInput> = z.object({
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assignedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutLikedPostsNestedInputSchema).optional()
}).strict();

export const UserLikedPostsUncheckedUpdateWithoutPostInputSchema: z.ZodType<Prisma.UserLikedPostsUncheckedUpdateWithoutPostInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assignedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserLikedPostsUncheckedUpdateManyWithoutPostInputSchema: z.ZodType<Prisma.UserLikedPostsUncheckedUpdateManyWithoutPostInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assignedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentUpdateWithoutBelongsToInputSchema: z.ZodType<Prisma.CommentUpdateWithoutBelongsToInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  chiefComment: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  owner: z.lazy(() => UserUpdateOneRequiredWithoutCommentsNestedInputSchema).optional(),
  likes: z.lazy(() => UserLikeCommentsUpdateManyWithoutCommentNestedInputSchema).optional(),
  replyTo: z.lazy(() => CommentUpdateOneWithoutRepliesNestedInputSchema).optional(),
  replies: z.lazy(() => CommentUpdateManyWithoutReplyToNestedInputSchema).optional()
}).strict();

export const CommentUncheckedUpdateWithoutBelongsToInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateWithoutBelongsToInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  repliedToID: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chiefComment: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  likes: z.lazy(() => UserLikeCommentsUncheckedUpdateManyWithoutCommentNestedInputSchema).optional(),
  replies: z.lazy(() => CommentUncheckedUpdateManyWithoutReplyToNestedInputSchema).optional()
}).strict();

export const CommentUncheckedUpdateManyWithoutBelongsToInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutBelongsToInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  repliedToID: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chiefComment: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TranslationUpdateWithoutPostInputSchema: z.ZodType<Prisma.TranslationUpdateWithoutPostInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TranslationUncheckedUpdateWithoutPostInputSchema: z.ZodType<Prisma.TranslationUncheckedUpdateWithoutPostInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TranslationUncheckedUpdateManyWithoutPostInputSchema: z.ZodType<Prisma.TranslationUncheckedUpdateManyWithoutPostInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  language: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PostCreateManyThumbnailInputSchema: z.ZodType<Prisma.PostCreateManyThumbnailInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  slug: z.string(),
  content: z.string().optional().nullable(),
  meta: z.string(),
  tags: z.union([ z.lazy(() => PostCreatetagsInputSchema),z.string().array() ]).optional(),
  authorId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PostUpdateWithoutThumbnailInputSchema: z.ZodType<Prisma.PostUpdateWithoutThumbnailInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => PostUpdatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  author: z.lazy(() => UserUpdateOneWithoutPostsNestedInputSchema).optional(),
  likedUsers: z.lazy(() => UserLikedPostsUpdateManyWithoutPostNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUpdateManyWithoutBelongsToNestedInputSchema).optional(),
  translations: z.lazy(() => TranslationUpdateManyWithoutPostNestedInputSchema).optional()
}).strict();

export const PostUncheckedUpdateWithoutThumbnailInputSchema: z.ZodType<Prisma.PostUncheckedUpdateWithoutThumbnailInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => PostUpdatetagsInputSchema),z.string().array() ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  likedUsers: z.lazy(() => UserLikedPostsUncheckedUpdateManyWithoutPostNestedInputSchema).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutBelongsToNestedInputSchema).optional(),
  translations: z.lazy(() => TranslationUncheckedUpdateManyWithoutPostNestedInputSchema).optional()
}).strict();

export const PostUncheckedUpdateManyWithoutThumbnailInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyWithoutThumbnailInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meta: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.union([ z.lazy(() => PostUpdatetagsInputSchema),z.string().array() ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserLikeCommentsCreateManyCommentInputSchema: z.ZodType<Prisma.UserLikeCommentsCreateManyCommentInput> = z.object({
  userId: z.string(),
  assignedAt: z.coerce.date().optional(),
  assignedBy: z.string()
}).strict();

export const CommentCreateManyReplyToInputSchema: z.ZodType<Prisma.CommentCreateManyReplyToInput> = z.object({
  id: z.string().uuid().optional(),
  belongsToId: z.string().optional().nullable(),
  ownerId: z.string(),
  content: z.string(),
  chiefComment: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserLikeCommentsUpdateWithoutCommentInputSchema: z.ZodType<Prisma.UserLikeCommentsUpdateWithoutCommentInput> = z.object({
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assignedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutLikeCommentsNestedInputSchema).optional()
}).strict();

export const UserLikeCommentsUncheckedUpdateWithoutCommentInputSchema: z.ZodType<Prisma.UserLikeCommentsUncheckedUpdateWithoutCommentInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assignedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserLikeCommentsUncheckedUpdateManyWithoutCommentInputSchema: z.ZodType<Prisma.UserLikeCommentsUncheckedUpdateManyWithoutCommentInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  assignedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  assignedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommentUpdateWithoutReplyToInputSchema: z.ZodType<Prisma.CommentUpdateWithoutReplyToInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  chiefComment: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  belongsTo: z.lazy(() => PostUpdateOneWithoutCommentsNestedInputSchema).optional(),
  owner: z.lazy(() => UserUpdateOneRequiredWithoutCommentsNestedInputSchema).optional(),
  likes: z.lazy(() => UserLikeCommentsUpdateManyWithoutCommentNestedInputSchema).optional(),
  replies: z.lazy(() => CommentUpdateManyWithoutReplyToNestedInputSchema).optional()
}).strict();

export const CommentUncheckedUpdateWithoutReplyToInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateWithoutReplyToInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  belongsToId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  chiefComment: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  likes: z.lazy(() => UserLikeCommentsUncheckedUpdateManyWithoutCommentNestedInputSchema).optional(),
  replies: z.lazy(() => CommentUncheckedUpdateManyWithoutReplyToNestedInputSchema).optional()
}).strict();

export const CommentUncheckedUpdateManyWithoutReplyToInputSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutReplyToInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  belongsToId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ownerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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

export const UserLikeCommentsFindFirstArgsSchema: z.ZodType<Prisma.UserLikeCommentsFindFirstArgs> = z.object({
  select: UserLikeCommentsSelectSchema.optional(),
  include: UserLikeCommentsIncludeSchema.optional(),
  where: UserLikeCommentsWhereInputSchema.optional(),
  orderBy: z.union([ UserLikeCommentsOrderByWithRelationInputSchema.array(),UserLikeCommentsOrderByWithRelationInputSchema ]).optional(),
  cursor: UserLikeCommentsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserLikeCommentsScalarFieldEnumSchema,UserLikeCommentsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserLikeCommentsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserLikeCommentsFindFirstOrThrowArgs> = z.object({
  select: UserLikeCommentsSelectSchema.optional(),
  include: UserLikeCommentsIncludeSchema.optional(),
  where: UserLikeCommentsWhereInputSchema.optional(),
  orderBy: z.union([ UserLikeCommentsOrderByWithRelationInputSchema.array(),UserLikeCommentsOrderByWithRelationInputSchema ]).optional(),
  cursor: UserLikeCommentsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserLikeCommentsScalarFieldEnumSchema,UserLikeCommentsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserLikeCommentsFindManyArgsSchema: z.ZodType<Prisma.UserLikeCommentsFindManyArgs> = z.object({
  select: UserLikeCommentsSelectSchema.optional(),
  include: UserLikeCommentsIncludeSchema.optional(),
  where: UserLikeCommentsWhereInputSchema.optional(),
  orderBy: z.union([ UserLikeCommentsOrderByWithRelationInputSchema.array(),UserLikeCommentsOrderByWithRelationInputSchema ]).optional(),
  cursor: UserLikeCommentsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserLikeCommentsScalarFieldEnumSchema,UserLikeCommentsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserLikeCommentsAggregateArgsSchema: z.ZodType<Prisma.UserLikeCommentsAggregateArgs> = z.object({
  where: UserLikeCommentsWhereInputSchema.optional(),
  orderBy: z.union([ UserLikeCommentsOrderByWithRelationInputSchema.array(),UserLikeCommentsOrderByWithRelationInputSchema ]).optional(),
  cursor: UserLikeCommentsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserLikeCommentsGroupByArgsSchema: z.ZodType<Prisma.UserLikeCommentsGroupByArgs> = z.object({
  where: UserLikeCommentsWhereInputSchema.optional(),
  orderBy: z.union([ UserLikeCommentsOrderByWithAggregationInputSchema.array(),UserLikeCommentsOrderByWithAggregationInputSchema ]).optional(),
  by: UserLikeCommentsScalarFieldEnumSchema.array(),
  having: UserLikeCommentsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserLikeCommentsFindUniqueArgsSchema: z.ZodType<Prisma.UserLikeCommentsFindUniqueArgs> = z.object({
  select: UserLikeCommentsSelectSchema.optional(),
  include: UserLikeCommentsIncludeSchema.optional(),
  where: UserLikeCommentsWhereUniqueInputSchema,
}).strict()

export const UserLikeCommentsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserLikeCommentsFindUniqueOrThrowArgs> = z.object({
  select: UserLikeCommentsSelectSchema.optional(),
  include: UserLikeCommentsIncludeSchema.optional(),
  where: UserLikeCommentsWhereUniqueInputSchema,
}).strict()

export const UserLikedPostsFindFirstArgsSchema: z.ZodType<Prisma.UserLikedPostsFindFirstArgs> = z.object({
  select: UserLikedPostsSelectSchema.optional(),
  include: UserLikedPostsIncludeSchema.optional(),
  where: UserLikedPostsWhereInputSchema.optional(),
  orderBy: z.union([ UserLikedPostsOrderByWithRelationInputSchema.array(),UserLikedPostsOrderByWithRelationInputSchema ]).optional(),
  cursor: UserLikedPostsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserLikedPostsScalarFieldEnumSchema,UserLikedPostsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserLikedPostsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserLikedPostsFindFirstOrThrowArgs> = z.object({
  select: UserLikedPostsSelectSchema.optional(),
  include: UserLikedPostsIncludeSchema.optional(),
  where: UserLikedPostsWhereInputSchema.optional(),
  orderBy: z.union([ UserLikedPostsOrderByWithRelationInputSchema.array(),UserLikedPostsOrderByWithRelationInputSchema ]).optional(),
  cursor: UserLikedPostsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserLikedPostsScalarFieldEnumSchema,UserLikedPostsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserLikedPostsFindManyArgsSchema: z.ZodType<Prisma.UserLikedPostsFindManyArgs> = z.object({
  select: UserLikedPostsSelectSchema.optional(),
  include: UserLikedPostsIncludeSchema.optional(),
  where: UserLikedPostsWhereInputSchema.optional(),
  orderBy: z.union([ UserLikedPostsOrderByWithRelationInputSchema.array(),UserLikedPostsOrderByWithRelationInputSchema ]).optional(),
  cursor: UserLikedPostsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserLikedPostsScalarFieldEnumSchema,UserLikedPostsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserLikedPostsAggregateArgsSchema: z.ZodType<Prisma.UserLikedPostsAggregateArgs> = z.object({
  where: UserLikedPostsWhereInputSchema.optional(),
  orderBy: z.union([ UserLikedPostsOrderByWithRelationInputSchema.array(),UserLikedPostsOrderByWithRelationInputSchema ]).optional(),
  cursor: UserLikedPostsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserLikedPostsGroupByArgsSchema: z.ZodType<Prisma.UserLikedPostsGroupByArgs> = z.object({
  where: UserLikedPostsWhereInputSchema.optional(),
  orderBy: z.union([ UserLikedPostsOrderByWithAggregationInputSchema.array(),UserLikedPostsOrderByWithAggregationInputSchema ]).optional(),
  by: UserLikedPostsScalarFieldEnumSchema.array(),
  having: UserLikedPostsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserLikedPostsFindUniqueArgsSchema: z.ZodType<Prisma.UserLikedPostsFindUniqueArgs> = z.object({
  select: UserLikedPostsSelectSchema.optional(),
  include: UserLikedPostsIncludeSchema.optional(),
  where: UserLikedPostsWhereUniqueInputSchema,
}).strict()

export const UserLikedPostsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserLikedPostsFindUniqueOrThrowArgs> = z.object({
  select: UserLikedPostsSelectSchema.optional(),
  include: UserLikedPostsIncludeSchema.optional(),
  where: UserLikedPostsWhereUniqueInputSchema,
}).strict()

export const UsersRolesFindFirstArgsSchema: z.ZodType<Prisma.UsersRolesFindFirstArgs> = z.object({
  select: UsersRolesSelectSchema.optional(),
  include: UsersRolesIncludeSchema.optional(),
  where: UsersRolesWhereInputSchema.optional(),
  orderBy: z.union([ UsersRolesOrderByWithRelationInputSchema.array(),UsersRolesOrderByWithRelationInputSchema ]).optional(),
  cursor: UsersRolesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UsersRolesScalarFieldEnumSchema,UsersRolesScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UsersRolesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UsersRolesFindFirstOrThrowArgs> = z.object({
  select: UsersRolesSelectSchema.optional(),
  include: UsersRolesIncludeSchema.optional(),
  where: UsersRolesWhereInputSchema.optional(),
  orderBy: z.union([ UsersRolesOrderByWithRelationInputSchema.array(),UsersRolesOrderByWithRelationInputSchema ]).optional(),
  cursor: UsersRolesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UsersRolesScalarFieldEnumSchema,UsersRolesScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UsersRolesFindManyArgsSchema: z.ZodType<Prisma.UsersRolesFindManyArgs> = z.object({
  select: UsersRolesSelectSchema.optional(),
  include: UsersRolesIncludeSchema.optional(),
  where: UsersRolesWhereInputSchema.optional(),
  orderBy: z.union([ UsersRolesOrderByWithRelationInputSchema.array(),UsersRolesOrderByWithRelationInputSchema ]).optional(),
  cursor: UsersRolesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UsersRolesScalarFieldEnumSchema,UsersRolesScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UsersRolesAggregateArgsSchema: z.ZodType<Prisma.UsersRolesAggregateArgs> = z.object({
  where: UsersRolesWhereInputSchema.optional(),
  orderBy: z.union([ UsersRolesOrderByWithRelationInputSchema.array(),UsersRolesOrderByWithRelationInputSchema ]).optional(),
  cursor: UsersRolesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UsersRolesGroupByArgsSchema: z.ZodType<Prisma.UsersRolesGroupByArgs> = z.object({
  where: UsersRolesWhereInputSchema.optional(),
  orderBy: z.union([ UsersRolesOrderByWithAggregationInputSchema.array(),UsersRolesOrderByWithAggregationInputSchema ]).optional(),
  by: UsersRolesScalarFieldEnumSchema.array(),
  having: UsersRolesScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UsersRolesFindUniqueArgsSchema: z.ZodType<Prisma.UsersRolesFindUniqueArgs> = z.object({
  select: UsersRolesSelectSchema.optional(),
  include: UsersRolesIncludeSchema.optional(),
  where: UsersRolesWhereUniqueInputSchema,
}).strict()

export const UsersRolesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UsersRolesFindUniqueOrThrowArgs> = z.object({
  select: UsersRolesSelectSchema.optional(),
  include: UsersRolesIncludeSchema.optional(),
  where: UsersRolesWhereUniqueInputSchema,
}).strict()

export const UsersPermissionsFindFirstArgsSchema: z.ZodType<Prisma.UsersPermissionsFindFirstArgs> = z.object({
  select: UsersPermissionsSelectSchema.optional(),
  include: UsersPermissionsIncludeSchema.optional(),
  where: UsersPermissionsWhereInputSchema.optional(),
  orderBy: z.union([ UsersPermissionsOrderByWithRelationInputSchema.array(),UsersPermissionsOrderByWithRelationInputSchema ]).optional(),
  cursor: UsersPermissionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UsersPermissionsScalarFieldEnumSchema,UsersPermissionsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UsersPermissionsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UsersPermissionsFindFirstOrThrowArgs> = z.object({
  select: UsersPermissionsSelectSchema.optional(),
  include: UsersPermissionsIncludeSchema.optional(),
  where: UsersPermissionsWhereInputSchema.optional(),
  orderBy: z.union([ UsersPermissionsOrderByWithRelationInputSchema.array(),UsersPermissionsOrderByWithRelationInputSchema ]).optional(),
  cursor: UsersPermissionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UsersPermissionsScalarFieldEnumSchema,UsersPermissionsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UsersPermissionsFindManyArgsSchema: z.ZodType<Prisma.UsersPermissionsFindManyArgs> = z.object({
  select: UsersPermissionsSelectSchema.optional(),
  include: UsersPermissionsIncludeSchema.optional(),
  where: UsersPermissionsWhereInputSchema.optional(),
  orderBy: z.union([ UsersPermissionsOrderByWithRelationInputSchema.array(),UsersPermissionsOrderByWithRelationInputSchema ]).optional(),
  cursor: UsersPermissionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UsersPermissionsScalarFieldEnumSchema,UsersPermissionsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UsersPermissionsAggregateArgsSchema: z.ZodType<Prisma.UsersPermissionsAggregateArgs> = z.object({
  where: UsersPermissionsWhereInputSchema.optional(),
  orderBy: z.union([ UsersPermissionsOrderByWithRelationInputSchema.array(),UsersPermissionsOrderByWithRelationInputSchema ]).optional(),
  cursor: UsersPermissionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UsersPermissionsGroupByArgsSchema: z.ZodType<Prisma.UsersPermissionsGroupByArgs> = z.object({
  where: UsersPermissionsWhereInputSchema.optional(),
  orderBy: z.union([ UsersPermissionsOrderByWithAggregationInputSchema.array(),UsersPermissionsOrderByWithAggregationInputSchema ]).optional(),
  by: UsersPermissionsScalarFieldEnumSchema.array(),
  having: UsersPermissionsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UsersPermissionsFindUniqueArgsSchema: z.ZodType<Prisma.UsersPermissionsFindUniqueArgs> = z.object({
  select: UsersPermissionsSelectSchema.optional(),
  include: UsersPermissionsIncludeSchema.optional(),
  where: UsersPermissionsWhereUniqueInputSchema,
}).strict()

export const UsersPermissionsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UsersPermissionsFindUniqueOrThrowArgs> = z.object({
  select: UsersPermissionsSelectSchema.optional(),
  include: UsersPermissionsIncludeSchema.optional(),
  where: UsersPermissionsWhereUniqueInputSchema,
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

export const RolesPermissionsFindFirstArgsSchema: z.ZodType<Prisma.RolesPermissionsFindFirstArgs> = z.object({
  select: RolesPermissionsSelectSchema.optional(),
  include: RolesPermissionsIncludeSchema.optional(),
  where: RolesPermissionsWhereInputSchema.optional(),
  orderBy: z.union([ RolesPermissionsOrderByWithRelationInputSchema.array(),RolesPermissionsOrderByWithRelationInputSchema ]).optional(),
  cursor: RolesPermissionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RolesPermissionsScalarFieldEnumSchema,RolesPermissionsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const RolesPermissionsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RolesPermissionsFindFirstOrThrowArgs> = z.object({
  select: RolesPermissionsSelectSchema.optional(),
  include: RolesPermissionsIncludeSchema.optional(),
  where: RolesPermissionsWhereInputSchema.optional(),
  orderBy: z.union([ RolesPermissionsOrderByWithRelationInputSchema.array(),RolesPermissionsOrderByWithRelationInputSchema ]).optional(),
  cursor: RolesPermissionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RolesPermissionsScalarFieldEnumSchema,RolesPermissionsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const RolesPermissionsFindManyArgsSchema: z.ZodType<Prisma.RolesPermissionsFindManyArgs> = z.object({
  select: RolesPermissionsSelectSchema.optional(),
  include: RolesPermissionsIncludeSchema.optional(),
  where: RolesPermissionsWhereInputSchema.optional(),
  orderBy: z.union([ RolesPermissionsOrderByWithRelationInputSchema.array(),RolesPermissionsOrderByWithRelationInputSchema ]).optional(),
  cursor: RolesPermissionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RolesPermissionsScalarFieldEnumSchema,RolesPermissionsScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const RolesPermissionsAggregateArgsSchema: z.ZodType<Prisma.RolesPermissionsAggregateArgs> = z.object({
  where: RolesPermissionsWhereInputSchema.optional(),
  orderBy: z.union([ RolesPermissionsOrderByWithRelationInputSchema.array(),RolesPermissionsOrderByWithRelationInputSchema ]).optional(),
  cursor: RolesPermissionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const RolesPermissionsGroupByArgsSchema: z.ZodType<Prisma.RolesPermissionsGroupByArgs> = z.object({
  where: RolesPermissionsWhereInputSchema.optional(),
  orderBy: z.union([ RolesPermissionsOrderByWithAggregationInputSchema.array(),RolesPermissionsOrderByWithAggregationInputSchema ]).optional(),
  by: RolesPermissionsScalarFieldEnumSchema.array(),
  having: RolesPermissionsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const RolesPermissionsFindUniqueArgsSchema: z.ZodType<Prisma.RolesPermissionsFindUniqueArgs> = z.object({
  select: RolesPermissionsSelectSchema.optional(),
  include: RolesPermissionsIncludeSchema.optional(),
  where: RolesPermissionsWhereUniqueInputSchema,
}).strict()

export const RolesPermissionsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RolesPermissionsFindUniqueOrThrowArgs> = z.object({
  select: RolesPermissionsSelectSchema.optional(),
  include: RolesPermissionsIncludeSchema.optional(),
  where: RolesPermissionsWhereUniqueInputSchema,
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

export const ContactMessageFindFirstArgsSchema: z.ZodType<Prisma.ContactMessageFindFirstArgs> = z.object({
  select: ContactMessageSelectSchema.optional(),
  where: ContactMessageWhereInputSchema.optional(),
  orderBy: z.union([ ContactMessageOrderByWithRelationInputSchema.array(),ContactMessageOrderByWithRelationInputSchema ]).optional(),
  cursor: ContactMessageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ContactMessageScalarFieldEnumSchema,ContactMessageScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ContactMessageFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ContactMessageFindFirstOrThrowArgs> = z.object({
  select: ContactMessageSelectSchema.optional(),
  where: ContactMessageWhereInputSchema.optional(),
  orderBy: z.union([ ContactMessageOrderByWithRelationInputSchema.array(),ContactMessageOrderByWithRelationInputSchema ]).optional(),
  cursor: ContactMessageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ContactMessageScalarFieldEnumSchema,ContactMessageScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ContactMessageFindManyArgsSchema: z.ZodType<Prisma.ContactMessageFindManyArgs> = z.object({
  select: ContactMessageSelectSchema.optional(),
  where: ContactMessageWhereInputSchema.optional(),
  orderBy: z.union([ ContactMessageOrderByWithRelationInputSchema.array(),ContactMessageOrderByWithRelationInputSchema ]).optional(),
  cursor: ContactMessageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ContactMessageScalarFieldEnumSchema,ContactMessageScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ContactMessageAggregateArgsSchema: z.ZodType<Prisma.ContactMessageAggregateArgs> = z.object({
  where: ContactMessageWhereInputSchema.optional(),
  orderBy: z.union([ ContactMessageOrderByWithRelationInputSchema.array(),ContactMessageOrderByWithRelationInputSchema ]).optional(),
  cursor: ContactMessageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ContactMessageGroupByArgsSchema: z.ZodType<Prisma.ContactMessageGroupByArgs> = z.object({
  where: ContactMessageWhereInputSchema.optional(),
  orderBy: z.union([ ContactMessageOrderByWithAggregationInputSchema.array(),ContactMessageOrderByWithAggregationInputSchema ]).optional(),
  by: ContactMessageScalarFieldEnumSchema.array(),
  having: ContactMessageScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ContactMessageFindUniqueArgsSchema: z.ZodType<Prisma.ContactMessageFindUniqueArgs> = z.object({
  select: ContactMessageSelectSchema.optional(),
  where: ContactMessageWhereUniqueInputSchema,
}).strict()

export const ContactMessageFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ContactMessageFindUniqueOrThrowArgs> = z.object({
  select: ContactMessageSelectSchema.optional(),
  where: ContactMessageWhereUniqueInputSchema,
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
  skipDuplicates: z.boolean().optional(),
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

export const UserLikeCommentsCreateArgsSchema: z.ZodType<Prisma.UserLikeCommentsCreateArgs> = z.object({
  select: UserLikeCommentsSelectSchema.optional(),
  include: UserLikeCommentsIncludeSchema.optional(),
  data: z.union([ UserLikeCommentsCreateInputSchema,UserLikeCommentsUncheckedCreateInputSchema ]),
}).strict()

export const UserLikeCommentsUpsertArgsSchema: z.ZodType<Prisma.UserLikeCommentsUpsertArgs> = z.object({
  select: UserLikeCommentsSelectSchema.optional(),
  include: UserLikeCommentsIncludeSchema.optional(),
  where: UserLikeCommentsWhereUniqueInputSchema,
  create: z.union([ UserLikeCommentsCreateInputSchema,UserLikeCommentsUncheckedCreateInputSchema ]),
  update: z.union([ UserLikeCommentsUpdateInputSchema,UserLikeCommentsUncheckedUpdateInputSchema ]),
}).strict()

export const UserLikeCommentsCreateManyArgsSchema: z.ZodType<Prisma.UserLikeCommentsCreateManyArgs> = z.object({
  data: z.union([ UserLikeCommentsCreateManyInputSchema,UserLikeCommentsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const UserLikeCommentsDeleteArgsSchema: z.ZodType<Prisma.UserLikeCommentsDeleteArgs> = z.object({
  select: UserLikeCommentsSelectSchema.optional(),
  include: UserLikeCommentsIncludeSchema.optional(),
  where: UserLikeCommentsWhereUniqueInputSchema,
}).strict()

export const UserLikeCommentsUpdateArgsSchema: z.ZodType<Prisma.UserLikeCommentsUpdateArgs> = z.object({
  select: UserLikeCommentsSelectSchema.optional(),
  include: UserLikeCommentsIncludeSchema.optional(),
  data: z.union([ UserLikeCommentsUpdateInputSchema,UserLikeCommentsUncheckedUpdateInputSchema ]),
  where: UserLikeCommentsWhereUniqueInputSchema,
}).strict()

export const UserLikeCommentsUpdateManyArgsSchema: z.ZodType<Prisma.UserLikeCommentsUpdateManyArgs> = z.object({
  data: z.union([ UserLikeCommentsUpdateManyMutationInputSchema,UserLikeCommentsUncheckedUpdateManyInputSchema ]),
  where: UserLikeCommentsWhereInputSchema.optional(),
}).strict()

export const UserLikeCommentsDeleteManyArgsSchema: z.ZodType<Prisma.UserLikeCommentsDeleteManyArgs> = z.object({
  where: UserLikeCommentsWhereInputSchema.optional(),
}).strict()

export const UserLikedPostsCreateArgsSchema: z.ZodType<Prisma.UserLikedPostsCreateArgs> = z.object({
  select: UserLikedPostsSelectSchema.optional(),
  include: UserLikedPostsIncludeSchema.optional(),
  data: z.union([ UserLikedPostsCreateInputSchema,UserLikedPostsUncheckedCreateInputSchema ]),
}).strict()

export const UserLikedPostsUpsertArgsSchema: z.ZodType<Prisma.UserLikedPostsUpsertArgs> = z.object({
  select: UserLikedPostsSelectSchema.optional(),
  include: UserLikedPostsIncludeSchema.optional(),
  where: UserLikedPostsWhereUniqueInputSchema,
  create: z.union([ UserLikedPostsCreateInputSchema,UserLikedPostsUncheckedCreateInputSchema ]),
  update: z.union([ UserLikedPostsUpdateInputSchema,UserLikedPostsUncheckedUpdateInputSchema ]),
}).strict()

export const UserLikedPostsCreateManyArgsSchema: z.ZodType<Prisma.UserLikedPostsCreateManyArgs> = z.object({
  data: z.union([ UserLikedPostsCreateManyInputSchema,UserLikedPostsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const UserLikedPostsDeleteArgsSchema: z.ZodType<Prisma.UserLikedPostsDeleteArgs> = z.object({
  select: UserLikedPostsSelectSchema.optional(),
  include: UserLikedPostsIncludeSchema.optional(),
  where: UserLikedPostsWhereUniqueInputSchema,
}).strict()

export const UserLikedPostsUpdateArgsSchema: z.ZodType<Prisma.UserLikedPostsUpdateArgs> = z.object({
  select: UserLikedPostsSelectSchema.optional(),
  include: UserLikedPostsIncludeSchema.optional(),
  data: z.union([ UserLikedPostsUpdateInputSchema,UserLikedPostsUncheckedUpdateInputSchema ]),
  where: UserLikedPostsWhereUniqueInputSchema,
}).strict()

export const UserLikedPostsUpdateManyArgsSchema: z.ZodType<Prisma.UserLikedPostsUpdateManyArgs> = z.object({
  data: z.union([ UserLikedPostsUpdateManyMutationInputSchema,UserLikedPostsUncheckedUpdateManyInputSchema ]),
  where: UserLikedPostsWhereInputSchema.optional(),
}).strict()

export const UserLikedPostsDeleteManyArgsSchema: z.ZodType<Prisma.UserLikedPostsDeleteManyArgs> = z.object({
  where: UserLikedPostsWhereInputSchema.optional(),
}).strict()

export const UsersRolesCreateArgsSchema: z.ZodType<Prisma.UsersRolesCreateArgs> = z.object({
  select: UsersRolesSelectSchema.optional(),
  include: UsersRolesIncludeSchema.optional(),
  data: z.union([ UsersRolesCreateInputSchema,UsersRolesUncheckedCreateInputSchema ]),
}).strict()

export const UsersRolesUpsertArgsSchema: z.ZodType<Prisma.UsersRolesUpsertArgs> = z.object({
  select: UsersRolesSelectSchema.optional(),
  include: UsersRolesIncludeSchema.optional(),
  where: UsersRolesWhereUniqueInputSchema,
  create: z.union([ UsersRolesCreateInputSchema,UsersRolesUncheckedCreateInputSchema ]),
  update: z.union([ UsersRolesUpdateInputSchema,UsersRolesUncheckedUpdateInputSchema ]),
}).strict()

export const UsersRolesCreateManyArgsSchema: z.ZodType<Prisma.UsersRolesCreateManyArgs> = z.object({
  data: z.union([ UsersRolesCreateManyInputSchema,UsersRolesCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const UsersRolesDeleteArgsSchema: z.ZodType<Prisma.UsersRolesDeleteArgs> = z.object({
  select: UsersRolesSelectSchema.optional(),
  include: UsersRolesIncludeSchema.optional(),
  where: UsersRolesWhereUniqueInputSchema,
}).strict()

export const UsersRolesUpdateArgsSchema: z.ZodType<Prisma.UsersRolesUpdateArgs> = z.object({
  select: UsersRolesSelectSchema.optional(),
  include: UsersRolesIncludeSchema.optional(),
  data: z.union([ UsersRolesUpdateInputSchema,UsersRolesUncheckedUpdateInputSchema ]),
  where: UsersRolesWhereUniqueInputSchema,
}).strict()

export const UsersRolesUpdateManyArgsSchema: z.ZodType<Prisma.UsersRolesUpdateManyArgs> = z.object({
  data: z.union([ UsersRolesUpdateManyMutationInputSchema,UsersRolesUncheckedUpdateManyInputSchema ]),
  where: UsersRolesWhereInputSchema.optional(),
}).strict()

export const UsersRolesDeleteManyArgsSchema: z.ZodType<Prisma.UsersRolesDeleteManyArgs> = z.object({
  where: UsersRolesWhereInputSchema.optional(),
}).strict()

export const UsersPermissionsCreateArgsSchema: z.ZodType<Prisma.UsersPermissionsCreateArgs> = z.object({
  select: UsersPermissionsSelectSchema.optional(),
  include: UsersPermissionsIncludeSchema.optional(),
  data: z.union([ UsersPermissionsCreateInputSchema,UsersPermissionsUncheckedCreateInputSchema ]),
}).strict()

export const UsersPermissionsUpsertArgsSchema: z.ZodType<Prisma.UsersPermissionsUpsertArgs> = z.object({
  select: UsersPermissionsSelectSchema.optional(),
  include: UsersPermissionsIncludeSchema.optional(),
  where: UsersPermissionsWhereUniqueInputSchema,
  create: z.union([ UsersPermissionsCreateInputSchema,UsersPermissionsUncheckedCreateInputSchema ]),
  update: z.union([ UsersPermissionsUpdateInputSchema,UsersPermissionsUncheckedUpdateInputSchema ]),
}).strict()

export const UsersPermissionsCreateManyArgsSchema: z.ZodType<Prisma.UsersPermissionsCreateManyArgs> = z.object({
  data: z.union([ UsersPermissionsCreateManyInputSchema,UsersPermissionsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const UsersPermissionsDeleteArgsSchema: z.ZodType<Prisma.UsersPermissionsDeleteArgs> = z.object({
  select: UsersPermissionsSelectSchema.optional(),
  include: UsersPermissionsIncludeSchema.optional(),
  where: UsersPermissionsWhereUniqueInputSchema,
}).strict()

export const UsersPermissionsUpdateArgsSchema: z.ZodType<Prisma.UsersPermissionsUpdateArgs> = z.object({
  select: UsersPermissionsSelectSchema.optional(),
  include: UsersPermissionsIncludeSchema.optional(),
  data: z.union([ UsersPermissionsUpdateInputSchema,UsersPermissionsUncheckedUpdateInputSchema ]),
  where: UsersPermissionsWhereUniqueInputSchema,
}).strict()

export const UsersPermissionsUpdateManyArgsSchema: z.ZodType<Prisma.UsersPermissionsUpdateManyArgs> = z.object({
  data: z.union([ UsersPermissionsUpdateManyMutationInputSchema,UsersPermissionsUncheckedUpdateManyInputSchema ]),
  where: UsersPermissionsWhereInputSchema.optional(),
}).strict()

export const UsersPermissionsDeleteManyArgsSchema: z.ZodType<Prisma.UsersPermissionsDeleteManyArgs> = z.object({
  where: UsersPermissionsWhereInputSchema.optional(),
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
  skipDuplicates: z.boolean().optional(),
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
  skipDuplicates: z.boolean().optional(),
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

export const RolesPermissionsCreateArgsSchema: z.ZodType<Prisma.RolesPermissionsCreateArgs> = z.object({
  select: RolesPermissionsSelectSchema.optional(),
  include: RolesPermissionsIncludeSchema.optional(),
  data: z.union([ RolesPermissionsCreateInputSchema,RolesPermissionsUncheckedCreateInputSchema ]),
}).strict()

export const RolesPermissionsUpsertArgsSchema: z.ZodType<Prisma.RolesPermissionsUpsertArgs> = z.object({
  select: RolesPermissionsSelectSchema.optional(),
  include: RolesPermissionsIncludeSchema.optional(),
  where: RolesPermissionsWhereUniqueInputSchema,
  create: z.union([ RolesPermissionsCreateInputSchema,RolesPermissionsUncheckedCreateInputSchema ]),
  update: z.union([ RolesPermissionsUpdateInputSchema,RolesPermissionsUncheckedUpdateInputSchema ]),
}).strict()

export const RolesPermissionsCreateManyArgsSchema: z.ZodType<Prisma.RolesPermissionsCreateManyArgs> = z.object({
  data: z.union([ RolesPermissionsCreateManyInputSchema,RolesPermissionsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const RolesPermissionsDeleteArgsSchema: z.ZodType<Prisma.RolesPermissionsDeleteArgs> = z.object({
  select: RolesPermissionsSelectSchema.optional(),
  include: RolesPermissionsIncludeSchema.optional(),
  where: RolesPermissionsWhereUniqueInputSchema,
}).strict()

export const RolesPermissionsUpdateArgsSchema: z.ZodType<Prisma.RolesPermissionsUpdateArgs> = z.object({
  select: RolesPermissionsSelectSchema.optional(),
  include: RolesPermissionsIncludeSchema.optional(),
  data: z.union([ RolesPermissionsUpdateInputSchema,RolesPermissionsUncheckedUpdateInputSchema ]),
  where: RolesPermissionsWhereUniqueInputSchema,
}).strict()

export const RolesPermissionsUpdateManyArgsSchema: z.ZodType<Prisma.RolesPermissionsUpdateManyArgs> = z.object({
  data: z.union([ RolesPermissionsUpdateManyMutationInputSchema,RolesPermissionsUncheckedUpdateManyInputSchema ]),
  where: RolesPermissionsWhereInputSchema.optional(),
}).strict()

export const RolesPermissionsDeleteManyArgsSchema: z.ZodType<Prisma.RolesPermissionsDeleteManyArgs> = z.object({
  where: RolesPermissionsWhereInputSchema.optional(),
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
  skipDuplicates: z.boolean().optional(),
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
  skipDuplicates: z.boolean().optional(),
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
  skipDuplicates: z.boolean().optional(),
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
  skipDuplicates: z.boolean().optional(),
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
  skipDuplicates: z.boolean().optional(),
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
  skipDuplicates: z.boolean().optional(),
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

export const ContactMessageCreateArgsSchema: z.ZodType<Prisma.ContactMessageCreateArgs> = z.object({
  select: ContactMessageSelectSchema.optional(),
  data: z.union([ ContactMessageCreateInputSchema,ContactMessageUncheckedCreateInputSchema ]),
}).strict()

export const ContactMessageUpsertArgsSchema: z.ZodType<Prisma.ContactMessageUpsertArgs> = z.object({
  select: ContactMessageSelectSchema.optional(),
  where: ContactMessageWhereUniqueInputSchema,
  create: z.union([ ContactMessageCreateInputSchema,ContactMessageUncheckedCreateInputSchema ]),
  update: z.union([ ContactMessageUpdateInputSchema,ContactMessageUncheckedUpdateInputSchema ]),
}).strict()

export const ContactMessageCreateManyArgsSchema: z.ZodType<Prisma.ContactMessageCreateManyArgs> = z.object({
  data: z.union([ ContactMessageCreateManyInputSchema,ContactMessageCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const ContactMessageDeleteArgsSchema: z.ZodType<Prisma.ContactMessageDeleteArgs> = z.object({
  select: ContactMessageSelectSchema.optional(),
  where: ContactMessageWhereUniqueInputSchema,
}).strict()

export const ContactMessageUpdateArgsSchema: z.ZodType<Prisma.ContactMessageUpdateArgs> = z.object({
  select: ContactMessageSelectSchema.optional(),
  data: z.union([ ContactMessageUpdateInputSchema,ContactMessageUncheckedUpdateInputSchema ]),
  where: ContactMessageWhereUniqueInputSchema,
}).strict()

export const ContactMessageUpdateManyArgsSchema: z.ZodType<Prisma.ContactMessageUpdateManyArgs> = z.object({
  data: z.union([ ContactMessageUpdateManyMutationInputSchema,ContactMessageUncheckedUpdateManyInputSchema ]),
  where: ContactMessageWhereInputSchema.optional(),
}).strict()

export const ContactMessageDeleteManyArgsSchema: z.ZodType<Prisma.ContactMessageDeleteManyArgs> = z.object({
  where: ContactMessageWhereInputSchema.optional(),
}).strict()