export const profile = {
  name: "Rahul Reddy CH",
  firstName: "Rahul",
  role: "Power BI · Software Developer",
  tagline: "I replace manual spreadsheet reporting with governed dashboards business leaders can act on the same day.",
  location: "USA",
  phone: "(856) 526-9115",
  phoneHref: "tel:+18565269115",
  email: "rahul.r24.c@gmail.com",
  yearsExp: "2+",
  summary:
    "Software Developer with over 2+ years of experience delivering BI and reporting solutions for financial services, insurance, and enterprise operations. Available for contract engagements and experienced in owning projects end to end, from requirements gathering and data modeling to dashboard deployment, user training, and post go-live support. Strong across Azure and AWS, with hands-on experience in Databricks, Tableau, DAX, and SQL. Skilled in building financial reporting dashboards, implementing Row-Level Security, and replacing manual spreadsheet reporting with automated solutions that give business leaders faster access to reliable data.",
  openTo: "Available for contract engagements",
} as const;

/* ----------------------------------------------------------------- METRICS */
export type Metric = {
  id: string;
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  detail: string;
  accent: "amber" | "cyan" | "violet" | "mint";
};

export const metrics: Metric[] = [
  {
    id: "load",
    value: 67,
    suffix: "%",
    label: "Faster dashboard loads",
    detail:
      "Tuned SQL queries and Power BI models on a wealth management engagement, taking dashboard load times from around 15 seconds to under 5. Daily active usage across the advisory team rose as a direct result.",
    accent: "amber",
  },
  {
    id: "years",
    value: 2,
    suffix: "+ yrs",
    label: "Enterprise BI delivery",
    detail:
      "End to end ownership across three organisations: requirements gathering, data modeling, dashboard deployment, user training and post go-live support.",
    accent: "cyan",
  },
  {
    id: "industries",
    value: 3,
    suffix: "",
    label: "Industries delivered in",
    detail:
      "Financial services (portfolio performance, asset allocation, client profitability), insurance (claims, premium collections, fraud detection), and enterprise operations (supply chain, distribution, pricing).",
    accent: "violet",
  },
  {
    id: "clouds",
    value: 2,
    suffix: "",
    label: "Clouds in production",
    detail:
      "Azure (Data Factory, Synapse, Azure SQL, Data Lake Storage) and AWS (S3, Glue, Redshift, Athena, Lambda, RDS), with Databricks and Spark spanning both.",
    accent: "mint",
  },
];

/* ------------------------------------------------------------------ SKILLS */
export type Skill = {
  id: string;
  name: string;
  category: SkillCategoryId;
  level: number;
  years: number;
  blurb: string;
  proof: string;
  tags: string[];
  link?: string;
  snippet?: { lang: string; code: string };
};

export type SkillCategoryId =
  | "bi" | "model" | "cloud" | "bigdata" | "data" | "etl" | "code" | "domain" | "tools";

export const skillCategories: {
  id: SkillCategoryId; name: string; short: string; desc: string; accent: string; icon: string;
}[] = [
  { id: "bi",      name: "BI & Visualization",      short: "BI",        desc: "The surface the business actually touches, across two BI platforms.", accent: "var(--accent)", icon: "BarChart3" },
  { id: "model",   name: "Modeling & DAX",          short: "Modeling",  desc: "The schema and measure decisions that quietly decide whether a report is fast or fatal.", accent: "var(--cyan)", icon: "Boxes" },
  { id: "cloud",   name: "Cloud Platforms",         short: "Cloud",     desc: "Azure and AWS, both in production rather than on a certificate.", accent: "var(--violet)", icon: "Cloud" },
  { id: "bigdata", name: "Big Data & Processing",   short: "Big Data",  desc: "Where the heavy transactional volumes get shaped before BI ever sees them.", accent: "var(--mint)", icon: "Layers" },
  { id: "data",    name: "Databases & Warehousing", short: "Databases", desc: "Six engines, and knowing which one the answer should come from.", accent: "var(--rose)", icon: "Database" },
  { id: "etl",     name: "ETL & Integration",       short: "ETL",       desc: "Moving data in reliably, so nobody opens a dashboard to yesterday's numbers.", accent: "var(--accent)", icon: "Workflow" },
  { id: "code",    name: "Programming & Scripting", short: "Code",      desc: "For the work no BI tool has a button for.", accent: "var(--cyan)", icon: "Terminal" },
  { id: "domain",  name: "Domain Knowledge",        short: "Domain",    desc: "Finance, insurance and operations vocabulary, so requirements need less translation.", accent: "var(--violet)", icon: "Landmark" },
  { id: "tools",   name: "Tools & Methodologies",   short: "Toolchain", desc: "How the work gets tracked, reviewed and shipped.", accent: "var(--mint)", icon: "Wrench" },
];

export const skills: Skill[] = [
  /* ---------------------------------------------------- BI & Visualization */
  { id: "pbi-desktop", name: "Power BI Desktop", category: "bi", level: 98, years: 2,
    blurb: "The authoring environment where models, measures and report pages are built. Every dataset I own starts here with a documented model diagram before a single visual is placed.",
    proof: "Primary build tool across all three roles, covering supply chain, wealth management and insurance reporting.",
    tags: ["Authoring", "Modeling", "Reports"], link: "https://learn.microsoft.com/power-bi/fundamentals/desktop-what-is-desktop" },
  { id: "pbi-service", name: "Power BI Service", category: "bi", level: 96, years: 2,
    blurb: "The hosted layer: workspaces, apps, sharing, scheduled refresh and usage telemetry. This is where version control problems either get solved or get worse.",
    proof: "Migrated legacy Excel operational reports to Power BI Service with scheduled refresh, ending the situation where teams reported inconsistent numbers for the same period.",
    tags: ["Workspaces", "Scheduled refresh", "Apps"] },
  { id: "pbi-report-server", name: "Power BI Report Server", category: "bi", level: 82, years: 2,
    blurb: "On-premises report hosting for environments where data residency or client policy means the cloud is not an option.",
    proof: "Hybrid delivery alongside cloud workspaces in regulated client environments.",
    tags: ["On-prem", "Hybrid"] },
  { id: "pbi-embedded", name: "Power BI Embedded", category: "bi", level: 78, years: 2,
    blurb: "Surfacing reports inside another application rather than sending users to a separate portal, which is usually what gets adoption past the analyst team.",
    proof: "Part of the Azure delivery stack on client engagements.",
    tags: ["Azure", "Embedding"] },
  { id: "tableau-desktop", name: "Tableau Desktop", category: "bi", level: 86, years: 2,
    blurb: "Second BI platform, used in earnest rather than in passing. Different strengths to Power BI, and knowing which tool suits a given ask is worth more than loyalty to either.",
    proof: "Built underwriting and claims dashboards tracking loss ratios, claim cycle times and adjuster productivity at DXC.",
    tags: ["Visual analytics", "Dual-platform"] },
  { id: "tableau-server", name: "Tableau Server", category: "bi", level: 80, years: 2,
    blurb: "Publishing, permissions, extract refresh schedules and the governance layer around shared Tableau content.",
    proof: "Dashboard delivery for trading volume and settlement trend reporting on AWS-backed sources.",
    tags: ["Publishing", "Extracts"] },
  { id: "tableau-prep", name: "Tableau Prep", category: "bi", level: 74, years: 2,
    blurb: "Visual data preparation for the shaping that belongs close to the Tableau workbook rather than back in the warehouse.",
    proof: "Data preparation supporting operational Tableau reporting.",
    tags: ["Prep", "Shaping"] },
  { id: "ssrs", name: "SSRS", category: "bi", level: 85, years: 2,
    blurb: "Pixel-perfect, multi-page, print-ready operational reports. Still the right answer when finance or compliance needs a document rather than a dashboard.",
    proof: "Claims processing and premium collection reporting for a global insurance provider.",
    tags: ["Paginated", "RDL", "Operational"] },

  /* --------------------------------------------------------- Modeling & DAX */
  { id: "dax", name: "DAX", category: "model", level: 97, years: 2,
    blurb: "The language of the model. I write measures that respect filter context instead of fighting it: CALCULATE over iterators, variables over repeated scans, and names that survive handover.",
    proof: "Cost per shipment, on-time delivery rate and inventory turn measures that let supply chain leadership identify underperforming lanes and adjust routing.",
    tags: ["CALCULATE", "Filter context", "KPI"],
    snippet: { lang: "dax", code: `On-Time Delivery % =\nVAR _OnTime =\n    CALCULATE (\n        COUNTROWS ( FactShipment ),\n        FactShipment[DeliveredOn] <= FactShipment[PromisedOn]\n    )\nVAR _Total = COUNTROWS ( FactShipment )\nRETURN\n    DIVIDE ( _OnTime, _Total )\n\n-- variables stop the table being scanned twice\n-- DIVIDE handles the empty-lane case without IFERROR` } },
  { id: "power-query", name: "Power Query (M)", category: "model", level: 95, years: 2,
    blurb: "The transformation layer. I write M that folds, pushing every step back to the source engine, and I check the folding indicator rather than assuming it worked.",
    proof: "Transformation logic behind consolidated distribution reporting across multiple source systems.",
    tags: ["M Language", "Folding", "Shaping"],
    snippet: { lang: "m", code: `let\n    Source   = Sql.Database ( Server, Database ),\n    Shipment = Source{[Schema="dbo",Item="Shipment"]}[Data],\n    Filtered = Table.SelectRows ( Shipment, each [IsActive] = true ),\n    Typed    = Table.TransformColumnTypes ( Filtered, {\n                   {"ShipDate", type date},\n                   {"Cost",     Currency.Type}\n               }),\n    Trimmed  = Table.SelectColumns ( Typed, ModelColumns )\nin\n    Trimmed\n\n// every step above folds to T-SQL\n// selecting columns last keeps the source query narrow` } },
  { id: "star-schema", name: "Star Schema Design", category: "model", level: 96, years: 2,
    blurb: "One fact table surrounded by conformed dimensions, single-direction relationships, no ambiguity. It is the highest-leverage decision in a model, and most performance complaints are really schema complaints.",
    proof: "Applied at NextGen IT Solutions alongside incremental refresh, improving report performance and reducing complaints about slow dashboards during month-end cycles.",
    tags: ["Kimball", "Fact/Dim", "Foundation"],
    snippet: { lang: "model", code: `FactShipment  ──►  DimDate\n      │  │  │\n      │  │  └────►  DimCarrier\n      │  └───────►  DimLane\n      └──────────►  DimDistributionCenter\n\n1 fact · 4 conformed dims · single-direction filters\nNo bi-directional cross-filtering. No hidden ambiguity.` } },
  { id: "incremental-refresh", name: "Incremental Refresh", category: "model", level: 92, years: 2,
    blurb: "Refresh only the partitions that changed. Turns a long full reload into a short partition update and takes the pressure off the source system.",
    proof: "Applied with star schema design to keep refresh windows stable as transactional volumes grew.",
    tags: ["Partitions", "Refresh window"], link: "https://learn.microsoft.com/power-bi/connect-data/incremental-refresh-overview" },
  { id: "rls", name: "Row-Level Security", category: "model", level: 95, years: 2,
    blurb: "Dynamic RLS driven by USERPRINCIPALNAME against a security dimension. One dataset, and every user sees exactly their own slice of it.",
    proof: "Regional and business unit managers at NextGen IT Solutions see only their own distribution data, satisfying internal audit and enabling broader self-service adoption.",
    tags: ["Dynamic", "Audit", "Self-service"],
    snippet: { lang: "dax", code: `-- Role: "Regional Manager"\n-- Filter applied to DimDistributionCenter\n\nDimDistributionCenter[RegionKey] IN\n    CALCULATETABLE (\n        VALUES ( SecurityUserRegion[RegionKey] ),\n        SecurityUserRegion[UserEmail] = USERPRINCIPALNAME ()\n    )\n\n-- one dataset · every manager sees only their regions\n-- always validated with "View as role" before release` } },
  { id: "what-if", name: "What-If Scenario Analysis", category: "model", level: 88, years: 2,
    blurb: "Parameter-driven modeling so a stakeholder moves a slider and sees the impact live, instead of three static versions arriving by email.",
    proof: "Scenario dashboards letting portfolio managers model returns under different market conditions, supporting client conversations with defensible numbers rather than presentation slides.",
    tags: ["Parameters", "Scenario", "Client-facing"] },
  { id: "drillthrough", name: "Drill-through & Tooltips", category: "model", level: 90, years: 2,
    blurb: "Summary on the page, transaction-level evidence one click away. The difference between a dashboard people trust and one they export to Excel to verify.",
    proof: "Transaction-level drill-through used in compliance and audit reviews, shortening the time analysts spent pulling supporting evidence for regulatory inquiries.",
    tags: ["Detail", "Compliance", "UX"] },
  { id: "ssas-tabular", name: "SSAS Tabular", category: "model", level: 84, years: 2,
    blurb: "The in-memory engine underneath Power BI, addressed directly when a model needs to live in the enterprise layer rather than inside a single report.",
    proof: "Enterprise semantic modeling alongside Power BI datasets.",
    tags: ["VertiPaq", "Semantic layer"] },
  { id: "ssas-multi", name: "SSAS Multidimensional", category: "model", level: 76, years: 2,
    blurb: "Classic OLAP cubes. Rarely the choice for something new, frequently the reality in an established enterprise estate.",
    proof: "Legacy cube reporting in enterprise environments.",
    tags: ["OLAP", "MDX", "Legacy"] },

  /* ---------------------------------------------------------------- Cloud */
  { id: "adf", name: "Azure Data Factory", category: "cloud", level: 90, years: 2,
    blurb: "Orchestrated pipelines with scheduling, dependency handling and retries. The scaffolding that makes a data platform survive a bad night at the source.",
    proof: "ETL pipelines pulling from core banking systems, market data feeds and CRM platforms, replacing a manual process that had introduced errors into client-facing reports.",
    tags: ["Pipelines", "Orchestration"], link: "https://learn.microsoft.com/azure/data-factory/" },
  { id: "synapse", name: "Azure Synapse Analytics", category: "cloud", level: 84, years: 2,
    blurb: "Warehouse-scale analytics and the serving layer BI reads from when volumes outgrow a single relational database.",
    proof: "Analytics platform in the Azure delivery stack.",
    tags: ["Warehouse", "Serving layer"] },
  { id: "azure-sql", name: "Azure SQL", category: "cloud", level: 89, years: 2,
    blurb: "Managed relational storage: the same T-SQL discipline as on-prem, without owning the hardware or the patching.",
    proof: "Reporting source across Azure-based client engagements.",
    tags: ["Managed", "T-SQL"] },
  { id: "adls", name: "Azure Data Lake Storage", category: "cloud", level: 85, years: 2,
    blurb: "The landing and curated zones. Structure here is what keeps a lake from turning into a swamp nobody can query.",
    proof: "Storage layer feeding Databricks and BI models.",
    tags: ["Lake", "Zones"] },
  { id: "blob", name: "Azure Blob Storage", category: "cloud", level: 84, years: 2,
    blurb: "Files, exports and archive partitions that have no business sitting in a relational database.",
    proof: "Cloud file integration inside BI pipelines.",
    tags: ["Storage", "Archive"] },
  { id: "s3", name: "AWS S3", category: "cloud", level: 86, years: 2,
    blurb: "The AWS side of the same story. Staging policy and claims data before it ever reaches a warehouse.",
    proof: "Staged and processed policy and claims data before loading into Redshift at DXC.",
    tags: ["Object store", "Staging"] },
  { id: "glue", name: "AWS Glue", category: "cloud", level: 84, years: 2,
    blurb: "Serverless ETL and the data catalog that stops a lake becoming undiscoverable.",
    proof: "Processing policy and claims data ahead of Redshift, lowering warehouse cost by reducing what needed to sit in the core platform.",
    tags: ["Serverless ETL", "Catalog"] },
  { id: "redshift", name: "Amazon Redshift", category: "cloud", level: 85, years: 2,
    blurb: "Columnar warehouse serving BI. Distribution and sort keys are where the performance conversation actually happens.",
    proof: "Warehouse behind Tableau dashboards covering trading volume and settlement trends.",
    tags: ["Columnar", "Warehouse"] },
  { id: "athena", name: "Amazon Athena", category: "cloud", level: 78, years: 2,
    blurb: "Query S3 in place with SQL. Right when the question is occasional and loading the data into a warehouse would cost more than the answer is worth.",
    proof: "Ad-hoc analysis over staged data in AWS engagements.",
    tags: ["Query-in-place", "Ad hoc"] },
  { id: "lambda", name: "AWS Lambda", category: "cloud", level: 76, years: 2,
    blurb: "Serverless glue: the small function that runs on a trigger and does the thing no product feature covers.",
    proof: "Event-driven automation within AWS data workflows.",
    tags: ["Serverless", "Triggers"] },
  { id: "rds", name: "Amazon RDS", category: "cloud", level: 78, years: 2,
    blurb: "Managed relational databases as an operational source for reporting.",
    proof: "Source system connectivity in AWS-based reporting.",
    tags: ["Managed", "OLTP source"] },

  /* ------------------------------------------------------------- Big Data */
  { id: "databricks", name: "Databricks", category: "bigdata", level: 88, years: 2,
    blurb: "Lakehouse compute for datasets too large or too messy to shape inside Power Query. Prep at scale, land clean, model fast.",
    proof: "Notebooks processing large transactional datasets (sales orders, inventory movements) before they reach Power BI models, keeping refresh times stable as volumes grew.",
    tags: ["Lakehouse", "Notebooks", "Scale"], link: "https://learn.microsoft.com/azure/databricks/" },
  { id: "pyspark", name: "PySpark", category: "bigdata", level: 85, years: 2,
    blurb: "Distributed transformation in Python. Where a BI tool would time out, this aggregates first and hands BI something it can actually render.",
    proof: "Processed large transaction datasets into aggregated tables for BI consumption, reducing load on the reporting layer and keeping dashboards responsive at peak usage.",
    tags: ["Distributed", "Aggregation"],
    snippet: { lang: "python", code: `from pyspark.sql import functions as F\n\ndaily = (\n    spark.table("silver.transactions")\n         .filter(F.col("status") == "SETTLED")\n         .groupBy("trade_date", "portfolio_id")\n         .agg(\n             F.sum("notional").alias("notional"),\n             F.countDistinct("trade_id").alias("trades"),\n         )\n)\n\n# aggregate in Spark, not in the BI layer\ndaily.write.mode("overwrite").saveAsTable("gold.daily_portfolio")` } },
  { id: "spark-sql", name: "Spark SQL", category: "bigdata", level: 84, years: 2,
    blurb: "SQL over distributed data, which keeps the logic readable to analysts who will never open a notebook.",
    proof: "Aggregation logic supporting BI-ready tables.",
    tags: ["SQL", "Distributed"] },
  { id: "delta-lake", name: "Delta Lake", category: "bigdata", level: 82, years: 2,
    blurb: "ACID transactions, schema enforcement and time travel on the lake. It is what makes a lakehouse trustworthy enough to report from.",
    proof: "Storage format underpinning Databricks processing for BI models.",
    tags: ["ACID", "Time travel"] },
  { id: "spark", name: "Apache Spark", category: "bigdata", level: 83, years: 2,
    blurb: "The engine under all of the above. Understanding partitions and shuffles is the difference between a job that finishes and one that crawls.",
    proof: "Large-scale data processing across both cloud platforms.",
    tags: ["Partitions", "Shuffles"] },

  /* --------------------------------------------------- Databases & Warehouse */
  { id: "sql-server", name: "SQL Server (T-SQL)", category: "data", level: 94, years: 2,
    blurb: "The workhorse. Window functions, CTEs and set-based thinking, plus reading an execution plan so a slow report gets fixed at the source instead of patched in DAX.",
    proof: "Stored procedures and queries consolidating data from multiple distribution systems, replacing manual spreadsheet pulls that delayed reporting by days each week.",
    tags: ["CTE", "Windows", "Stored procs"],
    snippet: { lang: "sql", code: `WITH Ranked AS (\n    SELECT\n        LaneId,\n        ShipmentId,\n        DeliveredOn,\n        ROW_NUMBER() OVER (\n            PARTITION BY LaneId\n            ORDER BY DeliveredOn DESC\n        ) AS rn\n    FROM dbo.Shipment\n    WHERE Status = 'Delivered'\n)\nSELECT LaneId, ShipmentId, DeliveredOn\nFROM Ranked\nWHERE rn = 1;   -- latest delivery per lane` } },
  { id: "oracle", name: "Oracle", category: "data", level: 78, years: 2,
    blurb: "Enterprise relational source, common in established finance and insurance estates and rarely going anywhere quickly.",
    proof: "Source system in enterprise reporting environments.",
    tags: ["Enterprise", "PL/SQL"] },
  { id: "snowflake", name: "Snowflake", category: "data", level: 80, years: 2,
    blurb: "Cloud warehouse source. Matters most when choosing a storage mode, since Import, DirectQuery and composite each suit a different workload.",
    proof: "Warehouse-backed enterprise reporting.",
    tags: ["Warehouse", "Storage mode"] },
  { id: "postgres", name: "PostgreSQL", category: "data", level: 80, years: 2,
    blurb: "Open-source relational source, frequently the operational database behind an application feeding reporting.",
    proof: "Operational source in BI integrations.",
    tags: ["Open source", "OLTP"] },
  { id: "bigquery", name: "Google BigQuery", category: "data", level: 84, years: 2,
    blurb: "Serverless warehouse. Partitioning and clustering are what keep both the query fast and the bill sane.",
    proof: "Connected Power BI to BigQuery and SQL Server to consolidate data across multiple distribution systems at NextGen IT Solutions.",
    tags: ["Serverless", "Partitioning"] },

  /* ------------------------------------------------------------------- ETL */
  { id: "ssis", name: "SSIS", category: "etl", level: 86, years: 2,
    blurb: "Enterprise scheduled ETL packages for movements that belong in a proper pipeline rather than inside a dataset refresh.",
    proof: "Automated daily loads keeping policy administration systems and the enterprise data warehouse in step, removing a manual step that had caused overnight reporting failures.",
    tags: ["Packages", "Scheduled"] },
  { id: "alteryx", name: "Alteryx", category: "etl", level: 76, years: 2,
    blurb: "Low-code analytics workflows. Useful where analysts own the preparation and handing them a notebook would stop the work.",
    proof: "Data preparation workflows supporting analytics delivery.",
    tags: ["Low-code", "Analyst-owned"] },
  { id: "rest-apis", name: "REST APIs", category: "etl", level: 88, years: 2,
    blurb: "Pagination, auth, throttling and retry. A great deal of enterprise data arrives over HTTP and it never arrives in the shape you want.",
    proof: "Integration of market data feeds and CRM platforms into reporting pipelines.",
    tags: ["Auth", "Pagination", "Retry"] },
  { id: "stored-proc-etl", name: "Stored Procedure ETL", category: "etl", level: 90, years: 2,
    blurb: "Transformation that lives in the database, close to the data and version-controlled like any other code. Often the fastest path when the source is already relational.",
    proof: "SQL stored procedures feeding client-facing portfolio and distribution reporting.",
    tags: ["T-SQL", "In-database"] },

  /* ------------------------------------------------------------------ Code */
  { id: "python", name: "Python", category: "code", level: 85, years: 2,
    blurb: "The general-purpose tool for everything BI products have no button for: reshaping awkward feeds, validating loads, automating the repetitive.",
    proof: "Data processing and automation across Databricks and cloud workflows.",
    tags: ["Automation", "Processing"] },
  { id: "pandas", name: "Pandas", category: "code", level: 84, years: 2,
    blurb: "In-memory dataframes for validation, reconciliation and the analysis that happens before anything becomes a dashboard.",
    proof: "Data validation and preparation supporting reporting delivery.",
    tags: ["Dataframes", "Validation"] },
  { id: "numpy", name: "NumPy", category: "code", level: 78, years: 2,
    blurb: "Numerical computation underneath the analysis layer, particularly for variance and forecasting work.",
    proof: "Quantitative preparation supporting financial reporting.",
    tags: ["Numerical", "Vectorised"] },
  { id: "powershell", name: "PowerShell", category: "code", level: 86, years: 2,
    blurb: "Scripted Windows and Power BI administration: bulk operations, refresh triggers, permission audits and release tasks nobody should do by hand.",
    proof: "Administrative and deployment automation.",
    tags: ["Automation", "Admin"],
    snippet: { lang: "powershell", code: `Connect-PowerBIServiceAccount\n\nGet-PowerBIWorkspace -Scope Organization -All |\n    Where-Object { $_.IsOnDedicatedCapacity -eq $false } |\n    ForEach-Object {\n        [PSCustomObject]@{\n            Workspace = $_.Name\n            Users     = $_.Users.Count\n            State     = $_.State\n        }\n    } | Export-Csv .\\workspace-audit.csv -NoTypeInformation\n\n# tenant-wide audit in seconds, not an afternoon` } },
  { id: "bash", name: "Bash", category: "code", level: 76, years: 2,
    blurb: "Shell scripting for job orchestration, file handling and the glue around scheduled processing on Linux hosts.",
    proof: "Automation supporting data processing workflows.",
    tags: ["Shell", "Scheduling"] },

  /* ---------------------------------------------------------------- Domain */
  { id: "pnl", name: "P&L Reporting", category: "domain", level: 88, years: 2,
    blurb: "Profit and loss structure, cost allocation and the margin questions leadership actually asks. Knowing the statement means the requirement needs less translation.",
    proof: "Margin performance reporting by customer segment and product category for a commercial team.",
    tags: ["Finance", "Margin"] },
  { id: "variance", name: "Variance Analysis", category: "domain", level: 88, years: 2,
    blurb: "Actual against budget and forecast, and more usefully, why the gap exists rather than just how large it is.",
    proof: "Performance reporting across financial and operational engagements.",
    tags: ["Budget", "Actuals"] },
  { id: "forecasting", name: "Forecasting", category: "domain", level: 82, years: 2,
    blurb: "Forward-looking reporting and the scenario framing that makes a projection useful rather than decorative.",
    proof: "Scenario and projection reporting for portfolio and operations stakeholders.",
    tags: ["Projection", "Scenario"] },
  { id: "portfolio", name: "Portfolio Reporting", category: "domain", level: 88, years: 2,
    blurb: "Portfolio performance, asset allocation and client profitability, presented so an advisor can use it in front of a client.",
    proof: "Wealth management reporting for financial services advisors at Appworks.",
    tags: ["Wealth", "Allocation"] },
  { id: "risk-compliance", name: "Risk & Compliance", category: "domain", level: 85, years: 2,
    blurb: "Reporting that has to survive an audit: traceable numbers, evidence a click away, and access restricted to the people entitled to it.",
    proof: "Drill-through reporting used in compliance and audit reviews, and RLS satisfying internal audit requirements.",
    tags: ["Audit", "Traceability"] },
  { id: "supply-chain", name: "Supply Chain Analytics", category: "domain", level: 88, years: 2,
    blurb: "Distribution networks, lanes, carriers and service levels. Operations managers need the metric they can act on today, not a quarterly summary.",
    proof: "NAPA Supply Chain dashboards covering transportation cost, service levels and inventory performance.",
    tags: ["Distribution", "Service levels"] },
  { id: "inventory", name: "Inventory Management", category: "domain", level: 86, years: 2,
    blurb: "Inventory turns, movements and availability, tied back to the cost of holding the wrong thing in the wrong place.",
    proof: "Inventory performance reporting giving operations managers daily visibility into distribution costs.",
    tags: ["Turns", "Availability"] },
  { id: "transport-cost", name: "Transportation Cost Analysis", category: "domain", level: 86, years: 2,
    blurb: "Cost per shipment and lane economics, which is where routing decisions either save money or quietly lose it.",
    proof: "Measures that let supply chain leadership identify underperforming lanes and adjust routing decisions.",
    tags: ["Cost per shipment", "Lanes"] },
  { id: "claims", name: "Claims Processing", category: "domain", level: 88, years: 2,
    blurb: "Claim lifecycle, backlog, turnaround and service level adherence, reported at the cadence a call centre manager actually works to.",
    proof: "Daily visibility into backlog, turnaround times and service level adherence for a global insurance provider.",
    tags: ["Insurance", "Backlog", "SLA"] },
  { id: "premiums", name: "Premium Collections", category: "domain", level: 85, years: 2,
    blurb: "Collection performance and the operational reporting around what has been billed, received and chased.",
    proof: "Premium collection reporting at DXC.",
    tags: ["Insurance", "Collections"] },
  { id: "fraud", name: "Fraud Detection", category: "domain", level: 82, years: 2,
    blurb: "Surfacing unusual patterns against historical behaviour so suspicious activity gets reviewed before money goes out rather than after.",
    proof: "Contributed to a fraud detection dashboard flagging unusual claim patterns, helping catch suspicious claims earlier and reduce fraudulent payouts.",
    tags: ["Anomaly", "Historical patterns"] },
  { id: "policy-admin", name: "Policy Administration", category: "domain", level: 84, years: 2,
    blurb: "The systems of record behind insurance operations, and the integration realities of reporting from them.",
    proof: "Automated loads between policy administration systems and the enterprise data warehouse.",
    tags: ["Insurance", "Systems of record"] },
  { id: "aml-kyc", name: "AML / KYC", category: "domain", level: 78, years: 2,
    blurb: "Anti-money-laundering and know-your-customer obligations, and what they demand of reporting evidence and retention.",
    proof: "Regulatory context in financial services reporting.",
    tags: ["Regulatory", "Financial crime"] },
  { id: "sox", name: "SOX", category: "domain", level: 78, years: 2,
    blurb: "Controls, segregation of duties and the audit trail. It shapes who may see what and how a number is proven.",
    proof: "Controls context behind access design and audit-facing reporting.",
    tags: ["Controls", "Audit trail"] },
  { id: "ifrs", name: "IFRS", category: "domain", level: 74, years: 2,
    blurb: "International reporting standards, and the definitional care they require before a measure is written.",
    proof: "Reporting standards context in financial and insurance engagements.",
    tags: ["Standards", "Definitions"] },

  /* ----------------------------------------------------------------- Tools */
  { id: "jira", name: "Jira", category: "tools", level: 88, years: 2,
    blurb: "Backlog, sprints and the paper trail of why something was built the way it was.",
    proof: "Delivery tracking across all three roles.",
    tags: ["Backlog", "Sprints"] },
  { id: "git", name: "Git", category: "tools", level: 86, years: 2,
    blurb: "BI artifacts are source code and deserve branches, history and review like anything else.",
    proof: "Version control for BI and ETL assets.",
    tags: ["Branches", "History"] },
  { id: "github", name: "GitHub", category: "tools", level: 85, years: 2,
    blurb: "Hosted repositories, pull requests and the review conversation that catches things before production does.",
    proof: "Collaboration and code review on BI assets.",
    tags: ["PRs", "Review"] },
  { id: "bitbucket", name: "Bitbucket", category: "tools", level: 78, years: 2,
    blurb: "The same discipline in the Atlassian estate, which is where a lot of enterprise BI work actually lives.",
    proof: "Source control in Atlassian-based client environments.",
    tags: ["Atlassian", "Repos"] },
  { id: "azure-devops", name: "Azure DevOps", category: "tools", level: 88, years: 2,
    blurb: "Repos, boards and pipelines in one place, which keeps the build and the backlog honest with each other.",
    proof: "Delivery workflow for BI artifacts.",
    tags: ["CI/CD", "Boards"] },
  { id: "agile", name: "Agile / Scrum", category: "tools", level: 91, years: 2,
    blurb: "Sprint delivery, refinement and demos. BI depends on a short feedback loop: something rough in week one beats something polished in week eight.",
    proof: "Sprint-based delivery across all three roles.",
    tags: ["Sprints", "Feedback loop"] },
  { id: "stakeholder", name: "Stakeholder Management", category: "tools", level: 93, years: 2,
    blurb: "Requirements arrive as frustration, not specifications. The work is asking why until the actual decision is on the table, then building for that.",
    proof: "Translated reporting requests into technical specifications, reducing back-and-forth and rework on delivered dashboards.",
    tags: ["Requirements", "Training", "Go-live"] },
];

/* -------------------------------------------------------------- EXPERIENCE */
export type Job = {
  id: string; company: string; short: string; role: string; location: string;
  start: string; end: string; period: string; duration: string; current?: boolean;
  domain: string; accent: string; initials: string; headline: string;
  thread: { from: "them" | "me"; text: string; time: string; kind?: "text" | "metric" | "stack" }[];
  bullets: string[];
  stack: string[];
};

export const jobs: Job[] = [
  {
    id: "nextgen",
    company: "NextGen IT Solutions",
    short: "NextGen",
    role: "Power BI Developer",
    location: "Ashburn, VA",
    start: "2026-02", end: "present",
    period: "Feb 2026 – Present",
    duration: "Current",
    current: true,
    domain: "NAPA Supply Chain · Distribution · Pricing Analytics",
    accent: "var(--accent)",
    initials: "NG",
    headline: "Operational visibility across rental, service and equipment sales, and the supply chain that moves it all.",
    thread: [
      { from: "them", text: "Our distribution data sits in several systems. Getting a weekly picture means someone pulling spreadsheets for days, and by the time it lands it's already stale.", time: "09:12" },
      { from: "me", text: "Then the spreadsheet is the problem, not the report. Let me connect Power BI directly to BigQuery and SQL Server and consolidate it at the source.", time: "09:15" },
      { from: "me", text: "For NAPA Supply Chain specifically: transportation cost, service levels and inventory performance on one page, refreshed daily.", time: "09:17", kind: "stack" },
      { from: "them", text: "Operations wants to know which lanes are costing us money.", time: "09:24" },
      { from: "me", text: "DAX measures for cost per shipment, on-time delivery and inventory turns. Leadership can see the underperforming lanes and adjust routing directly.", time: "09:26", kind: "metric" },
      { from: "them", text: "Regional managers shouldn't see each other's numbers. Audit has asked about it.", time: "09:33" },
      { from: "me", text: "Row-level security handles that. Each manager sees only their own distribution data, which satisfies audit and lets us open self-service up much wider.", time: "09:35" },
      { from: "them", text: "And the Excel reports people still email around?", time: "09:41" },
      { from: "me", text: "Migrated to Power BI Service with scheduled refresh. That ends the situation where two teams quote different numbers for the same period.", time: "09:43", kind: "metric" },
    ],
    bullets: [
      "Developed Power BI dashboards and reports that provide operational visibility into rental, service, and equipment sales performance.",
      "Built Power BI dashboards for the NAPA Supply Chain team covering transportation cost, service levels, and inventory performance, giving operations managers daily visibility into the metrics they use to control distribution costs.",
      "Connected Power BI to Google BigQuery and SQL Server to consolidate data from multiple distribution systems, replacing manual spreadsheet pulls that had delayed reporting by several days each week.",
      "Wrote DAX measures for cost per shipment, on-time delivery rates, and inventory turns, allowing supply chain leadership to identify underperforming lanes and adjust routing decisions.",
      "Designed dashboards for pricing analytics that helped the commercial team track margin performance by customer segment and product category, supporting GPC's strategy to grow digital commercial channels.",
      "Implemented Row-Level Security so regional and business unit managers only see their own distribution data, which satisfied internal audit requirements and enabled broader self-service adoption.",
      "Migrated legacy Excel-based operational reports to Power BI Service with scheduled refresh, eliminating version control problems where different teams were reporting inconsistent numbers for the same period.",
      "Supported Databricks notebooks that process large transactional datasets (sales orders, inventory movements) before they reach Power BI models, keeping dashboard refresh times stable as data volumes grew.",
      "Applied Star Schema design and incremental refresh, improving report performance and reducing complaints about slow dashboards during month-end reporting cycles.",
    ],
    stack: ["Power BI", "Google BigQuery", "SQL Server", "Databricks", "DAX", "Star Schema", "Incremental Refresh", "RLS", "Power BI Service"],
  },
  {
    id: "appworks",
    company: "Appworks",
    short: "Appworks",
    role: "Power BI Developer",
    location: "McAllen, TX",
    start: "2025-02", end: "2026-01",
    period: "Feb 2025 – Jan 2026",
    duration: "1 yr",
    domain: "Financial Services · Wealth Management · Portfolio Reporting",
    accent: "var(--cyan)",
    initials: "AW",
    headline: "Portfolio performance, asset allocation and client profitability for wealth management advisors.",
    thread: [
      { from: "them", text: "Our advisors need portfolio performance, allocation and client profitability in one place. Right now it's assembled by hand and errors are reaching client-facing reports.", time: "14:02" },
      { from: "me", text: "Anything assembled by hand will keep producing errors. Let me build proper ETL with Azure Data Factory and stored procedures across the core banking systems, market feeds and CRM.", time: "14:05" },
      { from: "me", text: "Power BI for the advisory reporting, Tableau for the operations side on trading volume and settlement trends off S3 and Redshift.", time: "14:07", kind: "stack" },
      { from: "them", text: "Settlement delays get spotted far too late in the cycle.", time: "14:14" },
      { from: "me", text: "That's a visibility problem. Once the settlement data is in the dashboard daily, operations catch the delays early instead of at reconciliation.", time: "14:16", kind: "metric" },
      { from: "them", text: "Advisors want to show clients what happens if the market moves.", time: "14:22" },
      { from: "me", text: "What-If scenario dashboards. They model returns under different conditions live, so the client conversation runs on defensible numbers rather than a static slide.", time: "14:24" },
      { from: "them", text: "Compliance keeps asking us for transaction-level evidence.", time: "14:31" },
      { from: "me", text: "Drill-through reports and custom tooltips down to the transaction. Analysts stop hunting for supporting evidence during regulatory inquiries.", time: "14:33" },
      { from: "them", text: "Honestly, the dashboards are also just slow.", time: "14:40" },
      { from: "me", text: "Tuned the SQL and the models. Around 15 seconds down to under 5, and daily active usage across the advisory team went up once it stopped being painful to open.", time: "14:42", kind: "metric" },
    ],
    bullets: [
      "Delivered Power BI and Tableau reporting for a financial services client engagement focused on portfolio performance, asset allocation, and client profitability for wealth management advisors.",
      "Built ETL pipelines with Azure Data Factory and SQL stored procedures to pull data from core banking systems, market data feeds, and CRM platforms, replacing a manual process that had introduced errors into client-facing reports.",
      "Integrated AWS S3 and Amazon Redshift as data sources for Tableau dashboards covering trading volume and settlement trends, helping operations teams spot settlement delays earlier in the processing cycle.",
      "Used Databricks with PySpark to process large transaction datasets and produce aggregated tables for BI consumption, reducing load on the reporting layer and keeping dashboards responsive during peak usage.",
      "Created What-If scenario dashboards that let portfolio managers model returns under different market conditions, supporting client conversations with defensible numbers rather than static presentation slides.",
      "Built drill-through reports and custom tooltips for transaction-level detail used in compliance and audit reviews, shortening the time analysts spent pulling supporting evidence for regulatory inquiries.",
      "Tuned SQL queries and Power BI models, reducing dashboard load times from around 15 seconds to under 5 seconds, which increased daily active usage across the advisory team.",
      "Worked directly with business stakeholders to translate reporting requests into technical specifications, reducing back-and-forth and rework on delivered dashboards.",
    ],
    stack: ["Power BI", "Tableau", "Azure Data Factory", "AWS S3", "Redshift", "Databricks", "PySpark", "T-SQL", "What-If", "Drill-through"],
  },
  {
    id: "dxc",
    company: "DXC Technology",
    short: "DXC",
    role: "Software Developer",
    location: "Bangalore, India",
    start: "2022-05", end: "2022-09",
    period: "May 2022 – Sep 2022",
    duration: "5 mos",
    domain: "Insurance · Claims · Premium Collections · Fraud Detection",
    accent: "var(--violet)",
    initials: "DX",
    headline: "Claims, premiums and operational performance for a global insurance provider.",
    thread: [
      { from: "them", text: "Our call centre managers have no daily picture of claims backlog or turnaround. They find out they've missed service levels at the end of the month.", time: "10:40" },
      { from: "me", text: "Then the reporting cadence is wrong. Power BI and SSRS covering claims processing, premium collections and operational performance, delivered daily.", time: "10:44" },
      { from: "me", text: "Backlog, turnaround times and service level adherence on one view, so they can act on it the same day.", time: "10:46", kind: "metric" },
      { from: "them", text: "Overnight loads keep failing and someone has to fix it manually each morning.", time: "10:53" },
      { from: "me", text: "Automated the daily loads with SSIS between policy administration and the warehouse. That manual step was the cause of the failures, so it goes.", time: "10:55" },
      { from: "them", text: "Underwriting and claims leadership want loss ratios and adjuster productivity too.", time: "11:02" },
      { from: "me", text: "Tableau dashboards for loss ratios, claim cycle times and adjuster productivity. Leadership can see the underperforming regions and move staffing.", time: "11:04", kind: "stack" },
      { from: "them", text: "And the warehouse is getting expensive.", time: "11:10" },
      { from: "me", text: "Staging policy and claims data through AWS Glue and S3 before Redshift means less has to sit in the core platform, which brings the cost down.", time: "11:12" },
      { from: "them", text: "Fraud is the one that actually costs us.", time: "11:19" },
      { from: "me", text: "Contributed to a fraud detection dashboard flagging unusual claim patterns against historical data. Suspicious claims surface earlier in review, before payout.", time: "11:21", kind: "metric" },
    ],
    bullets: [
      "Developed Power BI and SSRS reports for a global insurance provider covering claims processing, premium collections, and operational performance, giving call center managers daily visibility into backlog, turnaround times, and service level adherence.",
      "Automated daily data loads with SSIS so data stayed accurate between policy administration systems and the enterprise data warehouse, removing a manual step that had caused overnight reporting failures.",
      "Built Tableau dashboards for underwriting and claims teams to track loss ratios, claim cycle times, and adjuster productivity, helping leadership identify underperforming regions and adjust staffing.",
      "Worked with AWS Glue and S3 to stage and process policy and claims data before loading into Redshift, which lowered warehouse costs by reducing what needed to be stored in the core platform.",
      "Contributed to a Fraud Detection Dashboard that flagged unusual claim patterns using historical data analysis, helping the client catch suspicious claims earlier in the review process and reduce payouts on fraudulent claims.",
      "Partnered with operations leadership to translate business objectives into measurable KPIs and management dashboards, ensuring reports matched how the business measured performance.",
      "Maintained data dictionaries, documentation, and report standards for all BI assets, which made onboarding new analysts faster and reduced dependency on individual team members.",
      "Supported month-end and quarter-end reporting cycles, ensuring critical regulatory and operational reports were delivered on time without last minute firefighting.",
    ],
    stack: ["Power BI", "SSRS", "Tableau", "SSIS", "AWS Glue", "AWS S3", "Redshift", "SQL Server", "Fraud Analytics"],
  },
];

/* --------------------------------------------------------------- EDUCATION */
export const education = [
  {
    id: "rowan",
    degree: "Bachelor of Science",
    field: "Computer Science",
    school: "Rowan University",
    abbr: "",
    location: "Glassboro, NJ",
    period: "Graduated December 2024",
    note: "Merit-based International Credit Transfer Scholarship recipient. Coursework in data structures and algorithms, databases, operating systems, distributed systems, and AI and ML — plus the Machine Learning Specialization from Stanford Online.",
    accent: "var(--accent)",
  },
];

/* ---------------------------------------------------------- CERTIFICATIONS */
export const certifications = [
  { id: "aws-dev",  name: "AWS Certified Developer",                issuer: "Amazon Web Services", accent: "var(--accent)" },
  { id: "ibm-edt",  name: "IBM Enterprise Design Thinking Practitioner", issuer: "IBM",             accent: "var(--cyan)" },
  { id: "ai-fluency", name: "AI Fluency for Business",              issuer: "Anthropic",           accent: "var(--violet)" },
];

/* ------------------------------------------------------------- LEADERSHIP */
export const leadership = [
  {
    id: "acm",
    org: "ACM (Association for Computing Machinery)",
    where: "Rowan University",
    role: "Tech Coordinator",
    body: "Organized 6 hackathons and 12 tech talks on AI, cloud computing and software architecture, attracting around 300 students and securing $15K in sponsorships from regional tech companies.",
    accent: "var(--accent)",
  },
  {
    id: "gdsc",
    org: "Google Developer Student Club",
    where: "LPU",
    role: "Graphic Designer & Team Member (AI & Cloud)",
    body: "Led AI-focused workshops on machine learning fundamentals and Google Cloud Platform, training over 150 students and increasing club membership by 40%.",
    accent: "var(--cyan)",
  },
  {
    id: "orator",
    org: "Orator Student Club",
    where: "LPU",
    role: "Public Speaker & Event Coordinator",
    body: "Hosted 8 public speaking workshops and debate competitions, growing event participation from 30 to over 120 students.",
    accent: "var(--violet)",
  },
];

/* --------------------------------------------------------------- PROJECTS */
export type Project = {
  id: string; name: string; kind: string; repo: string; url: string;
  stack: string[]; accent: string; summary: string; bullets: string[];
};

export const projects: Project[] = [
  {
    id: "hag",
    name: "Hardware-Aware Gateway",
    kind: "GPU kernels · LLM inference",
    repo: "github.com/Rahu378/hardware-aware-gateway",
    url: "https://github.com/Rahu378/hardware-aware-gateway",
    stack: ["Python", "Triton", "Metal (MSL/MLX)", "PyTorch", "CUDA"],
    accent: "var(--accent)",
    summary: "Custom fused kernels and runtime dispatch for LLM inference, tuned per hardware target.",
    bullets: [
      "Engineered custom fused Triton (CUDA) and Metal (Apple Silicon) kernels (rmsnorm_residual, swiglu), eliminating intermediate memory traffic to achieve up to 5.75x prefill speedups and sustaining 252 GB/s (79% datasheet peak) on NVIDIA T4.",
      "Conducted roofline profiling on LLM decode workloads, identifying a 54% CPU dispatch overhead (6,130 dispatches/token); implemented CUDA graph capture to eliminate dispatch bottlenecks, accelerating decode throughput by 1.72x.",
      "Designed dynamic runtime dispatch (hag.calibrate()) based on empirical crossover benchmarks to automatically route single-row decodes to PyTorch eager mode, preventing kernel launch overhead regressions.",
    ],
  },
  {
    id: "gallery",
    name: "The Gallery",
    kind: "Agentic systems · Real-time",
    repo: "github.com/Rahu378/the-gallery",
    url: "https://github.com/Rahu378/the-gallery",
    stack: ["Python", "Gemini 2.5", "Google ADK", "FastAPI", "WebSockets", "Grafana"],
    accent: "var(--cyan)",
    summary: "An agentic F1 world feed director that decides which on-track story deserves the broadcast.",
    bullets: [
      "Architected an agentic F1 world feed director using a 10 Hz deterministic Python telemetry scorer and Gemini 2.5 Flash via Google ADK, capturing 50% of live passes (vs. 1.8% baseline) at $0.0026 per decision.",
      "Built a real-time multimodal audio engine using Gemini multi-speaker TTS and Web Audio API synthesis to dynamically switch between play-by-play and color commentary based on live race events.",
      "Developed a low-latency full-stack architecture featuring FastAPI WebSockets, interactive Three.js 2D/3D track maps, and Grafana Cloud MCP integration for real-time telemetry observability and agent cut tracking.",
    ],
  },
  {
    id: "finsight",
    name: "FinSight Agent",
    kind: "Compliance · AML/OFAC",
    repo: "github.com/Rahu378/finsight-agent",
    url: "https://github.com/Rahu378/finsight-agent",
    stack: ["Python", "LangGraph", "AWS Bedrock", "FastAPI"],
    accent: "var(--violet)",
    summary: "A compliance agent that detects structuring patterns and writes audit-ready reports.",
    bullets: [
      "Built an AML/OFAC compliance agent that detects BSA structuring patterns and generates audit-ready reports for fintech compliance officers.",
      "Achieved 94% precision in detecting suspicious transactions by orchestrating multi-step LLM reasoning and tool-calling workflows with LangGraph.",
    ],
  },
  {
    id: "shadowdb",
    name: "ShadowDB",
    kind: "Infrastructure · Data",
    repo: "github.com/Rahu378/shadowdb",
    url: "https://github.com/Rahu378/shadowdb",
    stack: ["Java", "Netty", "Kafka", "PostgreSQL", "MongoDB", "Prometheus", "Grafana"],
    accent: "var(--mint)",
    summary: "A proxy that forks live production SQL traffic into a shadow environment for risk-free migration testing.",
    bullets: [
      "Engineered a Netty-based database proxy that forks live production SQL traffic to shadow environments, achieving 3ms latency overhead at 50K+ requests/sec for risk-free schema migration testing.",
      "Built Prometheus/Grafana dashboards comparing production vs. shadow query performance, surfacing 12+ performance regressions before production deployment.",
    ],
  },
  {
    id: "text2workflow",
    name: "Text2Workflow",
    kind: "NLP · Workflow engines",
    repo: "github.com/Rahu378/text2workflow",
    url: "https://github.com/Rahu378/text2workflow",
    stack: ["JavaScript", "NLP", "Workflow Engines"],
    accent: "var(--rose)",
    summary: "Plain-English process descriptions turned into validated, exportable swimlane blueprints.",
    bullets: [
      "Developed a natural language workflow engine that converts plain-text process descriptions into validated, exportable swimlane blueprints for business analysts.",
      "Cut workflow design turnaround from hours to under 5 minutes by eliminating manual Step Functions configuration steps.",
    ],
  },
];

/* -------------------------------------------------------------- PRINCIPLES */
export const principles = [
  {
    n: "01",
    title: "Model first, visual last",
    body: "A good-looking report on a bad model is a liability. Grain, relationships and cardinality get decided before a single chart is placed. Star schema and incremental refresh are why month-end stopped generating complaints about slow dashboards.",
    icon: "Boxes",
  },
  {
    n: "02",
    title: "Measure, don't guess",
    body: "Profile before optimizing. On the wealth management engagement that meant tuning both the SQL and the model, taking load times from around 15 seconds to under 5. Every improvement I claim has a before and an after attached.",
    icon: "Gauge",
  },
  {
    n: "03",
    title: "Kill the spreadsheet",
    body: "Manual pulls delayed reporting by days each week and quietly introduced errors into client-facing output. Connecting BI straight to the source and scheduling the refresh removes both problems at once.",
    icon: "Workflow",
  },
  {
    n: "04",
    title: "One version of the truth",
    body: "Different teams reporting different numbers for the same period is a governance failure, not a data failure. Row-level security and a single published dataset is what makes self-service safe to widen.",
    icon: "ShieldCheck",
  },
  {
    n: "05",
    title: "The stakeholder is the spec",
    body: "Requirements arrive as frustration rather than specifications. Asking why until the actual decision is on the table cuts the back-and-forth and the rework on whatever gets delivered.",
    icon: "Users",
  },
  {
    n: "06",
    title: "Hand it over cleanly",
    body: "Data dictionaries, documentation and report standards for every BI asset. It makes onboarding new analysts faster and removes the dependency on any one person, including me.",
    icon: "FileText",
  },
];

/* ----------------------------------------------------------- DEMO DATASETS */
/** Dashboard load time before and after tuning on the advisory engagement. */
export const demoTrend = [
  { m: "Jan", before: 14.8, after: 14.8, users: 42 },
  { m: "Feb", before: 15.1, after: 13.2, users: 54 },
  { m: "Mar", before: 15.4, after: 11.0, users: 71 },
  { m: "Apr", before: 15.9, after: 9.1, users: 92 },
  { m: "May", before: 16.2, after: 7.4, users: 118 },
  { m: "Jun", before: 16.6, after: 6.2, users: 141 },
  { m: "Jul", before: 16.9, after: 5.3, users: 159 },
  { m: "Aug", before: 17.2, after: 4.9, users: 174 },
  { m: "Sep", before: 17.5, after: 4.6, users: 186 },
];

export const domainSplit = [
  { name: "Financial Services", value: 32, color: "var(--accent)" },
  { name: "Insurance", value: 28, color: "var(--cyan)" },
  { name: "Supply Chain", value: 26, color: "var(--violet)" },
  { name: "Pricing & Commercial", value: 14, color: "var(--mint)" },
];

export const capabilityRadar = [
  { axis: "BI & Viz", v: 95 },
  { axis: "Modeling / DAX", v: 96 },
  { axis: "Cloud", v: 88 },
  { axis: "Big Data", v: 85 },
  { axis: "Databases", v: 92 },
  { axis: "ETL", v: 90 },
  { axis: "Domain", v: 87 },
];

/** Reporting latency, manual spreadsheet process through to scheduled refresh. */
export const sprintSavings = [
  { name: "Manual pulls", hours: 72, fill: "var(--rose)" },
  { name: "Part-automated", hours: 24, fill: "var(--violet)" },
  { name: "Scheduled refresh", hours: 1, fill: "var(--mint)" },
];
