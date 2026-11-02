/**
 * Coach-generated bilingual SAA-C03 style questions (original scenarios, not exam dumps).
 * Schema: optional q_zh, options_zh, explanation_zh, why_zh.
 * Drop more coach questions here; app.js merges into QUESTIONS.
 */
window.QUESTIONS_BILINGUAL = [
  {
    id: "coach-iam-1",
    q: "A company attaches an IAM identity policy that allows lambda:InvokeFunction only when aws:SourceIp is inside the corporate CIDR. A separate statement explicitly denies the same action when aws:SourceIp is outside that CIDR. An engineer invokes the function from a home network, and no other policy grants InvokeFunction. What is the evaluation result?",
    q_zh: "公司有一條 IAM identity policy：僅在 aws:SourceIp 位於公司 CIDR 時允許 lambda:InvokeFunction；另有一條明確 Deny，當來源 IP 不在該 CIDR 時拒絕同一動作。工程師從住家網路呼叫，且沒有其他政策授予 InvokeFunction。評估結果是？",
    options: {
      A: "Allowed, because the Deny condition does not apply the way the engineer expects",
      B: "Explicit Deny",
      C: "Implicit Deny",
      D: "Allowed after MFA challenge"
    },
    options_zh: {
      A: "允許，因為 Deny 條件不如工程師預期般成立",
      B: "明確拒絕（Explicit Deny）",
      C: "隱含拒絕（Implicit Deny）",
      D: "通過 MFA 後允許"
    },
    answer: ["B"],
    explanation: "The Deny statement matches when the source IP is outside the corporate CIDR, so the request receives an Explicit Deny. Explicit Deny always wins over Allow. There is also no matching Allow for a home IP, but Explicit Deny is the decisive outcome here.",
    explanation_zh: "來源 IP 不在公司 CIDR 時，Deny 條件成立 → Explicit Deny。Explicit Deny 永遠優於 Allow。住家 IP 也沒有對應的 Allow，但本題決定性結果是明確拒絕。",
    why: [
      "Explicit Deny overrides any Allow.",
      "Home IP is outside the corporate CIDR, so the Deny statement matches.",
      "MFA is unrelated to this SourceIp scenario."
    ],
    why_zh: [
      "Explicit Deny 會覆蓋任何 Allow。",
      "住家 IP 不在公司 CIDR，Deny 條件成立。",
      "本題與 MFA 無關。"
    ],
    module: "IAM",
    multi: false,
    source: "coach"
  },
  {
    id: "coach-iam-2",
    q: "An IAM policy allows s3:GetObject on arn:aws:s3:::reports/* but does not mention s3:ListBucket. A user tries to list objects in the reports bucket using the console. What happens?",
    q_zh: "某 IAM policy 允許對 arn:aws:s3:::reports/* 執行 s3:GetObject，但未提及 s3:ListBucket。使用者在主控台嘗試列出該 bucket 物件時會如何？",
    options: {
      A: "Listing succeeds because GetObject implies ListBucket",
      B: "Listing is denied by Implicit Deny; object GET by key can still succeed if allowed",
      C: "Listing is Explicitly Denied by AWS managed policy",
      D: "Listing succeeds only in the same Region as the bucket"
    },
    options_zh: {
      A: "列出成功，因為 GetObject 隱含 ListBucket",
      B: "列出因 Implicit Deny 失敗；若有允許，用 key 直接 GET 物件仍可能成功",
      C: "被 AWS 受管政策 Explicit Deny",
      D: "僅在與 bucket 相同 Region 才能列出"
    },
    answer: ["B"],
    explanation: "ListBucket is a bucket-level action and is separate from GetObject. Without an Allow for ListBucket, listing is Implicit Deny. Knowing the object key, GetObject can still work if allowed.",
    explanation_zh: "ListBucket 是 bucket 層級動作，與 GetObject 分開。沒有 ListBucket 的 Allow 時，列出會 Implicit Deny。若知道物件 key，GetObject 仍可能成功。",
    why: [
      "S3 authorization distinguishes bucket vs object actions.",
      "Missing Allow ⇒ Implicit Deny for ListBucket."
    ],
    why_zh: [
      "S3 權限區分 bucket 與 object 動作。",
      "缺少 Allow ⇒ ListBucket 為 Implicit Deny。"
    ],
    module: "IAM",
    multi: false,
    source: "coach"
  },
  {
    id: "coach-net-1",
    q: "An application must route traffic to different target groups based on URL path (/api/* vs /static/*) and HTTP headers. Which load balancer should the solutions architect choose?",
    q_zh: "應用需要依 URL path（/api/* 與 /static/*）與 HTTP header 將流量導向不同 target group。應選哪種負載平衡器？",
    options: {
      A: "Classic Load Balancer",
      B: "Network Load Balancer",
      C: "Application Load Balancer",
      D: "Gateway Load Balancer"
    },
    options_zh: {
      A: "Classic Load Balancer",
      B: "Network Load Balancer",
      C: "Application Load Balancer",
      D: "Gateway Load Balancer"
    },
    answer: ["C"],
    explanation: "ALB operates at Layer 7 and supports path- and host-based routing plus HTTP header conditions. NLB is Layer 4 (IP/port) and does not inspect URL paths.",
    explanation_zh: "ALB 運作於 L7，支援 path／host 與 HTTP header 條件。NLB 是 L4（IP／連接埠），不會檢查 URL path。",
    why: [
      "Content-based HTTP routing ⇒ ALB.",
      "NLB is for extreme performance, static IP, TCP/UDP — not URL paths."
    ],
    why_zh: [
      "依 HTTP 內容分流 ⇒ ALB。",
      "NLB 適合極高效能、靜態 IP、TCP/UDP — 不是 URL path。"
    ],
    module: "Networking",
    multi: false,
    source: "coach"
  },
  {
    id: "coach-net-2",
    q: "A gaming API expects millions of requests per second and clients require a fixed static IP address for allowlisting. Latency must stay extremely low. Which load balancer fits best?",
    q_zh: "遊戲 API 每秒可達數百萬請求，客戶端要求固定靜態 IP 以便白名單，且延遲必須極低。最適合的負載平衡器是？",
    options: {
      A: "Application Load Balancer with path rules",
      B: "Network Load Balancer with Elastic IP addresses",
      C: "Classic Load Balancer in multiple AZs",
      D: "Gateway Load Balancer with GENEVE"
    },
    options_zh: {
      A: "Application Load Balancer 搭配 path 規則",
      B: "Network Load Balancer 搭配 Elastic IP",
      C: "跨多 AZ 的 Classic Load Balancer",
      D: "Gateway Load Balancer 搭配 GENEVE"
    },
    answer: ["B"],
    explanation: "NLB is designed for ultra-high performance at Layer 4 and can be assigned static Elastic IP addresses per AZ. ALB does not provide a customer-owned static IP in the same way and adds L7 processing overhead.",
    explanation_zh: "NLB 專為 L4 超高效能設計，可為每個 AZ 綁定靜態 Elastic IP。ALB 無法以同樣方式提供客戶靜態 IP，且有 L7 處理開銷。",
    why: [
      "Static IP + extreme throughput/low latency ⇒ NLB.",
      "GWLB is for inline virtual appliances, not general API front doors."
    ],
    why_zh: [
      "靜態 IP + 極高吞吐／低延遲 ⇒ NLB。",
      "GWLB 用於串接虛擬設備，不是一般 API 入口。"
    ],
    module: "Networking",
    multi: false,
    source: "coach"
  },
  {
    id: "coach-net-3",
    q: "A VPC has an IPv6-only subnet. EC2 instances must download patches from the internet, but inbound connections initiated from the internet must be blocked. Which component should be used?",
    q_zh: "VPC 有一個僅 IPv6 的子網路。EC2 需從網際網路下載修補程式，但必須阻擋由網際網路主動發起的連入。應使用哪個元件？",
    options: {
      A: "NAT Gateway",
      B: "Internet Gateway",
      C: "Egress-only Internet Gateway",
      D: "VPC Gateway Endpoint for S3"
    },
    options_zh: {
      A: "NAT Gateway",
      B: "Internet Gateway",
      C: "Egress-only Internet Gateway",
      D: "VPC Gateway Endpoint（S3）"
    },
    answer: ["C"],
    explanation: "Egress-only Internet Gateway allows outbound IPv6 traffic while blocking unsolicited inbound IPv6. NAT Gateway is IPv4-only. A regular Internet Gateway allows bidirectional traffic (security groups still apply, but the requirement maps to egress-only IGW).",
    explanation_zh: "Egress-only Internet Gateway 允許 IPv6 出站並阻擋未經請求的入站。NAT Gateway 僅適用 IPv4。一般 Internet Gateway 是雙向的（安全群組仍會過濾，但本題對應的是 egress-only IGW）。",
    why: [
      "IPv6 outbound-only ⇒ Egress-only IGW.",
      "NAT Gateway does not handle IPv6."
    ],
    why_zh: [
      "IPv6 僅出站 ⇒ Egress-only IGW。",
      "NAT Gateway 不處理 IPv6。"
    ],
    module: "Networking",
    multi: false,
    source: "coach"
  },
  {
    id: "coach-db-1",
    q: "A workload needs a MySQL-compatible relational API. Traffic is highly unpredictable and the team wants automatic capacity scaling with minimal server management. Which option is the best fit?",
    q_zh: "工作負載需要 MySQL 相容的關聯式 API，流量高度不可預測，團隊希望自動擴縮容量且少管理伺服器。最佳選項？",
    options: {
      A: "Amazon DynamoDB on-demand",
      B: "Amazon RDS for MySQL single instance",
      C: "Amazon Aurora Serverless v2",
      D: "Amazon Redshift Serverless"
    },
    options_zh: {
      A: "Amazon DynamoDB 隨需模式",
      B: "Amazon RDS for MySQL 單一執行個體",
      C: "Amazon Aurora Serverless v2",
      D: "Amazon Redshift Serverless"
    },
    answer: ["C"],
    explanation: "Aurora Serverless v2 provides MySQL-compatible relational capacity that scales with demand. DynamoDB is NoSQL. Single-instance RDS does not auto-scale compute the same way. Redshift is for analytics/warehousing.",
    explanation_zh: "Aurora Serverless v2 提供可隨需求擴縮的 MySQL 相容關聯式容量。DynamoDB 是 NoSQL。單一 RDS 無法以相同方式自動擴縮運算。Redshift 用於分析／倉儲。",
    why: [
      "Unpredictable + MySQL-compatible + less ops ⇒ Aurora Serverless v2.",
      "Do not pick DynamoDB when the API must stay relational/MySQL."
    ],
    why_zh: [
      "不可預測 + MySQL 相容 + 少維運 ⇒ Aurora Serverless v2。",
      "需要關聯式／MySQL API 時不要選 DynamoDB。"
    ],
    module: "Database",
    multi: false,
    source: "coach"
  },
  {
    id: "coach-db-2",
    q: "An application needs single-digit millisecond reads at any scale with a flexible key-value data model and no servers to manage. Occasional analytics queries will use a separate warehouse. Which primary datastore should be chosen?",
    q_zh: "應用需要任意規模下個位數毫秒讀取、彈性的鍵值資料模型、且無需管理伺服器。偶爾的分析查詢會使用獨立資料倉儲。主資料庫應選？",
    options: {
      A: "Amazon Aurora Provisioned",
      B: "Amazon DynamoDB",
      C: "Amazon RDS for PostgreSQL Multi-AZ",
      D: "Amazon Redshift"
    },
    options_zh: {
      A: "Amazon Aurora Provisioned",
      B: "Amazon DynamoDB",
      C: "Amazon RDS for PostgreSQL Multi-AZ",
      D: "Amazon Redshift"
    },
    answer: ["B"],
    explanation: "DynamoDB is a managed NoSQL key-value/document store with single-digit ms performance at scale and no servers. Aurora/RDS are relational. Redshift is analytical, not the primary low-latency app store.",
    explanation_zh: "DynamoDB 是受管 NoSQL 鍵值／文件資料庫，可擴展至個位數毫秒且無伺服器。Aurora／RDS 是關聯式。Redshift 是分析用途，不適合作為低延遲主庫。",
    why: [
      "Key-value + serverless + ultra-low latency ⇒ DynamoDB."
    ],
    why_zh: [
      "鍵值 + 無伺服器 + 超低延遲 ⇒ DynamoDB。"
    ],
    module: "Database",
    multi: false,
    source: "coach"
  },
  {
    id: "coach-compute-1",
    q: "A Java Lambda function suffers from long cold starts. The team wants a solution that restores the execution environment from a pre-initialized snapshot without paying for always-on provisioned concurrency. Which feature should they enable?",
    q_zh: "某個 Java Lambda 冷啟動很久。團隊想用預先初始化的快照還原執行環境，又不想為常開的 Provisioned Concurrency 付費。應啟用哪個功能？",
    options: {
      A: "Lambda SnapStart",
      B: "Provisioned Concurrency at maximum",
      C: "EC2 Auto Scaling with warm pools only",
      D: "AWS Elastic Beanstalk worker tier"
    },
    options_zh: {
      A: "Lambda SnapStart",
      B: "將 Provisioned Concurrency 開到最大",
      C: "僅使用 EC2 Auto Scaling warm pool",
      D: "AWS Elastic Beanstalk worker tier"
    },
    answer: ["A"],
    explanation: "Lambda SnapStart (supported for Java) takes a snapshot of the initialized environment and resumes from it to reduce cold start time, without requiring paid provisioned concurrency.",
    explanation_zh: "Lambda SnapStart（支援 Java）會對已初始化環境建立快照並從中還原，以縮短冷啟動，無需付費的 Provisioned Concurrency。",
    why: [
      "Java cold start reduction without always-on PC ⇒ SnapStart.",
      "Provisioned Concurrency works but costs more for steady warm capacity."
    ],
    why_zh: [
      "降低 Java 冷啟動且不要常開 PC ⇒ SnapStart。",
      "Provisioned Concurrency 有效但維持常溫容量成本較高。"
    ],
    module: "Compute",
    multi: false,
    source: "coach"
  },
  {
    id: "coach-sec-1",
    q: "A company serves a private S3 static website through CloudFront and must prevent users from accessing the S3 objects directly via the bucket URL. What is the recommended approach?",
    q_zh: "公司透過 CloudFront 提供私有 S3 靜態網站，且必須防止使用者直接用 bucket URL 存取物件。建議做法？",
    options: {
      A: "Make the bucket public and rely on CloudFront geo restriction only",
      B: "Use Origin Access Control (OAC) so only CloudFront can read the bucket",
      C: "Attach an Internet Gateway to the S3 bucket",
      D: "Enable S3 Transfer Acceleration and block CloudFront"
    },
    options_zh: {
      A: "把 bucket 設為公開，只靠 CloudFront 地理限制",
      B: "使用 Origin Access Control (OAC)，讓只有 CloudFront 能讀取 bucket",
      C: "為 S3 bucket 掛上 Internet Gateway",
      D: "啟用 S3 Transfer Acceleration 並封鎖 CloudFront"
    },
    answer: ["B"],
    explanation: "OAC (successor to OAI) restricts S3 object access so that CloudFront is the allowed principal. Public buckets defeat the requirement. IGW is a VPC construct, not for S3 buckets.",
    explanation_zh: "OAC（OAI 後繼）可限制 S3 物件存取，只允許 CloudFront 作為主體。公開 bucket 違反需求。IGW 是 VPC 元件，與 S3 bucket 無關。",
    why: [
      "CloudFront + private S3 ⇒ OAC (or legacy OAI).",
      "WAF is complementary for Layer 7 filtering, not a substitute for origin access control."
    ],
    why_zh: [
      "CloudFront + 私有 S3 ⇒ OAC（或舊版 OAI）。",
      "WAF 可補強 L7 過濾，但不能取代 origin 存取控制。"
    ],
    module: "Security",
    multi: false,
    source: "coach"
  },
  {
    id: "coach-arch-1",
    q: "Producers generate bursty work items that consumers must process asynchronously without losing messages. The team wants simple queue-based decoupling, not fan-out to many subscribers. Which service fits best?",
    q_zh: "生產者產生突發工作項目，消費者需非同步處理且不能丟訊息。團隊要的是簡單佇列解耦，不是扇出給多個訂閱者。最適合？",
    options: {
      A: "Amazon SNS only",
      B: "Amazon SQS",
      C: "Amazon Kinesis Data Firehose",
      D: "AWS Step Functions Express workflows only"
    },
    options_zh: {
      A: "僅 Amazon SNS",
      B: "Amazon SQS",
      C: "Amazon Kinesis Data Firehose",
      D: "僅 AWS Step Functions Express"
    },
    answer: ["B"],
    explanation: "SQS is the standard queue for buffering and decoupling producers/consumers with at-least-once delivery. SNS is pub/sub fan-out. Firehose is for loading streaming data into destinations.",
    explanation_zh: "SQS 是緩衝與解耦生產者／消費者的標準佇列（至少一次交付）。SNS 是發佈／訂閱扇出。Firehose 用於把串流載入目的地。",
    why: [
      "Queue decoupling ⇒ SQS.",
      "SNS alone does not provide competing-consumer queue semantics."
    ],
    why_zh: [
      "佇列解耦 ⇒ SQS。",
      "單用 SNS 無法提供競搶消費者佇列語意。"
    ],
    module: "Application Integration",
    multi: false,
    source: "coach"
  },
  {
    id: "coach-cost-1",
    q: "A company runs non-production EC2 instances that should be stopped outside business hours to reduce cost. Which approach best automates start/stop across accounts with minimal custom code?",
    q_zh: "公司有非正式環境的 EC2，希望在非上班時間自動停止以省成本。哪種做法最能以最少自訂程式、跨帳號自動化啟停？",
    options: {
      A: "Manually stop instances every evening in the console",
      B: "AWS Instance Scheduler (or equivalent EventBridge Scheduler + automation) with tagging",
      C: "Move all instances to the highest priced On-Demand type",
      D: "Disable Cost Explorer"
    },
    options_zh: {
      A: "每晚在主控台手動停止",
      B: "AWS Instance Scheduler（或 EventBridge Scheduler + 自動化）搭配標記",
      C: "全部改成最貴的 On-Demand 類型",
      D: "停用 Cost Explorer"
    },
    answer: ["B"],
    explanation: "Instance scheduling based on tags is a common cost optimization pattern for non-prod. Manual work does not scale. Cost Explorer is for visibility, not for stopping instances.",
    explanation_zh: "依標籤排程啟停是非正式環境常見的成本優化做法。手動無法擴展。Cost Explorer 用於可見性，不是用來停機。",
    why: [
      "Tag-based schedules cut non-prod spend.",
      "Cost Anomaly Detection / Cost Explorer complement but do not replace scheduling."
    ],
    why_zh: [
      "依標籤排程可降低非正式環境支出。",
      "Cost Anomaly Detection／Cost Explorer 是輔助，不能取代排程停機。"
    ],
    module: "Cost Optimization",
    multi: false,
    source: "coach"
  },
  {
    id: "coach-mon-1",
    q: "A team needs OS-level metrics for an RDS instance, including processes and threads inside the guest OS, beyond hypervisor metrics. Which feature should they enable?",
    q_zh: "團隊需要 RDS 執行個體的作業系統層級指標，包含 guest OS 內的行程與執行緒，而不只是 hypervisor 指標。應啟用哪個功能？",
    options: {
      A: "Amazon RDS Enhanced Monitoring",
      B: "AWS CloudTrail Lake only",
      C: "S3 server access logging",
      D: "AWS Config conformance packs only"
    },
    options_zh: {
      A: "Amazon RDS Enhanced Monitoring",
      B: "僅 AWS CloudTrail Lake",
      C: "S3 伺服器存取記錄",
      D: "僅 AWS Config conformance packs"
    },
    answer: ["A"],
    explanation: "Enhanced Monitoring uses an agent to collect OS metrics (including process/thread detail) for RDS. CloudTrail is API auditing; S3 access logs are for bucket requests; Config tracks resource configuration.",
    explanation_zh: "Enhanced Monitoring 透過代理收集 RDS 的 OS 指標（含行程／執行緒細節）。CloudTrail 是 API 稽核；S3 存取記錄針對 bucket 請求；Config 追蹤組態。",
    why: [
      "OS / process metrics on RDS ⇒ Enhanced Monitoring."
    ],
    why_zh: [
      "RDS 的 OS／行程指標 ⇒ Enhanced Monitoring。"
    ],
    module: "Monitoring",
    multi: false,
    source: "coach"
  }
];
