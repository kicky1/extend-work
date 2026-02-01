import type { EmailTemplate } from '@/lib/types/email'

// Default job application templates (hardcoded)
export const defaultJobTemplates: Omit<EmailTemplate, 'id' | 'userId' | 'useCount' | 'createdAt' | 'updatedAt'>[] = [
  {
    name: 'Job Application',
    subject: 'Application for {{job_title}} position at {{company}}',
    body: `Dear Hiring Manager,

I am writing to express my interest in the {{job_title}} position at {{company}}.

[Your introduction and relevant experience here]

I am excited about the opportunity to contribute to {{company}} and would welcome the chance to discuss how my skills align with your team's needs.

Thank you for considering my application.

Best regards,
{{name}}`,
    variables: ['job_title', 'company', 'name'],
    category: 'application',
  },
  {
    name: 'Follow-up After Application',
    subject: 'Following up on {{job_title}} application - {{company}}',
    body: `Dear Hiring Manager,

I wanted to follow up on my application for the {{job_title}} position at {{company}}, which I submitted on {{date}}.

I remain very interested in this opportunity and would be happy to provide any additional information you may need.

I look forward to hearing from you.

Best regards,
{{name}}`,
    variables: ['job_title', 'company', 'date', 'name'],
    category: 'follow-up',
  },
  {
    name: 'Thank You After Interview',
    subject: 'Thank you for the {{job_title}} interview - {{company}}',
    body: `Dear {{name}},

Thank you for taking the time to meet with me regarding the {{job_title}} position at {{company}}.

I enjoyed learning more about the role and the team. Our conversation reinforced my enthusiasm for this opportunity.

[Mention specific topic from interview]

Please don't hesitate to reach out if you need any additional information.

Best regards,
{{name}}`,
    variables: ['job_title', 'company', 'name'],
    category: 'thank-you',
  },
  {
    name: 'Application Withdrawal',
    subject: 'Withdrawal of application - {{job_title}} at {{company}}',
    body: `Dear Hiring Manager,

I am writing to inform you that I would like to withdraw my application for the {{job_title}} position at {{company}}.

After careful consideration, I have decided to pursue a different opportunity that aligns more closely with my current career goals.

I appreciate the time you and your team have invested in reviewing my application and speaking with me. I have a positive impression of {{company}} and wish you continued success.

Thank you for your understanding.

Best regards,
{{name}}`,
    variables: ['job_title', 'company', 'name'],
    category: 'general',
  },
]
