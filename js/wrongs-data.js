window.WRONGS_PACK = {
  "meta": {
    "title": "錯題複習",
    "exam": "Tutorials Dojo Randomized Test 65Q",
    "date": "2026-11-02",
    "score": "26/65 (40%)",
    "time": "55:44",
    "weakest": "High-Performing Architectures 26.09%",
    "domains": {
      "Cost": "50%",
      "High-Performing": "26.09%",
      "Resilient": "53.33%",
      "Secure": "42.86%"
    }
  },
  "clusters": [
    {
      "id": "ALL",
      "title": "全部",
      "blurb": "39 題錯題一覽"
    },
    {
      "id": "STOR",
      "title": "儲存・FSx・CDN",
      "blurb": "ONTAP／Windows FSx／S3+CloudFront"
    },
    {
      "id": "SEC",
      "title": "安全・IAM・合規",
      "blurb": "Macie／Config／GuardDuty／IAM Auth"
    },
    {
      "id": "LB",
      "title": "負載・ALB・CF",
      "blurb": "Access Logs／路徑分流／快取"
    },
    {
      "id": "MSG",
      "title": "串流・SQS・Kinesis",
      "blurb": "FIFO／即時 vs Firehose"
    },
    {
      "id": "DB",
      "title": "資料庫・HA・讀擴",
      "blurb": "Multi-AZ ≠ Replica ≠ 跨區"
    },
    {
      "id": "ORG",
      "title": "組織・身分",
      "blurb": "Control Tower／Identity Center"
    },
    {
      "id": "SCALE",
      "title": "擴展・運算・網路",
      "blurb": "排程擴／ENA／配額／VPN"
    },
    {
      "id": "SRV",
      "title": "無伺服器・Glue・API",
      "blurb": "Lex／Lambda／AppSync／canary"
    }
  ],
  "cards": [
    {
      "id": 2,
      "cluster": "STOR",
      "concept": "FSx 協定選擇：iSCSI／多協定 → ONTAP",
      "scenario": "Windows 交易程式要跨 AZ 高可用，兼要 shared storage（含 block／iSCSI 場景）。",
      "picked": "EC2 + FSx for Windows File Server",
      "correct": "EC2 + FSx for NetApp ONTAP Multi-AZ（iSCSI／多協定）",
      "why": "FSx Windows 只做 SMB 檔案共用；要 iSCSI block 或多協定（NFS+SMB+iSCSI）要用 FSx NetApp ONTAP，並開 Multi-AZ。",
      "mnemonic": "見 iSCSI／NetApp／多協定 → ONTAP；淨 SMB → Windows FSx。",
      "services": [
        {
          "name": "FSx NetApp ONTAP",
          "blurb": "多協定檔案＋iSCSI block，可 Multi-AZ"
        },
        {
          "name": "FSx Windows",
          "blurb": "Windows／SMB／AD 檔案共用"
        }
      ]
    },
    {
      "id": 3,
      "cluster": "STOR",
      "concept": "DB 遷移用 DMS，唔係 DataSync",
      "scenario": "地端 DB 要搬去 Aurora，兼要持續同步變更（CDC）。",
      "picked": "DataSync + Data Transfer Terminal",
      "correct": "DMS full load + CDC",
      "why": "DataSync 搬檔案／物件；Database Migration Service 先負責 DB 全量＋持續 CDC。",
      "mnemonic": "搬 DB／CDC → DMS；搬檔 → DataSync。",
      "services": [
        {
          "name": "AWS DMS",
          "blurb": "資料庫遷移＋CDC 持續同步"
        },
        {
          "name": "DataSync",
          "blurb": "檔案／物件大量搬遷"
        }
      ]
    },
    {
      "id": 36,
      "cluster": "STOR",
      "concept": "FSx Windows 要持續 HA → Multi-AZ",
      "scenario": "FSx for Windows 要高可用，並把備份複製去另一 Region。",
      "picked": "Single-AZ 2 + AWS Backup 跨區复制",
      "correct": "FSx Windows Multi-AZ + Backup 跨區复制",
      "why": "Single-AZ＋Backup 偏災難還原；要持續 HA／自動 failover 要用 Multi-AZ deployment。",
      "mnemonic": "持續 HA → Multi-AZ；Backup＝DR 唔等於即時 failover。",
      "services": [
        {
          "name": "FSx Windows Multi-AZ",
          "blurb": "同 Region 跨 AZ 自動 failover"
        },
        {
          "name": "AWS Backup",
          "blurb": "排程備份／跨區複製"
        }
      ]
    },
    {
      "id": 38,
      "cluster": "STOR",
      "concept": "CDN＝S3 + CloudFront",
      "scenario": "財務報表／靜態檔要全球加速派發。",
      "picked": "S3 Glacier + ElastiCache 當 CDN",
      "correct": "S3 + CloudFront CDN",
      "why": "Glacier 係封存唔適合即時讀；ElastiCache 係記憶體快取唔係 CDN。靜態全球加速用 CloudFront。",
      "mnemonic": "CDN → CloudFront；凍倉 ≠ CDN。",
      "services": [
        {
          "name": "CloudFront",
          "blurb": "全球 HTTP(S) CDN"
        },
        {
          "name": "S3",
          "blurb": "物件儲存作 origin"
        }
      ]
    },
    {
      "id": 7,
      "cluster": "SEC",
      "concept": "IAM key 年齡合規 → Config 託管規則",
      "scenario": "要自動發現逾 90 日未轉嘅 IAM access key 再 remediation。",
      "picked": "淨 EventBridge filter + Lambda 刪 key",
      "correct": "Config managed rule（access key 年齡）+ EventBridge 觸發 remediation",
      "why": "EventBridge 唔識『掃描全部舊 key』；Config 託管規則先專門做合規評估，再經 EventBridge／Lambda 修復。",
      "mnemonic": "合規檢查優先 Config；EventBridge＝事件路由。",
      "services": [
        {
          "name": "AWS Config",
          "blurb": "資源合規／託管規則評估"
        },
        {
          "name": "EventBridge",
          "blurb": "把合規事件路由去 Lambda"
        }
      ]
    },
    {
      "id": 8,
      "cluster": "SEC",
      "concept": "S3 入面搵 PII → Macie",
      "scenario": "客戶 PII 誤上傳 S3，要識別敏感資料並告警。",
      "picked": "GuardDuty CRITICAL findings 當 PII 掃描",
      "correct": "Amazon Macie（SensitiveData）+ EventBridge／SNS",
      "why": "GuardDuty＝威脅／異常行為；Macie＝用 ML 喺 S3 搵 PII／敏感資料。",
      "mnemonic": "搵 PII／敏感資料 → Macie；惡意活動 → GuardDuty。",
      "services": [
        {
          "name": "Amazon Macie",
          "blurb": "S3 敏感資料發現"
        },
        {
          "name": "GuardDuty",
          "blurb": "帳戶／工作負載威脅偵測"
        }
      ]
    },
    {
      "id": 9,
      "cluster": "SEC",
      "concept": "讀 IAM Policy：Allow 只准指定動作＋來源 IP",
      "scenario": "Policy 只 Allow lambda:CreateFunction 來自特定 CIDR。",
      "picked": "用 187.5.104.11/32 DeleteFunction",
      "correct": "用允許嘅 IP（100.220.0.11/32）CreateFunction",
      "why": "IAM 預設隱式 deny；只准寫明嘅 Action＋Condition。Delete 同其他 IP 都會被拒。",
      "mnemonic": "Allow 清單外＝deny；對齊 Action＋CIDR。",
      "services": [
        {
          "name": "IAM Policy",
          "blurb": "身分權限；隱式 deny＋顯式 Allow"
        }
      ]
    },
    {
      "id": 44,
      "cluster": "SEC",
      "concept": "RDS IAM 登入要開 IAM DB Authentication",
      "scenario": "EC2／App 要用 IAM 認證連 MySQL RDS。",
      "picked": "淨俾 EC2 掛 IAM Role",
      "correct": "喺 RDS 啟用 IAM DB Authentication",
      "why": "Role 只係身分憑證來源；RDS 本身要開啟 IAM DB Auth，應用先用 token 登入。",
      "mnemonic": "連 RDS 用 IAM → 記得開 IAM DB Authentication。",
      "services": [
        {
          "name": "IAM DB Authentication",
          "blurb": "用 IAM token 登入 RDS／Aurora"
        }
      ]
    },
    {
      "id": 45,
      "cluster": "SEC",
      "concept": "ElastiCache Redis 安全：AUTH＋傳輸加密",
      "scenario": "銀行 portal 用 Redis 做 session，要加固認證。",
      "picked": "用 IAM auth token 當 Redis 密碼",
      "correct": "開 Redis AUTH + in-transit encryption（TLS）",
      "why": "ElastiCache Redis 傳統用 Redis AUTH／ACL＋傳輸加密；唔好把 IAM token 當 Redis password。",
      "mnemonic": "Redis 安全 → AUTH＋transit encryption。",
      "services": [
        {
          "name": "ElastiCache Redis",
          "blurb": "記憶體快取／session；AUTH＋TLS"
        }
      ]
    },
    {
      "id": 50,
      "cluster": "SEC",
      "concept": "S3 惡意／異常存取 → GuardDuty",
      "scenario": "加密文件上 S3，要監察未授權／惡意存取風險。",
      "picked": "Amazon Inspector 監察 S3",
      "correct": "Amazon GuardDuty 監察 S3 惡意活動",
      "why": "Inspector 偏 CVE／漏洞評估；GuardDuty 有 S3 Protection 睇異常 API／威脅。",
      "mnemonic": "惡意活動 → GuardDuty；漏洞掃描 → Inspector。",
      "services": [
        {
          "name": "GuardDuty",
          "blurb": "威脅偵測（含 S3 Protection）"
        },
        {
          "name": "Inspector",
          "blurb": "CVE／漏洞評估"
        }
      ]
    },
    {
      "id": 53,
      "cluster": "SEC",
      "concept": "跨帳戶上傳後 bucket owner 要有控制權",
      "scenario": "外部 user 上傳 S3，要確保 bucket owner 擁有物件。",
      "picked": "開 access logging + IAM 要求 ACL",
      "correct": "Bucket policy 要求上傳設 ACL=bucket-owner-full-control",
      "why": "Logging 只係稽核；要強制擁有權要用 bucket policy 要求 bucket-owner-full-control（或改用 Bucket owner enforced）。",
      "mnemonic": "要擁有權 → bucket policy／ACL 條件，唔係 logging。",
      "services": [
        {
          "name": "S3 Bucket Policy",
          "blurb": "帳戶級資源政策，可強制 ACL／條件"
        }
      ]
    },
    {
      "id": 11,
      "cluster": "LB",
      "concept": "ALB 逐筆 HTTP 明細 → Access Logs",
      "scenario": "要每 5 分鐘捉晒經 ALB 嘅 HTTP 請求明細同延遲。",
      "picked": "ECS 裝 X-Ray daemon + ServiceLens",
      "correct": "開 ALB Access Logs（＋可用 CloudWatch Application Insights）",
      "why": "X-Ray／ServiceLens 係分散式追蹤；逐請求 HTTP 明細同 ELB 指標要用 Access Logs／ELB metrics。",
      "mnemonic": "HTTP 請求明細 → ALB Access Logs；call chain → X-Ray。",
      "services": [
        {
          "name": "ALB Access Logs",
          "blurb": "逐請求 HTTP 詳情落地 S3"
        },
        {
          "name": "X-Ray",
          "blurb": "分散式追蹤"
        }
      ]
    },
    {
      "id": 13,
      "cluster": "LB",
      "concept": "URL 路徑分流 → 留 ALB path rules",
      "scenario": "網上訂單系統 ALB 要按 URL path 去唔同 target group。",
      "picked": "換做 Gateway Load Balancer 再 path 分流",
      "correct": "繼續用 ALB，用 path conditions 轉發",
      "why": "GWLB 係畀第三方防火牆／虛擬裝置；HTTP path／host 分流係 ALB 強項。",
      "mnemonic": "網站 path／host → ALB；虛擬防火牆 → GWLB。",
      "services": [
        {
          "name": "ALB",
          "blurb": "L7 HTTP 路由（path／host／header）"
        },
        {
          "name": "GWLB",
          "blurb": "串接第三方 network appliances"
        }
      ]
    },
    {
      "id": 17,
      "cluster": "LB",
      "concept": "成日打 Origin → 先查 Cache-Control",
      "scenario": "新聞站 CloudFront 每個 request 都打到 origin，edge 唔命中。",
      "picked": "物件太大 CloudFront 處理唔到",
      "correct": "Cache-Control max-age=0（禁止快取）",
      "why": "max-age=0 令 edge 每次都要回源。先查快取標頭／TTL，唔係怪檔案太大。",
      "mnemonic": "Origin 成日命中 → 先睇 Cache-Control／TTL。",
      "services": [
        {
          "name": "CloudFront",
          "blurb": "CDN；跟從 Cache-Control／TTL"
        }
      ]
    },
    {
      "id": 21,
      "cluster": "MSG",
      "concept": "要即時＋寫 DynamoDB → Kinesis+Lambda",
      "scenario": "醫療要即時串流、匿名化 PII，再存低延遲資料庫分析。",
      "picked": "Data Firehose → Redshift",
      "correct": "Kinesis Data Streams + Lambda 匿名化 → DynamoDB",
      "why": "Firehose 係近即時批次落地（常去 S3／Redshift）；毫秒級即時處理＋NoSQL 用 Streams+Lambda+DynamoDB。",
      "mnemonic": "真・即時 → Kinesis Streams；近即時批次 → Firehose。",
      "services": [
        {
          "name": "Kinesis Data Streams",
          "blurb": "即時串流擷取"
        },
        {
          "name": "Firehose",
          "blurb": "託管近即時投遞到分析儲存"
        }
      ]
    },
    {
      "id": 26,
      "cluster": "MSG",
      "concept": "訂單唔好重複處理 → SQS FIFO",
      "scenario": "標準 SQS 出現同一訂單處理兩次。",
      "picked": "改 visibility timeout",
      "correct": "改用 SQS FIFO（exactly-once／去重）",
      "why": "Visibility timeout 只係隱藏訊息，唔保證去重；要有序＋去重用 FIFO＋deduplication。",
      "mnemonic": "要去重／有序 → FIFO；timeout ≠ exactly-once。",
      "services": [
        {
          "name": "SQS FIFO",
          "blurb": "有序＋去重隊列"
        }
      ]
    },
    {
      "id": 31,
      "cluster": "MSG",
      "concept": "IoT 毫秒級寫入 → DynamoDB 唔係 Redshift",
      "scenario": "IoT 感測器串流要 real-time 毫秒級儲存。",
      "picked": "Kinesis + Lambda → Redshift",
      "correct": "Kinesis + Lambda → DynamoDB",
      "why": "Redshift 係倉儲／分析，寫入唔係毫秒級 OLTP；低延遲鍵值用 DynamoDB。",
      "mnemonic": "毫秒級實時寫 → DynamoDB；報表分析 → Redshift。",
      "services": [
        {
          "name": "DynamoDB",
          "blurb": "毫秒級 NoSQL"
        },
        {
          "name": "Redshift",
          "blurb": "資料倉儲分析"
        }
      ]
    },
    {
      "id": 6,
      "cluster": "DB",
      "concept": "RDS Multi-AZ＝同 Region 同步備援",
      "scenario": "問 Multi-AZ 好處；選項誤寫『跨 Region 同步 standby』。",
      "picked": "Multi-AZ 同步 standby 去另一 Region",
      "correct": "同 Region 跨 AZ 同步 standby：升級／AZ 故障時提高可用同耐用",
      "why": "Multi-AZ 係同 Region HA；跨 Region 要用 Aurora Global DB／DynamoDB Global Tables／跨區副本等。",
      "mnemonic": "Multi-AZ＝同區 HA；跨區另有 Global／CRR。",
      "services": [
        {
          "name": "RDS Multi-AZ",
          "blurb": "同 Region 同步 standby failover"
        }
      ]
    },
    {
      "id": 33,
      "cluster": "DB",
      "concept": "Aurora 自帶 Multi-AZ／Replicas，唔好當 EC2 裝",
      "scenario": "要保護 Aurora 免單點故障／提高可用。",
      "picked": "Aurora 裝上 ASG EC2 + ELB",
      "correct": "用 Aurora 內建 Multi-AZ／Aurora Replicas（共享儲存）",
      "why": "Aurora 係託管；唔會自己喺 ASG EC2 上面『跑 Aurora』。副本共享同一 volume。",
      "mnemonic": "Aurora＝託管；唔好 ASG+ELB 自己砌。",
      "services": [
        {
          "name": "Aurora Replicas",
          "blurb": "讀擴展＋故障轉移，共享儲存"
        }
      ]
    },
    {
      "id": 61,
      "cluster": "DB",
      "concept": "讀擴展＝Read Replica；Multi-AZ＝HA",
      "scenario": "新聞站讀負載高，要改善讀效能。",
      "picked": "RDS Multi-AZ 做 read scalability",
      "correct": "加 RDS／Aurora Read Replicas",
      "why": "Multi-AZ standby 唔提供讀流量；讀擴展要 Read Replica。",
      "mnemonic": "HA＝Multi-AZ；讀擴＝Replica。",
      "services": [
        {
          "name": "Read Replica",
          "blurb": "非同步讀副本擴展讀流量"
        }
      ]
    },
    {
      "id": 14,
      "cluster": "ORG",
      "concept": "多帳戶標準化落地 → Control Tower",
      "scenario": "Organizations 下要大量開帳戶並統一安全基線／網絡。",
      "picked": "用 AWS RAM 開新帳戶",
      "correct": "Control Tower Landing Zone + guardrails",
      "why": "RAM 係跨帳戶分享資源；開帳戶＋guardrails／基線用 Control Tower。",
      "mnemonic": "開帳戶＋護欄 → Control Tower；分享資源 → RAM。",
      "services": [
        {
          "name": "Control Tower",
          "blurb": "多帳戶 Landing Zone＋guardrails"
        },
        {
          "name": "RAM",
          "blurb": "跨帳戶共享資源"
        }
      ]
    },
    {
      "id": 24,
      "cluster": "ORG",
      "concept": "多帳戶員工登入 → IAM Identity Center",
      "scenario": "多 AWS 帳戶要高效安全管人嘅存取（常連 AD）。",
      "picked": "Cognito identity pool + Identity Center",
      "correct": "啟用 IAM Identity Center（可連企業 AD／SSO）",
      "why": "Cognito 主要面向 App 用家；員工／多帳戶人力存取用 IAM Identity Center（SSO）。",
      "mnemonic": "員工多帳戶登入 → Identity Center；App 用家 → Cognito。",
      "services": [
        {
          "name": "IAM Identity Center",
          "blurb": "人力 SSO／多帳戶權限"
        },
        {
          "name": "Cognito",
          "blurb": "App 用戶身分"
        }
      ]
    },
    {
      "id": 25,
      "cluster": "SCALE",
      "concept": "一般 Enhanced Networking → ENA；EFA 留給 MPI",
      "scenario": "Windows EC2 做 CFD／HPC scale-out，要提升網絡。",
      "picked": "Enhanced Networking with EFA",
      "correct": "Enhanced Networking with ENA",
      "why": "ENA 係一般高 PPS／低延遲增強網絡；EFA 專為 MPI／緊耦合 HPC。多數題先揀 ENA，除非明確 MPI。",
      "mnemonic": "一般加速網卡 → ENA；MPI 緊耦合 → EFA。",
      "services": [
        {
          "name": "ENA",
          "blurb": "Enhanced Networking 常用網卡"
        },
        {
          "name": "EFA",
          "blurb": "MPI／緊耦合 HPC 網卡"
        }
      ]
    },
    {
      "id": 34,
      "cluster": "SCALE",
      "concept": "辦公時段可預測 → Scheduled scaling",
      "scenario": "App 平日 9 點起繁忙，用戶投訴朝早慢。",
      "picked": "淨 Dynamic scaling 跟住 CPU",
      "correct": "Scheduled scaling（已知繁忙時段預先加機器）",
      "why": "CPU 動態擴有滯後；已知 office hours 應用排程／預測擴，繁忙前就加好容量。",
      "mnemonic": "知幾點忙 → Scheduled；突發未知 → Dynamic。",
      "services": [
        {
          "name": "ASG Scheduled scaling",
          "blurb": "按時間表預先加減容量"
        }
      ]
    },
    {
      "id": 35,
      "cluster": "SCALE",
      "concept": "同 AZ 唔同 subnet 本來就可以互通",
      "scenario": "兩部 On-Demand EC2 同 AZ 唔同 subnet，要通訊。",
      "picked": "放入同一個 Placement Group",
      "correct": "靠路由＋Security Group 放行即可（唔使 Placement Group）",
      "why": "同 VPC 內跨 subnet 預設可路由；Placement Group 係為 HPC 低延遲／高吞吐，唔係『先決通訊條件』。",
      "mnemonic": "同 VPC 通訊 → SG／路由；Placement＝HPC 性能。",
      "services": [
        {
          "name": "Security Group",
          "blurb": "實例級 stateful 防火牆"
        },
        {
          "name": "Placement Group",
          "blurb": "HPC 低延遲擺位"
        }
      ]
    },
    {
      "id": 54,
      "cluster": "SCALE",
      "concept": "EC2 軟性配額 → 申請 Service Quotas",
      "scenario": "腳本開 EC2，成功約 20 次後失敗。",
      "picked": "換另一 Region 再試",
      "correct": "認清 vCPU／On-Demand 區域配額，去 Service Quotas 申請提高",
      "why": "預設有 per-region 實例／vCPU soft limit；正解係申請提高配額，唔係當第一招換區。",
      "mnemonic": "開唔到機先查配額 → Service Quotas。",
      "services": [
        {
          "name": "Service Quotas",
          "blurb": "查看／申請提高服務限額"
        }
      ]
    },
    {
      "id": 55,
      "cluster": "SCALE",
      "concept": "Site-to-Site VPN 要 Customer Gateway 公網 IP",
      "scenario": "地端 SAP HANA 要同 AWS 建 Site-to-Site VPN。",
      "picked": "主路由表經 NAT instance",
      "correct": "Customer Gateway 要地端 VPN 裝置嘅靜態公網 IP",
      "why": "建 VPN 要 VGW／TGW + Customer Gateway（on-prem 公網 IP）；NAT instance 路由唔係呢題關鍵。",
      "mnemonic": "地端 VPN → Customer Gateway 公網 IP。",
      "services": [
        {
          "name": "Customer Gateway",
          "blurb": "代表地端 VPN 裝置（公網 IP）"
        },
        {
          "name": "Site-to-Site VPN",
          "blurb": "地端↔AWS 加密通道"
        }
      ]
    },
    {
      "id": 62,
      "cluster": "SCALE",
      "concept": "故障容忍數學：2×3 AZ 好過 1×4",
      "scenario": "全球網站要 fault tolerance，ASG+ALB 佈局。",
      "picked": "ASG 1 台 × 4 個 AZ",
      "correct": "ASG 每 AZ 2 台 × 3 個 AZ",
      "why": "1×4 任一 AZ 掛就掉 25% 且該 AZ 變 0；2×3 喺丟一個 AZ 後仍有較均衡剩餘容量（題目要求嘅 FT 數學）。",
      "mnemonic": "HA 佈局：每 AZ 要有容量，唔好 1 台灑太多 AZ。",
      "services": [
        {
          "name": "ASG + ALB",
          "blurb": "跨 AZ 自動擴展＋負載均衡"
        }
      ]
    },
    {
      "id": 23,
      "cluster": "SCALE",
      "concept": "Redshift 跨區 DR → Cross-Region snapshot copy",
      "scenario": "Redshift 倉要抵禦單一 Region 故障。",
      "picked": "只開 Automated snapshots",
      "correct": "設定 Cross-Region snapshot copy（或其他多區 DR）",
      "why": "自動快照通常留喺本 Region；要跨區 DR 要明確做 cross-region snapshot copy。",
      "mnemonic": "自動快照＝同區；跨區 DR 要 copy。",
      "services": [
        {
          "name": "Redshift snapshots",
          "blurb": "備份；跨區要另外設定 copy"
        }
      ]
    },
    {
      "id": 5,
      "cluster": "SRV",
      "concept": "對話 chatbot → Lex（唔係 Rekognition）",
      "scenario": "航空要自助訂位／check-in 對話機械人。",
      "picked": "Amazon Rekognition chatbot",
      "correct": "Amazon Lex + Lambda code hooks",
      "why": "Rekognition＝影像／人臉；對話意圖／slot 用 Lex，業務邏輯用 Lambda。",
      "mnemonic": "傾偈 chatbot → Lex；睇相 → Rekognition。",
      "services": [
        {
          "name": "Amazon Lex",
          "blurb": "對話機器人／意圖識別"
        },
        {
          "name": "Rekognition",
          "blurb": "影像與人臉分析"
        }
      ]
    },
    {
      "id": 10,
      "cluster": "SRV",
      "concept": "等 App 裝好先算建好 → CreationPolicy+cfn-signal",
      "scenario": "CloudFormation 建 SharePoint／多層 EC2，要等軟件裝完先 CREATE_COMPLETE。",
      "picked": "DependsOn + cfn-init",
      "correct": "CreationPolicy + cfn-signal",
      "why": "DependsOn 只等資源建立；cfn-init 裝軟件但唔通知堆疊。CreationPolicy+cfn-signal 先會等成功訊號。",
      "mnemonic": "等『裝好』→ CreationPolicy+cfn-signal。",
      "services": [
        {
          "name": "CreationPolicy",
          "blurb": "等 cfn-signal 先完成建立"
        },
        {
          "name": "cfn-init",
          "blurb": "開機裝配軟件（唔等於 signal）"
        }
      ]
    },
    {
      "id": 19,
      "cluster": "SRV",
      "concept": "EKS 容器指標 → Container Insights",
      "scenario": "EKS 微服務要睇應用日誌同容器／叢集指標。",
      "picked": "淨裝 CloudWatch agent",
      "correct": "開 CloudWatch Container Insights（EKS）",
      "why": "Container Insights 專為容器叢集提供節點／Pod／叢集指標同儀表板；比淨裝 agent 更對題。",
      "mnemonic": "EKS／ECS 容器可觀測 → Container Insights。",
      "services": [
        {
          "name": "Container Insights",
          "blurb": "容器叢集指標與儀表板"
        }
      ]
    },
    {
      "id": 29,
      "cluster": "SRV",
      "concept": "CloudFormation＝IaC，唔係儲存服務",
      "scenario": "工程師寫 CFN YAML，經理唔明點解未即開 EC2／S3。（Select TWO）",
      "picked": "Provides highly durable and scalable data storage",
      "correct": "可建模／佈建／版本控制成個基礎設施；用文字檔描述成個環境",
      "why": "『高耐用儲存』係 S3 等服務；CloudFormation 係免費嘅 IaC 引擎，你只付資源費。",
      "mnemonic": "CFN＝文字建模基礎設施；唔係硬碟。",
      "services": [
        {
          "name": "CloudFormation",
          "blurb": "IaC：模板建模、佈建、版本控制"
        }
      ]
    },
    {
      "id": 41,
      "cluster": "SRV",
      "concept": "多表原子寫入 → DynamoDB Transactions",
      "scenario": "醫療 App 要喺多個 DynamoDB 表原子讀寫。",
      "picked": "Athena Federated Query 連 DynamoDB",
      "correct": "DynamoDB Transactions（TransactWrite／Get）",
      "why": "Athena Federated 係跨源查詢分析，唔提供多表 ACID 交易；原子多項目操作用 Transactions。",
      "mnemonic": "多表原子 → DynamoDB Transactions；跨源查 → Athena。",
      "services": [
        {
          "name": "DynamoDB Transactions",
          "blurb": "多項目／多表原子操作"
        },
        {
          "name": "Athena Federated",
          "blurb": "用 SQL 查外部資料源"
        }
      ]
    },
    {
      "id": 42,
      "cluster": "SRV",
      "concept": "每日細小 1MB 處理 → Lambda",
      "scenario": "穿戴裝置每日只產生約 1MB 健康數據要處理。",
      "picked": "Firehose→S3 + EC2（≥512MB）處理",
      "correct": "AWS Lambda（Python）直接處理",
      "why": "細、短、間歇工作用 Lambda 最省運維；Firehose+EC2 過重。",
      "mnemonic": "細日常批處理 → Lambda；大串流落地 → Firehose。",
      "services": [
        {
          "name": "AWS Lambda",
          "blurb": "事件驅動短任務運算"
        }
      ]
    },
    {
      "id": 51,
      "cluster": "SRV",
      "concept": "Serverless GraphQL＋自訂網域 → AppSync",
      "scenario": "要加快 GraphQL API，serverless、HTTPS、自訂網域。",
      "picked": "Elastic Beanstalk + Route 53 DNSSEC",
      "correct": "AWS AppSync＋內建 custom domain／ACM 憑證",
      "why": "AppSync 原生 GraphQL serverless；DNSSEC ≠ 開 HTTPS。自訂網域用 AppSync＋ACM。",
      "mnemonic": "Serverless GraphQL → AppSync；DNSSEC 唔等於 HTTPS。",
      "services": [
        {
          "name": "AWS AppSync",
          "blurb": "託管 GraphQL＋訂閱＋自訂網域"
        }
      ]
    },
    {
      "id": 59,
      "cluster": "SRV",
      "concept": "Glue 唔好重複處理 → Job bookmarks",
      "scenario": "每日 Glue ETL 讀 S3 新增 XML，唔想重跑舊檔。",
      "picked": "把 NumberOfWorkers 設成 3",
      "correct": "Enable Glue job bookmarks",
      "why": "Workers 只影響並行度；bookmarks 記住已處理資料，避免重處理。",
      "mnemonic": "唔好重跑舊資料 → Glue job bookmarks。",
      "services": [
        {
          "name": "Glue Job Bookmarks",
          "blurb": "追蹤已處理資料狀態"
        }
      ]
    },
    {
      "id": 64,
      "cluster": "SRV",
      "concept": "API 新版發布 → 同一 API Gateway canary／stage",
      "scenario": "區域 API Gateway 已有自訂網域，要出新版 API。",
      "picked": "新建另一個 API Gateway 但沿用同一自訂網域",
      "correct": "同一 API Gateway 做 canary release／新 stage（或 base path mapping）",
      "why": "同一自訂網域通常綁一個 API；用 canary／stage 漸進放量，避免硬開第二個 API 搶網域。",
      "mnemonic": "新版 API → canary／stage，唔好亂開第二個 GW 搶網域。",
      "services": [
        {
          "name": "API Gateway canary",
          "blurb": "按百分比把流量導去新部署"
        }
      ]
    },
    {
      "id": 65,
      "cluster": "SRV",
      "concept": "Serverless 容器映像＋ECR → Lambda 容器",
      "scenario": "要喺全托管 serverless 跑 ECR 容器映像，並加大 ephemeral storage。",
      "picked": "ECS on Fargate",
      "correct": "Lambda 容器映像＋把 function storage 設到 5GB",
      "why": "題目強調 serverless compute + ECR 映像 + 加大暫存；Lambda 支援 container image 同 ephemeral storage。Fargate 係容器編排另一條路。",
      "mnemonic": "題目寫 Lambda／serverless 容器映像 → Lambda container。",
      "services": [
        {
          "name": "Lambda container image",
          "blurb": "用 ECR 映像跑 Lambda，可調 ephemeral storage"
        }
      ]
    }
  ]
};
