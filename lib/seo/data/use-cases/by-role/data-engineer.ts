import type { UseCase } from '../../types'

export const dataEngineerResume: UseCase = {
  slug: 'data-engineer-resume',
  category: 'resume-by-role',
  title: 'Data Engineer Resume Guide',
  metaTitle: 'Data Engineer Resume: Expert Guide [2025]',
  metaDescription:
    'Craft a data engineer resume that highlights pipeline architecture, cloud data warehousing, and orchestration expertise. Covers skills formatting, project impact, and ATS optimization.',
  subtitle:
    'Showcase your ability to build reliable, scalable data infrastructure that powers analytics and machine learning across the organization.',
  readTimeMinutes: 9,
  keyTakeaways: [
    'Organize your skills into clear tiers: languages (Python, SQL, Scala), orchestration (Airflow, Dagster, Prefect), cloud platforms (AWS, GCP, Azure), and warehousing (Snowflake, BigQuery, Redshift).',
    'Quantify pipeline performance with concrete metrics — data volume processed, latency reduction, cost savings, and SLA uptime — not just the tools you used.',
    'Highlight data quality and governance work: schema enforcement, data contracts, lineage tracking, and observability frameworks like Great Expectations or Monte Carlo.',
    'Tailor your resume to the sub-discipline: analytics engineering (dbt, Looker), streaming (Kafka, Flink), or platform engineering (Terraform, Kubernetes).',
  ],
  sections: [
    {
      title: 'Organizing Your Technical Skills Stack',
      body: `<p>Data engineering sits at the intersection of software engineering and data infrastructure. A well-structured skills section lets recruiters and hiring managers instantly assess your fit across the modern data stack.</p>
<ul>
  <li><strong>Languages:</strong> Python, SQL, Scala, Java, Bash, Go.</li>
  <li><strong>Orchestration & ETL:</strong> Apache Airflow, dbt, Dagster, Prefect, Luigi, Fivetran, Stitch.</li>
  <li><strong>Streaming & Messaging:</strong> Apache Kafka, Apache Flink, Spark Structured Streaming, AWS Kinesis, Pub/Sub.</li>
  <li><strong>Cloud & Warehousing:</strong> Snowflake, BigQuery, Redshift, Databricks, Delta Lake, Iceberg, S3, GCS.</li>
  <li><strong>Infrastructure & DevOps:</strong> Docker, Kubernetes, Terraform, CI/CD (GitHub Actions, GitLab CI), Datadog, PagerDuty.</li>
</ul>
<p>Resist the urge to list every tool you have ever touched. Hiring managers value depth over breadth — if you list Apache Flink, be prepared to discuss windowing strategies, checkpointing, and exactly-once semantics in your interview. Curate for the target role and mirror the job description's terminology.</p>`,
      tip: 'If the job description mentions "modern data stack," emphasize dbt, Snowflake, Fivetran, and Looker. If it mentions "big data," lean into Spark, Kafka, and Hadoop ecosystem tools.',
    },
    {
      title: 'Quantifying Pipeline Impact and Reliability',
      body: `<p>The most common weakness in data engineer resumes is describing pipelines without explaining <strong>why they mattered</strong>. Every bullet should answer: how much data, how fast, and what did it enable?</p>
<p>Compare these two bullets:</p>
<ul>
  <li><em>Weak:</em> "Built ETL pipelines using Airflow and Python to load data into Snowflake."</li>
  <li><em>Strong:</em> "Architected and deployed 45+ Airflow DAGs processing 2.3TB daily across 12 source systems into Snowflake, reducing data freshness from 24 hours to 45 minutes and enabling real-time dashboards for the executive team."</li>
</ul>
<p>The strong version communicates scale (2.3TB, 12 sources), improvement (24h to 45min), and business value (executive dashboards). It also demonstrates ownership — "architected and deployed" is much stronger than "built."</p>
<p>Other high-impact metrics to include: pipeline uptime and SLA compliance (99.9%), cost optimization ($150K annual savings by migrating from on-prem to BigQuery), data quality improvements (reduced data incidents by 60%), and processing efficiency gains (40% reduction in compute costs through query optimization).</p>`,
    },
    {
      title: 'Showcasing Data Modeling and Architecture Decisions',
      body: `<p>Senior data engineering roles demand more than coding ability — they require architectural thinking. Your resume should demonstrate that you make thoughtful design decisions, not just execute tasks.</p>
<ul>
  <li><strong>Data modeling:</strong> "Designed a dimensional data model (Kimball methodology) for the e-commerce domain spanning 8 fact tables and 22 dimensions, supporting 200+ downstream reports with sub-second query performance."</li>
  <li><strong>Schema design:</strong> "Implemented a medallion architecture (bronze/silver/gold) in Delta Lake, establishing data contracts between 6 engineering teams and reducing cross-team data incidents by 75%."</li>
  <li><strong>Technology selection:</strong> "Evaluated and led migration from Redshift to Snowflake for the analytics warehouse, resulting in 3x query performance improvement and 30% cost reduction through auto-scaling."</li>
  <li><strong>Data governance:</strong> "Established column-level lineage tracking using OpenLineage and Marquez, enabling impact analysis that reduced breaking changes to downstream consumers by 80%."</li>
</ul>
<p>If you have written design documents, RFCs, or architectural decision records, mention that practice. It signals that you think beyond code and communicate your decisions to stakeholders.</p>`,
      tip: 'Use architecture terminology that matches your seniority level. Mid-level engineers "implement" and "build." Senior engineers "architect," "design," and "lead migrations." Staff engineers "define standards," "establish patterns," and "drive platform strategy."',
    },
    {
      title: 'Highlighting Data Quality and Observability',
      body: `<p>Data quality has become a first-class concern in modern data teams, and demonstrating expertise in this area differentiates you from engineers who only focus on moving data from point A to point B.</p>
<ul>
  <li><strong>Testing frameworks:</strong> "Implemented Great Expectations across 120+ datasets with 800+ expectation suites, catching data anomalies before they reached production dashboards."</li>
  <li><strong>Observability:</strong> "Deployed Monte Carlo for automated data observability, reducing mean time to detection for data incidents from 6 hours to 15 minutes."</li>
  <li><strong>Data contracts:</strong> "Established schema contracts between producer and consumer teams using Protobuf and schema registry, eliminating breaking schema changes across 30+ Kafka topics."</li>
  <li><strong>Monitoring and alerting:</strong> "Built custom data freshness and volume monitoring dashboards in Datadog, with PagerDuty integration for critical pipeline SLA breaches."</li>
</ul>
<p>Companies increasingly hire specifically for data quality and reliability engineering. If you have experience building or managing data platforms with strong reliability guarantees, call it out explicitly — it is a rare and valuable skill set.</p>`,
    },
    {
      title: 'Education, Certifications, and Open-Source Contributions',
      body: `<p>Data engineering does not have a single credentialing path the way nursing or law does, which makes it even more important to present your qualifications strategically.</p>
<ul>
  <li><strong>Degrees:</strong> Computer Science, Software Engineering, Information Systems, or Mathematics degrees are most relevant. Place education after experience unless you graduated within the last 2 years.</li>
  <li><strong>Cloud certifications:</strong> AWS Data Analytics Specialty, Google Professional Data Engineer, Azure Data Engineer Associate, and Databricks Data Engineer Associate all carry weight because they demonstrate cloud-specific depth.</li>
  <li><strong>dbt certification:</strong> The dbt Analytics Engineering Certification is increasingly recognized and signals expertise in the analytics engineering workflow.</li>
  <li><strong>Open-source contributions:</strong> Contributions to Airflow, dbt, Spark, Great Expectations, or other data tools demonstrate community engagement and technical depth. List the project, your contribution, and the PR or issue number.</li>
</ul>
<p>Prioritize certifications that match the target company's cloud platform. A Google Professional Data Engineer certification is significantly more valuable when applying to a GCP shop than an AWS one. Research the company's stack before submitting.</p>`,
    },
  ],
  checklist: [
    'Technical skills organized into Languages, Orchestration, Streaming, Cloud/Warehousing, and Infrastructure categories',
    'Every pipeline bullet includes scale (data volume), speed (latency/freshness), and business impact',
    'Data modeling and architecture decisions described with methodology and measurable outcomes',
    'Data quality and observability experience highlighted with specific tools and incident reduction metrics',
    'Cloud certifications listed and matched to the target company platform',
    'Open-source contributions or community involvement included with links',
    'Resume tailored to the sub-discipline: analytics engineering, streaming, or platform engineering',
    'ATS-friendly format with no diagrams, flowcharts, or embedded architecture images',
    'SQL and Python proficiency demonstrated through project outcomes, not just listed as skills',
    'Infrastructure and DevOps experience (Docker, Kubernetes, Terraform, CI/CD) included for platform-oriented roles',
  ],
  commonMistakes: [
    'Describing pipelines as "built ETL in Airflow" without specifying data volume, source count, latency, or business impact — generic bullets get ignored.',
    'Listing every database and tool ever encountered instead of curating for the target role — an unfocused skills section signals a lack of depth.',
    'Focusing exclusively on ETL and ignoring data modeling, data quality, and governance — modern data engineering is far broader than just moving data.',
    'Using "data engineer" and "data analyst" interchangeably — be precise about whether you built infrastructure or consumed it.',
    'Omitting cost optimization work — cloud data warehousing is expensive, and demonstrating cost awareness is a strong differentiator.',
  ],
  relevantFeatures: [
    'aiResumeBuilder',
    'atsOptimization',
    'aiWritingAssistant',
    'pdfExport',
    'multipleTemplates',
  ],
  relatedSlugs: [
    'data-scientist-resume',
    'software-engineer-resume',
    'devops-engineer-resume',
  ],
  updatedAt: '2025-01-15',
}
