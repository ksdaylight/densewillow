<p align="center">

  <img alt="" src="https://img.densewillow.com/blog/Quicker_2023.png">

</p>

<h1 align="center">DenseWillow</h1>

<p align="center"><a href=""><img alt="NestJs" src="https://img.shields.io/badge/-NestJs-333333?style=flat&logo=nestjs&logoColor=ea2845" /></a> <a href=""><img alt="Next.js" src="https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=fff&style=flat" /></a> <a href=""><img alt="NX" src="https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white" /></a> <a href=""><img alt="TS-REST" src="https://img.shields.io/badge/RPC-LIKE?style=flat&label=TS-REST&labelColor=%23a855f7&color=black" /></a> <a href=""><img alt="TypeScript" src="https://img.shields.io/badge/Nx-143055?logo=nx&logoColor=fff&style=flat" /></a> <a href=""><img alt="Tailwind" src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=fff&style=flat-square" /></a> <a href=""><img alt="Prisma" src="https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=fff&style=flat-square" /></a> <a href=""><img alt="Jest" src="https://img.shields.io/badge/Jest-C21325?logo=jest&logoColor=fff&style=flat-square" /></a> <a href=""><img alt="Fastify" src="https://img.shields.io/static/v1?style=flat&message=Fastify&color=000000&logo=Fastify&logoColor=FFFFFF&label=" /></a> <a href=""><img alt="i18n" src="https://img.shields.io/badge/i18next-26A69A?logo=i18next&logoColor=fff&style=flat-square" /></a> <a href=""><img alt="zod" src="https://img.shields.io/badge/Zod-3E67B1?logo=zod&logoColor=fff&style=flat-square" /></a> <a href=""><img alt="Passport" src="https://img.shields.io/badge/Passport-34E27A?logo=passport&logoColor=000&style=flat-square" /></a> <a href=""><img alt="Postgresql" src="https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=fff&style=flat-square" /></a> <a href="https://nestjs.com/"><img alt="License" src="https://img.shields.io/github/license/kuizuo/kz-admin?style=flat&colorA=002438&colorB=28CF8D"/></a> </p>

<p>Densewillow 是一个全栈应用的 monorepo，采用了现代化的技术栈来提供高效、可维护的开发体验。  主要框架包括 NestJs 和 Next.js，同时使用 NX 作为项目的构建工具和工作区管理工具。此外，采用了 TS-REST 等第三方库，实现了完全类型化的类 RPC 开发体系结构。</p>
<p>🔗<a href="https://densewillow.com">densewillow.com</a></p>
## 📚 文件结构

 结构概览:

```
.
├── dist
│   ├── ...
├── ecosystem.config.js #pm2 配置
├── env.example #next+nest 环境变量示例
├── logs #pm2 日志
│   ├── ...
├── node_modules
│   ├──...
├── nx.json
├── package.json
├── packages
│   ├── api-contracts # ts-rest的api协议
│   │   ├── ...
│   │   ├── src
│   │   │   ├── index.ts
│   │   │   ├── lib # 具体协议
│   │   │   │   ├── ...
│   │   │   └── zod # zod-prisma-types的各种类型
│   │   │       └── index.ts
│   │   ├── ...
│   ├── frontend # Next.Js前台
│   │   ├── actions #serer actions
│   │   │   └── ...
│   │   ├── app
│   │   │   ├── api #next方面的后端api
│   │   │   │   └── ...
│   │   │   ├── i18n #国际化组件+文本
│   │   │   │   ├── ...
│   │   │   ├── [lng]
│   │   │   │   ├── (admin) # 网站的简单admin后台
│   │   │   │   │   ├── ...
│   │   │   │   ├── (front)  # 网站的前台
│   │   │   │   │   ├── ...
│   │   │   ├── ...
│   │   ├── components
│   │   │   ├── ...
│   │   ├── ...
│   │   ├── public
│   │   │   ├──...
│   ├── frontend-e2e #cypress的e2e示例
│   │   ├── ...
│   ├── nest-api #NestJs 网站api
│   │   ├── jest.config.ts
│   │   ├── project.json
│   │   ├── src
│   │   │   ├── assets
│   │   │   ├── config # 各个模块的配置文件
│   │   │   │   ├── ...
│   │   │   ├── main.ts
│   │   │   └── modules
│   │   │       ├── content # 内容模块
│   │   │       │   ├── ...
│   │   │       ├── core # 动态配置系统、全局验证管道、拦截器、过滤器
│   │   │       │   ├── ...
│   │   │       ├── media # 文件上传/下载
│   │   │       │   ├── ...
│   │   │       ├── rbac# 基于CASL的动态权限模块
│   │   │       │   ├── ...
│   │   │       └── user # 用户模块
│   │   │           ├── ...
│   │   ├── ...
│   ├── nest-api-e2e #NestJs e2e示例
│   │   ├── ...
│   └── prisma-schema-blog #Prisma 配置
│       ├── ...
├── pnpm-lock.yaml
├── ...

```

## 🛠技术栈

DenseWillow 构建在强大的技术堆栈之上，并依赖各种库和工具来提供其功能。 以下是项目中使用的主要技术和依赖项的列表：

1.  **Nest.js**: 一个使用typescript构建的企业级node.js框架
2.  **Next.js**: Next.js是一个React框架，它使构建React应用程序变得更简单。它提供服务器渲染，SEO和简化的路由配置等。
3.  **TypeScript**:TypeScript是一种由Microsoft开发的编程语言，是JavaScript的超集，添加了静态类型支持，提高了代码的可维护性和可读性 。
4.  **TS-REST**: 一个端到端类型安全的 RPC-like 库，协同NestJs与Next.Js。
5.  **Nx**: Nx是一个用于构建、测试和维护大型Monoreop库的开发工具。
6.  **Tailwind CSS**: Tailwind CSS是一个实用的CSS框架，通过提供一组预定义的类，使构建用户界面变得更加简单和灵活
7.  **Prisma**: Prisma是一个现代数据库访问工具，它简化了数据库操作，并提供类型安全的查询和模型定义。
8.  **Fastify**: Fastify是一个快速、低开销的Node.js框架，专注于提供高性能的HTTP服务。
9. **Zod**: Zod是一个JavaScript的数据验证库，通过简单的API提供强大的类型验证功能，有助于确保应用程序数据的完整性。
10. **Passport**:Passport是一个用于Node.js的身份验证中间件，支持多种身份验证策略，使用户认证变得简单且可扩展。

除了这些核心技术之外，Densewillow还利用各种其他库和工具来支持其功能。 完整的依赖项列表可以在项目的“package.json”文件中找到。

##  📕主要特点和功能

DenseWillow是一个Monorepo程序，具备全面的前后端功能集成，以下突出了该项目的主要特点和功能：
#### 后端功能：
1. 完全类型化的类RPC Monorepo程序，通过Prisma + Zod辅助生成类型声明文件，确保端到端的类型安全性和数据完整性。
2. 强大的内容管理系统，支持多种内容类型的创建、更新和删除，包括文章、媒体文件等，为用户提供灵活而直观的内容管理体验。
3. 全面的用户身份验证和授权功能，采用JWT令牌和基于角色的访问控制（RBAC）系统，有效管理用户对资源的访问权限，提高系统的安全性和可控性。
4. 文件处理和存储功能，使得在项目中轻松处理和存储各种文件，为用户提供高效的文件管理解决方案。
#### 前端功能：
1. SEO优化： 利用Next.js的服务端渲染（SSR）和静态生成（SSG）功能，实现对搜索引擎友好的页面结构，提高网站在搜索结果中的排名，并增强用户体验。
2. 页面动效： 利用Next.js的客户端路由和生命周期方法，实现平滑的页面过渡和动画效果，提升用户对网站的交互体验。
3. Responsiveness（响应式设计）： 利用Next.js的组件和样式处理，确保网站在不同设备上的良好展示，提供一致的用户界面和用户体验。
4. 国际化（i18n）： 利用Next.js的国际化插件，实现多语言支持，使得用户能够在不同语言环境中访问和使用网站。

####  ☑️TODO List

- [ ]  集成waline

- [ ]  admin添加新功能

## ⚓开发

### 安装和配置
1. **下载源码并安装依赖**  

```
git clone https://github.com/ksdaylight/densewillow.git

cd densewillow

pnpm i
```

2. **配置环境变量**：在项目根目录下创建`.env`文件，并配置必要的环境变量。 您可以使用提供的“.env.example”文件作为参考。

3. **运行数据库迁移**：首先运行以下命令通过Prisma进行数据库配置：

__(相关命令可从package.json的"scripts"中查看具体内容)__
  
```
pnpm db:migrate
```

接下来，运行以下命令来生成相关type定义文件：

```
pnpm db:generate-types
```

## 🚀启动应用并热更新

```
pnpm start:nest-api:dev
```

```
pnpm start:frontend:dev
```

## 🐞Debug

根据自己需要的调试方式,随意调整`./vscode/launch.json`文件,**并在VSCode 的debug 页面选择需要调试的NestJs或Next.Js程序**。在任意文件打上断点,按`F5`一键Debug

## 自动化测试

### NestJs
TDD测试编写请参考`packages/nest-api/src/modules/content/services/post.service.spec.ts`

E2E测试编写请参考`packages/nest-api-e2e/src/backend-api/backend-api.spec.ts`

运行测试命令

TDD: `pnpm test:nest-api:tdd` ,E2E: `pnpm test:nest-api:e2e`

### Next.Js
TDD测试编写请参考`packages/frontend/__test__/example.test.tsx`

E2E测试编写请参考`packages/frontend-e2e/src/e2e/app.cy.ts`

运行测试命令

TDD: `pnpm test:frontend:tdd` ,E2E: `pnpm test:frontend:e2e`

##  OPENAPI(如有需要)

NestJs 同时运行了一个标准的swagger(open api)文档（可关闭）。通过访问nestJs的运行地址如 `http://127.0.0.1:3100/api-docs` 来访问swagger页面进行测试,也可通过此swagger文档下载json文档，导入postman、insoma等来进行调试。

## 📈演示图
![full green seo](https://img.densewillow.com/blog/Quicker_ss4.png)
![Responsiveness](https://img.densewillow.com/blog/Quicker_20231121_dd.png)
![admin editor](https://img.densewillow.com/blog/Quickerss.png)
## LICENSE

[MIT](./LICENSE)