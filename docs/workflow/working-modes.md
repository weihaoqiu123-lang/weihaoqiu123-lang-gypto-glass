# Working Modes

This project stays in one codebase.
We do not split it into multiple app projects.

Instead, we switch between three work modes:

## 1. Product Flow
Use when you want to decide:
- business rules
- user flow
- pricing logic
- PRD changes
- scope and roadmap

How to switch:
Say:
- `切换到产品流`
- `我们现在聊 PRD`
- `先做业务规则`

What I will do:
- stop coding-first behavior
- challenge assumptions
- refine rules and scope
- output product docs and decisions

## 2. Design Flow
Use when you want to decide:
- page structure
- visual direction
- references
- copy
- product image / chart hierarchy

How to switch:
Say:
- `切换到设计流`
- `先看页面设计`
- `先做视觉方案`

What I will do:
- prioritize layout, hierarchy, art direction, and copy
- reference similar sites
- produce design docs before heavy code changes

## 3. Development Flow
Use when you want to:
- implement pages
- add backend logic
- connect payment
- fix bugs
- wire data or APIs

How to switch:
Say:
- `切换到开发流`
- `开始实现`
- `直接改代码`

What I will do:
- stop broad ideation
- execute code changes
- run builds and validations
- report progress in smaller steps

## Recommended Working Rhythm
Best practice for this project:

1. Product flow
2. Design flow
3. Development flow

That means:
- first decide what we are building
- then decide how it should look
- then implement it

## What You Need To Do
You do not need sub-projects.
You only need to tell me the current mode clearly.

Good examples:
- `切换到设计流，重做 BTC 商品页首屏`
- `切换到产品流，重写动态价格规则`
- `切换到开发流，按照设计稿开始改`

## Files By Mode

### Product
- `docs/product/`

### Design
- `docs/design/`

### Engineering
- `docs/engineering/`

If those folders are missing, we can create and maintain them gradually.
