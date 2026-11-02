window.FLASHCARDS = [
  {
    "id": "weak-iam-1",
    "front": "IAM：Deny 條件不符時，動作一定被允許嗎？／If a Deny condition doesn't match, is the action allowed?",
    "back": "不一定。IAM 預設是 Implicit Deny。必須有明確 Allow，且沒有 Explicit Deny，才會允許。／No. Default is Implicit Deny. Need explicit Allow and no Explicit Deny.",
    "source": "curated",
    "tags": [
      "IAM",
      "weak"
    ]
  },
  {
    "id": "weak-lb-1",
    "front": "ALB vs NLB：看 URL path／Header 分流選誰？要固定靜態 IP + 極高吞吐選誰？",
    "back": "URL／Header（L7）→ ALB。靜態 IP、極速、L4 → NLB（可綁 EIP）。／Content routing → ALB. Static IP / ultra performance L4 → NLB.",
    "source": "curated",
    "tags": [
      "Networking",
      "weak"
    ]
  },
  {
    "id": "weak-aurora-1",
    "front": "不可預測流量 + MySQL 相容 + 少管 server → 選哪個資料庫？",
    "back": "Amazon Aurora Serverless v2（不是 DynamoDB，也不是傳統單一 RDS）。／Aurora Serverless v2 — not DynamoDB or single-instance RDS.",
    "source": "curated",
    "tags": [
      "Database",
      "weak"
    ]
  },
  {
    "id": "weak-ipv6-1",
    "front": "IPv6-only 子網：只要出站上網、禁止入站 → 用什麼？",
    "back": "Egress-only Internet Gateway。NAT Gateway 只適用 IPv4；普通 IGW 允許雙向。／Egress-only IGW. NAT Gateway is IPv4-only; IGW is bidirectional.",
    "source": "curated",
    "tags": [
      "Networking",
      "weak"
    ]
  },
  {
    "id": "weak-snapstart-1",
    "front": "Java Lambda 要減少冷啟動，且不想付 Provisioned Concurrency 費用 → 用什麼？",
    "back": "Lambda SnapStart（對 Java 函式快照初始化環境，大幅縮短冷啟動）。／Lambda SnapStart for Java — snapshot init environment.",
    "source": "curated",
    "tags": [
      "Compute",
      "weak"
    ]
  },
  {
    "id": "anki-1",
    "front": "What region must CloudFront ACM certificates be in?",
    "back": "us-east-1 (N. Virginia) ONLY. Memory aid: \"CF-E1\"",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-2",
    "front": "Which VPC endpoint type is FREE?",
    "back": "Gateway Endpoint (S3 and DynamoDB only). Interface endpoints cost $0.01/hour/AZ.",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-3",
    "front": "What's needed to scale Auto Scaling based on memory?",
    "back": "CloudWatch agent with custom metrics. Default monitoring doesn't include memory.",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-4",
    "front": "Can Fargate run on AWS Outposts?",
    "back": "NO. Only EC2 launch type is supported on Outposts. Memory: \"Outposts = On-premises, EC2 Only\"",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-5",
    "front": "How to share VPC ID between CloudFormation stacks?",
    "back": "Use Outputs + Export in Stack 1, Fn::ImportValue in Stack 2. NOT Parameters!",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-6",
    "front": "Do manual Redshift snapshots auto-delete?",
    "back": "NO. They're retained forever until explicitly deleted. This is a common cost trap.",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-7",
    "front": "Can you directly change storage class of Glacier objects?",
    "back": "NO. Must restore → copy to new class → delete old. Bucket default doesn't affect existing objects.",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-8",
    "front": "What's simpler for cross-account SQS access?",
    "back": "Resource-based queue policy (1 step) vs IAM role (3 steps, AssumeRole needed)",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-9",
    "front": "Which services support VPC Gateway Endpoints?",
    "back": "ONLY S3 and DynamoDB. Everything else needs Interface Endpoints ($$$).",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-10",
    "front": "Does VPG support ECMP for VPN load balancing?",
    "back": "NO. Only Transit Gateway supports ECMP. VPG uses single active VPN (1.25 Gbps limit).",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-11",
    "front": "Can S3 versioning be completely disabled once enabled?",
    "back": "NO. Once enabled, can only SUSPEND (not disable). Delete markers created when objects deleted.",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-12",
    "front": "S3 Object Lock Compliance vs Governance mode?",
    "back": "Compliance = Nobody can delete (even root). Governance = Can delete with special permission.",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-13",
    "front": "What does SSE-C require with every request?",
    "back": "YOU must provide encryption key with EVERY GET/PUT request. AWS doesn't store keys.",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-14",
    "front": "When is S3 multipart upload recommended?",
    "back": "Recommended >100 MB, REQUIRED >5 GB. Parts min 5MB (except last), max 10,000 parts.",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-15",
    "front": "What is S3 Requester Pays?",
    "back": "Requester pays transfer costs, bucket owner pays storage. Requires authenticated access (no anonymous).",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-16",
    "front": "DynamoDB LSI vs GSI - when can they be created?",
    "back": "LSI = Only at table creation (max 5). GSI = Anytime, even after creation (max 20).",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-17",
    "front": "What does DynamoDB DAX provide?",
    "back": "Microsecond latency in-memory cache. Drop-in replacement, no code changes. Eventually consistent only.",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-18",
    "front": "What's DynamoDB Streams retention?",
    "back": "24 hours. Ordered stream of item changes. Use for Lambda triggers, materialized views, replication.",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-19",
    "front": "RDS Multi-AZ - can you read from standby?",
    "back": "NO. Standby is for HA/failover only, not accessible for reads. Use Read Replicas for scaling.",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-20",
    "front": "Aurora Global Database - replication lag and failover time?",
    "back": "Replication lag <1 second. Failover (promote secondary) <1 minute. RPO=1s, RTO=1min.",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-21",
    "front": "What's RDS Blue/Green deployment?",
    "back": "Create clone (green), test changes, switchover with ~1 min downtime. Keep blue for quick rollback.",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-22",
    "front": "Lambda maximum execution time and memory?",
    "back": "Max 15 minutes (900s) execution. Memory 128 MB to 10 GB. CPU scales with memory (1,792 MB = 1 vCPU).",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-23",
    "front": "Lambda versions - what is $LATEST?",
    "back": "$LATEST = mutable, can change. Numbered versions = immutable snapshots. Aliases point to versions.",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-24",
    "front": "What does Lambda alias traffic splitting enable?",
    "back": "Weighted routing between versions. Example: 90% v2 + 10% v3. Blue/Green deployments, canary testing.",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-25",
    "front": "ECS dynamic port mapping requirements?",
    "back": "Requires ALB + awsvpc or bridge network mode. Uses ephemeral ports 32768-65535. NOT supported by NLB/CLB.",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-26",
    "front": "How to scale Auto Scaling on memory usage?",
    "back": "Install CloudWatch agent, configure aggregation_dimensions for ASG, publish custom metrics, use target tracking.",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-27",
    "front": "Global Accelerator vs CloudFront - when to use which?",
    "back": "GA = Static IPs, TCP/UDP, gaming/IoT. CF = HTTP/HTTPS, caching, web content. GA no caching, CF caches.",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-28",
    "front": "ALB authentication - what's supported?",
    "back": "Cognito User Pools and OIDC. ALB handles auth before app, passes user info in headers.",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-29",
    "front": "VPC Flow Logs - what traffic is captured?",
    "back": "ALL traffic (accepted + rejected). Can filter to ACCEPT or REJECT only. Captures IPs, ports, protocol, action.",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-30",
    "front": "What is Amazon QuickSight SPICE?",
    "back": "Super-fast Parallel In-memory Calculation Engine. In-memory caching for sub-second BI query performance.",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-31",
    "front": "CloudWatch Cross-Account Observability purpose?",
    "back": "Central monitoring account aggregates metrics/logs/traces from multiple source accounts. Single pane of glass.",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-32",
    "front": "What does Glue Crawler do?",
    "back": "Automatically scans data sources, discovers schemas, creates/updates tables in Glue Data Catalog for Athena/EMR.",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-33",
    "front": "AWS Security Hub purpose?",
    "back": "Central security findings dashboard. Aggregates from GuardDuty, Inspector, Macie, Config. Compliance checking.",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-34",
    "front": "Systems Manager Session Manager benefits?",
    "back": "Browser shell access, no SSH keys, no bastion, IAM-based, logged in CloudTrail, no open ports.",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-35",
    "front": "Elastic Beanstalk - which deployment has quickest rollback?",
    "back": "Immutable (terminate new instances) or Blue/Green (swap environments). All at once/rolling need manual redeploy.",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-36",
    "front": "EC2 Instance Metadata endpoint?",
    "back": "http://169.254.169.254/latest/meta-data/. IMDSv2 uses tokens (more secure). Returns instance info, IAM credentials.",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-37",
    "front": "FSx for Lustre vs FSx for Windows?",
    "back": "Lustre = HPC/ML, POSIX, S3 integration, 100s GB/s. Windows = SMB, Active Directory, DFS, VSS.",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-38",
    "front": "EFS Infrequent Access (IA) transition times?",
    "back": "Can transition after 7, 14, 30, 60, or 90 days of no access. 92% cheaper than Standard.",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-39",
    "front": "Regional RI vs Zonal RI?",
    "back": "Regional = Flexible AZ/size, no capacity reservation. Zonal = Fixed AZ, guaranteed capacity. Same discount.",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-40",
    "front": "Standard RI vs Convertible RI discount?",
    "back": "Standard = 72% discount, can't change instance type. Convertible = 54% discount, can change family/OS/tenancy.",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-41",
    "front": "Glacier retrieval tiers and times?",
    "back": "Expedited (1-5 min), Standard (3-5 hours), Bulk (5-12 hours). Deep Archive: Standard (12h), Bulk (48h).",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-42",
    "front": "Kinesis Data Streams - capacity per shard?",
    "back": "Write: 1 MB/s OR 1,000 records/s. Read: 2 MB/s (standard, 5 consumers share) or 2 MB/s per consumer (enhanced fan-out).",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-43",
    "front": "Kinesis Data Firehose buffer time minimum?",
    "back": "60 seconds minimum buffer. Near real-time (not real-time). Auto-scales, no shards to manage.",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-44",
    "front": "Kinesis Video Streams purpose?",
    "back": "Ingest video from cameras, phones, drones. Process with Rekognition, SageMaker for video analytics, ML.",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-45",
    "front": "Calculate Kinesis Data Streams shards needed?",
    "back": "Write: records/s ÷ 1,000 = shards. Read: MB/s ÷ 2 = shards. Use higher number.",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-46",
    "front": "Route 53 Geolocation vs Geoproximity?",
    "back": "Geolocation = Route by user's region (discrete). Geoproximity = Route by distance + bias -99 to +99 (gradient shift).",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-47",
    "front": "Route 53 Geoproximity bias values?",
    "back": "-99 to +99. Positive = attract more traffic. Negative = repel traffic. Zero = no bias.",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-48",
    "front": "Route 53 health check types?",
    "back": "Endpoint (IP/domain), Calculated (combine with AND/OR/NOT), CloudWatch alarm (any metric, private resources).",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-49",
    "front": "CloudFormation Change Sets purpose?",
    "back": "Preview changes before execution. See what will be modified/deleted/added. Can execute or discard.",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-50",
    "front": "CloudFormation DeletionPolicy options?",
    "back": "Delete (default), Retain (keep resource), Snapshot (backup before delete - for RDS, EBS, Redshift).",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-51",
    "front": "CloudFormation StackSets purpose?",
    "back": "Deploy stacks to multiple accounts/regions. Works with AWS Organizations. Centralized management.",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-52",
    "front": "AWS Transfer Family supported protocols?",
    "back": "SFTP, FTPS, FTP, AS2. Storage backends: S3 or EFS. Use for legacy protocol support.",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-53",
    "front": "DataSync vs Storage Gateway vs Transfer Family?",
    "back": "DataSync = Scheduled bulk sync (NFS/SMB). Storage Gateway = Hybrid cache (real-time). Transfer = Legacy protocols (FTP/SFTP).",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-54",
    "front": "DataSync destinations?",
    "back": "S3, EFS, FSx for Windows, FSx for Lustre, FSx for OpenZFS. 10x faster than open-source tools.",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-55",
    "front": "Storage Gateway types?",
    "back": "File Gateway (NFS/SMB), Volume Gateway (iSCSI block), Tape Gateway (VTL for backup apps).",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-56",
    "front": "Best cost optimization for compute with flexible workload?",
    "back": "Savings Plans (66-72% discount, flexible instance family/size/OS/region). More flexible than RIs.",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-57",
    "front": "Best cost for infrequent S3 access pattern?",
    "back": "S3 Intelligent-Tiering (auto-optimize) or S3 Standard-IA (if pattern known). IA = 30 day minimum.",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-58",
    "front": "How to ensure HA for NAT Gateway?",
    "back": "Deploy one NAT Gateway per AZ. Each AZ's route table points to NAT in same AZ.",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-59",
    "front": "Aurora replication - how many copies?",
    "back": "6 copies across 3 AZs (2 per AZ). Can lose 2 copies for writes, 3 copies for reads.",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-60",
    "front": "DynamoDB durability architecture?",
    "back": "Automatically replicated across 3 AZs. 11 9s durability (99.999999999%). No configuration needed.",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-61",
    "front": "ElastiCache Redis Multi-AZ failover time?",
    "back": "Automatic failover in <2 minutes typically. Requires Multi-AZ enabled with read replicas.",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-62",
    "front": "How many Lambda layers per function?",
    "back": "Maximum 5 layers per function. Each layer max 50 MB. Total deployment package 250 MB unzipped.",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-63",
    "front": "CloudWatch Logs default retention?",
    "back": "Indefinite (never expire) by default. Can set 1 day to 10 years or keep indefinite.",
    "source": "anki",
    "tags": [
      "general"
    ]
  },
  {
    "id": "anki-64",
    "front": "What is Kinesis enhanced fan-out?",
    "back": "Dedicated 2 MB/s throughput per consumer. HTTP/2 push for lower latency. Cost: $0.015/shard-hour. ```",
    "source": "anki",
    "tags": [
      "general"
    ]
  }
];
