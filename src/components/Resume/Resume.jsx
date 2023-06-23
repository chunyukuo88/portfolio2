import { Document, Page, PDFViewer } from '@react-pdf/renderer';

export const Resume = () => (
  <PDFViewer>
    <Document file={'./resume.pdf'}>
      <Page pageNumber={1} />
    </Document>
  </PDFViewer>
);
