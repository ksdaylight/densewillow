export const ALLOW_GUEST = 'allowGuest';

/**
 * 用户列表查询排序方式
 */
export enum UserOrderType {
    CREATED = 'createdAt',
    UPDATED = 'updatedAt',
}

/**
 * 用户请求DTO验证组
 */
export enum UserDtoGroups {
    REGISTER = 'user-register',
    CREATE = 'user-create',
    UPDATE = 'user-update',
    BOUND = 'account-bound',
}

/**
 * 验证码发送数据DTO验证组
 */
export enum CaptchaDtoGroups {
    // 发送短信登录验证码
    // 发送邮件登录验证码
    PHONE_LOGIN = 'phone-login',
    EMAIL_LOGIN = 'email-login',
    // 发送短信注册验证码
    PHONE_REGISTER = 'phone-register',
    // 发送邮件注册验证码
    EMAIL_REGISTER = 'email-register',
    // 发送找回密码的短信验证码
    PHONE_RETRIEVE_PASSWORD = 'phone-retrieve-password',
    // 发送找回密码的邮件验证码
    EMAIL_RETRIEVE_PASSWORD = 'email-retrieve-password',
    // 发送手机号绑定或更改的短信验证码
    PHONE_BOUND = 'phone-bound',
    // 发送邮箱地址绑定或更改的邮件验证码
    EMAIL_BOUND = 'email-bound',
}

/**
 * 验证码操作类别
 */
export enum CaptchaActionType {
    // 登录操作
    LOGIN = 'login',
    // 注册操作
    REGISTER = 'register',
    // 找回密码操作
    RETRIEVEPASSWORD = 'retrieve-password',
    // 重置密码操作
    RESETPASSWORD = 'reset-password',
    // 手机号或邮箱地址绑定操作
    ACCOUNTBOUND = 'account-bound',
}

/**
 * 验证码类型
 */
export enum CaptchaType {
    PHONE = 'phone',
    EMAIL = 'email',
}

/**
 * 发送验证码异步列队名称
 */
export const SEND_CAPTCHA_QUEUE = 'send-captcha-queue';

/**
 * 发送短信验证码任务处理名称
 */
export const PHONE_CAPTCHA_JOB = 'phone-captcha-job';

/**
 * 发送邮件验证码任务处理名称
 */
export const EMAIL_CAPTCHA_JOB = 'email-captcha-job';

/**
 * 保存消息队列名称
 */
export const SAVE_MESSAGE_QUEUE = 'send-message-queue';

/**
 * 消息接收者操作类型
 */
export enum RecevierActionType {
    READED = 'readed',
    DELETE = 'delete',
}
