// A4 dimensions in mm
const A4_WIDTH_MM = 210
const A4_HEIGHT_MM = 297

/**
 * Exports a single DOM element to an image data URL
 */
async function elementToImage(element: HTMLElement): Promise<string> {
  const htmlToImage = await import('html-to-image')
  return htmlToImage.toPng(element, {
    quality: 1.0,
    pixelRatio: 2, // Higher pixel ratio for better quality
    backgroundColor: '#ffffff',
  })
}

/**
 * Exports multiple CV pages to PDF
 * Each .cv-page element becomes a separate PDF page
 */
export async function exportToPDF(
  containerElement: HTMLElement,
  filename: string = 'cv.pdf',
  pageSelector: string = '.cv-page'
): Promise<void> {
  try {
    console.log('Starting PDF export...')

    // Find all page elements
    const pageElements = containerElement.querySelectorAll(pageSelector)

    if (pageElements.length === 0) {
      // Fallback: if no page elements found, export the entire container
      console.log('No page elements found, exporting entire container')
      await exportSinglePage(containerElement, filename)
      return
    }

    console.log(`Found ${pageElements.length} page(s) to export`)

    // Create PDF document (A4 size)
    const { default: jsPDF } = await import('jspdf')
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })

    // Export each page
    for (let i = 0; i < pageElements.length; i++) {
      const pageElement = pageElements[i] as HTMLElement

      console.log(`Capturing page ${i + 1}...`)

      // Capture the page as PNG
      const dataUrl = await elementToImage(pageElement)

      // Create a temporary image to get dimensions
      const img = new Image()
      img.src = dataUrl

      await new Promise((resolve, reject) => {
        img.onload = resolve
        img.onerror = reject
      })

      // Add new page for pages after the first
      if (i > 0) {
        pdf.addPage()
      }

      // Add the image to fill the entire A4 page
      pdf.addImage(dataUrl, 'PNG', 0, 0, A4_WIDTH_MM, A4_HEIGHT_MM)

      console.log(`Page ${i + 1} added to PDF`)
    }

    // Download the PDF
    console.log('Saving PDF:', filename)
    pdf.save(filename)
    console.log('PDF saved successfully!')
  } catch (error) {
    console.error('Error generating PDF:', error)
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
    throw error
  }
}

/**
 * Fallback: export a single element as PDF (legacy behavior)
 */
async function exportSinglePage(
  element: HTMLElement,
  filename: string
): Promise<void> {
  console.log('Element dimensions:', {
    width: element.offsetWidth,
    height: element.offsetHeight,
    scrollWidth: element.scrollWidth,
    scrollHeight: element.scrollHeight,
  })

  // Capture the element as PNG
  const dataUrl = await elementToImage(element)

  console.log('PNG captured, data URL length:', dataUrl.length)

  // Create a temporary image to get dimensions
  const img = new Image()
  img.src = dataUrl

  await new Promise((resolve, reject) => {
    img.onload = resolve
    img.onerror = reject
  })

  console.log('Image loaded:', {
    width: img.width,
    height: img.height,
  })

  // Calculate PDF dimensions
  const imgWidth = A4_WIDTH_MM
  const pageHeight = A4_HEIGHT_MM
  const imgHeight = (img.height * imgWidth) / img.width

  console.log('PDF dimensions:', {
    imgWidth,
    imgHeight,
    pageHeight,
  })

  // Create PDF document (A4 size)
  const { default: jsPDF } = await import('jspdf')
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  let heightLeft = imgHeight
  let position = 0

  // Add first page
  console.log('Adding first page...')
  pdf.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight)
  heightLeft -= pageHeight

  // Add additional pages if content is longer than one page
  while (heightLeft > 0) {
    position = heightLeft - imgHeight
    pdf.addPage()
    pdf.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight
    console.log('Added additional page, heightLeft:', heightLeft)
  }

  // Download the PDF
  console.log('Saving PDF:', filename)
  pdf.save(filename)
  console.log('PDF saved successfully!')
}

/**
 * Exports the CV preview to PDF
 * Looks for the element with class 'cv-preview'
 */
export async function exportCVToPDF(filename: string = 'my-cv.pdf'): Promise<void> {
  const cvElement = document.querySelector('.cv-preview') as HTMLElement

  if (!cvElement) {
    console.error('CV preview element not found')
    throw new Error('CV preview element not found')
  }

  console.log('Found CV element:', cvElement)
  await exportToPDF(cvElement, filename)
}
