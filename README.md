# ArmadaOS UI

**The Chairman's Command Center and Agent Interface**

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│  armadaos-ui (This Repo)                                        │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  React/Next.js Frontend                                  │   │
│  │  - Chairman's GOD MODE Console                           │   │
│  │  - Agent Monitoring Dashboard                            │   │
│  │  - Task Management Interface                             │   │
│  │  - System Health Visualization                           │   │
│  └─────────────────────────────────────────────────────────┘   │
│                           │                                     │
│                           │ HTTPS API Calls                     │
│                           ▼                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  armadaos-genesis (Backend)                              │   │
│  │  - the-one-gateway (API Gateway)                         │   │
│  │  - All microservices                                     │   │
│  │  - Deployed on AWS ECS                                   │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## The Contract

**This frontend implements the ArmadaOS API Contract.**

The contract is defined in: `docs/ARMADAOS_API_CONTRACT_V1.yaml` (OpenAPI 3.0)

### Contract Guarantees

| Guarantee | How |
|:----------|:----|
| **No ambiguity** | OpenAPI spec defines EXACTLY what each endpoint does |
| **No drift** | Contract is versioned, immutable once published |
| **No integration issues** | Frontend and backend implement the SAME contract |
| **Testable** | Contract can be validated automatically |

---

## Directory Structure

```
armadaos-ui/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Next.js pages
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API client services
│   └── types/            # TypeScript type definitions
├── docs/
│   └── ARMADAOS_API_CONTRACT_V1.yaml  # OpenAPI specification
├── public/               # Static assets
└── README.md
```

---

## API Endpoints (Contract Summary)

### Context Engine (`/v1/context/*`)
| Endpoint | Method | Purpose |
|:---------|:-------|:--------|
| `/v1/context/assemble` | POST | Assemble context for agent |
| `/v1/context/invalidate` | POST | Invalidate cache |

### Sandbox Bridge (`/v1/sandbox/*`)
| Endpoint | Method | Purpose |
|:---------|:-------|:--------|
| `/v1/sandbox/execute` | POST | Execute shell command |
| `/v1/sandbox/file/write` | POST | Write file |
| `/v1/sandbox/file/read` | GET | Read file |
| `/v1/sandbox/git/clone` | POST | Clone repository |
| `/v1/sandbox/git/commit` | POST | Commit changes |
| `/v1/sandbox/git/push` | POST | Push to remote |

### Master Architect (`/v1/architect/*`)
| Endpoint | Method | Purpose |
|:---------|:-------|:--------|
| `/v1/architect/index` | POST | Index document |
| `/v1/architect/search` | POST | Search indexed documents |
| `/v1/architect/webhook` | POST | GitHub webhook receiver |

### GOD MODE (`/v1/god/*`)
| Endpoint | Method | Purpose |
|:---------|:-------|:--------|
| `/v1/god/status` | GET | System status overview |
| `/v1/god/agents` | GET | List all agents |
| `/v1/god/pause` | POST | Pause all agent activity |
| `/v1/god/resume` | POST | Resume agent activity |
| `/v1/god/override` | POST | Override agent decision |

### Health (`/health`)
| Endpoint | Method | Purpose |
|:---------|:-------|:--------|
| `/health` | GET | Gateway health check |

---

## Development

### Prerequisites
- Node.js 18+
- pnpm

### Setup
```bash
pnpm install
pnpm dev
```

### Environment Variables
```env
NEXT_PUBLIC_API_URL=https://api.armadaos.com
```

---

## Deployment

This frontend is designed to be deployed to:
- **Vercel** (recommended for Next.js)
- **AWS S3 + CloudFront** (static export)
- **AWS ECS** (containerized)

---

## Related Repositories

| Repository | Purpose |
|:-----------|:--------|
| [ArmadaOS](https://github.com/kam-ship-it/ArmadaOS) | Documentation, specs, protocols |
| [armadaos-genesis](https://github.com/kam-ship-it/armadaos-genesis) | Backend services |
| **armadaos-ui** (this repo) | Frontend |

---

## The First Law

> "Nothing is real until it's in GitHub."

---

*ArmadaOS UI - The Chairman's Window into the Immutable Supercomputer*
