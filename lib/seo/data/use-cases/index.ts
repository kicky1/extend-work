import type { UseCase, UseCaseCategory } from '../types'

import { softwareEngineerResume } from './by-role/software-engineer'
import { productManagerResume } from './by-role/product-manager'
import { uxDesignerResume } from './by-role/ux-designer'
import { dataScientistResume } from './by-role/data-scientist'
import { marketingManagerResume } from './by-role/marketing-manager'
import { projectManagerResume } from './by-role/project-manager'
import { salesRepresentativeResume } from './by-role/sales-representative'
import { financialAnalystResume } from './by-role/financial-analyst'
import { registeredNurseResume } from './by-role/registered-nurse'
import { teacherResume } from './by-role/teacher'
import { accountantResume } from './by-role/accountant'
import { graphicDesignerResume } from './by-role/graphic-designer'
import { humanResourcesManagerResume } from './by-role/human-resources-manager'
import { businessAnalystResume } from './by-role/business-analyst'
import { mechanicalEngineerResume } from './by-role/mechanical-engineer'
import { civilEngineerResume } from './by-role/civil-engineer'
import { pharmacistResume } from './by-role/pharmacist'
import { lawyerResume } from './by-role/lawyer'
import { executiveAssistantResume } from './by-role/executive-assistant'
import { webDeveloperResume } from './by-role/web-developer'
import { devopsEngineerResume } from './by-role/devops-engineer'
import { customerSuccessManagerResume } from './by-role/customer-success-manager'
import { contentWriterResume } from './by-role/content-writer'
import { operationsManagerResume } from './by-role/operations-manager'
import { supplyChainManagerResume } from './by-role/supply-chain-manager'
import { dataEngineerResume } from './by-role/data-engineer'
import { cybersecurityAnalystResume } from './by-role/cybersecurity-analyst'
import { physicalTherapistResume } from './by-role/physical-therapist'
import { socialWorkerResume } from './by-role/social-worker'
import { architectResume } from './by-role/architect'
import { realEstateAgentResume } from './by-role/real-estate-agent'
import { dentalHygienistResume } from './by-role/dental-hygienist'

export const useCases: UseCase[] = [
  softwareEngineerResume,
  productManagerResume,
  uxDesignerResume,
  dataScientistResume,
  marketingManagerResume,
  projectManagerResume,
  salesRepresentativeResume,
  financialAnalystResume,
  registeredNurseResume,
  teacherResume,
  accountantResume,
  graphicDesignerResume,
  humanResourcesManagerResume,
  businessAnalystResume,
  mechanicalEngineerResume,
  civilEngineerResume,
  pharmacistResume,
  lawyerResume,
  executiveAssistantResume,
  webDeveloperResume,
  devopsEngineerResume,
  customerSuccessManagerResume,
  contentWriterResume,
  operationsManagerResume,
  supplyChainManagerResume,
  dataEngineerResume,
  cybersecurityAnalystResume,
  physicalTherapistResume,
  socialWorkerResume,
  architectResume,
  realEstateAgentResume,
  dentalHygienistResume,
]

export function getUseCase(slug: string): UseCase | undefined {
  return useCases.find((uc) => uc.slug === slug)
}

export function getUseCasesByCategory(
  category: UseCaseCategory,
): UseCase[] {
  return useCases.filter((uc) => uc.category === category)
}
