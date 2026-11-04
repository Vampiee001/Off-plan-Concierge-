import { jsPDF } from 'jspdf';
import { Property } from '../types';
import { formatPrice } from '../utils/formatters';

export interface AdvisorContact {
  name: string;
  phone: string;
  email: string;
  title: string;
  whatsappLink: string;
}

export const MARK_ADVISOR_CONTACT: AdvisorContact = {
  name: 'Mark',
  phone: '+971585538382',
  email: 'offplandubai88@gmail.com',
  title: 'Executive UAE Off-Plan Advisor & VIP Portfolio Manager',
  whatsappLink: 'https://wa.me/971585538382'
};

/**
 * Generate and download an executive client VIP PDF brochure for any off-plan property
 */
export function exportPropertyToPdf(property: Property, advisor: AdvisorContact = MARK_ADVISOR_CONTACT) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Primary colors
  const primaryNavy = [6, 11, 24];      // #060B18
  const deepNavy = [11, 20, 42];        // #0B142A
  const goldAccent = [217, 168, 65];    // #D9A841
  const lightGold = [245, 218, 148];    // #F5DA94
  const slateText = [203, 213, 225];    // #CBD5E1
  const mutedText = [148, 163, 184];    // #94A3B8

  // Background Fill
  doc.setFillColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Top Decorative Gold Accent Bar
  doc.setFillColor(goldAccent[0], goldAccent[1], goldAccent[2]);
  doc.rect(0, 0, pageWidth, 4, 'F');

  // Header Section
  doc.setTextColor(goldAccent[0], goldAccent[1], goldAccent[2]);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('OFF-PLAN CONCIERGE  •  UAE LUXURY REAL ESTATE PORTAL', 15, 14);

  doc.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(`CONFIDENTIAL CLIENT PRESENTATION  |  DATE: ${new Date().toLocaleDateString('en-GB')}`, pageWidth - 15, 14, { align: 'right' });

  // Divider Line
  doc.setDrawColor(goldAccent[0], goldAccent[1], goldAccent[2]);
  doc.setLineWidth(0.3);
  doc.line(15, 17, pageWidth - 15, 17);

  // Property Title & Developer Box
  doc.setFillColor(deepNavy[0], deepNavy[1], deepNavy[2]);
  doc.roundedRect(15, 22, pageWidth - 30, 24, 2, 2, 'F');
  doc.setDrawColor(goldAccent[0], goldAccent[1], goldAccent[2]);
  doc.setLineWidth(0.2);
  doc.roundedRect(15, 22, pageWidth - 30, 24, 2, 2, 'S');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(property.title, 20, 31);

  doc.setTextColor(goldAccent[0], goldAccent[1], goldAccent[2]);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(`${property.developer}  •  ${property.location}, ${property.city}`, 20, 39);

  doc.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(`DLD Permit: ${property.dldPermitNumber || 'DLD-VIP-VERIFIED'} | Status: ${property.status}`, pageWidth - 20, 39, { align: 'right' });

  // Financial & Investment Matrix (4 columns)
  const matrixY = 52;
  const colWidth = (pageWidth - 30) / 4;

  const metrics = [
    { label: 'STARTING PRICE', val: `AED ${property.startingPriceAED.toLocaleString()}`, sub: `~$${Math.round(property.startingPriceAED / 3.6725).toLocaleString()} USD` },
    { label: 'PRICE / SQ.FT', val: `AED ${property.pricePerSqFt.toLocaleString()}`, sub: 'Direct Developer Rate' },
    { label: 'HANDOVER DATE', val: property.completionDate, sub: `Escrow Protected` },
    { label: 'PROJECTED ROI', val: property.projectedROI || '8.5% Net', sub: 'High Capital Growth' }
  ];

  metrics.forEach((m, idx) => {
    const x = 15 + idx * colWidth;
    doc.setFillColor(15, 25, 50);
    doc.roundedRect(x + 1, matrixY, colWidth - 2, 20, 1.5, 1.5, 'F');
    doc.setDrawColor(40, 60, 95);
    doc.roundedRect(x + 1, matrixY, colWidth - 2, 20, 1.5, 1.5, 'S');

    doc.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'bold');
    doc.text(m.label, x + (colWidth / 2), matrixY + 5.5, { align: 'center' });

    doc.setTextColor(lightGold[0], lightGold[1], lightGold[2]);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(m.val, x + (colWidth / 2), matrixY + 12, { align: 'center' });

    doc.setTextColor(slateText[0], slateText[1], slateText[2]);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.text(m.sub, x + (colWidth / 2), matrixY + 17, { align: 'center' });
  });

  // Payment Plan Banner
  const planY = 78;
  doc.setFillColor(20, 32, 60);
  doc.roundedRect(15, planY, pageWidth - 30, 12, 1.5, 1.5, 'F');
  doc.setTextColor(goldAccent[0], goldAccent[1], goldAccent[2]);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.text('OFFICIAL PAYMENT PLAN:', 20, planY + 7.5);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(property.paymentPlan, 72, planY + 7.5);

  // 5 CERTIFIED USPs SECTION (The Core Requirement!)
  const uspStartY = 96;
  doc.setTextColor(goldAccent[0], goldAccent[1], goldAccent[2]);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('CERTIFIED 5 UNIQUE SELLING POINTS (USPs)', 15, uspStartY);

  doc.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.text('Verified competitive investment metrics & exclusive features', pageWidth - 15, uspStartY, { align: 'right' });

  // USP Rows
  property.usps.forEach((usp, index) => {
    const rowY = uspStartY + 6 + (index * 14.5);
    
    // Background card for each USP
    doc.setFillColor(11, 20, 42);
    doc.roundedRect(15, rowY, pageWidth - 30, 12, 1.5, 1.5, 'F');
    doc.setDrawColor(45, 65, 100);
    doc.setLineWidth(0.2);
    doc.roundedRect(15, rowY, pageWidth - 30, 12, 1.5, 1.5, 'S');

    // Number badge
    doc.setFillColor(goldAccent[0], goldAccent[1], goldAccent[2]);
    doc.roundedRect(18, rowY + 2.5, 7, 7, 1, 1, 'F');
    doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text(String(index + 1), 21.5, rowY + 7.2, { align: 'center' });

    // USP Text
    doc.setTextColor(slateText[0], slateText[1], slateText[2]);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    
    // Split long text into max 2 lines
    const textLines = doc.splitTextToSize(usp, pageWidth - 60);
    doc.text(textLines, 28, rowY + 5.5);
  });

  // Key Amenities & Specs
  const amenitiesY = uspStartY + 84;
  doc.setTextColor(goldAccent[0], goldAccent[1], goldAccent[2]);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('PREMIUM SPECIFICATIONS & AMENITIES', 15, amenitiesY);

  const amenitiesList = property.amenities?.slice(0, 8).join('  •  ') || 'Private Infinity Pool  •  Valet Parking  •  Concierge  •  Smart Home';
  doc.setFillColor(15, 25, 50);
  doc.roundedRect(15, amenitiesY + 3, pageWidth - 30, 11, 1.5, 1.5, 'F');
  doc.setTextColor(slateText[0], slateText[1], slateText[2]);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  const splitAmenities = doc.splitTextToSize(amenitiesList, pageWidth - 40);
  doc.text(splitAmenities, 20, amenitiesY + 9);

  // Mark's VIP Dedicated Advisor Card (Requested by User)
  const advisorCardY = pageHeight - 55;
  doc.setFillColor(14, 25, 52);
  doc.roundedRect(15, advisorCardY, pageWidth - 30, 36, 2, 2, 'F');
  doc.setDrawColor(goldAccent[0], goldAccent[1], goldAccent[2]);
  doc.setLineWidth(0.4);
  doc.roundedRect(15, advisorCardY, pageWidth - 30, 36, 2, 2, 'S');

  // Gold badge left side
  doc.setFillColor(goldAccent[0], goldAccent[1], goldAccent[2]);
  doc.rect(15, advisorCardY, 3, 36, 'F');

  doc.setTextColor(goldAccent[0], goldAccent[1], goldAccent[2]);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('YOUR DEDICATED PRIVATE REAL ESTATE ADVISOR', 22, advisorCardY + 7);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text(advisor.name, 22, advisorCardY + 15);

  doc.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(advisor.title, 22, advisorCardY + 20);

  // Contact details right aligned or column
  doc.setTextColor(lightGold[0], lightGold[1], lightGold[2]);
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'bold');
  doc.text(`WhatsApp & Mobile: ${advisor.phone}`, 22, advisorCardY + 27);

  doc.setTextColor(slateText[0], slateText[1], slateText[2]);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text(`Email: ${advisor.email}`, 22, advisorCardY + 32);

  // VIP Buyer Privileges on right
  doc.setTextColor(lightGold[0], lightGold[1], lightGold[2]);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.text('VIP CLIENT GUARANTEE', pageWidth - 20, advisorCardY + 10, { align: 'right' });

  doc.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.text('• 0% Broker Commission / Agency Fees', pageWidth - 20, advisorCardY + 16, { align: 'right' });
  doc.text('• Direct Developer Priority Allocations', pageWidth - 20, advisorCardY + 21, { align: 'right' });
  doc.text('• 100% Escrow Law & DLD Protection', pageWidth - 20, advisorCardY + 26, { align: 'right' });
  doc.text('• Complimentary 10-Yr Golden Visa Assistance', pageWidth - 20, advisorCardY + 31, { align: 'right' });

  // Footer Disclaimer
  doc.setTextColor(mutedText[0], mutedText[1], mutedText[2]);
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'normal');
  doc.text(
    '© 2026 Off-plan Concierge. All properties escrow regulated by Dubai Land Department (DLD) & RERA. Pricing subject to unit availability.',
    pageWidth / 2,
    pageHeight - 6,
    { align: 'center' }
  );

  // Trigger Save
  const safeTitle = property.title.replace(/[^a-zA-Z0-9_-]/g, '_');
  doc.save(`Offplan-Concierge-${safeTitle}-Mark.pdf`);
}
