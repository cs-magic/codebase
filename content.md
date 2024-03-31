2024 年这 5 个 Node.js 后端框架最受欢迎！
=============================

[21CTO](javascript:void(0);)

**21CTO** ![]()

微信号 www\_21cto\_com

功能介绍 21CTO（21CTO.com），开发者的学习与服务平台。从程序员到技术官都在这里。

以下文章来源于Nodejs技术栈 ，作者译 五月君

[

![](http://wx.qlogo.cn/mmhead/Q3auHgzwzM7sT2mQPnS3G1Qf7E9W7Mu3scut0H7Qia5N8OshvEMcPCA/0)

**Nodejs技术栈** .

聚集所有 Nodejs 爱好者，共建互帮互助的 Nodejs 技术栈交流平台

](#)

![](https://mmbiz.qpic.cn/mmbiz_png/zPkNS9m6iatKocWYfK5bicY4UEF6Jxaloj725Ykib9k4jibiaIZvcNKcl57yw8r3Qlo4DicPDPzuSsfkDYJ8f93rUWWQ/640?wx_fmt=png&from=appmsg)

自 2009 年以来，Node.js 一直是备受关注的话题，大多数后端开发人员倾向于选择 Node.js。在过去几年中，它的受欢迎程度已经不断提高。

![](https://mmbiz.qpic.cn/mmbiz_png/zPkNS9m6iatKocWYfK5bicY4UEF6JxalojSf8kOqk48bTlibsu4HSMLO8XoZgGHv44tWvPeZjunfQJW4X92hENafA/640?wx_fmt=png&from=appmsg)

> 它被认为是美国最受欢迎的网络开发工具，包括像 Netflix 和 PayPal 这样的客户。

增加其受欢迎程度的原因是减少了加载时间和性能改进。因此，分析 2024 年的前 5 个 Node.js 后端框架至关重要。

因此，本文将介绍 2024 年的前 5 个 Node.js 后端框架，它们的特点和常见用例。

Express.js：经过测试的冠军
------------------

![](https://mmbiz.qpic.cn/mmbiz_png/zPkNS9m6iatKocWYfK5bicY4UEF6Jxaloj5HOGHJJadENfGVn9QlV5C1mY6Phialv7CksNG7t1iagPLNITACbaOs7A/640?wx_fmt=png&from=appmsg)

Express.js 是 Node.js 最著名的后端框架之一。它是一个开源的 Web 应用程序框架，基于 Node.js 平台构建并且免费提供。由于它是一个轻量级框架，无论是新手还是经验丰富的 Web 开发人员都倾向于选择 Express.js。它主要用于创建 Web 应用程序和 RESTful API。

### 关键特性：它的独特之处是什么？

**1.高效的路由管理**

Express.js 提供了一种简洁而简单的方法来管理各种 HTTP 请求并将它们分配给特定的任务。让我们看一个例子。

`// app.js   const express = require('express');   const app = express();   const port = 3000;      // Route for Homepage   app.get('/', (req, res) => {     res.send('Welcome to the homepage!');   });      // Route 2   app.get('/user/:id', (req, res) => {     const userId = req.params.id;     res.send(User Profile Page - ID: ${userId} );   });   `

**2.中间件支持**

Express.js 允许使用中间件来处理 HTTP 请求。让我们看一个创建用于记录 HTTP 请求详情的中间件的简单示例。

`const express = require('express');   const app = express();   const port = 3000;      app.use((req, res, next) => {     console.log([${new Date().toLocaleString()}] ${req.method} ${req.url} );     next();   });   `

**3.简单的数据库集成**

Express.js 是数据库无关的。它不强制使用特定的数据库选择。开发人员可以选择他们喜欢的数据库。与 Express.js 集成数据库的简便性归功于其模块化和灵活的特性，以及 npm 包的丰富生态系统，提供了数据库连接功能。

**4.易于学习**

Express.js 以其简洁和极简的设计而闻名，使得开发人员特别容易学习，尤其是对于已经熟悉 JavaScript 和 Node.js 的开发人员而言。

另外，你可以使用像 Bit 这样的工具轻松开始使用 Express.js。如果你之前没有使用过 Bit，它是一个用于可组合软件的下一代构建系统。

> 而且，如果你想一想，Express.js 本身就是可组合的。你可以在应用程序的任何地方插入并使用组件。

NestJS：现代化和结构化的方法
-----------------

![](https://mmbiz.qpic.cn/mmbiz_png/zPkNS9m6iatKocWYfK5bicY4UEF6Jxaloj47iatdnlwLUY1wIic1KpvTHQyk0Vyia2QkruOm8Y6E9ibebMBVpsTsl17w/640?wx_fmt=png&from=appmsg)

NestJS 是一个以构建可伸缩和高效的 Node.js 服务器端应用程序而闻名的框架。它使用渐进式 JavaScript，并具有在 TypeScript 中编写代码的能力。尽管它完全支持 TypeScript，但它也可以在纯 JavaScript 中编写代码，并且包含面向对象编程、函数式编程和函数响应式编程。

### 关键特性：它的独特之处是什么

**1.模块化**

Nest.js 允许将代码分解为单独可管理的模块，使其更易于维护。例如，让我们看下面的模块。

`import { Module } from '@nestjs/common';      @Module({    imports: [     CacheModule    ],    controllers: [PaymentController],    providers: [PaymentService],   })   export class PaymentModule {}   `

这个支付模块可以被导出到其他模块中。在这个例子中，我们在这个模块内导出了通用的缓存模块。由于 Nest.js 具有模块结构，因此它易于维护。

**2.可伸缩性**

Nest.js 通过将应用程序拆分为可管理的模块，支持灵活的组件替换，并通过微服务和异步操作处理高流量，实现了无缝扩展。它确保在保持可靠性的同时有效处理增加的工作负载。

**3.依赖注入**

依赖注入简单地说就是向类中添加外部依赖项，而不是在类本身内部创建它。让我们看一个例子。

`import {    HttpException, Injectable, NotFoundException   } from '@nestjs/common';      @Injectable()   export class PaymentService {       constructor() {}       getReceipt() {      return 'Payment Receipt';    }   }   `

我们已经创建了支付服务，并添加了 @Injectable() 注解以使其可注入。我们可以按如下所述使用所创建的服务。

`import { Controller, Get, Post, Body } from '@nestjs/common';   import { PaymentService } from './payment.service';   @Controller('payment')   export class PaymentController {    constructor(private readonly paymentService: PaymentService) {}   @Get()    getPaymentReceipt() {    return this.paymentService.getReceipt();    }   }   `

**4.类型安全**

Nest.js 使用 TypeScript 提供类型安全，可以用来在开发过程中捕获潜在的错误，并提高代码的可维护性。让我们看一个例子。

``export class PaymentDto {        @IsNotEmpty()     @IsEnum(SERVICE_PROVIDER_SLUG, {       message: `Invalid serviceProvider. Valid options are: ${Object.values(SERVICE_PROVIDER_SLUG).join(', ')}`,     })     serviceProvider: string;        @IsNotEmpty()     @IsNumber()     value: number;        @IsNotEmpty()     @IsString()     validityPeriod: string;        @IsNotEmpty()     @IsArray()     @ArrayNotEmpty()     @ValidateNested()     @Type(() => PaymentAttributesDto)     paymentAttributes: PaymentAttributesDto[]      }   ``

在这个例子中，我们创建了一个 DTO，其中包含多个参数，并添加了注解来验证参数类型。例如，如果我们将一个字符串值发送到“value”参数，它将抛出一个错误。

Koa.js：优雅且轻量级
-------------

![](https://mmbiz.qpic.cn/mmbiz_png/zPkNS9m6iatKocWYfK5bicY4UEF6Jxaloj6XW0qzrv7Oy7QvNkuGGv2NXfp3cCiaSfYTwVprAGrfmhu9YsSG08TEg/640?wx_fmt=png&from=appmsg)

Koa.js 是一个更小、更富表现力的 Web 框架，也是由 Express.js 团队设计的。它允许您放弃回调，并通过利用异步函数来处理错误。

### 关键特性：它的独特之处

**1.上下文对象（ctx）**

Koa.js 包含了一个称为 ctx 的功能，用于捕获请求和响应的详细信息。这个上下文对象会传递给每个中间件。在这个例子中，我们从 ctx 对象中记录了方法和请求。

`const Koa = require('koa');   const app = new Koa();      app.use(async (ctx) => {     const { method, url, request, response } = ctx;     console.log('Method :' + method + ' Request : ' + request);   });      app.listen(3000);   `

**2.中间件组合**

与 Express.js 类似，Koa 支持中间件函数来处理 HTTP 请求和响应。在这个例子中，我们创建了一个简单的中间件。

`const Koa = require('koa');   const app = new Koa();      app.use(async (ctx, next) => {     await next();    });   `

**3.异步/等待支持**

Koa 使用 async/await 语法以更类似于同步的方式编写异步代码。下面的例子包含了使用 async/await 关键字。

`const Koa = require('koa');   const app = new Koa();      app.use(async (ctx) => {     const data = await fetchData();     ctx.body = Data: ${data} ;   });      app.listen(3000);   `

**4.错误处理**

Koa.js 支持各种类型的错误处理。我们可以使用 app.emit() 或 ctx.throw() 来处理错误。下面的例子包含了上述的错误处理方法。

Hapi.js
-------

![](https://mmbiz.qpic.cn/mmbiz_png/zPkNS9m6iatKocWYfK5bicY4UEF6Jxaloj2FCWOMib6icSQXEGss6ZGYljsE0RwLG8un1licV2Sn7ORKT6Vb2iahuGAQ/640?wx_fmt=png&from=appmsg)

Hapi.js，即 Http-API 的简称，是一个用于开发可伸缩 Web 应用程序的开源框架。hapi 最基本的用例之一是构建 REST API。

Walmart Labs 创建了 hapi.js 来处理类似黑色星期五这样的活动的流量，黑色星期五是美国日历中在线购物最繁忙的一天之一。

### 关键特性：突出之处

**1.基于配置的设计**

通过使用配置对象，在 Hapi.js 中我们能够配置路由、设置和插件。

`const Hapi = require('@hapi/hapi');      const server = Hapi.server({     port: 3000,     routes: {       cors: true,     },   });      server.route({     method: 'GET',     path: '/',     handler: (request, h) => {       return 'Hello, Hapi!';     },   });      async function start() {     await server.start();     console.log(Server running at ${server.info.uri} );   }      start();   `

**2.强大的插件系统**

Hapi.js 允许插件轻松集成，不需要太多麻烦。让我们看一个例子。

`const start = async function () {          const server = Hapi.server();          await server.register([{           plugin: require('plugin1'),           options: {}       }, {           plugin: require('plugin2'),           options: {}       }]);   };   `

在这个例子中，我们集成了两个插件。可以使用 options 键将选项传递给插件。

**3.认证和授权**

Hapi.js 提供了对各种认证策略的内置支持，并允许开发人员轻松定义访问控制策略。

`server.route({     method: 'GET',     path: '/private-data',     handler: (request, h) => {       // Access private data only if authenticated       const user = request.auth.credentials;       return Welcome, ${user.username}! ;     },     options: {       auth: 'jwt', // Use JWT authentication strategy     },   });   `

根据这个例子，我们可以直接将认证策略定义为 'jwt'。

**4.输入验证**

输入验证是 hapi.js 的另一个关键方面。在路由的选项对象中，我们可以定义需要验证哪些输入。默认验证对象包含以下值。

`{       headers: true,       params: true,       query: true,       payload: true,       state: true,       failAction: 'error'   }   `

Adonis.js
---------

Adonis.js 是一个针对 Node.js 的全功能 MVC 框架。它具有构建可伸缩和可维护应用程序的能力。Adonis.js 遵循类似于 Laravel 的结构，并且内置了 ORM、认证和路由等功能。

### 关键特性：突出之处

**1.全栈 MVC 框架**

Adonis.js 遵循 MVC 架构模式。拥有一个 MVC 框架有助于组织代码，使其更易于维护和扩展。

![](https://mmbiz.qpic.cn/mmbiz_png/zPkNS9m6iatKocWYfK5bicY4UEF6JxalojFFXxD0XCcdnugxAKp4xEBKv7xw69XZORDPnN1ziaTvuN44tQYCq7zoQ/640?wx_fmt=png&from=appmsg)

**2.集成的 ORM（Lucid）用于数据库交互**

Adonis.js 拥有自己的 ORM，名为 Lucid。Lucid 提供了一个表达性强的查询构建器，并支持各种数据库系统。在 Lucid 中，我们可以创建模型来读写数据库。让我们看下面的例子。

`const Model = use('Model')      class User extends Model {   }      module.exports = User   `

我们正在使用这个用户模型而不是数据库查询。现在我们正在创建一个路由，在里面我们正在获取用户。我们可以简单地使用 User.all() 来获取用户。

`const Route = use('Route')   const User = use('App/Models/User')      Route.get('users', async () => {   return await User.all()   })   `

**3.认证系统**

Adonis.js 内置支持用户认证和授权。它提供了一组方法和中间件来处理用户会话、密码哈希和访问控制。

结论
--

在2024年，上述的后端框架在市场上占据重要地位。

无论你选择 Express.js 的简洁性、Nest.js 的结构、Adonis.js 的生产力，还是 Koa.js 的优雅，选择正确的框架都是至关重要的。

这总是取决于您的需求。重要的是要了解您的项目需要什么，然后根据此选择适当的框架。

此外，要在2024年取得成功的后端开发之旅，关注最新趋势、现有框架的新特性以及新框架是至关重要的。  
  

作者 | Thamodi Wickramasinghe

翻译、整理 | 五月君

原文 https://blog.bitsrc.io/top-5-nodejs-frameworks-in-2024-32c7fe9d49c6

  

\- END \-

![](https://mmbiz.qpic.cn/mmbiz_gif/xsw6Lt5pDCu1rRLicXibOB6jq4wpe7W4Ioibu7XTJR1ABzARKoLxyWEWeIV6HJRII2GK1ntnCkVIqjY852gntBd5Q/640?wx_fmt=gif&wxfrom=5&wx_lazy=1)

**敬请关注「Nodejs技术栈」微信公众号，期望与志同道合的你一起打造优质 “Nodejs技术栈” 交流群，一起互相学习进步！可长按下方二维码添加【五月君】个人微信备注 “Node” 邀请入群。**

![](https://mmbiz.qpic.cn/mmbiz_png/zPkNS9m6iatLmT5coKbicuqENgoc3Pz4QWwtrEoP2RU2thicCJHaKNmJ23Hh9jYvicpVgiauY6NxNaZ59D6svw1Qskg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

var first\_sceen\_\_time = (+new Date()); if ("" == 1 && document.getElementById('js\_content')) { document.getElementById('js\_content').addEventListener("selectstart",function(e){ e.preventDefault(); }); }

预览时标签不可点