import type { UseCase } from '../../types'

export const dataScientistResume: UseCase = {
  slug: 'data-scientist-resume',
  category: 'resume-by-role',
  title: 'Data Scientist Resume Guide',
  metaTitle: 'Data Scientist Resume: Expert Guide [2025]',
  metaDescription:
    'Build a data scientist resume that showcases statistical rigor, ML expertise, and business impact. Covers skills formatting, project highlights, and ATS optimization.',
  subtitle:
    'Translate complex analytical work into a resume that speaks to both technical hiring managers and non-technical recruiters.',
  readTimeMinutes: 10,
  keyTakeaways: [
    'Separate your skills into distinct tiers: statistical methods, ML frameworks, programming languages, and data engineering tools.',
    'Quantify model performance with business outcomes, not just accuracy scores — "increased fraud detection by 23%, saving $4.1M annually" beats "achieved 0.94 AUC."',
    'Include a projects section for Kaggle competitions, published papers, or open-source contributions to demonstrate initiative.',
    'Tailor heavily for the sub-discipline: ML engineering, analytics, NLP, computer vision, or applied research.',
  ],
  sections: [
    {
      title: 'Presenting Technical Skills Effectively',
      body: `<p>Data science spans a wide range of tools and techniques. A well-organized skills section helps recruiters quickly assess your fit and ensures ATS picks up the right keywords.</p>
<ul>
  <li><strong>Languages:</strong> Python, R, SQL, Scala, Julia.</li>
  <li><strong>ML & Statistics:</strong> Scikit-learn, XGBoost, PyTorch, TensorFlow, Bayesian inference, time-series analysis, causal inference.</li>
  <li><strong>Data Engineering:</strong> Spark, Airflow, dbt, BigQuery, Snowflake, Kafka.</li>
  <li><strong>Visualization & BI:</strong> Matplotlib, Plotly, Tableau, Looker, Streamlit.</li>
  <li><strong>MLOps:</strong> MLflow, Weights & Biases, SageMaker, Vertex AI, Docker.</li>
</ul>
<p>Only list tools you can confidently discuss in an interview. Padding your skills section with frameworks you've only read about will backfire during technical screens. Depth on fewer tools is more valuable than breadth across many.</p>`,
      tip: 'If the job description emphasizes "production ML," lean into your MLOps and data engineering skills. If it says "insights and analysis," emphasize statistical methods and visualization.',
    },
    {
      title: 'Translating Model Work into Business Impact',
      body: `<p>The biggest mistake data scientists make on resumes is describing their work in purely technical terms. Hiring managers — even technical ones — want to see that your models <strong>drove decisions and moved metrics</strong>.</p>
<p>Compare these two bullets:</p>
<ul>
  <li><em>Weak:</em> "Built a gradient-boosted classifier for customer churn prediction with 0.91 AUC."</li>
  <li><em>Strong:</em> "Developed a churn prediction model that identified at-risk accounts 30 days earlier, enabling proactive retention campaigns that reduced quarterly churn by 15% ($2.8M saved)."</li>
</ul>
<p>The strong version includes the same technical work but wraps it in business context. It answers: <strong>Who used the model? What action did it enable? What was the dollar impact?</strong></p>
<p>If you work in a research-heavy environment where business metrics are less direct, quantify scientific impact: papers published, citation counts, benchmark improvements, or datasets released.</p>`,
    },
    {
      title: 'Highlighting Research and Publications',
      body: `<p>If you have academic or industry research experience, your resume should make it easy for reviewers to assess the scope and quality of your contributions.</p>
<ul>
  <li>Create a "Selected Publications" section listing 3-5 of your strongest papers in a consistent citation format.</li>
  <li>For each paper, add a one-line plain-English summary of the contribution: "Proposed a novel attention mechanism for low-resource NLP that improved BLEU scores by 8 points."</li>
  <li>Include your Google Scholar profile link and h-index if it strengthens your candidacy.</li>
  <li>If you've given conference talks or workshops, list them under "Presentations" — they demonstrate communication skills.</li>
</ul>
<p>For industry research roles, emphasize work that shipped into production. "Published at NeurIPS and deployed the resulting model into the recommendation pipeline, serving 10M daily users" bridges the gap between research and impact.</p>`,
      tip: 'If you have many publications, create a full publications page on your personal website and link to it. Keep the resume section curated to the most relevant 3-5.',
    },
    {
      title: 'Structuring Projects and Competitions',
      body: `<p>A projects section is essential for early-career data scientists and valuable for experienced ones who want to show breadth beyond their day job.</p>
<ul>
  <li><strong>Kaggle competitions:</strong> Include your ranking, the competition name, and a one-line description of your approach. "Top 2% (Silver Medal) in Kaggle Home Credit Default Risk — ensembled LightGBM and neural network features with custom feature engineering."</li>
  <li><strong>Open-source contributions:</strong> Name the library, your contribution, and the pull request or issue. "Contributed time-series cross-validation module to Scikit-learn (PR #14856, merged)."</li>
  <li><strong>Personal projects:</strong> Describe the problem, data source, method, and outcome. "Built a real-time sentiment tracker for earnings call transcripts using fine-tuned FinBERT, deployed as a Streamlit dashboard."</li>
</ul>
<p>Link to GitHub repos, notebooks, or blog posts for each project. Verifiable work is significantly more compelling than self-reported skills.</p>`,
    },
    {
      title: 'Education and Certifications',
      body: `<p>Data science roles often have strong educational expectations. Present your academic background strategically to maximize its impact.</p>
<ul>
  <li>Lead with your highest relevant degree. If you have a PhD, place education near the top of your resume — it carries significant weight in research-oriented roles.</li>
  <li>Include your thesis title and advisor if they're well-known in the field or directly relevant to the role.</li>
  <li>List relevant coursework only if you're within 3 years of graduation: "Advanced Machine Learning, Causal Inference, Stochastic Processes, Optimization."</li>
  <li>Certifications add value if you're self-taught or transitioning: AWS Machine Learning Specialty, Google Professional Data Engineer, Stanford ML Certificate.</li>
</ul>
<p>For bootcamp graduates, frame your education positively but emphasize portfolio projects over curriculum. Hiring managers will judge you on demonstrated skill, not credentials alone.</p>`,
    },
  ],
  checklist: [
    'Skills organized into Languages, ML/Statistics, Data Engineering, Visualization, and MLOps categories',
    'Every model or analysis bullet connects to a business outcome or scientific contribution',
    'Projects section includes Kaggle rankings, open-source work, or personal projects with links',
    'Publications section (if applicable) includes plain-English impact summaries',
    'GitHub and Google Scholar profile links prominently placed',
    'Education section highlights relevant thesis, coursework, or certifications',
    'Resume tailored to the sub-discipline: ML engineering, analytics, NLP, or research',
    'ATS-friendly format with no charts, graphs, or embedded images',
    'Technical terminology matches the job description exactly',
  ],
  commonMistakes: [
    'Describing models in purely technical terms without connecting to business impact — "achieved 0.94 AUC" means nothing without the decision it enabled.',
    'Listing every tool and library ever used instead of curating for the target role — depth beats breadth.',
    'Using charts or graphs in the resume to "show data skills" — they break ATS parsing and waste valuable space.',
    'Omitting links to GitHub, Kaggle, or publications that would let reviewers verify your claims.',
    'Blurring the line between data analysis and data science — be precise about whether you built models, ran experiments, or generated reports.',
    'Failing to distinguish between personal projects and production deployments — the latter carries far more weight.',
  ],
  relevantFeatures: [
    'aiResumeBuilder',
    'atsOptimization',
    'aiWritingAssistant',
    'pdfExport',
    'multipleTemplates',
    'aiJobMatching',
  ],
  relatedSlugs: [
    'software-engineer-resume',
    'financial-analyst-resume',
    'product-manager-resume',
  ],
  updatedAt: '2025-01-15',
}
