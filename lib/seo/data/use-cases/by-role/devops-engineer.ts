import type { UseCase } from '../../types'

export const devopsEngineerResume: UseCase = {
  slug: 'devops-engineer-resume',
  category: 'resume-by-role',
  title: 'DevOps Engineer Resume Guide',
  metaTitle: 'DevOps Engineer Resume: Expert Guide [2025]',
  metaDescription:
    'Craft a DevOps engineer resume that highlights CI/CD expertise, infrastructure-as-code skills, and cloud platform proficiency. Covers automation, monitoring, and SRE best practices.',
  subtitle:
    'Demonstrate your ability to ship reliable infrastructure, automate everything, and keep production running at scale.',
  readTimeMinutes: 9,
  keyTakeaways: [
    'Quantify reliability and velocity improvements — deployment frequency, MTTR reduction, uptime percentages, and cost savings.',
    'List specific tools and platforms (Terraform, Kubernetes, AWS) rather than generic terms like "cloud computing."',
    'Highlight incident management experience and post-mortem culture to show you thrive under pressure.',
    'Showcase the bridge between development and operations by referencing cross-team collaboration and developer experience improvements.',
  ],
  sections: [
    {
      title: 'Highlighting Your CI/CD and Automation Experience',
      body: `<p>DevOps hiring managers want to see that you can <strong>design, build, and maintain automated pipelines</strong> that accelerate software delivery without sacrificing stability. Your experience section should read like a story of increasing automation maturity.</p>
<p>For each role, structure your bullets around the <em>Problem–Automation–Outcome</em> pattern:</p>
<ul>
  <li><strong>Problem:</strong> Identify the bottleneck or manual process — "Deployments required 4 hours of manual steps and a change-advisory-board meeting."</li>
  <li><strong>Automation:</strong> Describe the solution with specific tools — "Built a GitLab CI pipeline with Terraform, Helm, and ArgoCD for GitOps-based deployments."</li>
  <li><strong>Outcome:</strong> Quantify the improvement — "Reduced deployment time to 12 minutes and increased release frequency from bi-weekly to daily."</li>
</ul>
<p>Include metrics from the DORA framework (deployment frequency, lead time for changes, change failure rate, MTTR) whenever possible. These are the industry-standard measures hiring teams use to evaluate DevOps maturity.</p>`,
      tip: 'If your organization did not formally track DORA metrics, estimate them from CI logs or deployment records. Even approximate figures outperform no data.',
    },
    {
      title: 'Structuring Your Infrastructure and Cloud Skills',
      body: `<p>The skills section of a DevOps resume carries more weight than in most roles because hiring managers need to verify platform-specific expertise quickly. Organize your skills into clear, scannable categories:</p>
<ul>
  <li><strong>Cloud Platforms:</strong> AWS (EC2, EKS, Lambda, CloudFormation), GCP (GKE, Cloud Build), Azure (AKS, DevOps Pipelines).</li>
  <li><strong>Infrastructure as Code:</strong> Terraform, Pulumi, Ansible, CloudFormation, Crossplane.</li>
  <li><strong>Containers & Orchestration:</strong> Docker, Kubernetes, Helm, Kustomize, ECS, Nomad.</li>
  <li><strong>CI/CD:</strong> Jenkins, GitHub Actions, GitLab CI, CircleCI, ArgoCD, Spinnaker.</li>
  <li><strong>Monitoring & Observability:</strong> Datadog, Prometheus, Grafana, PagerDuty, ELK Stack, OpenTelemetry.</li>
  <li><strong>Scripting & Languages:</strong> Bash, Python, Go, YAML, HCL.</li>
</ul>
<p>Only list tools you can discuss confidently in an interview. Padding your skills section with tools you used once in a tutorial will backfire during technical screens.</p>`,
      tip: 'Mirror the exact tool names from the job description. If they say "Amazon EKS," list that — not just "Kubernetes."',
    },
    {
      title: 'Demonstrating Reliability and Incident Management',
      body: `<p>Site Reliability Engineering practices are now a core expectation for senior DevOps roles. Dedicate at least two or three bullets across your experience to <strong>reliability work</strong> — this signals operational maturity that separates senior candidates from junior ones.</p>
<p>Effective reliability bullets cover:</p>
<ul>
  <li><strong>SLA/SLO ownership:</strong> "Defined and maintained SLOs for a payment-processing service handling $2M in daily transactions, achieving 99.97% uptime."</li>
  <li><strong>Incident response:</strong> "Led on-call rotation for 40+ microservices; reduced mean time to recovery from 45 minutes to 8 minutes through runbook automation."</li>
  <li><strong>Post-mortem culture:</strong> "Authored 30+ blameless post-mortems and drove implementation of 85% of resulting action items within two sprints."</li>
  <li><strong>Chaos engineering:</strong> "Implemented Chaos Monkey experiments in staging, uncovering 12 single points of failure before they impacted production."</li>
</ul>
<p>If you have experience with error budgets, toil tracking, or capacity planning, include these as well. They demonstrate a strategic, data-driven approach to operations.</p>`,
    },
    {
      title: 'Writing a DevOps-Focused Professional Summary',
      body: `<p>Your professional summary should establish three things in under 40 words: <strong>your experience level, your infrastructure domain, and your defining achievement</strong>.</p>
<p>Example: <em>"DevOps engineer with 5 years of experience building cloud-native infrastructure on AWS. Designed a zero-downtime deployment pipeline serving 10M requests per day and reduced infrastructure costs by 35% through right-sizing and spot instance strategies."</em></p>
<ul>
  <li>Name the primary cloud provider and scale of systems you manage — this is the first filter recruiters apply.</li>
  <li>Mention whether you lean toward platform engineering, SRE, or release engineering if the job description emphasizes one of these.</li>
  <li>Avoid buzzword-heavy summaries like "DevOps evangelist passionate about automation" — they carry zero informational signal.</li>
</ul>
<p>Tailor this section for every application. A company migrating to Kubernetes cares about different strengths than one optimizing an existing serverless architecture.</p>`,
      tip: 'Include a relevant certification (AWS Solutions Architect, CKA, HashiCorp Terraform Associate) in your summary if the job listing mentions it.',
    },
    {
      title: 'Formatting and ATS Considerations for DevOps Resumes',
      body: `<p>DevOps resumes face a unique ATS challenge: many critical keywords contain special characters, slashes, or abbreviations that parsers can misread. Follow these formatting rules to avoid silent rejections:</p>
<ul>
  <li>Write "CI/CD" consistently — don't alternate between "CI/CD," "CICD," and "Continuous Integration." Pick one and use it throughout, but include the long form once.</li>
  <li>Spell out acronyms on first use: "Infrastructure as Code (IaC)," "Site Reliability Engineering (SRE)."</li>
  <li>Use a single-column layout. DevOps resumes with sidebar skill panels frequently break ATS parsing.</li>
  <li>Keep the resume to one page for under 8 years of experience. Two pages are acceptable for senior or staff-level roles with significant scope.</li>
</ul>
<p>Export as PDF and name the file <code>FirstName_LastName_DevOps_Resume.pdf</code>. If you maintain a personal infrastructure blog or public Terraform module registry, include the link in your header alongside GitHub and LinkedIn.</p>`,
    },
  ],
  checklist: [
    'Professional summary references primary cloud platform and years of experience',
    'Skills section organized by category: Cloud, IaC, Containers, CI/CD, Monitoring, Scripting',
    'At least three bullets include DORA-style metrics (deployment frequency, MTTR, change failure rate)',
    'Incident management and on-call experience explicitly mentioned',
    'Terraform, Kubernetes, or other IaC tools demonstrated with quantified outcomes',
    'Relevant certifications (AWS, CKA, Terraform Associate) listed prominently',
    'Infrastructure cost savings or optimization results included',
    'Single-column, ATS-friendly layout exported as PDF',
    'GitHub profile or infrastructure blog linked in the header',
    'No spelling errors in tool names — "Kubernetes" not "Kubernates," "Prometheus" not "Promethius"',
  ],
  commonMistakes: [
    'Listing dozens of tools without context — writing "Terraform" in a skills list is far less compelling than "Managed 200+ Terraform modules across 3 AWS accounts."',
    'Focusing only on tooling and ignoring business impact — hiring managers want to know you reduced downtime or saved money, not just that you used Ansible.',
    'Omitting soft skills like incident communication, cross-team collaboration, and mentoring — senior DevOps roles require strong leadership abilities.',
    'Using a heavily designed template with icons and progress bars that breaks ATS parsing and hides your actual qualifications.',
    'Neglecting to mention security practices (secrets management, vulnerability scanning, compliance automation) which are increasingly expected in DevOps roles.',
  ],
  relevantFeatures: [
    'aiResumeBuilder',
    'atsOptimization',
    'aiWritingAssistant',
    'pdfExport',
    'multipleTemplates',
  ],
  relatedSlugs: [
    'software-engineer-resume',
    'web-developer-resume',
    'data-engineer-resume',
  ],
  updatedAt: '2025-01-15',
}
