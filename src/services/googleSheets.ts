import { Lead } from '../types';

export const DEFAULT_SPREADSHEET_ID = '1exbJQclk8lF6A07avOWzuVwm_LQG-dCvxZu6d25zytQ';
export const DEFAULT_SPREADSHEET_URL = `https://docs.google.com/spreadsheets/d/${DEFAULT_SPREADSHEET_ID}/edit`;

export interface SyncResult {
  success: boolean;
  spreadsheetId: string;
  sheetTitle: string;
  rowsSynced: number;
  updatedRange?: string;
  error?: string;
}

/**
 * Fetch spreadsheet metadata to get the actual tab name (per Google Sheets best practices)
 */
export async function getSpreadsheetDetails(accessToken: string, spreadsheetId: string = DEFAULT_SPREADSHEET_ID) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?includeGridData=false`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Failed to access spreadsheet (${res.status})`);
  }

  const data = await res.json();
  const title = data.properties?.title || 'Offplan Leads';
  const firstSheet = data.sheets?.[0]?.properties?.title || 'Sheet1';

  return {
    title,
    firstSheet,
    sheets: data.sheets?.map((s: any) => s.properties?.title) || [firstSheet]
  };
}

/**
 * Format lead into tabular row
 */
export function formatLeadRow(lead: Lead): string[] {
  return [
    lead.createdAt || new Date().toISOString(),
    lead.id,
    lead.name || 'Anonymous Client',
    lead.email || 'N/A',
    lead.phone || 'N/A',
    lead.country || 'UAE / International',
    lead.budgetRangeAED || 'N/A',
    lead.propertyInterestId || 'General UAE Off-Plan Inquiry',
    lead.status || 'Hot',
    String(lead.leadScore || 85),
    lead.qualificationSummary || 'Auto-qualified by Off-plan Concierge AI engine',
    Array.isArray(lead.draftRecommendations) ? lead.draftRecommendations.join(', ') : 'bugatti-residences',
    lead.aiNotes || 'Qualified for UAE Golden Visa / Direct Allocation'
  ];
}

export const LEAD_HEADERS = [
  'Submission Date',
  'Lead ID',
  'Client Name',
  'Email Address',
  'Phone / WhatsApp',
  'Country',
  'Budget Range (AED)',
  'Property Interest',
  'Lead Status',
  'Lead Score',
  'AI Qualification Summary',
  'Recommended Projects',
  'AI Investment Notes'
];

/**
 * Sync entire list of leads to the Google Spreadsheet
 */
export async function syncLeadsToGoogleSheet(
  accessToken: string,
  leads: Lead[],
  spreadsheetId: string = DEFAULT_SPREADSHEET_ID
): Promise<SyncResult> {
  try {
    const { firstSheet } = await getSpreadsheetDetails(accessToken, spreadsheetId);

    // Prepare rows: Header + All lead data
    const rows = [LEAD_HEADERS, ...leads.map(formatLeadRow)];

    // Write starting from A1
    const range = `${firstSheet}!A1:M${rows.length}`;
    const updateUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}?valueInputOption=USER_ENTERED`;

    const res = await fetch(updateUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        range,
        majorDimension: 'ROWS',
        values: rows
      })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `Failed to update sheet: ${res.statusText}`);
    }

    const data = await res.json();
    return {
      success: true,
      spreadsheetId,
      sheetTitle: firstSheet,
      rowsSynced: leads.length,
      updatedRange: data.updatedRange
    };
  } catch (error: any) {
    console.error('Error syncing leads to Google Sheets:', error);
    return {
      success: false,
      spreadsheetId,
      sheetTitle: 'Sheet1',
      rowsSynced: 0,
      error: error.message || 'Unknown error'
    };
  }
}

/**
 * Append a newly captured single lead to the Google Spreadsheet
 */
export async function appendLeadToGoogleSheet(
  accessToken: string,
  lead: Lead,
  spreadsheetId: string = DEFAULT_SPREADSHEET_ID
): Promise<boolean> {
  try {
    const { firstSheet } = await getSpreadsheetDetails(accessToken, spreadsheetId);
    const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(firstSheet)}!A:M:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

    const res = await fetch(appendUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        values: [formatLeadRow(lead)]
      })
    });

    return res.ok;
  } catch (error) {
    console.error('Failed to append lead to Google Sheet:', error);
    return false;
  }
}
