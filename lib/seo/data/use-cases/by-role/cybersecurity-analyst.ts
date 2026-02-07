import type { UseCase } from '../../types'

export const cybersecurityAnalystResume: UseCase = {
  slug: 'cybersecurity-analyst-resume',
  category: 'resume-by-role',
  title: 'Cybersecurity Analyst Resume Guide',
  metaTitle: 'Cybersecurity Analyst Resume: Expert Guide [2025]',
  metaDescription:
    'Build a cybersecurity analyst resume that highlights threat detection, incident response, and compliance expertise. Covers certifications, SIEM tools, and ATS optimization strategies.',
  subtitle:
    'Demonstrate your ability to protect organizational assets, detect threats, and respond to incidents with a resume that speaks to both security leaders and HR recruiters.',
  readTimeMinutes: 9,
  keyTakeaways: [
    'Lead with certifications — CISSP, CEH, CompTIA Security+, GIAC, and OSCP are the most recognized credentials and should be visible within seconds.',
    'Quantify your security impact: number of incidents handled, mean time to detect/respond, vulnerabilities remediated, and compliance audit results.',
    'Organize your skills by security domain: network security, endpoint protection, cloud security, identity and access management, and compliance frameworks.',
    'Tailor your resume to the security sub-specialty: SOC analyst, penetration tester, GRC analyst, cloud security engineer, or incident responder each require different emphasis.',
  ],
  sections: [
    {
      title: 'Presenting Certifications and Clearances',
      body: `<p>In cybersecurity, certifications are often hard requirements — not nice-to-haves. Many job postings, especially in government and defense contracting, will automatically filter out candidates who lack specific credentials.</p>
<ul>
  <li><strong>Place certifications prominently:</strong> List them after your name in the header ("Alex Chen, CISSP, CEH, Security+") and in a dedicated "Certifications" section near the top of your resume.</li>
  <li><strong>Prioritize by recognition:</strong> CISSP, CISM, and OSCP carry the most weight for senior roles. CompTIA Security+ and CySA+ are expected for entry and mid-level positions. CEH is widely recognized but most valued when paired with hands-on certs like OSCP.</li>
  <li><strong>Include GIAC certifications:</strong> GSEC, GCIH, GCIA, GPEN, and GCFE are highly respected among security practitioners. List the specific GIAC cert, not just "GIAC certified."</li>
  <li><strong>Security clearance:</strong> If you hold an active security clearance (Secret, Top Secret, TS/SCI), list it prominently but do not disclose classified program names. "Active TS/SCI clearance (granted 2023)" is sufficient.</li>
</ul>
<p>Expired certifications should generally be removed unless they show breadth of knowledge. If your CISSP is in renewal, note the status: "CISSP (renewal in progress, expected 06/2025)."</p>`,
      tip: 'Research whether the target role requires DoD 8570/8140 compliance. If so, ensure the required baseline certification (Security+, CISSP, etc.) is clearly listed — it is a non-negotiable gate for many government contracts.',
    },
    {
      title: 'Quantifying Threat Detection and Incident Response',
      body: `<p>Security work often feels intangible — you are protecting against things that did not happen. The key to a strong cybersecurity resume is making your invisible work <strong>visible and measurable</strong>.</p>
<p>Compare these two bullets:</p>
<ul>
  <li><em>Weak:</em> "Monitored SIEM alerts and responded to security incidents."</li>
  <li><em>Strong:</em> "Triaged 200+ daily Splunk alerts across a 15,000-endpoint environment, reducing mean time to detect (MTTD) from 4 hours to 22 minutes and mean time to respond (MTTR) from 48 hours to 6 hours."</li>
</ul>
<p>The strong version quantifies scope (200+ alerts, 15,000 endpoints), improvement (MTTD and MTTR reduction), and implies a mature security operations practice.</p>
<p>Other high-impact metrics to include:</p>
<ul>
  <li><strong>Vulnerability management:</strong> "Managed vulnerability remediation across 8,000 assets, reducing critical/high findings by 70% within 90-day SLA."</li>
  <li><strong>Incident response:</strong> "Led response to 3 major security incidents including a ransomware attack, containing the blast radius to 12 systems and achieving full recovery within 36 hours with zero data loss."</li>
  <li><strong>Phishing defense:</strong> "Designed and executed quarterly phishing simulations for 3,000 employees, reducing click-through rate from 24% to 4% over 18 months."</li>
</ul>`,
    },
    {
      title: 'Structuring Technical Skills by Security Domain',
      body: `<p>Cybersecurity is a broad field, and hiring managers scan your skills section to determine your specialty. Organize skills by domain rather than listing tools alphabetically.</p>
<ul>
  <li><strong>SIEM & Detection:</strong> Splunk (SPL), Microsoft Sentinel (KQL), IBM QRadar, Elastic SIEM, CrowdStrike Falcon LogScale, Sumo Logic.</li>
  <li><strong>Endpoint & Network:</strong> CrowdStrike Falcon, SentinelOne, Carbon Black, Palo Alto Cortex XDR, Wireshark, Snort, Suricata, Zeek.</li>
  <li><strong>Vulnerability & Pen Testing:</strong> Nessus, Qualys, Rapid7 InsightVM, Burp Suite, Metasploit, Nmap, Kali Linux, OWASP ZAP.</li>
  <li><strong>Cloud Security:</strong> AWS Security Hub, GuardDuty, Azure Defender, GCP Security Command Center, Prisma Cloud, Wiz, Orca.</li>
  <li><strong>Identity & Access:</strong> Okta, Azure AD (Entra ID), CyberArk, SailPoint, Ping Identity, Active Directory, LDAP.</li>
  <li><strong>Compliance Frameworks:</strong> NIST CSF, NIST 800-53, ISO 27001, SOC 2, PCI DSS, HIPAA, GDPR, CIS Controls, MITRE ATT&CK.</li>
</ul>
<p>Only list tools you have genuinely used in a production environment. Cybersecurity interviews often include hands-on labs or scenario-based questions, and claiming proficiency in tools you cannot navigate under pressure will cost you the offer.</p>`,
      tip: 'If you specialize in cloud security, create a sub-section for cloud-native security tools. Cloud security skills are in extremely high demand and warrant prominent placement.',
    },
    {
      title: 'Highlighting Compliance and Governance Experience',
      body: `<p>Governance, risk, and compliance (GRC) work is a critical part of cybersecurity, and many organizations hire specifically for these skills. Even if you are primarily a technical analyst, demonstrating compliance awareness elevates your candidacy.</p>
<ul>
  <li><strong>Audit support:</strong> "Prepared evidence packages and led technical walkthroughs for annual SOC 2 Type II audit, achieving zero findings across 85 controls for 3 consecutive years."</li>
  <li><strong>Policy development:</strong> "Authored 12 security policies and 30+ procedures aligned to NIST CSF and ISO 27001, forming the foundation for the organization's first ISO 27001 certification."</li>
  <li><strong>Risk assessment:</strong> "Conducted enterprise risk assessments using NIST 800-30 methodology, identifying and prioritizing 45 risks across 8 business units and presenting findings to the CISO and board."</li>
  <li><strong>Vendor security:</strong> "Evaluated 60+ third-party vendors annually using a custom security questionnaire mapped to SOC 2 and ISO 27001 controls, identifying 15 critical risks that led to contract renegotiations."</li>
</ul>
<p>If you have led or supported a compliance certification effort (SOC 2, ISO 27001, PCI DSS, FedRAMP), this is a major differentiator. Frame it as a project with a clear outcome: "Led the 9-month SOC 2 Type II certification program, coordinating across 5 departments and achieving certification on the first attempt."</p>`,
    },
    {
      title: 'Education, Training, and Continuous Learning',
      body: `<p>The cybersecurity landscape evolves faster than almost any other field. Your resume should demonstrate that you stay current with emerging threats, tools, and techniques.</p>
<ul>
  <li><strong>Formal education:</strong> Computer Science, Cybersecurity, Information Systems, or related degrees are common. A Master's in Cybersecurity or Information Assurance adds value for senior and GRC roles but is rarely required.</li>
  <li><strong>Hands-on training platforms:</strong> Mention platforms like SANS, Offensive Security, HackTheBox, TryHackMe, or SANS Cyber Ranges to demonstrate continuous skill development. "Completed 50+ HackTheBox machines and achieved Pro Hacker rank."</li>
  <li><strong>CTF competitions:</strong> Capture The Flag participation demonstrates practical offensive and defensive skills. "Placed top 10 in National CCDC (Collegiate Cyber Defense Competition) 2024."</li>
  <li><strong>Conference participation:</strong> DEF CON, Black Hat, BSides, RSA, and SANS summits show industry engagement. Mention speaking engagements if applicable.</li>
</ul>
<p>For career changers entering cybersecurity, a strong training portfolio (Security+, SANS courses, home lab documentation, CTF participation) can compensate for limited professional experience. Link to your blog, home lab write-ups, or GitHub repos that demonstrate hands-on security skills.</p>`,
      tip: 'Document your home lab setup on your resume or portfolio site. "Maintained a home lab with pfSense, Security Onion, Splunk, and Active Directory for threat detection and response practice" shows initiative that hiring managers love.',
    },
  ],
  checklist: [
    'Certifications (CISSP, CEH, Security+, GIAC, OSCP) listed in header and dedicated section',
    'Security clearance status noted prominently if applicable',
    'Incident response experience quantified with MTTD, MTTR, and scope metrics',
    'SIEM tool proficiency specified by platform and query language (SPL, KQL)',
    'Skills organized by security domain: detection, endpoint, vulnerability, cloud, identity, compliance',
    'Compliance and audit experience described with framework names and outcomes',
    'Vulnerability management results quantified with remediation rates and SLA compliance',
    'Phishing simulation or security awareness program results included if applicable',
    'Continuous learning demonstrated through training platforms, CTFs, or conference participation',
    'Resume formatted for ATS compatibility with standard section headings',
  ],
  commonMistakes: [
    'Describing security work as "monitored alerts" without specifying the SIEM platform, alert volume, environment size, or response outcomes.',
    'Listing compliance frameworks (NIST, ISO, SOC 2) without describing what you actually did with them — did you audit against them, implement controls, or just read about them?',
    'Burying certifications in a skills section instead of featuring them in the header and a dedicated section — certifications are hard gates for many security roles.',
    'Focusing only on defensive security when applying to an offensive role (or vice versa) — tailor your emphasis to the job description.',
    'Using vague language like "improved security posture" without defining what improved, by how much, and how you measured it.',
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
    'devops-engineer-resume',
    'data-engineer-resume',
  ],
  updatedAt: '2025-01-15',
}
