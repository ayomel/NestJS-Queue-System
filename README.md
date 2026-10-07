# learning-nestjs

A hands-on learning project exploring **NestJS** and **background job processing** with **Redis**, **BullMQ**, and **`@nestjs/bullmq`**.

The app exposes a small HTTP API that enqueues work instead of doing it on the request thread the same pattern used for video transcoding, email sends, report generation, and other slow or unreliable tasks in real systems.

> **Status:** Personal learning repo. Scope is intentionally small so I can focus on framework mechanics, queue semantics, and observability hooks not production hardening.

---

## Why this exists

I'm building this to practice:

- NestJS modules, controllers, dependency injection, and providers
- Decoupling HTTP from long-running work via message queues
- BullMQ concepts: queues, jobs, workers, retries, backoff, pause/resume
- Worker lifecycle events and progress reporting
- Running Nest in **native ESM** (`"type": "module"`) with BullMQ + **ioredis**

---
